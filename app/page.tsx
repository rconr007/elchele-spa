'use client'

import Scene, { SceneRef } from '@/components/scene'
import { Button } from '@/components/ui/button'
import { Brand } from '@/components/brand'
import { TickerBanner } from '@/components/ticker-banner'
import { FloatingOrbs } from '@/components/floating-orbs'
import { useRef } from 'react'

type DialogType = 'Token' | 'ICO' | 'Roadmap' | 'GetStarted' | 'LearnMore' | 'ConnectWallet' | 'Cayacoa' | 'Boechio' | 'Guarionex' | null

export default function Home() {
  const sceneRef = useRef<SceneRef>(null)

  return (
    <main className="h-screen bg-gradient-to-r from-[#002D62] from-[0%] via-[#002D62] via-[40%] to-[#CE1126] to-[60%] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Scene ref={sceneRef} />
      </div>

      <div className="relative z-10 h-[96vh] mx-auto px-8 flex flex-col justify-between pointer-events-none">
        <header className="flex justify-between items-center pt-8">
          <Brand />
          <Button 
            variant="outline" 
            className="pointer-events-auto"
            onClick={() => sceneRef.current?.setActiveDialog('ConnectWallet')}
          >
            Connect Wallet
          </Button>
        </header>

        <div className="flex flex-col justify-end flex-grow mb-25">
          <div className="max-w-2xl landing-caption">
            <h1 className="text-6xl font-bold text-white mb-6">
              The Future of Digital Finance
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join the revolution of decentralized finance with our cutting-edge cryptocurrency platform.
              Experience secure, fast, and innovative trading solutions.
            </p>
            <div className="flex gap-4 pointer-events-auto">
              <Button 
                className="bg-gradient-to-r from-[#002D62] to-[#CE1126] text-white hover:opacity-90 h-14 px-10 text-lg font-bold"
                onClick={() => sceneRef.current?.setActiveDialog('GetStarted')}
              >
                Get Started
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#002D62] to-[#CE1126] text-white hover:opacity-90 h-14 px-10 text-lg font-bold"
                onClick={() => sceneRef.current?.setActiveDialog('LearnMore')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FloatingOrbs onOrbClick={(dialogType: DialogType) => sceneRef.current?.setActiveDialog(dialogType)} />
      <TickerBanner text="WELCOME TO CHELE • THE FUTURE OF CRYPTOCURRENCY • JOIN THE REVOLUTION • SECURE • FAST • RELIABLE • " />
    </main>
  )
}
