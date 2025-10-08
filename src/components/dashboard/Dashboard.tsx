import { useDashboardStore } from '../../store/dashboardStore';
import { MarketFilters } from './MarketFilters';
import { MarketSortControls } from './MarketSortControls';
import { MarketList } from './MarketList';
import { MarketDetail } from '../market/MarketDetail';

export const Dashboard = () => {
  const { selectedMarketId } = useDashboardStore();

  // Show market detail if a market is selected
  if (selectedMarketId) {
    return <MarketDetail />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F9FAFB',
        padding: '24px',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            margin: '0 0 8px 0',
          }}
        >
          Prediction Market Dashboard
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
          Track sports and entertainment prediction markets from Kalshi and Polymarket
        </p>
      </header>

      {/* Filters and Sorting */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        <MarketFilters />
        <MarketSortControls />
      </div>

      {/* Market List */}
      <MarketList />
    </div>
  );
};
