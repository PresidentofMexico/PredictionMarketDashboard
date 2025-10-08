import type { Market, KalshiMarket, PolymarketMarket } from '../types';

// Normalize Kalshi market response to our Market type
export const normalizeKalshiMarket = (market: KalshiMarket): Market => {
  return {
    id: market.ticker,
    title: market.title,
    description: market.title,
    source: 'kalshi',
    category: mapKalshiCategory(market.category),
    lastPrice: market.yes_bid || 0,
    volume: market.volume,
    liquidity: market.liquidity_pool,
    openInterest: market.open_interest,
    closeTime: market.close_time,
    status: mapKalshiStatus(market.status),
    yesPrice: market.yes_bid,
    noPrice: market.yes_ask ? 100 - market.yes_ask : undefined,
    createdTime: new Date().toISOString(), // Kalshi doesn't provide created time
  };
};

// Normalize Polymarket response to our Market type
export const normalizePolymarketMarket = (market: PolymarketMarket): Market => {
  const outcomePrice = market.outcome_prices ? parseFloat(market.outcome_prices[0]) : 0;
  
  return {
    id: market.id,
    title: market.question,
    description: market.market || market.question,
    source: 'polymarket',
    category: 'other', // Polymarket doesn't categorize the same way
    lastPrice: outcomePrice * 100, // Convert to percentage
    volume: parseFloat(market.volume),
    liquidity: market.liquidity ? parseFloat(market.liquidity) : undefined,
    closeTime: market.end_date_iso,
    status: market.closed ? 'closed' : market.active ? 'open' : 'settled',
    yesPrice: outcomePrice * 100,
    noPrice: (1 - outcomePrice) * 100,
    createdTime: new Date().toISOString(), // Polymarket doesn't provide created time
  };
};

// Helper to map Kalshi categories to our categories
const mapKalshiCategory = (category: string): 'sports' | 'entertainment' | 'other' => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('sport')) return 'sports';
  if (lowerCategory.includes('entertainment') || lowerCategory.includes('entertain')) return 'entertainment';
  return 'other';
};

// Helper to map Kalshi status to our status
const mapKalshiStatus = (status: string): 'open' | 'closed' | 'settled' => {
  const lowerStatus = status.toLowerCase();
  if (lowerStatus === 'active' || lowerStatus === 'open') return 'open';
  if (lowerStatus === 'closed') return 'closed';
  return 'settled';
};
