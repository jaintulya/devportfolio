"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollRef } from "@/lib/scrollRef";
import { TIERS } from "@/lib/quality";

// ── Simplex-like noise for organic drift (permutation table hoisted) ──
const NOISE_PERM = (() => {
  const p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,18,245,164,212,147,187,198,200,133,158,134,148,175,212,162,168,154,143,174,164,177,160,157,155,152,150];
  const perm = new Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return perm;
})();

function grad3(hash, x, y, z) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
}

function noise3D(x, y, z) {
  const perm = NOISE_PERM;
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
  x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
  const u = x * x * x * (x * (x * 6 - 15) + 10);
  const v = y * y * y * (y * (y * 6 - 15) + 10);
  const w = z * z * z * (z * (z * 6 - 15) + 10);
  const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
  const B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
  const lerp = (t, a, b) => a + t * (b - a);
  return lerp(w, lerp(v, lerp(u, grad3(perm[AA], x, y, z), grad3(perm[BA], x - 1, y, z)),
    lerp(u, grad3(perm[AB], x, y - 1, z), grad3(perm[BB], x - 1, y - 1, z))),
    lerp(v, lerp(u, grad3(perm[AA + 1], x, y, z - 1), grad3(perm[BA + 1], x - 1, y, z - 1)),
      lerp(u, grad3(perm[AB + 1], x, y - 1, z - 1), grad3(perm[BB + 1], x - 1, y - 1, z - 1))));
}

function HeroBokeh({ mouseRef, count }) {
  const ref = useRef(null);
  const noiseTime = useRef(0);

  const { positions, colors, basePositions } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const bp = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#C9A27E"),
      new THREE.Color("#E8CBAA"),
      new THREE.Color("#A8825A"),
      new THREE.Color("#F5ead6"),
    ];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 5 - 1;
      p[i * 3] = bp[i * 3] = x;
      p[i * 3 + 1] = bp[i * 3 + 1] = y;
      p[i * 3 + 2] = bp[i * 3 + 2] = z;
      const col = palette[Math.floor(Math.random() * palette.length)].clone();
      col.multiplyScalar(0.35 + Math.random() * 0.65);
      c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b;
    }
    return { positions: p, colors: c, basePositions: bp };
  }, [count]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    noiseTime.current += delta * 0.15;
    const pts = ref.current;
    const pos = pts.geometry.attributes.position.array;
    const t = noiseTime.current;
    const heroOpacity = Math.max(0, 1 - scrollRef.current.progress * 2.5);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3], by = basePositions[i3 + 1], bz = basePositions[i3 + 2];
      const nx = noise3D(bx * 0.3 + t * 0.4, by * 0.3, bz * 0.3) * 0.6;
      const ny = noise3D(bx * 0.3, by * 0.3 + t * 0.35, bz * 0.3) * 0.6;
      const nz = noise3D(bx * 0.3, by * 0.3, bz * 0.3 + t * 0.3) * 0.3;
      pos[i3] = bx + nx;
      pos[i3 + 1] = by + ny;
      pos[i3 + 2] = bz + nz;
    }
    pts.geometry.attributes.position.needsUpdate = true;

    const mx = mouseRef.current?.x || 0;
    const my = mouseRef.current?.y || 0;
    pts.rotation.y = THREE.MathUtils.lerp(pts.rotation.y, mx * 0.04, 0.04);
    pts.rotation.x = THREE.MathUtils.lerp(pts.rotation.x, my * 0.025, 0.04);
    pts.material.opacity = heroOpacity;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        size={0.16}
        sizeAttenuation
        vertexColors
      />
    </Points>
  );
}

