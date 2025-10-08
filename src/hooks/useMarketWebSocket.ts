import { useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import { WEBSOCKET_CONFIG } from '../config/api';
import type { WebSocketMessage } from '../types';

/**
 * Hook for connecting to market data WebSocket
 * Provides real-time market updates when WebSocket URL is configured
 */
export const useMarketWebSocket = () => {
  const handleMessage = useCallback((message: WebSocketMessage) => {
    // Handle different message types
    switch (message.type) {
      case 'market_update':
        // Market updates could trigger React Query cache invalidation
        // For now, we'll just log them
        console.log('Market update:', message.data);
        break;
      case 'orderbook_update':
        console.log('Order book update:', message.data);
        break;
      case 'trade':
        console.log('Trade:', message.data);
        break;
      default:
        console.log('Unknown message type:', message);
    }
  }, []);

  const handleError = useCallback((error: Event) => {
    console.error('WebSocket error:', error);
  }, []);

  const handleOpen = useCallback(() => {
    console.log('WebSocket connection established');
  }, []);

  const handleClose = useCallback(() => {
    console.log('WebSocket connection closed');
  }, []);

  // Only connect if WebSocket URL is configured
  const enabled = Boolean(WEBSOCKET_CONFIG.url);

  const { isConnected } = useWebSocket({
    url: WEBSOCKET_CONFIG.url || 'ws://localhost:8080', // Fallback to avoid errors
    onMessage: handleMessage,
    onError: handleError,
    onOpen: handleOpen,
    onClose: handleClose,
    enabled,
  });

  return {
    isConnected: enabled && isConnected,
  };
};
