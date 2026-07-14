import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeSceneProps {
  scrollPercent: number;
}

export default function ThreeScene({ scrollPercent }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    // Camera starts back for zoom-in intro
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f5ff, 5, 100);
    cyanPointLight.position.set(20, 20, 20);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0x7c3aed, 5, 100);
    purplePointLight.position.set(-20, -20, 20);
    scene.add(purplePointLight);

    // 1. STARFIELD SYSTEM (Twinkling space)
    const starsCount = 1500;
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      // Random coordinates in a shell sphere
      const r = 120 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starsPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starsPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starsPositions[i + 2] = r * Math.cos(phi);

      // Star colors (cyans, purples, whites)
      const rand = Math.random();
      if (rand < 0.3) {
        starsColors[i] = 0.0; // R (Cyan-ish)
        starsColors[i + 1] = 0.96; // G
        starsColors[i + 2] = 1.0; // B
      } else if (rand < 0.6) {
        starsColors[i] = 0.49; // R (Purple-ish)
        starsColors[i + 1] = 0.23; // G
        starsColors[i + 2] = 0.93; // B
      } else {
        starsColors[i] = 0.9; // R (White)
        starsColors[i + 1] = 0.9; // G
        starsColors[i + 2] = 1.0; // B
      }
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(starsColors, 3));

    // Simple round star texture using standard HTML canvas data URI
    const createStarTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.3, "rgba(255,255,255,0.8)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const starsMaterial = new THREE.PointsMaterial({
      size: 1.2,
      map: createStarTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // 2. CENTRAL HOLOGRAPHIC SPHERE (Animated Globe / Earth)
    const sphereRadius = 14;
    const sphereParticlesCount = 800;
    const sphereGeometry = new THREE.BufferGeometry();
    const spherePositions = new Float32Array(sphereParticlesCount * 3);
    const sphereOrigPositions = new Float32Array(sphereParticlesCount * 3);

    for (let i = 0; i < sphereParticlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      const idx = i * 3;
      spherePositions[idx] = x;
      spherePositions[idx + 1] = y;
      spherePositions[idx + 2] = z;

      sphereOrigPositions[idx] = x;
      sphereOrigPositions[idx + 1] = y;
      sphereOrigPositions[idx + 2] = z;
    }

    sphereGeometry.setAttribute("position", new THREE.BufferAttribute(spherePositions, 3));

    const sphereMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const sphereParticles = new THREE.Points(sphereGeometry, sphereMaterial);
    scene.add(sphereParticles);

    // Wireframe Sphere Overlay (for that tech cyber structure)
    const wireSphereGeo = new THREE.SphereGeometry(sphereRadius, 16, 16);
    const wireSphereMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const wireSphere = new THREE.Mesh(wireSphereGeo, wireSphereMat);
    scene.add(wireSphere);

    // 3. ROTATING HOLOGRAPHIC RINGS
    const rings: THREE.Line[] = [];
    const ringMaterials = [
      new THREE.LineBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.4 }),
      new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.3 }),
      new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.4 }),
    ];

    const ringRadii = [22, 28, 34];
    const ringSegments = 128;

    ringRadii.forEach((radius, ringIdx) => {
      const ringPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= ringSegments; i++) {
        const theta = (i / ringSegments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ring = new THREE.Line(ringGeo, ringMaterials[ringIdx]);
      // Give rings different inclinations
      if (ringIdx === 0) ring.rotation.x = Math.PI / 4;
      if (ringIdx === 1) ring.rotation.z = Math.PI / 3;
      if (ringIdx === 2) ring.rotation.x = -Math.PI / 6;

      scene.add(ring);
      rings.push(ring);
    });

    // 4. FLOATING DEV NODES (React, Node, Mongo, AWS, Docker, Git, AI)
    // Procedural 3D nodes representing tech
    const nodeCount = 7;
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const techNames = ["React", "Node", "MongoDB", "AWS", "Docker", "Git", "AI Studio"];
    const nodeColors = [0x61dafb, 0x339933, 0x47a248, 0xff9900, 0x2496ed, 0xf05032, 0x00f5ff];

    const nodePositions: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 45;
      const nodePos = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 20,
        Math.sin(angle) * radius
      );
      nodePositions.push(nodePos);

      // Core anchor point sphere
      const nodeGeo = new THREE.SphereGeometry(1.5, 12, 12);
      const nodeMat = new THREE.MeshPhongMaterial({
        color: nodeColors[i],
        emissive: nodeColors[i],
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.9,
        shininess: 100,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(nodePos);
      nodeGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Outer ring for node
      const outerRingGeo = new THREE.RingGeometry(2.5, 2.7, 16);
      const outerRingMat = new THREE.MeshBasicMaterial({
        color: nodeColors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
      outerRing.rotation.x = Math.PI / 2;
      nodeMesh.add(outerRing);
    }

    // Connect nodes with light holographic links
    const linksGeometry = new THREE.BufferGeometry();
    const linksPositions = new Float32Array(nodeCount * 3 * 2); // 2 points per node connecting to central sphere
    linksGeometry.setAttribute("position", new THREE.BufferAttribute(linksPositions, 3));
    const linksMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const nodeLinks = new THREE.LineSegments(linksGeometry, linksMaterial);
    scene.add(nodeLinks);

    // 5. CYBER GRID (Perspective floor)
    const gridHelper = new THREE.GridHelper(400, 50, 0x00f5ff, 0x1e293b);
    gridHelper.position.y = -45;
    // Lower grid opacity
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((mat: any) => {
        mat.transparent = true;
        mat.opacity = 0.08;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.08;
    }
    scene.add(gridHelper);

    // Track mouse coordinates
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates: -1 to 1
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Clock for animation timing
    const clock = new THREE.Clock();

    // 6. ANIMATION LOOP
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Camera Intro Animation (Zoom In)
      if (camera.position.z > 58) {
        camera.position.z -= (camera.position.z - 58) * 0.04;
        if (camera.position.z <= 59.5) {
          setIntroFinished(true);
        }
      }

      // Scroll Interactions
      // Camera moves down and rotates slightly based on scroll
      const targetCameraY = -scrollPercent * 60;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;

      // Mouse Parallax Perspective Shift
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Apply parallax to overall scene rotation
      scene.rotation.y = mouse.x * 0.15;
      scene.rotation.x = -mouse.y * 0.1;

      // Rotate Stars
      stars.rotation.y = elapsedTime * 0.015;

      // Rotate central sphere
      sphereParticles.rotation.y = elapsedTime * 0.08;
      sphereParticles.rotation.x = elapsedTime * 0.03;
      wireSphere.rotation.y = elapsedTime * 0.04;
      wireSphere.rotation.x = elapsedTime * 0.015;

      // Sphere organic pulsing (wave distortion)
      const positions = sphereGeometry.attributes.position.array as Float32Array;
      const origPositions = sphereOrigPositions;
      for (let i = 0; i < sphereParticlesCount; i++) {
        const idx = i * 3;
        const x = origPositions[idx];
        const y = origPositions[idx + 1];
        const z = origPositions[idx + 2];

        // Wave formula based on time and height
        const wave = Math.sin(elapsedTime * 2.5 + y * 0.5) * 0.35;
        const scale = 1 + wave / sphereRadius;

        positions[idx] = x * scale;
        positions[idx + 1] = y * scale;
        positions[idx + 2] = z * scale;
      }
      sphereGeometry.attributes.position.needsUpdate = true;

      // Rotate Holographic Rings
      rings.forEach((ring, idx) => {
        const speedMultiplier = (idx + 1) * 0.15;
        ring.rotation.y = elapsedTime * speedMultiplier;
        ring.rotation.x += Math.sin(elapsedTime * 0.2) * 0.0005;
      });

      // Animate Dev Nodes
      nodeMeshes.forEach((node, idx) => {
        // Floating sine-wave effect
        const offset = idx * (Math.PI / 3);
        node.position.y = nodePositions[idx].y + Math.sin(elapsedTime * 1.5 + offset) * 2.5;

        // Pulse the node scale slightly
        const scale = 1 + Math.sin(elapsedTime * 3 + offset) * 0.12;
        node.scale.set(scale, scale, scale);
      });

      // Update holographic Links coordinates
      const linksPos = linksGeometry.attributes.position.array as Float32Array;
      let posIdx = 0;
      nodeMeshes.forEach((node) => {
        // Link starts at node
        linksPos[posIdx++] = node.position.x;
        linksPos[posIdx++] = node.position.y;
        linksPos[posIdx++] = node.position.z;

        // Connects to a point near the sphere center
        const t = elapsedTime * 2;
        linksPos[posIdx++] = Math.sin(t) * 2;
        linksPos[posIdx++] = Math.cos(t) * 2;
        linksPos[posIdx++] = 0;
      });
      linksGeometry.attributes.position.needsUpdate = true;

      // Grid scroll feedback
      gridHelper.position.z = (elapsedTime * 15) % 16;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      wireSphereGeo.dispose();
      wireSphereMat.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        if (Array.isArray(ring.material)) {
          ring.material.forEach((m) => m.dispose());
        } else {
          ring.material.dispose();
        }
      });
      nodeMeshes.forEach((node) => {
        node.geometry.dispose();
        if (Array.isArray(node.material)) {
          node.material.forEach((m) => m.dispose());
        } else {
          node.material.dispose();
        }
      });
      linksGeometry.dispose();
      linksMaterial.dispose();
    };
  }, [scrollPercent]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Background radial gradient mask to match footer/header styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] opacity-80" />
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
