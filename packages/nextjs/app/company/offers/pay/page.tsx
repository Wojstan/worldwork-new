"use client"

import { Button } from "~~/components/ui/Button";
import { Config, useClient, useWalletClient } from "wagmi";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { RequestNetwork, Types, Utils } from "@requestnetwork/request-client.js"
import { Address, Hex, parseUnits } from "viem";
import { useEthersProvider } from "~~/hooks/use-ethers-v5-provider";
import { useEthersSigner } from "~~/hooks/use-ethers-v5-signer";
import { approveErc20, hasErc20Approval, hasSufficientFunds, payRequest } from "@requestnetwork/payment-processor";
import { waitForTransactionReceipt } from "viem/actions";
import { useMutation } from "@tanstack/react-query";

const sender = '0x876e4Da8C4eb1475a87046940c54Aa0ec6DdC49e'; //MyDev
const recipient = '0x403d4Af8C6B50fcAaAf68cDBceBe09749Be06335'; //Dev
const paymentAmount = parseUnits('10', 18)
const tokenAddress = '0x5c383F1AfdC3B39dD4367d16CB8Bb72605EB08A8' // DWL
const feeRecipient = '0x0000000000000000000000000000000000000000';

const Pay = () => {
  const { data: walletClient } = useWalletClient();
  const provider = useEthersProvider();
  const wagmiClient = useClient<Config>()
  const signer = useEthersSigner();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      if (!wagmiClient) {
        throw new Error('No wagmi client')
      }
      const web3SignatureProvider = new Web3SignatureProvider(walletClient);
      console.log('web3SignatureProvider: ', web3SignatureProvider)
      const requestClient = new RequestNetwork({
        nodeConnectionConfig: {
          baseURL: "https://gnosis.gateway.request.network/",
        },
        signatureProvider: web3SignatureProvider,
      });
      const paymentInfo = newPaymentInfo(paymentAmount.toString(), sender, recipient)
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
          address: sender,
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
        sender,
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
    }
  })

  return <div className="flex flex-col items-center">
    <Button isLoading={isPending} onClick={mutateAsync}>Pay</Button>
  </div>
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

export default Pay
