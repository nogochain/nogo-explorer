/**
 * Supply API Library for NogoChain
 * 
 * Provides Total Supply and Circulating Supply calculations
 * for CoinGecko and CoinMarketCap integration.
 * 
 * Calculation Logic:
 * - Total Supply = (Block Height × Block Reward) + Pre-mine Amount
 * - Circulating Supply = Total Supply - (Sum of Excluded Wallet Balances)
 */

import { createPublicClient, http, formatEther, type Address } from 'viem';
import { loadConfig } from './config';

// ============================================
// Configuration
// ============================================

interface ExcludedAddress {
  address: string;
  label: string;
}

interface SupplyConfig {
  blockReward: number;
  premineAmount: number;
  excludedAddresses: ExcludedAddress[];
  cacheDuration: number;
}

// Type assertion for config with optional supply property
interface ConfigWithSupply {
  supply?: {
    blockReward?: number;
    premineAmount?: number;
    excludedAddresses?: ExcludedAddress[];
    cacheDuration?: number;
  };
  network?: {
    rpcUrl?: string;
  };
  web3Provider?: {
    url?: string;
  };
}

const config = loadConfig() as ConfigWithSupply;

// Load configuration from config.json with defaults
const supplyConfig: SupplyConfig = {
  blockReward: config.supply?.blockReward ?? 8,
  premineAmount: config.supply?.premineAmount ?? 10000000,
  excludedAddresses: config.supply?.excludedAddresses ?? [],
  cacheDuration: config.supply?.cacheDuration ?? 60,
};

// RPC URL from config
const RPC_URL = config.network?.rpcUrl || config.web3Provider?.url || 'http://localhost:8545';

// ============================================
// Viem Client Setup
// ============================================

const publicClient = createPublicClient({
  transport: http(RPC_URL, {
    timeout: 30000,
    retryCount: 3,
    retryDelay: 1000,
  }),
});

// ============================================
// Cache Management
// ============================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface SupplyCache {
  blockNumber: CacheEntry<bigint> | null;
  totalSupply: CacheEntry<number> | null;
  circulatingSupply: CacheEntry<number> | null;
  excludedBalances: CacheEntry<Map<string, bigint>> | null;
}

const cache: SupplyCache = {
  blockNumber: null,
  totalSupply: null,
  circulatingSupply: null,
  excludedBalances: null,
};

function isCacheValid<T>(entry: CacheEntry<T> | null): boolean {
  if (!entry) return false;
  const now = Date.now();
  const cacheDurationMs = supplyConfig.cacheDuration * 1000;
  return (now - entry.timestamp) < cacheDurationMs;
}

// ============================================
// Core Functions
// ============================================

/**
 * Get current block number from the blockchain
 */
export async function getBlockNumber(): Promise<bigint> {
  // Check cache first
  if (isCacheValid(cache.blockNumber)) {
    return cache.blockNumber!.data;
  }

  try {
    const blockNumber = await publicClient.getBlockNumber();
    
    // Update cache
    cache.blockNumber = {
      data: blockNumber,
      timestamp: Date.now(),
    };
    
    return blockNumber;
  } catch (error) {
    console.error('[Supply] Error fetching block number:', error);
    
    // Return cached value if available, even if expired
    if (cache.blockNumber) {
      console.warn('[Supply] Using expired cache for block number');
      return cache.blockNumber.data;
    }
    
    throw new Error('Failed to fetch block number');
  }
}

/**
 * Get balance of an address
 */
export async function getAddressBalance(address: string): Promise<bigint> {
  try {
    const balance = await publicClient.getBalance({
      address: address as Address,
    });
    return balance;
  } catch (error) {
    console.error(`[Supply] Error fetching balance for ${address}:`, error);
    return 0n;
  }
}

/**
 * Get balances of all excluded addresses
 */
export async function getExcludedBalances(): Promise<Map<string, bigint>> {
  // Check cache first
  if (isCacheValid(cache.excludedBalances)) {
    return cache.excludedBalances!.data;
  }

  const balances = new Map<string, bigint>();
  
  // Fetch all balances in parallel
  const promises = supplyConfig.excludedAddresses.map(async ({ address, label }) => {
    const balance = await getAddressBalance(address);
    return { address, label, balance };
  });
  
  const results = await Promise.all(promises);
  
  for (const { address, balance } of results) {
    balances.set(address.toLowerCase(), balance);
  }
  
  // Update cache
  cache.excludedBalances = {
    data: balances,
    timestamp: Date.now(),
  };
  
  return balances;
}

/**
 * Calculate the block reward with annual decay
 * Formula: blockReward × (decayRate ^ yearsElapsed)
 * Where:
 *   - yearsElapsed = floor(totalSeconds / secondsPerYear)
 *   - totalSeconds = blockNumber × blockTime
 *   - secondsPerYear = 365 × 24 × 3600 = 31,536,000
 *   - decayRate = 0.9 (10% annual decay)
 */
function calculateBlockRewardWithDecay(blockNumber: bigint, blockReward: number, blockTime: number, decayRate: number): number {
  const secondsPerYear = 31536000; // 365 days × 24 hours × 3600 seconds
  const totalSeconds = Number(blockNumber) * blockTime;
  const yearsElapsed = Math.floor(totalSeconds / secondsPerYear);
  
  // Apply exponential decay: reward = baseReward × (decayRate ^ years)
  const currentReward = blockReward * Math.pow(decayRate, yearsElapsed);
  
  return currentReward;
}

