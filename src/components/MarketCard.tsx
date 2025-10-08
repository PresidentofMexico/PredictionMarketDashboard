import { UnifiedMarket } from '../types/markets';
import { formatPrice, formatVolume, formatDate, calculateEdge } from '../utils/marketUtils';
import './MarketCard.css';

interface MarketCardProps {
  market: UnifiedMarket;
}

const MarketCard = ({ market }: MarketCardProps) => {
  const edge = calculateEdge(market.yesPrice, market.noPrice);
  const hasHighEdge = edge > 0.05; // 5% edge or more

  return (
    <div className={`market-card ${market.source}`}>
      <div className="market-header">
        <span className={`source-badge ${market.source}`}>
          {market.source.toUpperCase()}
        </span>
        {hasHighEdge && <span className="edge-badge">High Edge</span>}
      </div>
      
      <h3 className="market-title">{market.title}</h3>
      
      {market.description && (
        <p className="market-description">{market.description}</p>
      )}

      <div className="market-prices">
        <div className="price-item yes">
          <span className="price-label">YES</span>
          <span className="price-value">{formatPrice(market.yesPrice)}</span>
        </div>
        <div className="price-item no">
          <span className="price-label">NO</span>
          <span className="price-value">{formatPrice(market.noPrice)}</span>
        </div>
      </div>

      <div className="market-stats">
        {market.volume !== undefined && (
          <div className="stat">
            <span className="stat-label">Volume:</span>
            <span className="stat-value">{formatVolume(market.volume)}</span>
          </div>
        )}
        {market.liquidity !== undefined && (
          <div className="stat">
            <span className="stat-label">Liquidity:</span>
            <span className="stat-value">{formatVolume(market.liquidity)}</span>
          </div>
        )}
        {market.endDate && (
          <div className="stat">
            <span className="stat-label">Closes:</span>
            <span className="stat-value">{formatDate(market.endDate)}</span>
          </div>
        )}
      </div>

      {market.tags && market.tags.length > 0 && (
        <div className="market-tags">
          {market.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketCard;
