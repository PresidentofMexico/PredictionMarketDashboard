# Quick Reference Card

## 🚀 Getting Started (5 Minutes)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   ```
   http://localhost:3000
   ```

## 📊 Dashboard Features

### Filters
- **Search**: Type keywords to find specific markets
- **Data Source**: Filter by Kalshi, Polymarket, or All
- **Category**: Filter by Sports or Entertainment

### Sorting Options
- **Volume**: Highest trading volume first
- **Yes Price**: Markets with highest YES price
- **End Date**: Soonest closing markets first  
- **Edge**: Highest pricing inefficiency

### Market Cards Show
- ✅ YES/NO prices (probability)
- 💰 Volume & Liquidity
- 📅 Closing date
- 🏷️ Tags/Categories
- 🎯 Source (Kalshi/Polymarket)

## 🔧 Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with proxy |
| `npm run dev:client` | Start only client (Vite) |
| `npm run dev:server` | Start only proxy server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 📁 Project Structure

```
PredictionMarketDashboard/
├── src/
│   ├── api/          # API clients (Kalshi, Polymarket)
│   ├── components/   # React components
│   ├── types/        # TypeScript types
│   ├── utils/        # Helper functions
│   ├── data/         # Mock data
│   ├── App.tsx       # Main app
│   └── main.tsx      # Entry point
├── server.ts         # Proxy server
├── postman_collection.json  # API testing
└── README.md         # Full documentation
```

## 🔌 API Configuration

**Current Mode**: Mock Data ✅

To use **Real APIs**:
1. Edit `src/api/kalshi.ts` → set `USE_MOCK_DATA = false`
2. Edit `src/api/polymarket.ts` → set `USE_MOCK_DATA = false`
3. Run `npm run dev` (includes proxy for CORS)

## 🧪 Testing with Postman

1. Import `postman_collection.json`
2. Try endpoints:
   - Kalshi → Get All Markets
   - Polymarket → Get Markets
3. Verify responses before enabling real APIs

## 🎯 Investment Analysis Tips

1. **Compare Prices**: Look for same event on both platforms
2. **Check Volume**: Higher = more liquid = easier to trade
3. **Watch Edge**: >5% might indicate mispricing
4. **Track Dates**: Consider time until market closes
5. **Diversify**: Spread across multiple markets

## 🐛 Troubleshooting

**Markets not loading?**
- Using mock data mode (default) → Should work fine
- Using real APIs → Check console for CORS/network errors
- Try `npm run dev` instead of `npm run dev:client`

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Port already in use?**
- Frontend: Change in `vite.config.ts` (default: 3000)
- Proxy: Change in `server.ts` (default: 3001)

## 📚 Documentation Files

- **README.md** → Full project overview
- **SETUP_GUIDE.md** → Detailed setup steps
- **API_CONFIG.md** → API configuration
- **This file** → Quick reference

## 🌟 Next Steps

1. ✅ Dashboard is running
2. 📊 Explore markets
3. 🔍 Test filters & search
4. 📈 Analyze opportunities
5. 💡 Add your own features!

---

**Happy Trading!** 🎯📊💰
