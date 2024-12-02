'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Coin } from './coin'
import { OrbitingIcon } from './orbiting-icon'
import { CircularDialog } from './circular-dialog'
import { Suspense, useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react'

type DialogType = 'Token' | 'ICO' | 'Roadmap' | 'GetStarted' | 'LearnMore' | 'ConnectWallet' | 'Cayacoa' | 'Boechio' | 'Guarionex' | null

const caciques = [
  {
    name: 'Cayacoa',
    title: 'Chief Technology Officer',
    description: `As our Chief Technology Officer, Cayacoa leads the technological vision of CHELE. 
    With deep expertise in blockchain architecture and cryptography, he ensures our platform's 
    security and scalability. His innovative approach to distributed systems has been crucial 
    in developing our unique consensus mechanism.`
  },
  {
    name: 'Boechio',
    title: 'Chief Operations Officer',
    description: `Boechio, our Chief Operations Officer, masterminds the operational excellence 
    of CHELE. His strategic vision in implementing robust financial systems and ensuring 
    regulatory compliance has been instrumental in our platform's reliability. His leadership 
    in risk management and process optimization keeps our operations running smoothly.`
  },
  {
    name: 'Guarionex',
    title: 'Chief Marketing Officer',
    description: `Guarionex, serving as our Chief Marketing Officer, brings CHELE's vision to 
    the global stage. His expertise in digital marketing and community engagement has been 
    vital in building our strong user base. He leads our efforts in market expansion and 
    strategic partnerships, ensuring CHELE's position at the forefront of the crypto revolution.`
  }
]

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
    const handleGlobalMouseUp = () => handleMouseUp()
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e as unknown as React.MouseEvent)

    window.addEventListener('mouseup', handleGlobalMouseUp)
    window.addEventListener('mousemove', handleGlobalMouseMove)
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      window.removeEventListener('mousemove', handleGlobalMouseMove)
    }
  }, [handleMouseUp, handleMouseMove])

  const handleIconClick = (icon: DialogType) => {
    setActiveDialog(icon)
  }

  const getDialogContent = useCallback((dialogType: DialogType) => {
    // Check if it's a member dialog
    const member = caciques.find(c => c.name === dialogType)
    if (member) {
      return {
        title: member.name,
        content: (
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-4">{member.title}</h3>
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {member.description}
            </p>
          </div>
        )
      }
    }

    // Handle other dialog types
    switch (dialogType) {
      case 'Token':
        return {
          title: 'Token Information',
          content: (
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
          )
        }
      case 'ICO':
        return {
          title: 'ICO Details',
          content: (
            <div>
              <h3 className="text-2xl font-bold mb-4 no-select">ICO Details</h3>
              <p className="text-lg mb-6 no-select">Join our Initial Coin Offering to be part of the next generation of digital finance. Do not miss this opportunity to get in early on a revolutionary project.</p>
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
          )
        }
      case 'Roadmap':
        return {
          title: 'Project Roadmap',
          content: (
            <div>
              <h3 className="text-2xl font-bold mb-4 no-select">Project Roadmap</h3>
              <p className="text-lg mb-6 no-select">Explore our ambitious plans for the future of our cryptocurrency project. We are committed to continuous innovation and expansion.</p>
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
          )
        }
      case 'GetStarted':
        return {
          title: 'Getting Started with CHELE',
          content: (
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
          )
        }
      case 'LearnMore':
        return {
          title: 'About CHELE',
          content: (
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
          )
        }
      case 'ConnectWallet':
        return {
          title: 'Connect Your Wallet',
          content: (
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
          )
        }
      default:
        return null
    }
  }, [])

  const dialogContent = activeDialog ? getDialogContent(activeDialog) : null

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
          <Coin rotation={rotation} setIsDragging={setIsDragging} position={[0, 0, 0]} />
          <OrbitingIcon rotation={rotation} angle={0} radius={1.75} icon="Token" onClick={() => handleIconClick('Token')} />
          <OrbitingIcon rotation={rotation} angle={Math.PI * 2 / 3} radius={1.75} icon="ICO" onClick={() => handleIconClick('ICO')} />
          <OrbitingIcon rotation={rotation} angle={Math.PI * 4 / 3} radius={1.75} icon="Roadmap" onClick={() => handleIconClick('Roadmap')} />
          <OrbitingIcon rotation={rotation} angle={Math.PI} radius={1.75} icon="" onClick={() => handleIconClick('Cayacoa')} />
          <OrbitingIcon rotation={rotation} angle={Math.PI / 3} radius={1.75} icon="" onClick={() => handleIconClick('Boechio')} />
          <OrbitingIcon rotation={rotation} angle={Math.PI * 5 / 3} radius={1.75} icon="" onClick={() => handleIconClick('Guarionex')} />
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
      {dialogContent && (
        <CircularDialog
          title={dialogContent.title}
          onClose={() => setActiveDialog(null)}
        >
          {dialogContent.content}
        </CircularDialog>
      )}
    </div>
  )
})

Scene.displayName = 'Scene'

export default Scene
