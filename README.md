# PredictionMarketDashboard

A modern, real-time dashboard for tracking sports and entertainment prediction markets from Kalshi and Polymarket.

![Dashboard Preview](https://github.com/user-attachments/assets/a295fb6e-4b94-4bea-8030-8d2726b708bf)

## Features

- **Multi-Source Integration**: Aggregate data from both Kalshi and Polymarket
- **Real-Time Updates**: WebSocket integration for live market data
- **Advanced Filtering**: Filter by source, category, status, or search text
- **Flexible Sorting**: Sort by volume, price, close time, or created time
- **Market Details**: View detailed market information with price charts and order books
- **Performance Optimized**: Memoization, throttling, and efficient rendering
- **Type-Safe**: Full TypeScript coverage with comprehensive type definitions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/PresidentofMexico/PredictionMarketDashboard.git
cd PredictionMarketDashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
# Run linter
npm run lint

# Run type checking
npm run type-check

# Preview production build
npm run preview
```

## Architecture

### Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: React Query + Zustand
- **Styling**: Inline styles (ready for migration to CSS modules/Tailwind)
- **Charts**: Lightweight Charts (prepared for integration)

### Project Structure

```
src/
├── components/
│   ├── dashboard/       # Dashboard layout and controls
│   └── market/          # Market-specific components
├── hooks/               # Custom React hooks
├── services/            # API integration layer
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

### Key Components

#### Services Layer
- **marketService.ts**: Unified interface for both APIs
- **kalshi.ts**: Kalshi API integration
- **polymarket.ts**: Polymarket API integration
- **normalization.ts**: Normalize responses across platforms

#### State Management
- **React Query**: Server state, caching, and refetching
- **Zustand Store**: UI state (filters, sorting, selection)
- **WebSocket Hooks**: Real-time data with throttling

#### Performance
- React.memo for component memoization
- useCallback for event handler optimization
- useMemo for expensive computations
- Throttled WebSocket messages (10/second)
- Debounced search inputs

## API Integration

Currently using mock data. To integrate real APIs:

### 1. Configure Environment Variables

Create `.env.local`:

```env
VITE_KALSHI_API_KEY=your_kalshi_key
VITE_KALSHI_API_URL=https://api.kalshi.com/trade-api/v2
VITE_POLYMARKET_API_URL=https://gamma-api.polymarket.com
VITE_WEBSOCKET_URL=wss://your-websocket-url
```

### 2. Update Service Files

Update `src/services/kalshi.ts` and `src/services/polymarket.ts` with real API calls.

### 3. Configure WebSocket

Update WebSocket URLs in your components that use `useWebSocket`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Roadmap

- [x] Project setup with Vite + React + TypeScript
- [x] API service layer for Kalshi and Polymarket
- [x] State management with React Query and Zustand
- [x] Dashboard UI with filtering and sorting
- [x] Market detail view with visualizations
- [x] Performance optimizations
- [ ] Real API integration
- [ ] Advanced charting with Lightweight Charts
- [ ] User authentication
- [ ] Portfolio tracking
- [ ] Price alerts and notifications
- [ ] Historical data analysis

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)
- State management by [React Query](https://tanstack.com/query) and [Zustand](https://github.com/pmndrs/zustand)
