import { useEffect, useRef } from 'react';
import type { PricePoint } from '../../types';

interface PriceChartProps {
  data: PricePoint[];
  height?: number;
}

export const PriceChart = ({ data, height = 300 }: PriceChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Chart implementation will be added in future iterations
    // For now, we'll show a placeholder
  }, [data, height]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
      }}
    >
      Price Chart (Coming Soon)
    </div>
  );
};
