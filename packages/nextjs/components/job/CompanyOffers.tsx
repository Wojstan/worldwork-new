import Link from 'next/link'
import { EmployerJobBox } from '~~/components/job/EmployerJob'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Job } from './Job'

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

export function CompanyOffers() {
  return (
    <div>
      <Heading1>Are you looking for an employee? :)</Heading1>
      <Heading3 className='mb-8'>Your company offers:</Heading3>

      <div className="flex flex-col gap-3">
        {jobs.map((job, i) => (
          <EmployerJobBox newLabel={i == 0} key={job.company} job={job} />
        ))}
      </div>

      <div className="flex justify-center p-4">
        <Link href="/company/add">
          <Button>Add new job offer</Button>
        </Link>
      </div>

      <img className="absolute bottom-0 right-0" src="/company.svg" alt="" />
    </div>
  )
}
