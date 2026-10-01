"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { scrollRef } from "@/lib/scrollRef";
import { mouseRef } from "@/lib/mouseRef";

// ── Minimal 3D Simplex-style Noise for Organic Floating Particles ──
const PERM = (() => {
  const p = [
    151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,
    69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,
    252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,
    168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,
    60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,
    1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,
    86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,18,245,
    164,212,147,187,198,200,133,158,134,148,175,212,162,168,154,143,174,
    164,177,160,157,155,152,150
  ];
  const out = new Uint8Array(512);
  for (let i = 0; i < 512; i++) out[i] = p[i & 255];
  return out;
})();

function noise3D(x, y, z) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);
  const u = x * x * x * (x * (x * 6 - 15) + 10);
  const v = y * y * y * (y * (y * 6 - 15) + 10);
  const w = z * z * z * (z * (z * 6 - 15) + 10);
  const A = PERM[X] + Y, AA = PERM[A] + Z, AB = PERM[A + 1] + Z;
  const B = PERM[X + 1] + Y, BA = PERM[B] + Z, BB = PERM[B + 1] + Z;
  const lerp = (t, a, b) => a + t * (b - a);
  const grad = (hash, gx, gy, gz) => {
    const h = hash & 15;
    const gu = h < 8 ? gx : gy;
    const gv = h < 4 ? gy : h === 12 || h === 14 ? gx : gz;
    return ((h & 1) ? -gu : gu) + ((h & 2) ? -gv : gv);
  };
  return lerp(
    w,
    lerp(v, lerp(u, grad(PERM[AA], x, y, z), grad(PERM[BA], x - 1, y, z)),
      lerp(u, grad(PERM[AB], x, y - 1, z), grad(PERM[BB], x - 1, y - 1, z))),
    lerp(v, lerp(u, grad(PERM[AA + 1], x, y, z - 1), grad(PERM[BA + 1], x - 1, y, z - 1)),
      lerp(u, grad(PERM[AB + 1], x, y - 1, z - 1), grad(PERM[BB + 1], x - 1, y - 1, z - 1)))
  );
}

