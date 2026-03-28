'use client';

import Image from 'next/image';
import { DEFAULT_CHAIN_ID, DEFAULT_RPC_PORT } from '@/lib/client-config';

export default function AddNOGOButton() {
  const handleAddNOGO = async () => {
    // Wait for ethereum to be injected (some wallets inject asynchronously)
    let ethereum = (window as any).ethereum;
    
    // If not found immediately, wait a bit and try again
    if (!ethereum) {
      await new Promise(resolve => setTimeout(resolve, 100));
      ethereum = (window as any).ethereum;
    }
    
    // Check if MetaMask or compatible wallet is installed
    if (!ethereum) {
      const confirmed = confirm('No Web3 wallet detected. Would you like to install MetaMask?');
      if (confirmed) {
        window.open('https://metamask.io/download/', '_blank');
      }
      return;
    }
    
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${DEFAULT_CHAIN_ID.toString(16)}`,
          chainName: 'NogoChain',
          nativeCurrency: {
            name: 'NogoChain',
            symbol: 'NOGO',
            decimals: 18,
          },
          rpcUrls: [`http://localhost:${DEFAULT_RPC_PORT}`],
          blockExplorerUrls: ['https://explorer.nogochain.org'],
          iconUrls: ['https://explorer.nogochain.org/img/nogo.svg']
        }],
      });
    } catch (error: any) {
      // User rejected or error occurred
      if (error.code === 4001) {
        console.log('User rejected the request');
      } else {
        console.error('Failed to add NogoChain network:', error);
        alert('Failed to add network. Please try again or add it manually in your wallet.');
      }
    }
  };

  return (
    <button
      type='button'
      onClick={handleAddNOGO}
      className='w-full sm:w-auto mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
    >
      <Image src='/img/MetaMask.svg' alt='MetaMask' width={24} height={24} className='w-6 h-6' />
      Add NogoChain
    </button>
  );
}
