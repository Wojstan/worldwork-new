'use client'

import { useState } from 'react'
import Image from 'next/image'
import { NextPage } from 'next'
import { BackButton } from '~~/components/ui/BackButton'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Input } from '~~/components/ui/Input'
import { NewJob, insertJobSchema } from '~~/db/schema'
import { useScaffoldReadContract, useScaffoldWriteContract } from '~~/hooks/scaffold-eth'
import { addJobOffer } from '~~/db/jobActions'
import { useAccount } from 'wagmi'

const AddJob: NextPage = () => {
  const { address } = useAccount()

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract('WorldWork')
  const { data } = useScaffoldReadContract({
    contractName: 'WorldWork',
    functionName: 'getJobs',
    args: [address]
  })

  const onSubmit = async (formData: FormData) => {
    if (!formData) {
      throw new Error('Invalid parameters')
    }
    const validatedFields = insertJobSchema.parse({
      description: formData.get('description'),
      employer: address,
      arrayIndex: data?.length,
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
    })

    const stablecoinValue = formData.get('stablecoinValue')?.toString()
    const tokenValue = formData.get('tokenValue')?.toString()
    if (!stablecoinValue || !tokenValue) {
      throw new Error('Invalid parameters')
    }

    await writeYourContractAsync(
      {
        functionName: 'addJobOffer',
        args: [BigInt(stablecoinValue), BigInt(tokenValue)],
      },
    )
    await addJobOffer(validatedFields as NewJob)
  }

  return (
    <form className="flex flex-col items-center content-center gap-10 max-w-[1000px]" action={onSubmit}>
      <div className="flex flex-col gap-1 text-center">
        <Heading1>Add new job offer</Heading1>
        <Heading3>Please provide all details of the offer</Heading3>
      </div>
      <Input id="position" label="Job Position" placeholder="full-stack" className="w-full" />
      <Input
        id="description"
        label="Description"
        placeholder="Some interesing description"
        textarea
        className="w-full"
      />
      <div className="flex flex-col gap-2 w-full">
        <Heading3>Pay salary in:</Heading3>
        {/* <Box id="usdValue" currencyName="United States dollar" /> */}
        <Box id="stablecoinValue" currencyName="USDC" currencyIcon="/usdc.png" />
        <Box id="tokenValue" currencyName="WLD" currencyIcon="/wld.png" />
      </div>
      <div className="flex flex-row gap-[67px] mr-auto">
        <span className="text-base font-bold">Fully Remote</span>
        <input id="remote" type="checkbox" className="toggle" defaultChecked />
      </div>
      <Button type="submit">Add</Button>
    </form>
  )
}

interface BoxProps {
  id: string
  currencyName: string
  currencyIcon?: string
}

const Box = ({ id, currencyName, currencyIcon }: BoxProps) => {
  const [isChecked, setIsChecked] = useState(false)
  const boxStyles = isChecked
    ? 'flex flex-row group rounded-3xl border-2 gap-2 items-center w-full px-6 py-2 min-h-[112px] border-black'
    : 'flex flex-row group rounded-3xl border-2 gap-2 items-center w-full px-6 py-2 min-h-[112px] group-checked:border-red-500'

  return (
    <div className={boxStyles}>
      <div className="flex flex-row min-w-[230px] gap-2">
        <input type="checkbox" className="checkbox" onChange={(val) => setIsChecked(val.target.checked)}></input>
        {currencyIcon && <Image src={currencyIcon} alt="token-img" width={24} height={24} />}
        <span className="text-base font-bold">{currencyName}</span>
      </div>
      <Input id={id} className="min-w-[280]" removeLabel></Input>
      <div className="text-xs text-gray-400">per month</div>
    </div>
  )
}

export default AddJob
