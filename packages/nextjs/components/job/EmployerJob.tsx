import Link from 'next/link'
import { Salary } from '../Salary'
import { Job } from './Job'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

interface Props {
  job: Job
  newLabel?: boolean
}

export function EmployerJobBox({ job, newLabel }: Props) {
  const { position, primarySalary, secondarySalary, location } = job

  return (
    <Link href="/company/offers/1">
      <div className="border border-black h-28 rounded-xl bg-white z-50 flex items-center justify-between px-6 hover:bg-[#F8F2FF] hover:border-[#CFAAFF] transition cursor-pointer relative">
        <div>{position}</div>

        <Salary primary={primarySalary} secondary={secondarySalary} />

        <div className="w-16 font-bold">{location}</div>

        {newLabel && (
          <div className="absolute -top-3 -left-3 rounded-full bg-green-500 text-green-900 text-sm p-1 px-3 font-bold">
            NEW
          </div>
        )}

        <div className="cursor-pointer flex items-center gap-1 text-primary font-bold">
          2 applicants
          <ArrowRightIcon className="h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}
