"use server"

import Image from 'next/image'
import { CheckIcon } from '@heroicons/react/20/solid'
import { companies } from '~~/constants/company'
import { getEmployer } from '~~/db/employerActions'
import { Job } from '~~/db/schema'

interface Props {
  job: Job
}

export async function JobReference({ job }: Props) {
  const { employer, position, startDate, endDate, description } = job
  const employerData = await getEmployer(employer)
  const employerName = employerData[0]?.name

  return (
    <li className="flex flex-col gap-4 mb-8  pb-8 [&:not(:last-child)]:border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 w-36">
          <Image alt="company" src={companies[employerName]} width={90} height={90} />
          <div className="font-bold">{employerName}</div>
        </div>
        <div>{position}</div>
        <div className="font-bold">{startDate}</div>
      </div>
      <div className="text-gray-700 font-semibold">Reference:</div>

      <div className="font-light text-gray-700">{description}</div>

      <div className="flex font-semibold text-gray-700 items-center gap-2">
        <CheckIcon className="h-6 text-green-700" />
        Reference is signed by WORLD ID
      </div>
    </li>
  )
}
