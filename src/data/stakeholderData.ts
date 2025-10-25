import { StakeholderDashboardData, StakeholderRole } from '../types'

export const stakeholderDashboards: Record<StakeholderRole, StakeholderDashboardData> = {
  farmer: {
    highlight: {
      title: 'Rabi Harvest Readiness',
      subtitle: '120 MT secured across 3 clusters',
      context: 'Moisture readings and aggregator commitments are aligned with contract deliveries this week.'
    },
    kpis: [
      {
        id: 'inventory',
        label: 'On-farm Inventory',
        value: '120 MT',
        change: '+12% vs last week',
        trend: 'positive'
      },
      {
        id: 'orders',
        label: 'Orders Ready to Dispatch',
        value: '4',
        change: '2 awaiting pickup',
        trend: 'neutral'
      },
      {
        id: 'contracts',
        label: 'Active Contracts',
        value: '3',
        change: 'Milestone review tomorrow',
        trend: 'positive'
      },
      {
        id: 'quality',
        label: 'Quality Compliance',
        value: '96%',
        change: '+4 pts after grading',
        trend: 'positive'
      }
    ],
    actions: [
      {
        id: 'farmer-action-1',
        title: 'Confirm GreenChain pickup slot',
        description: 'Share gate pass and loading crew roster for the 25 MT wheat consignment.',
        dueDate: 'Today, 6:00 PM',
        impact: 'high',
        owner: 'Field Supervisor'
      },
      {
        id: 'farmer-action-2',
        title: 'Schedule moisture check rerun',
        description: 'Re-test Cluster B lots to certify <12% moisture before dispatch.',
        dueDate: 'Tomorrow, 9:00 AM',
        impact: 'medium',
        owner: 'Quality Lead'
      },
      {
        id: 'farmer-action-3',
        title: 'Update farmer network brief',
        description: 'Broadcast harvesting sequence and staggered loading plan to field coordinators.',
        dueDate: 'In 2 days',
        impact: 'low',
        owner: 'Operations Desk'
      }
    ],
    communications: [
      {
        id: 'farmer-comm-1',
        counterpart: 'GreenChain Logistics',
        topic: 'Pickup Window Confirmation',
        lastMessage: 'Driver requested updated gate pass before 6 AM.',
        lastUpdated: '10 mins ago',
        status: 'awaiting-response'
      },
      {
        id: 'farmer-comm-2',
        counterpart: 'Metro Retail Collective',
        topic: 'Quality Certificate Upload',
        lastMessage: 'Certificates received, awaiting pricing reconfirmation.',
        lastUpdated: '1 hr ago',
        status: 'scheduled'
      },
      {
        id: 'farmer-comm-3',
        counterpart: 'AgriInput Supplier',
        topic: 'Advance on next input cycle',
        lastMessage: 'Payment advice shared to supplier finance team.',
        lastUpdated: 'Yesterday',
        status: 'resolved'
      }
    ],
    opportunities: [
      {
        id: 'farmer-opp-1',
        buyer: 'Metro Retail Collective',
        requirement: '18 MT Grade A Chickpea',
        value: '₹22,400 / MT',
        timeline: 'Delivery window: 3 - 5 days',
        status: 'negotiation'
      },
      {
        id: 'farmer-opp-2',
        buyer: 'City Grain Exchange',
        requirement: 'Spot bid for 10 MT Mustard',
        value: '₹4,850 / quintal',
        timeline: 'Auction closes in 6 hrs',
        status: 'new'
      }
    ],
    logistics: [
      {
        id: 'farmer-log-1',
        route: 'Cluster A → FPO Hub',
        status: 'in-transit',
        eta: 'ETA: 6 hrs',
        mode: 'Reefer Truck GC-114',
        progress: 68
      },
      {
        id: 'farmer-log-2',
        route: 'Cluster B → Warehouse 2',
        status: 'scheduled',
        eta: 'Load-out: 25 Oct, 8 AM',
        mode: 'Flatbed AG-552',
        progress: 15
      }
    ]
  },
  fpo: {
    highlight: {
      title: 'Aggregation Window Live',
      subtitle: '850 MT aggregated across 240 member farmers',
      context: 'Last-mile sorting complete and outbound slots locked for priority retail partners.'
    },
    kpis: [
      {
        id: 'inventory',
        label: 'Warehouse Inventory',
        value: '850 MT',
        change: '+30 MT inbound today',
        trend: 'positive'
      },
      {
        id: 'orders',
        label: 'Orders in Fulfillment',
        value: '12',
        change: '5 dispatching today',
        trend: 'positive'
      },
      {
        id: 'contracts',
        label: 'Active Buyer Contracts',
        value: '8',
        change: 'Renewal review in 3 days',
        trend: 'neutral'
      },
      {
        id: 'fill-rate',
        label: 'Fill Rate',
        value: '94%',
        change: '+3 pts week-over-week',
        trend: 'positive'
      }
    ],
    actions: [
      {
        id: 'fpo-action-1',
        title: 'Sequence sorting lanes',
        description: 'Prioritize pulses sorting line to close Metro Retail commitment before noon.',
        dueDate: 'Today, 11:30 AM',
        impact: 'high',
        owner: 'Operations Lead'
      },
      {
        id: 'fpo-action-2',
        title: 'Publish buyer inventory bulletin',
        description: 'Share updated stock visibility with downstream buyers via marketplace.',
        dueDate: 'Today, 4:00 PM',
        impact: 'medium',
        owner: 'Marketplace Desk'
      },
      {
        id: 'fpo-action-3',
        title: 'Confirm cold chain slots',
        description: 'Lock refrigerated capacity with 3PL partner for tomorrow’s perishable loads.',
        dueDate: 'Tonight, 8:00 PM',
        impact: 'high',
        owner: 'Logistics Coordinator'
      }
    ],
    communications: [
      {
        id: 'fpo-comm-1',
        counterpart: 'ColdChain Partner',
        topic: 'Temperature logger calibration',
        lastMessage: 'Partner shared calibration certificate, awaiting sign-off.',
        lastUpdated: '25 mins ago',
        status: 'awaiting-response'
      },
      {
        id: 'fpo-comm-2',
        counterpart: 'Regional Bank',
        topic: 'Working capital top-up',
        lastMessage: 'Sanction letter ready, schedule document pickup.',
        lastUpdated: '2 hrs ago',
        status: 'scheduled'
      },
      {
        id: 'fpo-comm-3',
        counterpart: 'Processor Alliance',
        topic: 'Contract quality variance',
        lastMessage: 'Variance resolved, debit note issued last night.',
        lastUpdated: 'Today, 7:30 AM',
        status: 'resolved'
      }
    ],
    opportunities: [
      {
        id: 'fpo-opp-1',
        buyer: 'Urban Fresh Markets',
        requirement: 'Regular weekly basket of 40 MT assorted grains',
        value: '₹1.2 Cr contract value',
        timeline: 'Kick-off: 1 Nov',
        status: 'matched'
      },
      {
        id: 'fpo-opp-2',
        buyer: 'Regional School Meal Program',
        requirement: 'Tender for fortified wheat flour',
        value: '₹38 / kg ceiling price',
        timeline: 'Tech evaluation on 28 Oct',
        status: 'negotiation'
      }
    ],
    logistics: [
      {
        id: 'fpo-log-1',
        route: 'FPO Hub → Processor Plant',
        status: 'in-transit',
        eta: 'ETA: 4 hrs',
        mode: 'Container Truck FP-09',
        progress: 72
      },
      {
        id: 'fpo-log-2',
        route: 'Warehouse 1 → Retail Cross-dock',
        status: 'delayed',
        eta: 'Re-route: +6 hrs',
        mode: '3PL Partner RJ-23',
        progress: 45
      },
      {
        id: 'fpo-log-3',
        route: 'Storage Silo 3 → Export Yard',
        status: 'scheduled',
        eta: 'Gate-in: 26 Oct, 6 AM',
        mode: 'Rail rake booking',
        progress: 20
      }
    ]
  },
  processor: {
    highlight: {
      title: 'Processing Cycle Optimization',
      subtitle: '480 MT throughput scheduled over the next 48 hrs',
      context: 'Raw inventory buffer at 1.5x daily requirement, ensuring uninterrupted milling loads.'
    },
    kpis: [
      {
        id: 'inventory',
        label: 'Raw Material On Hand',
        value: '320 MT',
        change: '-8% after morning intake',
        trend: 'negative'
      },
      {
        id: 'orders',
        label: 'Batches In Production',
        value: '6',
        change: '3 completing this shift',
        trend: 'positive'
      },
      {
        id: 'contracts',
        label: 'Supply Contracts Active',
        value: '5',
        change: 'All within service levels',
        trend: 'neutral'
      },
      {
        id: 'efficiency',
        label: 'Line Efficiency',
        value: '92%',
        change: '+2 pts with new maintenance cycle',
        trend: 'positive'
      }
    ],
    actions: [
      {
        id: 'processor-action-1',
        title: 'Synchronize packaging line slots',
        description: 'Align packaging order with retailer drop sequence to remove double handling.',
        dueDate: 'Today, 5:00 PM',
        impact: 'high',
        owner: 'Production Planner'
      },
      {
        id: 'processor-action-2',
        title: 'Close QA batch release',
        description: 'Release QA certificates for Batch 213-AR to enable outbound dispatch.',
        dueDate: 'Today, 3:30 PM',
        impact: 'medium',
        owner: 'QA Lead'
      },
      {
        id: 'processor-action-3',
        title: 'Publish capacity forecast',
        description: 'Share next week capacity with FPO partners to lock inbound slots.',
        dueDate: 'Tomorrow, 12:00 PM',
        impact: 'medium',
        owner: 'Supply Manager'
      }
    ],
    communications: [
      {
        id: 'processor-comm-1',
        counterpart: 'FPO Cooperative',
        topic: 'Advance shipment sequencing',
        lastMessage: 'Updated ASN shared, seeking confirmation on unloading priority.',
        lastUpdated: '45 mins ago',
        status: 'awaiting-response'
      },
      {
        id: 'processor-comm-2',
        counterpart: 'Retailer Distribution Lead',
        topic: 'OTIF performance review',
        lastMessage: 'Shared 92% OTIF report, review call booked for Friday.',
        lastUpdated: '2 hrs ago',
        status: 'scheduled'
      },
      {
        id: 'processor-comm-3',
        counterpart: 'Food Safety Auditor',
        topic: 'Batch traceability audit',
        lastMessage: 'Audit completed, closure email received.',
        lastUpdated: 'Yesterday',
        status: 'resolved'
      }
    ],
    opportunities: [
      {
        id: 'processor-opp-1',
        buyer: 'FreshFoods Retail',
        requirement: 'Private label wheat flour - 60 MT / month',
        value: '₹48 / kg delivered',
        timeline: 'Pilot run starts 30 Oct',
        status: 'negotiation'
      },
      {
        id: 'processor-opp-2',
        buyer: 'Export Trading Co.',
        requirement: 'De-husked chickpea 20 MT lot',
        value: '₹1.1 Cr contract value',
        timeline: 'Contract signing on 27 Oct',
        status: 'matched'
      }
    ],
    logistics: [
      {
        id: 'processor-log-1',
        route: 'FPO Hub → Processing Plant',
        status: 'in-transit',
        eta: 'Docking in 2 hrs',
        mode: 'Hopper truck PR-44',
        progress: 60
      },
      {
        id: 'processor-log-2',
        route: 'Plant → Retail DC North',
        status: 'delivered',
        eta: 'Delivered this morning',
        mode: 'Fleet partner RD-11',
        progress: 100
      },
      {
        id: 'processor-log-3',
        route: 'Plant → Export Container Yard',
        status: 'scheduled',
        eta: 'Stuffing: 27 Oct, 9 AM',
        mode: 'Container booking CX-88',
        progress: 35
      }
    ]
  },
  retailer: {
    highlight: {
      title: 'Retail Replenishment Pulse',
      subtitle: '22 urban stores and online channel drawing from regional DCs',
      context: 'Forecast accuracy at 97% enables targeted promotions without stockouts.'
    },
    kpis: [
      {
        id: 'inventory',
        label: 'Store Inventory Cover',
        value: '16 days',
        change: '+2 days vs plan',
        trend: 'positive'
      },
      {
        id: 'orders',
        label: 'Online Orders in SLA',
        value: '1,280',
        change: '98% within 24 hrs',
        trend: 'positive'
      },
      {
        id: 'contracts',
        label: 'Supplier Contracts',
        value: '9',
        change: '2 renewals pending',
        trend: 'neutral'
      },
      {
        id: 'sell-through',
        label: 'Sell-through Rate',
        value: '87%',
        change: '-3 pts post promo',
        trend: 'negative'
      }
    ],
    actions: [
      {
        id: 'retailer-action-1',
        title: 'Launch weekend promotion packs',
        description: 'Bundle wheat flour with pulses for metro stores to clear promo stock.',
        dueDate: 'Friday, 10:00 AM',
        impact: 'medium',
        owner: 'Merchandising Lead'
      },
      {
        id: 'retailer-action-2',
        title: 'Rebalance DC inventory',
        description: 'Shift 12 MT chickpea from East DC to South DC based on sell-through.',
        dueDate: 'Today, 7:00 PM',
        impact: 'high',
        owner: 'Supply Planning'
      },
      {
        id: 'retailer-action-3',
        title: 'Confirm Diwali demand lock-in',
        description: 'Coordinate with processor to reserve 50 MT premium flour for festive spike.',
        dueDate: 'In 3 days',
        impact: 'high',
        owner: 'Category Manager'
      }
    ],
    communications: [
      {
        id: 'retailer-comm-1',
        counterpart: 'Processor Ops Team',
        topic: 'Festive demand build plan',
        lastMessage: 'Draft volume plan shared, awaiting confirmation.',
        lastUpdated: '30 mins ago',
        status: 'awaiting-response'
      },
      {
        id: 'retailer-comm-2',
        counterpart: '3PL Linehaul',
        topic: 'South corridor capacity',
        lastMessage: 'Carrier confirmed additional linehaul tonight.',
        lastUpdated: '1 hr ago',
        status: 'resolved'
      },
      {
        id: 'retailer-comm-3',
        counterpart: 'Store Cluster Leads',
        topic: 'Weekend promo readiness',
        lastMessage: 'All stores confirmed display build completion.',
        lastUpdated: 'Today, 9:15 AM',
        status: 'scheduled'
      }
    ],
    opportunities: [
      {
        id: 'retailer-opp-1',
        buyer: 'D2C Marketplace',
        requirement: 'Curated festive boxes (5k units)',
        value: '₹650 / box',
        timeline: 'Go-live: 1 Nov',
        status: 'negotiation'
      },
      {
        id: 'retailer-opp-2',
        buyer: 'Corporate Gifting Program',
        requirement: 'Premium grains hamper (3k units)',
        value: '₹42 Lakh order value',
        timeline: 'Selection locked, awaiting PO',
        status: 'matched'
      }
    ],
    logistics: [
      {
        id: 'retailer-log-1',
        route: 'Central DC → Metro Stores',
        status: 'in-transit',
        eta: 'Drops completing tonight',
        mode: 'Retail fleet run 21',
        progress: 74
      },
      {
        id: 'retailer-log-2',
        route: 'East DC → South DC',
        status: 'in-transit',
        eta: 'ETA: 8 hrs',
        mode: 'Linehaul contract LH-78',
        progress: 58
      },
      {
        id: 'retailer-log-3',
        route: 'Online FC → Customer doorstep',
        status: 'delayed',
        eta: '2 hr delay due to weather',
        mode: 'Hyperlocal partner fleet',
        progress: 40
      }
    ]
  },
  policymaker: {
    highlight: {
      title: 'National Agricultural Market Intelligence',
      subtitle: 'AI-powered insights for strategic policy decisions',
      context: 'Real-time price forecasting, demand-supply analytics, and regional pest risk monitoring to support evidence-based agricultural policy planning.'
    },
    kpis: [
      {
        id: 'market-stability',
        label: 'Market Stability Index',
        value: '7.8/10',
        change: '+0.4 pts this quarter',
        trend: 'positive'
      },
      {
        id: 'price-volatility',
        label: 'Avg Price Volatility',
        value: '8.2%',
        change: '-1.2% vs last month',
        trend: 'positive'
      },
      {
        id: 'supply-gaps',
        label: 'Crops in Deficit',
        value: '2',
        change: 'Rice, Chickpea',
        trend: 'negative'
      },
      {
        id: 'pest-alerts',
        label: 'High Risk Regions',
        value: '4',
        change: 'Intervention needed',
        trend: 'negative'
      }
    ],
    actions: [
      {
        id: 'policy-action-1',
        title: 'Implement rice production incentives',
        description: 'Deploy subsidized seeds and increased MSP to address growing 5,000 MT deficit. Target Punjab, Haryana, UP, and West Bengal.',
        dueDate: 'Next 30 days',
        impact: 'high',
        owner: 'Ministry of Agriculture'
      },
      {
        id: 'policy-action-2',
        title: 'Deploy pest control measures in high-risk zones',
        description: 'Urgent intervention required in Punjab, Madhya Pradesh, Karnataka, and West Bengal. Coordinate with state agriculture departments.',
        dueDate: 'Next 2 weeks',
        impact: 'high',
        owner: 'Plant Protection Division'
      },
      {
        id: 'policy-action-3',
        title: 'Review maize procurement policy',
        description: 'Current 10,000 MT surplus requires policy adjustment. Consider export promotion or alternative use incentives.',
        dueDate: 'Next quarter',
        impact: 'medium',
        owner: 'Price Monitoring Cell'
      },
      {
        id: 'policy-action-4',
        title: 'Update price support mechanisms',
        description: 'Monitor wheat and mustard price trends. Prepare buffer stock adjustments if needed.',
        dueDate: 'Next 45 days',
        impact: 'medium',
        owner: 'Food Corporation'
      }
    ],
    communications: [
      {
        id: 'policy-comm-1',
        counterpart: 'State Agriculture Ministers',
        topic: 'Regional crop planning coordination',
        lastMessage: 'Quarterly review meeting scheduled for next week.',
        lastUpdated: '2 days ago',
        status: 'scheduled'
      },
      {
        id: 'policy-comm-2',
        counterpart: 'Research Institutions',
        topic: 'Pest outbreak early warning systems',
        lastMessage: 'Awaiting implementation timeline from ICAR.',
        lastUpdated: '1 week ago',
        status: 'awaiting-response'
      },
      {
        id: 'policy-comm-3',
        counterpart: 'International Trade Division',
        topic: 'Export opportunity assessment',
        lastMessage: 'Maize export feasibility study completed.',
        lastUpdated: 'Today',
        status: 'resolved'
      }
    ],
    opportunities: [
      {
        id: 'policy-opp-1',
        buyer: 'State Procurement Agencies',
        requirement: 'Enhanced digital procurement infrastructure',
        value: '₹250 Cr modernization program',
        timeline: 'Pilot starting Q1 2025',
        status: 'negotiation'
      },
      {
        id: 'policy-opp-2',
        buyer: 'FPO Development Program',
        requirement: 'Capacity building for 500 FPOs',
        value: '₹180 Cr allocation',
        timeline: 'Implementation ready',
        status: 'matched'
      }
    ],
    logistics: [
      {
        id: 'policy-log-1',
        route: 'National Food Security Program',
        status: 'in-transit',
        eta: 'Q3 targets: 85% achieved',
        mode: 'Multi-state coordination',
        progress: 85
      },
      {
        id: 'policy-log-2',
        route: 'Price Stabilization Fund',
        status: 'scheduled',
        eta: 'Disbursement: Next month',
        mode: 'Direct benefit transfer',
        progress: 45
      }
    ]
  }
}
