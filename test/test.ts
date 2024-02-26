import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NERC404", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const name = "NERC404";
    const symbol = "N404";
    const decimals = 18n;
    const maxTotalSupplyERC721 = 10000n;
    const [owner] = await ethers.getSigners();

    const NERC404Contract = await ethers.getContractFactory("NERC404");
    const deployedContract = await NERC404Contract.deploy(
      name,
      symbol,
      decimals,
      maxTotalSupplyERC721,
      owner.address
    );
    await deployedContract.waitForDeployment();

    return {
      deployedContract,
      name,
      symbol,
      decimals,
      maxTotalSupplyERC721,
      owner,
    };
  }

  describe("Deployment", function () {
    it("Should set the right params", async function () {
      const { name, symbol, decimals, deployedContract } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await deployedContract.name()).to.equal(name);
      expect(await deployedContract.symbol()).to.equal(symbol);
      expect(await deployedContract.decimals()).to.equal(decimals);
    });

    it("Should set the right owner", async function () {
      const { deployedContract, owner } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await deployedContract.owner()).to.equal(owner.address);
    });
  });
});
