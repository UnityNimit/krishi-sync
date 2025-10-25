/**
 * Script to regenerate ONLY Basmati Rice blockchain hashes
 * This uses the ACTUAL event data from traceabilityData.ts
 * Run with: node scripts/regenerate-basmati-hashes.mjs
 */

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
 * This MUST match the calculateEventHash function in src/utils/blockchain.ts
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
    
    console.log(`Event ${i} (${event.eventType}): ${correctHash}`)
  }
}

// Basmati Rice events - ACTUAL DATA from traceabilityData.ts
const basmatiRiceEvents = [
  {
    batchId: 'BATCH-1730480000000-DEF456UVW',
    eventType: 'planting',
    timestamp: '2024-10-20T09:00:00Z',
    location: {
      name: 'Golden Fields, Haryana',
      gln: '8901234510001',
      coordinates: { lat: 29.0588, lon: 76.0856 },
      region: 'Haryana'
    },
    actor: 'Harpreet Singh (Farmer)',
    data: {
      seedVariety: 'Pusa Basmati 1509',
      fieldArea: '1.5 hectares',
      soilType: 'Clay loam',
      soilPH: '7.0',
      lotId: 'LOT-HR-2024-001'
    },
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000'
  },
  {
    batchId: 'BATCH-1730480000000-DEF456UVW',
    eventType: 'irrigation',
    timestamp: '2024-11-02T07:00:00Z',
    location: {
      name: 'Golden Fields, Haryana',
      region: 'Haryana'
    },
    actor: 'Harpreet Singh (Farmer)',
    data: {
      method: 'Flood Irrigation',
      waterVolume: '15000 liters',
      duration: '8 hours'
    }
  },
  {
    batchId: 'BATCH-1730480000000-DEF456UVW',
    eventType: 'growth-monitoring',
    timestamp: '2024-11-15T10:00:00Z',
    location: {
      name: 'Golden Fields, Haryana',
      region: 'Haryana'
    },
    actor: 'Agricultural Extension Officer - Dr. Amit Sharma',
    data: {
      plantHeight: '85 cm',
      healthStatus: 'Good',
      leafColor: 'Bright Green',
      pestObservations: 'Minor aphid presence'
    }
  },
  {
    batchId: 'BATCH-1730480000000-DEF456UVW',
    eventType: 'pest-treatment',
    timestamp: '2024-11-18T08:00:00Z',
    location: {
      name: 'Golden Fields, Haryana',
      region: 'Haryana'
    },
    actor: 'Harpreet Singh (Farmer)',
    data: {
      pestType: 'Aphids',
      treatment: 'Neem Oil Spray',
      quantity: '5 liters',
      method: 'Organic spray application'
    }
  }
]

console.log('=== Regenerating Basmati Rice Blockchain Hashes ===\n')
console.log('Using ACTUAL data from traceabilityData.ts')
console.log('This will generate correct hashes that match the verification logic\n')

regenerateEventHashes(basmatiRiceEvents)

console.log('\n=== Generated Hashes ===')
console.log('\nCopy these hashes into traceabilityData.ts:')
console.log('\nBatch 2 (Basmati Rice):')
basmatiRiceEvents.forEach((event, idx) => {
  console.log(`\nEvent ${idx} (evt-${11 + idx}):`)
  console.log(`  previousHash: '${event.previousHash}',`)
  console.log(`  currentHash: '${event.currentHash}',`)
})

console.log('\n=== Verification ===')
console.log('After updating the file, Basmati Rice should show:')
console.log('✓ Chain Verified - 0 invalid blocks')
console.log('\nMake sure to update BOTH previousHash and currentHash for each event!')
