'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Coin } from './coin'
import { OrbitingIcon } from './orbiting-icon'
import { CircularDialog } from './circular-dialog'
import { Suspense, useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'

type DialogType = 'Token' | 'ICO' | 'Roadmap' | 'GetStarted' | 'LearnMore' | 'ConnectWallet' | null

export interface SceneRef {
  setActiveDialog: (dialog: DialogType) => void
}

const Scene = forwardRef<SceneRef>((props, ref) => {
  const [rotation, setRotation] = useState(0)
  const [targetRotation, setTargetRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const lastMouseXRef = useRef(0)
  const velocityRef = useRef(0)
  const animationRef = useRef<number>()

  useImperativeHandle(ref, () => ({
    setActiveDialog: (dialog: DialogType) => {
      console.log('Setting dialog:', dialog)
      setActiveDialog(dialog)
    }
  }))

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

  const handleIconClick = (icon: DialogType) => {
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
              <h3 className="text-2xl font-bold mb-4 no-select">Token Information</h3>
              <p className="text-lg mb-6 no-select">Our token is designed for seamless transactions and value storage in the digital economy. It offers numerous benefits for users and investors alike.</p>
              <ul className="list-disc pl-5 space-y-3 text-lg no-select">
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
              <h3 className="text-2xl font-bold mb-4 no-select">ICO Details</h3>
              <p className="text-lg mb-6 no-select">Join our Initial Coin Offering to be part of the next generation of digital finance. Don't miss this opportunity to get in early on a revolutionary project.</p>
              <ul className="list-disc pl-5 space-y-3 text-lg no-select">
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
              <h3 className="text-2xl font-bold mb-4 no-select">Project Roadmap</h3>
              <p className="text-lg mb-6 no-select">Explore our ambitious plans for the future of our cryptocurrency project. We're committed to continuous innovation and expansion.</p>
              <ul className="list-disc pl-5 space-y-3 text-lg no-select">
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
          {activeDialog === 'GetStarted' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 no-select">Getting Started with CHELE</h3>
              <p className="text-lg mb-6 no-select">Welcome to CHELE! Follow these steps to begin your journey into our cryptocurrency ecosystem.</p>
              <ul className="list-disc pl-5 space-y-3 text-lg no-select">
                <li>Create a Web3 Wallet (MetaMask recommended)</li>
                <li>Complete KYC verification process</li>
                <li>Fund your wallet with supported currencies</li>
                <li>Participate in our ICO or purchase tokens on exchanges</li>
                <li>Join our community channels for updates and support</li>
                <li>Explore staking and yield farming opportunities</li>
                <li>Stay updated with our latest developments</li>
              </ul>
              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg no-select">
                <p className="text-blue-400">Need help? Our support team is available 24/7 through our Discord channel.</p>
              </div>
            </div>
          )}
          {activeDialog === 'LearnMore' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 no-select">About CHELE</h3>
              <p className="text-lg mb-6 no-select">CHELE is revolutionizing the cryptocurrency space with innovative technology and a community-first approach.</p>
              <ul className="list-disc pl-5 space-y-3 text-lg no-select">
                <li>Advanced blockchain technology for scalability</li>
                <li>Eco-friendly Proof of Stake consensus</li>
                <li>Smart contract platform for DeFi applications</li>
                <li>Cross-chain interoperability</li>
                <li>Community governance system</li>
                <li>Regular security audits and updates</li>
                <li>Partnership with leading blockchain companies</li>
              </ul>
              <div className="mt-6 p-4 bg-purple-500/10 rounded-lg no-select">
                <p className="text-purple-400">Join our growing ecosystem and be part of the future of finance.</p>
              </div>
            </div>
          )}
          {activeDialog === 'ConnectWallet' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 no-select">Connect Your Wallet</h3>
              <p className="text-lg mb-6 no-select">Connect your Web3 wallet to access all features of the CHELE platform.</p>
              <ul className="list-disc pl-5 space-y-3 text-lg no-select">
                <li>Supported Wallets:
                  <ul className="list-circle pl-5 mt-2 space-y-2">
                    <li>MetaMask</li>
                    <li>WalletConnect</li>
                    <li>Coinbase Wallet</li>
                    <li>Trust Wallet</li>
                  </ul>
                </li>
                <li>Network Requirements:
                  <ul className="list-circle pl-5 mt-2 space-y-2">
                    <li>Ethereum Mainnet</li>
                    <li>Binance Smart Chain</li>
                    <li>Polygon Network</li>
                  </ul>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-green-500/10 rounded-lg no-select">
                <p className="text-green-400">Make sure you have sufficient funds for gas fees before making transactions.</p>
              </div>
            </div>
          )}
        </CircularDialog>
      )}
    </div>
  )
})

export default Scene
