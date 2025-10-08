import { useQuery } from '@tanstack/react-query';
import { marketService } from '../services/marketService';
import type { Market } from '../types';

export const useMarkets = () => {
  return useQuery<Market[]>({
    queryKey: ['markets'],
    queryFn: () => marketService.getAllMarkets(),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useMarket = (id: string, source: 'kalshi' | 'polymarket') => {
  return useQuery<Market | null>({
    queryKey: ['market', id, source],
    queryFn: () => marketService.getMarketById(id, source),
    enabled: !!id,
    staleTime: 30000,
  });
};

export const useMarketsBySource = (source: 'kalshi' | 'polymarket') => {
  return useQuery<Market[]>({
    queryKey: ['markets', source],
    queryFn: () => marketService.getMarketsBySource(source),
    staleTime: 30000,
    refetchInterval: 60000,
  });
};
