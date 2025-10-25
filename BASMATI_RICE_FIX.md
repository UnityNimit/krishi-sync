# Basmati Rice Blockchain Hash Fix

## Issue
Groundnut Oil blockchain verification was working correctly (0 invalid blocks), but Basmati Rice was showing 4/4 invalid blocks. This indicated that the hash calculation logic was correct, but the Basmati Rice blockchain event data had incorrect/old hashes.

## Root Cause
The original `regenerate-blockchain-hashes.mjs` script used **placeholder data** for Basmati Rice events that did not match the actual event data in `traceabilityData.ts`:

**Script used:**
- `actor: 'Suresh Gupta (Farmer)'`
- `location: 'Golden Fields, Haryana'` (string)

**Actual data had:**
- `actor: 'Harpreet Singh (Farmer)'`
- `location: { name: 'Golden Fields, Haryana', gln: '8901234510001', coordinates: {...}, region: 'Haryana' }` (object)

Since the event data structure was completely different, the generated hashes didn't match the verification logic.

## Solution
Created a new script `regenerate-basmati-hashes.mjs` that uses the **actual Basmati Rice event data** from the file and regenerated all 4 blockchain event hashes.

## Changes Made

### Files Modified
1. **`src/data/traceabilityData.ts`** - Updated all Basmati Rice event hashes

### Scripts Created
1. **`scripts/regenerate-basmati-hashes.mjs`** - Script to regenerate hashes using actual data
2. **`scripts/test-basmati-verification.mjs`** - Test script to verify the fix

### Hash Updates

#### Event 0 (evt-11) - planting
- **Old Hash:** `3cca3c4167be2637c310a1b2530a2ed184f03853fc592b396381f74904dc3dbe`
- **New Hash:** `0c33c37aeff2692d9ec94f7f10416d894fdee6f13ff875de9802966941c0ff2a`
- **Previous Hash:** `0000000000000000000000000000000000000000000000000000000000000000` (genesis)

#### Event 1 (evt-12) - irrigation
- **Old Previous Hash:** `3cca3c4167be2637c310a1b2530a2ed184f03853fc592b396381f74904dc3dbe`
- **New Previous Hash:** `0c33c37aeff2692d9ec94f7f10416d894fdee6f13ff875de9802966941c0ff2a`
- **Old Hash:** `861eb3c3394c479e9c687b92f0ee5543609008b8931db5775b592b2c0dbcf934`
- **New Hash:** `ee225e3fed78d3f6514acbb42114745e9edd9c37cd8a36dd1ad1e89e8f11a0cc`

#### Event 2 (evt-13) - growth-monitoring
- **Old Previous Hash:** `861eb3c3394c479e9c687b92f0ee5543609008b8931db5775b592b2c0dbcf934`
- **New Previous Hash:** `ee225e3fed78d3f6514acbb42114745e9edd9c37cd8a36dd1ad1e89e8f11a0cc`
- **Old Hash:** `f70cdb5d78447778ea3472f9e55d2f4eb3e62f9bb728b66f32088202decaa747`
- **New Hash:** `6b771190b31bc70388ffb68674933217994564f556840df3da2c1a542a880178`

#### Event 3 (evt-14) - pest-treatment
- **Old Previous Hash:** `f70cdb5d78447778ea3472f9e55d2f4eb3e62f9bb728b66f32088202decaa747`
- **New Previous Hash:** `6b771190b31bc70388ffb68674933217994564f556840df3da2c1a542a880178`
- **Old Hash:** `97c8c2330258e6ffca9875e386479c22840729e016cbc376ee9bfdd6fef6891b`
- **New Hash:** `afd6575a48f0ad2c6b3d3ced99519a4f35e04cd89889f657861821c67959c909`

## Verification Results

### Before Fix
```
Basmati Rice (BATCH-1730480000000-DEF456UVW)
Total Blocks: 4
Invalid Blocks: 4/4
Message: ⚠ Chain Integrity Issues Detected

Issues:
- Block #0: Hash Mismatch
- Block #1: Hash Mismatch + Chain Break
- Block #2: Hash Mismatch + Chain Break
- Block #3: Hash Mismatch + Chain Break
```

### After Fix
```
Basmati Rice (BATCH-1730480000000-DEF456UVW)
Total Blocks: 4
Invalid Blocks: 0
Status: ✓ Chain Verified - Tamper-Evident Audit Trail Intact

All checks passed:
- Hash Integrity: 4/4 ✓
- Chain Linkage: 4/4 ✓
- Signatures: 4/4 ✓
- Timestamps: 4/4 ✓
```

## Testing
Run the verification test:
```bash
node scripts/test-basmati-verification.mjs
```

Expected output:
```
✓ SUCCESS! Basmati Rice blockchain is now valid.
The UI should now show: "✓ Chain Verified - 0 invalid blocks"
```

## Impact
- ✅ Basmati Rice blockchain now shows as VALID (0 invalid blocks)
- ✅ All chain linkages are correct (previousHash matches prior event's currentHash)
- ✅ Matches the success pattern of Groundnut Oil
- ✅ Both products now demonstrate proper blockchain verification
- ✅ Demo-ready for SIH judges - feature is fully functional

## Key Learnings
1. **Always use actual data** when regenerating hashes - never use placeholder/simplified data
2. **Verify event structure** matches exactly between data and hash calculation
3. **Test each product separately** to catch product-specific issues
4. **Chain linkage is critical** - each event's previousHash must equal the prior event's currentHash

## Future Maintenance
When adding new blockchain events for Basmati Rice or any other product:
1. Use the actual event data structure from the file
2. Use `calculateEventHash()` from `utils/blockchain.ts`
3. Ensure proper chain linkage (previousHash = prior event's currentHash)
4. Test with verification function before committing
5. Run product-specific test scripts to verify

## Related Files
- `src/data/traceabilityData.ts` - Contains the blockchain event data
- `src/utils/blockchain.ts` - Contains hash calculation functions
- `scripts/regenerate-basmati-hashes.mjs` - Regeneration script for Basmati Rice
- `scripts/test-basmati-verification.mjs` - Test script for verification
