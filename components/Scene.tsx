"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { useLenis } from "lenis/react";

const UP = new THREE.Vector3(0, 1, 0);

// One entry per DOM section, in page order. Each contributes two camera beats:
// a title card square on the 3D label, then a pulled-back view the section's
// copy reads over. Adding a section here plus a matching [data-scene-stop="2"]
// element in the page is the whole change — nothing else counts sections.
const SECTIONS = [
  { label: "ALL ABOUT ME", anchor: new THREE.Vector3(20, 0, -5), yaw: -Math.PI / 2 },
  { label: "PROJECTS", anchor: new THREE.Vector3(-14, 0, -26), yaw: Math.PI / 2 },
];

// The yaw is applied to the mesh AND used to derive which side the camera sits
// on, so a label and its viewing position can never drift apart.
const SECTION_NORMALS = SECTIONS.map(({ yaw }) =>
  new THREE.Vector3(0, 0, 1).applyAxisAngle(UP, yaw)
);

const LABEL_SIZE = 0.5;
// Beat 2 of a section: further back and raised, looking above the label, so the
// title sits low and small and the DOM copy has clear space to read against.
const CONTENT_PULLBACK = 2.1;
const CONTENT_RISE = 2.2;
const CONTENT_LOOK_RISE = 1.4;

