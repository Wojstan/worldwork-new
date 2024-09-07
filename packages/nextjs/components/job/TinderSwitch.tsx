import { useContext } from 'react'
import { TinderContext } from '../ScaffoldEthAppWithProviders'
import { FireIcon } from '@heroicons/react/24/outline'

export function TinderSwitch() {
  const { isTinder, setIsTinder } = useContext(TinderContext)

  const bg = isTinder ? 'bg-[#FF32D2]' : ''

  return (
    <div className={`flex justify-between border items-center p-4 border-black rounded-full ${bg}`}>
      <div className="flex items-center gap-2">
        <FireIcon className="h-8" />
        <span className="text-base font-bold">Tinder Mode</span>
      </div>
      <input
        checked={isTinder}
        onChange={() => setIsTinder(!isTinder)}
        id="remote"
        type="checkbox"
        className="toggle"
      />
    </div>
  )
}
