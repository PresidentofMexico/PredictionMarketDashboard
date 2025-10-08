# PredictionMarketDashboard

A modern web dashboard that connects to Kalshi and Polymarket prediction market APIs to help analyze and make better investment decisions in the Sports & Entertainment space.

## Features

- 🔄 **Real-time Data**: Fetches live market data from both Kalshi and Polymarket APIs
- 🎯 **Sports & Entertainment Focus**: Filters markets specifically for sports and entertainment categories
- 📊 **Unified Dashboard**: View markets from both platforms in a single, clean interface
- 🔍 **Advanced Filtering**: Search, filter by source, and sort markets by various criteria
- 💰 **Investment Insights**: Shows prices, volume, liquidity, and edge calculations
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3
- **APIs**: Axios for HTTP requests
- **Data Sources**: Kalshi & Polymarket public APIs

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- VS Code (recommended)
- Postman (optional, for API testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PresidentofMexico/PredictionMarketDashboard.git
cd PredictionMarketDashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## API Documentation

### Kalshi API

The dashboard uses Kalshi's public trading API (v2):
- **Base URL**: `https://api.elections.kalshi.com/trade-api/v2`
- **Documentation**: https://trading-api.readme.io/reference/getting-started
- **No authentication required** for public market data

### Polymarket API

The dashboard uses Polymarket's public APIs:
- **CLOB API**: `https://clob.polymarket.com`
- **Gamma API**: `https://gamma-api.polymarket.com`
- **Documentation**: https://docs.polymarket.com/
- **No authentication required** for public market data

## Project Structure

```
PredictionMarketDashboard/
├── src/
│   ├── api/                 # API integration modules
│   │   ├── kalshi.ts       # Kalshi API client
│   │   └── polymarket.ts   # Polymarket API client
│   ├── components/          # React components
│   │   ├── MarketCard.tsx  # Individual market display
│   │   ├── Filters.tsx     # Filter controls
│   │   └── *.css           # Component styles
│   ├── types/              # TypeScript type definitions
│   │   └── markets.ts      # Market data types
│   ├── utils/              # Utility functions
│   │   └── marketUtils.ts  # Market data processing
│   ├── App.tsx             # Main application component
│   ├── App.css             # Global styles
│   └── main.tsx            # Application entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

## How It Works

1. **Data Fetching**: The app fetches market data from both Kalshi and Polymarket APIs in parallel
2. **Normalization**: Market data from both sources is normalized into a unified format
3. **Filtering**: Users can filter by source, category, and search terms
4. **Sorting**: Markets can be sorted by volume, price, end date, or edge
5. **Display**: Markets are shown in an easy-to-read card format with key metrics

## Key Metrics Explained

- **Yes/No Prices**: Probability-based prices for market outcomes (higher = more likely)
- **Volume**: Total trading volume in the market
- **Liquidity**: Available liquidity for trading
- **Edge**: Price inefficiency indicator (sum of Yes + No prices ≠ 1.0)
- **End Date**: When the market closes/resolves

## Testing with Postman

### Kalshi API Examples

Get markets:
```
GET https://api.elections.kalshi.com/trade-api/v2/markets?limit=10&status=open
```

Get events:
```
GET https://api.elections.kalshi.com/trade-api/v2/events?limit=10
```

### Polymarket API Examples

Get markets:
```
GET https://gamma-api.polymarket.com/markets?limit=10&active=true
```

## Investment Tips

1. **Compare Prices**: Look for the same event across both platforms for arbitrage opportunities
2. **Check Volume**: Higher volume markets tend to be more liquid and easier to trade
3. **Watch the Edge**: High edge (>5%) might indicate pricing inefficiencies
4. **End Dates**: Consider when markets close relative to the event timing
5. **Do Your Research**: Always verify market conditions before investing

## Troubleshooting

### API Errors
- Both APIs are public and don't require authentication
- If markets aren't loading, check your internet connection
- Some markets may be filtered if they don't match sports/entertainment criteria

### Build Issues
- Make sure you have Node.js 18+ installed
- Delete `node_modules` and run `npm install` again
- Clear your browser cache if styles aren't updating

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Disclaimer

This dashboard is for informational and educational purposes only. It does not constitute financial advice. Always do your own research and understand the risks before participating in prediction markets.

## License

ISC

## Resources

- [Kalshi Trading API Docs](https://trading-api.readme.io/reference/getting-started)
- [Polymarket API Docs](https://docs.polymarket.com/)
- [Prediction Markets Overview](https://en.wikipedia.org/wiki/Prediction_market)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
