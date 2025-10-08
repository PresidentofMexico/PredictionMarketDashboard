// Kalshi API Types
export interface KalshiMarket {
  ticker: string;
  event_ticker: string;
  market_ticker: string;
  title: string;
  subtitle?: string;
  open_time?: string;
  close_time?: string;
  expected_expiration_time?: string;
  status?: string;
  yes_bid?: number;
  yes_ask?: number;
  no_bid?: number;
  no_ask?: number;
  last_price?: number;
  volume?: number;
  open_interest?: number;
  result?: string;
  category?: string;
  tags?: string[];
}

export interface KalshiEvent {
  event_ticker: string;
  title: string;
  category: string;
  series_ticker: string;
  strike_date?: string;
  sub_title?: string;
  markets?: KalshiMarket[];
}

export interface KalshiResponse {
  cursor?: string;
  markets?: KalshiMarket[];
  events?: KalshiEvent[];
}

// Polymarket API Types
export interface PolymarketMarket {
  id: string;
  question: string;
  description?: string;
  slug?: string;
  outcomes: string[];
  outcomePrices: string[];
  volume?: string;
  liquidity?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  tags?: string[];
  active?: boolean;
  closed?: boolean;
  archived?: boolean;
  new?: boolean;
  featured?: boolean;
  restricted?: boolean;
  marketType?: string;
  groupItemTitle?: string;
  groupItemThreshold?: string;
  volumeNum?: number;
  liquidityNum?: number;
  outcomeA?: string;
  outcomeB?: string;
  priceA?: number;
  priceB?: number;
}

export interface PolymarketResponse {
  data?: PolymarketMarket[];
  next_cursor?: string;
}

// Unified Dashboard Types
export interface UnifiedMarket {
  id: string;
  source: 'kalshi' | 'polymarket';
  title: string;
  description?: string;
  category?: string;
  yesPrice: number;
  noPrice: number;
  volume?: number;
  liquidity?: number;
  endDate?: string;
  status?: string;
  outcomes?: string[];
  tags?: string[];
}

export interface DashboardFilters {
  category?: string;
  minVolume?: number;
  maxPrice?: number;
  source?: 'kalshi' | 'polymarket' | 'all';
  search?: string;
}
