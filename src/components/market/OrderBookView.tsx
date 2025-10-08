import type { OrderBook } from '../../types';
import { formatPercentage } from '../../utils/formatters';

interface OrderBookProps {
  orderBook: OrderBook;
}

export const OrderBookView = ({ orderBook }: OrderBookProps) => {
  const maxSize = Math.max(
    ...orderBook.bids.map((b) => b.size),
    ...orderBook.asks.map((a) => a.size)
  );

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {/* Bids (Buy orders) */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#10B981',
          }}
        >
          Bids (Buy)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {orderBook.bids.slice(0, 10).map((bid, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '4px 8px',
                fontSize: '12px',
              }}
            >
              {/* Background bar */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${(bid.size / maxSize) * 100}%`,
                  backgroundColor: '#10B98120',
                  zIndex: 0,
                }}
              />
              {/* Content */}
              <span style={{ position: 'relative', zIndex: 1, color: '#10B981', fontWeight: '600' }}>
                {formatPercentage(bid.price, 2)}
              </span>
              <span style={{ position: 'relative', zIndex: 1, color: '#6B7280' }}>
                {bid.size.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Asks (Sell orders) */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#EF4444',
          }}
        >
          Asks (Sell)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {orderBook.asks.slice(0, 10).map((ask, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '4px 8px',
                fontSize: '12px',
              }}
            >
              {/* Background bar */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${(ask.size / maxSize) * 100}%`,
                  backgroundColor: '#EF444420',
                  zIndex: 0,
                }}
              />
              {/* Content */}
              <span style={{ position: 'relative', zIndex: 1, color: '#EF4444', fontWeight: '600' }}>
                {formatPercentage(ask.price, 2)}
              </span>
              <span style={{ position: 'relative', zIndex: 1, color: '#6B7280' }}>
                {ask.size.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
