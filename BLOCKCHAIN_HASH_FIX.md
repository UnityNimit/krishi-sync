# Blockchain Hash Verification Fix

## Problem Summary

All blockchain events were showing "Hash Mismatch" errors (7/7 blocks invalid in batch 1, 4/4 blocks invalid in batch 2). Every block reported: "Calculated hash does not match stored hash", making the blockchain traceability feature appear completely broken.

## Root Cause

The hash generation logic when creating seed data did NOT match the hash verification logic:

1. **Inconsistent JSON serialization**: The original code used `JSON.stringify()` without sorted keys, which can produce different outputs for the same data
2. **Hardcoded hashes**: Seed data contained manually created hashes (like `'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456'`) that didn't match the calculation
3. **Different data structures**: The hash calculation logic was assembling data differently during verification vs. creation

## Solution Implemented

### 1. Created Consistent Hash Utility (`src/utils/blockchain.ts`)

Added three key functions:

- **`canonicalJSON(obj)`**: Creates deterministic JSON strings with sorted keys
  - Ensures same object always produces same string regardless of property order
  - Handles nested objects, arrays, primitives, and null/undefined

- **`calculateEventHash(previousHash, timestamp, eventData)`**: The canonical hash calculation function
  - Used for BOTH seed data generation AND verification
  - Takes: previous hash + timestamp + event data
  - Returns: SHA-256 hash

- **Updated `createEventHash()`**: Now wraps `calculateEventHash()` for backwards compatibility

### 2. Updated Verification Logic

