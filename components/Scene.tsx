"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x05060a, 0.075);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- Objects -----------------------------------------------------------
    const group = new THREE.Group();
    scene.add(group);

    const SHELL_RADIUS = 1.8;

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(SHELL_RADIUS, 2),
      new THREE.MeshBasicMaterial({
        color: 0x8ea2ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
    );
    group.add(shell);


    // --- Stars ---------------------------------------------------------------
    // Wireframe cubes, baked into one merged LineSegments buffer: the edge
    // template is transformed per star on the CPU so the whole field is a
    // single draw call. EdgesGeometry gives the 12 box edges without the
    // triangle diagonals a `wireframe: true` material would draw.
    const STAR_COUNT = 900;
    const starBox = new THREE.BoxGeometry(1, 1, 1);
    const starEdges = new THREE.EdgesGeometry(starBox);
    const edgeTemplate = starEdges.getAttribute("position");
    const vertsPerStar = edgeTemplate.count;

    const starPositions = new Float32Array(STAR_COUNT * vertsPerStar * 3);
    const starMatrix = new THREE.Matrix4();
    const starEuler = new THREE.Euler();
    const starQuaternion = new THREE.Quaternion();
    const starScale = new THREE.Vector3();
    const starOrigin = new THREE.Vector3();
    const starVertex = new THREE.Vector3();

    for (let i = 0; i < STAR_COUNT; i++) {
      // Distribute on a shell so nothing sits on top of the camera.
      const radius = 3 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starOrigin.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      starQuaternion.setFromEuler(
        starEuler.set(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        )
      );
      starScale.setScalar(0.09 + Math.random() * 0.18);
      starMatrix.compose(starOrigin, starQuaternion, starScale);

      for (let v = 0; v < vertsPerStar; v++) {
        starVertex.fromBufferAttribute(edgeTemplate, v).applyMatrix4(starMatrix);
        starVertex.toArray(starPositions, (i * vertsPerStar + v) * 3);
      }
    }

    starBox.dispose();
    starEdges.dispose();

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    const stars = new THREE.LineSegments(
      starGeometry,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      })
    );
    scene.add(stars);

    // --- Clutter spheres ---------------------------------------------------
    // Placed in a spherical shell around the icosahedron: the inner bound is
    // the only thing keeping them out of it, so nothing can spawn inside.
    const CLUTTER_COUNT = 140;
    const CLUTTER_INNER = SHELL_RADIUS + 0.7;
    const CLUTTER_OUTER = 7;

    const clutter = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 16, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      CLUTTER_COUNT
    );
    clutter.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const drift: {
      base: THREE.Vector3;
      scale: number;
      phase: number;
      speed: number;
      amplitude: number;
    }[] = [];

    const dummy = new THREE.Object3D();

    for (let i = 0; i < CLUTTER_COUNT; i++) {
      // Cube root of a lerp between the cubed bounds keeps the density even
      // through the shell instead of bunching everything against the inside.
      const depth = Math.random();
      const radius = Math.cbrt(
        THREE.MathUtils.lerp(CLUTTER_INNER ** 3, CLUTTER_OUTER ** 3, depth)
      );
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      drift.push({
        base: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        // Bias the far ones smaller so perspective isn't the only depth cue.
        scale: THREE.MathUtils.lerp(0.05, 0.014, depth) * (0.6 + Math.random()),
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.35,
        amplitude: 0.05 + Math.random() * 0.2,
      });
    }

    const updateClutter = (elapsed: number) => {
      for (let i = 0; i < CLUTTER_COUNT; i++) {
        const item = drift[i];
        dummy.position.copy(item.base);
        dummy.position.y += Math.sin(elapsed * item.speed + item.phase) * item.amplitude;
        dummy.scale.setScalar(item.scale);
        dummy.updateMatrix();
        clutter.setMatrixAt(i, dummy.matrix);
      }
      clutter.instanceMatrix.needsUpdate = true;
    };

    updateClutter(0);
    group.add(clutter);

    // --- Interaction -------------------------------------------------------
    const pointer = new THREE.Vector2();
    const target = new THREE.Vector2();

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      );
    };
    window.addEventListener("pointermove", onPointerMove);

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth: width, clientHeight: height } = container;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- Loop --------------------------------------------------------------
    const clock = new THREE.Clock();

    renderer.setAnimationLoop(() => {
      // getDelta() advances the clock, so read it before elapsedTime.
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;

      pointer.lerp(target, 1 - Math.pow(0.001, delta));

      if (!reducedMotion) {

        shell.rotation.y = -elapsed * 0.08;
        shell.rotation.z = elapsed * 0.05;
        stars.rotation.y = elapsed * 0.012;
        clutter.rotation.y = elapsed * 0.03;
        updateClutter(elapsed);
        group.position.y = Math.sin(elapsed * 0.7) * 0.12;
      }

      group.rotation.x = pointer.y * 0.25;
      group.rotation.y = pointer.x * 0.4;
      camera.position.x = pointer.x * 0.6;
      camera.position.y = pointer.y * 0.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    });

    // --- Cleanup -----------------------------------------------------------
    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();

      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Points ||
          object instanceof THREE.Line
        ) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((m) => m.dispose());
          } else {
            material.dispose();
          }
        }
      });

      clutter.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className ?? "absolute inset-0 h-full w-full"}
      aria-hidden="true"
    />
  );
}
