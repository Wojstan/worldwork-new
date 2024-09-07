import Image from 'next/image'
import { Heading1 } from '../ui/Heading1'
import { RequestNetwork, Types } from '@requestnetwork/request-client.js'
import { useQuery } from '@tanstack/react-query'
import { formatUnits } from 'viem'
import { useAccount, useEnsName } from 'wagmi'
import { Salary } from '~~/components/Salary'
import { DateInfo } from '~~/components/ui/DateInfo'
import { Heading3 } from '~~/components/ui/Heading3'
import { Loader } from '~~/components/ui/Loader'
import { formatTime } from '~~/utils/formatTime'
import { shortenText } from '~~/utils/shortenText'

export function CompanyPayments() {
  const { address } = useAccount()
  const { data, isLoading } = useQuery({
    queryKey: ['payments', address],
    queryFn: async () => {
      if (!address) {
        throw new Error('No wallet provided')
      }
      const requestClient = new RequestNetwork({
        nodeConnectionConfig: {
          baseURL: 'https://gnosis.gateway.request.network',
        },
      })
      const requests = await requestClient.fromIdentity({
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: address,
      })
      return requests.map((request) => request.getData())
    },
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <Heading1>Payments</Heading1>
      <div className="flex flex-col gap-3 mt-8">
        {data?.map((payment) => (
          <PaymentBox key={payment.requestId} payment={payment} />
        ))}
      </div>
    </div>
  )
}

interface PaymentBoxProps {
  payment: Types.IRequestDataWithEvents
}

const PaymentBox = ({ payment }: PaymentBoxProps) => {
  const receiverAddress = payment.payee?.value
  const { data } = useEnsName({ address: receiverAddress })
  const amount = formatUnits(BigInt(payment.balance?.balance ?? 0), 18)
  const date = new Date(payment.timestamp * 1000)

  return (
    <div className="border border-black h-28 rounded-xl bg-white z-50 flex items-center justify-between px-6 relative">
      <div className="flex gap-8 items-center">
        <Image alt="avatar" src="/doe.png" width={80} height={80} />
        <div className="font-semibold text-lg">{data ?? shortenText(receiverAddress)}</div>
      </div>
      <Salary primary={amount} />
      <DateInfo date={date} />
      <span className="text-base text-[#356B00]">✓ PAID</span>
    </div>
  )
}
