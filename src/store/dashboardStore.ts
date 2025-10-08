import { create } from 'zustand';
import type { MarketFilters, MarketSort } from '../types';

interface DashboardState {
  // Filters
  filters: MarketFilters;
  setFilters: (filters: MarketFilters) => void;
  resetFilters: () => void;

  // Sorting
  sort: MarketSort;
  setSort: (sort: MarketSort) => void;

  // Selected market for detail view
  selectedMarketId: string | null;
  setSelectedMarketId: (id: string | null) => void;

  // UI state
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const defaultFilters: MarketFilters = {
  source: 'all',
  category: 'all',
  status: 'all',
  search: '',
};

const defaultSort: MarketSort = {
  field: 'volume',
  direction: 'desc',
};

export const useDashboardStore = create<DashboardState>((set) => ({
  // Filters
  filters: defaultFilters,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: defaultFilters }),

  // Sorting
  sort: defaultSort,
  setSort: (sort) => set({ sort }),

  // Selected market
  selectedMarketId: null,
  setSelectedMarketId: (selectedMarketId) => set({ selectedMarketId }),

  // UI state
  viewMode: 'grid',
  setViewMode: (viewMode) => set({ viewMode }),
}));
