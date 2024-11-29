'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function Brand() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const openMobileMenu = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className="navbar-brand flex items-center">
      <Link href="/" className="navbar-item flex items-center no-underline">
        <div className="logo-container relative w-12 h-12 mr-3">
          <Image
            className="rotating halo absolute inset-0"
            src="/img/logo/krypton-gradient.svg"
            alt="Halo effect"
            width={36}
            height={36}
          />
          <Image
            className="caonabo-logo-pos absolute inset-0"
            src="/img/logo/caonabo_logo_nbg.png"
            alt="Caonabo Logo"
            width={36}
            height={36}
          />
        </div>
        <span className="brand-name text-white text-2xl font-bold align-brand">CHELE</span>
      </Link>
      
      <div className="navbar-burger lg:hidden" onClick={openMobileMenu}>
        <div className="menu-toggle">
          <span className={`icon-box-toggle ${mobileOpen ? 'active' : ''}`}>
            <span className="rotate flex flex-col gap-1">
              <i className="icon-line-top h-0.5 w-6 bg-white transform transition-all duration-300"></i>
              <i className="icon-line-center h-0.5 w-6 bg-white transform transition-all duration-300"></i>
              <i className="icon-line-bottom h-0.5 w-6 bg-white transform transition-all duration-300"></i>
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
