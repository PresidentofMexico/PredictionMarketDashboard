import type { Market, PolymarketMarket } from '../types';
import { normalizePolymarketMarket } from './normalization';

// const POLYMARKET_API_BASE = 'https://gamma-api.polymarket.com';
// Will be used when real API integration is added

export class PolymarketService {
  // private baseUrl: string;
  // Will be used when real API integration is added

  constructor() {
    // this.baseUrl = POLYMARKET_API_BASE;
  }

  async getMarkets(_params?: {
    limit?: number;
    offset?: number;
    active?: boolean;
    closed?: boolean;
  }): Promise<Market[]> {
    try {
      // Mock data for demonstration since we don't have API keys
      return this.getMockMarkets();
      
      // Real implementation would be:
      // const queryParams = new URLSearchParams();
      // if (params?.limit) queryParams.set('limit', params.limit.toString());
      // if (params?.offset) queryParams.set('offset', params.offset.toString());
      // if (params?.active !== undefined) queryParams.set('active', params.active.toString());
      
      // const response = await fetch(`${this.baseUrl}/markets?${queryParams}`);
      // const data = await response.json();
      // return data.map(normalizePolymarketMarket);
    } catch (error) {
      console.error('Error fetching Polymarket markets:', error);
      return [];
    }
  }

  async getMarket(id: string): Promise<Market | null> {
    try {
      // Mock implementation
      const markets = await this.getMockMarkets();
      return markets.find((m) => m.id === id) || null;
      
      // Real implementation:
      // const response = await fetch(`${this.baseUrl}/markets/${id}`);
      // const data = await response.json();
      // return normalizePolymarketMarket(data);
    } catch (error) {
      console.error('Error fetching Polymarket market:', error);
      return null;
    }
  }

  // Mock data for demonstration
  private getMockMarkets(): Market[] {
    const mockPolymarketData: PolymarketMarket[] = [
      {
        id: 'poly-taylor-swift-grammys',
        question: 'Will Taylor Swift win Album of the Year at the 2024 Grammys?',
        market: 'Taylor Swift - Album of the Year',
        end_date_iso: '2024-02-04T23:59:59Z',
        active: false,
        closed: true,
        volume: '500000',
        liquidity: '150000',
        outcome_prices: ['0.75', '0.25'],
      },
      {
        id: 'poly-world-cup-2026',
        question: 'Will the United States host the 2026 FIFA World Cup?',
        market: '2026 FIFA World Cup Host',
        end_date_iso: '2026-07-19T23:59:59Z',
        active: true,
        closed: false,
        volume: '1200000',
        liquidity: '400000',
        outcome_prices: ['0.92', '0.08'],
      },
      {
        id: 'poly-nba-finals-2024',
        question: 'Will the Boston Celtics win the 2024 NBA Finals?',
        market: 'NBA Finals 2024 Winner',
        end_date_iso: '2024-06-20T23:59:59Z',
        active: true,
        closed: false,
        volume: '800000',
        liquidity: '250000',
        outcome_prices: ['0.45', '0.55'],
      },
    ];

    return mockPolymarketData.map(normalizePolymarketMarket);
  }
}

export const polymarketService = new PolymarketService();
