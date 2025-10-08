import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Kalshi API proxy endpoints
app.get('/api/kalshi/markets', async (req, res) => {
  try {
    const { limit = '100', cursor, status = 'open' } = req.query;
    const params: any = { limit, status };
    if (cursor) params.cursor = cursor;

    const response = await axios.get('https://api.elections.kalshi.com/trade-api/v2/markets', {
      params,
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('Error proxying Kalshi markets:', error.message);
    res.status(500).json({ error: 'Failed to fetch Kalshi markets' });
  }
});

app.get('/api/kalshi/events', async (req, res) => {
  try {
    const { limit = '100' } = req.query;
    const response = await axios.get('https://api.elections.kalshi.com/trade-api/v2/events', {
      params: { limit },
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('Error proxying Kalshi events:', error.message);
    res.status(500).json({ error: 'Failed to fetch Kalshi events' });
  }
});

// Polymarket API proxy endpoints
app.get('/api/polymarket/markets', async (req, res) => {
  try {
    const { limit = '100', offset = '0', tag, active = 'true' } = req.query;
    const params: any = { limit, offset, active };
    if (tag) params.tag = tag;

    const response = await axios.get('https://gamma-api.polymarket.com/markets', {
      params,
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('Error proxying Polymarket markets:', error.message);
    res.status(500).json({ error: 'Failed to fetch Polymarket markets' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
