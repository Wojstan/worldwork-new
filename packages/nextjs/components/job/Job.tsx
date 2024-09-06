import Image from 'next/image'
import { Salary } from '../Salary'
import { Heading3 } from '../ui/Heading3'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

export interface Job {
  image?: string
  company?: string
  position: string
  primarySalary: number
  secondarySalary: number
  location: string
}

interface Props {
  job: Job
}

export function JobBox({ job }: Props) {
  const { image, company, position, primarySalary, secondarySalary, location } = job

  return (
    <div className="border border-black h-28 rounded-xl bg-white z-50 flex items-center justify-between px-6 hover:bg-[#F8F2FF] hover:border-[#CFAAFF] transition cursor-pointer">
      {image && <Image alt="Logo" src={image} width={40} height={40} />}
      {company && <Heading3 className="mb-0 w-36">{company}</Heading3>}

      <div className="w-44">{position}</div>

      <Salary primary={primarySalary} secondary={secondarySalary} />

      <div className="w-28 font-bold">{location}</div>

      <div className="cursor-pointer flex items-center gap-1">
        <ArrowRightIcon className="h-4 w-4" />
      </div>
    </div>
  )
}
