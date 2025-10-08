import { useMemo, useCallback } from 'react';
import { useMarkets } from '../../hooks/useMarkets';
import { useDashboardStore } from '../../store/dashboardStore';
import { MarketCard } from '../market/MarketCard';
import type { Market } from '../../types';

export const MarketList = () => {
  const { data: markets, isLoading, error } = useMarkets();
  const { filters, sort, setSelectedMarketId } = useDashboardStore();

  // Filter and sort markets with memoization
  const filteredAndSortedMarkets = useMemo(() => {
    if (!markets) return [];

    let result = [...markets];

    // Apply filters
    if (filters.source && filters.source !== 'all') {
      result = result.filter((m) => m.source === filters.source);
    }

    if (filters.category && filters.category !== 'all') {
      result = result.filter((m) => m.category === filters.category);
    }

    if (filters.status && filters.status !== 'all') {
      result = result.filter((m) => m.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(searchLower) ||
          m.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sort.field) {
        case 'volume':
          aValue = a.volume;
          bValue = b.volume;
          break;
        case 'price':
          aValue = a.lastPrice;
          bValue = b.lastPrice;
          break;
        case 'closeTime':
          aValue = new Date(a.closeTime).getTime();
          bValue = new Date(b.closeTime).getTime();
          break;
        case 'createdTime':
          aValue = new Date(a.createdTime).getTime();
          bValue = new Date(b.createdTime).getTime();
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return result;
  }, [markets, filters, sort]);

  // Memoized callback for market click
  const handleMarketClick = useCallback(
    (market: Market) => {
      setSelectedMarketId(market.id);
    },
    [setSelectedMarketId]
  );

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
        Loading markets...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#EF4444' }}>
        Error loading markets: {error.message}
      </div>
    );
  }

  if (filteredAndSortedMarkets.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
        No markets found matching your filters.
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '16px',
        padding: '16px',
      }}
    >
      {filteredAndSortedMarkets.map((market) => (
        <MarketCard key={`${market.source}-${market.id}`} market={market} onClick={handleMarketClick} />
      ))}
    </div>
  );
};
