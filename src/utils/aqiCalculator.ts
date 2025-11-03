// AQI calculation utilities

import type { AQILevel, HealthProfile } from '@/types';

/**
 * Calculate AQI category from numerical value
 */
export const getAQICategory = (aqi: number): AQILevel => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'satisfactory';
  if (aqi <= 200) return 'moderate';
  if (aqi <= 300) return 'poor';
  if (aqi <= 400) return 'very-poor';
  return 'severe';
};

/**
 * Get personalized health recommendation based on AQI and user profile
 */
export const getPersonalizedAdvice = (aqi: number, profile: HealthProfile): string => {
  const category = getAQICategory(aqi);
  
  const adviceMap: Record<AQILevel, Record<HealthProfile, string>> = {
    'good': {
      child: 'Perfect day for outdoor play! Enjoy activities outside.',
      adult: 'Great air quality. Ideal for outdoor exercise and activities.',
      elderly: 'Excellent conditions for a walk or outdoor activities.',
      asthma: 'Air quality is ideal. Feel free to spend time outdoors.',
    },
    'satisfactory': {
      child: 'Good for outdoor activities. Monitor sensitive children.',
      adult: 'Air quality is acceptable for most outdoor activities.',
      elderly: 'Generally safe, but take it easy with strenuous activities.',
      asthma: 'Acceptable conditions, but keep your inhaler handy.',
    },
    'moderate': {
      child: 'Limit prolonged outdoor play. Short activities are okay.',
      adult: 'Reduce prolonged or heavy outdoor exertion.',
      elderly: 'Limit time outdoors, especially physical activities.',
      asthma: 'Consider staying indoors. Use reliever inhaler if needed.',
    },
    'poor': {
      child: 'Avoid outdoor activities. Stay indoors with air purification.',
      adult: 'Avoid prolonged outdoor exertion. Wear N95 mask if going out.',
      elderly: 'Stay indoors. Use air purifier. Avoid any outdoor exposure.',
      asthma: 'Stay indoors with air purifier. Have reliever inhaler ready.',
    },
    'very-poor': {
      child: 'Stay indoors. Use air purifier. Close windows.',
      adult: 'Stay indoors. Wear N95 mask if you must go out.',
      elderly: 'Emergency precautions. Stay indoors with air purification.',
      asthma: 'Health emergency. Stay indoors. Monitor symptoms closely.',
    },
    'severe': {
      child: 'Health emergency. Keep indoors with air purifier running.',
      adult: 'Health emergency. Avoid all outdoor exposure.',
      elderly: 'Critical situation. Stay indoors. Monitor health continuously.',
      asthma: 'Critical emergency. Stay indoors. Have emergency medication ready.',
    },
  };

  return adviceMap[category][profile];
};

/**
 * Calculate dominant pollutant
 */
export const getDominantPollutant = (pm25: number, pm10: number, no2: number, so2: number, co: number, o3: number): string => {
  const pollutants = [
    { name: 'PM2.5', value: pm25, threshold: 60 },
    { name: 'PM10', value: pm10, threshold: 100 },
    { name: 'NO2', value: no2, threshold: 80 },
    { name: 'SO2', value: so2, threshold: 80 },
    { name: 'CO', value: co, threshold: 2 },
    { name: 'O3', value: o3, threshold: 100 },
  ];

  const maxPollutant = pollutants.reduce((prev, current) => {
    const prevRatio = prev.value / prev.threshold;
    const currentRatio = current.value / current.threshold;
    return currentRatio > prevRatio ? current : prev;
  });

  return maxPollutant.name;
};

/**
 * Format AQI with color indicator
 */
export const formatAQI = (aqi: number): { value: number; color: string; label: string } => {
  const category = getAQICategory(aqi);
  
  const colorMap: Record<AQILevel, string> = {
    'good': 'hsl(var(--aqi-good))',
    'satisfactory': 'hsl(var(--aqi-satisfactory))',
    'moderate': 'hsl(var(--aqi-moderate))',
    'poor': 'hsl(var(--aqi-poor))',
    'very-poor': 'hsl(var(--aqi-very-poor))',
    'severe': 'hsl(var(--aqi-severe))',
  };

  const labelMap: Record<AQILevel, string> = {
    'good': 'Good',
    'satisfactory': 'Satisfactory',
    'moderate': 'Moderate',
    'poor': 'Poor',
    'very-poor': 'Very Poor',
    'severe': 'Severe',
  };

  return {
    value: Math.round(aqi),
    color: colorMap[category],
    label: labelMap[category],
  };
};

/**
 * Estimate health impact
 */
export const estimateHealthImpact = (aqi: number, exposureHours: number): string => {
  const category = getAQICategory(aqi);
  
  if (category === 'good' || category === 'satisfactory') {
    return 'Minimal health impact expected';
  }
  
  if (category === 'moderate') {
    return `${exposureHours}h exposure may cause minor respiratory discomfort for sensitive individuals`;
  }
  
  if (category === 'poor') {
    return `${exposureHours}h exposure likely to cause breathing discomfort and increased respiratory issues`;
  }
  
  if (category === 'very-poor') {
    return `${exposureHours}h exposure poses serious health risks. Respiratory and cardiovascular effects expected`;
  }
  
  return `${exposureHours}h exposure causes severe health emergency. Immediate protection needed`;
};
