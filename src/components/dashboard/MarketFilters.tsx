import { useDashboardStore } from '../../store/dashboardStore';

export const MarketFilters = () => {
  const { filters, setFilters, resetFilters } = useDashboardStore();

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
      }}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Search markets..."
        value={filters.search || ''}
        onChange={(e) => handleFilterChange('search', e.target.value)}
        style={{
          flex: '1 1 300px',
          padding: '8px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          fontSize: '14px',
        }}
      />

      {/* Source Filter */}
      <select
        value={filters.source || 'all'}
        onChange={(e) => handleFilterChange('source', e.target.value)}
        style={{
          padding: '8px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: 'white',
        }}
      >
        <option value="all">All Sources</option>
        <option value="kalshi">Kalshi</option>
        <option value="polymarket">Polymarket</option>
      </select>

      {/* Category Filter */}
      <select
        value={filters.category || 'all'}
        onChange={(e) => handleFilterChange('category', e.target.value)}
        style={{
          padding: '8px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: 'white',
        }}
      >
        <option value="all">All Categories</option>
        <option value="sports">Sports</option>
        <option value="entertainment">Entertainment</option>
        <option value="other">Other</option>
      </select>

      {/* Status Filter */}
      <select
        value={filters.status || 'all'}
        onChange={(e) => handleFilterChange('status', e.target.value)}
        style={{
          padding: '8px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: 'white',
        }}
      >
        <option value="all">All Status</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="settled">Settled</option>
      </select>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        style={{
          padding: '8px 16px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: 'white',
          cursor: 'pointer',
          fontWeight: '500',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#F9FAFB';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
        }}
      >
        Reset
      </button>
    </div>
  );
};
