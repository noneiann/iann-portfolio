'use client'

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function Scene({ activeIndex, itemCount }: { activeIndex: number | null; itemCount: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  // Setup — unchanged, runs once.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshBasicMaterial({ color: 0x171717, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    let frameId: number;
    function animate() {
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.003;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      meshRef.current = null;
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Nav-driven feedback: slide the mesh toward a position mapped to the active item.
  useEffect(() => {
    if (!meshRef.current) return;

    const spread = 2;
    const targetX =
      activeIndex === null || itemCount <= 1
        ? 0
        : (activeIndex / (itemCount - 1) - 0.5) * spread;

    gsap.to(meshRef.current.position, {
      x: targetX,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [activeIndex, itemCount]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}