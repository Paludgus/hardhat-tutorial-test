import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    muster: {
      url: "https://muster-anytrust.alt.technology",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      muster: "abc",
    },
    customChains: [
      {
        network: "muster",
        chainId: 2121337,
        urls: {
          apiURL: "https://muster-anytrust-explorer-v2.alt.technology/api",
          browserURL: "https://muster-anytrust-explorer-v2.alt.technology",
        },
      },
    ],
  },
};

export default config;
