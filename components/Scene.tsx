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

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const maxPixelRatio = window.innerWidth < 768 ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    // --- Objects -----------------------------------------------------------
    const group = new THREE.Group();
    scene.add(group);

    const SHELL_RADIUS = 1;

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(SHELL_RADIUS, 2),
      new THREE.MeshBasicMaterial({
        color: 0x8ea2ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
    );
    shell.position.set(0, 0, 4);
    group.add(shell);

    // The camera is parked head on to the shell for the whole page; nothing
    // moves it, so it is set once rather than per frame.
    camera.position.set(shell.position.x, shell.position.y, shell.position.z + 3);
    camera.lookAt(shell.position);

    // --- Stars ---------------------------------------------------------------
    // Wireframe cubes, baked into one merged LineSegments buffer: the edge
    // template is transformed per star on the CPU so the whole field is a
    // single draw call. EdgesGeometry gives the 12 box edges without the
    // triangle diagonals a `wireframe: true` material would draw.
    const STAR_COUNT = 50;
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
    // Placed in a spherwical shell around the icosahedron: the inner bound is
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

    // --- Debug HUD -----------------------------------------------------------
    // Appended straight to the body so it escapes the fixed, z-0 backdrop's
    // stacking context, and styled inline so nothing depends on Tailwind
    // emitting classes that only ever exist in development.
    const debug =
      process.env.NODE_ENV === "development"
        ? document.createElement("pre")
        : null;

    if (debug) {
      debug.style.cssText = [
        "position:fixed",
        "top:12px",
        "left:12px",
        "z-index:9999",
        "margin:0",
        "padding:8px 10px",
        "border-radius:6px",
        "background:rgba(0,0,0,0.65)",
        "color:#9ee7ff",
        "font:11px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace",
        "pointer-events:none",
        "white-space:pre",
      ].join(";");
      document.body.appendChild(debug);
    }

    let lastDebugAt = -1;
    let fps = 0;

    // --- Loop --------------------------------------------------------------
    const timer = new THREE.Timer();
    const spherical = new THREE.Spherical();
    const RADIUS = 3;

    const tick = (timestamp: number) => {
      timer.update(timestamp);
      const elapsed = timer.getElapsed();
      const delta = timer.getDelta();
      const damping = 1 - Math.exp(-4 * delta);
      pointer.lerp(target, damping);
      if (!reducedMotion) {
        spherical.set(
          RADIUS,
          Math.PI / 2 - pointer.y * 0.3,   // polar: 0 = straight up, PI/2 = equator
          pointer.x * 0.5                   // azimuth
        );
        camera.position.setFromSpherical(spherical).add(shell.position);
        camera.lookAt(shell.position);
        shell.rotation.y = -elapsed * 0.08;
        shell.rotation.z = elapsed * 0.05;
        stars.rotation.y = elapsed * 0.012;
        clutter.rotation.y = elapsed * 0.03;
        updateClutter(elapsed);
        group.position.y = Math.sin(elapsed * 0.7) * 0.12;
      }

      renderer.render(scene, camera);

      if (debug) {
        // Smooth the frame time before showing it, then repaint the readout at
        // 10Hz — rewriting textContent every frame forces a style recalc for
        // numbers no one can read that fast.
        if (delta > 0) fps += ((1 / 60) - fps) * 0.1;

        if (elapsed - lastDebugAt >= 0.1) {
          lastDebugAt = elapsed;
          const { x, y, z } = camera.position;
          debug.textContent =
            `camera   x ${x.toFixed(2)}  y ${y.toFixed(2)}  z ${z.toFixed(2)}\n` +
            `fps      ${fps.toFixed(0)}`;
        }
      }
    };

    // Only render — and only track the pointer — while the canvas is
    // actually on screen. Scrolled past the hero, this would otherwise keep
    // painting a full-screen antialiased scene at the display's refresh rate,
    // and listening on `window` for movement no one can see, for the rest of
    // the page.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        renderer.setAnimationLoop(entry.isIntersecting ? tick : null);
        if (entry.isIntersecting) {
          window.addEventListener("pointermove", onPointerMove);
        } else {
          window.removeEventListener("pointermove", onPointerMove);
        }
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(container);

    // --- Cleanup -----------------------------------------------------------
    return () => {
      renderer.setAnimationLoop(null);
      visibilityObserver.disconnect();
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

      debug?.remove();
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
