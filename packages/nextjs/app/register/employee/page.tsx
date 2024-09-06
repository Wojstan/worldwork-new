'use client'

import { useRouter } from 'next/navigation'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import { NextPage } from 'next'
import { decodeAbiParameters } from 'viem'
import { useAccount } from 'wagmi'
import { worldAction, worldIdApp } from '~~/app/constants'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth'
import Image from "next/image";

const PatientSignin: NextPage = () => {
  const { openConnectModal } = useConnectModal()
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract('WorldWork')

  const { isConnected, address } = useAccount()
  const router = useRouter()

  const onWalletConnect = () => {
    if (isConnected) {
      return
    }
    openConnectModal?.()
  }

  const onSuccess = async (result: ISuccessResult) => {
    const redirectParams = new URLSearchParams()
    redirectParams.append('address', address as string)
    redirectParams.append('merkle_root', result.merkle_root)
    redirectParams.append('nullifier_hash', result.nullifier_hash)
    redirectParams.append('proof', result.proof)
    router.push(`/register/employee/info?${redirectParams.toString()}`)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-24">
      <div className="flex flex-col gap-1">
        <Heading1>Create account</Heading1>
        <Heading3 className="mt-4">Connect with World ID to create account</Heading3>
      </div>

      {!address && (
        <button onClick={onWalletConnect} className="btn btn-outline rounded-full">
          <span>Connect Wallet</span>
        </button>
      )}

      {address && (
        <IDKitWidget
          app_id={worldIdApp} // obtained from the Developer Portal
          action={worldAction} // obtained from the Developer Portal
          onSuccess={onSuccess} // callback when the modal is closed
          signal={address} // the signal to be verified
          // handleVerify={handleVerify} // callback when the proof is received
          // verification_level={VerificationLevel.Orb}
        >
          {({ open }: { open: () => void }) => (
            // This is the button that will open the IDKit modal
            <button onClick={open} className="btn btn-outline rounded-full">

             <Image alt="Logo" src="/worldwork.svg" width={24} height={24} />

              <span>Connect with World ID</span>
            </button>
          )}
        </IDKitWidget>
      )}

      <span className="text-xs">
        Don&apos;t have World ID?{' '}
        <u>
          <b>Learn more</b>
        </u>
      </span>
    </div>
  )
}

export default PatientSignin
