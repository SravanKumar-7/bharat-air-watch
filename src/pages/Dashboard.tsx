import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AQIBadge from '@/components/common/AQIBadge';
import { cities, sensors, generateForecast, getAQIColor, getHealthAdvice } from '@/data/mockData';
import { Cloud, Droplets, Wind, TrendingUp, Activity, Users } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('hyd');
  const [currentAQI, setCurrentAQI] = useState(156);
  const [forecast] = useState(generateForecast());

  const city = cities.find(c => c.id === selectedCity) || cities[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAQI(prev => Math.max(50, Math.min(400, prev + (Math.random() - 0.5) * 10)));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const pollutantData = [
    { name: 'PM2.5', value: 40, color: 'hsl(var(--aqi-moderate))' },
    { name: 'PM10', value: 25, color: 'hsl(var(--aqi-poor))' },
    { name: 'NO2', value: 15, color: 'hsl(var(--aqi-satisfactory))' },
    { name: 'SO2', value: 10, color: 'hsl(var(--aqi-good))' },
    { name: 'CO', value: 5, color: 'hsl(var(--aqi-good))' },
    { name: 'O3', value: 5, color: 'hsl(var(--aqi-good))' },
  ];

  const hourlyData = forecast.slice(0, 24).map((item, index) => ({
    hour: `${index}h`,
    aqi: item.predictedAQI,
  }));

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Air Quality Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and analysis</p>
        </div>

        <div className="grid lg:grid-cols-[250px_1fr_300px] gap-6">
          {/* Left Sidebar */}
          <div className="space-y-4">
            <Card className="glass-card p-4">
              <label className="text-sm font-medium mb-2 block">Select City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            <Card className="glass-card p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Current AQI</p>
              <div className="text-6xl font-mono font-bold mb-3" style={{ color: getAQIColor(Math.round(currentAQI)) }}>
                {Math.round(currentAQI)}
              </div>
              <AQIBadge aqi={Math.round(currentAQI)} size="md" />
            </Card>

            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-3">Pollutant Breakdown</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={pollutantData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    label
                  >
                    {pollutantData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="glass-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><Activity className="w-4 h-4" />Sensors Active</span>
                <span className="font-bold">{city.sensors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><Users className="w-4 h-4" />Citizens</span>
                <span className="font-bold">12,458</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4" />Reports Today</span>
                <span className="font-bold">1,247</span>
              </div>
            </Card>

            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Cloud className="w-4 h-4" />Weather
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Temperature</span>
                  <span className="font-medium">28°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Droplets className="w-3 h-3" />Humidity
                  </span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Wind className="w-3 h-3" />Wind Speed
                  </span>
                  <span className="font-medium">12 km/h</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Map Section */}
          <Card className="glass-card p-4">
            <h2 className="text-xl font-bold mb-4">Pollution Heatmap - {city.name}</h2>
            <div className="h-[600px] rounded-lg overflow-hidden">
              <MapContainer
                center={city.coordinates}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
                {sensors.map(sensor => (
                  <CircleMarker
                    key={sensor.id}
                    center={sensor.coordinates}
                    radius={15}
                    fillColor={getAQIColor(sensor.currentAQI)}
                    color="#fff"
                    weight={2}
                    opacity={0.8}
                    fillOpacity={0.6}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold mb-2">{sensor.location}</h3>
                        <AQIBadge aqi={sensor.currentAQI} size="sm" />
                        <div className="mt-2 space-y-1 text-xs">
                          <p>PM2.5: {sensor.PM25} µg/m³</p>
                          <p>PM10: {sensor.PM10} µg/m³</p>
                          <p>NO2: {sensor.NO2} µg/m³</p>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </Card>

          {/* Right Panel */}
          <div className="space-y-4">
            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-3">24-Hour Forecast</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="aqi" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-3">Health Recommendations</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {getHealthAdvice(Math.round(currentAQI))}
              </p>
              <div className="mt-4 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-xs font-medium">⚠️ For Sensitive Groups:</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Limit outdoor activities and use N95 masks when going out.
                </p>
              </div>
            </Card>

            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-3">Recent Alerts</h3>
              <div className="space-y-3">
                {[
                  { time: '2h ago', message: 'AQI spike detected in Madhapur', type: 'warning' },
                  { time: '5h ago', message: 'Construction activity reported', type: 'info' },
                  { time: '1d ago', message: 'Air quality improved by 15%', type: 'success' },
                ].map((alert, idx) => (
                  <div key={idx} className="p-3 bg-card/50 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">{alert.time}</p>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
