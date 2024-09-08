'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { acceptEmployeeForJob } from '~~/db/jobActions'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth'

interface Props {
  employee: string
}

export const ApplicationButtons = ({ employee }: Props) => {
  const { address } = useAccount()
  const { writeContractAsync } = useScaffoldWriteContract('WorldWork')
  const searchParams = useSearchParams()
  const router = useRouter()
  const index = searchParams?.get('index') || undefined

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      if (index === undefined || !address) {
        throw new Error('invalid params in ApplicationButtons')
      }
      const arrayIndex = BigInt(index)
      await writeContractAsync({ functionName: 'acceptWorker', args: [employee, arrayIndex] })
      await acceptEmployeeForJob(employee, address, Number(arrayIndex))
    },
    onSuccess: () => router.push('/company/offers'),
  })

  if (index === undefined) {
    return 'Missing query params'
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <button className="btn bg-[#F8E5E5] text-red-600 rounded-full min-w-60">Reject application</button>
      <button className="btn bg-[#AAF767] text-green-800 rounded-full min-w-60" onClick={() => mutateAsync()}>
        {isPending ? <span className="loading loading-spinner"></span> : <span>Approve application</span>}
      </button>
    </div>
  )
}