// ── 1. Hero Depth-Displacement Parallax Plane ──
function HeroDepthPlane({ isMobile }) {
  const meshRef = useRef(null);
  const texture = useTexture("/herobg.png");

  useMemo(() => {
    if (texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
    }
  }, [texture]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const progress = scrollRef.current.progress;
    // Visible primarily in Hero (progress 0.0 to 0.18)
    const visibility = Math.max(0, 1 - progress / 0.18);
    meshRef.current.visible = visibility > 0.001;
    if (!meshRef.current.visible) return;

    // Subtle dolly and parallax
    const targetZ = -2.5 - progress * 4;
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.1;
    meshRef.current.position.y = -progress * 1.5;

    // Subtle mouse parallax tilt (desktop fine pointer only)
    if (!isMobile) {
      const mx = mouseRef.current.x * 0.12;
      const my = mouseRef.current.y * 0.08;
      meshRef.current.rotation.y += (mx - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x += (-my - meshRef.current.rotation.x) * 0.05;
    }

    meshRef.current.material.opacity = visibility * 0.75;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2.5]}>
      <planeGeometry args={[14, 8.5, isMobile ? 16 : 48, isMobile ? 16 : 48]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.75}
        roughness={0.8}
        metalness={0.1}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── 2. Ambient Cream & Gold Mote Dust Field ──
function DustMotes({ count = 300, isMobile }) {
  const ref = useRef(null);
  const effectiveCount = isMobile ? Math.floor(count * 0.3) : count;

  const { positions, colors, basePositions } = useMemo(() => {
    const pos = new Float32Array(effectiveCount * 3);
    const base = new Float32Array(effectiveCount * 3);
    const col = new Float32Array(effectiveCount * 3);
    const palette = [
      new THREE.Color("#F6E5CB"), // Cream
      new THREE.Color("#D4B896"), // Gold
      new THREE.Color("#DFC18A"), // Soft Gold
      new THREE.Color("#EAD4BE"), // Warm Sand
    ];

    for (let i = 0; i < effectiveCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 12;
      pos[i3] = base[i3] = x;
      pos[i3 + 1] = base[i3 + 1] = y;
      pos[i3 + 2] = base[i3 + 2] = z;

      const c = palette[i % palette.length];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return { positions: pos, colors: col, basePositions: base };
  }, [effectiveCount]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const p = scrollRef.current.progress;
    const time = state.clock.getElapsedTime() * 0.15;
    const posArray = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < effectiveCount; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      // Slow upward organic drift + noise
      posArray[i3] = bx + noise3D(bx * 0.3 + time, by * 0.3, time) * 0.6;
      posArray[i3 + 1] = by + Math.sin(time + bx) * 0.4 - p * 2.5;
      posArray[i3 + 2] = bz + noise3D(bx * 0.2, by * 0.2, time + bz) * 0.4;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        size={isMobile ? 0.08 : 0.12}
        sizeAttenuation
        vertexColors
        opacity={0.55}
      />
    </Points>
  );
}

// ── 3. The 3D Journey Spline & Floating Waypoints (Scroll-World Architecture) ──
function JourneySplineFlight({ isMobile }) {
  const groupRef = useRef(null);
  const lineRef = useRef(null);

  // 5 Waypoint positions matching Journey stops: College, Confidence, Food Creators, Struggle, Storytelling
  const waypoints = useMemo(() => [
    new THREE.Vector3(-4.5, 2.2, -1.0),
    new THREE.Vector3(-2.0, 1.2, -2.5),
    new THREE.Vector3(0.5, -0.2, -4.0),
    new THREE.Vector3(2.8, -1.5, -3.0),
    new THREE.Vector3(4.8, -2.8, -1.5),
  ], []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(waypoints), [waypoints]);

  const { curvePoints, curvePos } = useMemo(() => {
    const samples = 120;
    const pts = curve.getPoints(samples);
    const pos = new Float32Array(pts.length * 3);
    pts.forEach((pt, i) => {
      pos[i * 3] = pt.x;
      pos[i * 3 + 1] = pt.y;
      pos[i * 3 + 2] = pt.z;
    });
    return { curvePoints: pts, curvePos: pos };
  }, [curve]);

  useFrame(() => {
    if (!groupRef.current) return;
    const progress = scrollRef.current.progress;
    // Active during Journey & Story Section (~0.35 to 0.70)
    const inRange = progress >= 0.30 && progress <= 0.75;
    groupRef.current.visible = inRange;
    if (!inRange) return;

    const localP = THREE.MathUtils.clamp((progress - 0.35) / 0.35, 0, 1);

    // Fade in / out smoothly
    const alpha = Math.min(1, (progress - 0.30) / 0.05) * Math.min(1, (0.75 - progress) / 0.05);
    if (lineRef.current) {
      lineRef.current.material.opacity = alpha * 0.85;
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* 3D Curved Light Streak Line */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={curvePoints.length}
            array={curvePos}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#D4B896"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          linewidth={2}
          depthWrite={false}
        />
      </line>

      {/* 5 Glowing Waypoint Spheres */}
      {waypoints.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#DFC18A" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshBasicMaterial
              color="#5E181C"
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── 4. Dynamic Lighting & Fog Atmosphere Shift ──
function DynamicAtmosphere() {
  const lightRef = useRef(null);
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.FogExp2("#1A0507", 0.045);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  useFrame(() => {
    const progress = scrollRef.current.progress;
    const chapter = scrollRef.current.activeChapter || 1;

    // Shift fog color and density subtly across chapters while preserving dark maroon palette
    if (scene.fog) {
      const chapterDensity = 0.035 + (chapter % 3) * 0.008;
      scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, chapterDensity, 0.05);
    }

    if (lightRef.current) {
      // Light moves across 3D space with scroll
      lightRef.current.position.x = Math.sin(progress * Math.PI * 2) * 5;
      lightRef.current.position.y = Math.cos(progress * Math.PI * 2) * 3 + 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} color="#F7E6CC" />
      <pointLight
        ref={lightRef}
        position={[0, 4, 3]}
        intensity={1.2}
        color="#D4B896"
        distance={18}
        decay={2}
      />
      <directionalLight position={[-4, 6, 2]} intensity={0.35} color="#5E181C" />
    </>
  );
}

// ── 5. Golden Bokeh Echo for CTA and Finale ──
function FinaleBokeh({ isMobile }) {
  const ref = useRef(null);
  const count = isMobile ? 80 : 200;

  const { positions, colors, basePositions } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const bp = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#D4B896"),
      new THREE.Color("#DFC18A"),
      new THREE.Color("#F6E5CB"),
      new THREE.Color("#5E181C"),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 6 - 1;
      p[i3] = bp[i3] = x;
      p[i3 + 1] = bp[i3 + 1] = y;
      p[i3 + 2] = bp[i3 + 2] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      c[i3] = col.r;
      c[i3 + 1] = col.g;
      c[i3 + 2] = col.b;
    }
    return { positions: p, colors: c, basePositions: bp };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const progress = scrollRef.current.progress;
    // Visible in the last 20% of scroll (Testimonials, Contact, Footer)
    const visibility = Math.max(0, (progress - 0.80) / 0.15);
    ref.current.visible = visibility > 0.001;
    if (!ref.current.visible) return;

    const time = state.clock.getElapsedTime() * 0.12;
    const pos = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];
      pos[i3] = bx + noise3D(bx * 0.3 + time, by * 0.3, time * 0.2) * 0.5;
      pos[i3 + 1] = by + noise3D(bx * 0.3, by * 0.3 + time, time * 0.2) * 0.5;
      pos[i3 + 2] = bz;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.material.opacity = visibility * 0.65;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} visible={false}>
      <PointMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        size={isMobile ? 0.14 : 0.22}
        sizeAttenuation
        vertexColors
        opacity={0.65}
      />
    </Points>
  );
}

// ── 6. Unified Camera Flight Controller (Scroll-World Core) ──
const CAMERA_TMP = new THREE.Vector3();
function CinematicCameraFlight({ isMobile }) {
  const currentT = useRef(0);

  // Continuous camera flight path through the entire experience
  const flightPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 6.0),     // Hero
    new THREE.Vector3(-0.4, 0.2, 5.8), // Works
    new THREE.Vector3(0.5, -0.3, 6.2), // Services
    new THREE.Vector3(-1.2, 0.4, 5.5), // Journey Waypoint 1
    new THREE.Vector3(1.0, -0.2, 6.5),  // Journey Waypoint 2
    new THREE.Vector3(0, 0.3, 7.0),    // Chapters
    new THREE.Vector3(-0.3, 0.1, 6.0), // Founder
    new THREE.Vector3(0, 0, 5.8),      // Finale
  ]), []);

  useFrame(({ camera }) => {
    const p = scrollRef.current.progress;
    currentT.current = THREE.MathUtils.lerp(currentT.current, p, 0.08);

    flightPath.getPoint(currentT.current, CAMERA_TMP);

    // Smooth camera damping
    camera.position.x += (CAMERA_TMP.x - camera.position.x) * 0.08;
    camera.position.y += (CAMERA_TMP.y - camera.position.y) * 0.08;
    camera.position.z += (CAMERA_TMP.z - camera.position.z) * 0.08;

    // Subtle pointer parallax on camera rotation (desktop fine pointer only)
    if (!isMobile) {
      const mx = mouseRef.current.x * 0.2;
      const my = mouseRef.current.y * 0.15;
      camera.rotation.y += (mx * 0.05 - camera.rotation.y) * 0.05;
      camera.rotation.x += (-my * 0.05 - camera.rotation.x) * 0.05;
    }
  });

  return null;
}

// ── Main Scene Orchestrator ──
export default function R3FScene({ isMobile }) {
  return (
    <group>
      <DynamicAtmosphere />
      <HeroDepthPlane isMobile={isMobile} />
      <DustMotes count={isMobile ? 100 : 350} isMobile={isMobile} />
      <JourneySplineFlight isMobile={isMobile} />
      <FinaleBokeh isMobile={isMobile} />
      <CinematicCameraFlight isMobile={isMobile} />
    </group>
  );
}