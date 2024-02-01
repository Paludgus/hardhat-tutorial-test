import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  // We can now use deployer
  const [deployer] = await hre.ethers.getSigners();

  // The value we want to lock
  const VALUE_LOCKED = hre.ethers.parseEther("0.01");

  // The unlock time after deployment
  const UNLOCK_TIME = 10000;

  // We use ethers to get the current time stamp
  const blockNumber = await ethers.provider.getBlockNumber();
  const lastBlockTimeStamp = (await ethers.provider.getBlock(blockNumber))
    ?.timestamp as number;

  // We say we want to deploy our Lock contract using the deployer
  // account and passing the value and arguments.
  await deploy("Lock", {
    from: deployer.address,
    args: [lastBlockTimeStamp + UNLOCK_TIME],
    value: VALUE_LOCKED.toString(),
    log: true,
  });
};

export default func;

// This tag will help us in the next section to trigger this deployment file programmatically
func.tags = ["DeployAll"];
