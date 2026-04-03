"use client";
import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Line, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const MODELS = ["GPT-4", "Claude", "Gemini", "Llama", "Mistral", "Cohere"];

const Node = ({ position, label, orbitRadius, speed, offset }: { position: [number, number, number], label: string, orbitRadius: number, speed: number, offset: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    const x = Math.cos(t) * orbitRadius;
    const z = Math.sin(t) * orbitRadius;
    
    if (meshRef.current) {
      meshRef.current.position.set(x, 0, z);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#00c8ff" />
        <Html position={[0.2, 0.2, 0]} center>
          <div className="text-[10px] font-mono text-text-dim hover:text-accent-primary transition-colors cursor-pointer whitespace-nowrap">
            {label}
          </div>
        </Html>
      </mesh>
      
      {/* Orbit Circle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.01, orbitRadius + 0.01, 64]} />
        <meshBasicMaterial color="#0e2233" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const ConnectionLines = ({ nodesCount }: { nodesCount: number }) => {
  const lineGeometry = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(1, 0, 0)); // Dummy, updated in useFrame
    return points;
  }, []);

  const linesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    const t = clock.getElapsedTime();
    
    linesRef.current.children.forEach((line, i) => {
      const orbitRadius = 3 + i * 0.8;
      const speed = 0.2 - i * 0.02;
      const offset = i * (Math.PI * 2 / nodesCount);
      
      const currentTime = t * speed + offset;
      const x = Math.cos(currentTime) * orbitRadius;
      const z = Math.sin(currentTime) * orbitRadius;
      
      const positions = (line as any).geometry.attributes.position.array;
      positions[3] = x;
      positions[4] = 0;
      positions[5] = z;
      (line as any).geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group ref={linesRef}>
      {Array.from({ length: nodesCount }).map((_, i) => (
        <Line
          key={i}
          points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0)]}
          color="#00c8ff"
          lineWidth={1}
          transparent
          opacity={0.2}
          dashed
          dashScale={5}
          dashSize={0.2}
          gapSize={0.1}
        />
      ))}
    </group>
  );
};

const ParticleField = () => {
  const points = useMemo(() => {
    const p = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const r = THREE.MathUtils.randFloat(6, 12);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00c8ff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

const CentralNode = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#00c8ff" wireframe />
      </mesh>
      <pointLight intensity={2} color="#00c8ff" />
    </group>
  );
};

export default function GatewayScene() {
  if (typeof window === 'undefined') return null;

  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CentralNode />
          
          {MODELS.map((label, i) => (
            <Node
              key={label}
              label={label}
              orbitRadius={3 + i * 0.8}
              speed={0.2 - i * 0.02}
              offset={i * (Math.PI * 2 / MODELS.length)}
              position={[0, 0, 0]}
            />
          ))}
          
          <ConnectionLines nodesCount={MODELS.length} />
          <ParticleField />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2 + 0.3}
            minDistance={8}
            maxDistance={12}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
