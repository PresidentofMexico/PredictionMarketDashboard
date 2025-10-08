# Quick Reference - API Setup

## TL;DR - Get Started in 30 Seconds

### Option 1: Mock Data (No Setup)
```bash
npm install
npm run dev
```
✅ **Works immediately!** Dashboard loads with sample data.

### Option 2: Real APIs
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

## Environment Variables

### Required for Real APIs

```env
# Mode: 'development' (mock) or 'production' (real APIs)
VITE_API_MODE=production

# Kalshi (Optional - requires account)
VITE_KALSHI_API_KEY=your_key
VITE_KALSHI_API_URL=https://api.kalshi.com/trade-api/v2

# Polymarket (No auth needed)
VITE_POLYMARKET_API_URL=https://gamma-api.polymarket.com
```

## API Setup Quick Links

### Kalshi
- **Website**: https://kalshi.com
- **Docs**: https://kalshi.com/docs
- **Support**: support@kalshi.com
- **Auth**: API Key or Email/Password

### Polymarket
- **Website**: https://polymarket.com
- **API**: https://gamma-api.polymarket.com
- **Docs**: https://docs.polymarket.com
- **Auth**: None needed for market data

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Troubleshooting

### Environment variables not loading?
- Restart dev server
- Check filename is `.env.local`
- Verify variables start with `VITE_`

### API errors?
- Check console for error messages
- Verify API credentials are correct
- Dashboard falls back to mock data automatically

### CORS errors?
- Use API proxy in production
- Check API provider CORS settings
- See [API_SETUP.md](./API_SETUP.md) for solutions

## File Locations

```
📁 Configuration
  .env.example          # Template
  .env.local            # Your config (git-ignored)
  src/config/api.ts     # API settings

📁 Services  
  src/services/kalshi.ts      # Kalshi API
  src/services/polymarket.ts  # Polymarket API

📁 Documentation
  docs/API_SETUP.md           # Full setup guide
  docs/TESTING.md             # Testing guide
  docs/IMPLEMENTATION_SUMMARY.md  # Technical details
```

## Mode Behavior

| Mode | Data Source | API Calls | Auth Required |
|------|-------------|-----------|---------------|
| development | Mock | ❌ | ❌ |
| production | Real APIs | ✅ | Kalshi only |

## Testing Checklist

Quick checks before deploying:

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Dashboard loads without errors
- [ ] Filters work correctly
- [ ] Search functionality works
- [ ] No console errors

## Next Steps

1. ✅ Dashboard works with mock data
2. 📖 Read [API_SETUP.md](./API_SETUP.md) for detailed setup
3. 🔑 Get API credentials (Kalshi only)
4. ⚙️ Configure `.env.local`
5. 🧪 Test with [TESTING.md](./TESTING.md) guide
6. 🚀 Deploy to production

## Support

- 📚 Full docs: [API_SETUP.md](./API_SETUP.md)
- 🧪 Testing: [TESTING.md](./TESTING.md)
- 🏗️ Technical: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- 🐛 Issues: [GitHub Issues](https://github.com/PresidentofMexico/PredictionMarketDashboard/issues)

---

**Quick Tip**: The dashboard is designed to work perfectly without any setup. Mock data provides a complete experience for development and testing!
