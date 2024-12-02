'use client'

import { X } from 'lucide-react'
import Image from 'next/image'

interface MemberDialogProps {
  member: {
    name: string
    image: string
    role: string
    bio: string
  } | null
  isOpen: boolean
  onClose: () => void
}

const memberDetails = {
  Cayacoa: {
    role: "Chief Technology Officer",
    bio: "A visionary leader in blockchain technology, Cayacoa brings extensive experience in developing secure and scalable cryptocurrency solutions. With a background in cryptography and distributed systems, he leads our technical strategy and innovation initiatives."
  },
  Boechio: {
    role: "Chief Operations Officer",
    bio: "As our operations expert, Boechio ensures smooth execution of our platform's infrastructure. His expertise in financial systems and regulatory compliance helps maintain our high standards of service and security."
  },
  Guarionex: {
    role: "Chief Marketing Officer",
    bio: "A strategic thinker with deep understanding of digital marketing and community building, Guarionex leads our global outreach efforts. His innovative approach to market analysis and user engagement drives our platform's growth."
  }
}

export function MemberDialog({ member, isOpen, onClose }: MemberDialogProps) {
  if (!isOpen || !member) return null

  const details = memberDetails[member.name as keyof typeof memberDetails]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close dialog"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-blue-500">
            <Image
              src={member.image}
              alt={member.name}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
          <h3 className="text-lg text-blue-600 mb-4">{details.role}</h3>
          
          <div className="text-gray-600 text-center leading-relaxed">
            {details.bio}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

MemberDialog.displayName = 'MemberDialog'
