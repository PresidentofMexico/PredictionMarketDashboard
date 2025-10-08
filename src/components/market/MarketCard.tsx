import { memo } from 'react';
import type { Market } from '../../types';
import { formatPercentage, formatLargeNumber, formatDate } from '../../utils/formatters';

interface MarketCardProps {
  market: Market;
  onClick?: (market: Market) => void;
}

const MarketCardComponent = ({ market, onClick }: MarketCardProps) => {
  const sourceColor = market.source === 'kalshi' ? '#00D4AA' : '#7C3AED';
  const statusColor =
    market.status === 'open' ? '#10B981' : market.status === 'closed' ? '#F59E0B' : '#6B7280';

  return (
    <div
      onClick={() => onClick?.(market)}
      className="market-card"
      style={{
        border: `1px solid ${sourceColor}20`,
        borderRadius: '8px',
        padding: '16px',
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: 'white',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
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
            color: statusColor,
            textTransform: 'capitalize',
          }}
        >
          {market.status}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '16px',
          fontWeight: '600',
          margin: '0 0 12px 0',
          color: '#111827',
          lineHeight: '1.4',
        }}
      >
        {market.title}
      </h3>

      {/* Price */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '28px', fontWeight: '700', color: '#111827' }}>
          {formatPercentage(market.lastPrice, 0)}
        </span>
        {market.yesPrice && market.noPrice && (
          <span style={{ fontSize: '14px', color: '#6B7280' }}>
            Yes: {formatPercentage(market.yesPrice, 0)} / No:{' '}
            {formatPercentage(market.noPrice, 0)}
          </span>
        )}
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          paddingTop: '12px',
          borderTop: '1px solid #E5E7EB',
        }}
      >
        <div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Volume</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
            ${formatLargeNumber(market.volume)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
            Close Date
          </div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
            {formatDate(market.closeTime)}
          </div>
        </div>
      </div>

      {/* Category Tag */}
      <div style={{ marginTop: '12px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: '#F3F4F6',
            color: '#374151',
            borderRadius: '4px',
            textTransform: 'capitalize',
          }}
        >
          {market.category}
        </span>
      </div>
    </div>
  );
};

// Memoized component - only re-renders when market or onClick changes
export const MarketCard = memo(MarketCardComponent);
