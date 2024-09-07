import Image from 'next/image'
import { Salary } from '../Salary'
import { Button } from '../ui/Button'
import { namehash } from 'viem'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Employee } from '~~/app/employee/[slug]/page'

interface Props {
  className?: string
  employee: Employee
  newLabel: boolean
  paid: boolean
}

export function EmployeeBox({ className, employee, newLabel, paid }: Props) {
  const { avatar, name } = employee

  return (
    <div
      className={`border border-black h-28 rounded-xl bg-white z-50 flex items-center justify-between px-6 relative ${className}`}
    >
      <div className="flex gap-8 items-center">
        <Image alt="avatar" src={avatar} width={80} height={80} />
        <div className="font-semibold text-lg">{name}</div>
      </div>

      <Salary primary={5000} secondary={10000} />

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
