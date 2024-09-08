import Image from 'next/image'
import { Salary } from '../Salary'
import { Button } from '../ui/Button'
import { useQuery } from '@tanstack/react-query'
import { useEnsAddress, useEnsName } from 'wagmi'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Loader } from '~~/components/ui/Loader'
import { getJobByEmployerAndEmployee } from '~~/db/jobActions'
import { shortenText } from '~~/utils/shortenText'

interface Props {
  employerAddress: string
  employeeAddress: string
  className?: string
  newLabel: boolean
  paid: boolean
  avatar: string
}

export function EmployeeBox({ employerAddress, employeeAddress, className, newLabel, paid, avatar }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['jobByBoth', employerAddress, employeeAddress],
    queryFn: async () => getJobByEmployerAndEmployee(employerAddress, employeeAddress),
  })
  const { data: ensName } = useEnsName({ address: employeeAddress })
  const singleJob = data?.[0]
  if (isLoading) {
    return <Loader />
  }
  if (!singleJob) {
    return 'Job not found'
  }

  return (
    <div
      className={`border border-black h-28 rounded-xl bg-white z-50 flex items-center justify-between px-6 relative ${className}`}
    >
      <div className="flex gap-8 items-center">
        <Image alt="avatar" src={avatar} width={80} height={80} />
        <div className="font-semibold text-lg">{ensName ?? shortenText(employeeAddress)}</div>
      </div>

      <Salary primary={singleJob.stablecoinSalary} secondary={singleJob.tokenSalary} />

      <div className="flex gap-2">
        {paid ? (
          <div className="text-green-700 font-semibold flex items-center gap-1">
            <CheckIcon className="h-4" />
            PAID
          </div>
        ) : (
          <Button className="min-w-0">Pay salary</Button>
        )}

        <button className="btn bg-[#F9DEDC] border-[#F87171] hover:bg-[#f8c7c3] rounded-full hover:border-[#F87171]">
          Terminate Contract
        </button>
      </div>

      {newLabel && (
        <div className="absolute -top-3 -left-8 rounded-full bg-green-500 text-green-900 text-sm p-1 px-3 font-bold">
          NEW EMPLOYEE
        </div>
      )}
    </div>
  )
}
