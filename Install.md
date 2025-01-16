# Hot Potato

To install and configure the dapp, follow these steps:

1. Deploy an NFT smart contract on the blockchain to enable minting of a Hot Potato. You can find a sample contract [here](/smart_contract/cw721_base.wasm). Deploy and instantiate a copy of this contract.
2. In the [.env](/apps/demo-app/.env) file, set `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` to the address of the instantiated contract from step 1.
3. Mint an NFT using the deployed contract, and then update the [.env](/apps/demo-app/.env) file by setting `NEXT_PUBLIC_TOKEN_ID` to the `token_id` of the minted NFT.
4. Visit [https://dev.testnet.burnt.com](https://dev.testnet.burnt.com), and follow these steps:
   - Create a new `Treasury` and set the `Fee Grant` allowance type to `/cosmos.feegrant.v1beta1.BasicAllowance`.
   - Set the `Fee Grant` Type URL to `/cosmwasm.wasm.v1.MsgExecuteContract`.
   - Set the `Grant Config` grant type URL to `/cosmwasm.wasm.v1.MsgExecuteContract`.
   - Set the `Authorization Type` to `/cosmwasm.wasm.v1.ContractExecutionAuthorization`, and then set the `Contract Address` to the contract address you instantiated in step 1.
5. In your terminal, navigate to the root of the project and run the following command to install all dependencies: `pnpm install`. After installation, start the local server with `pnpm dev`, and access the dapp at `http://localhost:3001`.

To use the dapp, follow these steps:

1. Click the `Connect` button to log into the dapp.
2. After logging in, click the `Check Ownership` button to verify if you own the Hot Potato NFT. If you're the owner, a green message will appear saying, "Your account is the owner of the Hot Potato NFT." If not, a red message will be displayed stating, "Your account is not the owner of the Hot Potato NFT."
3. If you are the NFT owner, a new section labeled "Transfer NFT" will appear. This section includes a text field where you can enter the recipient's address and a `Transfer NFT` button. Click the button to initiate the transfer.
4. Once the `Transfer NFT` button is clicked, the NFT will be transferred to the specified address. If you click the `Check Ownership` button again, you will see a message indicating that you no longer own the NFT.
