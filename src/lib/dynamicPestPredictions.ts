/**
 * Dynamic pest prediction generator with ML-like predictions
 */

import { PestPrediction } from '../types'

interface PestTemplate {
  pestName: string
  affectedCropsOptions: string[][]
  preventiveMeasuresTemplates: string[][]
  symptomsTemplates: string[][]
  impactRanges: [number, number] // Min and max yield loss %
}

const pestTemplates: PestTemplate[] = [
  {
    pestName: 'Aphids',
    affectedCropsOptions: [
      ['Wheat', 'Mustard', 'Chickpea'],
      ['Wheat', 'Mustard'],
      ['Chickpea', 'Wheat', 'Soybean'],
      ['Mustard', 'Chickpea']
    ],
    preventiveMeasuresTemplates: [
      [
        'Install yellow sticky traps to monitor population',
        'Deploy {count} yellow sticky traps per acre for monitoring',
        'Set up pheromone traps at {spacing}m intervals'
      ],
      [
        'Spray neem oil solution (5ml/liter) as preventive measure',
        'Apply neem oil extract at {concentration}% concentration',
        'Use organic neem spray: {amount}ml per liter of water'
      ],
      [
        'Encourage natural predators like ladybugs',
        'Release {count} ladybugs per plant for biological control',
        'Maintain habitat for natural predators: lacewings and ladybugs'
      ],
      [
        'Remove weeds that serve as alternative hosts',
        'Eliminate {weed1} and {weed2} from field margins',
        'Control weed population within {distance}m radius'
      ]
    ],
    symptomsTemplates: [
      [
        'Curling or yellowing of leaves',
        'Leaf distortion with {percentage}% area affected',
        'Upward/downward leaf curling visible on {stage} plants'
      ],
      [
        'Sticky honeydew on leaf surfaces',
        'Honeydew secretion attracting sooty mold',
        'Shiny coating visible on {percentage}% of leaves'
      ],
      [
        'Presence of ants on plants',
        'Ant trails observed on {percentage}% of plants',
        'Symbiotic ant activity indicating aphid colonies'
      ],
      [
        'Stunted plant growth',
        'Growth reduction by {reduction}cm compared to normal',
        'Visible stunting in {percentage}% of infected plants'
      ]
    ],
    impactRanges: [15, 30]
  },
  {
    pestName: 'Brown Rust',
    affectedCropsOptions: [
      ['Wheat'],
      ['Wheat', 'Barley']
    ],
    preventiveMeasuresTemplates: [
      [
        'Use resistant wheat varieties',
        'Plant resistant varieties: {variety1} or {variety2}',
        'Choose rust-resistant cultivars like {variety1}'
      ],
      [
        'Apply fungicide (Propiconazole) if symptoms appear',
        'Spray {fungicide} at {rate}ml per liter at first sign',
        'Prophylactic fungicide: {fungicide} at {days}-day intervals'
      ],
      [
        'Ensure proper spacing for air circulation',
        'Maintain {spacing}cm spacing between rows',
        'Plant density: {density} plants per square meter'
      ],
      [
        'Remove infected plant debris',
        'Destroy crop residues after harvest',
        'Remove and burn infected material within {days} days'
      ]
    ],
    symptomsTemplates: [
      [
        'Orange-brown pustules on leaves',
        'Rust pustules on {percentage}% of leaf area',
        'Uredinial stage visible on upper leaf surfaces'
      ],
      [
        'Pustules arranged in scattered pattern',
        'Random distribution of lesions across leaf',
        'Non-linear pustule arrangement distinguishes from stripe rust'
      ],
      [
        'Leaves turning yellow prematurely',
        'Chlorosis affecting {percentage}% of foliage',
        'Early senescence starting from {stage} stage'
      ],
      [
        'Reduced tillering',
        'Tiller count reduced by {percentage}%',
        'Only {count} tillers vs normal {normal} per plant'
      ]
    ],
    impactRanges: [10, 20]
  },
  {
    pestName: 'Pod Borer',
    affectedCropsOptions: [
      ['Chickpea'],
      ['Chickpea', 'Pigeon Pea'],
      ['Chickpea', 'Soybean']
    ],
    preventiveMeasuresTemplates: [
      [
        'Install pheromone traps for early detection',
        'Deploy {count} pheromone traps per hectare',
        'Set traps at {spacing}m spacing for monitoring'
      ],
      [
        'Apply Bacillus thuringiensis (Bt) spray',
        'Spray Bt formulation at {concentration}g per liter',
        'Use bio-pesticide: Bt at {rate}ml per liter water'
      ],
      [
        'Handpick and destroy egg masses',
        'Manual removal during early morning hours',
        'Scout and remove eggs from {percentage}% of plants daily'
      ],
      [
        'Maintain field hygiene by removing crop residues',
        'Deep plowing after harvest to {depth}cm',
        'Remove alternate hosts within {distance}m radius'
      ]
    ],
    symptomsTemplates: [
      [
        'Holes in pods and seeds',
        'Entry holes of {size}mm diameter in pods',
        'Damaged pods: {percentage}% showing feeding marks'
      ],
      [
        'Presence of larvae inside pods',
        'Larvae count: {count} per pod on average',
        'Instar stage {stage} larvae visible inside'
      ],
      [
        'Frass (insect droppings) on plants',
        'Black frass accumulation at pod attachment',
        'Webbing with frass on {percentage}% of infected pods'
      ],
      [
        'Flowers dropping prematurely',
        'Flower drop rate: {percentage}% above normal',
        'Premature shedding starting at {stage} stage'
      ]
    ],
    impactRanges: [20, 35]
  },
  {
    pestName: 'Stem Borer',
    affectedCropsOptions: [
      ['Rice', 'Sugarcane'],
      ['Wheat', 'Maize'],
      ['Sorghum', 'Maize']
    ],
    preventiveMeasuresTemplates: [
      [
        'Remove alternate host plants near field',
        'Clear {weed1} and {weed2} within {distance}m',
        'Eliminate wild grasses from bunds'
      ],
      [
        'Use light traps to catch adult moths',
        'Install {count} light traps per hectare',
        'Operate traps from {time1} to {time2} hours'
      ],
      [
        'Apply granular insecticide in leaf whorl',
        'Carbofuran {rate}kg per hectare in whorl',
        'Systemic insecticide: {chemical} at {days}-day intervals'
      ],
      [
        'Release egg parasitoid Trichogramma',
        'Tricho-cards: {count} per hectare weekly',
        'Biological control: {releases} releases per season'
      ]
    ],
    symptomsTemplates: [
      [
        'Dead heart in young plants',
        'Dead heart symptom in {percentage}% of tillers',
        'Central shoot death at {stage} stage'
      ],
      [
        'Entry holes in stems with frass',
        'Bore holes of {size}mm with sawdust-like frass',
        'Visible entry points on {percentage}% of stems'
      ],
      [
        'White ear heads at later stages',
        'Unfilled panicles: {percentage}% of total',
        'Chaffy grains in {percentage}% of affected plants'
      ],
      [
        'Stem tunneling visible on splitting',
        'Tunnel length: {length}cm inside stem',
        'Larvae present in {percentage}% of damaged stems'
      ]
    ],
    impactRanges: [25, 40]
  },
  {
    pestName: 'Whitefly',
    affectedCropsOptions: [
      ['Cotton', 'Tomato', 'Okra'],
      ['Chilli', 'Brinjal', 'Tomato'],
      ['Soybean', 'Cotton']
    ],
    preventiveMeasuresTemplates: [
      [
        'Use yellow sticky traps for monitoring',
        'Install {count} sticky traps per {area} square meters',
        'Replace traps every {days} days'
      ],
      [
        'Spray neem-based insecticides',
        'Neem oil {concentration}% + soap solution',
        'Azadirachtin {rate}ppm concentration spray'
      ],
      [
        'Avoid over-fertilization with nitrogen',
        'Limit nitrogen to {amount}kg per hectare',
        'Use balanced NPK: {npk} ratio'
      ],
      [
        'Maintain proper plant spacing',
        'Row spacing: {spacing}cm for air movement',
        'Plant density: {density} plants per square meter'
      ]
    ],
    symptomsTemplates: [
      [
        'Yellowing and curling of leaves',
        'Interveinal chlorosis on {percentage}% of leaves',
        'Upward leaf curl with {severity} intensity'
      ],
      [
        'Honeydew secretion leading to sooty mold',
        'Black sooty mold on {percentage}% of foliage',
        'Photosynthesis reduced by {percentage}% due to mold'
      ],
      [
        'Adults visible on undersides of leaves',
        'Population density: {count} adults per leaf',
        'All life stages present on {percentage}% of plants'
      ],
      [
        'Virus transmission symptoms (leaf curl)',
        'Leaf curl virus in {percentage}% of plants',
        'Yellowing and vein thickening symptoms'
      ]
    ],
    impactRanges: [30, 50]
  },
  {
    pestName: 'Leaf Miner',
    affectedCropsOptions: [
      ['Tomato', 'Potato', 'Peas'],
      ['Groundnut', 'Soybean'],
      ['Vegetable Crops']
    ],
    preventiveMeasuresTemplates: [
      [
        'Remove and destroy infested leaves',
        'Scout and remove leaves with {count}+ mines',
        'Prune {percentage}% of heavily infested foliage'
      ],
      [
        'Use yellow sticky traps for adult flies',
        'Trap placement: {height}cm above crop canopy',
        'Density: {count} traps per {area} square meters'
      ],
      [
        'Apply neem or spinosad-based sprays',
        'Spinosad {rate}ml per liter at {days}-day intervals',
        'Neem extract {concentration}% with spreader'
      ],
      [
        'Cover crops with fine mesh during vulnerable stages',
        'Use {mesh} micron mesh for {duration} days',
        'Install row covers during {stage} stage'
      ]
    ],
    symptomsTemplates: [
      [
        'Serpentine mines on leaves',
        'Mining pattern covering {percentage}% of leaf area',
        'Winding tunnels visible on {count} leaves per plant'
      ],
      [
        'Blotch mines in later stages',
        'Irregular blotch mines of {size}cm diameter',
        'Coalescence of mines on {percentage}% of leaves'
      ],
      [
        'Leaf drying and dropping',
        'Premature leaf drop: {percentage}% of foliage',
        'Necrosis spreading from mined areas'
      ],
      [
        'Larvae visible inside mines',
        'Active larvae in {percentage}% of mines',
        '{stage} instar stage predominant'
      ]
    ],
    impactRanges: [15, 25]
  }
]

