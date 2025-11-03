// Comprehensive mock data for AirSense India

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

export const cities: City[] = [
  { id: "hyd", name: "Hyderabad", state: "Telangana", coordinates: [17.385, 78.486], currentAQI: 156, sensors: 127, population: 10000000, trend: "stable" },
  { id: "del", name: "Delhi", state: "Delhi", coordinates: [28.7041, 77.1025], currentAQI: 387, sensors: 245, population: 19000000, trend: "increasing" },
  { id: "mum", name: "Mumbai", state: "Maharashtra", coordinates: [19.0760, 72.8777], currentAQI: 142, sensors: 189, population: 20000000, trend: "decreasing" },
  { id: "blr", name: "Bangalore", state: "Karnataka", coordinates: [12.9716, 77.5946], currentAQI: 98, sensors: 156, population: 12000000, trend: "stable" },
  { id: "che", name: "Chennai", state: "Tamil Nadu", coordinates: [13.0827, 80.2707], currentAQI: 87, sensors: 134, population: 10000000, trend: "decreasing" },
  { id: "kol", name: "Kolkata", state: "West Bengal", coordinates: [22.5726, 88.3639], currentAQI: 234, sensors: 167, population: 14000000, trend: "increasing" },
  { id: "pun", name: "Pune", state: "Maharashtra", coordinates: [18.5204, 73.8567], currentAQI: 124, sensors: 98, population: 6500000, trend: "stable" },
  { id: "ahm", name: "Ahmedabad", state: "Gujarat", coordinates: [23.0225, 72.5714], currentAQI: 198, sensors: 112, population: 8000000, trend: "increasing" },
  { id: "jai", name: "Jaipur", state: "Rajasthan", coordinates: [26.9124, 75.7873], currentAQI: 176, sensors: 87, population: 3900000, trend: "stable" },
  { id: "lko", name: "Lucknow", state: "Uttar Pradesh", coordinates: [26.8467, 80.9462], currentAQI: 289, sensors: 94, population: 3400000, trend: "increasing" },
];

export const sensors: Sensor[] = [
  { id: "HYD-001", location: "Banjara Hills", coordinates: [17.4239, 78.4738], currentAQI: 142, PM25: 87, PM10: 156, NO2: 45, SO2: 12, CO: 0.8, O3: 34, timestamp: new Date().toISOString(), status: "active" },
  { id: "HYD-002", location: "Madhapur", coordinates: [17.4485, 78.3908], currentAQI: 178, PM25: 98, PM10: 187, NO2: 52, SO2: 18, CO: 1.2, O3: 41, timestamp: new Date().toISOString(), status: "active" },
  { id: "HYD-003", location: "Gachibowli", coordinates: [17.4399, 78.3482], currentAQI: 134, PM25: 79, PM10: 142, NO2: 39, SO2: 9, CO: 0.6, O3: 28, timestamp: new Date().toISOString(), status: "active" },
  { id: "HYD-004", location: "Secunderabad", coordinates: [17.4399, 78.4983], currentAQI: 167, PM25: 92, PM10: 169, NO2: 48, SO2: 15, CO: 0.9, O3: 37, timestamp: new Date().toISOString(), status: "active" },
  { id: "HYD-005", location: "Kukatpally", coordinates: [17.4948, 78.3985], currentAQI: 189, PM25: 104, PM10: 201, NO2: 56, SO2: 21, CO: 1.4, O3: 44, timestamp: new Date().toISOString(), status: "active" },
  { id: "HYD-006", location: "Begumpet", coordinates: [17.4435, 78.4677], currentAQI: 145, PM25: 85, PM10: 151, NO2: 42, SO2: 11, CO: 0.7, O3: 31, timestamp: new Date().toISOString(), status: "active" },
];

export const generateForecast = (): ForecastData[] => {
  const forecast: ForecastData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 72; i++) {
    const timestamp = new Date(now.getTime() + i * 60 * 60 * 1000);
    const baseAQI = 156;
    const variance = Math.sin(i / 12) * 30 + Math.random() * 20;
    const predictedAQI = Math.max(50, Math.min(400, Math.round(baseAQI + variance)));
    
    forecast.push({
      timestamp: timestamp.toISOString(),
      predictedAQI,
      confidence: 0.85 + Math.random() * 0.1,
      components: {
        PM25: Math.round(predictedAQI * 0.6),
        PM10: Math.round(predictedAQI * 1.1),
        NO2: Math.round(predictedAQI * 0.3),
      },
    });
  }
  
  return forecast;
};

