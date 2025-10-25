import { MarketplaceLot } from '../types'

export const mockMarketplaceLots: MarketplaceLot[] = [
  {
    id: 'LOT-2024-01',
    crop: 'Wheat',
    variety: 'HD-3086',
    lotSizeTons: 18,
    qualityGrade: 'A',
    moisture: '12.5%',
    location: 'Karnal, Haryana',
    harvestDate: '2024-03-05',
    status: 'available',
    askingPricePerTon: 24500,
    bestOfferPerTon: 23800,
    contractCurrency: 'INR',
    engagementScore: 68,
    activeOffers: 3,
    assuranceNotes: [
      'Quality samples verified by FPO inspector',
      'Moisture within buyer tolerance range',
      'Warehouse-backed receipt available'
    ],
    buyerInterest: [
      {
        id: 'buyer-1',
        buyerName: 'Annapurna Foods',
        organization: 'Regional Flour Mill',
        offerPerTon: 23800,
        volumeTons: 15,
        status: 'active',
        updatedAt: '2 hours ago'
      },
      {
        id: 'buyer-2',
        buyerName: 'Metro Retail',
        organization: 'Modern Trade',
        offerPerTon: 23500,
        volumeTons: 12,
        status: 'counter',
        updatedAt: '4 hours ago'
      },
      {
        id: 'buyer-3',
        buyerName: 'GrainWise',
        organization: 'Export Aggregator',
        offerPerTon: 24000,
        volumeTons: 10,
        status: 'active',
        updatedAt: '1 day ago'
      }
    ],
    logisticsOptions: [
      {
        id: 'log-1',
        provider: 'AgriTrans Logistics',
        mode: 'Road • 12 MT truck',
        estimatedCost: '₹2,800',
        transitTime: '36 hours',
        availability: 'Can load within 24 hours',
        capacity: '18 MT remaining',
        reliabilityScore: 92
      },
      {
        id: 'log-2',
        provider: 'Rail Freight Collective',
        mode: 'Rail • Covered wagon',
        estimatedCost: '₹2,200',
        transitTime: '48 hours',
        availability: 'Dispatch window: 16 March',
        capacity: '60 MT consolidated',
        reliabilityScore: 87
      }
    ],
    creditOptions: [
      {
        id: 'cred-1',
        provider: 'NABARD Partner NBFC',
        product: 'Inventory Finance',
        rate: '9.5% p.a.',
        maxAmount: '₹12,00,000',
        approvalTime: 'Same-day digital approval',
        notes: 'Backed by warehouse receipt, 60-day tenor'
      },
      {
        id: 'cred-2',
        provider: 'AgriPay Cooperative Bank',
        product: 'Working Capital Bridge',
        rate: '8.9% p.a.',
        maxAmount: '₹9,50,000',
        approvalTime: '24 hours',
        notes: 'Ideal for financing logistics to buyer dispatch'
      }
    ]
  },
  {
    id: 'LOT-2024-07',
    crop: 'Chickpea',
    variety: 'JG-11',
    lotSizeTons: 12,
    qualityGrade: 'A-',
    moisture: '11.8%',
    location: 'Latur, Maharashtra',
    harvestDate: '2024-02-26',
    status: 'in-negotiation',
    askingPricePerTon: 56000,
    bestOfferPerTon: 55250,
    contractCurrency: 'INR',
    engagementScore: 74,
    activeOffers: 2,
    assuranceNotes: [
      'Protein content at 21%',
      'Traceability documentation uploaded'
    ],
    buyerInterest: [
      {
        id: 'buyer-4',
        buyerName: 'PulseX Global',
        organization: 'Export House',
        offerPerTon: 55250,
        volumeTons: 12,
        status: 'counter',
        updatedAt: '45 minutes ago'
      },
      {
        id: 'buyer-5',
        buyerName: 'Healthy Harvest Retail',
        organization: 'D2C Brand',
        offerPerTon: 54800,
        volumeTons: 8,
        status: 'active',
        updatedAt: '3 hours ago'
      }
    ],
    logisticsOptions: [
      {
        id: 'log-3',
        provider: 'GreenLine Movers',
        mode: 'Road • 10 MT reefer',
        estimatedCost: '₹3,400',
        transitTime: '28 hours',
        availability: 'Blocking slot for 15 March',
        capacity: '20 MT combined',
        reliabilityScore: 90
      },
      {
        id: 'log-4',
        provider: 'AgriRail Corridor',
        mode: 'Rail • Express cargo',
        estimatedCost: '₹2,950',
        transitTime: '40 hours',
        availability: 'Weekly departure every Friday',
        capacity: 'Up to 80 MT in cluster',
        reliabilityScore: 84
      }
    ],
    creditOptions: [
      {
        id: 'cred-3',
        provider: 'Farmers Collective FPO',
        product: 'Member Advance',
        rate: 'Subsidised 7.5% p.a.',
        maxAmount: '₹6,00,000',
        approvalTime: '6 hours',
        notes: 'Requires FPO board sign-off'
      },
      {
        id: 'cred-4',
        provider: 'AgriBank Rural',
        product: 'Pre-shipment Credit',
        rate: '10.2% p.a.',
        maxAmount: '₹8,50,000',
        approvalTime: 'Next day',
        notes: 'Supports export documentation costs'
      }
    ]
  },
  {
    id: 'LOT-2024-11',
    crop: 'Mustard',
    variety: 'Pusa Mustard 30',
    lotSizeTons: 22,
    qualityGrade: 'Premium',
    moisture: '9.6%',
    location: 'Bharatpur, Rajasthan',
    harvestDate: '2024-03-02',
    status: 'under-fulfillment',
    askingPricePerTon: 48000,
    bestOfferPerTon: 47500,
    contractCurrency: 'INR',
    engagementScore: 82,
    activeOffers: 4,
    assuranceNotes: [
      'Oil content tested at 41%',
      'Sorting and grading completed',
      'Insurance cover activated for transit'
    ],
    buyerInterest: [
      {
        id: 'buyer-6',
        buyerName: 'Golden Oils Ltd',
        organization: 'Oil Mill',
        offerPerTon: 47500,
        volumeTons: 20,
        status: 'accepted',
        updatedAt: 'Today, 10:15 AM'
      },
      {
        id: 'buyer-7',
        buyerName: 'AgroAllied Traders',
        organization: 'Bulk Reseller',
        offerPerTon: 47000,
        volumeTons: 10,
        status: 'active',
        updatedAt: 'Yesterday'
      }
    ],
    logisticsOptions: [
      {
        id: 'log-5',
        provider: 'TraceRoute Logistics',
        mode: 'Road • Multi-axle 20 MT',
        estimatedCost: '₹4,100',
        transitTime: '30 hours',
        availability: 'Vehicle reserved - loading 14 March',
        capacity: '20 MT committed',
        reliabilityScore: 94
      },
      {
        id: 'log-6',
        provider: 'NationWide Rail',
        mode: 'Rail • Containerised',
        estimatedCost: '₹3,600',
        transitTime: '42 hours',
        availability: 'Awaiting buyer confirmation',
        capacity: '40 MT shared wagon',
        reliabilityScore: 89
      }
    ],
    creditOptions: [
      {
        id: 'cred-5',
        provider: 'AgriCap Finance',
        product: 'Fulfilment Bridge Loan',
        rate: '9.2% p.a.',
        maxAmount: '₹14,00,000',
        approvalTime: 'Instant (post-offer acceptance)',
        notes: 'Disburses directly to logistics partner'
      },
      {
        id: 'cred-6',
        provider: 'Factoring Partners',
        product: 'Invoice Factoring',
        rate: '1.4% per 30 days',
        maxAmount: '₹18,00,000',
        approvalTime: 'Under 12 hours',
        notes: 'Requires buyer PO upload'
      }
    ]
  },
  {
    id: 'LOT-2024-15',
    crop: 'Maize',
    variety: 'HQPM-1',
    lotSizeTons: 16,
    qualityGrade: 'A',
    moisture: '13.1%',
    location: 'Warangal, Telangana',
    harvestDate: '2024-02-18',
    status: 'fulfilled',
    askingPricePerTon: 22000,
    bestOfferPerTon: 22250,
    contractCurrency: 'INR',
    engagementScore: 95,
    activeOffers: 5,
    assuranceNotes: [
      'Contract closed with Urban Grains Pvt Ltd',
      'Payment received via escrow on 12 March'
    ],
    buyerInterest: [
      {
        id: 'buyer-8',
        buyerName: 'Urban Grains Pvt Ltd',
        organization: 'Animal Feed Manufacturer',
        offerPerTon: 22250,
        volumeTons: 16,
        status: 'accepted',
        updatedAt: '12 March 2024'
      }
    ],
    logisticsOptions: [
      {
        id: 'log-7',
        provider: 'BlueTrail Logistics',
        mode: 'Road • 16 MT bulk',
        estimatedCost: '₹3,000',
        transitTime: '26 hours',
        availability: 'Completed',
        capacity: 'Completed',
        reliabilityScore: 97
      }
    ],
    creditOptions: [
      {
        id: 'cred-7',
        provider: 'AgriPay Cooperative Bank',
        product: 'Post-harvest Settlement',
        rate: '8.0% p.a.',
        maxAmount: '₹7,00,000',
        approvalTime: 'Closed',
        notes: 'Used to finance aggregation before final dispatch'
      }
    ]
  }
]
