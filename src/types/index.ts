// Type definitions for AirSense India

export interface City {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number];
  currentAQI: number;
  sensors: number;
  population: number;
  trend: "increasing" | "decreasing" | "stable";
}

export interface Sensor {
  id: string;
  location: string;
  coordinates: [number, number];
  currentAQI: number;
  PM25: number;
  PM10: number;
  NO2: number;
  SO2: number;
  CO: number;
  O3: number;
  timestamp: string;
  status: "active" | "inactive";
}

export interface ForecastData {
  timestamp: string;
  predictedAQI: number;
  confidence: number;
  components: {
    PM25: number;
    PM10: number;
    NO2: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  levelName: string;
  points: number;
  achievements: string[];
  city: string;
  healthProfile: string;
  joinedDate: string;
}

export interface PollutionReport {
  id: string;
  userId: string;
  type: string;
  severity: number;
  location: string;
  coordinates: [number, number];
  imageUrl: string;
  description: string;
  verified: boolean;
  timestamp: string;
  upvotes: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  points: number;
  weeklyChange: number;
  avatar: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: string;
  icon: string;
}

export interface PolicyIntervention {
  id: number;
  name: string;
  city: string;
  implementedDate: string;
  beforeAQI: number;
  afterAQI: number;
  reductionPercent: number;
  cost: number;
  healthcareSavings: number;
  status: string;
}

export type AQILevel = 'good' | 'satisfactory' | 'moderate' | 'poor' | 'very-poor' | 'severe';

export type HealthProfile = 'child' | 'adult' | 'elderly' | 'asthma';