Modified `verifyChain()` to use the new `calculateEventHash()` function:
- Builds event data in consistent structure
- Uses same hash calculation as seed generation
- Properly verifies chain linkage (previousHash matches prior event's currentHash)

### 3. Regenerated All Seed Data Hashes

Created script: `scripts/regenerate-blockchain-hashes.mjs`
- Calculates correct hashes for all events in both batches
- Updates `src/data/traceabilityData.ts` with correct hashes
- Ensures proper chain linkage (each event's previousHash = prior event's currentHash)

#### Batch 1 (7 events):
```
Event 0 (planting):          16dd6ebe79d16c44badc682fc7aa84d0bdcfa13035d896f0ac26ddd4b3d9bf83
Event 1 (harvesting):        da3c27b6425f1479381e761f60e70b1f2da960df46c52a3941c0b18609bc4382
Event 2 (quality-inspection): 6f4b9d78a17e70c72f41105f416e1d99078acd55bb5fa4f6cae6462990fc6149
Event 3 (processing):        e612659d14aea0bc4d7dc47fae70ddbe49868829413ca8d2f8e49eacba15a94f
Event 4 (packaging):         05e6a116a27ce65066b7b4fa2d15a05fc7f98dae5d3f4e23dffd6e72bdfbd22f
Event 5 (distribution):      e1aac4c783f3d3ad8c3ca3fb7b86be3e6ce30dfc7be1aa142dec29b05b1f1fa6
Event 6 (retail-delivery):   3dee62e71533e4e59b17ec5c78c8ca29e2f46d47cf9bca0fb61f51ab58f4e142
```

#### Batch 2 (4 events):
```
Event 0 (planting):   eb3c8e04b8dbfc6d4c50ca4cb82c7bf73ac5f8a3b2a2a7a2cfca4b02819b08d2
Event 1 (harvesting): 3fab6bcfe635a5072de4aa80ad0ccb6f10fcfb87c91e47f8f5c7d3e2b77f60c4
Event 2 (processing): 7c44eeececa64030562eef13b68d87bb9e8ba45c0d3ba81d55b04d56b35d88c4
Event 3 (packaging):  d3348c04f89dd485b1e7b82d06c8b7dbea31d13bee51f8f9e7c7d9d1aa7b5b7c
```

### 4. Genesis Block Fix

Genesis block (first event in each batch) now has:
- `previousHash: '0000000000000000000000000000000000000000000000000000000000000000'` (64 zeros)
- Properly calculated `currentHash` based on this genesis previousHash

### 5. Test Suite

Created `scripts/test-verification.mjs` to verify:
- ✓ Genesis block hash calculation is correct
- ✓ Chain linkage works (event N+1's previousHash = event N's currentHash)
- ✓ JSON canonicalization produces consistent output
- ✓ All hashes match between generation and verification

## Verification Results

### Before Fix:
```
⚠ Chain Integrity Issues Detected - 7 block(s) have issues
Total Blocks: 7
Invalid Blocks: 7

Issues:
- Block #0: Hash Mismatch - Calculated hash does not match stored hash
- Block #1: Hash Mismatch - Calculated hash does not match stored hash
- Block #2: Hash Mismatch - Calculated hash does not match stored hash
- Block #3: Hash Mismatch - Calculated hash does not match stored hash
- Block #4: Hash Mismatch - Calculated hash does not match stored hash
- Block #5: Hash Mismatch - Calculated hash does not match stored hash
- Block #6: Hash Mismatch - Calculated hash does not match stored hash
```

### After Fix:
```
✓ Chain Verified - Tamper-Evident Audit Trail Intact
Total Blocks: 7
Invalid Blocks: 0

All checks passed:
- Hash Integrity: 7/7 ✓
- Signatures: 7/7 ✓
- Mass Balance: 1/1 ✓
- Timestamps: 7/7 ✓
```

## Technical Details

### Hash Calculation Formula

```typescript
hash = SHA256(previousHash + timestamp + canonicalJSON(eventData))
```

Where `eventData` includes:
- `batchId`: Batch identifier
- `eventType`: Type of event (planting, harvesting, etc.)
- `timestamp`: ISO 8601 timestamp
- `location`: Location data (object or string)
- `actor`: Actor performing the event
- `data`: Event-specific data (quality metrics, quantities, etc.)

### Canonical JSON Example

Input (unordered):
```json
{ "b": 2, "a": 1, "c": 3 }
```

Canonical output (sorted keys, no spaces):
```json
{"a":1,"b":2,"c":3}
```

This ensures that the same data always produces the same hash, regardless of property order.

## Files Modified

1. **`src/utils/blockchain.ts`**
   - Added `canonicalJSON()` function
   - Added `calculateEventHash()` function
   - Updated `verifyChain()` to use consistent hash calculation
   - Updated `createEventHash()` to wrap new function

2. **`src/data/traceabilityData.ts`**
   - Updated all `currentHash` values with correctly calculated hashes
   - Updated all `previousHash` values to properly link the chain
   - Fixed genesis blocks (previousHash = all zeros)

3. **`src/utils/regenerateHashes.ts`** (new)
   - Utility functions for regenerating event hashes
   - Can be used for future seed data updates

4. **`scripts/regenerate-blockchain-hashes.mjs`** (new)
   - Script to regenerate hashes in seed data
   - Run with: `node scripts/regenerate-blockchain-hashes.mjs`

5. **`scripts/test-verification.mjs`** (new)
   - Test suite to verify hash calculation
   - Run with: `node scripts/test-verification.mjs`

## Usage

### For Developers

When creating new seed data or events:

```typescript
import { calculateEventHash } from '@/utils/blockchain'

// Create event data
const eventData = {
  batchId: 'BATCH-12345',
  eventType: 'harvesting',
  timestamp: '2024-10-27T10:00:00Z',
  location: { name: 'Farm A', region: 'Maharashtra' },
  actor: 'Farmer John',
  data: {
    quantity: '1000 kg',
    quality: 'Grade A'
  }
}

// Calculate hash
const hash = await calculateEventHash(
  previousEventHash, // Use '0000...0000' for genesis
  eventData.timestamp,
  eventData
)

// Store in database
const event = {
  ...eventData,
  previousHash: previousEventHash,
  currentHash: hash,
  blockNumber: blockIndex
}
```

### Testing Verification

1. Navigate to Traceability page
2. Select a batch
3. Click on "Verification" tab
4. Should show: "✓ Chain Verified - Tamper-Evident Audit Trail Intact"
5. All blocks should show as valid (0 invalid blocks)

## Acceptance Criteria (All Met)

- ✅ All blockchain events show as VALID (0 invalid blocks)
- ✅ Hash verification logic matches hash generation logic exactly
- ✅ Genesis block validates correctly
- ✅ Chain linkage verified (previousHash matches)
- ✅ Seed data has correct hashes
- ✅ No "Hash Mismatch" errors
- ✅ Shows green "✓ Chain Verified" message
- ✅ Demo-ready for SIH judges

## Future Considerations

1. **Adding New Events**: Always use `calculateEventHash()` to generate the hash
2. **Seed Data Updates**: Run `regenerate-blockchain-hashes.mjs` if modifying event data
3. **Verification**: The `verifyChain()` function now properly validates all aspects:
   - Hash integrity
   - Chain linkage
   - Digital signatures
   - Mass balance (for transformation events)
   - Timestamp ordering

## Additional Notes

- The fix maintains backwards compatibility with existing code
- All TypeScript types remain unchanged
- The UI components work without modification
- The solution follows blockchain best practices for hash chain verification
- Genesis blocks properly use all-zeros previousHash
- JSON canonicalization ensures deterministic hashing
