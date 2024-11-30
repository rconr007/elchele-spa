'use client'

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
              <p>Welcome to CHELE! Here&apos;s how to get started:</p>
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
              <p>Connect your Web3 wallet to access all features:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>MetaMask</li>
                <li>WalletConnect</li>
                <li>Coinbase Wallet</li>
                <li>Trust Wallet</li>
              </ul>
              <p className="mt-4">Make sure you have sufficient funds for gas fees.</p>
            </div>
          )
        }
    }
  }

  const content = getContent()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="mb-4 text-2xl font-bold">{content?.title}</h2>
        {content?.content}
      </div>
    </div>
  )
}

ButtonDialog.displayName = 'ButtonDialog'
