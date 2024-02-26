import { ethers, run } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("owner: ", deployer.address);

  const name = "NERC404";
  const symbol = "N404";
  const decimal = 18n;
  const totalSupply = 10000n;

  const contract = await ethers.deployContract("NERC404", [
    name,
    symbol,
    decimal,
    totalSupply,
    deployer.address,
  ]);
  await contract.waitForDeployment();
  console.log("Contract deploy: ", contract.target);

  const tx = await contract.setWhitelist(deployer.address, true);
  await tx.wait();
  console.log(`Tx hash for whitelisting deployer address: ${tx.hash}`);

  await run(`verify:verify`, {
    address: contract.target,
    constructorArguments: [
      name,
      symbol,
      decimal,
      totalSupply,
      deployer.address,
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
