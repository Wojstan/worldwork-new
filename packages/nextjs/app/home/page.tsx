'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { NextPage } from 'next'
import { useAccount } from 'wagmi'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth'

const Home: NextPage = () => {
  const { openConnectModal } = useConnectModal()
  const { isConnected, address } = useAccount()
  const router = useRouter()

  const { data: isEmployee, isLoading: isLoadingEmployee } = useScaffoldReadContract({
    contractName: 'WorldWork',
    functionName: 'workers',
    args: [address],
  })

  const { data: isEmployer, isLoading: isLoadingEmployer } = useScaffoldReadContract({
    contractName: 'WorldWork',
    functionName: 'employers',
    args: [address],
  })

  const [clickedConnect, setClickedConnect] = useState(false)

  const redirect = () => {
    if (isEmployee) {
      router.push('/employee/offers')
    }
    if (isEmployer) {
      router.push('/company/offers')
    }
  }

  useEffect(() => {
    if (clickedConnect && isConnected && !isLoadingEmployee && !isLoadingEmployer) {
      redirect()
    }
  }, [clickedConnect, isConnected, router, isEmployee, isEmployer, isLoadingEmployee, isLoadingEmployer])

  const onLogin = () => {
    redirect()
    openConnectModal?.()
    setClickedConnect(true)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col justify-center items-center gap-4">
        <Heading1>Hello!</Heading1>
        <Heading3>Welcome to Worldwork platform</Heading3>
      </div>
      <div
        className="card card-bordered border-black min-w-[900px] cursor-pointer hover:bg-[#CFAAFF]"
        onClick={onLogin}
      >
        <div className="card-body px-20 py-5">
          <div className="flex flex-row items-center gap-4 min-h-44 text-accent font-semibold">
            <span className="text-3xl">I already have an account</span>
            <ArrowRightIcon className="w-5 h-5" />
          </div>
        </div>
        <img className="absolute right-5 bottom-0" alt="home login" src="/home-login.svg" />
      </div>
      <div className="card card-bordered border-black min-w-[900px] hover:bg-[#FFDB7F]">
        <Link href="/register/select">
          <div className="card-body px-20 py-5">
            <div className="flex flex-row items-center gap-4 min-h-44 text-accent font-semibold">
              <span className="text-3xl">I don&apos;t have an account</span>
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </div>
          <img className="absolute right-5 bottom-0" alt="home login" src="/home-register.svg" />
        </Link>
      </div>
    </div>
  )
}

export default Home
