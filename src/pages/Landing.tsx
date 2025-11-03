import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wind, TrendingUp, Users, Shield, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AQIBadge from '@/components/common/AQIBadge';
import { cities } from '@/data/mockData';
import heroImage from '@/assets/hero-pollution.jpg';

const Landing: React.FC = () => {
  const [deathCount, setDeathCount] = useState(0);

  useEffect(() => {
    const target = 1200000;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDeathCount(target);
        clearInterval(timer);
      } else {
        setDeathCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: MapPin, title: 'Real-time Monitoring', description: '847 sensors across 12 cities tracking air quality 24/7' },
    { icon: TrendingUp, title: 'AI Predictions', description: '72-hour forecast with 89% accuracy using advanced ML models' },
    { icon: Users, title: 'Community Action', description: '12,458 active citizens reporting pollution and taking action' },
    { icon: Shield, title: 'Policy Impact', description: 'Track government interventions and their effectiveness' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Breathe Aware,
              <br />
              <span className="gradient-text">Breathe Better</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              AI-powered urban air quality intelligence platform empowering India to combat pollution
            </p>

            {/* Death Counter */}
            <motion.div
              className="glass-card inline-block px-8 py-4 mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-sm text-muted-foreground mb-2">Annual deaths from air pollution in India</p>
              <p className="text-4xl md:text-5xl font-mono font-bold text-destructive">
                {deathCount.toLocaleString()}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 text-lg px-8">
                  Check Your City <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/airwarriors">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                  Join AirWarriors <Users className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Live AQI Ticker */}
            <div className="glass-card p-6 max-w-4xl mx-auto">
              <p className="text-sm text-muted-foreground mb-4 font-semibold">LIVE AQI ACROSS INDIA</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {cities.slice(0, 6).map(city => (
                  <div key={city.id} className="text-center">
                    <p className="text-sm font-medium mb-2">{city.name}</p>
                    <AQIBadge aqi={city.currentAQI} size="sm" showLabel={false} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-destructive/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Powered by AI, Driven by Community</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combining cutting-edge technology with citizen action to create cleaner air
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card p-6 hover-lift h-full">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of citizens monitoring air quality and driving change in their communities
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-8">
                Get Started <Wind className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
