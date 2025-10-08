import { useState, useEffect } from 'react';
import { kalshiAPI } from './api/kalshi';
import { polymarketAPI } from './api/polymarket';
import { UnifiedMarket, DashboardFilters } from './types/markets';
import { normalizeKalshiMarket, normalizePolymarketMarket, sortMarkets } from './utils/marketUtils';
import MarketCard from './components/MarketCard';
import Filters from './components/Filters';
import './App.css';

function App() {
  const [markets, setMarkets] = useState<UnifiedMarket[]>([]);
  const [filteredMarkets, setFilteredMarkets] = useState<UnifiedMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DashboardFilters>({
    source: 'all',
    category: '',
    search: '',
  });
  const [sortBy, setSortBy] = useState<'volume' | 'yesPrice' | 'endDate' | 'edge'>('volume');

  // Fetch markets on component mount
  useEffect(() => {
    fetchMarkets();
  }, []);

  // Apply filters whenever markets or filters change
  useEffect(() => {
    applyFilters();
  }, [markets, filters, sortBy]);

  const fetchMarkets = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch from both APIs in parallel
      const [kalshiMarkets, polymarketMarkets] = await Promise.all([
        kalshiAPI.getSportsAndEntertainmentMarkets(),
        polymarketAPI.getSportsAndEntertainmentMarkets(),
      ]);

      // Normalize markets to unified format
      const normalizedKalshi = kalshiMarkets.map(normalizeKalshiMarket);
      const normalizedPolymarket = polymarketMarkets.map(normalizePolymarketMarket);

      // Combine all markets
      const allMarkets = [...normalizedKalshi, ...normalizedPolymarket];
      setMarkets(allMarkets);
    } catch (err) {
      console.error('Error fetching markets:', err);
      setError('Failed to fetch markets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...markets];

    // Filter by source
    if (filters.source && filters.source !== 'all') {
      filtered = filtered.filter(m => m.source === filters.source);
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(m => 
        m.category?.toLowerCase().includes(filters.category!.toLowerCase()) ||
        m.tags?.some(tag => tag.toLowerCase().includes(filters.category!.toLowerCase())) ||
        m.title.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    // Filter by search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(searchLower) ||
        m.description?.toLowerCase().includes(searchLower)
      );
    }

    // Sort markets
    const sorted = sortMarkets(filtered, sortBy);
    setFilteredMarkets(sorted);
  };

  const handleRefresh = () => {
    fetchMarkets();
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🎯 Prediction Market Dashboard</h1>
          <p className="subtitle">Sports & Entertainment Investment Analysis</p>
        </div>
        <button onClick={handleRefresh} className="refresh-button" disabled={loading}>
          {loading ? '⟳ Loading...' : '↻ Refresh'}
        </button>
      </header>

      <main className="app-main">
        <Filters filters={filters} onFilterChange={setFilters} />

        <div className="controls">
          <div className="sort-controls">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="sort-select"
            >
              <option value="volume">Volume</option>
              <option value="yesPrice">Yes Price</option>
              <option value="endDate">End Date</option>
              <option value="edge">Edge</option>
            </select>
          </div>
          <div className="market-count">
            Showing {filteredMarkets.length} of {markets.length} markets
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading markets from Kalshi and Polymarket...</p>
          </div>
        ) : filteredMarkets.length === 0 ? (
          <div className="no-markets">
            <p>No markets found matching your criteria.</p>
            <button onClick={handleRefresh} className="retry-button">
              Try Again
            </button>
          </div>
        ) : (
          <div className="markets-grid">
            {filteredMarkets.map(market => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Data from <strong>Kalshi</strong> and <strong>Polymarket</strong> APIs
        </p>
        <p className="disclaimer">
          This dashboard is for informational purposes only. Always do your own research before investing.
        </p>
      </footer>
    </div>
  );
}

export default App;
