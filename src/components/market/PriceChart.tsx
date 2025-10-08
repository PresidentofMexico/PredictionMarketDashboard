import { useEffect, useRef } from 'react';
import { createChart, type IChartApi, AreaSeries, type UTCTimestamp } from 'lightweight-charts';
import type { PricePoint } from '../../types';

interface PriceChartProps {
  data: PricePoint[];
  height?: number;
}

export const PriceChart = ({ data, height = 300 }: PriceChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height,
        layout: { background: { color: '#FFFFFF' }, textColor: '#333333' },
        grid: { vertLines: { color: '#F0F3FA' }, horzLines: { color: '#F0F3FA' } },
        timeScale: { timeVisible: true, secondsVisible: false },
      });

      const areaSeries = chartRef.current.addSeries(AreaSeries, {
        topColor: 'rgba(33, 150, 243, 0.56)',
        bottomColor: 'rgba(33, 150, 243, 0.04)',
        lineColor: 'rgba(33, 150, 243, 1)',
        lineWidth: 2,
      });

      if (data.length > 0) {
        const formattedData = data.map(point => ({
          time: point.time as UTCTimestamp,
          value: point.value,
        }));
        
        areaSeries.setData(formattedData);
      }

      // Handle resize
      const handleResize = () => {
        if (chartRef.current && chartContainerRef.current) {
          chartRef.current.applyOptions({ 
            width: chartContainerRef.current.clientWidth 
          });
        }
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
        }
      };
    }
  }, [data, height]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: '100%',
        height: `${height}px`,
      }}
    />
  );
};
