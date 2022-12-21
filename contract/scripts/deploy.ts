import { ethers } from "hardhat";

async function main() {
  const Smartdrop = await ethers.getContractFactory("AirDrop");
  const smartdrop = await Smartdrop.deploy("Testtoken", "TKT", 2000);

  await smartdrop.deployed();

  console.log(`Smartdrop deployed to ${smartdrop.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
