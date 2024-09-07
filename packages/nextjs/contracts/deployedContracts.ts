/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    WorldId: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "groupId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "signalHash",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "externalNullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
          ],
          name: "verifyProof",
          outputs: [],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {
        verifyProof: "contracts/interfaces/IWorldID.sol",
      },
    },
    WorldWork: {
      address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      abi: [
        {
          inputs: [
            {
              internalType: "contract IWorldID",
              name: "_worldId",
              type: "address",
            },
            {
              internalType: "string",
              name: "_appId",
              type: "string",
            },
            {
              internalType: "string",
              name: "_actionId",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "InvalidNullifier",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "employer",
              type: "address",
            },
          ],
          name: "EmployerRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "patient",
              type: "address",
            },
          ],
          name: "WorkerRegistered",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "worker",
              type: "address",
            },
          ],
          name: "acceptWorker",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "stablecoinSalary",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "tokenSalary",
              type: "uint256",
            },
          ],
          name: "addJobOffer",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "employer",
              type: "address",
            },
          ],
          name: "applyForJob",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "completeJob",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "employers",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "jobs",
          outputs: [
            {
              internalType: "address",
              name: "employer",
              type: "address",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "contract IERC20",
                  name: "token",
                  type: "address",
                },
              ],
              internalType: "struct WorldWork.Salary",
              name: "stablecoinSalary",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "contract IERC20",
                  name: "token",
                  type: "address",
                },
              ],
              internalType: "struct WorldWork.Salary",
              name: "tokenSalary",
              type: "tuple",
            },
            {
              internalType: "enum WorldWork.Stage",
              name: "stage",
              type: "uint8",
            },
            {
              internalType: "address",
              name: "worker",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "signal",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
          ],
          name: "registerEmployer",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "signal",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "root",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierHash",
              type: "uint256",
            },
            {
              internalType: "uint256[8]",
              name: "proof",
              type: "uint256[8]",
            },
          ],
          name: "registerWorker",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "workers",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
