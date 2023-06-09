## How to use Witnet oracle network to display cryptocurrency prices
When developing Dapp, we often need to bring in information that is stored and processed outside of a blockchain network. This data can be retrieved and used by smart contracts through the use of oracles, which act as intermediaries between the off-chain world and the blockchain network. By using off-chain data, smart contracts can execute more complex logic and interact with external systems and services.

There are a couple of oracle platforms one could use to get off-chain data to one's Dapp. I want to show how to use Witnet to display price feeds of the popular blockchain networks.

### Requirements
- [Remix](https://remix.ethereum.org/) - Online editor for writing smart contracts or any code editor of your choice.
- [Metamask](https://metamask.io/) - For managing our wallet.
- [Hardhat](https://hardhat.org/) - For compiling and deploying the smart contract
- [Alfajores Testnet Account](https://developers.celo.org/3-simple-steps-to-connect-your-metamask-wallet-to-celo-732d4a139587) - Required to connect to the dApp and make test transactions.
- [Node.js](https://nodejs.org/en/) - From V12. or higher

### Installation
run `npm install` 

### Tech Stack
- React
- Solidity
- Hardhat

### Demo
https://witnet-oracle.vercel.app/