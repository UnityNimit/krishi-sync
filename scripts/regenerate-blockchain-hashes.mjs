/**
 * Script to regenerate blockchain hashes for seed data
 * Run with: node scripts/regenerate-blockchain-hashes.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { createHash } from 'crypto'

/**
 * Create canonical JSON string with sorted keys for consistent hashing
 */
function canonicalJSON(obj) {
  if (obj === null || obj === undefined) {
    return String(obj)
  }
  
  if (typeof obj !== 'object') {
    return JSON.stringify(obj)
  }
  
  if (Array.isArray(obj)) {
    return '[' + obj.map(item => canonicalJSON(item)).join(',') + ']'
  }
  
  const sortedKeys = Object.keys(obj).sort()
  const pairs = sortedKeys.map(key => `"${key}":${canonicalJSON(obj[key])}`)
  return '{' + pairs.join(',') + '}'
}

/**
 * Calculate hash for blockchain event using Node.js crypto
 */
function calculateEventHash(previousHash, timestamp, eventData) {
  const timestampStr = String(timestamp)
  const dataStr = canonicalJSON(eventData)
  const content = `${previousHash}${timestampStr}${dataStr}`
  
  const hash = createHash('sha256')
    .update(content)
    .digest('hex')
  
  return hash
}

/**
 * Regenerate hashes for a chain of events
 */
function regenerateEventHashes(events) {
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    
    // Build event data in consistent structure
    const eventData = {
      batchId: event.batchId,
      eventType: event.eventType,
      timestamp: event.timestamp,
      location: event.location,
      actor: event.actor,
      data: event.data
    }
    
    // Calculate the correct hash
    const correctHash = calculateEventHash(
      event.previousHash,
      event.timestamp,
      eventData
    )
    
    // Update the event's hash
    event.currentHash = correctHash
    
    // Update the next event's previousHash if it exists
    if (i < events.length - 1) {
      events[i + 1].previousHash = correctHash
    }
    
    console.log(`Event ${i} (${event.eventType}): ${correctHash.substring(0, 16)}...`)
  }
}

// Read the traceability data file
const filePath = './src/data/traceabilityData.ts'
console.log('Reading', filePath, '...')

let fileContent = readFileSync(filePath, 'utf8')

// Extract the mockBatches array using regex
const batchesMatch = fileContent.match(/export const mockBatches: TraceabilityBatch\[\] = \[([\s\S]*)\]/)
if (!batchesMatch) {
  console.error('Could not find mockBatches array in file')
  process.exit(1)
}

// Parse the batches data
// This is a simplified approach - we'll use eval in a controlled way
// In production, you'd want a proper TypeScript AST parser
const dataStart = fileContent.indexOf('export const mockBatches')
const dataEnd = fileContent.lastIndexOf('\n]') + 2

// Extract just the data section
const dataSection = fileContent.substring(dataStart, dataEnd)

// Since parsing TypeScript is complex, we'll use a different approach:
// We'll look for patterns like previousHash: 'xxx' and currentHash: 'yyy'
// and replace them with the calculated values

console.log('\nCalculating genesis hash for first batch...')

// For genesis block of first batch
const genesisEventData = {
  batchId: 'BATCH-1729788000000-ABC123XYZ',
  eventType: 'planting',
  timestamp: '2024-10-01T08:00:00Z',
  location: {
    name: 'Green Valley Farm, Pune District',
    gln: '8901234500001',
    coordinates: { lat: 18.5204, lon: 73.8567 },
    region: 'Maharashtra'
  },
  actor: 'Rajesh Kumar (Farmer)',
  data: {
    seedVariety: 'Groundnut - GG20',
    fieldArea: '2.5 hectares',
    soilType: 'Red Sandy Loam',
    soilPH: '6.8',
    lotId: 'LOT-MH-2024-001'
  }
}

const genesisHash = calculateEventHash(
  '0000000000000000000000000000000000000000000000000000000000000000',
  '2024-10-01T08:00:00Z',
  genesisEventData
)

console.log('Genesis hash:', genesisHash)

