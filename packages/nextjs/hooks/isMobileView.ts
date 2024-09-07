'use client'
import { useEffect, useState } from 'react'

export function isMobileView() {
  const [width, setWidth] = useState<number>(1300)

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return width <= 768
}
