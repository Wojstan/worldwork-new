'use client'

import { useRouter } from 'next/navigation'
import { useAccount, useDisconnect } from 'wagmi'

export function LogoutButton() {
  const { address } = useAccount()

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
    <div className="flex flex-row justify-center items-center bg-[#B881FF33] rounded-full font-semibold text-sm text-[#B881FF] pl-5">
      {address}
      <button className="btn btn-outline rounded-full bg-white ml-3" onClick={() => disconnectAsync()}>
        Logout
      </button>
    </div>
  )
}