// Now calculate all subsequent hashes
const batch1Events = [
  {
    batchId: 'BATCH-1729788000000-ABC123XYZ',
    eventType: 'planting',
    timestamp: '2024-10-01T08:00:00Z',
    location: {
      name: 'Green Valley Farm, Pune District',
      gln: '8901234500001',
      coordinates: { lat: 18.5204, lon: 73.8567 },
      region: 'Maharashtra'
    },
    actor: 'Rajesh Kumar (Farmer)',
    data: {
      seedVariety: 'Groundnut - GG20',
      fieldArea: '2.5 hectares',
      soilType: 'Red Sandy Loam',
      soilPH: '6.8',
      lotId: 'LOT-MH-2024-001'
    },
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000'
  },
  {
    batchId: 'BATCH-1729788000000-ABC123XYZ',
    eventType: 'harvesting',
    timestamp: '2024-10-25T10:15:00Z',
    location: {
      name: 'Green Valley Farm, Pune District',
      gln: '8901234500001',
      region: 'Maharashtra'
    },
    actor: 'Rajesh Kumar (Farmer)',
    data: {
      harvestMethod: 'Manual with mechanized support',
      actualYield: '5000 kg',
      moisture: '8.5%',
      quality: 'Grade A',
      lotId: 'LOT-MH-2024-001'
    }
  },
  {
    batchId: 'BATCH-1729788000000-ABC123XYZ',
    eventType: 'quality-inspection',
    timestamp: '2024-10-25T14:00:00Z',
    location: {
      name: 'FPO Collection Center',
      gln: '8901234500002',
      region: 'Maharashtra'
    },
    actor: 'Quality Inspector - Priya Sharma',
    data: {
      freeAcidity: '0.8%',
      oilContent: '48.5%',
      impurities: '1.2%',
      grade: 'Grade A',
      lotId: 'LOT-MH-2024-001'
    }
  },
  {
    batchId: 'BATCH-1729788000000-ABC123XYZ',
    eventType: 'processing',
    timestamp: '2024-10-25T14:30:00Z',
    location: {
      name: 'XYZ Oil Mills Pvt Ltd - Pune',
      gln: '8901234500012',
      coordinates: { lat: 18.5204, lon: 73.8567 },
      region: 'Maharashtra'
    },
    actor: 'Mill Operator - Suresh Patel',
    data: {
      processType: 'Cold Pressing',
      temperature: '28°C',
      batchId: 'OIL-2025-10-25-01',
      byproductBatchId: 'CAKE-2025-10-25-01'
    }
  },
  {
    batchId: 'BATCH-1729788000000-ABC123XYZ',
    eventType: 'packaging',
    timestamp: '2024-10-26T09:00:00Z',
    location: {
      name: 'XYZ Oil Mills Packaging Unit',
      gln: '8901234500013',
      region: 'Maharashtra'
    },
    actor: 'Packaging Supervisor - Anjali Verma',
    data: {
      packageType: '1L bottles',
      totalUnits: '250000 bottles',
      batchLabeling: 'QR Code + Blockchain Hash',
      expiryDate: '2025-10-26',
      retailBatchId: 'R-2025-1234'
    }
  },
  {
    batchId: 'BATCH-1729788000000-ABC123XYZ',
    eventType: 'distribution',
    timestamp: '2024-10-27T06:00:00Z',
    location: {
      name: 'Mumbai Distribution Hub',
      gln: '8901234500020',
      region: 'Maharashtra'
    },
    actor: 'Logistics Manager - Vikram Malhotra',
    data: {
      vehicle: 'Refrigerated Truck RT-5678',
      temperature: '20°C',
      distance: '150 km',
      destination: 'Retail Distribution Centers - Mumbai',
      eta: '2024-10-27T10:00:00Z'
    }
  },
  {
    batchId: 'BATCH-1729788000000-ABC123XYZ',
    eventType: 'retail-delivery',
    timestamp: '2024-10-27T10:30:00Z',
    location: {
      name: 'Fresh Organic Stores - Mumbai',
      gln: '8901234500030',
      region: 'Maharashtra'
    },
    actor: 'Store Manager - Neha Kapoor',
    data: {
      receivedQuantity: '250 MT (250,000 bottles)',
      storageCondition: 'Climate Controlled Warehouse',
      shelfPlacement: 'Premium Oil Section',
      retailPrice: '₹180/L'
    }
  }
]

console.log('\nRegenerating hashes for Batch 1 (7 events)...')
regenerateEventHashes(batch1Events)