export const userProfile: UserProfile = {
  id: "user123",
  name: "Rahul Sharma",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  level: 7,
  levelName: "Air Guardian",
  points: 2847,
  achievements: ["First Report", "Week Streak", "Tree Planter", "Community Hero"],
  city: "Hyderabad",
  healthProfile: "adult",
  joinedDate: "2024-06-15",
};

export const leaderboard = [
  { rank: 1, userId: "user456", name: "Priya Reddy", points: 4521, weeklyChange: 145, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
  { rank: 2, userId: "user789", name: "Arjun Patel", points: 4234, weeklyChange: 89, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" },
  { rank: 3, userId: "user234", name: "Sneha Kumar", points: 3987, weeklyChange: 234, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
  { rank: 4, userId: "user567", name: "Vikram Singh", points: 3654, weeklyChange: -23, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram" },
  { rank: 5, userId: "user890", name: "Ananya Iyer", points: 3421, weeklyChange: 167, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya" },
  { rank: 6, userId: "user321", name: "Rohan Gupta", points: 3198, weeklyChange: 45, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" },
  { rank: 7, userId: "user654", name: "Kavya Nair", points: 2987, weeklyChange: 78, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya" },
  { rank: 8, userId: "user987", name: "Aditya Sharma", points: 2847, weeklyChange: 123, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya" },
  { rank: 9, userId: "user147", name: "Meera Joshi", points: 2654, weeklyChange: 56, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera" },
  { rank: 10, userId: "user258", name: "Karthik Rao", points: 2456, weeklyChange: 91, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik" },
];

export const pollutionReports: PollutionReport[] = [
  { id: "report_1", userId: "user123", type: "construction", severity: 4, location: "Madhapur Junction", coordinates: [17.4485, 78.3908], imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400", description: "Heavy dust from construction site", verified: true, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), upvotes: 23 },
  { id: "report_2", userId: "user456", type: "vehicular", severity: 3, location: "Banjara Hills", coordinates: [17.4239, 78.4738], imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", description: "Heavy traffic congestion", verified: true, timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), upvotes: 17 },
  { id: "report_3", userId: "user789", type: "burning", severity: 5, location: "Kukatpally", coordinates: [17.4948, 78.3985], imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400", description: "Waste burning in open area", verified: false, timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), upvotes: 34 },
];

export const missions = [
  { id: "m1", title: "Report 5 Pollution Sources", description: "Help us identify pollution hotspots", progress: 3, total: 5, reward: "50 points + Air Quality Badge", icon: "camera" },
  { id: "m2", title: "Carpool 3 Times This Week", description: "Reduce vehicular emissions", progress: 1, total: 3, reward: "30 points + Eco Warrior Badge", icon: "car" },
  { id: "m3", title: "Plant a Tree & Upload Photo", description: "Contribute to green cover", progress: 0, total: 1, reward: "100 points + Tree Planter Badge + Free Sapling", icon: "tree" },
  { id: "m4", title: "Share Air Quality 5 Times", description: "Spread awareness on social media", progress: 2, total: 5, reward: "25 points + Influencer Badge", icon: "share" },
];

export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return "hsl(var(--aqi-good))";
  if (aqi <= 100) return "hsl(var(--aqi-satisfactory))";
  if (aqi <= 200) return "hsl(var(--aqi-moderate))";
  if (aqi <= 300) return "hsl(var(--aqi-poor))";
  if (aqi <= 400) return "hsl(var(--aqi-very-poor))";
  return "hsl(var(--aqi-severe))";
};

export const getAQILabel = (aqi: number): string => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
};

export const getHealthAdvice = (aqi: number): string => {
  if (aqi <= 50) return "Air quality is satisfactory. Enjoy outdoor activities!";
  if (aqi <= 100) return "Air quality is acceptable. Sensitive individuals should limit prolonged outdoor exertion.";
  if (aqi <= 200) return "Members of sensitive groups may experience health effects. General public less likely to be affected.";
  if (aqi <= 300) return "Everyone may begin to experience health effects. Sensitive groups may experience more serious effects.";
  if (aqi <= 400) return "Health alert: everyone may experience more serious health effects. Avoid outdoor activities.";
  return "Health warnings of emergency conditions. Everyone should avoid outdoor activities.";
};
