import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'

export function Swiper() {
  return (
    <div className="absolute bottom-0 bg-white w-full flex justify-center gap-8 border-t p-4">
      <button className="w-24 h-24 rounded-full bg-[#AAF767] flex items-center justify-center">
        <XMarkIcon className="h-10" />
      </button>

      <button className="w-24 h-24 rounded-full bg-[#FF24D2] flex items-center justify-center">
        <HeartIcon className="h-10" />
      </button>
    </div>
  )
}
