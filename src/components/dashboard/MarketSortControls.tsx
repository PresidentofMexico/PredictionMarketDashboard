import { useDashboardStore } from '../../store/dashboardStore';
import type { SortField, SortDirection } from '../../types';

export const MarketSortControls = () => {
  const { sort, setSort } = useDashboardStore();

  const handleSortFieldChange = (field: SortField) => {
    setSort({ ...sort, field });
  };

  const handleSortDirectionToggle = () => {
    const newDirection: SortDirection = sort.direction === 'asc' ? 'desc' : 'asc';
    setSort({ ...sort, direction: newDirection });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
      }}
    >
      <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Sort by:</span>

      <select
        value={sort.field}
        onChange={(e) => handleSortFieldChange(e.target.value as SortField)}
        style={{
          padding: '8px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: 'white',
        }}
      >
        <option value="volume">Volume</option>
        <option value="price">Price</option>
        <option value="closeTime">Close Time</option>
        <option value="createdTime">Created Time</option>
      </select>

      <button
        onClick={handleSortDirectionToggle}
        style={{
          padding: '8px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#F9FAFB';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
        }}
      >
        {sort.direction === 'asc' ? '↑ Ascending' : '↓ Descending'}
      </button>
    </div>
  );
};
