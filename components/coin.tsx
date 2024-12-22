// coin.tsx

'use client'

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as THREE from 'three';

interface CoinProps {
  rotation: number;
  position: [number, number, number];
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}

export function Coin({ rotation, position, setIsDragging }: CoinProps) { 
  const [textureError, setTextureError] = useState(false);
  const texture: THREE.Texture | null = useLoader(TextureLoader, '/caonabo_logo_nbg.png', 
    undefined,
    (error) => {
      console.error('Error loading texture:', error);
      setTextureError(true);
    });

  // Set texture encoding if the texture is loaded successfully
  useEffect(() => {
    if (texture && !textureError) {
      // Removed the encoding assignment
      // You can perform other operations on the texture here if needed
    }
  }, [texture, textureError]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Front face */}
      <mesh position={[0, 0, 0.1]} onPointerDown={handleMouseDown} onPointerUp={handleMouseUp}>
        <planeGeometry args={[2, 2]} />
        <meshPhysicalMaterial 
          map={textureError ? null : texture}
          color={textureError ? 'rgba(0, 0, 0, 0)' : '#FFD700'} // Set to transparent if there's an error
          transparent={true}
          opacity={1}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
          envMapIntensity={2}
          emissive={new THREE.Color(0xFFD700)}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Back face */}
      <mesh position={[0, 0, -0.1]} rotation={[0, Math.PI, 0]} onPointerDown={handleMouseDown} onPointerUp={handleMouseUp}>
        <planeGeometry args={[2, 2]} />
        <meshPhysicalMaterial 
          map={textureError ? null : texture}
          color={textureError ? 'rgba(0, 0, 0, 0)' : '#FFD700'}
          transparent={true}
          opacity={1}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
          envMapIntensity={2}
          emissive={new THREE.Color(0xFFD700)}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Edge to give thickness to the coin */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.15, 32]} />
        <meshPhysicalMaterial 
          color="rgba(255, 215, 0, 0)"
          transparent={true}
          opacity={0}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
          envMapIntensity={2}
        />
      </mesh>
    </group>
  );
}