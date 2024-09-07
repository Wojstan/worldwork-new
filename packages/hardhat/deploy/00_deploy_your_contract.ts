import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */



  if (hre.network.name != 'localhost') {
    return
  }
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const worldId = await deploy("WorldId", {
    from: deployer,
    // Contract constructor arguments
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  if (!worldId.receipt) {
    throw new Error('WorldId contract deployment failed')
  }

  const worldWorkDeployment = await deploy("WorldWork", {
    from: deployer,
    // Contract constructor arguments
    log: true,
    args: [
      worldId.receipt.contractAddress,
      'app_staging_3aeacead9480597498aa72bc01889e92',
      'regiter-work-user',
    ],
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const worldWork = await hre.ethers.getContractAt("WorldWork", worldWorkDeployment.address);
  const transactionResponse1 = await worldWork.addDefaultValuesEmployer('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  await transactionResponse1.wait();

  const transactionResponse2 = await worldWork.addDefaultValuesEmployer('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
  await transactionResponse2.wait();

  const transactionResponse3 = await worldWork.addDefaultJobOffer();
  await transactionResponse3.wait();
  console.log('deployer', deployer)

  const transactionResponse4 = await worldWork.addDefaultValuesWorker('0x90F79bf6EB2c4f870365E785982E1f101E93b906');
  await transactionResponse4.wait();

  const transactionResponse5 = await worldWork.testApplyForJob('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 0, '0x90F79bf6EB2c4f870365E785982E1f101E93b906')
  await transactionResponse5.wait();

  const unnamed = await hre.getUnnamedAccounts();
  console.log('abc', unnamed)
};

export default deployYourContract;
