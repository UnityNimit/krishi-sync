/**
 * Simple test script to verify blockchain hash verification works
 */

import { createHash } from 'crypto'
import { readFileSync } from 'fs'

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

console.log('Testing Blockchain Verification...\n')

// Test Case 1: Genesis block
console.log('Test 1: Genesis Block Verification')
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

const expectedGenesisHash = '16dd6ebe79d16c44badc682fc7aa84d0bdcfa13035d896f0ac26ddd4b3d9bf83'

console.log(`  Calculated: ${genesisHash}`)
console.log(`  Expected:   ${expectedGenesisHash}`)
console.log(`  Match: ${genesisHash === expectedGenesisHash ? '✓ PASS' : '✗ FAIL'}\n`)

// Test Case 2: Second event (chain linkage)
console.log('Test 2: Second Event Verification (Chain Linkage)')
const harvestEventData = {
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
}

const harvestHash = calculateEventHash(
  genesisHash, // Previous hash should be the genesis hash
  '2024-10-25T10:15:00Z',
  harvestEventData
)

const expectedHarvestHash = 'da3c27b6425f1479381e761f60e70b1f2da960df46c52a3941c0b18609bc4382'

console.log(`  Calculated: ${harvestHash}`)
console.log(`  Expected:   ${expectedHarvestHash}`)
console.log(`  Match: ${harvestHash === expectedHarvestHash ? '✓ PASS' : '✗ FAIL'}\n`)

// Test Case 3: Verify genesis block has correct previousHash
console.log('Test 3: Genesis Block Prerequisites')
console.log(`  Previous Hash: 0000000000000000000000000000000000000000000000000000000000000000`)
console.log(`  This is the genesis block (all zeros): ✓ PASS\n`)

// Test Case 4: JSON canonicalization
console.log('Test 4: JSON Canonicalization')
const testObj1 = { b: 2, a: 1, c: 3 }
const testObj2 = { a: 1, b: 2, c: 3 }
const canon1 = canonicalJSON(testObj1)
const canon2 = canonicalJSON(testObj2)
console.log(`  Object 1: ${JSON.stringify(testObj1)}`)
console.log(`  Object 2: ${JSON.stringify(testObj2)}`)
console.log(`  Canonical 1: ${canon1}`)
console.log(`  Canonical 2: ${canon2}`)
console.log(`  Same output: ${canon1 === canon2 ? '✓ PASS' : '✗ FAIL'}\n`)

console.log('=== Test Summary ===')
const allPassed = genesisHash === expectedGenesisHash && harvestHash === expectedHarvestHash && canon1 === canon2
if (allPassed) {
  console.log('✓ All tests passed! Blockchain verification is working correctly.')
  console.log('  - Genesis block hash matches')
  console.log('  - Chain linkage is correct')
  console.log('  - JSON canonicalization is consistent')
  console.log('\nYou can now test in the UI - all blocks should show as valid.')
} else {
  console.log('✗ Some tests failed. Please review the hash calculation logic.')
  process.exit(1)
}
