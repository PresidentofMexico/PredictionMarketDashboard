# API Setup Guide

This guide provides detailed instructions for setting up API authentication with Kalshi and Polymarket to enable real-time market data in the Prediction Market Dashboard.

## Table of Contents

1. [Overview](#overview)
2. [Environment Configuration](#environment-configuration)
3. [Kalshi API Setup](#kalshi-api-setup)
4. [Polymarket API Setup](#polymarket-api-setup)
5. [Testing Your Setup](#testing-your-setup)
6. [Troubleshooting](#troubleshooting)
7. [API Mode Configuration](#api-mode-configuration)

## Overview

The dashboard supports two data modes:

- **Development Mode (Default)**: Uses mock data for testing and development
- **Production Mode**: Connects to real Kalshi and Polymarket APIs

By default, the application runs in development mode with mock data. To use real market data, you need to:

1. Obtain API credentials from Kalshi (optional, Polymarket doesn't require auth for public data)
2. Configure environment variables
3. Switch to production mode

## Environment Configuration

### Step 1: Copy Environment Template

Copy the `.env.example` file to create your local environment configuration:

```bash
cp .env.example .env.local
```

### Step 2: Configure Variables

Edit `.env.local` with your API credentials:

```env
# Kalshi API Configuration
VITE_KALSHI_API_URL=https://api.kalshi.com/trade-api/v2
VITE_KALSHI_API_KEY=your_kalshi_api_key_here
VITE_KALSHI_EMAIL=your_kalshi_email_here
VITE_KALSHI_PASSWORD=your_kalshi_password_here

# Polymarket API Configuration
VITE_POLYMARKET_API_URL=https://gamma-api.polymarket.com

# Environment Mode
VITE_API_MODE=production
```

## Kalshi API Setup

### About Kalshi API

Kalshi is a regulated prediction market exchange in the United States. To access their API:

1. **Create an Account**
   - Visit [https://kalshi.com](https://kalshi.com)
   - Sign up for an account
   - Complete KYC verification (required for trading)

2. **API Access**
   - **Note**: As of 2024, Kalshi's public API is primarily designed for institutional users
   - Contact Kalshi support at [support@kalshi.com](mailto:support@kalshi.com) for API access
   - API documentation: [https://kalshi.com/docs](https://kalshi.com/docs)

3. **Authentication Methods**
   - Kalshi uses email/password authentication to obtain session tokens
   - API keys may be available for institutional accounts
   - The dashboard supports both methods

### Kalshi API Endpoints

The dashboard uses these Kalshi endpoints:

- `GET /trade-api/v2/markets` - List all markets
- `GET /trade-api/v2/markets/{ticker}` - Get specific market details

### Configuration

Update your `.env.local` file:

```env
VITE_KALSHI_API_URL=https://api.kalshi.com/trade-api/v2
VITE_KALSHI_EMAIL=your_email@example.com
VITE_KALSHI_PASSWORD=your_password
```

### API Limitations

- Rate limits apply (varies by account type)
- Some endpoints require authenticated trading account
- Real-time data may require WebSocket connection

## Polymarket API Setup

### About Polymarket API

Polymarket is a decentralized prediction market platform. Their public API provides market data without authentication.

### Public API Access

1. **No Authentication Required**
   - Polymarket's Gamma API is publicly accessible
   - No account or API key needed for market data
   - API documentation: [https://docs.polymarket.com](https://docs.polymarket.com)

2. **API Base URL**
   - Production: `https://gamma-api.polymarket.com`
   - The API uses standard REST endpoints

3. **Endpoints Used**
   - `GET /markets` - List all markets
   - `GET /markets/{id}` - Get specific market details

### Configuration

Polymarket requires minimal configuration:

```env
VITE_POLYMARKET_API_URL=https://gamma-api.polymarket.com
```

### API Limitations

- Public API rate limits apply
- Some advanced features may require authentication
- Real-time updates available via WebSocket (optional)

## Testing Your Setup

### Test with Mock Data (Default)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Verify mock data loads:**
   - Open [http://localhost:5173](http://localhost:5173)
   - You should see sample markets from both Kalshi and Polymarket
   - Markets will have "(MOCK)" indicator in development mode

### Test with Real API Data

1. **Configure environment variables** in `.env.local`:
   ```env
   VITE_API_MODE=production
   VITE_KALSHI_API_KEY=your_actual_key
   # ... other variables
   ```

2. **Restart the development server:**
   ```bash
   npm run dev
   ```

3. **Verify real data loads:**
   - Open [http://localhost:5173](http://localhost:5173)
   - Check browser console for API calls
   - Verify markets are current and up-to-date

### Testing Checklist

- [ ] Mock data displays correctly in development mode
- [ ] Environment variables are loaded (check console)
- [ ] Real API calls succeed (check network tab)
- [ ] Error handling works (try invalid API keys)
- [ ] Fallback to mock data works if API fails

## Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading

**Problem**: Changes to `.env.local` don't take effect

**Solution**:
- Restart the development server
- Ensure file is named exactly `.env.local`
- Check that variables start with `VITE_` prefix
- Clear browser cache

#### 2. API Authentication Errors

**Problem**: "401 Unauthorized" or "403 Forbidden" errors

**Solution**:
- Verify API credentials are correct
- Check if API key is active
- Ensure account has proper permissions
- Contact API provider for access verification

#### 3. CORS Errors

**Problem**: "CORS policy blocked" errors in browser

**Solution**:
- CORS errors typically occur in browser direct API calls
- Use a proxy server for development (configure in `vite.config.ts`)
- Contact API provider about CORS configuration
- Consider using server-side API calls for production

#### 4. Rate Limiting

**Problem**: "429 Too Many Requests" errors

**Solution**:
- Reduce polling frequency in the code
- Implement request throttling
- Upgrade API plan if available
- Use caching to minimize API calls

### Debug Mode

Enable detailed logging by adding to `.env.local`:

```env
VITE_DEBUG=true
```

This will show:
- API request URLs
- Response data structure
- Authentication headers (sanitized)
- Error details

### Viewing Logs

1. **Browser Console**:
   - Open DevTools (F12)
   - Check Console tab for errors
   - Look for API-related messages

2. **Network Tab**:
   - Monitor actual API requests
   - Check request/response headers
   - Verify response status codes

## API Mode Configuration

### Development Mode (Default)

```env
VITE_API_MODE=development
```

**Characteristics**:
- Uses mock data only
- No API calls made
- Faster development
- No authentication needed
- Consistent test data

**When to Use**:
- Local development
- UI/UX testing
- When API credentials unavailable
- Offline development

### Production Mode

```env
VITE_API_MODE=production
```

**Characteristics**:
- Connects to real APIs
- Requires valid credentials
- Real-time market data
- Subject to API rate limits
- Automatic fallback to mock data on errors

**When to Use**:
- Production deployment
- Testing with real data
- When API credentials are available
- Integration testing

### Hybrid Mode

The dashboard automatically falls back to mock data if:
- API calls fail
- Invalid credentials
- Network errors
- Rate limits exceeded

This ensures the dashboard remains functional even with API issues.

## Next Steps

1. **WebSocket Integration** (Optional)
   - Configure real-time updates
   - Set `VITE_WEBSOCKET_URL` in `.env.local`
   - Enable live price streaming

2. **Advanced Features**
   - User authentication
   - Portfolio tracking
   - Historical data analysis
   - Price alerts

3. **Production Deployment**
   - Set up environment variables in hosting platform
   - Configure API keys securely
   - Enable HTTPS
   - Set up monitoring

## Additional Resources

### Kalshi Resources
- [Kalshi API Documentation](https://kalshi.com/docs)
- [Kalshi Support](mailto:support@kalshi.com)
- [Kalshi Trading Guide](https://kalshi.com/learn)

### Polymarket Resources
- [Polymarket Documentation](https://docs.polymarket.com)
- [Polymarket API Reference](https://docs.polymarket.com/api)
- [Polymarket GitHub](https://github.com/Polymarket)

### Development Resources
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review browser console for errors
3. Open an issue on [GitHub](https://github.com/PresidentofMexico/PredictionMarketDashboard/issues)
4. Contact the maintainers

---

**Last Updated**: January 2025
