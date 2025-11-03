import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import AQIBadge from '@/components/common/AQIBadge';
import { generateForecast } from '@/data/mockData';
import { TrendingUp, Target, Brain, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Predictions: React.FC = () => {
  const [timeOffset, setTimeOffset] = useState(0);
  const forecast = generateForecast();

  const sourceData = [
    { source: 'Vehicular', percentage: 45, color: 'hsl(var(--aqi-poor))' },
    { source: 'Industrial', percentage: 25, color: 'hsl(var(--aqi-very-poor))' },
    { source: 'Construction', percentage: 18, color: 'hsl(var(--aqi-moderate))' },
    { source: 'Biomass', percentage: 12, color: 'hsl(var(--aqi-satisfactory))' },
  ];

  const accuracyData = forecast.slice(0, 72).map((item, idx) => ({
    hour: idx,
    accuracy: (item.confidence * 100).toFixed(1),
  }));

  const currentPrediction = forecast[timeOffset];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">AI-Powered Predictions</h1>
          <p className="text-xl text-muted-foreground">Forecasting air quality 72 hours ahead with ML</p>
        </div>

        {/* Time Slider */}
        <Card className="glass-card p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Brain className="w-6 h-6 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold">Prediction Time Machine</h3>
              <p className="text-sm text-muted-foreground">Slide to view predictions at different times</p>
            </div>
            <AQIBadge aqi={Math.round(currentPrediction.predictedAQI)} size="md" />
          </div>
          <div className="space-y-4">
            <Slider
              value={[timeOffset]}
              onValueChange={([value]) => setTimeOffset(value)}
              max={71}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Now</span>
              <span className="font-medium">
                +{timeOffset}h ({new Date(currentPrediction.timestamp).toLocaleString('en-IN', { 
                  month: 'short', 
                  day: 'numeric', 
                  hour: '2-digit' 
                })})
              </span>
              <span className="text-muted-foreground">+72h</span>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Forecast Chart */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                72-Hour Forecast
              </h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).getHours() + 'h'}
                  tick={{ fontSize: 11 }}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                  formatter={(value: number) => [Math.round(value), 'AQI']}
                />
                <Line 
                  type="monotone" 
                  dataKey="predictedAQI" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Confidence Metrics */}
          <Card className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-secondary" />
              <h3 className="text-xl font-bold">Model Accuracy</h3>
            </div>
            <div className="mb-6">
              <div className="text-5xl font-bold text-secondary mb-2">89.3%</div>
              <p className="text-sm text-muted-foreground">Average prediction accuracy over last 30 days</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} label={{ value: 'Hours Ahead', position: 'insideBottom', offset: -5 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[80, 95]} />
                <Tooltip formatter={(value: string) => [`${value}%`, 'Confidence']} />
                <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--secondary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Pollution Sources */}
        <Card className="glass-card p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">Pollution Source Attribution</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis type="number" domain={[0, 50]} tick={{ fontSize: 11 }} />
                <YAxis dataKey="source" type="category" tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Contribution']} />
                <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]}>
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="space-y-4">
              {sourceData.map(source => (
                <div key={source.source} className="glass-card p-4 hover-lift">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{source.source}</span>
                    <span className="text-2xl font-bold" style={{ color: source.color }}>
                      {source.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${source.percentage}%`, backgroundColor: source.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="comparison">Historical Comparison</TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
          </TabsList>

          <TabsContent value="insights">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Key Prediction Insights</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Peak Pollution', value: 'Tomorrow 8 AM', desc: 'Expected AQI of 287 during morning rush' },
                  { title: 'Best Air Quality', value: 'In 48 hours', desc: 'AQI expected to drop to 98 due to rainfall' },
                  { title: 'High Risk Period', value: 'Next 12 hours', desc: 'Stable weather conditions, no dispersion' },
                  { title: 'Improvement Trend', value: 'Weekend', desc: 'Reduced traffic expected to lower AQI by 15%' },
                ].map((insight, idx) => (
                  <div key={idx} className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">{insight.title}</p>
                    <p className="text-lg font-bold mb-2">{insight.value}</p>
                    <p className="text-sm text-muted-foreground">{insight.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Prediction vs Actual (Last 7 Days)</h3>
              <p className="text-muted-foreground mb-6">
                Our ML model consistently outperforms traditional forecasting methods
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecast.slice(0, 168).map((f, idx) => ({
                  hour: idx,
                  predicted: f.predictedAQI,
                  actual: f.predictedAQI + (Math.random() - 0.5) * 20,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={2} name="Predicted" />
                  <Line type="monotone" dataKey="actual" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="5 5" name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="methodology">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Our AI Prediction Model</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our prediction system uses advanced machine learning algorithms trained on 5 years of historical data from 847 sensors across India.
                </p>
                <div className="grid md:grid-cols-3 gap-4 my-6">
                  {[
                    { label: 'Data Points', value: '50M+' },
                    { label: 'Update Frequency', value: '15 min' },
                    { label: 'Model Accuracy', value: '89.3%' },
                  ].map(stat => (
                    <div key={stat.label} className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <p>
                  The model considers meteorological data (wind speed, temperature, humidity), traffic patterns, industrial activity, construction zones, and seasonal trends to generate highly accurate forecasts.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Predictions;
