# AgriAdvisory Platform

A modern agricultural advisory platform providing AI-powered insights for crop planning, pest management, and financial services.

## Features

### 🌾 Crop Advisory Module
- **Crop Recommendations**: AI-powered crop selection based on soil, weather, and market data
- **Seasonal Advisories**: Timely action items for irrigation, fertilization, and pest control
- **Pest Predictions**: Predictive analytics for pest outbreak prevention with detailed mitigation strategies

### 💳 Credit & Insurance Module
- **Credit Eligibility Assessment**: AI-driven credit scoring with detailed factor breakdown
- **Loan Pre-approval**: Instant eligibility check with personalized loan terms
- **Insurance Plans**: Multiple crop insurance options with coverage comparison
- **Next Steps Guidance**: Clear workflow for application and approval process

### ☁️ Weather Intelligence
- **Server-side weather integration** with OpenWeatherMap via cached Vite middleware
- **Forecast snapshots & warning badges** rendered across the dashboard and stakeholder views
- **Resilient fallbacks** that gracefully switch to simulated weather data when live APIs are unavailable

### 🔗 Blockchain Traceability
- **Supply Chain Tracking**: Farm-to-fork traceability with cryptographic verification
- **QR Code Generation**: Generate scannable codes for batch tracking
- **Hash Chain Verification**: Immutable blockchain-style event logging with SHA-256 hashing
- **Event Timeline**: Chronological view of all supply chain steps from planting to retail
- **Integrity Verification**: Automated detection of any tampering or data modification
- **Educational UI**: Clear explanations of how blockchain traceability works

### 🗺️ Warehouse & Logistics Visibility Map
- **Interactive Geospatial View**: Leaflet-based map showing entire supply chain network
- **Warehouse Tracking**: Real-time capacity monitoring, temperature control, and commodity storage
- **Processing Units**: Throughput metrics, efficiency tracking, and batch management
- **Transport Routes**: Live tracking of shipments with progress indicators and status updates
- **Advanced Filtering**: Filter by commodity type, operational status, or entity type
- **Rich Tooltips**: Detailed information popups with capacity bars, metrics, and status badges
- **Status Indicators**: Color-coded markers and routes for instant visibility into operations

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Maps**: Leaflet with React-Leaflet

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Weather API configuration

The platform reads live conditions from OpenWeatherMap via a lightweight Vite middleware exposed at `/api/weather`.

- Provide an API key through the `OPENWEATHER_API_KEY` environment variable when running `npm run dev` or `npm run preview`.
- Responses are cached in-memory for 10 minutes to minimise API calls during demos.
- When the key is missing or a request fails, the middleware automatically falls back to rich simulated data from `src/data/weatherMock.ts` so the experience remains uninterrupted.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/      # Reusable React components
│   ├── LogisticsMap.tsx     # Interactive map component
│   └── MapLegend.tsx        # Map legend component
├── data/            # Mock and fallback datasets
│   ├── logisticsGeoData.ts  # Geospatial logistics data
│   ├── traceabilityData.ts  # Blockchain demo batches
│   └── weatherMock.ts       # Weather fallback data
├── hooks/           # Custom React hooks (e.g., weather data)
├── pages/           # Main routed views
│   ├── Dashboard.tsx
│   ├── CropAdvisory.tsx
│   ├── CreditInsurance.tsx
│   ├── StakeholderDashboards.tsx  # Includes logistics map
│   ├── Marketplace.tsx
│   └── Traceability.tsx     # Blockchain traceability module
├── types/           # Shared TypeScript interfaces
├── utils/           # Formatting helpers and style utilities
│   └── blockchain.ts        # Hashing and verification utilities
├── App.tsx          # Main application component
├── index.css        # Global styles
└── main.tsx         # Application entry point
server/
└── weatherRoutes.ts # Vite middleware exposing cached weather API
```

## Features Demo

### Crop Advisory
- View personalized crop recommendations with suitability scores
- Track seasonal advisories with priority levels
- Monitor pest predictions with preventive measures

### Credit & Insurance
- Check credit eligibility with detailed scoring
- Compare insurance plans with benefit breakdowns
- Follow guided application workflows

### Blockchain Traceability
- Create new production batches with QR codes
- View complete farm-to-fork journey for each batch
- Verify blockchain integrity with hash chain validation
- Understand how cryptographic hashing prevents supply chain fraud
- Track events like planting, harvesting, processing, and distribution

### Warehouse & Logistics Map
- Visualize entire supply chain network on an interactive map
- Track warehouse capacity utilization and temperature in real-time
- Monitor processing unit throughput and efficiency
- Follow active transport routes with live progress updates
- Filter by commodity types or operational status
- Click markers for detailed facility and shipment information

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Demo Data

The application uses mock data to demonstrate functionality. In production, this would be replaced with real API calls to:
- Weather services
- Soil analysis systems
- Market price databases
- Credit scoring engines
- Insurance providers

Weather fallbacks used by the `/api/weather` endpoint are defined in `src/data/weatherMock.ts`.

## License

MIT
