import { useEffect, useRef } from 'react'
import { Html } from '@react-three/drei'
import { CoinsIcon as Coin, Rocket, Map } from 'lucide-react'
import * as THREE from 'three'

interface OrbitingIconProps {
  rotation: number
  angle: number
  radius: number
  icon: 'Token' | 'ICO' | 'Roadmap'
  onClick: () => void
}

export function OrbitingIcon({ rotation, angle, radius, icon, onClick }: OrbitingIconProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      const x = Math.cos(angle + rotation) * radius
      const y = Math.sin(angle + rotation) * radius
      groupRef.current.position.set(x, y, 0)
    }
  }, [rotation, angle, radius])

  const getIcon = () => {
    switch (icon) {
      case 'Token':
        return <Coin className="w-6 h-6 text-blue-500" />
      case 'ICO':
        return <Rocket className="w-6 h-6 text-green-500" />
      case 'Roadmap':
        return <Map className="w-6 h-6 text-purple-500" />
    }
  }

  return (
    <group ref={groupRef}>
      <Html center>
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-white/20 transition-colors"
          onClick={onClick}
        >
          {getIcon()}
        </div>
      </Html>
    </group>
  )
}

