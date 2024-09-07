import { Heading1 } from '../ui/Heading1'
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { RequestNetwork, Types } from "@requestnetwork/request-client.js";

export function CompanyPayments() {
  const { address } = useAccount()
  const { data, isLoading, error } = useQuery({
    queryKey: ['payments', address],
    queryFn: async () => {
      if (!address) {
        throw new Error('No wallet provided')
      }
      const requestClient = new RequestNetwork({
        nodeConnectionConfig: {
          baseURL: "https://gnosis.gateway.request.network",
        },
      });
      const requests = await requestClient.fromIdentity({
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: address,
      });
      return requests.map((request) => request.getData());
    }
  })

  return (
    <div>
      <Heading1>Payments</Heading1>
    </div>
  )
}
