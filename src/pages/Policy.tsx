import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, TrendingDown, CheckCircle, AlertCircle, Download, Building2 } from 'lucide-react';

const Policy: React.FC = () => {
  const policies = [
    {
      id: 1,
      name: 'Odd-Even Vehicle Scheme',
      city: 'Delhi',
      implementedDate: '2024-01-15',
      beforeAQI: 387,
      afterAQI: 341,
      reductionPercent: 11.9,
      cost: 50000000,
      healthcareSavings: 280000000,
      status: 'active',
    },
    {
      id: 2,
      name: 'Construction Dust Control',
      city: 'Mumbai',
      implementedDate: '2024-03-01',
      beforeAQI: 156,
      afterAQI: 132,
      reductionPercent: 15.4,
      cost: 35000000,
      healthcareSavings: 180000000,
      status: 'active',
    },
    {
      id: 3,
      name: 'Industrial Emission Standards (BS-VI)',
      city: 'All Major Cities',
      implementedDate: '2023-04-01',
      beforeAQI: 245,
      afterAQI: 198,
      reductionPercent: 19.2,
      cost: 500000000,
      healthcareSavings: 2500000000,
      status: 'active',
    },
  ];

  const cityComparison = [
    { city: 'Bangalore', improvement: 23, baseline: 145, current: 112 },
    { city: 'Hyderabad', improvement: 18, baseline: 178, current: 146 },
    { city: 'Delhi', improvement: 12, baseline: 412, current: 363 },
    { city: 'Mumbai', improvement: 15, baseline: 167, current: 142 },
    { city: 'Chennai', improvement: 21, baseline: 123, current: 97 },
  ];

  const complianceData = [
    { category: 'Industrial', compliant: 78, nonCompliant: 22 },
    { category: 'Construction', compliant: 65, nonCompliant: 35 },
    { category: 'Transport', compliant: 82, nonCompliant: 18 },
    { category: 'Waste Management', compliant: 71, nonCompliant: 29 },
  ];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Policy Impact Dashboard</h1>
          <p className="text-xl text-muted-foreground">Track government interventions and measure their effectiveness</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card p-6 text-center hover-lift">
            <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold text-primary mb-1">24</div>
            <p className="text-sm text-muted-foreground">Active Policies</p>
          </Card>

          <Card className="glass-card p-6 text-center hover-lift">
            <TrendingDown className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-3xl font-bold text-secondary mb-1">16.8%</div>
            <p className="text-sm text-muted-foreground">Avg AQI Reduction</p>
          </Card>

          <Card className="glass-card p-6 text-center hover-lift">
            <CheckCircle className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-3xl font-bold text-accent mb-1">₹3.2B</div>
            <p className="text-sm text-muted-foreground">Healthcare Savings</p>
          </Card>

          <Card className="glass-card p-6 text-center hover-lift">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
            <div className="text-3xl font-bold text-destructive mb-1">1,247</div>
            <p className="text-sm text-muted-foreground">Violations (30d)</p>
          </Card>
        </div>

        {/* Policy Interventions */}
        <Card className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Policy Intervention Tracker</h2>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>

          <div className="space-y-6">
            {policies.map(policy => (
              <div key={policy.id} className="p-6 bg-card/50 rounded-lg border border-border/50 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{policy.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {policy.city} • Implemented {new Date(policy.implementedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                    {policy.status}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-background/50 rounded">
                    <p className="text-sm text-muted-foreground mb-1">Before AQI</p>
                    <p className="text-2xl font-bold text-destructive">{policy.beforeAQI}</p>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded">
                    <p className="text-sm text-muted-foreground mb-1">After AQI</p>
                    <p className="text-2xl font-bold text-secondary">{policy.afterAQI}</p>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded">
                    <p className="text-sm text-muted-foreground mb-1">Reduction</p>
                    <p className="text-2xl font-bold text-primary">{policy.reductionPercent}%</p>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded">
                    <p className="text-sm text-muted-foreground mb-1">ROI</p>
                    <p className="text-2xl font-bold text-accent">
                      {(policy.healthcareSavings / policy.cost).toFixed(1)}x
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Investment:</span>
                    <span className="font-semibold ml-2">₹{(policy.cost / 10000000).toFixed(1)}Cr</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Healthcare Savings:</span>
                    <span className="font-semibold ml-2 text-secondary">
                      ₹{(policy.healthcareSavings / 10000000).toFixed(1)}Cr
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* City Comparison */}
          <Card className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">City-wise Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityComparison}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="city" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="baseline" fill="hsl(var(--destructive))" name="Baseline AQI" />
                <Bar dataKey="current" fill="hsl(var(--secondary))" name="Current AQI" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {cityComparison.slice(0, 3).map(city => (
                <div key={city.city} className="text-center p-2 bg-secondary/10 rounded">
                  <p className="text-xs text-muted-foreground mb-1">{city.city}</p>
                  <p className="text-lg font-bold text-secondary">↓{city.improvement}%</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Compliance Monitoring */}
          <Card className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">Compliance Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Bar dataKey="compliant" stackId="a" fill="hsl(var(--secondary))" name="Compliant" />
                <Bar dataKey="nonCompliant" stackId="a" fill="hsl(var(--destructive))" name="Non-compliant" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Tabs for Additional Info */}
        <Tabs defaultValue="simulator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simulator">Impact Simulator</TabsTrigger>
            <TabsTrigger value="violations">Violations</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="simulator">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Predictive Impact Simulator</h3>
              <p className="text-muted-foreground mb-6">
                Model the potential impact of new policy interventions before implementation
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { policy: 'Ban 10-year+ vehicles', predicted: '-23% AQI', cost: '₹120Cr', timeline: '6 months' },
                  { policy: 'Metro expansion', predicted: '-18% AQI', cost: '₹2,500Cr', timeline: '2 years' },
                  { policy: 'Green belt development', predicted: '-12% AQI', cost: '₹85Cr', timeline: '1 year' },
                ].map((sim, idx) => (
                  <div key={idx} className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <h4 className="font-semibold mb-3">{sim.policy}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Predicted Impact:</span>
                        <span className="font-bold text-secondary">{sim.predicted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Est. Cost:</span>
                        <span className="font-medium">{sim.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="font-medium">{sim.timeline}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3">Run Simulation</Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="violations">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Recent Violations</h3>
              <div className="space-y-3">
                {[
                  { entity: 'XYZ Steel Plant', violation: 'Exceeded SO2 limits', fine: '₹50L', status: 'pending' },
                  { entity: 'ABC Construction Ltd', violation: 'No dust control measures', fine: '₹25L', status: 'paid' },
                  { entity: 'PQR Transport Corp', violation: 'Non-compliant vehicles', fine: '₹15L', status: 'appealed' },
                  { entity: 'DEF Chemicals', violation: 'Midnight emissions', fine: '₹1Cr', status: 'pending' },
                ].map((violation, idx) => (
                  <div key={idx} className="p-4 bg-card/50 rounded-lg border border-border/50 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">{violation.entity}</p>
                      <p className="text-sm text-muted-foreground">{violation.violation}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-destructive mb-1">{violation.fine}</p>
                      <Badge variant={
                        violation.status === 'paid' ? 'secondary' :
                        violation.status === 'pending' ? 'destructive' : 'default'
                      }>
                        {violation.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Policy Recommendations</h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Implement Congestion Pricing',
                    impact: 'High',
                    priority: 'Urgent',
                    description: 'Based on Delhi data, could reduce traffic emissions by 20-25%',
                  },
                  {
                    title: 'Expand Public Transport Network',
                    impact: 'Medium',
                    priority: 'Medium',
                    description: 'Metro and bus network expansion shows 15% reduction in vehicular pollution',
                  },
                  {
                    title: 'Strengthen Industrial Monitoring',
                    impact: 'High',
                    priority: 'High',
                    description: 'Real-time CEMS installation in 847 industries can improve compliance by 30%',
                  },
                ].map((rec, idx) => (
                  <div key={idx} className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <div className="flex gap-2">
                        <Badge variant={rec.priority === 'Urgent' ? 'destructive' : 'default'}>
                          {rec.priority}
                        </Badge>
                        <Badge variant="secondary">{rec.impact} Impact</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Policy;
