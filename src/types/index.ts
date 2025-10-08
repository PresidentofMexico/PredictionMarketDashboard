// Core market types
export interface Market {
  id: string;
  title: string;
  description: string;
  source: 'kalshi' | 'polymarket';
  category: 'sports' | 'entertainment' | 'other';
  lastPrice: number;
  volume: number;
  liquidity?: number;
  openInterest?: number;
  closeTime: string;
  status: 'open' | 'closed' | 'settled';
  yesPrice?: number;
  noPrice?: number;
  createdTime: string;
}

// Order book types
export interface OrderBookLevel {
  price: number;
  size: number;
}

export interface OrderBook {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  timestamp: number;
}

// Price history types
export interface PricePoint {
  time: number;
  value: number;
  volume?: number;
}

// Filter and sort types
export type SortField = 'volume' | 'price' | 'closeTime' | 'createdTime';
export type SortDirection = 'asc' | 'desc';

export interface MarketFilters {
  source?: 'kalshi' | 'polymarket' | 'all';
  category?: 'sports' | 'entertainment' | 'other' | 'all';
  status?: 'open' | 'closed' | 'settled' | 'all';
  search?: string;
}

export interface MarketSort {
  field: SortField;
  direction: SortDirection;
}

// API response types
export interface KalshiMarket {
  ticker: string;
  title: string;
  category: string;
  close_time: string;
  status: string;
  yes_bid?: number;
  yes_ask?: number;
  volume: number;
  open_interest?: number;
  liquidity_pool?: number;
}

export interface PolymarketMarket {
  id: string;
  question: string;
  market: string;
  end_date_iso: string;
  active: boolean;
  closed: boolean;
  volume: string;
  liquidity?: string;
  outcome_prices?: string[];
}

// WebSocket message types
export interface WebSocketMessage {
  type: 'market_update' | 'orderbook_update' | 'trade';
  data: Market | OrderBook | unknown;
  timestamp: number;
}
