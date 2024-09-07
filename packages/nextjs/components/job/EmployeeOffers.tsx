import { Heading1 } from '../ui/Heading1'
import { Heading3 } from '../ui/Heading3'
import { Loader } from '../ui/Loader'
import { JobBoxLink } from './Job'
import { Employee, Employer, Job } from '~~/db/schema'

interface Props {
  data: { job: Job; employer: Employer | null }[]
  isLoading: boolean
}

export function EmployeeOffers({ data, isLoading }: Props) {
  return (
    <>
      <Heading1>Are you looking for a job? :)</Heading1>

      <Heading3 className="mt-8">Available jobs:</Heading3>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-3">
          {data?.map((job) => (
            <JobBoxLink
              key={job.job.name}
              job={job.job}
              employer={job.employer}
              href={`/employee/offers/${job.job.arrayIndex}`}
            />
          ))}
        </div>
      )}

      <img className="absolute bottom-0 right-0" src="/jobs.svg" alt="" />
    </>
  )
}
