"use client"

import { useScaffoldReadContract } from '~~/hooks/scaffold-eth'
import { Heading1 } from '../ui/Heading1'
import { EmployeeBox } from './EmoployeeBox'
import { useAccount } from 'wagmi'

const zeroAddress = '0x0000000000000000000000000000000000000000'

export function CompanyEmployees() {
  const { address } = useAccount()
  const { data } = useScaffoldReadContract({
    contractName: 'WorldWork',
    functionName: 'getJobs',
    args: [address]
  })

  const employees = data?.filter((job) => job.worker != zeroAddress)

  return (
    <div>
      <Heading1>Your employees</Heading1>

      <div className="flex flex-col gap-3 mt-8">
        {employees && employees.map((employee, i) => (
          <EmployeeBox employerAddress={employee.employer} employeeAddress={employee.worker} key={employee.worker} paid={i == 0} newLabel={i == 0} avatar={'/doe.png'}/>
        ))}
        { employees?.length == 0 && <div className="text-center">You have no employees yet</div>}
      </div>
    </div>
  )
}
