import { Dispatch, SetStateAction } from 'react'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface Props {
  swipe: Dispatch<SetStateAction<number>>
  length: number
}

export function Swiper({ swipe, length }: Props) {
  return (
    <div className="absolute bottom-0 bg-white w-full flex justify-center gap-8 border-t p-4">
      <button
        onClick={() => swipe((prevState) => (prevState == 0 ? length : prevState - 1))}
        className="w-24 h-24 rounded-full bg-[#AAF767] flex items-center justify-center"
      >
        <XMarkIcon className="h-10" />
      </button>

      <button
        onClick={() => swipe((prevState) => (prevState == length ? prevState + 1 : 0))}
        className="w-24 h-24 rounded-full bg-[#FF24D2] flex items-center justify-center"
      >
        <HeartIcon className="h-10" />
      </button>
    </div>
  )
}
