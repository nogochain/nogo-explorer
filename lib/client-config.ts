/**
 * Client-side configuration utilities for NogoChain
 * These functions can be used in client components without fs dependencies
 */

// Network identifiers
export const DEFAULT_CHAIN_ID = 318;
export const DEFAULT_RPC_PORT = 8545;
export const DEFAULT_WS_PORT = 8546;

// Block parameters
export const DEFAULT_BLOCK_TIME = 17;
export const DEFAULT_BLOCK_REWARD = 8;

// Supply parameters
export const DEFAULT_PREMINE_AMOUNT = 10000000;
export const DEFAULT_ANNUAL_DECAY_RATE = 0.9;

// Special addresses
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const TREASURY_ADDRESS = '0xA9c83E5f0520E7b14f8E6D93A6b65993884C0165';

// Timeout and cache
export const DEFAULT_RPC_TIMEOUT = 30000;
export const DEFAULT_RETRY_DELAY = 1000;
export const DEFAULT_MAX_RETRIES = 3;
export const DEFAULT_CACHE_DURATION = 60;
export const DEFAULT_FETCH_TIMEOUT = 10000;
export const DEFAULT_POLLING_INTERVAL = 5000;

// Pagination
export const DEFAULT_PAGE_SIZE = 50;
export const DEFAULT_MAX_PAGE_SIZE = 100;

// Gas
export const DEFAULT_GAS_LIMIT = 21000;

// Performance
export const DEFAULT_MEMORY_LIMIT_MB = 512;
export const DEFAULT_BULK_SIZE = 100;

// Contract verification
export const DEFAULT_COMPILER_VERSIONS = [
  '0.8.30', '0.8.29', '0.8.28', '0.8.27', '0.8.26',
  '0.8.25', '0.8.24', '0.8.23', '0.8.22', '0.8.21',
  '0.8.20', '0.8.19', '0.8.18', '0.8.17', '0.8.16',
  '0.8.15', '0.8.14', '0.8.13', '0.8.12', '0.8.11', '0.8.10'
];
export const DEFAULT_MAX_SOURCE_SIZE = 50000;

// Excluded addresses
export const DEFAULT_EXCLUDED_ADDRESSES = [
  { address: TREASURY_ADDRESS, label: 'Treasury Contract' },
  { address: ZERO_ADDRESS, label: 'Zero Address' },
];

// API rate limiting
export const DEFAULT_API_RATE_LIMIT = 100;
export const DEFAULT_API_RATE_LIMIT_WINDOW = 900000;

// Cache for currency config
let currencyCache: {
  symbol: string;
  name: string;
  decimals: number;
  gasUnit: string;
} | null = null;

// Cache for network config
let networkCache: {
  name: string;
  chainId: number;
} | null = null;

/**
 * Initialize currency config from API (call once on app load)
 */
export async function initializeCurrencyConfig(): Promise<void> {
  if (currencyCache && networkCache) return;
  
  try {
    const response = await fetch('/api/config/client');
    if (response.ok) {
      const config = await response.json();
      currencyCache = {
        symbol: config.currency?.symbol || 'ETH',
        name: config.currency?.name || 'Ether',
        decimals: config.currency?.decimals || 18,
        gasUnit: config.currency?.gasUnit || 'Gwei',
      };
      networkCache = {
        name: config.network?.name || 'Ethereum',
        chainId: config.network?.chainId || 1,
      };
    }
  } catch {
    // Use defaults if API fails
    currencyCache = {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
      gasUnit: 'Gwei',
    };
    networkCache = {
      name: 'Ethereum',
      chainId: 1,
    };
  }
}

/**
 * Get currency symbol (client-safe)
 * Returns cached value or default (Ethereum-compatible)
 */
export function getCurrencySymbol(): string {
  return currencyCache?.symbol || 'ETH';
}

/**
 * Get currency name (client-safe)
 * Returns cached value or default (Ethereum-compatible)
 */
export function getCurrencyName(): string {
  return currencyCache?.name || 'Ether';
}

/**
 * Get currency config (client-safe)
 * Returns cached value or defaults (Ethereum-compatible)
 */
export function getCurrencyConfig() {
  return currencyCache || {
    symbol: 'ETH',
    name: 'Ether',
    decimals: 18,
    gasUnit: 'Gwei',
  };
}

/**
 * Get gas unit (client-safe)
 */
export function getGasUnit(): string {
  return currencyCache?.gasUnit || 'Gwei';
}

/**
 * Get network name (client-safe)
 */
export function getNetworkName(): string {
  return networkCache?.name || 'Ethereum';
}

/**
 * Get chain ID (client-safe)
 */
export function getChainId(): number {
  return networkCache?.chainId || 1;
}
