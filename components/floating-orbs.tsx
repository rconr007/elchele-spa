'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type DialogType = 'Token' | 'ICO' | 'Roadmap' | 'GetStarted' | 'LearnMore' | 'ConnectWallet' | 'Cayacoa' | 'Boechio' | 'Guarionex' | null

interface FloatingOrbsProps {
  onOrbClick: (dialogType: DialogType) => void
}

const caciques = [
  {
    name: 'Cayacoa',
    image: '/img/caciques/Cayacoa.png',
    dialog: 'Cayacoa',
    title: 'Chief Technology Officer',
    description: `As our Chief Technology Officer, Cayacoa leads the technological vision of CHELE. 
    With deep expertise in blockchain architecture and cryptography, he ensures our platform's 
    security and scalability. His innovative approach to distributed systems has been crucial 
    in developing our unique consensus mechanism.`
  },
  {
    name: 'Boechio',
    image: '/img/caciques/Boechio.png',
    dialog: 'Boechio',
    title: 'Chief Operations Officer',
    description: `Boechio, our Chief Operations Officer, masterminds the operational excellence 
    of CHELE. His strategic vision in implementing robust financial systems and ensuring 
    regulatory compliance has been instrumental in our platform's reliability. His leadership 
    in risk management and process optimization keeps our operations running smoothly.`
  },
  {
    name: 'Guarionex',
    image: '/img/caciques/Guarionex.png',
    dialog: 'Guarionex',
    title: 'Chief Marketing Officer',
    description: `Guarionex, serving as our Chief Marketing Officer, brings CHELE's vision to 
    the global stage. His expertise in digital marketing and community engagement has been 
    vital in building our strong user base. He leads our efforts in market expansion and 
    strategic partnerships, ensuring CHELE's position at the forefront of the crypto revolution.`
  }
]

export function FloatingOrbs({ onOrbClick }: FloatingOrbsProps) {
  const [orbPositions, setOrbPositions] = useState<number[]>(Array(caciques.length).fill(0))
  const animationRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const updateOrbPositions = () => {
      animationRefs.current.forEach((ref, index) => {
        if (ref) {
          const transform = window.getComputedStyle(ref).transform
          const matrix = new DOMMatrix(transform)
          setOrbPositions(prev => {
            const newPositions = [...prev]
            newPositions[index] = -matrix.m42 // Y translation value
            return newPositions
          })
        }
      })
      requestAnimationFrame(updateOrbPositions)
    }

    const animationId = requestAnimationFrame(updateOrbPositions)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const setRef = (el: HTMLDivElement | null, index: number) => {
    animationRefs.current[index] = el
  }

  return (
    <div className="absolute bottom-4 right-32">
      <div className="flex gap-8 mb-4">
        {caciques.map((cacique, index) => (
          <div
            key={cacique.name}
            className="relative flex flex-col items-center"
          >
            {/* Floating Orb Container */}
            <div
              ref={(el) => setRef(el, index)}
              style={{
                animation: `float ${2 + index * 0.5}s ease-in-out infinite alternate`,
                animationDelay: `${index * 0.3}s`
              }}
            >
              {/* Orb with Glass Effect */}
              <div 
                onClick={() => onOrbClick(cacique.dialog as DialogType)}
                className="w-24 h-24 rounded-full relative overflow-hidden cursor-pointer transition-transform hover:scale-110 active:scale-95 pointer-events-auto"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}
              >
                <Image
                  src={cacique.image}
                  alt={cacique.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            </div>
            {/* Dynamic Shadow */}
            <div 
              className="absolute -bottom-4 left-1/2 w-16 h-2 rounded-full transition-all duration-200"
              style={{
                transform: `translateX(-50%) scale(${1 - (orbPositions[index] / 40)})`,
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)',
                opacity: Math.max(0.2, 1 - (orbPositions[index] / 20))
              }}
            />
            {/* Name */}
            <div className="mt-8 text-white text-lg font-semibold text-center">
              {cacique.name}
            </div>
          </div>
        ))}
      </div>
      {/* Team Heading */}
      <h2 className="text-center text-white text-2xl font-bold mt-12">
        Our Caciques Team
      </h2>
    </div>
  )
}

FloatingOrbs.displayName = 'FloatingOrbs'
