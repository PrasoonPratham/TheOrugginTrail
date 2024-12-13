require('dotenv/config');
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@fluent.xyz/hardhat-plugin';
import '@nomicfoundation/hardhat-ignition';

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || '';

const config: HardhatUserConfig = {
  defaultNetwork: 'local',
  networks: {
    local: {
      url: 'http://127.0.0.1:8545',
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
        count: 10,
      },
      chainId: 1337,
    },
    dev: {
      url: 'https://rpc.dev.gblend.xyz/',
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 20993,
    },
  },
  solidity: {
    version: '0.8.27',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  fluent: {},
};

export default config;







