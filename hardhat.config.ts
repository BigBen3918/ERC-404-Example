import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.20" }, { version: "0.4.18" }],
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    fantomtestnet: {
      url: "https://rpc.testnet.fantom.network",
      chainId: 4002,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    sepolianet: {
      url: "https://ethereum-sepolia.publicnode.com",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    bsctestnet: {
      url: "https://bsc-testnet.publicnode.com",
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  etherscan: {
    apiKey: process.env.ETHER_API_KEY,
  },
  sourcify: {
    enabled: true,
  },
  mocha: {
    timeout: 20000,
  },
};

export default config;
