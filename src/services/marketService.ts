import type { Market } from '../types';
import { kalshiService } from './kalshi';
import { polymarketService } from './polymarket';

export class MarketService {
  async getAllMarkets(): Promise<Market[]> {
    try {
      const [kalshiMarkets, polymarketMarkets] = await Promise.all([
        kalshiService.getMarkets(),
        polymarketService.getMarkets(),
      ]);

      return [...kalshiMarkets, ...polymarketMarkets];
    } catch (error) {
      console.error('Error fetching all markets:', error);
      return [];
    }
  }

  async getMarketById(id: string, source: 'kalshi' | 'polymarket'): Promise<Market | null> {
    try {
      if (source === 'kalshi') {
        return await kalshiService.getMarket(id);
      } else {
        return await polymarketService.getMarket(id);
      }
    } catch (error) {
      console.error('Error fetching market by ID:', error);
      return null;
    }
  }

  async getMarketsBySource(source: 'kalshi' | 'polymarket'): Promise<Market[]> {
    try {
      if (source === 'kalshi') {
        return await kalshiService.getMarkets();
      } else {
        return await polymarketService.getMarkets();
      }
    } catch (error) {
      console.error('Error fetching markets by source:', error);
      return [];
    }
  }
}

export const marketService = new MarketService();
