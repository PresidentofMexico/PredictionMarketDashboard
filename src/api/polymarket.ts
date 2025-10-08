import axios from 'axios';
import { PolymarketMarket } from '../types/markets';
import { mockPolymarketMarkets } from '../data/mockData';

// Use proxy server in development
const GAMMA_API = import.meta.env.DEV 
  ? 'http://localhost:3001/api/polymarket' 
  : 'https://gamma-api.polymarket.com';

// Flag to use mock data (set to true in demo/offline mode)
const USE_MOCK_DATA = true;

/**
 * Polymarket API Client
 * Uses the public CLOB (Central Limit Order Book) API
 * Documentation: https://docs.polymarket.com/
 */
export class PolymarketAPI {
  private gammaURL: string;

  constructor() {
    this.gammaURL = GAMMA_API;
  }

  /**
   * Get all active markets
   * @param limit - Number of markets to return
   * @param offset - Offset for pagination
   */
  async getMarkets(limit: number = 100, offset: number = 0): Promise<PolymarketMarket[]> {
    // Return mock data if enabled
    if (USE_MOCK_DATA) {
      return this.parseMarkets(mockPolymarketMarkets);
    }

    try {
      // Using Gamma API for market data
      const response = await axios.get(`${this.gammaURL}/markets`, {
        params: {
          limit,
          offset,
          active: true,
        },
      });
      
      return this.parseMarkets(response.data);
    } catch (error) {
      console.error('Error fetching Polymarket markets:', error);
      // Return mock data as fallback
      return this.parseMarkets(mockPolymarketMarkets);
    }
  }

  /**
   * Get markets by category/tag
   */
  async getMarketsByTag(tag: string): Promise<PolymarketMarket[]> {
    try {
      const response = await axios.get(`${this.gammaURL}/markets`, {
        params: {
          tag: tag.toLowerCase(),
          limit: 100,
        },
      });
      
      return this.parseMarkets(response.data);
    } catch (error) {
      console.error('Error fetching Polymarket markets by tag:', error);
      return [];
    }
  }

  /**
   * Get sports and entertainment markets
   */
  async getSportsAndEntertainmentMarkets(): Promise<PolymarketMarket[]> {
    try {
      // Try multiple approaches to get sports/entertainment markets
      const allMarkets = await this.getMarkets(200);
      
      // Filter markets by common sports/entertainment keywords
      const keywords = [
        'sports', 'nfl', 'nba', 'mlb', 'nhl', 'soccer', 'football', 'basketball',
        'entertainment', 'movie', 'music', 'celebrity', 'oscar', 'grammy', 'emmy',
        'box office', 'album', 'film', 'actor', 'actress', 'artist', 'super bowl',
        'world series', 'finals', 'championship', 'awards'
      ];

      return allMarkets.filter(market => {
        const searchText = `${market.question} ${market.description || ''} ${market.tags?.join(' ') || ''}`.toLowerCase();
        return keywords.some(keyword => searchText.includes(keyword));
      });
    } catch (error) {
      console.error('Error fetching sports and entertainment markets:', error);
      return [];
    }
  }

  /**
   * Search markets by query
   */
  async searchMarkets(query: string): Promise<PolymarketMarket[]> {
    try {
      const allMarkets = await this.getMarkets(200);
      const lowerQuery = query.toLowerCase();
      
      return allMarkets.filter(market =>
        market.question?.toLowerCase().includes(lowerQuery) ||
        market.description?.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching Polymarket markets:', error);
      return [];
    }
  }

  /**
   * Parse and normalize market data
   */
  private parseMarkets(data: any): PolymarketMarket[] {
    if (!data) return [];
    
    // Handle both array and object with data property
    const markets = Array.isArray(data) ? data : (data.data || []);
    
    return markets.map((market: any) => ({
      id: market.id || market.condition_id,
      question: market.question || market.title,
      description: market.description,
      slug: market.slug,
      outcomes: market.outcomes || ['Yes', 'No'],
      outcomePrices: market.outcomePrices || market.prices || [],
      volume: market.volume,
      liquidity: market.liquidity,
      startDate: market.startDate || market.start_date_iso,
      endDate: market.endDate || market.end_date_iso,
      category: market.category,
      tags: market.tags || [],
      active: market.active !== false,
      closed: market.closed || false,
      outcomeA: market.outcomes?.[0] || 'Yes',
      outcomeB: market.outcomes?.[1] || 'No',
      priceA: parseFloat(market.outcomePrices?.[0] || market.prices?.[0] || '0.5'),
      priceB: parseFloat(market.outcomePrices?.[1] || market.prices?.[1] || '0.5'),
    }));
  }
}

export const polymarketAPI = new PolymarketAPI();
