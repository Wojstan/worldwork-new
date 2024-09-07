'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { NextPage } from 'next'
import { decodeAbiParameters } from 'viem'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Input } from '~~/components/ui/Input'
import { addEmployer } from '~~/db/employerActions'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth'
import { insertEmployerSchema } from "~~/db/schema";

const EmployerInfo: NextPage = () => {
  const searchParams = useSearchParams()
  console.log(searchParams)
  const address = searchParams.get('address')
  const merkle_root = searchParams.get('merkle_root')
  const nullifier_hash = searchParams.get('nullifier_hash')
  const proof = searchParams.get('proof')
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract('WorldWork')
  const router = useRouter()

  const onSubmit = async (formData: FormData) => {
    if (!address || !merkle_root || !nullifier_hash || !proof || !formData) {
      throw new Error('Invalid parameters')
    }
    const validatedFields = insertEmployerSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      wallet: address,
    })

    const unpackedProof = decodeAbiParameters([{ type: 'uint256[8]' }], proof as `0x${string}`)[0]
    await writeYourContractAsync(
      {
        functionName: 'registerEmployer',
        args: [address, BigInt(merkle_root), BigInt(nullifier_hash), unpackedProof],
      },
      {
        onSuccess: async () => {
          await addEmployer(validatedFields)
          router.push('/company/offers')
        },
      },
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-24 ">
      <Heading1>Provide some info</Heading1>
      <form className="form-control gap-4" action={onSubmit}>
        <Input id="name" label="Company Name" placeholder="DevCats" />
        <Input id="email" label="E-mail" placeholder="john@devcats.com" />
        <Input id="nickname" label="Nickname" placeholder="devcats" className="w-full" />
        <Button type="submit" className="mt-6">
          Continue
        </Button>
      </form>
    </div>
  )
}

export default EmployerInfo
