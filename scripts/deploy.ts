// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy {
  if (process.env.NEON_TOKEN_ADDRESS) {
    const Avatar = await ethers.getContractFactory("Avatar");
    const avatar = await Avatar.deploy(process.env.NEON_TOKEN_ADDRESS);

    await avatar.deployed();

    console.log("Avatar deployed to:", avatar.address);
  } else {
    console.log("NEON_TOKEN_ADDRESS is not set in .env file");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
