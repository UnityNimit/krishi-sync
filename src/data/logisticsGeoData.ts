import { LogisticsGeoData, Warehouse, ProcessingUnit, TransportRoute } from '../types'

export const warehouses: Warehouse[] = [
  {
    id: 'wh-001',
    name: 'Punjab Central Warehouse',
    type: 'warehouse',
    location: {
      lat: 30.7333,
      lng: 76.7794,
      address: 'Chandigarh, Punjab'
    },
    status: 'operational',
    capacity: {
      total: 5000,
      used: 3200,
      available: 1800
    },
    commodities: ['wheat', 'rice', 'chickpea'],
    temperature: 18,
    lastUpdated: '2024-10-24T10:30:00Z'
  },
  {
    id: 'wh-002',
    name: 'Delhi North Distribution Hub',
    type: 'warehouse',
    location: {
      lat: 28.7041,
      lng: 77.1025,
      address: 'North Delhi, Delhi'
    },
    status: 'operational',
    capacity: {
      total: 3500,
      used: 2890,
      available: 610
    },
    commodities: ['wheat', 'pulses', 'mustard'],
    temperature: 20,
    lastUpdated: '2024-10-24T11:00:00Z'
  },
  {
    id: 'wh-003',
    name: 'Haryana Regional Storage',
    type: 'warehouse',
    location: {
      lat: 29.0588,
      lng: 76.0856,
      address: 'Karnal, Haryana'
    },
    status: 'maintenance',
    capacity: {
      total: 4200,
      used: 1200,
      available: 3000
    },
    commodities: ['rice', 'wheat'],
    temperature: 19,
    lastUpdated: '2024-10-24T09:15:00Z'
  },
  {
    id: 'wh-004',
    name: 'Rajasthan FPO Warehouse',
    type: 'warehouse',
    location: {
      lat: 26.9124,
      lng: 75.7873,
      address: 'Jaipur, Rajasthan'
    },
    status: 'operational',
    capacity: {
      total: 2800,
      used: 2100,
      available: 700
    },
    commodities: ['mustard', 'chickpea', 'wheat'],
    temperature: 22,
    lastUpdated: '2024-10-24T10:45:00Z'
  },
  {
    id: 'wh-005',
    name: 'Uttar Pradesh Central',
    type: 'warehouse',
    location: {
      lat: 26.8467,
      lng: 80.9462,
      address: 'Lucknow, Uttar Pradesh'
    },
    status: 'operational',
    capacity: {
      total: 6000,
      used: 4500,
      available: 1500
    },
    commodities: ['wheat', 'rice', 'pulses', 'chickpea'],
    temperature: 21,
    lastUpdated: '2024-10-24T11:20:00Z'
  },
  {
    id: 'wh-006',
    name: 'Maharashtra South Depot',
    type: 'warehouse',
    location: {
      lat: 18.5204,
      lng: 73.8567,
      address: 'Pune, Maharashtra'
    },
    status: 'critical',
    capacity: {
      total: 4500,
      used: 4450,
      available: 50
    },
    commodities: ['rice', 'chickpea', 'pulses'],
    temperature: 24,
    lastUpdated: '2024-10-24T10:00:00Z'
  }
]

export const processingUnits: ProcessingUnit[] = [
  {
    id: 'pu-001',
    name: 'GreenMill Processing Plant',
    type: 'processing',
    location: {
      lat: 28.4595,
      lng: 77.0266,
      address: 'Gurgaon, Haryana'
    },
    status: 'operational',
    throughput: {
      current: 180,
      capacity: 250,
      efficiency: 72
    },
    commodities: ['wheat', 'rice'],
    activeBatches: 6,
    lastUpdated: '2024-10-24T11:30:00Z'
  },
  {
    id: 'pu-002',
    name: 'Delhi Food Processing Hub',
    type: 'processing',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Central Delhi, Delhi'
    },
    status: 'operational',
    throughput: {
      current: 210,
      capacity: 300,
      efficiency: 70
    },
    commodities: ['chickpea', 'pulses', 'mustard'],
    activeBatches: 8,
    lastUpdated: '2024-10-24T11:15:00Z'
  },
  {
    id: 'pu-003',
    name: 'Punjab Grain Processor',
    type: 'processing',
    location: {
      lat: 31.3260,
      lng: 75.5762,
      address: 'Jalandhar, Punjab'
    },
    status: 'operational',
    throughput: {
      current: 195,
      capacity: 220,
      efficiency: 89
    },
    commodities: ['wheat', 'rice'],
    activeBatches: 5,
    lastUpdated: '2024-10-24T10:50:00Z'
  },
  {
    id: 'pu-004',
    name: 'Rajasthan Oil Mill',
    type: 'processing',
    location: {
      lat: 27.0238,
      lng: 75.5262,
      address: 'Ajmer, Rajasthan'
    },
    status: 'maintenance',
    throughput: {
      current: 0,
      capacity: 150,
      efficiency: 0
    },
    commodities: ['mustard'],
    activeBatches: 0,
    lastUpdated: '2024-10-24T08:00:00Z'
  },
  {
    id: 'pu-005',
    name: 'Maharashtra Processing Complex',
    type: 'processing',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Mumbai, Maharashtra'
    },
    status: 'operational',
    throughput: {
      current: 280,
      capacity: 350,
      efficiency: 80
    },
    commodities: ['rice', 'pulses', 'chickpea'],
    activeBatches: 9,
    lastUpdated: '2024-10-24T11:40:00Z'
  }
]