/**
 * Generate variables for templates
 */
function generatePestVariables(): Record<string, string | number> {
  return {
    count: Math.round(5 + Math.random() * 15), // 5-20
    spacing: Math.round(15 + Math.random() * 20), // 15-35
    concentration: (0.5 + Math.random() * 2).toFixed(1), // 0.5-2.5
    amount: Math.round(3 + Math.random() * 7), // 3-10
    percentage: Math.round(20 + Math.random() * 60), // 20-80
    stage: ['seedling', 'vegetative', 'flowering', 'pod formation'][Math.floor(Math.random() * 4)],
    weed1: ['Parthenium', 'Lantana', 'Wild grasses'][Math.floor(Math.random() * 3)],
    weed2: ['Amaranthus', 'Cyperus', 'Chenopodium'][Math.floor(Math.random() * 3)],
    distance: Math.round(10 + Math.random() * 40), // 10-50m
    reduction: Math.round(5 + Math.random() * 15), // 5-20cm
    variety1: ['HD-2967', 'PBW-343', 'DBW-17', 'WH-1105'][Math.floor(Math.random() * 4)],
    variety2: ['HD-3086', 'PBW-502', 'DBW-88', 'WH-1080'][Math.floor(Math.random() * 4)],
    fungicide: ['Propiconazole', 'Tebuconazole', 'Mancozeb'][Math.floor(Math.random() * 3)],
    rate: (1.5 + Math.random() * 2).toFixed(1), // 1.5-3.5ml
    days: Math.round(7 + Math.random() * 7), // 7-14 days
    density: Math.round(20 + Math.random() * 20), // 20-40 plants/m²
    normal: Math.round(5 + Math.random() * 5), // 5-10 tillers
    size: (1 + Math.random() * 2).toFixed(1), // 1-3mm
    depth: Math.round(15 + Math.random() * 15), // 15-30cm
    chemical: ['Chlorantraniliprole', 'Fipronil', 'Cartap'][Math.floor(Math.random() * 3)],
    time1: ['18:00', '19:00', '20:00'][Math.floor(Math.random() * 3)],
    time2: ['06:00', '07:00', '08:00'][Math.floor(Math.random() * 3)],
    releases: Math.round(4 + Math.random() * 4), // 4-8 releases
    length: Math.round(5 + Math.random() * 15), // 5-20cm
    area: Math.round(50 + Math.random() * 50), // 50-100
    npk: ['19:19:19', '12:32:16', '15:15:15'][Math.floor(Math.random() * 3)],
    severity: ['mild', 'moderate', 'severe'][Math.floor(Math.random() * 3)],
    height: Math.round(30 + Math.random() * 30), // 30-60cm
    mesh: Math.round(20 + Math.random() * 20), // 20-40 micron
    duration: Math.round(14 + Math.random() * 14) // 14-28 days
  }
}

