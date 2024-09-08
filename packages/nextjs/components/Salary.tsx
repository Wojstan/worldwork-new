import Image from 'next/image'

interface Props {
  primary: number | string | undefined
  secondary?: number | string | undefined
}

export function Salary({ primary, secondary }: Props) {



  return (
    <div className="flex flex-col md:items-end md:w-44 gap-1">
      <span>
        <span className="font-bold">${primary}.00</span> USD
      </span>

      <span className="text-gray-500 font-light text-sm">Net/month</span>
    </div>
  )
}
