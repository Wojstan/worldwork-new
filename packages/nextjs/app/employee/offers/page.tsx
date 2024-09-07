'use client'

import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { EmployeeOffers } from '~~/components/job/EmployeeOffers'
import { EmployeeOffersMobile } from '~~/components/job/EmployeeOffersMobile'
import { getJobOffers } from '~~/db/jobActions'
import { isMobileView } from '~~/hooks/isMobileView'

const Jobs: NextPage = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['jobOffers'],
    queryFn: async () => {
      return await getJobOffers()
    },
  })

  console.log(data)
  const isMobile = isMobileView()

  return (
    <div>
      {isMobile ? (
        <EmployeeOffersMobile data={data} isLoading={isLoading} />
      ) : (
        <EmployeeOffers data={data} isLoading={isLoading} />
      )}
    </div>
  )
}

export default Jobs
