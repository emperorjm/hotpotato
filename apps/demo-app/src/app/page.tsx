"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useAbstraxionClient,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button, Input } from "@burnt-labs/ui";
import "@burnt-labs/ui/dist/index.css";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";

const nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;
const tokenId = process.env.NEXT_PUBLIC_TOKEN_ID!;
const treasuryAddress = process.env.NEXT_PUBLIC_TREASURY_ADDRESS!;

type ExecuteResultOrUndefined = ExecuteResult | undefined;

export default function Page(): JSX.Element {
  // Track ownership
  const [isOwner, setIsOwner] = useState<boolean | null>(null);

  // Track errors
  const [error, setError] = useState<string | null>(null);

  // Track recipient address input
  const [recipientAddress, setRecipientAddress] = useState<string>("");

  // Abstraxion hooks
  const { data: account } = useAbstraxionAccount();
  const { client, signArb, logout } = useAbstraxionSigningClient();
  const { client: queryClient } = useAbstraxionClient();

  // General state hooks
  const [, setShowModal]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useModal();
  const [loading, setLoading] = useState(false);
  const [executeResult, setExecuteResult] =
    useState<ExecuteResultOrUndefined>(undefined);

  const blockExplorerUrl = `https://explorer.burnt.com/xion-testnet-1/tx/${executeResult?.transactionHash}`;

  function getTimestampInSeconds(date: Date | null): number {
    if (!date) return 0;
    const d = new Date(date);
    return Math.floor(d.getTime() / 1000);
  }

  // Initial check on component load
  /**useEffect(() => {
    if (queryClient) {
      checkOwnership();
    }
  }, [queryClient]);**/

  const checkOwnership = async () => {
    setLoading(true);
    setError(null);

    try {
      // Query the contract
      const response = await queryClient.queryContractSmart(nftContractAddress, {
        owner_of: { token_id: tokenId },
      });
      
      console.log('Contract response:', response);

      // Check if the logged in account address is the owner
      if (response.owner === account.bech32Address) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } catch (error) {
        console.error('Error querying contract:', error);
        setError('Failed to query the contract. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  async function transferNft(): Promise<void> {
    if (!recipientAddress) {
      setError("Please enter a recipient address.");
      return;
    }

    //setLoading(true);
    const msg = {
      transfer_nft: {
        recipient: recipientAddress,
        token_id: tokenId,
      },
    };

    try {
      // Use "auto" fee for most transactions
      const transferResponse = await client?.execute(
        account.bech32Address,
        nftContractAddress,
        msg,
        {
          amount: [{ amount: "1", denom: "uxion" }],
          gas: "500000",
          granter: treasuryAddress
        },
      );

      setExecuteResult(transferResponse);
    } catch (error) {
      console.error('Error executing transaction:', error);
      setError("Failed to transfer NFT. Please try again.");
    } finally {
      //setLoading(false);
    }
  }

  return (
    <main className="m-auto flex min-h-screen max-w-xs flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold tracking-tighter text-white">
        HOT POTATO
      </h1>

      <h3 className="tracking-tighter text-white">
        Your Address: { account.bech32Address }
      </h3>

      <Button
        fullWidth
        onClick={() => {
          setShowModal(true);
        }}
        structure="base"
      >
        {account.bech32Address ? (
          <div className="flex items-center justify-center">VIEW ACCOUNT</div>
        ) : (
          "CONNECT"
        )}
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : isOwner === null ? (
        // Nothing is shown if `isOwner` is still null
        <p></p>
      ) : isOwner ? (
        <p className="text-green-500">Your account is the owner of the Hot Potato NFT.</p>
      ) : (
        <p className="text-red-500">Your account is not the owner of the Hot Potato NFT.</p>
      )}

      {account.bech32Address ? (
        <>
        <Button
          onClick={checkOwnership}
          disabled={loading}
          structure="base"
          fullWidth
        >
          {loading ? 'Rechecking...' : 'Check Ownership'}
        </Button>
        </>
      ) : null}

      {isOwner && client ? (
        <>
        <h3 className="text-sm font-normal tracking-tighter text-white mt-10">
          TRANSFER NFT
        </h3>
        <Input
            type="text"
            placeholder="Recipient Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            disabled={loading}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          <Button
            disabled={loading}
            fullWidth
            onClick={transferNft}
            structure="base"
            className="mb-10"
          >
            {loading ? "LOADING..." : "TRANSFER NFT"}
          </Button>
        </>
      ) : null}

      {client ? (
        <>
        {logout ? (
          <Button
            disabled={loading}
            fullWidth
            onClick={() => {
              logout();
            }}
            structure="base"
          >
            LOGOUT
          </Button>
        ) : null}
        </>
      ) : null}


      <Abstraxion
        onClose={() => {
          setShowModal(false);
        }}
      />
      {executeResult ? (
        <div className="flex flex-col rounded border-2 border-black p-2 dark:border-white">
          <div className="mt-2">
            <p className="text-zinc-500">
              <span className="font-bold">Transaction Hash</span>
            </p>
            <p className="text-sm">{executeResult.transactionHash}</p>
          </div>
          <div className="mt-2">
            <p className=" text-zinc-500">
              <span className="font-bold">Block Height:</span>
            </p>
            <p className="text-sm">{executeResult.height}</p>
          </div>
          <div className="mt-2">
            <Link
              className="text-black underline visited:text-purple-600 dark:text-white"
              href={blockExplorerUrl}
              target="_blank"
            >
              View in Block Explorer
            </Link>
          </div>
        </div>
      ) : null}
    </main>
  );
}
