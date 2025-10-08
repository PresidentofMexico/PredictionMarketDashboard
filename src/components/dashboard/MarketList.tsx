import { useMemo, useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMarkets } from '../../hooks/useMarkets';
import { useMarketWebSocket } from '../../hooks/useMarketWebSocket';
import { useDashboardStore } from '../../store/dashboardStore';
import { MarketCard } from '../market/MarketCard';
import type { Market } from '../../types';

export const MarketList = () => {
  const { data: markets = [], isLoading, error, refetch } = useMarkets();
  const { filters, sort, setSelectedMarketId } = useDashboardStore();
  const parentRef = useRef<HTMLDivElement>(null);
  
  // Connect to WebSocket for real-time updates
  const { isConnected } = useMarketWebSocket();

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

  // Set up virtualization
  const rowVirtualizer = useVirtualizer({
    count: filteredAndSortedMarkets.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200, // Approximate height of each market card
    overscan: 5,
  });

  // Memoized callback for market click
  const handleMarketClick = useCallback(
    (market: Market) => {
      setSelectedMarketId(market.id);
    },
    [setSelectedMarketId]
  );

  if (isLoading) {
    return (
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} style={{ height: '200px', backgroundColor: '#f3f4f6', borderRadius: '8px' }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#EF4444' }}>
        <div>Error loading markets: {error.message}</div>
        <button onClick={() => refetch()} style={{ marginTop: '16px', padding: '8px 16px' }}>
          Retry
        </button>
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
    <div>
      {!isConnected && (
        <div style={{ padding: '8px 16px', backgroundColor: '#FEF3C7', color: '#92400E', borderRadius: '4px', marginBottom: '16px' }}>
          <span>Not connected to real-time updates</span>
        </div>
      )}
      
      <div
        ref={parentRef}
        style={{
          height: '800px',
          overflow: 'auto',
          padding: '16px',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const market = filteredAndSortedMarkets[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                  height: virtualRow.size,
                  padding: '0 8px',
                }}
              >
                <MarketCard market={market} onClick={handleMarketClick} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
