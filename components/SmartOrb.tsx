import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Environment, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { InteractionState } from '../types';

// Spring animation hook for smooth value transitions (simulated for Three.js loop)
const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

const AnimatedSphere = ({ state }: { state: InteractionState }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Target values based on state
  const targetConfig = useMemo(() => {
    switch (state) {
      case 'idle':
        return { color: '#4c1d95', distort: 0.4, speed: 2, roughness: 0.1, metalness: 0.9, scale: 1.8 }; // Deep Violet
      case 'focused':
        return { color: '#3b82f6', distort: 0.5, speed: 3, roughness: 0.1, metalness: 0.8, scale: 2.0 }; // Blue
      case 'typing':
        return { color: '#06b6d4', distort: 0.6, speed: 5, roughness: 0, metalness: 1, scale: 2.2 }; // Cyan/Bright
      case 'processing':
        return { color: '#ffffff', distort: 0.8, speed: 8, roughness: 0, metalness: 0.2, scale: 1.5 }; // White hot
      case 'success':
        return { color: '#10b981', distort: 0.3, speed: 1, roughness: 0.4, metalness: 0.6, scale: 2.5 }; // Green
      case 'error':
        return { color: '#ef4444', distort: 1.0, speed: 12, roughness: 0.5, metalness: 0.5, scale: 1.9 }; // Red
      default:
        return { color: '#4c1d95', distort: 0.4, speed: 2, roughness: 0.1, metalness: 0.9, scale: 1.8 };
    }
  }, [state]);

  useFrame((state, delta) => {
    if (meshRef.current && materialRef.current) {
      // Smoothly interpolate current values to target values
      const easing = delta * 2.5; // Slightly snappier for "AI" feel

      materialRef.current.distort = lerp(materialRef.current.distort, targetConfig.distort, easing);
      materialRef.current.speed = lerp(materialRef.current.speed, targetConfig.speed, easing);
      materialRef.current.roughness = lerp(materialRef.current.roughness, targetConfig.roughness, easing);
      materialRef.current.metalness = lerp(materialRef.current.metalness, targetConfig.metalness, easing);
      
      // Color interpolation
      const currentColor = new THREE.Color(materialRef.current.color);
      const targetColor = new THREE.Color(targetConfig.color);
      currentColor.lerp(targetColor, easing);
      materialRef.current.color = currentColor;

      // Scale interpolation
      const currentScale = meshRef.current.scale.x;
      const newScale = lerp(currentScale, targetConfig.scale, easing);
      meshRef.current.scale.set(newScale, newScale, newScale);
      
      // Rotation
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 128, 128]} ref={meshRef}>
            <MeshDistortMaterial
            ref={materialRef}
            color={targetConfig.color}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.4}
            speed={2}
            />
        </Sphere>
        </Float>
        
        {/* Neural Dust / Data Particles - Reacts to state color */}
        <Sparkles 
            count={100} 
            scale={5} 
            size={2} 
            speed={0.4} 
            opacity={0.4} 
            color={targetConfig.color} 
        />
    </group>
  );
};

export const SmartOrb: React.FC<{ state: InteractionState }> = ({ state }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#050505']} />
        
        {/* High-end Cinematic Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#4c1d95" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />
        <spotLight position={[0, 5, 0]} intensity={1} angle={0.5} penumbra={1} distance={10} />
        <rectAreaLight width={2.5} height={1.65} intensity={10} color={'#38bdf8'} position={[0, 0, 10]} lookAt={[0, 0, 0] as any} />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <Environment preset="city" />
        
        <AnimatedSphere state={state} />
        
        {/* Deep atmosphere */}
        <fog attach="fog" args={['#050505', 4, 12]} />
      </Canvas>
    </div>
  );
};