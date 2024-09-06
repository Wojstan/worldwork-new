import { redirect } from 'next/navigation'
import { Salary } from '../Salary'
import { Job } from './Job'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

interface Props {
  job: Job
}

export function EmployerJobBox({ job }: Props) {
  const { position, primarySalary, secondarySalary, location } = job

  return (
    <div className="border border-black h-28 rounded-xl bg-white z-50 flex items-center justify-between px-6 hover:bg-[#F8F2FF] hover:border-[#CFAAFF] transition cursor-pointer">
      <div className="w-44">{position}</div>

      <div className="flex w-96 gap-16 items-center">
        <Salary primary={primarySalary} secondary={secondarySalary} />

        <div className="w-16 font-bold">{location}</div>

        <div className="cursor-pointer flex items-center gap-1">
          <ArrowRightIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
