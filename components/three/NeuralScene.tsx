"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

const NeuralNetwork = () => {
  const count = 50;
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ));
    }
    return temp;
  }, []);

  const edges = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 4) {
          temp.push([nodes[i], nodes[j]]);
        }
      }
    }
    return temp;
  }, [nodes]);

  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.06, 16, 16]}>
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
        </Sphere>
      ))}
      {edges.map((edge, i) => (
        <Line 
          key={i} 
          points={edge} 
          color="#00d4ff" 
          lineWidth={0.5} 
          transparent 
          opacity={0.1 + Math.sin(Date.now() * 0.001 + i) * 0.1} 
        />
      ))}
    </group>
  );
};

export default function NeuralScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
