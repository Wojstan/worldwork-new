'use client'

import Image from 'next/image'
import { isMobileView } from '~~/hooks/isMobileView'

export const Logo = () => {
  const isMobile = isMobileView()

  const className = isMobile ? 'pl-8' : ''

  return (
    <div className={`flex flex-row items-center justify-center gap-[12px] ${className}`}>
      <Image alt="Logo" src="/worldwork.svg" width={isMobile ? 70 : 40} height={isMobile ? 70 : 40} />
      {!isMobile && <span className="text-2xl font-semibold tracking-wider">WORLDWORK</span>}
    </div>
  )
}
