import { Dispatch, SetStateAction } from 'react'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface Props {
  swipeLeft: () => void
  swipeRight: () => void
}

export function Swiper({ swipeLeft, swipeRight }: Props) {
  return (
    <div className="fixed bottom-0 bg-white w-full flex justify-center gap-8 border-t p-4">
      <button onClick={swipeLeft} className="w-24 h-24 rounded-full bg-[#AAF767] flex items-center justify-center">
        <XMarkIcon className="h-10" />
      </button>

      <button onClick={swipeRight} className="w-24 h-24 rounded-full bg-[#FF24D2] flex items-center justify-center">
        <HeartIcon className="h-10" />
      </button>
    </div>
  )
}
