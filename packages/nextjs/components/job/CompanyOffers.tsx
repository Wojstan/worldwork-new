'use client'

import Link from 'next/link'
import { EmployerJobBox } from '~~/components/job/EmployerJob'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { useQuery } from '@tanstack/react-query'
import { getCompanyOffers } from '~~/db/jobActions'
import { useAccount } from 'wagmi'

// const jobs: Job[] = [
//   {
//     position: 'UX/UI Designer',
//     primarySalary: 5000,
//     secondarySalary: 10000,
//     location: 'Berlin, Germany',
//   },
//   {
//     position: 'React Developer',
//     primarySalary: 5000,
//     secondarySalary: 10000,
//     location: 'Warsaw, Poland',
//   },
// ]

export function CompanyOffers() {
  const { address } = useAccount()

  const { data } = useQuery({
    queryKey: ['getCompanyOffers', address],
    queryFn: async () => {
      if (!address) return []
      return await getCompanyOffers(address)
    },
    enabled: !!address,
  })

  return (
    <div>
      <Heading1>Company data</Heading1>
      <Heading3 className='mb-8'>Your company offers:</Heading3>

      <div className="flex flex-col gap-3">
        {data?.map((job, i) => (
          <EmployerJobBox newLabel={i == 0} key={job.arrayIndex} job={job} />
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
