import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "@openzeppelin/hardhat-upgrades";

import { HardhatUserConfig } from "hardhat/config";

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY_DEV;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "mumbai",
  networks: {
    localhost: {
      chainId: 31337,
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 80001,
    },
  }
};

export default config;
