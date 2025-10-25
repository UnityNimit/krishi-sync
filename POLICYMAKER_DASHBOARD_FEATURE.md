# Policymaker Intelligence Dashboard Feature

## Overview
The Policymaker Intelligence Dashboard provides strategic insights on agricultural production, import dependency, processing capacity, and market trends to support evidence-based policy decisions.

## Route
`/dashboard/policymaker`

## Key Features

### 1. KPI Tiles
Four primary metrics displayed prominently:
- **Import Dependency**: Percentage showing reliance on external sources with color-coded severity
- **Production Targets**: Total production targets vs actual achievement rates
- **Processing Capacity**: Total processing capacity with utilization percentage
- **Import Reduction**: Quarterly trend showing progress on reducing imports

### 2. Data Filters
- **State Filter**: Filter data by specific state or view all states
- **Season Filter**: Filter by agricultural season (Kharif, Rabi, Zaid) or view all seasons
- Filters apply to all visualizations and KPIs dynamically

### 3. Trend Charts

#### Production vs Demand Analysis
- Line chart showing production and demand over 6 months
- Helps identify supply-demand gaps
- Aggregates data across selected filters

#### Import Reduction Trend
- Bar chart showing quarterly import volumes and target reductions
- Tracks progress toward reducing import dependency
- Shows historical performance

#### Crop Production Distribution
- Pie chart showing current production by commodity
- Color-coded by crop type
- Displays percentage distribution

### 4. Supply Chain Infrastructure Map
- Interactive map powered by Leaflet/React-Leaflet
- Displays warehouses, processing units, and logistics routes
- Reuses LogisticsMap component from stakeholder dashboards
- Provides geospatial overview of supply chain infrastructure

### 5. Narrative Insights & Policy Recommendations
Four insight cards with contextual analysis:
- **Regional Production Gaps**: Analysis of production vs targets
- **Processing Capacity Utilization**: Infrastructure efficiency assessment
- **Import Dependency Strategy**: Strategic recommendations based on dependency levels
- **Seasonal Considerations**: Timing and demand pattern insights

Each card provides:
- Context-aware text based on current filter selections
- Automated recommendations based on KPI thresholds
- Action-oriented guidance for policymakers

### 6. Export & Analysis Actions
- Export Report button for PDF/document generation (placeholder)
- Full Analysis button for detailed reports (placeholder)

## Data Structure

### Data File: `/src/data/policymakerData.ts`

Each data point includes:
- Crop type and location (state)
- Season (Kharif, Rabi, Zaid)
- Import dependency percentage
- Production targets and actuals
- Processing capacity and utilization
- Monthly production vs demand data
- Quarterly import reduction trends

Currently includes data for 8 major crops:
- Wheat, Rice, Maize, Chickpea, Mustard, Cotton, Sugarcane, Soybean

Covers 10 major agricultural states:
- Punjab, Haryana, Uttar Pradesh, Madhya Pradesh, Maharashtra, Karnataka, West Bengal, Rajasthan, Gujarat, Tamil Nadu

## Component Structure

### Main Component
`/src/pages/PolicymakerDashboard.tsx`

### Dependencies
- React hooks (useState for filters)
- Recharts components (LineChart, BarChart, PieChart)
- Lucide React icons
- LogisticsMap component (reused from stakeholder dashboards)
- Logistics geo data (warehouses, processing units, routes)

## Navigation
Added to main navigation bar with Brain icon
Accessible from any page via the top navigation menu

## Styling
- Follows existing card-based layout pattern
- Uses Tailwind CSS with gradient backgrounds
- Color-coded KPI cards (red, blue, green, purple)
- Responsive grid layouts
- Consistent with other dashboard pages

## Future Enhancements
- Connect to real API endpoints instead of mock data
- Implement actual PDF export functionality
- Add more granular filters (date ranges, specific crops)
- Real-time data updates
- Downloadable data tables
- Comparative analysis across years
- Alert system for critical thresholds
