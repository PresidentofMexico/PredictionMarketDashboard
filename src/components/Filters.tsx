import { DashboardFilters as FilterType } from '../types/markets';
import './Filters.css';

interface FiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
}

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ 
      ...filters, 
      source: e.target.value as 'kalshi' | 'polymarket' | 'all' 
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="search">Search Markets</label>
        <input
          id="search"
          type="text"
          placeholder="Search by title or description..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="source">Data Source</label>
        <select
          id="source"
          value={filters.source || 'all'}
          onChange={handleSourceChange}
          className="filter-select"
        >
          <option value="all">All Sources</option>
          <option value="kalshi">Kalshi Only</option>
          <option value="polymarket">Polymarket Only</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category || ''}
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
