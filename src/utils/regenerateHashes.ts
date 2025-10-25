/**
 * Utility script to regenerate blockchain hashes for seed data
 * This ensures all hashes match the verification logic
 */

import { SupplyChainEvent } from '../types'
import { calculateEventHash } from './blockchain'

/**
 * Regenerate hashes for a chain of events
 * This modifies the events array in place, updating all currentHash values
 */
export async function regenerateEventHashes(events: SupplyChainEvent[]): Promise<void> {
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
    const correctHash = await calculateEventHash(
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
  }
}

/**
 * Print event hashes for debugging
 */
export function printEventHashes(events: SupplyChainEvent[]): void {
  console.log('=== Event Hashes ===')
  events.forEach((event, index) => {
    console.log(`\nEvent ${index} (${event.eventType}):`)
    console.log(`  Previous Hash: ${event.previousHash}`)
    console.log(`  Current Hash:  ${event.currentHash}`)
    if (index > 0 && event.previousHash !== events[index - 1].currentHash) {
      console.log(`  ⚠️  WARNING: Previous hash doesn't match prior event!`)
    }
  })
  console.log('===================')
}