/**
 * Calculate Total Supply with annual decay
 * Formula: Pre-mine Amount + Σ(blockReward for each block)
 * 
 * For simplicity and performance, we use average reward approximation:
 * Total Supply = Pre-mine + (blockNumber × averageBlockReward)
 * Where averageBlockReward considers the decay over time
 */
export async function calculateTotalSupply(): Promise<number> {
  // Check cache first
  if (isCacheValid(cache.totalSupply)) {
    return cache.totalSupply!.data;
  }

  const blockNumber = await getBlockNumber();
  const baseBlockReward = supplyConfig.blockReward;
  const premineAmount = supplyConfig.premineAmount;
  const blockTime = 17; // seconds (from config)
  const decayRate = 0.9; // 10% annual decay
  
  // Calculate current block reward with decay
  const currentReward = calculateBlockRewardWithDecay(blockNumber, baseBlockReward, blockTime, decayRate);
  
  // For total supply, we sum all rewards from genesis to current block
  // Using integral approximation for performance:
  // Total Mined = ∫(baseReward × decayRate^(t/secondsPerYear)) dt from 0 to blockNumber
  // This simplifies to: (baseReward × secondsPerYear / ln(decayRate)) × (decayRate^(yearsElapsed) - 1)
  const secondsPerYear = 31536000;
  const yearsElapsed = (Number(blockNumber) * blockTime) / secondsPerYear;
  const lnDecayRate = Math.log(decayRate);
  
  // Integral of exponential decay function
  const totalMined = (baseBlockReward * secondsPerYear / blockTime / lnDecayRate) * (Math.pow(decayRate, yearsElapsed) - 1);
  
  // Total supply = premine + total mined (absolute value since ln(0.9) is negative)
  const totalSupply = premineAmount + Math.abs(totalMined);
  
  // Update cache
  cache.totalSupply = {
    data: totalSupply,
    timestamp: Date.now(),
  };
  
  return totalSupply;
}

/**
 * Calculate Circulating Supply
 * Formula: Total Supply - (Sum of Excluded Wallet Balances)
 */
export async function calculateCirculatingSupply(): Promise<number> {
  // Check cache first
  if (isCacheValid(cache.circulatingSupply)) {
    return cache.circulatingSupply!.data;
  }

  // Get total supply and excluded balances in parallel
  const [totalSupply, excludedBalances] = await Promise.all([
    calculateTotalSupply(),
    getExcludedBalances(),
  ]);
  
  // Sum up all excluded balances
  let totalExcluded = 0n;
  for (const balance of excludedBalances.values()) {
    totalExcluded += balance;
  }
  
  // Convert excluded balance from wei to NOGO (divide by 10^18)
  const excludedInNOGO = Number(formatEther(totalExcluded));
  
  // Calculate circulating supply
  const circulatingSupply = totalSupply - excludedInNOGO;
  
  // Update cache
  cache.circulatingSupply = {
    data: circulatingSupply,
    timestamp: Date.now(),
  };
  
  return Math.max(0, circulatingSupply); // Ensure non-negative
}

/**
 * Get detailed supply information (for debugging/admin)
 */
export async function getSupplyDetails(): Promise<{
  blockNumber: string;
  blockReward: number;
  premineAmount: number;
  totalSupply: number;
  circulatingSupply: number;
  excludedAddresses: Array<{
    address: string;
    label: string;
    balance: string;
  }>;
  cacheStatus: {
    blockNumberCached: boolean;
    totalSupplyCached: boolean;
    circulatingSupplyCached: boolean;
  };
}> {
  const blockNumber = await getBlockNumber();
  const totalSupply = await calculateTotalSupply();
  const circulatingSupply = await calculateCirculatingSupply();
  const excludedBalances = await getExcludedBalances();
  
  const excludedAddressDetails = supplyConfig.excludedAddresses.map(({ address, label }) => ({
    address,
    label,
    balance: formatEther(excludedBalances.get(address.toLowerCase()) || 0n),
  }));
  
  return {
    blockNumber: blockNumber.toString(),
    blockReward: supplyConfig.blockReward,
    premineAmount: supplyConfig.premineAmount,
    totalSupply,
    circulatingSupply,
    excludedAddresses: excludedAddressDetails,
    cacheStatus: {
      blockNumberCached: isCacheValid(cache.blockNumber),
      totalSupplyCached: isCacheValid(cache.totalSupply),
      circulatingSupplyCached: isCacheValid(cache.circulatingSupply),
    },
  };
}

/**
 * Clear all cached data (useful for forcing refresh)
 */
export function clearSupplyCache(): void {
  cache.blockNumber = null;
  cache.totalSupply = null;
  cache.circulatingSupply = null;
  cache.excludedBalances = null;
  console.log('[Supply] Cache cleared');
}

// Export configuration for reference
export const SUPPLY_CONFIG = {
  rpcUrl: RPC_URL,
  blockReward: supplyConfig.blockReward,
  premineAmount: supplyConfig.premineAmount,
  excludedAddresses: supplyConfig.excludedAddresses,
  cacheDuration: supplyConfig.cacheDuration,
};
