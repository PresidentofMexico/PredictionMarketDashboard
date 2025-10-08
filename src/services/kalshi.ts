import type { Market, KalshiMarket } from '../types';
import { normalizeKalshiMarket } from './normalization';

// const KALSHI_API_BASE = 'https://api.kalshi.com/trade-api/v2';
// Will be used when real API integration is added

// Note: In a production app, you would use proper authentication
// This is a simplified version for demonstration
export class KalshiService {
  // private baseUrl: string;
  // Will be used when real API integration is added

  constructor() {
    // this.baseUrl = KALSHI_API_BASE;
  }

  async getMarkets(_params?: {
    limit?: number;
    cursor?: string;
    event_ticker?: string;
    series_ticker?: string;
    status?: string;
  }): Promise<Market[]> {
    try {
      // Mock data for demonstration since we don't have API keys
      return this.getMockMarkets();
      
      // Real implementation would be:
      // const queryParams = new URLSearchParams();
      // if (params?.limit) queryParams.set('limit', params.limit.toString());
      // if (params?.cursor) queryParams.set('cursor', params.cursor);
      // if (params?.status) queryParams.set('status', params.status);
      
      // const response = await fetch(`${this.baseUrl}/markets?${queryParams}`);
      // const data = await response.json();
      // return data.markets.map(normalizeKalshiMarket);
    } catch (error) {
      console.error('Error fetching Kalshi markets:', error);
      return [];
    }
  }

  async getMarket(ticker: string): Promise<Market | null> {
    try {
      // Mock implementation
      const markets = await this.getMockMarkets();
      return markets.find((m) => m.id === ticker) || null;
      
      // Real implementation:
      // const response = await fetch(`${this.baseUrl}/markets/${ticker}`);
      // const data = await response.json();
      // return normalizeKalshiMarket(data.market);
    } catch (error) {
      console.error('Error fetching Kalshi market:', error);
      return null;
    }
  }

  // Mock data for demonstration
  private getMockMarkets(): Market[] {
    const mockKalshiData: KalshiMarket[] = [
      {
        ticker: 'KALSHI-NFL-CHIEFS-WIN',
        title: 'Will the Kansas City Chiefs win Super Bowl 2024?',
        category: 'Sports',
        close_time: '2024-12-31T23:59:59Z',
        status: 'active',
        yes_bid: 65,
        yes_ask: 67,
        volume: 150000,
        open_interest: 50000,
        liquidity_pool: 200000,
      },
      {
        ticker: 'KALSHI-NBA-LEBRON-RETIRE',
        title: 'Will LeBron James retire this season?',
        category: 'Sports',
        close_time: '2024-06-30T23:59:59Z',
        status: 'active',
        yes_bid: 15,
        yes_ask: 18,
        volume: 80000,
        open_interest: 30000,
      },
      {
        ticker: 'KALSHI-ENT-OSCARS-OPPENHEIMER',
        title: 'Will Oppenheimer win Best Picture at Oscars 2024?',
        category: 'Entertainment',
        close_time: '2024-03-10T23:59:59Z',
        status: 'closed',
        yes_bid: 85,
        yes_ask: 87,
        volume: 250000,
        open_interest: 100000,
      },
    ];

    return mockKalshiData.map(normalizeKalshiMarket);
  }
}

export const kalshiService = new KalshiService();
