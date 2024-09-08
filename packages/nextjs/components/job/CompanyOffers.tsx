'use client'

import Link from 'next/link'
import { EmptyState } from '../EmptyState'
import { Loader } from '../ui/Loader'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { EmployerJobBox } from '~~/components/job/EmployerJob'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { getCompanyOffers } from '~~/db/jobActions'
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth'

export function CompanyOffers() {
  const { address } = useAccount()

  const { data, isLoading: isLoadingOffers } = useQuery({
    queryKey: ['getCompanyOffers', address],
    queryFn: async () => {
      if (!address) return []
      return await getCompanyOffers(address)
    },
    enabled: !!address,
  })

  const { data: dataFromContract, isLoading: isLoadingJobs } = useScaffoldReadContract({
    contractName: 'WorldWork',
    functionName: 'getJobs',
    args: [address],
  })

  const isLoading = isLoadingJobs || isLoadingOffers || !data || !dataFromContract

  return (
    <div>
      <Heading1>Company data</Heading1>
      <Heading3 className="mb-8">Your company offers:</Heading3>

      {!isLoading && !data.length && <EmptyState />}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-3">
          {data?.map((job, i) => {
            const contractElement = dataFromContract?.find(
              (element, i) => element.employer == job.employer && i == job.arrayIndex,
            )

            return (
              <EmployerJobBox
                newLabel={i == 0}
                key={job.arrayIndex}
                job={job}
                index={i}
                numberOfApplicants={contractElement?.applicants.length}
              />
            )
          })}
        </div>
      )}

      <div className="flex justify-center p-4">
        <Link href="/company/add">
          <Button>Add new job offer</Button>
        </Link>
      </div>

      <img className="absolute bottom-0 right-0" src="/company.svg" alt="" />
    </div>
  )
}
