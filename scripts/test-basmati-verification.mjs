/**
 * Test script to verify Basmati Rice blockchain hashes
 * Run with: node scripts/test-basmati-verification.mjs
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
 * Calculate hash for blockchain event
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

// Basmati Rice events with UPDATED hashes
const basmatiRiceEvents = [
  {
    id: 'evt-11',
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
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    currentHash: '0c33c37aeff2692d9ec94f7f10416d894fdee6f13ff875de9802966941c0ff2a',
    blockNumber: 0
  },
  {
    id: 'evt-12',
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
    },
    previousHash: '0c33c37aeff2692d9ec94f7f10416d894fdee6f13ff875de9802966941c0ff2a',
    currentHash: 'ee225e3fed78d3f6514acbb42114745e9edd9c37cd8a36dd1ad1e89e8f11a0cc',
    blockNumber: 1
  },
  {
    id: 'evt-13',
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
    },
    previousHash: 'ee225e3fed78d3f6514acbb42114745e9edd9c37cd8a36dd1ad1e89e8f11a0cc',
    currentHash: '6b771190b31bc70388ffb68674933217994564f556840df3da2c1a542a880178',
    blockNumber: 2
  },
  {
    id: 'evt-14',
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
    },
    previousHash: '6b771190b31bc70388ffb68674933217994564f556840df3da2c1a542a880178',
    currentHash: 'afd6575a48f0ad2c6b3d3ced99519a4f35e04cd89889f657861821c67959c909',
    blockNumber: 3
  }
]

console.log('=== Testing Basmati Rice Blockchain Verification ===\n')

let allValid = true
let invalidBlocks = []

for (let i = 0; i < basmatiRiceEvents.length; i++) {
  const event = basmatiRiceEvents[i]
  
  // Build event data
  const eventData = {
    batchId: event.batchId,
    eventType: event.eventType,
    timestamp: event.timestamp,
    location: event.location,
    actor: event.actor,
    data: event.data
  }
  
  // Calculate hash
  const calculatedHash = calculateEventHash(
    event.previousHash,
    event.timestamp,
    eventData
  )
  
  // Compare
  const matches = calculatedHash === event.currentHash
  
  console.log(`Block ${i} (${event.id}): ${event.eventType}`)
  console.log(`  Stored Hash:     ${event.currentHash}`)
  console.log(`  Calculated Hash: ${calculatedHash}`)
  console.log(`  Status: ${matches ? '✓ VALID' : '✗ INVALID'}`)
  
  if (!matches) {
    allValid = false
    invalidBlocks.push(i)
  }
  
  // Check chain linkage
  if (i > 0) {
    const linkageValid = event.previousHash === basmatiRiceEvents[i - 1].currentHash
    console.log(`  Chain Linkage: ${linkageValid ? '✓ Valid' : '✗ Broken'}`)
    if (!linkageValid) {
      console.log(`    Expected: ${basmatiRiceEvents[i - 1].currentHash}`)
      console.log(`    Got:      ${event.previousHash}`)
      allValid = false
      if (!invalidBlocks.includes(i)) {
        invalidBlocks.push(i)
      }
    }
  }
  
  console.log()
}

console.log('=== Verification Summary ===')
console.log(`Total Blocks: ${basmatiRiceEvents.length}`)
console.log(`Invalid Blocks: ${invalidBlocks.length}`)
console.log(`Status: ${allValid ? '✓ All blocks valid' : '✗ Chain compromised'}`)

if (allValid) {
  console.log('\n✓ SUCCESS! Basmati Rice blockchain is now valid.')
  console.log('The UI should now show: "✓ Chain Verified - 0 invalid blocks"')
} else {
  console.log('\n✗ FAILURE! Some blocks are still invalid.')
  console.log('Invalid block numbers:', invalidBlocks)
  process.exit(1)
}
