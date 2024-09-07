'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { addEnsContracts } from '@ensdomains/ensjs'
import { setPrimaryName } from '@ensdomains/ensjs/wallet'
import { useMutation } from '@tanstack/react-query'
import { NextPage } from 'next'
import { createWalletClient, custom, decodeAbiParameters } from 'viem'
import { sepolia } from 'viem/chains'
import { useWaitForTransactionReceipt } from 'wagmi'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Input } from '~~/components/ui/Input'
import { addEmployer } from '~~/db/employerActions'
import { insertEmployerSchema } from '~~/db/schema'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth'

const EmployerInfo: NextPage = () => {
  const searchParams = useSearchParams()
  console.log(searchParams)
  const address = searchParams?.get('address')
  const merkle_root = searchParams?.get('merkle_root')
  const nullifier_hash = searchParams?.get('nullifier_hash')
  const proof = searchParams?.get('proof')
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract('WorldWork')
  const router = useRouter()

  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!address || !merkle_root || !nullifier_hash || !proof || !formData) {
        throw new Error('Invalid parameters')
      }
      const validatedFields = insertEmployerSchema.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        wallet: address,
      })

      const unpackedProof = decodeAbiParameters([{ type: 'uint256[8]' }], proof as `0x${string}`)[0]
      await writeYourContractAsync({
        functionName: 'registerEmployer',
        args: [address, BigInt(merkle_root), BigInt(nullifier_hash), unpackedProof],
      })
      await addEmployer(validatedFields)
      const nickname = formData.get('nickname')
      if (!nickname) {
        router.push('/company/offers')
        return
      }
      const response = await fetch('/api/ens', {
        method: 'POST',
        body: JSON.stringify({
          nickname,
          address,
        }),
      })
      if (!response.ok) {
        throw new Error('invalid response from registerEns')
      }
      console.log('finished waiting for ENS domain')
      const wallet = createWalletClient({
        chain: addEnsContracts(sepolia),
        transport: custom(window.ethereum),
      })

      return setPrimaryName(wallet, {
        name: `${formData.get('nickname')}.eth` as string,
        account: address,
      })
    },
    onSuccess: () => router.push('/company/offers'),
  })
  const { isLoading: isReceiptLoading } = useWaitForTransactionReceipt({ hash: data })

  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-24 ">
      <Heading1>Provide some info</Heading1>
      <form className="form-control gap-4" action={mutateAsync}>
        <Input id="name" label="Company Name" placeholder="DevCats" />
        <Input id="email" label="E-mail" placeholder="john@devcats.com" />
        <Input id="nickname" label="Nickname" placeholder="devcats" className="w-full" />
        <Button type="submit" className="mt-6" isLoading={isReceiptLoading || isPending}>
          Continue
        </Button>
      </form>
    </div>
  )
}

export default EmployerInfo
