'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface ButtonDialogProps {
  type: 'get-started' | 'learn-more' | 'connect-wallet'
  isOpen: boolean
  onClose: () => void
}

export function ButtonDialog({ type, isOpen, onClose }: ButtonDialogProps) {
  if (!isOpen) return null

  const getContent = () => {
    switch (type) {
      case 'get-started':
        return {
          title: 'Get Started',
          content: (
            <div className="space-y-4">
              <p>Welcome to CHELE! Here's how to get started:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Create a Web3 wallet (like MetaMask)</li>
                <li>Connect your wallet to our platform</li>
                <li>Explore our token offerings</li>
                <li>Join our community</li>
              </ol>
              <p>Need help? Join our Discord community for support!</p>
            </div>
          )
        }
      case 'learn-more':
        return {
          title: 'Learn More',
          content: (
            <div className="space-y-4">
              <p>CHELE is a revolutionary cryptocurrency platform that combines:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Advanced blockchain technology</li>
                <li>User-friendly interface</li>
                <li>Secure transactions</li>
                <li>Community-driven development</li>
              </ul>
              <p>Our mission is to make cryptocurrency accessible to everyone while maintaining the highest standards of security and innovation.</p>
            </div>
          )
        }
      case 'connect-wallet':
        return {
          title: 'Connect Wallet',
          content: (
            <div className="space-y-4">
              <p>Connect your Web3 wallet to access:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Token purchases</li>
                <li>Portfolio management</li>
                <li>Exclusive features</li>
                <li>Community rewards</li>
              </ul>
              <p>We support multiple wallet providers including MetaMask, WalletConnect, and more.</p>
              <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg">
                <p className="text-yellow-500 text-sm">Note: Please make sure your wallet is properly configured before connecting.</p>
              </div>
            </div>
          )
        }
    }
  }

  const content = getContent()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-gray-900 rounded-xl max-w-lg w-full p-6 relative shadow-2xl border border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{content.title}</h2>
        <div className="text-gray-300">
          {content.content}
        </div>
      </div>
    </div>
  )
}
