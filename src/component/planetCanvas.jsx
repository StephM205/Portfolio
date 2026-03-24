import { useEffect, useRef } from "react";
import * as THREE from "three";

const createWaterTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const ocean = ctx.createLinearGradient(0, 0, 0, canvas.height);
  ocean.addColorStop(0, "#66d7ff");
  ocean.addColorStop(0.35, "#2f95e6");
  ocean.addColorStop(0.7, "#0e5bb8");
  ocean.addColorStop(1, "#06367f");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Large flowing currents.
  for (let i = 0; i < 42; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const w = 90 + Math.random() * 230;
    const h = 35 + Math.random() * 85;
    const alpha = 0.05 + Math.random() * 0.09;
    ctx.fillStyle = `rgba(170, 230, 255, ${alpha})`;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine ripples.
  for (let i = 0; i < 2800; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = 2 + Math.random() * 6;
    const alpha = 0.03 + Math.random() * 0.07;
    ctx.strokeStyle = `rgba(212, 244, 255, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y + Math.sin(x * 0.02) * 1.5);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
};

const buildStars = (count = 900) => {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = 5 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
};

export const PlanetCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 4.7);

    const planetGroup = new THREE.Group();
    planetGroup.rotation.x = -0.28;
    planetGroup.rotation.y = 0.65;
    scene.add(planetGroup);

    const waterTexture = createWaterTexture();
    const waterMaterial = new THREE.MeshPhysicalMaterial({
      map: waterTexture ?? null,
      color: "#4aa8f7",
      roughness: 0.24,
      metalness: 0.22,
      transmission: 0.12,
      thickness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      reflectivity: 0.9,
      ior: 1.33,
      emissive: "#0c3d86",
      emissiveIntensity: 0.12,
    });
    const planetCore = new THREE.Mesh(
      new THREE.SphereGeometry(1.18, 128, 128),
      waterMaterial
    );
    planetGroup.add(planetCore);

    const cloudLayer = new THREE.Mesh(
      new THREE.SphereGeometry(1.22, 72, 72),
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.12,
        roughness: 1,
        metalness: 0,
        depthWrite: false,
      })
    );
    planetGroup.add(cloudLayer);

    const waveShell = new THREE.Mesh(
      new THREE.SphereGeometry(1.245, 128, 128),
      new THREE.MeshPhysicalMaterial({
        color: "#79dcff",
        transparent: true,
        opacity: 0.23,
        roughness: 0.12,
        metalness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    planetGroup.add(waveShell);

    const stars = new THREE.Points(
      buildStars(),
      new THREE.PointsMaterial({
        color: "#f8fafc",
        size: 0.03,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      })
    );
    scene.add(stars);

    const ambient = new THREE.AmbientLight("#b6dcff", 0.72);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight("#ffffff", 1.5);
    keyLight.position.set(2.7, 1.6, 3.4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#89d4ff", 1.2);
    rimLight.position.set(-3, -0.5, -2.4);
    scene.add(rimLight);

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
    };

    const onPointerDown = (event) => {
      pointer.active = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      container.setPointerCapture(event.pointerId);
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (event) => {
      if (!pointer.active) return;

      const deltaX = event.clientX - pointer.x;
      const deltaY = event.clientY - pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      pointer.velocityY = deltaX * 0.0024;
      pointer.velocityX = deltaY * 0.0019;

      planetGroup.rotation.y += pointer.velocityY;
      planetGroup.rotation.x += pointer.velocityX;
      planetGroup.rotation.x = THREE.MathUtils.clamp(
        planetGroup.rotation.x,
        -1.1,
        1.1
      );
    };

    const onPointerUp = (event) => {
      pointer.active = false;
      container.releasePointerCapture(event.pointerId);
      container.style.cursor = "grab";
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    let frameId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();
      frameId = requestAnimationFrame(render);

      if (!pointer.active) {
        pointer.velocityY *= 0.96;
        pointer.velocityX *= 0.95;
        planetGroup.rotation.y += 0.0028 + pointer.velocityY;
        planetGroup.rotation.x += pointer.velocityX;
        planetGroup.rotation.x = THREE.MathUtils.clamp(
          planetGroup.rotation.x,
          -1.1,
          1.1
        );
      }

      // Animate ocean currents and wave shimmer.
      if (waterTexture) {
        waterTexture.offset.x += 0.0007;
        waterTexture.offset.y += 0.00035;
      }
      waterMaterial.clearcoatRoughness = 0.1 + Math.sin(elapsed * 1.6) * 0.03;
      waveShell.scale.setScalar(1 + Math.sin(elapsed * 2.2) * 0.008);
      waveShell.rotation.y += 0.0016;
      waveShell.rotation.x = Math.sin(elapsed * 1.1) * 0.03;

      cloudLayer.rotation.y += 0.0012;

      stars.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };
    render();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);

      scene.traverse((object) => {
        if (!object.isMesh && !object.isPoints) return;
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
          return;
        }
        object.material?.dispose();
      });

      renderer.dispose();
      waterTexture?.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="planet-canvas"
      role="img"
      aria-label="Interactive 3D planet, drag to rotate"
    />
  );
};