/**
 * Fill template with variables
 */
function fillTemplate(template: string, variables: Record<string, string | number>): string {
  let filled = template
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`\\{${key}\\}`, 'g')
    filled = filled.replace(regex, String(variables[key]))
  })
  return filled
}

/**
 * Generate dynamic pest predictions
 */
export function generateDynamicPestPredictions(): PestPrediction[] {
  // Select 3-5 random pests
  const numPests = 3 + Math.floor(Math.random() * 3)
  const selectedPests = [...pestTemplates]
    .sort(() => Math.random() - 0.5)
    .slice(0, numPests)
  
  return selectedPests.map((template, index) => {
    const probability = Math.round(45 + Math.random() * 45) // 45-90%
    
    // Determine risk level based on probability
    let riskLevel: 'high' | 'medium' | 'low'
    if (probability >= 70) {
      riskLevel = 'high'
    } else if (probability >= 50) {
      riskLevel = 'medium'
    } else {
      riskLevel = 'low'
    }
    
    // Select affected crops
    const affectedCrops = template.affectedCropsOptions[
      Math.floor(Math.random() * template.affectedCropsOptions.length)
    ]
    
    // Generate preventive measures and symptoms
    const variables = generatePestVariables()
    
    const preventiveMeasures = template.preventiveMeasuresTemplates.map(templates => {
      const selected = templates[Math.floor(Math.random() * templates.length)]
      return fillTemplate(selected, variables)
    })
    
    const earlySymptoms = template.symptomsTemplates.map(templates => {
      const selected = templates[Math.floor(Math.random() * templates.length)]
      return fillTemplate(selected, variables)
    })
    
    // Generate impact
    const [minImpact, maxImpact] = template.impactRanges
    const impactLow = minImpact + Math.round((Math.random() - 0.5) * 5)
    const impactHigh = maxImpact + Math.round((Math.random() - 0.5) * 5)
    const estimatedImpact = `${impactLow}-${impactHigh}% yield loss if untreated`
    
    return {
      id: `pest-${Date.now()}-${index}`,
      pestName: template.pestName,
      riskLevel,
      affectedCrops,
      probability,
      preventiveMeasures,
      earlySymptoms,
      estimatedImpact
    }
  })
}
