'use client'

import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { JobBoxLink } from '~~/components/job/Job'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Loader } from '~~/components/ui/Loader'
import { getJobOffers } from '~~/db/jobActions'

const Jobs: NextPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['jobOffers'],
    queryFn: async () => {
      return await getJobOffers()
    },
  })

  return (
    <div>
      <Heading1>Are you looking for a job? :)</Heading1>
      <Heading3 className="mt-8">Available jobs:</Heading3>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-3">
          {data?.map((job) => (
            <JobBoxLink key={job.job.name} job={job} href={`/employee/offers/${job.job.arrayIndex}`} />
          ))}
        </div>
      )}

      <img className="absolute bottom-0 right-0" src="/jobs.svg" alt="" />
    </div>
  )
}

export default Jobs
