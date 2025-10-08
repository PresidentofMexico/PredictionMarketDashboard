import type { Market, KalshiMarket } from '../types';
import { normalizeKalshiMarket } from './normalization';
import { KALSHI_CONFIG, shouldUseMockData, getKalshiAuthHeaders } from '../config/api';

export class KalshiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = KALSHI_CONFIG.apiUrl;
  }

  async getMarkets(_params?: {
    limit?: number;
    cursor?: string;
    event_ticker?: string;
    series_ticker?: string;
    status?: string;
  }): Promise<Market[]> {
    try {
      // Use mock data in development mode or if no API key is configured
      if (shouldUseMockData()) {
        return this.getMockMarkets();
      }
      
      // Real API implementation
      const queryParams = new URLSearchParams();
      if (_params?.limit) queryParams.set('limit', _params.limit.toString());
      if (_params?.cursor) queryParams.set('cursor', _params.cursor);
      if (_params?.status) queryParams.set('status', _params.status);
      
      const headers = await getKalshiAuthHeaders();
      const response = await fetch(`${this.baseUrl}/markets?${queryParams}`, {
        headers,
      });
      
      if (!response.ok) {
        throw new Error(`Kalshi API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.markets ? data.markets.map(normalizeKalshiMarket) : [];
    } catch (error) {
      console.error('Error fetching Kalshi markets:', error);
      // Fallback to mock data on error
      return this.getMockMarkets();
    }
  }

  async getMarket(ticker: string): Promise<Market | null> {
    try {
      // Use mock data in development mode or if no API key is configured
      if (shouldUseMockData()) {
        const markets = this.getMockMarkets();
        return markets.find((m) => m.id === ticker) || null;
      }
      
      // Real API implementation
      const headers = await getKalshiAuthHeaders();
      const response = await fetch(`${this.baseUrl}/markets/${ticker}`, {
        headers,
      });
      
      if (!response.ok) {
        throw new Error(`Kalshi API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.market ? normalizeKalshiMarket(data.market) : null;
    } catch (error) {
      console.error('Error fetching Kalshi market:', error);
      // Fallback to mock data on error
      const markets = this.getMockMarkets();
      return markets.find((m) => m.id === ticker) || null;
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
