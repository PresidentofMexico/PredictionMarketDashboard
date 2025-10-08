# API Configuration Guide

## Using Real APIs vs Mock Data

The dashboard supports both real API connections and mock data for demonstration purposes.

### Mock Data Mode (Default)

By default, the dashboard uses mock data to demonstrate functionality. This is useful when:
- APIs are blocked by network restrictions
- You want to test the dashboard without API calls
- You're developing offline

To use mock data, the API files have `USE_MOCK_DATA = true` set.

### Real API Mode

To connect to real Kalshi and Polymarket APIs:

1. **Update API Configuration Files**

   In `src/api/kalshi.ts`:
   ```typescript
   const USE_MOCK_DATA = false;  // Change to false
   ```

   In `src/api/polymarket.ts`:
   ```typescript
   const USE_MOCK_DATA = false;  // Change to false
   ```

2. **Handle CORS Issues**

   When running locally, you may encounter CORS (Cross-Origin Resource Sharing) errors. The project includes a proxy server to handle this:

   ```bash
   npm run dev  # Runs both proxy server and client
   ```

   This starts:
   - Proxy server on `http://localhost:3001`
   - Vite dev server on `http://localhost:3000`

3. **API Endpoints Used**

   **Kalshi API:**
   - Base URL: `https://api.elections.kalshi.com/trade-api/v2`
   - Endpoints: `/markets`, `/events`
   - No authentication required for public data

   **Polymarket API:**
   - Base URL: `https://gamma-api.polymarket.com`
   - Endpoints: `/markets`
   - No authentication required for public data

### Network Restrictions

If you're in a restricted environment (corporate network, firewall, etc.):
- The mock data mode will work without any network calls
- Real APIs may be blocked and require proxy/VPN access
- Check browser console for CORS or network errors

### Production Deployment

For production:
1. Set `USE_MOCK_DATA = false` in both API files
2. Consider setting up a backend proxy to handle API calls
3. Implement proper error handling and fallbacks
4. Add caching to reduce API calls

## Testing with Postman

Import `postman_collection.json` to test APIs directly:
1. Open Postman
2. Import the collection file
3. Try the Kalshi and Polymarket endpoints
4. Verify responses before enabling real API mode

## Troubleshooting

**APIs not loading:**
- Check browser console for errors
- Verify network access to API URLs
- Try mock data mode first
- Use the proxy server for CORS issues

**Proxy server not starting:**
- Make sure port 3001 is available
- Check if `tsx` is installed: `npm install`
- Try running separately: `npm run dev:server`
