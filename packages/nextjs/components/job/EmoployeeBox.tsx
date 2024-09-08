import Image from 'next/image'
import { Salary } from '../Salary'
import { Button } from '../ui/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Config, useClient, useEnsName, useWalletClient } from 'wagmi'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Loader } from '~~/components/ui/Loader'
import { getJobByEmployerAndEmployee, makeJobPayment } from '~~/db/jobActions'
import { shortenText } from '~~/utils/shortenText'
import { Address, Hex, parseUnits } from "viem";
import { useEthersProvider } from "~~/hooks/use-ethers-v5-provider";
import { useEthersSigner } from "~~/hooks/use-ethers-v5-signer";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { RequestNetwork, Types, Utils } from "@requestnetwork/request-client.js";
import { approveErc20, hasErc20Approval, hasSufficientFunds, payRequest } from "@requestnetwork/payment-processor";
import { waitForTransactionReceipt } from "viem/actions";

interface Props {
  employerAddress: string
  employeeAddress: string
  className?: string
  newLabel: boolean
  paid: boolean
  avatar: string
}

const tokenAddress = '0x5c383F1AfdC3B39dD4367d16CB8Bb72605EB08A8' // DWL
const feeRecipient = '0x0000000000000000000000000000000000000000';

export function EmployeeBox({ employerAddress, employeeAddress, className, newLabel, paid, avatar }: Props) {
  const { data: walletClient } = useWalletClient();
  const provider = useEthersProvider();
  const wagmiClient = useClient<Config>()
  const signer = useEthersSigner();

  const { data, isLoading } = useQuery({
    queryKey: ['jobByBoth', employerAddress, employeeAddress],
    queryFn: async () => getJobByEmployerAndEmployee(employerAddress, employeeAddress),
  })
  const { data: ensName } = useEnsName({ address: employeeAddress })
  const singleJob = data?.[0]

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      if (!wagmiClient) {
        throw new Error('No wagmi client')
      }
      if (!singleJob) {
        throw new Error('No job')
      }
      const web3SignatureProvider = new Web3SignatureProvider(walletClient);
      console.log('web3SignatureProvider: ', web3SignatureProvider)
      const requestClient = new RequestNetwork({
        nodeConnectionConfig: {
          baseURL: "https://gnosis.gateway.request.network/",
        },
        signatureProvider: web3SignatureProvider,
      });
      const stringAmount = singleJob.stablecoinSalary ?? singleJob.tokenSalary ?? 0
      const paymentAmount = parseUnits(stringAmount.toString(), 18)
      const paymentInfo = newPaymentInfo(paymentAmount.toString(), singleJob.employer, singleJob.employee ?? '')
      console.log('paymentInfo: ', paymentInfo)
      const request = await requestClient.createRequest(paymentInfo);
      console.log('request: ', request)
      const confirmedRequestData = await request.waitForConfirmation();
      console.log('confirmedRequestData: ', confirmedRequestData)

      const onChainRequest = await requestClient.fromRequestId(confirmedRequestData.requestId);
      const requestData = onChainRequest.getData();
      console.log('requestData: ', requestData)

      const _hasSufficientFunds = await hasSufficientFunds(
        {
          request: requestData,
          address: singleJob.employer,
          providerOptions: {
            provider: provider,
          },
        },
      );
      if (!_hasSufficientFunds) {
        throw new Error('No sufficient funds')
      }

      const _hasErc20Approval = await hasErc20Approval(
        requestData,
        singleJob.employer,
        provider
      );
      if (!_hasErc20Approval) {
        const approvalTx = await approveErc20(requestData, signer);
        await waitForTransactionReceipt(wagmiClient, { hash: approvalTx.hash as Hex })
      }
      const paymentTx = await payRequest(requestData, signer);
      await waitForTransactionReceipt(wagmiClient, { hash: paymentTx.hash as Hex })

      let balance = requestData?.balance?.balance ?? '0'
      console.log('balance: ', balance)
      while (balance < requestData.expectedAmount) {
        const requestData = await request.refresh();
        balance = requestData.balance?.balance ?? '0'
        console.log('balance: ', balance)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      await makeJobPayment(singleJob.employer, singleJob.arrayIndex)
    }
  })

  if (isLoading) {
    return <Loader />
  }
  if (!singleJob) {
    return 'Job not found'
  }

  return (
    <div
      className={`border border-black h-28 rounded-xl bg-white z-50 flex items-center justify-between px-6 relative ${className}`}
    >
      <div className="flex gap-8 items-center">
        <Image alt="avatar" src={avatar} width={80} height={80} />
        <div className="font-semibold text-lg">{ensName ?? shortenText(employeeAddress)}</div>
      </div>

      <Salary primary={singleJob.stablecoinSalary} secondary={singleJob.tokenSalary} />

      <div className="flex gap-2">
        {singleJob.paid ? (
          <div className="text-green-700 font-semibold flex items-center gap-1">
            <CheckIcon className="h-4" />
            PAID
          </div>
        ) : (
          <Button className="min-w-0" isLoading={isPending} onClick={mutateAsync}>Pay salary</Button>
        )}

        <button className="btn bg-[#F9DEDC] border-[#F87171] hover:bg-[#f8c7c3] rounded-full hover:border-[#F87171]">
          Terminate Contract
        </button>
      </div>

      {newLabel && (
        <div className="absolute -top-3 -left-8 rounded-full bg-green-500 text-green-900 text-sm p-1 px-3 font-bold">
          NEW EMPLOYEE
        </div>
      )}
    </div>
  )
}

const newPaymentInfo = (amount: string, sender: Address, recipient: Address): Types.ICreateRequestParameters => {
  return {
    requestInfo: {
      // The currency in which the request is denominated
      currency: {
        type: Types.RequestLogic.CURRENCY.ERC20,
        value: tokenAddress,
        network: 'sepolia',
      },

      // The expected amount as a string, in parsed units, respecting `decimals`
      // Consider using `parseUnits()` from ethers or viem
      expectedAmount: amount,

      // The payee identity. Not necessarily the same as the payment recipient.
      payee: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: recipient,
      },

      // The payer identity. If omitted, any identity can pay the request.
      payer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: sender,
      },

      // The request creation timestamp.
      timestamp: Utils.getCurrentTimestampInSecond(),
    },

    // The paymentNetwork is the method of payment and related details.
    paymentNetwork: {
      id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
      parameters: {
        paymentNetworkName: 'sepolia',
        paymentAddress: recipient,
        feeAddress: feeRecipient,
        feeAmount: '0',
      },
    },

    // The contentData can contain anything.
    // Consider using rnf_invoice format from @requestnetwork/data-format
    contentData: {
      reason: 'WorldWork Invoice',
    },

    // The identity that signs the request, either payee or payer identity.
    signer: {
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: sender,
    },
  }
}
