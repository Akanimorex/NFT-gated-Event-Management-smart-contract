import { ethers } from "hardhat";

async function main() {
  const EventContract = await ethers.deployContract('Event');

  await EventContract.waitForDeployment();

  console.log('contract deployed at ' + EventContract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
