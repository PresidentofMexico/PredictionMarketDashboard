/**
 * API Configuration
 * Centralized configuration for API endpoints and authentication
 */

// Environment mode
export const API_MODE = import.meta.env.VITE_API_MODE || 'development';

// Kalshi API Configuration
export const KALSHI_CONFIG = {
  apiUrl: import.meta.env.VITE_KALSHI_API_URL || 'https://api.kalshi.com/trade-api/v2',
  apiKey: import.meta.env.VITE_KALSHI_API_KEY || '',
  email: import.meta.env.VITE_KALSHI_EMAIL || '',
  password: import.meta.env.VITE_KALSHI_PASSWORD || '',
};

// Polymarket API Configuration
export const POLYMARKET_CONFIG = {
  apiUrl: import.meta.env.VITE_POLYMARKET_API_URL || 'https://gamma-api.polymarket.com',
};

// WebSocket Configuration
export const WEBSOCKET_CONFIG = {
  url: import.meta.env.VITE_WEBSOCKET_URL || '',
};

/**
 * Check if we should use mock data
 */
export const shouldUseMockData = (): boolean => {
  return API_MODE === 'development' || !KALSHI_CONFIG.apiKey;
};

/**
 * Get authentication headers for Kalshi API
 */
export const getKalshiAuthHeaders = async (): Promise<HeadersInit> => {
  // For demo purposes, we'll use a simple authentication
  // In production, you should implement proper OAuth/JWT authentication
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (KALSHI_CONFIG.apiKey) {
    headers['Authorization'] = `Bearer ${KALSHI_CONFIG.apiKey}`;
  }

  return headers;
};

/**
 * Get headers for Polymarket API
 * Polymarket's public API doesn't require authentication for market data
 */
export const getPolymarketHeaders = (): HeadersInit => {
  return {
    'Content-Type': 'application/json',
  };
};
