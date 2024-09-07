'use client'

import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { EmployeeOffers } from '~~/components/job/EmployeeOffers'
import { EmployeeOffersMobile } from '~~/components/job/EmployeeOffersMobile'
import { Heading1 } from '~~/components/ui/Heading1'
import { getJobOffers } from '~~/db/jobActions'
import { isMobileView } from '~~/hooks/isMobileView'

const Jobs: NextPage = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['jobOffers'],
    queryFn: async () => {
      return await getJobOffers()
    },
  })
  const isMobile = isMobileView()

  return (
    <div>
      <Heading1>Are you looking for a job? :)</Heading1>

      {isMobile ? <EmployeeOffersMobile /> : <EmployeeOffers data={data} isLoading={isLoading} />}
    </div>
  )
}

export default Jobs
