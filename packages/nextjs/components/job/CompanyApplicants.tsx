import Link from 'next/link'
import { BackButton } from '../ui/BackButton'
import { Heading3 } from '../ui/Heading3'
import { JobBox } from './Job'
import { ProfileBox } from './Profile'
import { Employee, Job } from '~~/db/schema'

interface Props {
  data: { job: Job; employee: Employee | null }
  applicants: readonly string[] | undefined
}

export function CompanyApplicants({ data, applicants }: Props) {
  return (
    <div>
      <BackButton href="/company/offers" />

      <JobBox job={data.job} hideArrow className="bg-[#F3F4F6] rounded-3xl mt-2" />

      <Heading3 className="mt-8">Applicants ({applicants?.length || 0})</Heading3>

      {applicants?.map((applicant, i) => (
        <Link key={applicant} href={`/employee/${i}`}>
          <ProfileBox
            name={applicant}
            className={i % 2 ? 'bg-primary hover:bg-[#b99dde]' : 'bg-secondary hover:bg-[#fcd46e]'}
          />
        </Link>
      ))}
    </div>
  )
}
