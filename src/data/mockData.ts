import { CropRecommendation, SeasonalAdvisory, PestPrediction, CreditEligibility, InsurancePlan } from '../types'

export const mockCropRecommendations: CropRecommendation[] = [
  {
    id: '1',
    cropName: 'Wheat',
    suitabilityScore: 92,
    estimatedYield: '4.5 tons/hectare',
    waterRequirement: 'Medium',
    profitPotential: '$1,200 - $1,500/hectare',
    season: 'Rabi (Winter)',
    reasons: [
      'Soil composition is ideal with pH 6.5-7.5',
      'Historical yields in your region are 15% above average',
      'Current market prices are favorable',
      'Weather forecast predicts optimal conditions'
    ]
  },
  {
    id: '2',
    cropName: 'Chickpea',
    suitabilityScore: 88,
    estimatedYield: '2.2 tons/hectare',
    waterRequirement: 'Low',
    profitPotential: '$900 - $1,100/hectare',
    season: 'Rabi (Winter)',
    reasons: [
      'Low water requirement suits current groundwater levels',
      'Nitrogen-fixing properties will improve soil health',
      'Growing demand in export markets',
      'Drought-resistant variety recommended for your area'
    ]
  },
  {
    id: '3',
    cropName: 'Mustard',
    suitabilityScore: 85,
    estimatedYield: '1.8 tons/hectare',
    waterRequirement: 'Low',
    profitPotential: '$800 - $1,000/hectare',
    season: 'Rabi (Winter)',
    reasons: [
      'Short growing season (90-100 days)',
      'Good for crop rotation with cereals',
      'Resistant to common pests in your region',
      'Oil extraction market is stable'
    ]
  }
]

export const mockSeasonalAdvisories: SeasonalAdvisory[] = [
  {
    id: '1',
    title: 'Pre-Monsoon Irrigation Required',
    description: 'Apply 25mm irrigation to wheat fields before expected rainfall next week. This will ensure optimal moisture for grain filling stage.',
    priority: 'high',
    category: 'irrigation',
    actionDate: '2024-03-15',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Apply Nitrogen Fertilizer',
    description: 'Second dose of nitrogen fertilizer (Urea 50kg/hectare) should be applied during tillering stage for maximum effectiveness.',
    priority: 'high',
    category: 'fertilization',
    actionDate: '2024-03-18',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Aphid Monitoring Alert',
    description: 'Begin weekly monitoring for aphid infestation. Current weather conditions are favorable for aphid population growth.',
    priority: 'medium',
    category: 'pest-control',
    actionDate: '2024-03-20',
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Weather Advisory: Strong Winds Expected',
    description: 'Wind speeds of 40-50 km/h expected this weekend. Ensure proper support for tall crops and delay any spray operations.',
    priority: 'high',
    category: 'weather',
    actionDate: '2024-03-22',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Early Harvest Preparation',
    description: 'Begin arranging harvesting equipment and labor. Wheat maturity expected in 25-30 days based on current growth rate.',
    priority: 'low',
    category: 'harvest',
    actionDate: '2024-03-25',
    status: 'pending'
  }
]

export const mockPestPredictions: PestPrediction[] = [
  {
    id: '1',
    pestName: 'Aphids',
    riskLevel: 'high',
    affectedCrops: ['Wheat', 'Mustard', 'Chickpea'],
    probability: 78,
    preventiveMeasures: [
      'Install yellow sticky traps to monitor population',
      'Spray neem oil solution (5ml/liter) as preventive measure',
      'Encourage natural predators like ladybugs',
      'Remove weeds that serve as alternative hosts'
    ],
    earlySymptoms: [
      'Curling or yellowing of leaves',
      'Sticky honeydew on leaf surfaces',
      'Presence of ants on plants',
      'Stunted plant growth'
    ],
    estimatedImpact: '15-25% yield loss if untreated'
  },
  {
    id: '2',
    pestName: 'Brown Rust',
    riskLevel: 'medium',
    affectedCrops: ['Wheat'],
    probability: 45,
    preventiveMeasures: [
      'Use resistant wheat varieties',
      'Apply fungicide (Propiconazole) if symptoms appear',
      'Ensure proper spacing for air circulation',
      'Remove infected plant debris'
    ],
    earlySymptoms: [
      'Orange-brown pustules on leaves',
      'Pustules arranged in scattered pattern',
      'Leaves turning yellow prematurely',
      'Reduced tillering'
    ],
    estimatedImpact: '10-15% yield loss if untreated'
  },
  {
    id: '3',
    pestName: 'Pod Borer',
    riskLevel: 'medium',
    affectedCrops: ['Chickpea'],
    probability: 52,
    preventiveMeasures: [
      'Install pheromone traps for early detection',
      'Apply Bacillus thuringiensis (Bt) spray',
      'Handpick and destroy egg masses',
      'Maintain field hygiene by removing crop residues'
    ],
    earlySymptoms: [
      'Holes in pods and seeds',
      'Presence of larvae inside pods',
      'Frass (insect droppings) on plants',
      'Flowers dropping prematurely'
    ],
    estimatedImpact: '20-30% yield loss if untreated'
  }
]

export const mockCreditEligibility: CreditEligibility = {
  isEligible: true,
  score: 745,
  maxLoanAmount: 500000,
  interestRate: 7.5,
  repaymentPeriod: 36,
  factors: [
    { name: 'Land Ownership', score: 95, weight: 30 },
    { name: 'Credit History', score: 78, weight: 25 },
    { name: 'Income Stability', score: 82, weight: 20 },
    { name: 'Crop Insurance', score: 70, weight: 15 },
    { name: 'Farming Experience', score: 88, weight: 10 }
  ]
}

export const mockInsurancePlans: InsurancePlan[] = [
  {
    id: '1',
    name: 'Comprehensive Crop Shield',
    coverage: 'All-risk coverage including weather, pests, and market price fluctuations',
    premium: 25000,
    coverageAmount: 500000,
    crops: ['Wheat', 'Chickpea', 'Mustard', 'Rice'],
    benefits: [
      'Coverage up to 80% of crop value',
      'Quick claim settlement within 30 days',
      'Free agronomist consultation',
      'Weather advisory SMS alerts',
      'Replanting cost coverage'
    ],
    recommended: true
  },
  {
    id: '2',
    name: 'Weather Protection Plan',
    coverage: 'Protection against adverse weather conditions (drought, flood, hail)',
    premium: 15000,
    coverageAmount: 300000,
    crops: ['Wheat', 'Chickpea', 'Mustard'],
    benefits: [
      'Coverage up to 70% of crop value',
      'Claim settlement within 45 days',
      'Weather data-driven automated claims',
      'No field inspection required',
      'Season extension coverage'
    ],
    recommended: false
  },
  {
    id: '3',
    name: 'Basic Yield Protection',
    coverage: 'Minimum yield guarantee with deficit compensation',
    premium: 10000,
    coverageAmount: 200000,
    crops: ['Wheat', 'Rice'],
    benefits: [
      'Coverage up to 60% of expected yield',
      'Lower premium rates',
      'Government subsidy eligible',
      'Multi-year discount available',
      'Pest damage coverage'
    ],
    recommended: false
  }
]
