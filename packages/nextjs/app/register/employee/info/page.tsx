'use client'

import { NextPage } from 'next'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Input } from '~~/components/ui/Input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth'
import { decodeAbiParameters } from 'viem'


const EmployeeInfo: NextPage = () => {
  const searchParams = useSearchParams()
  console.log(searchParams)
  const address = searchParams.get('address')
  const merkle_root = searchParams.get('merkle_root')
  const nullifier_hash = searchParams.get('nullifier_hash')
  const proof = searchParams.get('proof')
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("WorldWork");
  const router = useRouter()

  const onSubmit = async (formData: FormData) => {
    if (!address || !merkle_root || !nullifier_hash || !proof || !formData) {
      throw new Error('Invalid parameters')
    }

    const unpackedProof = decodeAbiParameters([{ type: 'uint256[8]' }], proof as `0x${string}`)[0]
    await writeYourContractAsync({
      functionName: "registerWorker",
      args: [
        address,
        BigInt(merkle_root),
        BigInt(nullifier_hash),
        unpackedProof
      ],
    }, {
      onSuccess: () => {
        router.push('/employee/offers')
      }
    })

  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-24">
      <div className="flex flex-col gap-1 items-center">
        <Heading1>Provide some info</Heading1>
      </div>
      <form className="form-control gap-6" action={onSubmit}>
        <Input id="name" label="First and last name" placeholder="John Doe" />
        <Input id="nickname" label="Nickname" placeholder="devcats" className="w-full" />
        <Button type="submit">Continue</Button>
      </form>
    </div>
  )
}

export default EmployeeInfo