export const transportRoutes: TransportRoute[] = [
  {
    id: 'rt-001',
    name: 'Punjab to Delhi Express',
    type: 'route',
    status: 'active',
    commodity: 'wheat',
    origin: {
      lat: 30.7333,
      lng: 76.7794,
      name: 'Punjab Central Warehouse'
    },
    destination: {
      lat: 28.7041,
      lng: 77.1025,
      name: 'Delhi North Distribution Hub'
    },
    waypoints: [
      { lat: 30.3752, lng: 76.7821 },
      { lat: 29.9457, lng: 76.8180 },
      { lat: 29.1492, lng: 77.0410 }
    ],
    mode: 'truck',
    distance: 320,
    estimatedTime: '6 hours',
    progress: 68,
    vehicleId: 'TRK-114',
    lastUpdated: '2024-10-24T11:00:00Z'
  },
  {
    id: 'rt-002',
    name: 'Haryana to Processing Hub',
    type: 'route',
    status: 'active',
    commodity: 'rice',
    origin: {
      lat: 29.0588,
      lng: 76.0856,
      name: 'Haryana Regional Storage'
    },
    destination: {
      lat: 28.4595,
      lng: 77.0266,
      name: 'GreenMill Processing Plant'
    },
    waypoints: [
      { lat: 28.8386, lng: 76.6131 },
      { lat: 28.5355, lng: 76.8468 }
    ],
    mode: 'truck',
    distance: 145,
    estimatedTime: '3 hours',
    progress: 45,
    vehicleId: 'TRK-208',
    lastUpdated: '2024-10-24T10:45:00Z'
  },
  {
    id: 'rt-003',
    name: 'Jaipur to Lucknow Corridor',
    type: 'route',
    status: 'delayed',
    commodity: 'chickpea',
    origin: {
      lat: 26.9124,
      lng: 75.7873,
      name: 'Rajasthan FPO Warehouse'
    },
    destination: {
      lat: 26.8467,
      lng: 80.9462,
      name: 'Uttar Pradesh Central'
    },
    waypoints: [
      { lat: 27.1767, lng: 78.0081 },
      { lat: 27.0974, lng: 79.8437 }
    ],
    mode: 'truck',
    distance: 580,
    estimatedTime: '12 hours',
    progress: 35,
    vehicleId: 'TRK-335',
    lastUpdated: '2024-10-24T09:30:00Z'
  },
  {
    id: 'rt-004',
    name: 'Delhi to Pune Express',
    type: 'route',
    status: 'scheduled',
    commodity: 'pulses',
    origin: {
      lat: 28.6139,
      lng: 77.2090,
      name: 'Delhi Food Processing Hub'
    },
    destination: {
      lat: 18.5204,
      lng: 73.8567,
      name: 'Maharashtra South Depot'
    },
    waypoints: [
      { lat: 26.8467, lng: 75.8099 },
      { lat: 23.0225, lng: 72.5714 },
      { lat: 19.9975, lng: 73.7898 }
    ],
    mode: 'truck',
    distance: 1450,
    estimatedTime: '24 hours',
    progress: 0,
    vehicleId: 'TRK-442',
    lastUpdated: '2024-10-24T07:00:00Z'
  },
  {
    id: 'rt-005',
    name: 'Punjab to Processing',
    type: 'route',
    status: 'active',
    commodity: 'wheat',
    origin: {
      lat: 31.3260,
      lng: 75.5762,
      name: 'Punjab Grain Processor'
    },
    destination: {
      lat: 30.7333,
      lng: 76.7794,
      name: 'Punjab Central Warehouse'
    },
    waypoints: [
      { lat: 31.0820, lng: 76.2673 }
    ],
    mode: 'truck',
    distance: 150,
    estimatedTime: '3 hours',
    progress: 82,
    vehicleId: 'TRK-519',
    lastUpdated: '2024-10-24T11:25:00Z'
  },
  {
    id: 'rt-006',
    name: 'Mumbai Processing Delivery',
    type: 'route',
    status: 'completed',
    commodity: 'rice',
    origin: {
      lat: 19.0760,
      lng: 72.8777,
      name: 'Maharashtra Processing Complex'
    },
    destination: {
      lat: 18.5204,
      lng: 73.8567,
      name: 'Maharashtra South Depot'
    },
    waypoints: [
      { lat: 18.9220, lng: 72.8347 }
    ],
    mode: 'truck',
    distance: 120,
    estimatedTime: '2.5 hours',
    progress: 100,
    vehicleId: 'TRK-627',
    lastUpdated: '2024-10-24T09:00:00Z'
  }
]

export const logisticsGeoData: LogisticsGeoData = {
  warehouses,
  processingUnits,
  routes: transportRoutes
}
