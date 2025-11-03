import React from 'react';
import { getAQIColor, getAQILabel } from '@/data/mockData';

interface AQIBadgeProps {
  aqi: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const AQIBadge: React.FC<AQIBadgeProps> = ({ aqi, size = 'md', showLabel = true }) => {
  const color = getAQIColor(aqi);
  const label = getAQILabel(aqi);
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-lg px-4 py-2',
  };

  return (
    <div 
      className={`aqi-badge inline-flex items-center gap-2 ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
    >
      <span className="font-mono font-bold text-white">{aqi}</span>
      {showLabel && <span className="text-white">{label}</span>}
    </div>
  );
};

export default AQIBadge;
