'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type SceneProps = {
  kind: 'home' | 'commercial';
  progress: number;
};

const stone = new THREE.MeshPhysicalMaterial({
  color: '#d8c6aa',
  roughness: 0.48,
  metalness: 0.04,
  clearcoat: 0.16,
});

const brass = new THREE.MeshStandardMaterial({
  color: '#b28b4e',
  roughness: 0.22,
  metalness: 0.92,
});

function ResidentialSculpture({ progress }: { progress: number }) {
  const root = useRef<THREE.Group>(null);
  const ribbons = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const steps = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    angle: i * 0.41 - 2.4,
    y: (i - 6.5) * 0.245,
    scale: 1 - Math.abs(i - 6.5) * 0.018,
  })), []);

  useFrame((state, delta) => {
    if (!root.current || !ribbons.current) return;
    const targetY = pointer.x * 0.25 + progress * 0.85 - 0.15;
    const targetX = pointer.y * -0.12 + progress * 0.12;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, targetY, 3, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, targetX, 3, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, progress * 0.38, 2.5, delta);
    ribbons.current.rotation.y += delta * (0.13 + Math.abs(pointer.x) * 0.1);
    ribbons.current.scale.setScalar(THREE.MathUtils.damp(ribbons.current.scale.x, 1 + Math.abs(pointer.x) * 0.07, 3, delta));
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.18}>
      <group ref={root} rotation={[0.05, -0.12, -0.03]} position={[0.45, -0.12, 0]}>
        <mesh position={[0, 0, -0.05]} castShadow>
          <cylinderGeometry args={[0.11, 0.16, 4.3, 48]} />
          <primitive object={brass} attach="material" />
        </mesh>
        {steps.map((step, i) => (
          <group key={i} rotation={[0, step.angle, 0]} position={[0, step.y, 0]}>
            <RoundedBox args={[1.65 * step.scale, 0.105, 0.62]} radius={0.045} smoothness={4} position={[0.67, 0, 0]} castShadow receiveShadow>
              <primitive object={stone} attach="material" />
            </RoundedBox>
            <mesh position={[1.48, 0.018, 0]} castShadow>
              <boxGeometry args={[0.018, 0.128, 0.63]} />
              <primitive object={brass} attach="material" />
            </mesh>
          </group>
        ))}
        <group ref={ribbons}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation={[Math.PI / 2 + i * 0.42, i * 1.1, 0]}>
              <torusGeometry args={[1.42 + i * 0.14, 0.012, 10, 160]} />
              <meshBasicMaterial color={i === 1 ? '#e6c987' : '#8d7146'} transparent opacity={0.68 - i * 0.12} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

function CommercialSculpture({ progress }: { progress: number }) {
  const root = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const { pointer } = useThree();
  const arches = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
    z: (i - 3) * 0.42,
    scale: 1 - Math.abs(i - 3) * 0.07,
  })), []);

  useFrame((state, delta) => {
    if (!root.current || !light.current) return;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.x * 0.28 + progress * 0.55, 3, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.y * -0.12 - progress * 0.08, 3, delta);
    root.current.position.z = THREE.MathUtils.damp(root.current.position.z, progress * 0.8, 2.5, delta);
    light.current.position.x = THREE.MathUtils.damp(light.current.position.x, pointer.x * 3.5, 4, delta);
    light.current.position.y = THREE.MathUtils.damp(light.current.position.y, pointer.y * 2.5, 4, delta);
  });

  return (
    <Float speed={1} rotationIntensity={0.06} floatIntensity={0.15}>
      <group ref={root} position={[0.52, 0, 0]} rotation={[0.04, -0.22, 0]}>
        {arches.map((arch, i) => (
          <group key={i} position={[0, 0, arch.z]} scale={arch.scale}>
            <RoundedBox args={[2.78, 0.095, 0.095]} radius={0.04} position={[0, 1.45, 0]} castShadow>
              <meshPhysicalMaterial color={i === 3 ? '#d0af72' : '#8e9690'} metalness={0.86} roughness={0.13} clearcoat={1} />
            </RoundedBox>
            <RoundedBox args={[0.095, 2.9, 0.095]} radius={0.04} position={[-1.34, 0, 0]} castShadow>
              <meshPhysicalMaterial color={i === 3 ? '#d0af72' : '#8e9690'} metalness={0.86} roughness={0.13} clearcoat={1} />
            </RoundedBox>
            <RoundedBox args={[0.095, 2.9, 0.095]} radius={0.04} position={[1.34, 0, 0]} castShadow>
              <meshPhysicalMaterial color={i === 3 ? '#d0af72' : '#8e9690'} metalness={0.86} roughness={0.13} clearcoat={1} />
            </RoundedBox>
          </group>
        ))}
        <mesh position={[0, 0, -0.18]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <octahedronGeometry args={[0.58, 0]} />
          <meshPhysicalMaterial color="#111613" metalness={0.72} roughness={0.12} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0, -0.54]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.92, 0.018, 12, 160]} />
          <meshBasicMaterial color="#d8ff69" toneMapped={false} />
        </mesh>
        <pointLight ref={light} color="#d8ff69" intensity={16} distance={5} position={[0, 0, 1.5]} />
      </group>
    </Float>
  );
}

function Scene({ kind, progress }: SceneProps) {
  return (
    <>
      <ambientLight intensity={kind === 'home' ? 1.6 : 1.1} />
      <directionalLight position={[4, 5, 5]} intensity={kind === 'home' ? 3.4 : 4.2} color={kind === 'home' ? '#fff1d3' : '#e6fff3'} castShadow />
      <directionalLight position={[-4, 0, 2]} intensity={1.4} color={kind === 'home' ? '#987052' : '#789488'} />
      {kind === 'home' ? <ResidentialSculpture progress={progress} /> : <CommercialSculpture progress={progress} />}
    </>
  );
}

export default function InteractiveHeroScene({ kind, progress }: SceneProps) {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 38 }} dpr={[1, 1.65]} gl={{ antialias: true, alpha: true }} shadows>
        <Scene kind={kind} progress={progress} />
      </Canvas>
    </div>
  );
}
