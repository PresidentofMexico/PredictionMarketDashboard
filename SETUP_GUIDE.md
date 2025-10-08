# Step-by-Step Setup Guide

This guide will walk you through setting up the Prediction Market Dashboard from scratch.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **VS Code** (recommended)
   - Download from: https://code.visualstudio.com/

3. **Git**
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

4. **Postman** (optional, for API testing)
   - Download from: https://www.postman.com/downloads/

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/PresidentofMexico/PredictionMarketDashboard.git
cd PredictionMarketDashboard
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 19
- TypeScript
- Vite
- Axios
- Type definitions

### 3. Open in VS Code

```bash
code .
```

Or open VS Code and select File → Open Folder → select the PredictionMarketDashboard folder.

### 4. Install Recommended Extensions

When you open the project in VS Code, you'll see a prompt to install recommended extensions. Click "Install All" to get:
- ESLint
- Prettier
- React snippets
- Path IntelliSense
- Error Lens

### 5. Start Development Server

In VS Code terminal (or your regular terminal):

```bash
npm run dev
```

The dashboard will open automatically at `http://localhost:3000`

### 6. Explore the Dashboard

Once running, you should see:
- Markets loading from both Kalshi and Polymarket
- Sports and Entertainment markets displayed
- Filter and sort controls
- Market cards with prices, volume, and other metrics

## Testing APIs with Postman

### Import the Collection

1. Open Postman
2. Click "Import" button
3. Select the `postman_collection.json` file from the project root
4. You'll see two folders: "Kalshi API" and "Polymarket API"

### Test Kalshi API

1. Select "Kalshi API → Get All Markets"
2. Click "Send"
3. You should see a JSON response with market data

Example response:
```json
{
  "markets": [
    {
      "ticker": "KXSPORT-23DEC31-B100",
      "title": "Will Team X win?",
      "yes_bid": 0.65,
      "yes_ask": 0.67,
      ...
    }
  ]
}
```

### Test Polymarket API

1. Select "Polymarket API → Get Markets (Gamma API)"
2. Click "Send"
3. You should see market data

Example response:
```json
{
  "data": [
    {
      "id": "12345",
      "question": "Will Player X score?",
      "outcomes": ["Yes", "No"],
      "outcomePrices": ["0.62", "0.38"],
      ...
    }
  ]
}
```

## Project Structure Explained

```
PredictionMarketDashboard/
│
├── src/
│   ├── api/                    # API Integration
│   │   ├── kalshi.ts          # Kalshi API client with methods
│   │   └── polymarket.ts      # Polymarket API client
│   │
│   ├── components/             # React Components
│   │   ├── MarketCard.tsx     # Displays individual market
│   │   ├── MarketCard.css     # Market card styles
│   │   ├── Filters.tsx        # Filter controls
│   │   └── Filters.css        # Filter styles
│   │
│   ├── types/                  # TypeScript Types
│   │   └── markets.ts         # Type definitions for markets
│   │
│   ├── utils/                  # Utility Functions
│   │   └── marketUtils.ts     # Helper functions for data
│   │
│   ├── App.tsx                # Main application component
│   ├── App.css                # Global styles
│   └── main.tsx               # Entry point
│
├── index.html                  # HTML template
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies & scripts
├── postman_collection.json    # Postman API collection
└── README.md                  # Main documentation
```

## Understanding the Code

### API Integration (`src/api/`)

**kalshi.ts**: 
- Connects to Kalshi's public API
- Methods: `getMarkets()`, `getMarketsByCategory()`, `getSportsAndEntertainmentMarkets()`
- No authentication needed for public data

**polymarket.ts**:
- Connects to Polymarket's Gamma API
- Similar methods to Kalshi client
- Handles data normalization

### Components (`src/components/`)

**MarketCard.tsx**:
- Displays individual market information
- Shows YES/NO prices
- Displays volume, liquidity, end date
- Highlights markets with high edge

**Filters.tsx**:
- Search functionality
- Source filter (Kalshi/Polymarket/All)
- Category filter (Sports/Entertainment)

### Main App (`src/App.tsx`)

The main component that:
1. Fetches data from both APIs on load
2. Normalizes data to unified format
3. Applies filters and sorting
4. Renders the dashboard

## Development Workflow

### Making Changes

1. **Modify Code**: Edit files in `src/`
2. **Auto-Reload**: Vite automatically reloads the page
3. **Check Browser**: View changes at `http://localhost:3000`
4. **Debug**: Use browser DevTools (F12)

### Adding New Features

1. Create new components in `src/components/`
2. Add new API methods in `src/api/`
3. Update types in `src/types/markets.ts`
4. Import and use in `App.tsx`

### Building for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

## Common Tasks

### Filter by Specific Category

Add category to filters state:
```typescript
const [filters, setFilters] = useState({
  source: 'all',
  category: 'sports',  // or 'entertainment'
  search: ''
});
```

### Change Number of Markets Loaded

In `src/api/kalshi.ts` or `src/api/polymarket.ts`, modify the limit:
```typescript
await this.getMarkets(500);  // Load 500 markets instead of 100
```

### Add New Market Source

1. Create new API client in `src/api/newsource.ts`
2. Add types in `src/types/markets.ts`
3. Create normalization function in `src/utils/marketUtils.ts`
4. Update `App.tsx` to fetch from new source

## Troubleshooting

### Markets Not Loading

1. Check browser console (F12) for errors
2. Test APIs directly in Postman
3. Check internet connection
4. Verify API endpoints are accessible

### TypeScript Errors

1. Make sure all dependencies are installed: `npm install`
2. Restart VS Code TypeScript server: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

### Build Errors

1. Delete `node_modules`: `rm -rf node_modules`
2. Delete `package-lock.json`: `rm package-lock.json`
3. Reinstall: `npm install`
4. Try building again: `npm run build`

### Styles Not Updating

1. Clear browser cache (Ctrl + Shift + R)
2. Stop dev server (Ctrl + C)
3. Restart: `npm run dev`

## API Rate Limits

Both APIs are public but may have rate limits:

- **Kalshi**: No documented public rate limit for market data
- **Polymarket**: No documented public rate limit for market data

If you hit limits:
1. Reduce fetch frequency
2. Cache responses
3. Implement request throttling

## Next Steps

Now that you have the dashboard running:

1. **Explore Markets**: Browse different sports and entertainment markets
2. **Compare Prices**: Look for arbitrage opportunities between platforms
3. **Track Favorites**: Add functionality to save favorite markets
4. **Add Alerts**: Implement price change notifications
5. **Historical Data**: Add charts showing price movements over time

## Resources

- [Kalshi API Docs](https://trading-api.readme.io/)
- [Polymarket Docs](https://docs.polymarket.com/)
- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

## Getting Help

- Check the README.md for detailed documentation
- Review API documentation for Kalshi and Polymarket
- Open an issue on GitHub for bugs
- Check browser console for error messages

Happy trading! 🎯📊
