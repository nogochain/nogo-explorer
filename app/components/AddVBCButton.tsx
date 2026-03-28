'use client';

import { DEFAULT_CHAIN_ID, DEFAULT_RPC_PORT } from '@/lib/client-config';

export default function AddNOGOButton() {
  const addNetwork = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${DEFAULT_CHAIN_ID.toString(16)}`,
            chainName: 'NogoChain',
            nativeCurrency: { name: 'NOGO', symbol: 'NOGO', decimals: 18 },
            rpcUrls: [`http://localhost:${DEFAULT_RPC_PORT}`],
            blockExplorerUrls: [`http://localhost:3000`],
          }],
        });
      }
    } catch (error) {
      console.error('Failed to add network:', error);
    }
  };

  return (
    <button
      onClick={addNetwork}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Add NogoChain to Wallet
    </button>
  );
}