// Now batch 2
const batch2Events = [
  {
    batchId: 'BATCH-1730480000000-DEF456UVW',
    eventType: 'planting',
    timestamp: '2024-10-20T09:00:00Z',
    location: 'Golden Fields, Haryana',
    actor: 'Suresh Gupta (Farmer)',
    data: {
      seedVariety: 'Basmati Rice - Pusa 1121',
      fieldArea: '5 hectares',
      soilType: 'Alluvial',
      soilPH: '7.2'
    },
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000'
  },
  {
    batchId: 'BATCH-1730480000000-DEF456UVW',
    eventType: 'harvesting',
    timestamp: '2024-11-15T11:00:00Z',
    location: 'Golden Fields, Haryana',
    actor: 'Suresh Gupta (Farmer)',
    data: {
      harvestMethod: 'Mechanized',
      actualYield: '3000 kg',
      moisture: '14%',
      quality: 'Premium'
    }
  },
  {
    batchId: 'BATCH-1730480000000-DEF456UVW',
    eventType: 'processing',
    timestamp: '2024-11-16T10:00:00Z',
    location: 'Rice Mill - Haryana',
    actor: 'Mill Operator',
    data: {
      processType: 'Milling & Polishing',
      outputYield: '2100 kg',
      grade: 'Premium Basmati'
    }
  },
  {
    batchId: 'BATCH-1730480000000-DEF456UVW',
    eventType: 'packaging',
    timestamp: '2024-11-17T14:00:00Z',
    location: 'Packaging Unit - Haryana',
    actor: 'Packaging Supervisor',
    data: {
      packageType: '5kg bags',
      totalUnits: '420 bags',
      expiryDate: '2025-11-17'
    }
  }
]

console.log('\nRegenerating hashes for Batch 2 (4 events)...')
regenerateEventHashes(batch2Events)

// Create replacement map
const replacements = new Map()

// Add batch 1 replacements
batch1Events.forEach((event, idx) => {
  const oldHash = ['a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
                   'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567',
                   'c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678',
                   'd4e5f6789012345678901234567890abcdef1234567890abcdef123456789',
                   'e5f6789012345678901234567890abcdef1234567890abcdef1234567890',
                   'f6789012345678901234567890abcdef1234567890abcdef12345678901',
                   '789012345678901234567890abcdef1234567890abcdef123456789012'][idx]
  replacements.set(`currentHash: '${oldHash}'`, `currentHash: '${event.currentHash}'`)
  if (idx > 0) {
    const prevOldHash = ['a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
                         'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567',
                         'c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678',
                         'd4e5f6789012345678901234567890abcdef1234567890abcdef123456789',
                         'e5f6789012345678901234567890abcdef1234567890abcdef1234567890',
                         'f6789012345678901234567890abcdef1234567890abcdef12345678901'][idx - 1]
    replacements.set(`previousHash: '${prevOldHash}'`, `previousHash: '${event.previousHash}'`)
  }
})

// Add batch 2 replacements
batch2Events.forEach((event, idx) => {
  const oldHash = ['x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2',
                   'y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3',
                   'z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4',
                   'a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5'][idx]
  replacements.set(`currentHash: '${oldHash}'`, `currentHash: '${event.currentHash}'`)
  if (idx > 0) {
    const prevOldHash = ['x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2',
                         'y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3',
                         'z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4'][idx - 1]
    replacements.set(`previousHash: '${prevOldHash}'`, `previousHash: '${event.previousHash}'`)
  }
})

console.log('\n=== Hash Summary ===')
console.log('Batch 1 Hashes:')
batch1Events.forEach((e, i) => console.log(`  Event ${i}: ${e.currentHash.substring(0, 16)}...`))
console.log('\nBatch 2 Hashes:')
batch2Events.forEach((e, i) => console.log(`  Event ${i}: ${e.currentHash.substring(0, 16)}...`))

// Apply replacements
for (const [oldVal, newVal] of replacements) {
  fileContent = fileContent.replace(oldVal, newVal)
}

// Write back
console.log('\nWriting updated file...')
writeFileSync(filePath, fileContent, 'utf8')

console.log('✓ Done! Blockchain hashes regenerated successfully.')
console.log('\nNext steps:')
console.log('1. Review the changes in', filePath)
console.log('2. Test the verification in the UI')
console.log('3. All blocks should now show as valid')
