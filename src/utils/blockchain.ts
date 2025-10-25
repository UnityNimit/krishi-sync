import { SupplyChainEvent, BlockchainVerification, VerificationIssue } from '../types'

/**
 * Generate SHA-256 hash from string data
 */
export async function generateHash(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

/**
 * Create canonical JSON string with sorted keys for consistent hashing
 */
function canonicalJSON(obj: unknown): string {
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
  const pairs = sortedKeys.map(key => `"${key}":${canonicalJSON((obj as Record<string, unknown>)[key])}`)
  return '{' + pairs.join(',') + '}'
}

/**
 * Calculate hash for blockchain event
 * IMPORTANT: This function must be used for BOTH:
 * 1. Creating hashes when generating seed data
 * 2. Verifying hashes in the verification function
 * 
 * The hash is calculated from previousHash + timestamp + event data
 * to ensure consistency between creation and verification.
 */
export async function calculateEventHash(
  previousHash: string,
  timestamp: string,
  eventData: Record<string, unknown>
): Promise<string> {
  // Convert timestamp to consistent format (string)
  const timestampStr = String(timestamp)
  
  // Create canonical JSON string (sorted keys, no spaces)
  const dataStr = canonicalJSON(eventData)
  
  // Concatenate in exact order: previousHash + timestamp + data
  const content = `${previousHash}${timestampStr}${dataStr}`
  
  // Calculate SHA-256 hash
  const hash = await generateHash(content)
  
  return hash
}

/**
 * Create event hash for a new event (backwards compatibility)
 * This wraps the new calculateEventHash function
 */
export async function createEventHash(
  batchId: string,
  eventType: string,
  timestamp: string,
  location: string | object,
  actor: string,
  data: Record<string, string | number | boolean> | object,
  previousHash: string
): Promise<string> {
  // Build event data object in consistent structure
  const eventData = {
    batchId,
    eventType,
    timestamp,
    location,
    actor,
    data
  }
  
  return await calculateEventHash(previousHash, timestamp, eventData)
}

export function verifySignature(signature: string, publicKey: string): boolean {
  return signature.length > 0 && publicKey.length > 0
}

export function verifyMassBalance(
  inputs: Array<{ quantity: { value: number } }>,
  outputs: Array<{ quantity: { value: number } }>,
  losses?: { value: number }
): boolean {
  const totalInput = inputs.reduce((sum, inp) => sum + inp.quantity.value, 0)
  const totalOutput = outputs.reduce((sum, out) => sum + out.quantity.value, 0)
  const lossValue = losses?.value || 0
  return Math.abs(totalInput - (totalOutput + lossValue)) < 0.01
}

export async function verifyChain(events: SupplyChainEvent[]): Promise<BlockchainVerification> {
  if (events.length === 0) {
    return {
      isValid: true,
      totalBlocks: 0,
      invalidBlocks: [],
      message: 'No blocks to verify',
      checks: {
        hashIntegrity: { passed: 0, failed: 0 },
        signatures: { passed: 0, failed: 0 },
        massBalance: { passed: 0, failed: 0 },
        timestamps: { passed: 0, failed: 0 }
      },
      issues: []
    }
  }

  const invalidBlocks: number[] = []
  const issues: VerificationIssue[] = []
  const checks = {
    hashIntegrity: { passed: 0, failed: 0 },
    signatures: { passed: 0, failed: 0 },
    massBalance: { passed: 0, failed: 0 },
    timestamps: { passed: 0, failed: 0 }
  }

  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    
    // Build event data in consistent structure for hash calculation
    const eventData = {
      batchId: event.batchId,
      eventType: event.eventType,
      timestamp: event.timestamp,
      location: event.location,
      actor: event.actor,
      data: event.data
    }
    
    const calculatedHash = await calculateEventHash(
      event.previousHash,
      event.timestamp,
      eventData
    )

    if (calculatedHash !== event.currentHash) {
      checks.hashIntegrity.failed++
      if (!invalidBlocks.includes(event.blockNumber)) {
        invalidBlocks.push(event.blockNumber)
      }
      issues.push({
        blockIndex: i,
        type: 'Hash Mismatch',
        severity: 'critical',
        description: `Block #${event.blockNumber}: Calculated hash does not match stored hash`
      })
    } else {
      checks.hashIntegrity.passed++
    }

    if (i > 0 && event.previousHash !== events[i - 1].currentHash) {
      checks.hashIntegrity.failed++
      if (!invalidBlocks.includes(event.blockNumber)) {
        invalidBlocks.push(event.blockNumber)
      }
      issues.push({
        blockIndex: i,
        type: 'Chain Break',
        severity: 'critical',
        description: `Block #${event.blockNumber}: Previous hash does not match prior block's hash`
      })
    }

    if (event.signatures && event.signatures.length > 0) {
      const allValid = event.signatures.every(sig => verifySignature(sig.signature, sig.publicKey))
      if (allValid) {
        checks.signatures.passed++
      } else {
        checks.signatures.failed++
        if (!invalidBlocks.includes(event.blockNumber)) {
          invalidBlocks.push(event.blockNumber)
        }
        issues.push({
          blockIndex: i,
          type: 'Invalid Signature',
          severity: 'critical',
          description: `Block #${event.blockNumber}: One or more digital signatures are invalid`
        })
      }
    }

    if (event.transformationData) {
      const balanced = verifyMassBalance(
        event.transformationData.inputs,
        event.transformationData.outputs,
        event.transformationData.losses
      )
      if (balanced) {
        checks.massBalance.passed++
      } else {
        checks.massBalance.failed++
        issues.push({
          blockIndex: i,
          type: 'Mass Balance Error',
          severity: 'warning',
          description: `Block #${event.blockNumber}: Inputs do not equal outputs + losses`
        })
      }
    }

    if (i > 0) {
      const currentTime = new Date(event.timestamp).getTime()
      const previousTime = new Date(events[i - 1].timestamp).getTime()
      if (currentTime >= previousTime) {
        checks.timestamps.passed++
      } else {
        checks.timestamps.failed++
        issues.push({
          blockIndex: i,
          type: 'Timestamp Anomaly',
          severity: 'warning',
          description: `Block #${event.blockNumber}: Timestamp is earlier than previous block`
        })
      }
    } else {
      checks.timestamps.passed++
    }
  }

  const isValid = invalidBlocks.length === 0

  return {
    isValid,
    totalBlocks: events.length,
    invalidBlocks,
    message: isValid 
      ? '✓ Chain Verified - Tamper-Evident Audit Trail Intact'
      : `⚠ Chain Integrity Issues Detected - ${invalidBlocks.length} block(s) have issues`,
    checks,
    issues
  }
}

export function generateBatchId(): string {
  return `BATCH-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

export function generateSignature(): string {
  const chars = '0123456789abcdef'
  let sig = '0x'
  for (let i = 0; i < 64; i++) {
    sig += chars[Math.floor(Math.random() * chars.length)]
  }
  return sig
}

export function generatePublicKey(): string {
  const chars = '0123456789abcdef'
  let key = '0x'
  for (let i = 0; i < 40; i++) {
    key += chars[Math.floor(Math.random() * chars.length)]
  }
  return key
}

export function generateIPFSHash(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz234567'
  let hash = 'bafy2bzaced'
  for (let i = 0; i < 46; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}
