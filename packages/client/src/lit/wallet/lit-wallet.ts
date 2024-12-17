import { LitElement, html, css, PropertyValues } from "lit";
import { getNetworkConfig } from "../../mud/getNetworkConfig";
import walletStyle from "../../styles/wallet/walletStyle";
import { getConnectors } from '@wagmi/core/actions'
import { http, createConfig, Connector, getToken,readContract } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { walletConnect, injected } from '@wagmi/connectors'
import { defineChain,erc721Abi } from "viem";

const fluentTestnet = defineChain({
  id: 1337,
  name: 'Fluent Testnet',
  network: 'fluent-testnet',
  nativeCurrency: { name: 'EtherDollar', symbol: 'WZT', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.dev1.fluentlabs.xyz'] },
    public: { http: ['https://rpc.dev1.fluentlabs.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://blockscout.dev1.fluentlabs.xyz' },
  },
});

const config = createConfig({
  chains: [mainnet, sepolia, fluentTestnet],
  connectors: [
    injected(),
    walletConnect({ 
      projectId: import.meta.env.VITE_WC_PROJECT_ID,
      metadata: {
        name: 'Archetypal Tech Wallet',
        description: 'Secure Web3 Wallet Connection',
        url: 'https://yourwebsite.com',
        icons: ['https://yourwebsite.com/logo.png']
      }
    }),
  ],
  transports: {
    [fluentTestnet.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

class LitWallet extends LitElement {
  declare inputValue: string;
  declare networkConfig: any;
  declare history: Array<string>;
  private connectors: Connector[] = [];
  private accounts: string[] = [];
  private currentStep: 'connect' | 'wallet' | 'account' = 'connect';

  static get properties() {
    return {
      inputValue: { type: String },
      history: { type: Array }
    };
  }

  protected async firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    console.log("first updated....");
    this.networkConfig = await getNetworkConfig();
    console.log("Fetched config");
  }

  constructor() {
    super();
    this.inputValue = '> Type "connect" to select wallet';
    // @ts-ignore
    this.history = [
      "Archetypal Tech Wallet Facility no:23",
      "------------------------------------------"
    ];
  }

  // @ts-ignore
  static styles = css([walletStyle]);

  render() {
    return html`
      <div class="wallet" role="region" aria-label="Wallet Connection Interface">
        <div class="wallet-history" aria-live="polite">
          ${this.history.map(line => html`<div class="output" role="log">${line}</div>`)}
        </div>
        <input 
          type="text" 
          .value="${this.inputValue}"
          @keydown="${this.handleEnter}"
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          aria-label="Wallet command input"
          autocomplete="off"
        >
      </div>
    `;
  }

  private handleFocus() {
    this.inputValue = '> ';
  }

  updated() {
    const container = this.shadowRoot.querySelector(".wallet");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  private async propmtConnect() {
    try {
      this.history.push('Connecting...');
      this.connectors = [...getConnectors(config)];

      if (this.connectors.length === 0) {
        throw new Error('No wallet connectors available');
      }

      this.history.push("Available wallets:");
      this.connectors.forEach((connector, index) => {
        this.history.push(`${index + 1}: ${connector.name}`);
      });
      this.currentStep = 'wallet';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Connection failed';
      this.history.push(`Error: ${errorMessage}`);
      this.currentStep = 'connect';
    }
    this.requestUpdate();
  }

  private async disconnectWallet() {
    try {
      const currentConnector = this.connectors[0]; // Assuming first connector
      if (currentConnector) {
        await currentConnector.disconnect();
        this.accounts = [];
        this.currentStep = 'connect';
        this.history.push('Wallet disconnected successfully');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Disconnection failed';
      this.history.push(`Disconnection Error: ${errorMessage}`);
    }
    this.requestUpdate();
  }

  private async connectToWallet(connector: Connector) {
    try {
      await connector.connect();
      this.accounts = [...await connector.getAccounts()];

      if (this.accounts.length > 0) {
        this.history.push("Available accounts:");
        this.accounts.forEach((account, index) => {
          this.history.push(`${index + 1}: ${account}`);
        });
        this.currentStep = 'account';
      } else {
        this.history.push("No accounts found.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.history.push(`Failed to connect: ${errorMessage}`);
    }
    this.requestUpdate();
  }

  private async selectAccount(account: string, connector: Connector) {
    try {
      // Network-aware contract address selection
      const erc721TokenAddress = 
        config.chains.includes(mainnet) 
          ? '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'  // Mainnet CryptoPunks
          : '0x1E988ba4692e52d00B88D8834dc49B3A1d7B57a9';  // Sepolia Test NFT
  
      try {
        // Check token balance for the account
        const balance = await readContract(config, {
          address: erc721TokenAddress as `0x${string}`,
          abi: erc721Abi,
          functionName: 'balanceOf',
          args: [account as `0x${string}`]
        });
  
        // More detailed logging and verification
        if (Number(balance) > 0) {
          this.history.push(`NFT Token verified: ${balance} tokens owned`);
          // Potential additional checks
          // Example: Check specific token attributes or ownership
          this.authenticateUser(account);
        } else {
          this.history.push("Access denied: No NFT tokens found");
          await this.disconnectWallet();
        }
      } catch (tokenError) {
        this.history.push("Token verification failed");
        console.error("Detailed Token Error:", tokenError);
        await this.disconnectWallet();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Account selection failed';
      this.history.push(`Error: ${errorMessage}`);
    }
    this.requestUpdate();
  }
  
  private authenticateUser(account: string) {
    // Additional authentication logic
    // Could include more sophisticated token checks
    this.history.push("Welcome, authenticated user!");
    // Potentially set user session, permissions, etc.
  }

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.inputValue = input.value;
  }

  private async handleEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if (this.currentStep === 'connect') {
        if (this.inputValue.toLowerCase() === '> connect') {
          await this.propmtConnect();
        } else {
          this.history.push("Unknown command. Type 'connect' to see available wallets.");
        }
      } else if (this.currentStep === 'wallet') {
        const walletChoice = parseInt(this.inputValue) - 1;
        const selectedConnector = this.connectors[walletChoice];

        if (selectedConnector) {
          await this.connectToWallet(selectedConnector);
        } else {
          this.history.push("Invalid selection. Please try again.");
        }
      } else if (this.currentStep === 'account') {
        const accountChoice = parseInt(this.inputValue) - 1;
        const selectedAccount = this.accounts[accountChoice];

        if (selectedAccount) {
          await this.selectAccount(selectedAccount, this.connectors[0]);
        } else {
          this.history.push("Invalid selection. Please try again.");
        }
      }
      this.inputValue = '';
      this.requestUpdate();
    }
  }
}

customElements.define('l-wallet', LitWallet);

export default LitWallet;
