import Image from 'next/image'

interface Props {
  primary: number | string
  secondary?: number | string
}

export function Salary({ primary, secondary }: Props) {
  return (
    <div className="flex flex-col items-end w-44">
      <span className="flex items-center gap-1">
        <Image alt="usdc" src="/usdc.png" width={20} height={20} /> <span className="font-bold">{primary}.00</span> USDC
      </span>
      {secondary && (
        <span className="flex items-center gap-1">
          <Image alt="wld" src="/wld.png" width={20} height={20} /> <span className="font-bold">{secondary}.00</span>{' '}
          WLD
        </span>
      )}
      <span className="text-gray-500 font-light text-sm">Net/month</span>
    </div>
  )
}
