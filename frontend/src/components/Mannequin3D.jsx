import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Seamless 3D Interactive Floating Mannequin
 * Rendered with Three.js (alpha: true) - No bounding box, no square card.
 * Styled in a Korean-fit structured blazer, old-money button-down,
 * silver mirror lace trims, and hanging sleeve tassel strings.
 * Smoothly tracks cursor on X and Y axes.
 */
export default function Mannequin3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup with Full Alpha Transparency ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.2, 3.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Clear any previous canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- High-Fashion Studio Lighting ---
    // Key Light (Crisp White)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    // Gold Rim Light (Metallic Gold Glow #D4AF37)
    const goldRimLight = new THREE.DirectionalLight(0xD4AF37, 3.5);
    goldRimLight.position.set(-3, 2, -2);
    scene.add(goldRimLight);

    // Subtle Top Gold Light
    const topLight = new THREE.PointLight(0xF3E5AB, 1.8, 10);
    topLight.position.set(0, 3, 2);
    scene.add(topLight);

    // Soft Ambient
    const ambientLight = new THREE.AmbientLight(0x222222, 1.0);
    scene.add(ambientLight);

    // --- Master 3D Group ---
    const mannequinGroup = new THREE.Group();
    scene.add(mannequinGroup);

    // Position mannequin so full torso & outfit is centered
    mannequinGroup.position.set(0, -0.4, 0);

    // --- Luxury Materials ---
    // 1. Mannequin Body Surface (Polished Obsidian Mannequin)
    const mannequinMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      metalness: 0.85,
      roughness: 0.15
    });

    // 2. Structured Korean-Fit Blazer Fabric (Deep Charcoal Suiting)
    const blazerMat = new THREE.MeshStandardMaterial({
      color: 0x121212,
      metalness: 0.1,
      roughness: 0.85
    });

    // 3. Old Money Layered Shirt (Crisp Off-White Oxford)
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xE8E6E1,
      metalness: 0.05,
      roughness: 0.95
    });

    // 4. Subtle Silver Mirror Lace Trim (High-Reflective Chrome)
    const silverMirrorMat = new THREE.MeshStandardMaterial({
      color: 0xE0E0E0,
      metalness: 0.98,
      roughness: 0.05
    });

    // 5. Metallic Gold Accents & Tassel Tips (#D4AF37)
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.92,
      roughness: 0.18
    });

    // 6. Upcycled Braided Tassel Cords
    const tasselCordMat = new THREE.MeshStandardMaterial({
      color: 0x2A2A2A,
      roughness: 0.9
    });

    // --- Geometry Construction ---

    // A. Head (Minimalist Sculpted Oval)
    const headGeo = new THREE.SphereGeometry(0.24, 32, 32);
    headGeo.scale(0.85, 1.15, 0.9);
    const headMesh = new THREE.Mesh(headGeo, mannequinMat);
    headMesh.position.set(0, 1.48, 0);
    mannequinGroup.add(headMesh);

    // Halo Ring / Crown Accent in Gold
    const haloGeo = new THREE.TorusGeometry(0.28, 0.008, 16, 64);
    haloGeo.rotateX(Math.PI / 2);
    const haloMesh = new THREE.Mesh(haloGeo, goldMat);
    haloMesh.position.set(0, 1.72, 0);
    mannequinGroup.add(haloMesh);

    // B. Neck (Slender Tailoring Form)
    const neckGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.25, 32);
    const neckMesh = new THREE.Mesh(neckGeo, mannequinMat);
    neckMesh.position.set(0, 1.25, 0);
    mannequinGroup.add(neckMesh);

    // C. "Old Money" Layered Shirt (Inner Placket & High Collar)
    const collarGeo = new THREE.TorusGeometry(0.15, 0.035, 16, 32);
    collarGeo.rotateX(Math.PI / 2.2);
    const collarMesh = new THREE.Mesh(collarGeo, shirtMat);
    collarMesh.position.set(0, 1.16, 0.02);
    mannequinGroup.add(collarMesh);

    // Shirt Front V-Placket
    const shirtPlacketGeo = new THREE.BoxGeometry(0.22, 0.55, 0.1);
    const shirtPlacket = new THREE.Mesh(shirtPlacketGeo, shirtMat);
    shirtPlacket.position.set(0, 0.85, 0.16);
    mannequinGroup.add(shirtPlacket);

    // Gold Shirt Buttons
    for (let i = 0; i < 3; i++) {
      const btnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 16);
      btnGeo.rotateX(Math.PI / 2);
      const btn = new THREE.Mesh(btnGeo, goldMat);
      btn.position.set(0, 0.98 - i * 0.14, 0.22);
      mannequinGroup.add(btn);
    }

    // D. Structured Korean-Fit Oversized Blazer (Boxy Shoulders & Dramatic Cut)
    const torsoGeo = new THREE.BoxGeometry(0.72, 0.85, 0.36);
    const torsoMesh = new THREE.Mesh(torsoGeo, blazerMat);
    torsoMesh.position.set(0, 0.65, 0);
    mannequinGroup.add(torsoMesh);

    // Structured Padded Shoulders
    const shoulderLeftGeo = new THREE.BoxGeometry(0.26, 0.14, 0.38);
    const shoulderLeft = new THREE.Mesh(shoulderLeftGeo, blazerMat);
    shoulderLeft.position.set(-0.42, 0.98, 0);
    shoulderLeft.rotation.z = -0.12;
    mannequinGroup.add(shoulderLeft);

    const shoulderRightGeo = new THREE.BoxGeometry(0.26, 0.14, 0.38);
    const shoulderRight = new THREE.Mesh(shoulderRightGeo, blazerMat);
    shoulderRight.position.set(0.42, 0.98, 0);
    shoulderRight.rotation.z = 0.12;
    mannequinGroup.add(shoulderRight);

    // Left Lapel (Layered)
    const lapelLeftGeo = new THREE.BoxGeometry(0.18, 0.65, 0.04);
    const lapelLeft = new THREE.Mesh(lapelLeftGeo, blazerMat);
    lapelLeft.position.set(-0.16, 0.78, 0.2);
    lapelLeft.rotation.z = 0.25;
    mannequinGroup.add(lapelLeft);

    // Right Lapel (Layered Double-Breasted Cross)
    const lapelRightGeo = new THREE.BoxGeometry(0.18, 0.65, 0.04);
    const lapelRight = new THREE.Mesh(lapelRightGeo, blazerMat);
    lapelRight.position.set(0.16, 0.78, 0.21);
    lapelRight.rotation.z = -0.25;
    mannequinGroup.add(lapelRight);

    // Silver Mirror Lace Trims along Lapel Edges
    const trimLeftGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.68, 16);
    const trimLeft = new THREE.Mesh(trimLeftGeo, silverMirrorMat);
    trimLeft.position.set(-0.11, 0.77, 0.23);
    trimLeft.rotation.z = 0.25;
    mannequinGroup.add(trimLeft);

    const trimRightGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.68, 16);
    const trimRight = new THREE.Mesh(trimRightGeo, silverMirrorMat);
    trimRight.position.set(0.11, 0.77, 0.24);
    trimRight.rotation.z = -0.25;
    mannequinGroup.add(trimRight);

    // E. Left & Right Sleeves
    const sleeveLeftGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.78, 24);
    const sleeveLeft = new THREE.Mesh(sleeveLeftGeo, blazerMat);
    sleeveLeft.position.set(-0.48, 0.52, 0);
    sleeveLeft.rotation.z = 0.18;
    mannequinGroup.add(sleeveLeft);

    const sleeveRightGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.78, 24);
    const sleeveRight = new THREE.Mesh(sleeveRightGeo, blazerMat);
    sleeveRight.position.set(0.48, 0.52, 0);
    sleeveRight.rotation.z = -0.18;
    mannequinGroup.add(sleeveRight);

    // Silver Mirror Cuff Trims
    const cuffLeftGeo = new THREE.TorusGeometry(0.105, 0.012, 16, 32);
    cuffLeftGeo.rotateX(Math.PI / 2);
    const cuffLeft = new THREE.Mesh(cuffLeftGeo, silverMirrorMat);
    cuffLeft.position.set(-0.55, 0.15, 0);
    mannequinGroup.add(cuffLeft);

    const cuffRightGeo = new THREE.TorusGeometry(0.105, 0.012, 16, 32);
    cuffRightGeo.rotateX(Math.PI / 2);
    const cuffRight = new THREE.Mesh(cuffRightGeo, silverMirrorMat);
    cuffRight.position.set(0.55, 0.15, 0);
    mannequinGroup.add(cuffRight);

    // F. Upcycled Hanging Sleeve Tassel Strings with Gold Metallic Tips
    function createTasselGroup(xOffset) {
      const tasselGrp = new THREE.Group();
      const stringCount = 4;

      for (let i = 0; i < stringCount; i++) {
        const length = 0.28 + i * 0.04;
        const cordGeo = new THREE.CylinderGeometry(0.004, 0.004, length, 8);
        const cord = new THREE.Mesh(cordGeo, tasselCordMat);
        cord.position.set((i - 1.5) * 0.025, -length / 2, (Math.random() - 0.5) * 0.03);
        cord.rotation.z = (Math.random() - 0.5) * 0.15;
        tasselGrp.add(cord);

        // Gold tip on each tassel cord
        const tipGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.03, 12);
        const tip = new THREE.Mesh(tipGeo, goldMat);
        tip.position.set(cord.position.x, -length, cord.position.z);
        tasselGrp.add(tip);
      }

      tasselGrp.position.set(xOffset, 0.14, 0);
      return tasselGrp;
    }

    const leftTassels = createTasselGroup(-0.55);
    const rightTassels = createTasselGroup(0.55);
    mannequinGroup.add(leftTassels);
    mannequinGroup.add(rightTassels);

    // G. Structured Wide Trousers (Waist & Lower Cut)
    const trousersGeo = new THREE.CylinderGeometry(0.32, 0.36, 0.65, 32);
    const trousers = new THREE.Mesh(trousersGeo, blazerMat);
    trousers.position.set(0, -0.05, 0);
    mannequinGroup.add(trousers);

    // Gold Waist Detail
    const beltGeo = new THREE.TorusGeometry(0.33, 0.009, 16, 64);
    beltGeo.rotateX(Math.PI / 2);
    const belt = new THREE.Mesh(beltGeo, goldMat);
    belt.position.set(0, 0.22, 0);
    mannequinGroup.add(belt);

    // --- Floating Metallic Orbit Rings ---
    const orbitRingGeo = new THREE.TorusGeometry(0.85, 0.004, 16, 100);
    orbitRingGeo.rotateX(Math.PI / 3);
    const orbitRing = new THREE.Mesh(orbitRingGeo, goldMat);
    orbitRing.position.set(0, 0.6, 0);
    mannequinGroup.add(orbitRing);

    // --- Mouse Tracking and Smooth Rotation Damping ---
    let mouse = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates: -1 to 1
      const nx = (clientX / rect.width) * 2 - 1;
      const ny = (clientY / rect.height) * 2 - 1;

      targetRotation.y = nx * 0.55; // Fluid horizontal rotation
      targetRotation.x = ny * 0.25; // Subtle vertical tilt
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth Lerp Damping for fluid cursor tracking
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;

      mannequinGroup.rotation.y = currentRotation.y;
      mannequinGroup.rotation.x = currentRotation.x;

      // Subtle Organic Floating Breath Motion
      mannequinGroup.position.y = -0.4 + Math.sin(time * 1.6) * 0.035;

      // Orbit ring slow precession
      orbitRing.rotation.z = time * 0.25;

      // Gentle swaying on tassel cords
      leftTassels.rotation.z = Math.sin(time * 3.0) * 0.08;
      rightTassels.rotation.z = -Math.sin(time * 3.0) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[550px] md:min-h-[680px] relative pointer-events-auto flex items-center justify-center select-none"
      style={{ background: 'transparent' }}
    />
  );
}
