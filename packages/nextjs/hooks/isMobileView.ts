'use client'

import { useContext, useEffect, useState } from 'react'
import { TinderContext } from '~~/components/ScaffoldEthAppWithProviders'

export function isMobileView() {
  const [width, setWidth] = useState<number>(1300)
  const { setIsTinder } = useContext(TinderContext)

  useEffect(() => {
    const handleWindowSizeChange = () => {
      if (width > 768) setIsTinder(false)
      setWidth(window.innerWidth)
    }

    handleWindowSizeChange()
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return width <= 768
}
