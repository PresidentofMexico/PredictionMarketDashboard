import axios from 'axios';
import { KalshiMarket, KalshiResponse } from '../types/markets';

const KALSHI_API_BASE = 'https://api.elections.kalshi.com/trade-api/v2';

/**
 * Kalshi API Client
 * Documentation: https://trading-api.readme.io/reference/getting-started
 */
export class KalshiAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = KALSHI_API_BASE;
  }

  /**
   * Get all available markets
   * @param limit - Number of markets to return (default: 100)
   * @param cursor - Pagination cursor
   * @param status - Filter by status (open, closed, settled)
   */
  async getMarkets(
    limit: number = 100,
    cursor?: string,
    status: string = 'open'
  ): Promise<KalshiResponse> {
    try {
      const params: any = { limit, status };
      if (cursor) params.cursor = cursor;

      const response = await axios.get(`${this.baseURL}/markets`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Kalshi markets:', error);
      throw error;
    }
  }

  /**
   * Get markets by category
   * @param category - Category to filter by (e.g., 'sports', 'entertainment')
   */
  async getMarketsByCategory(category: string): Promise<KalshiMarket[]> {
    try {
      const response = await this.getMarkets(200);
      const markets = response.markets || [];
      
      // Filter markets by category or tags
      return markets.filter(market => 
        market.category?.toLowerCase().includes(category.toLowerCase()) ||
        market.tags?.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
      );
    } catch (error) {
      console.error('Error fetching Kalshi markets by category:', error);
      throw error;
    }
  }

  /**
   * Get events (which contain multiple markets)
   */
  async getEvents(limit: number = 100): Promise<KalshiResponse> {
    try {
      const response = await axios.get(`${this.baseURL}/events`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Kalshi events:', error);
      throw error;
    }
  }

  /**
   * Get sports and entertainment markets
   */
  async getSportsAndEntertainmentMarkets(): Promise<KalshiMarket[]> {
    try {
      const [sportsMarkets, entertainmentMarkets] = await Promise.all([
        this.getMarketsByCategory('sports'),
        this.getMarketsByCategory('entertainment'),
      ]);

      return [...sportsMarkets, ...entertainmentMarkets];
    } catch (error) {
      console.error('Error fetching sports and entertainment markets:', error);
      return [];
    }
  }

  /**
   * Search markets by query
   */
  async searchMarkets(query: string): Promise<KalshiMarket[]> {
    try {
      const response = await this.getMarkets(200);
      const markets = response.markets || [];
      
      const lowerQuery = query.toLowerCase();
      return markets.filter(market =>
        market.title?.toLowerCase().includes(lowerQuery) ||
        market.subtitle?.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching Kalshi markets:', error);
      return [];
    }
  }
}

export const kalshiAPI = new KalshiAPI();
