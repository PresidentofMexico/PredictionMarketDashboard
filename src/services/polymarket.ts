import type { Market, PolymarketMarket } from '../types';
import { normalizePolymarketMarket } from './normalization';
import { POLYMARKET_CONFIG, shouldUseMockData, getPolymarketHeaders } from '../config/api';

export class PolymarketService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = POLYMARKET_CONFIG.apiUrl;
  }

  async getMarkets(_params?: {
    limit?: number;
    offset?: number;
    active?: boolean;
    closed?: boolean;
  }): Promise<Market[]> {
    try {
      // Use mock data in development mode
      if (shouldUseMockData()) {
        return this.getMockMarkets();
      }
      
      // Real API implementation
      const queryParams = new URLSearchParams();
      if (_params?.limit) queryParams.set('limit', _params.limit.toString());
      if (_params?.offset) queryParams.set('offset', _params.offset.toString());
      if (_params?.active !== undefined) queryParams.set('active', _params.active.toString());
      
      const headers = getPolymarketHeaders();
      const response = await fetch(`${this.baseUrl}/markets?${queryParams}`, {
        headers,
      });
      
      if (!response.ok) {
        throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data.map(normalizePolymarketMarket) : [];
    } catch (error) {
      console.error('Error fetching Polymarket markets:', error);
      // Fallback to mock data on error
      return this.getMockMarkets();
    }
  }

  async getMarket(id: string): Promise<Market | null> {
    try {
      // Use mock data in development mode
      if (shouldUseMockData()) {
        const markets = this.getMockMarkets();
        return markets.find((m) => m.id === id) || null;
      }
      
      // Real API implementation
      const headers = getPolymarketHeaders();
      const response = await fetch(`${this.baseUrl}/markets/${id}`, {
        headers,
      });
      
      if (!response.ok) {
        throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return normalizePolymarketMarket(data);
    } catch (error) {
      console.error('Error fetching Polymarket market:', error);
      // Fallback to mock data on error
      const markets = this.getMockMarkets();
      return markets.find((m) => m.id === id) || null;
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
