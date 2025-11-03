import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { userProfile, leaderboard, missions, pollutionReports } from '@/data/mockData';
import { Trophy, TrendingUp, TrendingDown, Camera, Upload, Award, Target, Zap, Users } from 'lucide-react';

const AirWarriors: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('individual');

  const progressToNextLevel = (userProfile.points % 500) / 5;

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="gradient-text">AirWarriors</span> Gamification
            </h1>
            <p className="text-xl text-muted-foreground">Fight pollution, earn rewards, climb the leaderboard</p>
          </motion.div>
        </div>

        {/* User Profile Card */}
        <Card className="glass-card p-6 mb-8 hover-lift">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name}
                className="w-24 h-24 rounded-full border-4 border-primary"
              />
              <Badge className="absolute -bottom-2 -right-2 text-xs font-bold">
                Level {userProfile.level}
              </Badge>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-1">{userProfile.name}</h2>
              <p className="text-lg text-primary font-semibold mb-2">{userProfile.levelName}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {userProfile.achievements.map(achievement => (
                  <Badge key={achievement} variant="secondary" className="gap-1">
                    <Award className="w-3 h-3" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">{userProfile.points.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mb-3">Total Points</p>
              <div className="w-48">
                <Progress value={progressToNextLevel} className="mb-2" />
                <p className="text-xs text-muted-foreground">
                  {500 - (userProfile.points % 500)} points to Level {userProfile.level + 1}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <div className="flex items-center gap-2 text-secondary">
              <Zap className="w-5 h-5" />
              <p className="font-semibold">Impact This Month: You've helped reduce 127kg CO₂</p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold">Leaderboard</h2>
              </div>

              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="individual">Individual</TabsTrigger>
                  <TabsTrigger value="schools">Schools</TabsTrigger>
                  <TabsTrigger value="neighborhoods">Neighborhoods</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                {leaderboard.map((user, idx) => (
                  <motion.div
                    key={user.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-4 rounded-lg border ${
                      user.rank <= 3 ? 'bg-accent/10 border-accent/30' : 'bg-card/50 border-border/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl font-bold ${
                        user.rank === 1 ? 'text-yellow-500' :
                        user.rank === 2 ? 'text-gray-400' :
                        user.rank === 3 ? 'text-orange-600' :
                        'text-muted-foreground'
                      }`}>
                        {user.rank <= 3 ? <Trophy className="w-8 h-8" /> : `#${user.rank}`}
                      </div>

                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />

                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.points.toLocaleString()} points</p>
                      </div>

                      <div className={`flex items-center gap-1 text-sm font-medium ${
                        user.weeklyChange > 0 ? 'text-secondary' : 'text-destructive'
                      }`}>
                        {user.weeklyChange > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(user.weeklyChange)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                <p className="font-semibold text-primary">You are ranked #47 in Hyderabad</p>
                <p className="text-sm text-muted-foreground mt-1">Keep going to reach top 10!</p>
              </div>
            </Card>

            {/* Pollution Reporting */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Camera className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Report Pollution</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Button variant="outline" className="h-32 flex-col gap-2">
                  <Camera className="w-8 h-8" />
                  <span>Take Photo</span>
                </Button>
                <Button variant="outline" className="h-32 flex-col gap-2">
                  <Upload className="w-8 h-8" />
                  <span>Upload Photo</span>
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Recent Community Reports</h3>
                {pollutionReports.map(report => (
                  <div key={report.id} className="flex gap-4 p-3 bg-card/50 rounded-lg border border-border/50">
                    <img 
                      src={report.imageUrl} 
                      alt={report.location}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium">{report.location}</p>
                        {report.verified && (
                          <Badge variant="secondary" className="text-xs">✓ Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{new Date(report.timestamp).toLocaleString()}</span>
                        <span>👍 {report.upvotes} upvotes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Missions */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-6 h-6 text-accent" />
                <h2 className="text-xl font-bold">Active Missions</h2>
              </div>

              <div className="space-y-4">
                {missions.map(mission => (
                  <div key={mission.id} className="p-4 bg-card/50 rounded-lg border border-border/50 hover-lift">
                    <h3 className="font-semibold mb-1">{mission.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{mission.description}</p>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{mission.progress}/{mission.total}</span>
                      </div>
                      <Progress value={(mission.progress / mission.total) * 100} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-accent font-medium">{mission.reward}</span>
                      <Button size="sm" variant={mission.progress === mission.total ? 'default' : 'outline'}>
                        {mission.progress === mission.total ? 'Claim' : 'Continue'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Community Impact */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-6 h-6 text-secondary" />
                <h2 className="text-xl font-bold">Community Impact</h2>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="text-3xl font-bold text-secondary mb-1">1,247</div>
                  <p className="text-sm text-muted-foreground">Trees Planted</p>
                </div>

                <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-1">2,847kg</div>
                  <p className="text-sm text-muted-foreground">CO₂ Reduced This Month</p>
                </div>

                <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-3xl font-bold text-accent mb-1">12,458</div>
                  <p className="text-sm text-muted-foreground">Active AirWarriors</p>
                </div>
              </div>
            </Card>

            {/* Prize Pool */}
            <Card className="glass-card p-6 bg-gradient-to-br from-accent/20 to-accent/5">
              <h3 className="text-xl font-bold mb-4">🎁 Monthly Prize Pool</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Top 3:</span>
                  <span className="font-semibold">₹10,000 Metro Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Top 10:</span>
                  <span className="font-semibold">Air Purifier</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Top 50:</span>
                  <span className="font-semibold">100 Saplings</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirWarriors;
