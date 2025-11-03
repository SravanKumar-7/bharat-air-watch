# 🌍 AirSense India - AI-Powered Urban Air Quality Intelligence Platform

A comprehensive, production-ready web application for monitoring air quality across India using AI predictions, real-time sensor data, and citizen science gamification.

## ✨ Features

### 🏠 Landing Page
- Animated hero section with particle effects
- Live AQI ticker for major Indian cities
- Death toll counter animation
- Feature highlights with smooth animations
- Responsive design with glassmorphism effects

### 📊 Dashboard
- **Interactive Map**: Leaflet-based pollution heatmap with clickable sensors
- **Real-time Data**: Simulated live updates every 30 seconds
- **City Selector**: Switch between 10+ major Indian cities
- **Pollutant Breakdown**: Pie chart showing PM2.5, PM10, NO2, SO2, CO, O3
- **24-Hour Forecast**: Line chart with hourly predictions
- **Health Recommendations**: Personalized advice based on AQI levels
- **Weather Integration**: Temperature, humidity, wind speed
- **Recent Alerts**: Time-stamped notifications

### 🔮 AI Predictions
- **72-Hour Forecast**: Complete hourly predictions
- **Time Machine Slider**: View predictions at any future time
- **Model Accuracy**: 89.3% average with confidence metrics
- **Source Attribution**: Breakdown by Vehicular, Industrial, Construction, Biomass
- **Historical Comparison**: Predicted vs Actual charts
- **Methodology**: Detailed explanation of AI model

### 🎮 AirWarriors (Gamification)
- **User Profile**: Level, points, achievements, progress bars
- **Leaderboard**: Top 10 rankings with individual/school/neighborhood tabs
- **Active Missions**: Progress tracking with rewards
- **Pollution Reporting**: Photo upload interface for citizen reports
- **Community Impact**: Collective CO₂ reduction, trees planted
- **Prize Pool**: Monthly rewards for top performers

### 🏛️ Policy Impact Dashboard
- **Policy Tracker**: Before/After AQI comparison
- **ROI Calculator**: Investment vs Healthcare Savings
- **City Comparison**: Performance across multiple cities
- **Compliance Monitoring**: Industry-wise compliance status
- **Impact Simulator**: Predict effects of new policies
- **Violation Tracker**: Recent non-compliance cases
- **Recommendations**: AI-generated policy suggestions

## 🎨 Design System

### Color Palette
- **AQI Scale**: Good (Green) → Satisfactory (Yellow) → Moderate (Orange) → Poor (Red) → Very Poor (Purple) → Severe (Maroon)
- **Primary**: Deep Blue (#1E40AF)
- **Secondary**: Green (#10B981)
- **Accent**: Orange (#F59E0B)
- **Background**: Dark theme optimized

### Typography
- **Headings**: Poppins (Bold, 700)
- **Body**: Inter (Regular, 400)
- **Numbers**: JetBrains Mono (Monospace)

### Custom Components
- `glass-card`: Glassmorphism effect
- `aqi-badge`: Color-coded AQI pills
- `hover-lift`: Smooth hover animations
- `pulse-glow`: Pulsing glow effect
- `gradient-text`: Gradient text effect

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Maps**: React Leaflet
- **Icons**: Lucide React
- **Routing**: React Router
- **UI Components**: shadcn/ui
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── AQIBadge.tsx         # Reusable AQI badge component
│   │   └── Navbar.tsx            # Navigation with dark mode toggle
│   └── ui/                       # shadcn components
├── pages/
│   ├── Landing.tsx               # Hero page with animations
│   ├── Dashboard.tsx             # Main dashboard with map
│   ├── Predictions.tsx           # AI predictions interface
│   ├── AirWarriors.tsx          # Gamification page
│   ├── Policy.tsx                # Policy impact tracker
│   └── NotFound.tsx              # 404 page
├── data/
│   └── mockData.ts               # Comprehensive mock data
├── assets/
│   └── hero-pollution.jpg        # Hero image
├── index.css                     # Design system tokens
└── App.tsx                       # Main app with routing
```

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📊 Mock Data Features

- **10 Cities**: Delhi, Mumbai, Hyderabad, Bangalore, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Lucknow
- **100+ Sensors**: Realistic sensor locations across Hyderabad
- **72-Hour Forecast**: Hourly predictions with confidence scores
- **Leaderboard**: Top 10 AirWarriors with avatars
- **Missions**: 4 active missions with progress tracking
- **Reports**: Community pollution reports with images
- **Policies**: 3 major government interventions with metrics

## 🎯 Key Interactions

1. **Real-time Updates**: Data refreshes every 30 seconds
2. **Animated Counters**: Death toll and stats count up on load
3. **Smooth Transitions**: Page transitions with framer-motion
4. **Interactive Map**: Click sensors for detailed popups
5. **Time Slider**: Slide through 72-hour forecast
6. **Responsive Design**: Mobile-first, works on all devices
7. **Dark Mode**: Toggle between light/dark themes

## 🌟 Highlights

- ✅ Production-ready code with TypeScript
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ SEO optimized with proper meta tags
- ✅ Accessible with semantic HTML
- ✅ Performance optimized with lazy loading
- ✅ Comprehensive design system
- ✅ Realistic mock data simulation
- ✅ Professional animations and transitions

## 📈 Performance

- Fast initial load with code splitting
- Optimized images with proper sizing
- Lazy loaded routes
- Memoized expensive components
- Debounced search inputs

## 🎓 Educational Value

Perfect demonstration of:
- Modern React patterns (hooks, context)
- TypeScript best practices
- Tailwind CSS mastery
- Chart visualization
- Map integration
- Animation techniques
- Gamification UX
- Data dashboard design

## 🔮 Future Enhancements

Potential additions (not implemented):
- Backend integration with real sensors
- User authentication
- Social sharing
- Push notifications
- PWA capabilities
- Multi-language support (i18n)
- Data export (PDF, CSV)
- Advanced filtering
- Custom alerts
- Mobile app (React Native)

## 📝 License

This is a demo project created for educational purposes.

## 🤝 Contributing

This is a Lovable-generated project. Feel free to fork and customize!

---

Built with ❤️ using Lovable AI