export default function Scene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  // Lenis publishes the smoothed scroll position; the render loop reads it off
  // a ref so a scroll never triggers a React re-render. Pixels rather than
  // normalized progress, because the camera path is keyed to element offsets.
  useLenis((lenis) => {
    scrollRef.current = lenis.scroll;
  });

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
    // Overwritten by applyCameraPath before the first frame.
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
    // --- Helpers --------------------------------------------------------
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

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


    // --- Section labels ------------------------------------------------------
    // Flat vector glyphs: ShapeGeometry triangulates the font outlines, so the
    // text stays crisp at any camera distance (unlike a canvas texture) and
    // needs no lights with a basic material. One label per SECTIONS entry.
    let disposed = false;

    // Fallback until the font resolves; replaced with the measured width, which
    // is what the camera standoff is solved from.
    const labelWidths = SECTIONS.map(() => 5.6);

    const labelMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });

    new FontLoader()
      .loadAsync("/typefaces/Archivo_Black.json")
      .then((font) => {
        // The effect can tear down before the font lands; without this the
        // meshes are added to a scene that is already gone and never disposed.
        if (disposed) return;

        SECTIONS.forEach((section, i) => {
          const geometry = new THREE.ShapeGeometry(
            font.generateShapes(section.label, LABEL_SIZE)
          );
          geometry.center(); // glyph shapes start at the baseline origin
          geometry.computeBoundingBox();
          const bounds = geometry.boundingBox;
          if (bounds) labelWidths[i] = bounds.max.x - bounds.min.x;

          const label = new THREE.Mesh(geometry, labelMaterial);
          label.position.copy(section.anchor);
          label.rotation.y = section.yaw;
          group.add(label);
        });
      })
      .catch((error) => {
        console.error("Failed to load typeface", error);
      });

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
    // const pointer = new THREE.Vector2();
    // const target = new THREE.Vector2();

    // const onPointerMove = (event: PointerEvent) => {
    //   const rect = container.getBoundingClientRect();
    //   target.set(
    //     ((event.clientX - rect.left) / rect.width) * 2 - 1,
    //     -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    //   );
    // };
    // window.addEventListener("pointermove", onPointerMove);

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

    // --- Camera path ---------------------------------------------------------
    // One entry per section reached, each writing where the camera sits and
    // what it looks at. Positions are authored in `group` space and converted
    // with localToWorld, so they stay correct if the group is ever moved or
    // rotated. Scroll past the last waypoint just holds there.

    // Distance at which a label spans the viewport width, solved from the
    // camera's own fov and aspect so it frames on any screen shape.
    const labelStandoff = (index: number) => {
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const fit =
        (labelWidths[index] * 1.18) /
        (2 * Math.tan(vFov / 2) * camera.aspect);
      return Math.max(3.5, fit);
    };

    type Waypoint = (position: THREE.Vector3, look: THREE.Vector3) => void;

    const waypoints: Waypoint[] = [
      // Beat 0 — hero: the wireframe shell, head on.
      (position, look) => {
        look.copy(shell.position);
        position.set(shell.position.x, shell.position.y, shell.position.z + 3);
      },
      // Then, per section: the title card, then the view its copy reads over.
      ...SECTIONS.flatMap((section, i): Waypoint[] => {
        const normal = SECTION_NORMALS[i];
        return [
          // Title card — square on the label, filling the frame.
          (position, look) => {
            look.copy(section.anchor);
            position
              .copy(section.anchor)
              .addScaledVector(normal, labelStandoff(i));
          },
          // Content view — pulled back and raised, looking above the label, so
          // it drops low and small and leaves the frame to the DOM copy.
          (position, look) => {
            look.copy(section.anchor).addScaledVector(UP, CONTENT_LOOK_RISE);
            position
              .copy(section.anchor)
              .addScaledVector(normal, labelStandoff(i) * CONTENT_PULLBACK)
              .addScaledVector(UP, CONTENT_RISE);
          },
        ];
      }),
    ];

    const posA = new THREE.Vector3();
    const posB = new THREE.Vector3();
    const lookA = new THREE.Vector3();
    const lookB = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();

    // --- Section stops -------------------------------------------------------
    // Waypoint N is reached when stop N reaches the top of the viewport, and the
    // camera interpolates across the scroll between consecutive stops. Stops are
    // measured off real elements tagged [data-scene-stop], so sections can be
    // any height and no spacer markup is needed to pad the scroll out.
    const stops: number[] = [];

    const measureStops = () => {
      stops.length = 0;
      document
        .querySelectorAll<HTMLElement>("[data-scene-stop]")
        .forEach((element) => {
          // data-scene-stop="2" means the section owns two beats, spread evenly
          // down its own height — that is how a section gets a title card and a
          // content view without an extra element to mark the midpoint.
          const beats = Math.max(1, Number(element.dataset.sceneStop) || 1);
          const top = element.getBoundingClientRect().top + window.scrollY;
          for (let i = 0; i < beats; i++) {
            stops.push(top + (element.offsetHeight * i) / beats);
          }
        });

      // The final section has no next stop to travel toward, so the bottom of
      // the document acts as one. This is what lets a tall last section own a
      // long camera move instead of snapping on arrival.
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      if (stops.length === 0 || maxScroll > stops[stops.length - 1]) {
        stops.push(maxScroll);
      }
    };

    measureStops();

    // Content reflow changes section offsets without firing a window resize.
    const bodyObserver = new ResizeObserver(measureStops);
    bodyObserver.observe(document.body);

    const sectionIndexAt = (scrollY: number) => {
      const last = stops.length - 1;
      if (last < 1 || scrollY <= stops[0]) return 0;

      for (let i = 0; i < last; i++) {
        const from = stops[i];
        const to = stops[i + 1];
        if (scrollY < to) {
          // Guard the divide: two stops can coincide if a section collapses.
          const span = to - from;
          return span > 0 ? i + (scrollY - from) / span : i;
        }
      }
      return last;
    };

    const applyCameraPath = (sectionIndex: number) => {
      const last = waypoints.length - 1;
      const clamped = THREE.MathUtils.clamp(sectionIndex, 0, last);
      const index = Math.min(Math.floor(clamped), Math.max(0, last - 1));
      const t = THREE.MathUtils.smootherstep(clamped - index, 0, 1);

      waypoints[index](posA, lookA);
      waypoints[index + 1](posB, lookB);

      camera.position.lerpVectors(posA, posB, t);
      lookTarget.lerpVectors(lookA, lookB, t);

      group.localToWorld(camera.position);
      group.localToWorld(lookTarget);
      camera.lookAt(lookTarget);
    };

    applyCameraPath(0);

    // --- Loop --------------------------------------------------------------
    const timer = new THREE.Timer();

    renderer.setAnimationLoop((timestamp) => {
      timer.update(timestamp);
      const elapsed = timer.getElapsed();
      const delta = timer.getDelta();

      if (!reducedMotion) {

        shell.rotation.y = -elapsed * 0.08;
        shell.rotation.z = elapsed * 0.05;
        stars.rotation.y = elapsed * 0.012;
        clutter.rotation.y = elapsed * 0.03;
        updateClutter(elapsed);
        group.position.y = Math.sin(elapsed * 0.7) * 0.12;
      }

      // The waypoints are in group space, so the group's world matrix has to be
      // current before converting them — it is otherwise only rebuilt during
      // render, leaving the camera a frame behind the drift.
      group.updateMatrixWorld();
      applyCameraPath(sectionIndexAt(scrollRef.current));

      renderer.render(scene, camera);

      if (debug) {
        // Smooth the frame time before showing it, then repaint the readout at
        // 10Hz — rewriting textContent every frame forces a style recalc for
        // numbers no one can read that fast.
        if (delta > 0) fps += ((1 / 60) - fps) * 0.1;

        if (elapsed - lastDebugAt >= 0.1) {
          lastDebugAt = elapsed;
          const { x, y, z } = camera.position;
          const section = sectionIndexAt(scrollRef.current);
          debug.textContent =
            `camera   x ${x.toFixed(2)}  y ${y.toFixed(2)}  z ${z.toFixed(2)}\n` +
            `look     x ${lookTarget.x.toFixed(2)}  y ${lookTarget.y.toFixed(2)}  z ${lookTarget.z.toFixed(2)}\n` +
            `scroll   ${scrollRef.current.toFixed(0)}px   section ${section.toFixed(2)} / ${waypoints.length - 1}\n` +
            `stops    ${stops.map((s) => s.toFixed(0)).join("  ")}\n` +
            `beats    ${SECTIONS.map((s, i) => `${s.label}:${labelStandoff(i).toFixed(1)}`).join("  ")}\n` +
            `fps      ${fps.toFixed(0)}`;
        }
      }
    });

    // --- Cleanup -----------------------------------------------------------
    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      // window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      bodyObserver.disconnect();

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
