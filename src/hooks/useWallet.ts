"use client";

import { createBaseAccountSDK } from "@base-org/account";
import { useCallback, useEffect, useState } from "react";
import { baseSepolia } from "viem/chains";
import { encodeFunctionData, parseUnits, formatUnits } from "viem";

// USDC contract address on Base Sepolia
const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS || "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const RECIPIENT_ADDRESS = process.env.NEXT_PUBLIC_RECIPIENT_ADDRESS || "0x90479a1128ab97888fDc2507a63C9cb50B3417fb";

// ERC-20 ABI for transfer and balanceOf functions
const ERC20_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export interface WalletState {
  provider: ReturnType<
    ReturnType<typeof createBaseAccountSDK>["getProvider"]
  > | null;
  connected: boolean;
  universalAddress: string;
  subAccountAddress: string;
  loading: boolean;
  status: string;
  usdcBalance: string;
}

export function useWallet() {
  const [provider, setProvider] = useState<ReturnType<
    ReturnType<typeof createBaseAccountSDK>["getProvider"]
  > | null>(null);
  const [connected, setConnected] = useState(false);
  const [universalAddress, setUniversalAddress] = useState<string>("");
  const [subAccountAddress, setSubAccountAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Ready to connect");
  const [usdcBalance, setUsdcBalance] = useState<string>("0.00");

  // Load wallet state from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedState = localStorage.getItem('wallet-state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        if (parsedState.connected && parsedState.universalAddress && parsedState.subAccountAddress) {
          setConnected(parsedState.connected);
          setUniversalAddress(parsedState.universalAddress);
          setSubAccountAddress(parsedState.subAccountAddress);
          setStatus("Wallet connected (restored from session)");
        }
      }
    } catch (error) {
      console.error("Failed to load wallet state from localStorage:", error);
    }
  }, []);

  // Save wallet state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const walletState = {
        connected,
        universalAddress,
        subAccountAddress,
        timestamp: Date.now()
      };
      localStorage.setItem('wallet-state', JSON.stringify(walletState));
    } catch (error) {
      console.error("Failed to save wallet state to localStorage:", error);
    }
  }, [connected, universalAddress, subAccountAddress]);

  // Initialize SDK with quickstart configuration
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const sdkInstance = createBaseAccountSDK({
          appName: process.env.NEXT_PUBLIC_APP_NAME || "OnlyDevs",
          appLogoUrl: process.env.NEXT_PUBLIC_APP_LOGO_URL || "https://base.org/logo.png",
          appChainIds: [baseSepolia.id],
          // Quickstart configuration
          subAccounts: {
            creation: "on-connect",
            defaultAccount: "sub",
          },
        });

        const providerInstance = sdkInstance.getProvider();
        setProvider(providerInstance);
        setStatus("SDK initialized - ready to connect");
      } catch (error) {
        console.error("SDK initialization failed:", error);
        setStatus("SDK initialization failed");
      }
    };

    initializeSDK();
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      setStatus("Provider not initialized");
      return;
    }

    setLoading(true);
    setStatus("Connecting wallet and creating sub account...");

    try {
      // With quickstart config, this will automatically create a sub account
      const connectedAccounts = (await provider.request({
        method: "wallet_connect",
        params: [],
      })) as string[];

      const accounts = (await provider.request({
        method: "eth_requestAccounts",
        params: [],
      })) as string[];

      // With defaultAccount: 'sub', the sub account is the first account
      const subAddr = accounts[0];
      const universalAddr = accounts[1];

      setSubAccountAddress(subAddr);
      setUniversalAddress(universalAddr);
      setConnected(true);
      setStatus("Connected! Sub Account automatically created");
    } catch (error) {
      console.error("Connection failed:", error);
      setStatus(
        `Connection failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setUniversalAddress("");
    setSubAccountAddress("");
    setUsdcBalance("0.00");
    setStatus("Wallet disconnected");
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wallet-state');
    }
  };

  const checkWalletConnection = async () => {
    if (!provider || !connected) return false;
    
    try {
      const accounts = (await provider.request({
        method: "eth_accounts",
        params: [],
      })) as string[];
      
      // Check if we still have the same accounts
      if (accounts.length === 0 || accounts[0] !== subAccountAddress) {
        disconnectWallet();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Failed to check wallet connection:", error);
      disconnectWallet();
      return false;
    }
  };

  const fetchUSDCBalance = useCallback(async () => {
    if (!provider || !subAccountAddress) {
      setUsdcBalance("0.00");
      return;
    }

    try {
      const data = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [subAccountAddress as `0x${string}`],
      });

      const result = (await provider.request({
        method: "eth_call",
        params: [
          {
            to: USDC_ADDRESS,
            data: data,
          },
          "latest",
        ],
      })) as string;

      const balanceBigInt = BigInt(result);
      const formattedBalance = formatUnits(balanceBigInt, 6);

      const roundedBalance = parseFloat(formattedBalance).toFixed(2);
      setUsdcBalance(roundedBalance);
    } catch (error) {
      console.error("Failed to fetch USDC balance:", error);
      setUsdcBalance("0.00");
    }
  }, [provider, subAccountAddress]);

  const sendPayment = useCallback(
    async (amount: string) => {
      if (!provider || !subAccountAddress) {
        setStatus("Not connected or sub account not available");
        return false;
      }

      setLoading(true);
      setStatus("Preparing USDC transfer...");

      try {
        // Parse amount (USDC has 6 decimals)
        const amountInUnits = parseUnits(amount, 6);

        // Encode the transfer function call
        const data = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: "transfer",
          args: [RECIPIENT_ADDRESS as `0x${string}`, amountInUnits],
        });

        setStatus("Sending transaction...");

        // Send the transaction using wallet_sendCalls
        const callsId = (await provider.request({
          method: "wallet_sendCalls",
          params: [
            {
              version: "2.0",
              atomicRequired: true,
              chainId: `0x${baseSepolia.id.toString(16)}`,
              from: subAccountAddress,
              calls: [
                {
                  to: USDC_ADDRESS,
                  data: data,
                  value: "0x0",
                },
              ],
              capabilities: {
                // Optional: Add paymaster URL here to sponsor gas
                // paymasterUrl: "your-paymaster-url",
              },
            },
          ],
        })) as string;

        setStatus(`Transaction sent! Calls ID: ${callsId}`);

        // Return transaction details for UI display
        return {
          success: true,
          transactionId: callsId,
          amount: amount,
          recipient: RECIPIENT_ADDRESS,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error("Transaction failed:", error);
        setStatus(
          `Transaction failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      } finally {
        setLoading(false);
      }
    },
    [provider, subAccountAddress]
  );

  // Check wallet connection when provider is ready and we have restored state
  useEffect(() => {
    if (provider && connected && subAccountAddress) {
      checkWalletConnection();
    }
  }, [provider, connected, subAccountAddress]);

  // Fetch USDC balance when wallet connects
  useEffect(() => {
    if (connected && subAccountAddress) {
      fetchUSDCBalance();
    }
  }, [connected, subAccountAddress, fetchUSDCBalance]);

  return {
    provider,
    connected,
    universalAddress,
    subAccountAddress,
    loading,
    status,
    usdcBalance,
    connectWallet,
    disconnectWallet,
    checkWalletConnection,
    sendPayment,
    fetchUSDCBalance,
  };
}