// ── Light streak curve for Story section ──
function LightStreakCurve() {
  const lineRef = useRef(null);

  const { curvePoints } = useMemo(() => {
    const pts = [
      new THREE.Vector3(-6, 3.5, -1),
      new THREE.Vector3(-2.5, 2.0, -1.5),
      new THREE.Vector3(0, -0.5, -2),
      new THREE.Vector3(2.5, -2.5, -1.5),
      new THREE.Vector3(6, -4.5, -1),
    ];
    const samples = 120;
    const curve = new THREE.CatmullRomCurve3(pts);
    const cp = [];
    for (let i = 0; i < samples; i++) {
      cp.push(curve.getPointAt(i / (samples - 1)));
    }
    return { curvePoints: cp };
  }, []);

  const positions = useMemo(() => {
    const arr = new Float32Array(curvePoints.length * 3);
    curvePoints.forEach((p, i) => { arr[i * 3] = p.x; arr[i * 3 + 1] = p.y; arr[i * 3 + 2] = p.z; });
    return arr;
  }, [curvePoints]);

  // Reused color buffer — updated in place each frame
  const colorArray = useMemo(() => new Float32Array(curvePoints.length * 3), [curvePoints]);

  useFrame(() => {
    if (!lineRef.current) return;
    // Fade based on story section being in view (scroll progress 0.05–0.4)
    const progress = scrollRef.current.progress;
    const visibility = Math.max(0, Math.min(1, (progress - 0.05) / 0.08)) * Math.max(0, Math.min(1, 1 - (progress - 0.3) / 0.1));
    const geo = lineRef.current.geometry;
    const total = geo.attributes.position.count;
    const drawCount = Math.floor(total * Math.max(0, Math.min(1, visibility * 1.5)));
    for (let i = 0; i < total; i++) {
      const t = i / (total - 1);
      const drawn = i < drawCount;
      const edge = drawn ? Math.min(1, (drawCount - i) / 8) : 0;
      const fadeIn = Math.min(1, t / 0.3);
      const fadeOut = Math.min(1, (1 - t) / 0.3);
      const alpha = edge * fadeIn * fadeOut * visibility;
      colorArray[i * 3] = 0.79 * alpha;
      colorArray[i * 3 + 1] = 0.64 * alpha;
      colorArray[i * 3 + 2] = 0.49 * alpha;
    }
    if (!geo.attributes.color) {
      geo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
    } else {
      geo.attributes.color.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </line>
  );
}

// ── Camera glides along the story's light curve while the timeline is pinned ──
const CAMERA_TMP = new THREE.Vector3();
function StoryCamera() {
  const current = useRef(0);

  const path = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.4, 6.2),
    new THREE.Vector3(-1.4, 0.2, 5.6),
    new THREE.Vector3(0.9, -0.3, 6.8),
    new THREE.Vector3(0, 0.5, 7.4),
  ]), []);

  useFrame(({ camera }) => {
    const p = scrollRef.current.progress;
    // Story window sits at scroll progress 0.05–0.4; ease the camera along it
    const t = THREE.MathUtils.clamp((p - 0.05) / 0.35, 0, 1);
    current.current = THREE.MathUtils.lerp(current.current, t, 0.06);
    path.getPoint(current.current, CAMERA_TMP);
    camera.position.x += (CAMERA_TMP.x - camera.position.x) * 0.06;
    camera.position.y += (CAMERA_TMP.y - camera.position.y) * 0.06;
    camera.position.z += (CAMERA_TMP.z - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Closing bokeh echo for CTA section ──
function CtaBokeh({ count }) {
  const ref = useRef(null);
  const noiseTime = useRef(0);

  const { positions, colors, basePositions } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const bp = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#C9A27E"),
      new THREE.Color("#E8CBAA"),
      new THREE.Color("#A8825A"),
      new THREE.Color("#F5ead6"),
    ];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 5 - 1;
      p[i * 3] = bp[i * 3] = x;
      p[i * 3 + 1] = bp[i * 3 + 1] = y;
      p[i * 3 + 2] = bp[i * 3 + 2] = z;
      const col = palette[Math.floor(Math.random() * palette.length)].clone();
      col.multiplyScalar(0.35 + Math.random() * 0.65);
      c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b;
    }
    return { positions: p, colors: c, basePositions: bp };
  }, [count]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    noiseTime.current += delta * 0.12;
    const pts = ref.current;
    const pos = pts.geometry.attributes.position.array;
    const t = noiseTime.current;
    // Visible in the last 12% of scroll
    const progress = scrollRef.current.progress;
    const ctaOpacity = Math.max(0, Math.min(1, (progress - 0.85) / 0.05)) * Math.max(0, Math.min(1, 1 - (progress - 0.95) / 0.05)) * 0.5;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3], by = basePositions[i3 + 1], bz = basePositions[i3 + 2];
      pos[i3] = bx + noise3D(bx * 0.3 + t * 0.3, by * 0.3, t * 0.2) * 0.5;
      pos[i3 + 1] = by + noise3D(bx * 0.3, by * 0.3 + t * 0.3, t * 0.2) * 0.5;
      pos[i3 + 2] = bz;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    pts.material.opacity = ctaOpacity;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        size={0.14}
        sizeAttenuation
        vertexColors
      />
    </Points>
  );
}

// ── Main scene component ──
export default function R3FScene({ mouseRef, tier }) {
  const count = TIERS[tier]?.count || TIERS.high.count;

  return (
    <group>
      <HeroBokeh mouseRef={mouseRef} count={count} />
      <LightStreakCurve />
      <StoryCamera />
      <CtaBokeh count={count} />
    </group>
  );
}