'use client'

import { NextPage } from 'next'
import { EmployerJobBox } from '~~/components/job/EmployerJob'
import { Job } from '~~/components/job/Job'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'

const jobs: Job[] = [
  {
    position: 'UX/UI Designer',
    primarySalary: 5000,
    secondarySalary: 10000,
    location: 'Berlin, Germany',
  },
  {
    position: 'React Developer',
    primarySalary: 5000,
    secondarySalary: 10000,
    location: 'Warsaw, Poland',
  },
]

const Jobs: NextPage = () => {
  return (
    <div>
      <Heading1>Are you looking for an employee? :)</Heading1>
      <Heading3 className="mt-8">Your company offers:</Heading3>

      <div className="flex flex-col gap-3">
        {jobs.map((job) => (
          <EmployerJobBox key={job.company} job={job} />
        ))}
      </div>

      <img className="absolute bottom-0 right-0" src="/company.svg" alt="" />
    </div>
  )
}

export default Jobs
