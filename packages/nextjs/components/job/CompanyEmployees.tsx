"use client"

import { useScaffoldReadContract } from '~~/hooks/scaffold-eth'
import { Heading1 } from '../ui/Heading1'
import { EmployeeBox } from './EmoployeeBox'
import { useAccount } from 'wagmi'
import { getCompanyOffers, getFinishedCompanyOffers } from '~~/db/jobActions'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '../ui/Loader'

const zeroAddress = '0x0000000000000000000000000000000000000000'

export function CompanyEmployees() {
  const { address } = useAccount()

  const { data: queryData, isLoading } = useQuery({
    queryKey: ['allJobs', address],
    queryFn: async () => {
      if (!address) return []
      return await getFinishedCompanyOffers(address)
    },
    enabled: !!address,
  })
  if (isLoading) {
    return <Loader />
  }

  console.log({ queryData })

  // const employees = queryData?.filter((job) => job.employee != null)

  return (
    <div>
      <Heading1>Your employees</Heading1>

      <div className="flex flex-col gap-3 mt-8">
        {queryData && queryData.map((employee, i) => (
          <EmployeeBox employerAddress={employee.employer} employeeAddress={employee.employee || ''} key={i} paid={i == 0} newLabel={i == 0} avatar={'/doe.png'} index={i} job={employee} />
        ))}
        {queryData?.length == 0 && <div className="text-center">You have no employees yet</div>}
      </div>
    </div>
  )
}
