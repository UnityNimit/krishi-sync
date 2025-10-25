import { TraceabilityBatch } from '../types'

export const mockBatches: TraceabilityBatch[] = [
  {
    id: '1',
    batchNumber: 'BATCH-1729788000000-ABC123XYZ',
    crop: 'Groundnut Oil (Blended Batch)',
    quantity: '250 MT',
    originFarm: 'Multiple farms in Maharashtra',
    createdAt: '2024-10-01T08:00:00Z',
    status: 'completed',
    isVerified: true,
    provenanceDAG: {
      nodes: [
        { id: 'R-2025-1234', type: 'RetailBatch', percentage: 100, label: 'Retail Batch' },
        { id: 'OIL-2025-10-25-01', type: 'OilBatch', percentage: 60, label: 'Oil Batch 1' },
        { id: 'OIL-2025-10-22-03', type: 'OilBatch', percentage: 40, label: 'Oil Batch 2' },
        { id: 'LOT-MH-2024-001', type: 'OilseedLot', percentage: 36, label: 'Seed Lot 1' },
        { id: 'LOT-MH-2024-007', type: 'OilseedLot', percentage: 24, label: 'Seed Lot 2' },
        { id: 'LOT-MH-2024-009', type: 'OilseedLot', percentage: 40, label: 'Seed Lot 3' }
      ],
      edges: [
        { from: 'LOT-MH-2024-001', to: 'OIL-2025-10-25-01', type: 'transformation' },
        { from: 'LOT-MH-2024-007', to: 'OIL-2025-10-25-01', type: 'transformation' },
        { from: 'LOT-MH-2024-009', to: 'OIL-2025-10-22-03', type: 'transformation' },
        { from: 'OIL-2025-10-25-01', to: 'R-2025-1234', type: 'blending' },
        { from: 'OIL-2025-10-22-03', to: 'R-2025-1234', type: 'blending' }
      ],
      sourceFarms: [
        { farmerId: 'FRM-MH-001', location: 'Pune District', percentage: 36 },
        { farmerId: 'FRM-MH-007', location: 'Nashik District', percentage: 24 },
        { farmerId: 'FRM-MH-009', location: 'Ahmednagar District', percentage: 40 }
      ]
    },
    events: [
      {
        id: 'evt-1',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'planting',
        epcisType: 'ObjectEvent',
        timestamp: '2024-10-01T08:00:00Z',
        location: {
          name: 'Green Valley Farm, Pune District',
          gln: '8901234500001',
          coordinates: { lat: 18.5204, lon: 73.8567 },
          region: 'Maharashtra'
        },
        actor: 'Rajesh Kumar (Farmer)',
        actorDID: 'did:example:farmer001',
        data: {
          seedVariety: 'Groundnut - GG20',
          fieldArea: '2.5 hectares',
          soilType: 'Red Sandy Loam',
          soilPH: '6.8',
          lotId: 'LOT-MH-2024-001'
        },
        previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
        currentHash: '16dd6ebe79d16c44badc682fc7aa84d0bdcfa13035d896f0ac26ddd4b3d9bf83',
        blockNumber: 0,
        signatures: [
          {
            signer: 'Farmer-001 (Rajesh Kumar)',
            role: 'Producer',
            publicKey: '0x8f3d7a2c1b9e4f5d6a8c3e1f7b9d4a6c',
            signature: '0x4e9b2d7f8a1c3e5b6d8f9a2c4e6b8d0f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b',
            signedAt: '2024-10-01T08:00:00Z',
            verified: true
          },
          {
            signer: 'FPO-Maharashtra-07',
            role: 'Collection Center',
            publicKey: '0x2c7a9e4f6d8b1a3c5e7f9b2d4a6c8e0f',
            signature: '0x9f1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b5d7f9a1c',
            signedAt: '2024-10-01T08:05:00Z',
            verified: true
          }
        ],
        iotVerifications: [
          {
            device: 'GPS-Tracker-789',
            type: 'Location',
            reading: '18.5204, 73.8567',
            coordinates: { lat: 18.5204, lon: 73.8567 },
            timestamp: '2024-10-01T08:00:00Z',
            signature: '0x4c2a8e6f9d1b3a5c7e9f1d3a5c7e9b1d',
            verified: true
          }
        ],
        satelliteVerification: {
          provider: 'Sentinel-2',
          acquisitionDate: '2024-09-25',
          ndvi: 0.68,
          areaCrossCheck: '✓ Matches declared 2.5 hectares',
          dataHash: 'bafy2bzacebqh7a3k5w2l8m9p6t1r4s7v'
        },
        offChainDataHash: 'bafy2bzacedqlh9a3k5w2l8m9p6t1r4s7vx2y5z8b',
        offChainStorage: 'IPFS',
        consensusSignatures: 9,
        consentRecords: [
          {
            purpose: 'Supply chain traceability',
            grantedAt: '2024-09-01',
            expiresAt: '2025-09-01',
            canRevoke: true
          }
        ]
      },
      {
        id: 'evt-2',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'harvesting',
        epcisType: 'ObjectEvent',
        timestamp: '2024-10-25T10:15:00Z',
        location: {
          name: 'Green Valley Farm, Pune District',
          gln: '8901234500001',
          region: 'Maharashtra'
        },
        actor: 'Rajesh Kumar (Farmer)',
        actorDID: 'did:example:farmer001',
        data: {
          harvestMethod: 'Manual with mechanized support',
          actualYield: '5000 kg',
          moisture: '8.5%',
          quality: 'Grade A',
          lotId: 'LOT-MH-2024-001'
        },
        previousHash: '16dd6ebe79d16c44badc682fc7aa84d0bdcfa13035d896f0ac26ddd4b3d9bf83',
        currentHash: 'da3c27b6425f1479381e761f60e70b1f2da960df46c52a3941c0b18609bc4382',
        blockNumber: 1,
        signatures: [
          {
            signer: 'Farmer-001 (Rajesh Kumar)',
            role: 'Producer',
            publicKey: '0x8f3d7a2c1b9e4f5d6a8c3e1f7b9d4a6c',
            signature: '0x5f8c3e1b7d9a2c4e6f8a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d',
            signedAt: '2024-10-25T10:15:00Z',
            verified: true
          },
          {
            signer: 'FPO-Maharashtra-07',
            role: 'Collection Center',
            publicKey: '0x2c7a9e4f6d8b1a3c5e7f9b2d4a6c8e0f',
            signature: '0x8e1c4f7a9d2b5e8c1f4a7d0b3e6c9f2a5d8e1b4f7a0c3e6b9d2f5a8c1e4b7d0a',
            signedAt: '2024-10-25T10:18:00Z',
            verified: true
          },
          {
            signer: 'Weighbridge-MH-123',
            role: 'Verification',
            publicKey: '0x5d2b8c4f7a1e3d6b9c2f5a8e1d4b7c0a',
            signature: '0x7a3d5f8c1e4b7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a',
            signedAt: '2024-10-25T10:20:00Z',
            verified: true
          }
        ],
        iotVerifications: [
          {
            device: 'Weighbridge-MH-123',
            type: 'Weight',
            reading: '5000 kg',
            calibrationDate: '2024-10-01',
            certified: true,
            signature: '0x7d3a5f8c1e4b7d0a3c6e9f2b5d8a1c4e',
            verified: true
          },
          {
            device: 'Moisture-Meter-456',
            type: 'Moisture',
            reading: '8.5%',
            standard: 'ISO 665:2000',
            signature: '0x2e9f7c4a8d1b5e3f9a2c6d8e1b4f7a0c',
            verified: true
          }
        ],
        offChainDataHash: 'bafy2bzacedmnp8h3j5k2w9l7m4p6t1r',
        offChainStorage: 'IPFS',
        consensusSignatures: 10
      },
      {
        id: 'evt-3',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'quality-inspection',
        epcisType: 'ObjectEvent',
        timestamp: '2024-10-25T14:00:00Z',
        location: {
          name: 'FPO Collection Center',
          gln: '8901234500002',
          region: 'Maharashtra'
        },
        actor: 'Quality Inspector - Priya Sharma',
        actorDID: 'did:example:inspector007',
        data: {
          freeAcidity: '0.8%',
          oilContent: '48.5%',
          impurities: '1.2%',
          grade: 'Grade A',
          lotId: 'LOT-MH-2024-001'
        },
        previousHash: 'da3c27b6425f1479381e761f60e70b1f2da960df46c52a3941c0b18609bc4382',
        currentHash: '6f4b9d78a17e70c72f41105f416e1d99078acd55bb5fa4f6cae6462990fc6149',
        blockNumber: 2,
        signatures: [
          {
            signer: 'Quality Inspector',
            role: 'Inspector',
            publicKey: '0x9e6c3f8a1d4b7c0e3f6a9d2c5e8b1f4a',
            signature: '0x1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a',
            signedAt: '2024-10-25T14:00:00Z',
            verified: true
          },
          {
            signer: 'FPO-Maharashtra-07',
            role: 'Witness',
            publicKey: '0x2c7a9e4f6d8b1a3c5e7f9b2d4a6c8e0f',
            signature: '0x3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e',
            signedAt: '2024-10-25T14:02:00Z',
            verified: true
          }
        ],
        labCertification: {
          labName: 'NABL Accredited Lab - Mumbai',
          reportId: 'LAB-2025-1234',
          parameters: {
            'Free Acidity': '0.8% (Grade A)',
            'Oil Content': '48.5%',
            'Moisture': '8.2%',
            'Impurities': '1.2%'
          },
          grade: 'Grade A',
          verifiableCredential: 'did:vc:lab001:cert1234',
          signature: '0x9a2b5c8e1d4f7a0c3e6b9d2f5a8c1e4b7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e',
          verified: true
        },
        offChainDataHash: 'bafy2bzacedxyz9k4j6m2p8l5n7q3s',
        offChainStorage: 'IPFS',
        consensusSignatures: 11
      },
      {
        id: 'evt-4',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'processing',
        epcisType: 'TransformationEvent',
        timestamp: '2024-10-25T14:30:00Z',
        location: {
          name: 'XYZ Oil Mills Pvt Ltd - Pune',
          gln: '8901234500012',
          coordinates: { lat: 18.5204, lon: 73.8567 },
          region: 'Maharashtra'
        },
        actor: 'Mill Operator - Suresh Patel',
        actorDID: 'did:example:processor123',
        data: {
          processType: 'Cold Pressing',
          temperature: '28°C',
          batchId: 'OIL-2025-10-25-01',
          byproductBatchId: 'CAKE-2025-10-25-01'
        },
        previousHash: '6f4b9d78a17e70c72f41105f416e1d99078acd55bb5fa4f6cae6462990fc6149',
        currentHash: 'e612659d14aea0bcccf2c2ac5387600c5b1e3fd98a5ea451ec08186f42b42082',
        blockNumber: 3,
        transformationData: {
          inputs: [
            {
              assetType: 'OilseedLot',
              assetId: 'LOT-MH-2024-001',
              quantity: { value: 100.0, uom: 'MT' },
              variety: 'Groundnut - GG20'
            },
            {
              assetType: 'OilseedLot',
              assetId: 'LOT-MH-2024-007',
              quantity: { value: 200.0, uom: 'MT' },
              variety: 'Groundnut - GG20'
            }
          ],
          outputs: [
            {
              assetType: 'OilBatch',
              assetId: 'OIL-2025-10-25-01',
              quantity: { value: 250.0, uom: 'MT' },
              product: 'Groundnut Oil - Refined'
            },
            {
              assetType: 'CakeBatch',
              assetId: 'CAKE-2025-10-25-01',
              quantity: { value: 30.0, uom: 'MT' },
              product: 'Oil Cake'
            }
          ],
          losses: { value: 20.0, uom: 'MT', reason: 'Moisture, impurities, processing losses' },
          massBalanceVerified: true
        },
        signatures: [
          {
            signer: 'Mill Operator',
            role: 'Processor',
            publicKey: '0x7f4c8a1e3d6b9f2c5a8e1d4b7c0f3a6e',
            signature: '0x6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f',
            signedAt: '2024-10-25T14:30:00Z',
            verified: true
          },
          {
            signer: 'Quality Inspector',
            role: 'Quality Control',
            publicKey: '0x9e6c3f8a1d4b7c0e3f6a9d2c5e8b1f4a',
            signature: '0x8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a1c',
            signedAt: '2024-10-25T14:35:00Z',
            verified: true
          },
          {
            signer: 'FSSAI Officer',
            role: 'Regulatory',
            publicKey: '0x3c5e8b1f4a7d0c3e6f9b2d5a8c1e4b7d',
            signature: '0x2c5e8b1f4a7d0c3e6f9b2d5a8c1e4b7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b',
            signedAt: '2024-10-25T14:40:00Z',
            verified: true
          }
        ],
        iotVerifications: [
          {
            device: 'Weighbridge-Processor-45',
            type: 'Weight',
            reading: '300 MT (inputs)',
            calibrationDate: '2024-10-15',
            certified: true,
            signature: '0x5c8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d',
            verified: true
          },
          {
            device: 'Temperature-Sensor-78',
            type: 'Temperature',
            reading: '28°C',
            signature: '0x9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a',
            verified: true
          }
        ],
        offChainDataHash: 'bafy2bzacedwxy8m4j5l2p9n6q3t7r',
        offChainStorage: 'IPFS',
        consensusSignatures: 10
      },
      {
        id: 'evt-5',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'packaging',
        epcisType: 'AggregationEvent',
        timestamp: '2024-10-26T09:00:00Z',
        location: {
          name: 'XYZ Oil Mills Packaging Unit',
          gln: '8901234500013',
          region: 'Maharashtra'
        },
        actor: 'Packaging Supervisor - Anjali Verma',
        actorDID: 'did:example:packaging456',
        data: {
          packageType: '1L bottles',
          totalUnits: '250000 bottles',
          batchLabeling: 'QR Code + Blockchain Hash',
          expiryDate: '2025-10-26',
          retailBatchId: 'R-2025-1234'
        },
        previousHash: 'e612659d14aea0bcccf2c2ac5387600c5b1e3fd98a5ea451ec08186f42b42082',
        currentHash: '05e6a116a27ce65086242753fcfe8c76c94e8365899cfa7087e8ed0c3fcc8d9d',
        blockNumber: 4,
        signatures: [
          {
            signer: 'Packaging Supervisor',
            role: 'Packaging',
            publicKey: '0x4e7a0c3f6b9d2e5a8c1f4b7d0e3a6c9f',
            signature: '0x7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d',
            signedAt: '2024-10-26T09:00:00Z',
            verified: true
          },
          {
            signer: 'Quality Control',
            role: 'QC Approval',
            publicKey: '0x9e6c3f8a1d4b7c0e3f6a9d2c5e8b1f4a',
            signature: '0x3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d3f6a',
            signedAt: '2024-10-26T09:05:00Z',
            verified: true
          }
        ],
        offChainDataHash: 'bafy2bzacedpqr5n7k4m9l2j8p6t3s',
        offChainStorage: 'IPFS',
        consensusSignatures: 11
      },
      {
        id: 'evt-6',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'distribution',
        epcisType: 'TransactionEvent',
        timestamp: '2024-10-27T06:00:00Z',
        location: {
          name: 'Mumbai Distribution Hub',
          gln: '8901234500020',
          region: 'Maharashtra'
        },
        actor: 'Logistics Manager - Vikram Malhotra',
        actorDID: 'did:example:logistics789',
        data: {
          vehicle: 'Refrigerated Truck RT-5678',
          temperature: '20°C',
          distance: '150 km',
          destination: 'Retail Distribution Centers - Mumbai',
          eta: '2024-10-27T10:00:00Z'
        },
        previousHash: '05e6a116a27ce65086242753fcfe8c76c94e8365899cfa7087e8ed0c3fcc8d9d',
        currentHash: 'e1aac4c783f3d3adea17baa797c707e5740b29e4cbd6ed4857727e72e96d548b',
        blockNumber: 5,
        signatures: [
          {
            signer: 'Logistics Manager',
            role: 'Transport',
            publicKey: '0x1c4f7a0d3e6b9c2f5a8d1e4b7c0f3a6e',
            signature: '0x9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e',
            signedAt: '2024-10-27T06:00:00Z',
            verified: true
          },
          {
            signer: 'Warehouse Manager',
            role: 'Dispatch Approval',
            publicKey: '0x8d1f4b7c0e3a6c9f2b5d8e1c4f7a0d3e',
            signature: '0x5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d',
            signedAt: '2024-10-27T06:05:00Z',
            verified: true
          }
        ],
        iotVerifications: [
          {
            device: 'GPS-Tracker-RT5678',
            type: 'GPS Tracking',
            reading: 'Route tracking active',
            signature: '0x7a0c3e6b9d2f5a8c1e4b7d0a3c6e9f2b',
            verified: true
          },
          {
            device: 'Temperature-Logger-RT5678',
            type: 'Temperature',
            reading: '20°C (maintained)',
            signature: '0x3e6b9d2f5a8c1e4b7d0a3c6e9f2b5d8a',
            verified: true
          }
        ],
        offChainDataHash: 'bafy2bzacedstu6p8k3n9m5j7l4q2r',
        offChainStorage: 'IPFS',
        consensusSignatures: 9
      },
      {
        id: 'evt-7',
        batchId: 'BATCH-1729788000000-ABC123XYZ',
        eventType: 'retail-delivery',
        epcisType: 'ObjectEvent',
        timestamp: '2024-10-27T10:30:00Z',
        location: {
          name: 'Fresh Organic Stores - Mumbai',
          gln: '8901234500030',
          region: 'Maharashtra'
        },
        actor: 'Store Manager - Neha Kapoor',
        actorDID: 'did:example:retail001',
        data: {
          receivedQuantity: '250 MT (250,000 bottles)',
          storageCondition: 'Climate Controlled Warehouse',
          shelfPlacement: 'Premium Oil Section',
          retailPrice: '₹180/L'
        },
        previousHash: 'e1aac4c783f3d3adea17baa797c707e5740b29e4cbd6ed4857727e72e96d548b',
        currentHash: '3dee62e71533e4e592af548bdcdf64a0a1396972672a6399bc360e09f5dbc865',
        blockNumber: 6,
        signatures: [
          {
            signer: 'Store Manager',
            role: 'Retailer',
            publicKey: '0x2f5a8c1e4b7d0a3c6e9f2b5d8a1c4e7b',
            signature: '0x1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a',
            signedAt: '2024-10-27T10:30:00Z',
            verified: true
          },
          {
            signer: 'Logistics Manager',
            role: 'Delivery Confirmation',
            publicKey: '0x1c4f7a0d3e6b9c2f5a8d1e4b7c0f3a6e',
            signature: '0x7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e',
            signedAt: '2024-10-27T10:35:00Z',
            verified: true
          }
        ],
        offChainDataHash: 'bafy2bzacedvwx7q9l4k8n3m6p2t5s',
        offChainStorage: 'IPFS',
        consensusSignatures: 10
      }
    ]
  },
  {
    id: '2',
    batchNumber: 'BATCH-1730480000000-DEF456UVW',
    crop: 'Basmati Rice',
    quantity: '3000 kg',
    originFarm: 'Golden Fields, Haryana',
    createdAt: '2024-10-20T09:00:00Z',
    status: 'active',
    isVerified: true,
    events: [
      {
        id: 'evt-11',
        batchId: 'BATCH-1730480000000-DEF456UVW',
        eventType: 'planting',
        epcisType: 'ObjectEvent',
        timestamp: '2024-10-20T09:00:00Z',
        location: {
          name: 'Golden Fields, Haryana',
          gln: '8901234510001',
          coordinates: { lat: 29.0588, lon: 76.0856 },
          region: 'Haryana'
        },
        actor: 'Harpreet Singh (Farmer)',
        actorDID: 'did:example:farmer002',
        data: {
          seedVariety: 'Pusa Basmati 1509',
          fieldArea: '1.5 hectares',
          soilType: 'Clay loam',
          soilPH: '7.0',
          lotId: 'LOT-HR-2024-001'
        },
        previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
        currentHash: '0c33c37aeff2692d9ec94f7f10416d894fdee6f13ff875de9802966941c0ff2a',
        blockNumber: 0,
        signatures: [
          {
            signer: 'Farmer-002 (Harpreet Singh)',
            role: 'Producer',
            publicKey: '0x6c8e2f5a1d4b7c0e3f9a2d5c8e1b4f7a',
            signature: '0x8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b',
            signedAt: '2024-10-20T09:00:00Z',
            verified: true
          },
          {
            signer: 'FPO-Haryana-12',
            role: 'Collection Center',
            publicKey: '0x9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a',
            signature: '0x4f7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d',
            signedAt: '2024-10-20T09:05:00Z',
            verified: true
          }
        ],
        iotVerifications: [
          {
            device: 'GPS-Tracker-HR456',
            type: 'Location',
            reading: '29.0588, 76.0856',
            coordinates: { lat: 29.0588, lon: 76.0856 },
            timestamp: '2024-10-20T09:00:00Z',
            signature: '0x2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d',
            verified: true
          }
        ],
        satelliteVerification: {
          provider: 'Sentinel-2',
          acquisitionDate: '2024-10-15',
          ndvi: 0.72,
          areaCrossCheck: '✓ Matches declared 1.5 hectares',
          dataHash: 'bafy2bzacedhr5k2w9l8m4j6p3t1s7v'
        },
        offChainDataHash: 'bafy2bzacedhr9k4j6m2p8l5n7q3s',
        offChainStorage: 'IPFS',
        consensusSignatures: 11
      },
      {
        id: 'evt-12',
        batchId: 'BATCH-1730480000000-DEF456UVW',
        eventType: 'irrigation',
        epcisType: 'ObjectEvent',
        timestamp: '2024-11-02T07:00:00Z',
        location: {
          name: 'Golden Fields, Haryana',
          region: 'Haryana'
        },
        actor: 'Harpreet Singh (Farmer)',
        actorDID: 'did:example:farmer002',
        data: {
          method: 'Flood Irrigation',
          waterVolume: '15000 liters',
          duration: '8 hours'
        },
        previousHash: '0c33c37aeff2692d9ec94f7f10416d894fdee6f13ff875de9802966941c0ff2a',
        currentHash: 'ee225e3fed78d3f6514acbb42114745e9edd9c37cd8a36dd1ad1e89e8f11a0cc',
        blockNumber: 1,
        signatures: [
          {
            signer: 'Farmer-002 (Harpreet Singh)',
            role: 'Producer',
            publicKey: '0x6c8e2f5a1d4b7c0e3f9a2d5c8e1b4f7a',
            signature: '0x0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c',
            signedAt: '2024-11-02T07:00:00Z',
            verified: true
          }
        ],
        iotVerifications: [
          {
            device: 'Flow-Meter-HR789',
            type: 'Water Volume',
            reading: '15000 liters',
            signature: '0x6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f',
            verified: true
          }
        ],
        offChainDataHash: 'bafy2bzacedhr8m3j5k7l9n2p4q6r',
        offChainStorage: 'IPFS',
        consensusSignatures: 9
      },
      {
        id: 'evt-13',
        batchId: 'BATCH-1730480000000-DEF456UVW',
        eventType: 'growth-monitoring',
        epcisType: 'ObjectEvent',
        timestamp: '2024-11-15T10:00:00Z',
        location: {
          name: 'Golden Fields, Haryana',
          region: 'Haryana'
        },
        actor: 'Agricultural Extension Officer - Dr. Amit Sharma',
        actorDID: 'did:example:inspector008',
        data: {
          plantHeight: '85 cm',
          healthStatus: 'Good',
          leafColor: 'Bright Green',
          pestObservations: 'Minor aphid presence'
        },
        previousHash: 'ee225e3fed78d3f6514acbb42114745e9edd9c37cd8a36dd1ad1e89e8f11a0cc',
        currentHash: '6b771190b31bc70388ffb68674933217994564f556840df3da2c1a542a880178',
        blockNumber: 2,
        signatures: [
          {
            signer: 'Agricultural Officer',
            role: 'Monitor',
            publicKey: '0x7d0a3c6e9f2b5d8a1c4e7b0d3f6a9c2e',
            signature: '0x3c6e9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e',
            signedAt: '2024-11-15T10:00:00Z',
            verified: true
          },
          {
            signer: 'Farmer-002 (Harpreet Singh)',
            role: 'Witness',
            publicKey: '0x6c8e2f5a1d4b7c0e3f9a2d5c8e1b4f7a',
            signature: '0x9f2b5d8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b',
            signedAt: '2024-11-15T10:05:00Z',
            verified: true
          }
        ],
        offChainDataHash: 'bafy2bzacedhr7n4k6m8l2j9p5q3s',
        offChainStorage: 'IPFS',
        consensusSignatures: 10
      },
      {
        id: 'evt-14',
        batchId: 'BATCH-1730480000000-DEF456UVW',
        eventType: 'pest-treatment',
        epcisType: 'ObjectEvent',
        timestamp: '2024-11-18T08:00:00Z',
        location: {
          name: 'Golden Fields, Haryana',
          region: 'Haryana'
        },
        actor: 'Harpreet Singh (Farmer)',
        actorDID: 'did:example:farmer002',
        data: {
          pestType: 'Aphids',
          treatment: 'Neem Oil Spray',
          quantity: '5 liters',
          method: 'Organic spray application'
        },
        previousHash: '6b771190b31bc70388ffb68674933217994564f556840df3da2c1a542a880178',
        currentHash: 'afd6575a48f0ad2c6b3d3ced99519a4f35e04cd89889f657861821c67959c909',
        blockNumber: 3,
        signatures: [
          {
            signer: 'Farmer-002 (Harpreet Singh)',
            role: 'Producer',
            publicKey: '0x6c8e2f5a1d4b7c0e3f9a2d5c8e1b4f7a',
            signature: '0x5d8a1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a',
            signedAt: '2024-11-18T08:00:00Z',
            verified: true
          },
          {
            signer: 'Organic Certification Body',
            role: 'Compliance',
            publicKey: '0x1c4e7b0d3f6a9c2e5b8d1f4a7c0e3b6d',
            signature: '0x7b0d3f6a9c2e5b8d1f4a7c0e3b6d9f2a5c8e1b4f7d0a3c6e9f2b5d8a1c4e7b0d',
            signedAt: '2024-11-18T08:10:00Z',
            verified: true
          }
        ],
        offChainDataHash: 'bafy2bzacedhr6p5k7m9l3j8n4q2r',
        offChainStorage: 'IPFS',
        consensusSignatures: 11
      }
    ]
  }
]
