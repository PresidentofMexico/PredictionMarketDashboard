import { useMemo } from 'react';
import { useMarket } from '../../hooks/useMarkets';
import { useDashboardStore } from '../../store/dashboardStore';
import { PriceChart } from './PriceChart';
import { OrderBookView } from './OrderBookView';
import { formatPercentage, formatLargeNumber, formatDate } from '../../utils/formatters';
import type { PricePoint, OrderBook } from '../../types';

export const MarketDetail = () => {
  const { selectedMarketId, setSelectedMarketId } = useDashboardStore();

  // For now, we'll determine the source from the market ID format
  // In a real app, you'd store this information when selecting a market
  const source = selectedMarketId?.includes('poly') ? 'polymarket' : 'kalshi';
  
  const { data: market, isLoading, error } = useMarket(
    selectedMarketId || '',
    source as 'kalshi' | 'polymarket'
  );

  // Generate mock price history data
  const priceHistory = useMemo((): PricePoint[] => {
    if (!market) return [];

    const now = Date.now() / 1000;
    const points: PricePoint[] = [];
    const numPoints = 30;

    for (let i = 0; i < numPoints; i++) {
      const time = now - (numPoints - i) * 3600; // Hourly data
      const variance = (Math.random() - 0.5) * 10;
      const value = Math.max(0, Math.min(100, market.lastPrice + variance));
      points.push({ time, value });
    }

    return points;
  }, [market]);

  // Generate mock order book data
  const orderBook = useMemo((): OrderBook => {
    if (!market) {
      return { bids: [], asks: [], timestamp: Date.now() };
    }

    const bids = Array.from({ length: 10 }, (_, i) => ({
      price: market.lastPrice - i - 1,
      size: Math.floor(Math.random() * 10000) + 1000,
    }));

    const asks = Array.from({ length: 10 }, (_, i) => ({
      price: market.lastPrice + i + 1,
      size: Math.floor(Math.random() * 10000) + 1000,
    }));

    return { bids, asks, timestamp: Date.now() };
  }, [market]);

  if (!selectedMarketId) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
        Select a market to view details
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
        Loading market details...
      </div>
    );
  }

  if (error || !market) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#EF4444' }}>
        Error loading market details
      </div>
    );
  }

  const sourceColor = market.source === 'kalshi' ? '#00D4AA' : '#7C3AED';

  return (
    <div style={{ padding: '24px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Back Button */}
      <button
        onClick={() => setSelectedMarketId(null)}
        style={{
          padding: '8px 16px',
          marginBottom: '24px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          backgroundColor: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        ← Back to Markets
      </button>

      {/* Header */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: sourceColor,
              textTransform: 'uppercase',
            }}
          >
            {market.source}
          </span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#6B7280',
              textTransform: 'capitalize',
            }}
          >
            {market.category}
          </span>
        </div>

        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '16px',
            color: '#111827',
          }}
        >
          {market.title}
        </h1>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
              Current Price
            </div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#111827' }}>
              {formatPercentage(market.lastPrice, 1)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Volume</div>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>
              ${formatLargeNumber(market.volume)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
              Close Date
            </div>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>
              {formatDate(market.closeTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
          Price History
        </h2>
        <PriceChart data={priceHistory} />
      </div>

      {/* Order Book */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
          Order Book
        </h2>
        <OrderBookView orderBook={orderBook} />
      </div>
    </div>
  );
};
