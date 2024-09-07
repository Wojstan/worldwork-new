'use client'

import { useRouter } from 'next/navigation'
import { sepolia } from 'viem/chains'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { shortenText } from '~~/utils/shortenText'

export function LogoutButton() {
  const { address } = useAccount()
  const { data } = useEnsName({ address, chainId: sepolia.id })

  const router = useRouter()
  const { disconnectAsync } = useDisconnect({
    mutation: {
      onSuccess: () => {
        router.push('/home')
        router.refresh()
      },
    },
  })

  return (
    <div className="flex flex-row justify-center items-center bg-[#B881FF33] rounded-full font-semibold text-[#B881FF] pl-5 mr-5 text-lg md:text-sm">
      {data || shortenText(address)}
      <button
        className="btn btn-outline rounded-full bg-white ml-3 text-lg md:text-sm"
        onClick={() => disconnectAsync()}
      >
        Logout
      </button>
    </div>
  )
}
