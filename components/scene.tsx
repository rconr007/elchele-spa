'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Coin } from './coin'
import { OrbitingIcon } from './orbiting-icon'
import { CircularDialog } from './circular-dialog'
import { Suspense, useState, useEffect, useCallback, useRef } from 'react'
import * as THREE from 'three'

export default function Scene() {
  const [rotation, setRotation] = useState(0)
  const [targetRotation, setTargetRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [activeDialog, setActiveDialog] = useState<'Token' | 'ICO' | 'Roadmap' | null>(null)
  const lastMouseXRef = useRef(0)
  const velocityRef = useRef(0)
  const animationRef = useRef<number>()

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    lastMouseXRef.current = e.clientX
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    const currentRotation = rotation % (Math.PI * 2)
    const closestFace = Math.round(currentRotation / Math.PI) * Math.PI
    setTargetRotation(closestFace)
  }, [rotation])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMouseXRef.current
      setRotation(prev => prev + deltaX * 0.01)
      velocityRef.current = deltaX * 0.01
      lastMouseXRef.current = e.clientX
    }
  }, [isDragging])

  useEffect(() => {
    const updateRotation = () => {
      if (!isDragging) {
        const diff = targetRotation - rotation
        const step = Math.sign(diff) * Math.min(Math.abs(diff), Math.abs(velocityRef.current) + 0.001)
        
        if (Math.abs(diff) > 0.001) {
          setRotation(prev => prev + step)
          velocityRef.current = velocityRef.current * 0.95 // Smoother deceleration
        } else {
          setRotation(targetRotation)
          velocityRef.current = 0
        }
      }
      animationRef.current = requestAnimationFrame(updateRotation)
    }

    updateRotation()
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging, targetRotation, rotation])

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove as any)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove as any)
    }
  }, [handleMouseUp, handleMouseMove])

  const handleIconClick = (icon: 'Token' | 'ICO' | 'Roadmap') => {
    setActiveDialog(icon)
  }

  return (
    <div 
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45
        }}
      >
        <Suspense fallback={null}>
          <Coin rotation={rotation} position={[0, 0, 0]} />
          <OrbitingIcon rotation={rotation} angle={0} radius={1.75} icon="Token" onClick={() => handleIconClick('Token')} />
          <OrbitingIcon rotation={rotation} angle={Math.PI * 2 / 3} radius={1.75} icon="ICO" onClick={() => handleIconClick('ICO')} />
          <OrbitingIcon rotation={rotation} angle={Math.PI * 4 / 3} radius={1.75} icon="Roadmap" onClick={() => handleIconClick('Roadmap')} />
          <Environment preset="warehouse" />
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />
        </Suspense>
      </Canvas>
      {activeDialog && (
        <CircularDialog
          title={activeDialog}
          onClose={() => setActiveDialog(null)}
        >
          {activeDialog === 'Token' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Token Information</h3>
              <p className="text-lg mb-6">Our token is designed for seamless transactions and value storage in the digital economy. It offers numerous benefits for users and investors alike.</p>
              <ul className="list-disc pl-5 space-y-3 text-lg">
                <li>High transaction speed with low latency</li>
                <li>Minimal fees for all operations</li>
                <li>Secure and decentralized architecture</li>
                <li>Advanced smart contract capabilities</li>
                <li>Cross-chain compatibility</li>
                <li>Staking and yield farming opportunities</li>
              </ul>
            </div>
          )}
          {activeDialog === 'ICO' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">ICO Details</h3>
              <p className="text-lg mb-6">Join our Initial Coin Offering to be part of the next generation of digital finance. Don't miss this opportunity to get in early on a revolutionary project.</p>
              <ul className="list-disc pl-5 space-y-3 text-lg">
                <li>Start Date: August 1, 2023</li>
                <li>End Date: September 30, 2023</li>
                <li>Total Supply: 100,000,000 tokens</li>
                <li>Initial Price: $0.10 per token</li>
                <li>Minimum Purchase: 100 tokens</li>
                <li>Accepted Currencies: ETH, BTC, USDT</li>
                <li>Vesting Period: 6 months with monthly unlocks</li>
                <li>Soft Cap: $5 million</li>
                <li>Hard Cap: $20 million</li>
              </ul>
            </div>
          )}
          {activeDialog === 'Roadmap' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Project Roadmap</h3>
              <p className="text-lg mb-6">Explore our ambitious plans for the future of our cryptocurrency project. We're committed to continuous innovation and expansion.</p>
              <ul className="list-disc pl-5 space-y-3 text-lg">
                <li>Q3 2023: Token Launch and ICO</li>
                <li>Q4 2023: Major Exchange Listings and Liquidity Provision</li>
                <li>Q1 2024: Mobile Wallet Release with Integrated DeFi Features</li>
                <li>Q2 2024: Partnerships with Major Retailers for Real-World Usage</li>
                <li>Q3 2024: Launch of Decentralized Finance (DeFi) Platform</li>
                <li>Q4 2024: Cross-Chain Bridge Development</li>
                <li>Q1 2025: Integration with IoT Devices and Smart Cities Initiative</li>
                <li>Q2 2025: Launch of Native Blockchain with Improved Scalability</li>
              </ul>
            </div>
          )}
        </CircularDialog>
      )}
    </div>
  )
}
