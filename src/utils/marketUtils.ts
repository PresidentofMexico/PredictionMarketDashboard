import { KalshiMarket } from '../types/markets';
import { PolymarketMarket } from '../types/markets';
import { UnifiedMarket } from '../types/markets';

/**
 * Convert Kalshi market to unified format
 */
export function normalizeKalshiMarket(market: KalshiMarket): UnifiedMarket {
  const yesPrice = market.yes_ask || market.last_price || 0.5;
  const noPrice = market.no_ask || (1 - yesPrice);

  return {
    id: `kalshi-${market.ticker || market.market_ticker}`,
    source: 'kalshi',
    title: market.title,
    description: market.subtitle,
    category: market.category,
    yesPrice: yesPrice,
    noPrice: noPrice,
    volume: market.volume,
    endDate: market.close_time || market.expected_expiration_time,
    status: market.status,
    tags: market.tags,
  };
}

/**
 * Convert Polymarket market to unified format
 */
export function normalizePolymarketMarket(market: PolymarketMarket): UnifiedMarket {
  const yesPrice = market.priceA || parseFloat(market.outcomePrices?.[0] || '0.5');
  const noPrice = market.priceB || parseFloat(market.outcomePrices?.[1] || '0.5');

  return {
    id: `polymarket-${market.id}`,
    source: 'polymarket',
    title: market.question,
    description: market.description,
    category: market.category,
    yesPrice: yesPrice,
    noPrice: noPrice,
    volume: parseFloat(market.volume || '0'),
    liquidity: parseFloat(market.liquidity || '0'),
    endDate: market.endDate,
    status: market.active ? 'open' : 'closed',
    outcomes: market.outcomes,
    tags: market.tags,
  };
}

/**
 * Format price as percentage
 */
export function formatPrice(price: number): string {
  return `${(price * 100).toFixed(1)}%`;
}

/**
 * Format volume/liquidity with K/M suffix
 */
export function formatVolume(volume: number | undefined): string {
  if (!volume) return 'N/A';
  
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(2)}M`;
  } else if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`;
  } else {
    return `$${volume.toFixed(0)}`;
  }
}

/**
 * Format date string
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'N/A';
  }
}

/**
 * Calculate implied probability difference (edge)
 */
export function calculateEdge(yesPrice: number, noPrice: number): number {
  return Math.abs((yesPrice + noPrice) - 1);
}

/**
 * Sort markets by different criteria
 */
export function sortMarkets(
  markets: UnifiedMarket[],
  sortBy: 'volume' | 'yesPrice' | 'endDate' | 'edge'
): UnifiedMarket[] {
  return [...markets].sort((a, b) => {
    switch (sortBy) {
      case 'volume':
        return (b.volume || 0) - (a.volume || 0);
      case 'yesPrice':
        return b.yesPrice - a.yesPrice;
      case 'endDate':
        if (!a.endDate) return 1;
        if (!b.endDate) return -1;
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case 'edge':
        return calculateEdge(b.yesPrice, b.noPrice) - calculateEdge(a.yesPrice, a.noPrice);
      default:
        return 0;
    }
  });
}
