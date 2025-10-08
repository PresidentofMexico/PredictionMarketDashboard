# Testing Guide

This guide provides comprehensive testing instructions for the Prediction Market Dashboard.

## Table of Contents

1. [Testing Overview](#testing-overview)
2. [Mock Data Testing](#mock-data-testing)
3. [Real API Testing](#real-api-testing)
4. [Feature Testing](#feature-testing)
5. [Browser Console Testing](#browser-console-testing)
6. [Performance Testing](#performance-testing)

## Testing Overview

The dashboard has been tested with both mock data and is ready for real API integration. This guide covers all testing scenarios.

### Test Environment

- **Node.js**: 18+
- **Browser**: Chrome, Firefox, Safari, Edge (latest versions)
- **Network**: Internet connection required for real API testing

## Mock Data Testing

Mock data testing validates that the dashboard works correctly without API credentials.

### Setup

1. **Ensure development mode** (default):
   ```bash
   # No .env.local file needed, or set:
   echo "VITE_API_MODE=development" > .env.local
   ```

2. **Start the server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://localhost:5173
   ```

### Expected Results

✅ **Dashboard displays 6 mock markets:**
- 3 from Polymarket
- 3 from Kalshi

✅ **Market cards show:**
- Source badge (POLYMARKET or KALSHI)
- Status badge (Open, Closed, or Settled)
- Market title
- Current price percentage
- Yes/No price breakdown
- Volume
- Close date
- Category tag

✅ **All features work:**
- Filtering by source, category, status
- Search functionality
- Sorting by volume, price, close time
- Reset filters button

### Test Checklist

- [ ] Dashboard loads without errors
- [ ] All 6 mock markets display
- [ ] Source filter shows correct markets (Kalshi/Polymarket)
- [ ] Category filter works (Sports/Entertainment/Other)
- [ ] Status filter works (Open/Closed/Settled)
- [ ] Search finds markets by title
- [ ] Sorting changes market order
- [ ] Reset button clears all filters
- [ ] No console errors
- [ ] Responsive layout works on mobile

## Real API Testing

Real API testing validates integration with live Kalshi and Polymarket APIs.

### Prerequisites

1. **Kalshi API Access** (Optional):
   - Account at [kalshi.com](https://kalshi.com)
   - API credentials (key or email/password)

2. **Polymarket** (No authentication needed):
   - Public API is freely accessible

### Setup

1. **Configure environment**:
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`**:
   ```env
   VITE_API_MODE=production
   VITE_KALSHI_API_KEY=your_actual_key
   VITE_POLYMARKET_API_URL=https://gamma-api.polymarket.com
   ```

3. **Restart server**:
   ```bash
   npm run dev
   ```

### Testing Polymarket API

Since Polymarket API is public, you can test it immediately:

1. **Set environment**:
   ```env
   VITE_API_MODE=production
   ```

2. **Open browser console** (F12)

3. **Check for API calls**:
   - Look for fetch requests to `gamma-api.polymarket.com`
   - Verify response status is 200
   - Check data structure matches expected format

4. **Expected behavior**:
   - Real Polymarket markets load
   - Market data is current and accurate
   - Prices reflect live values
   - Volume shows real trading activity

### Testing Kalshi API

Kalshi requires authentication:

1. **With API Key**:
   ```env
   VITE_KALSHI_API_KEY=your_key
   ```

2. **With Email/Password**:
   ```env
   VITE_KALSHI_EMAIL=your_email
   VITE_KALSHI_PASSWORD=your_password
   ```

3. **Verify in console**:
   - Check for requests to `api.kalshi.com`
   - Verify Authorization header is present
   - Check response status codes

4. **Expected behavior**:
   - Real Kalshi markets load
   - Authentication succeeds (200 response)
   - Market data is current
   - Error handling works for invalid credentials

### API Error Testing

Test error handling by intentionally causing failures:

1. **Invalid API Key**:
   ```env
   VITE_KALSHI_API_KEY=invalid_key
   ```
   - Expected: Dashboard falls back to mock data
   - Console shows error message
   - User sees fallback data

2. **Network Issues**:
   - Disconnect internet
   - Expected: Automatic fallback to mock data
   - Error logged in console
   - No UI crash

3. **Rate Limiting**:
   - Make rapid requests (refresh multiple times)
   - Expected: Graceful handling of 429 errors
   - Caching prevents excessive requests

### Test Checklist

- [ ] Polymarket API connects successfully
- [ ] Kalshi API authenticates correctly
- [ ] Real market data displays
- [ ] API errors are handled gracefully
- [ ] Fallback to mock data works
- [ ] No sensitive data in console logs
- [ ] Network tab shows correct requests
- [ ] Response data is validated

## Feature Testing

Test specific dashboard features to ensure they work correctly.

### Search Functionality

1. **Test search**:
   - Enter "Chiefs" in search box
   - Expected: Only Chiefs-related markets show

2. **Case insensitivity**:
   - Enter "CELTICS" (uppercase)
   - Expected: Finds Celtics market

3. **Partial matches**:
   - Enter "NBA"
   - Expected: Shows all NBA-related markets

4. **No results**:
   - Enter "xyz123"
   - Expected: "No markets found" message

### Filter Functionality

1. **Source Filter**:
   - Select "Kalshi"
   - Expected: Only Kalshi markets display
   - Badge shows "KALSHI"

2. **Category Filter**:
   - Select "Sports"
   - Expected: Only sports markets show
   - Tag shows "Sports"

3. **Status Filter**:
   - Select "Open"
   - Expected: Only open markets show
   - Badge shows "Open"

4. **Combined Filters**:
   - Source: Polymarket
   - Category: Sports
   - Expected: Only Polymarket sports markets

5. **Reset Filters**:
   - Apply multiple filters
   - Click "Reset"
   - Expected: All filters clear, all markets show

### Sort Functionality

1. **Sort by Volume**:
   - Select "Volume"
   - Toggle "Descending"
   - Expected: Highest volume first

2. **Sort by Price**:
   - Select "Price"
   - Expected: Sorted by probability

3. **Sort by Close Time**:
   - Select "Close Time"
   - Expected: Nearest close date first

4. **Sort Direction**:
   - Toggle ascending/descending
   - Expected: Order reverses

### Market Detail View

1. **Click a market card**:
   - Expected: Detailed view opens (if implemented)
   - Shows additional market information

### Test Checklist

- [ ] Search finds correct markets
- [ ] Search is case-insensitive
- [ ] Source filter works correctly
- [ ] Category filter works correctly
- [ ] Status filter works correctly
- [ ] Multiple filters work together
- [ ] Reset clears all filters
- [ ] All sort options work
- [ ] Sort direction toggles
- [ ] Market cards are clickable

## Browser Console Testing

Use browser console to verify technical implementation.

### Console Log Checks

1. **Open DevTools** (F12)

2. **Check for errors**:
   - No red error messages
   - No uncaught exceptions
   - No React warnings

3. **API Configuration**:
   - Type in console: `import.meta.env`
   - Verify environment variables loaded
   - Check VITE_API_MODE value

4. **Network Requests**:
   - Open Network tab
   - Filter by "Fetch/XHR"
   - Verify API calls are made
   - Check request/response headers

### Expected Console Messages

In development mode:
```
[vite] connected
Loading markets from Kalshi...
Loading markets from Polymarket...
```

In production mode with real APIs:
```
[vite] connected
Fetching from Kalshi API...
Fetching from Polymarket API...
Markets loaded: 10 items
```

On API errors:
```
Error fetching Kalshi markets: [error details]
Falling back to mock data
```

### Network Tab Verification

1. **Development Mode**:
   - No external API calls
   - Only local Vite server requests

2. **Production Mode**:
   - Requests to api.kalshi.com
   - Requests to gamma-api.polymarket.com
   - Authorization headers present (for Kalshi)
   - Response status 200 or error handling

### Test Checklist

- [ ] No console errors
- [ ] Environment variables loaded correctly
- [ ] API calls visible in Network tab
- [ ] Request headers are correct
- [ ] Response data is valid
- [ ] Error messages are informative

## Performance Testing

Verify the dashboard performs well under various conditions.

### Load Time Testing

1. **Initial Load**:
   - Measure time to first paint
   - Expected: < 2 seconds

2. **Data Loading**:
   - Time to display markets
   - Expected: < 3 seconds with API
   - Expected: < 1 second with mock data

3. **Filter Response**:
   - Apply filter and measure response
   - Expected: < 100ms (instant)

### Memory Testing

1. **Check memory usage**:
   - Open Chrome DevTools > Memory
   - Take heap snapshot
   - Apply filters repeatedly
   - Take another snapshot
   - Verify no significant memory leaks

2. **Expected behavior**:
   - Memory usage stable
   - No continuous growth
   - Garbage collection works

### Network Testing

1. **API Call Frequency**:
   - Check Network tab
   - Verify polling/refetch interval
   - Default: Every 60 seconds

2. **Caching**:
   - Verify React Query caching
   - Stale time: 30 seconds
   - Refetch interval: 60 seconds

3. **Request optimization**:
   - No duplicate requests
   - Requests are batched when possible
   - Failed requests don't retry infinitely

### Test Checklist

- [ ] Dashboard loads quickly (< 2s)
- [ ] Filters respond instantly
- [ ] No memory leaks detected
- [ ] API calls are optimized
- [ ] Caching works correctly
- [ ] Network usage is reasonable

## Regression Testing

After making changes, verify core functionality still works:

### Pre-Deployment Checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Mock data loads correctly
- [ ] All filters work
- [ ] Search works
- [ ] Sorting works
- [ ] No console errors
- [ ] Responsive design works
- [ ] API integration works (if configured)
- [ ] Error handling works
- [ ] No TypeScript errors

### Automated Testing

Currently, the project uses:
- **ESLint** for code quality
- **TypeScript** for type checking
- **Manual browser testing** for UI

Future improvements could include:
- Unit tests with Vitest
- Integration tests with Testing Library
- E2E tests with Playwright
- Visual regression tests

## Bug Reporting

If you find issues during testing:

1. **Gather information**:
   - Browser and version
   - Node.js version
   - Environment configuration
   - Console error messages
   - Network tab screenshots

2. **Reproduce the issue**:
   - Document exact steps
   - Note expected vs actual behavior
   - Try in different browsers

3. **Report on GitHub**:
   - Open an issue
   - Include reproduction steps
   - Attach screenshots/logs
   - Tag with appropriate labels

## Next Steps

After testing:

1. **Document results**:
   - Note any issues found
   - Record API response times
   - Identify areas for improvement

2. **Performance optimization**:
   - Review network usage
   - Optimize bundle size
   - Implement additional caching

3. **Feature enhancement**:
   - Add real-time WebSocket updates
   - Implement advanced charting
   - Add portfolio tracking

---

**Last Updated**: January 2025
