export interface PolicymakerDataPoint {
  id: string
  crop: string
  state: string
  season: 'Kharif' | 'Rabi' | 'Zaid'
  importDependency: number
  productionTarget: number
  productionActual: number
  processingCapacity: number
  processingUtilization: number
  productionVsDemand: Array<{
    month: string
    production: number
    demand: number
  }>
  importReduction: Array<{
    quarter: string
    importVolume: number
    targetReduction: number
  }>
}

export const statesList = [
  'Punjab',
  'Haryana',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Maharashtra',
  'Karnataka',
  'West Bengal',
  'Rajasthan',
  'Gujarat',
  'Tamil Nadu'
]

export const seasonsList = ['Kharif', 'Rabi', 'Zaid']

export const policymakerData: PolicymakerDataPoint[] = [
  {
    id: 'pm-1',
    crop: 'Wheat',
    state: 'Punjab',
    season: 'Rabi',
    importDependency: 5.2,
    productionTarget: 18500,
    productionActual: 17800,
    processingCapacity: 12000,
    processingUtilization: 78.5,
    productionVsDemand: [
      { month: 'Oct', production: 1200, demand: 1350 },
      { month: 'Nov', production: 1800, demand: 1650 },
      { month: 'Dec', production: 2200, demand: 1950 },
      { month: 'Jan', production: 2800, demand: 2400 },
      { month: 'Feb', production: 3200, demand: 2800 },
      { month: 'Mar', production: 3600, demand: 3100 }
    ],
    importReduction: [
      { quarter: 'Q1 2024', importVolume: 950, targetReduction: 150 },
      { quarter: 'Q2 2024', importVolume: 820, targetReduction: 180 },
      { quarter: 'Q3 2024', importVolume: 680, targetReduction: 200 },
      { quarter: 'Q4 2024', importVolume: 520, targetReduction: 220 }
    ]
  },
  {
    id: 'pm-2',
    crop: 'Rice',
    state: 'West Bengal',
    season: 'Kharif',
    importDependency: 12.8,
    productionTarget: 16000,
    productionActual: 15200,
    processingCapacity: 10500,
    processingUtilization: 82.3,
    productionVsDemand: [
      { month: 'Jun', production: 1100, demand: 1400 },
      { month: 'Jul', production: 1600, demand: 1550 },
      { month: 'Aug', production: 2100, demand: 1800 },
      { month: 'Sep', production: 2700, demand: 2300 },
      { month: 'Oct', production: 3200, demand: 2900 },
      { month: 'Nov', production: 3500, demand: 3200 }
    ],
    importReduction: [
      { quarter: 'Q1 2024', importVolume: 2050, targetReduction: 280 },
      { quarter: 'Q2 2024', importVolume: 1820, targetReduction: 320 },
      { quarter: 'Q3 2024', importVolume: 1580, targetReduction: 350 },
      { quarter: 'Q4 2024', importVolume: 1320, targetReduction: 380 }
    ]
  },
  {
    id: 'pm-3',
    crop: 'Maize',
    state: 'Karnataka',
    season: 'Kharif',
    importDependency: 8.5,
    productionTarget: 9500,
    productionActual: 9800,
    processingCapacity: 7200,
    processingUtilization: 72.4,
    productionVsDemand: [
      { month: 'Jun', production: 800, demand: 750 },
      { month: 'Jul', production: 1200, demand: 900 },
      { month: 'Aug', production: 1600, demand: 1200 },
      { month: 'Sep', production: 2000, demand: 1650 },
      { month: 'Oct', production: 2300, demand: 1900 },
      { month: 'Nov', production: 2500, demand: 2100 }
    ],
    importReduction: [
      { quarter: 'Q1 2024', importVolume: 810, targetReduction: 95 },
      { quarter: 'Q2 2024', importVolume: 730, targetReduction: 110 },
      { quarter: 'Q3 2024', importVolume: 640, targetReduction: 125 },
      { quarter: 'Q4 2024', importVolume: 560, targetReduction: 140 }
    ]
  },
  {
    id: 'pm-4',
    crop: 'Chickpea',
    state: 'Madhya Pradesh',
    season: 'Rabi',
    importDependency: 22.3,
    productionTarget: 4500,
    productionActual: 4100,
    processingCapacity: 3200,
    processingUtilization: 68.9,
    productionVsDemand: [
      { month: 'Oct', production: 300, demand: 450 },
      { month: 'Nov', production: 550, demand: 550 },
      { month: 'Dec', production: 750, demand: 650 },
      { month: 'Jan', production: 950, demand: 850 },
      { month: 'Feb', production: 1150, demand: 950 },
      { month: 'Mar', production: 1300, demand: 1050 }
    ],
    importReduction: [
      { quarter: 'Q1 2024', importVolume: 1200, targetReduction: 180 },
      { quarter: 'Q2 2024', importVolume: 1050, targetReduction: 200 },
      { quarter: 'Q3 2024', importVolume: 920, targetReduction: 220 },
      { quarter: 'Q4 2024', importVolume: 780, targetReduction: 250 }
    ]
  },
  {
    id: 'pm-5',
    crop: 'Mustard',
    state: 'Rajasthan',
    season: 'Rabi',
    importDependency: 18.7,
    productionTarget: 3800,
    productionActual: 3650,
    processingCapacity: 2800,
    processingUtilization: 76.2,
    productionVsDemand: [
      { month: 'Oct', production: 280, demand: 380 },
      { month: 'Nov', production: 480, demand: 450 },
      { month: 'Dec', production: 650, demand: 550 },
      { month: 'Jan', production: 820, demand: 680 },
      { month: 'Feb', production: 950, demand: 780 },
      { month: 'Mar', production: 1100, demand: 900 }
    ],
    importReduction: [
      { quarter: 'Q1 2024', importVolume: 750, targetReduction: 110 },
      { quarter: 'Q2 2024', importVolume: 660, targetReduction: 125 },
      { quarter: 'Q3 2024', importVolume: 580, targetReduction: 140 },
      { quarter: 'Q4 2024', importVolume: 490, targetReduction: 160 }
    ]
  },
  {
    id: 'pm-6',
    crop: 'Cotton',
    state: 'Gujarat',
    season: 'Kharif',
    importDependency: 15.4,
    productionTarget: 8200,
    productionActual: 8050,
    processingCapacity: 6500,
    processingUtilization: 81.7,
    productionVsDemand: [
      { month: 'Jun', production: 650, demand: 750 },
      { month: 'Jul', production: 1050, demand: 950 },
      { month: 'Aug', production: 1400, demand: 1250 },
      { month: 'Sep', production: 1750, demand: 1550 },
      { month: 'Oct', production: 2100, demand: 1850 },
      { month: 'Nov', production: 2300, demand: 2050 }
    ],
    importReduction: [
      { quarter: 'Q1 2024', importVolume: 1350, targetReduction: 195 },
      { quarter: 'Q2 2024', importVolume: 1180, targetReduction: 220 },
      { quarter: 'Q3 2024', importVolume: 1020, targetReduction: 245 },
      { quarter: 'Q4 2024', importVolume: 870, targetReduction: 270 }
    ]
  },
  {
    id: 'pm-7',
    crop: 'Sugarcane',
    state: 'Uttar Pradesh',
    season: 'Kharif',
    importDependency: 3.2,
    productionTarget: 45000,
    productionActual: 46200,
    processingCapacity: 38000,
    processingUtilization: 86.4,
    productionVsDemand: [
      { month: 'Jun', production: 3500, demand: 3200 },
      { month: 'Jul', production: 5800, demand: 5200 },
      { month: 'Aug', production: 7800, demand: 7000 },
      { month: 'Sep', production: 9500, demand: 8500 },
      { month: 'Oct', production: 11200, demand: 10000 },
      { month: 'Nov', production: 12800, demand: 11500 }
    ],
    importReduction: [
      { quarter: 'Q1 2024', importVolume: 1450, targetReduction: 85 },
      { quarter: 'Q2 2024', importVolume: 1380, targetReduction: 95 },
      { quarter: 'Q3 2024', importVolume: 1300, targetReduction: 105 },
      { quarter: 'Q4 2024', importVolume: 1220, targetReduction: 115 }
    ]
  },
  {
    id: 'pm-8',
    crop: 'Soybean',
    state: 'Maharashtra',
    season: 'Kharif',
    importDependency: 28.5,
    productionTarget: 5600,
    productionActual: 5200,
    processingCapacity: 4200,
    processingUtilization: 65.8,
    productionVsDemand: [
      { month: 'Jun', production: 400, demand: 650 },
      { month: 'Jul', production: 700, demand: 850 },
      { month: 'Aug', production: 1000, demand: 1050 },
      { month: 'Sep', production: 1300, demand: 1250 },
      { month: 'Oct', production: 1600, demand: 1450 },
      { month: 'Nov', production: 1850, demand: 1650 }
    ],
    importReduction: [
      { quarter: 'Q1 2024', importVolume: 1680, targetReduction: 245 },
      { quarter: 'Q2 2024', importVolume: 1480, targetReduction: 280 },
      { quarter: 'Q3 2024', importVolume: 1300, targetReduction: 310 },
      { quarter: 'Q4 2024', importVolume: 1120, targetReduction: 340 }
    ]
  }
]
