# Feedback on XION Platform Documentation and Tooling

1. **Lack of Documentation on xion.js**:

   - I could not find any documentation on `xion.js` in the official docs. Additionally, there were no links to the team's GitHub repositories within the documentation (or at least I couldn’t find them easily). I had to manually search GitHub to locate them. I eventually found a link in the footer of the main site, but it would have been helpful to have this information directly in the docs.

2. **Missing Faucet Instructions in Getting Started Section**:

   - The "Getting Started" section of the docs did not include instructions on how to access testnet tokens via the faucet. I had to search through other parts of the documentation to figure this out.

3. **Outdated Faucet Instructions**:

   - The faucet instructions on the [faucet page](https://docs.burnt.com/xion/developers/section-overview/xion-testnet-1) need updating. The channel is now restricted, and additional steps are required to gain access to the faucet. This should be reflected in the documentation.

4. **Unclear Flow in First Contract Guide**:

   - The steps in the first contract guide ([Deploy a CosmWasm Smart Contract](https://docs.burnt.com/xion/developers/featured-guides/your-first-contract/deploy-a-cosmwasm-smart-contract)) didn’t flow well. Initially, I thought contract compiling/optimization steps weren’t available, but they were discussed later in the guide after the contract deployment and interaction sections. However, you must compile an optimized version of the contract before deployment and interaction. The flow of the guide should be adjusted for better clarity.

5. **Cargo Wasm Command Usage**:

   - I don’t believe the `cargo wasm` (https://docs.burnt.com/xion/developers/featured-guides/your-first-contract/deploy-a-cosmwasm-smart-contract#confirm-contract-deployment) command is useful here since only optimized compiled code using Rust’s optimizer can be deployed and used on-chain.

6. **xion.js Demo App Setup Inconsistency**:

   - The `xion.js` demo app is configured to use `pnpm`, but the README ([here](https://github.com/burnt-labs/xion.js/blob/main/apps/demo-app/README.md)) states to use `yarn dev`. It should be consistent and mention `pnpm` instead of `yarn`. Additionally, the README should mention that dependencies need to be installed first by running `pnpm install` in the root of the project folder and then `pnpm dev` to launch the dapp.

7. **Confusing Fee Granter Setup**:

   - I wasted a lot of time trying to get my custom treasury fee granter working with the dapp and I noticed devs on discord having the same issue. After setting up the fee granter, and setting the treasury address in the dapp, I was not aware that I had to log out of the dapp and log back in for the new granter to take effect. The documentation did not mention this, which led to confusion. I spent a considerable amount of time troubleshooting, even creating multiple granters, before discovering this requirement.

8. **Missing Instructions for Building and Launching a Local Dev Environment**:

   - The `xion.js` README didn’t provide clear instructions on how to build and launch a local development environment. I ran `pnpm install` in the root directory, followed by `pnpm run dev` in the `daps-demo` directory, which led to the error mentioned above. All commands must be run in the root directory, so the README should clarify this.

9. **Deprecated -b Block Return Type**:

   - The `-b block` flag is used in most commands in the docs but is now deprecated, as noted in the guide for storing to the Xion testnet chain ([link](https://docs.burnt.com/xion/developers/featured-guides/your-first-contract/deploy-a-cosmwasm-smart-contract#store-to-osmosis-testnet-chain)). `async` and `sync` are available options.

10. **Missing Flags for Transaction Execution Commands**:

    - The commands for executing transactions are missing the necessary `--node` and `--chain-d` flags. These flags are essential for specifying the node and chain details, and their absence prevents executing transactions.

11. **Missing Query Execution Instructions**:

    - The docs ([link](https://docs.burnt.com/xion/developers/featured-guides/your-first-dapp/build-react-dapp-with-account-abstraxion)) and the sample dapp demonstrate how to execute a transaction using the Abstraxion library, but they do not explain how to execute a query.

Overall, I believe the documentation suffers from a knowledge bias, where the assumption is made that the reader already has certain knowledge. As a result, the writer may omit key information. If this assumption is removed and the documentation is written with a broader perspective considering that not all readers will have the same level of prior knowledge, the documentation would become more detailed. This would ensure that all users, regardless of their background, can follow along and fully understand the material without having to fill in gaps themselves.
