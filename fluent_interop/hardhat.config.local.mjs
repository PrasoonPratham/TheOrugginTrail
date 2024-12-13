import 'dotenv/config'; // Simplified dotenv import
import { HardhatUserConfig } from 'hardhat/config';
// Import required Hardhat plugins
import '@nomicfoundation/hardhat-toolbox'; // Toolbox for testing, debugging, and interacting with contracts
import '@fluent.xyz/hardhat-plugin'; // Your custom Fluent plugin
import '@nomicfoundation/hardhat-ignition'; // Deployment framework

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || '';

const config: HardhatUserConfig = {
  // Set default network for commands that don't specify --network
  defaultNetwork: 'local',

  // Configure available networks
  networks: {
    // Local network configuration for development
    local: {
      url: 'http://127.0.0.1:8545', // Local Fluent node URL
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
        count: 10,
      },
      chainId: 1337, // Local network chain ID
    },
    // Fluent devnet configuration
    dev: {
      url: 'https://rpc.dev.gblend.xyz/', // Fluent devnet RPC endpoint
      accounts: [DEPLOYER_PRIVATE_KEY], // Account used for deployment
      chainId: 20993, // Fluent devnet chain ID
    },
  },

  // Solidity compiler configuration
  solidity: {
    version: '0.8.27', // Solidity version to use
    settings: {
      optimizer: {
        enabled: true, // Enable Solidity optimizer
        runs: 200, // Optimize for average number of runs
      },
    },
  },
  // Fluent plugin configuration you can override some options, see the plugin documentation
  fluent: {},
};

export default config;
