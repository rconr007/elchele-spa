'use client'

import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface CoinProps {
  rotation: number
  position: [number, number, number]
}

export function Coin({ rotation, position }: CoinProps) {
  const [textureError, setTextureError] = useState(false)
  const texture = useLoader(TextureLoader, '/caonabo_logo_nbg.png?height=512&width=512', 
    undefined,
    (error) => {
      console.error('Error loading texture:', error)
      setTextureError(true)
    }
  )
  const coinRef = useRef<THREE.Group>(null)
  
  useEffect(() => {
    if (texture && !textureError) {
      texture.colorSpace = THREE.SRGBColorSpace
    }
  }, [texture, textureError])

  useEffect(() => {
    if (coinRef.current) {
      coinRef.current.rotation.y = rotation
    }
  }, [rotation])

  return (
    <group ref={coinRef} position={position}>
      {/* Front face */}
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial 
          map={textureError ? null : texture}
          color={textureError ? '#2a2a2a' : 'white'}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={2}
          emissiveMap={textureError ? null : texture}
          emissive={new THREE.Color(0x40E0D0)}
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Back face */}
      <mesh position={[0, 0, -0.1]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial 
          map={textureError ? null : texture}
          color={textureError ? '#2a2a2a' : 'white'}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={2}
          emissiveMap={textureError ? null : texture}
          emissive={new THREE.Color(0x40E0D0)}
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.05, 32]} />
        <meshStandardMaterial 
          color="#cd7f32"
          metalness={0.8}
          roughness={0.3}
          envMapIntensity={2}
        />
      </mesh>
    </group>
  )
}
