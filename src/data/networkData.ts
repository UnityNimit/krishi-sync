import { NetworkInfo, TraceabilityKPI } from '../types'

export const networkInfo: NetworkInfo = {
  networkType: 'Permissioned Blockchain',
  consensus: 'Practical Byzantine Fault Tolerance (PBFT)',
  consortium: [
    {
      org: 'Ministry of Agriculture & Farmers Welfare',
      role: 'Governance',
      nodes: 2,
      status: 'active'
    },
    {
      org: 'NAFED',
      role: 'Procurement',
      nodes: 2,
      status: 'active'
    },
    {
      org: 'WDRA (Warehouse Authority)',
      role: 'Storage Verification',
      nodes: 2,
      status: 'active'
    },
    {
      org: 'Large Processors Consortium',
      role: 'Processing',
      nodes: 3,
      status: 'active'
    },
    {
      org: 'FPO Federation',
      role: 'Farmer Representation',
      nodes: 2,
      status: 'active'
    },
    {
      org: 'NABL Testing Labs',
      role: 'Quality Verification',
      nodes: 1,
      status: 'active'
    }
  ],
  totalNodes: 12,
  blockTime: '~2 seconds',
  finality: 'Instant (PBFT)'
}

export const traceabilityKPIs: TraceabilityKPI[] = [
  {
    label: 'Traceability Completeness',
    value: '94.2%',
    description: 'Retail units with end-to-end provenance'
  },
  {
    label: 'Multi-Party Verification Rate',
    value: '87.5%',
    description: 'Events with 3+ endorsements'
  },
  {
    label: 'IoT Verification Coverage',
    value: '76.3%',
    description: 'Events backed by sensor data'
  },
  {
    label: 'Network Consensus Time',
    value: '~2 sec',
    description: 'Average block finality (PBFT)'
  },
  {
    label: 'Audit Trail Queries',
    value: '15,247',
    description: 'This month (retailers, consumers, regulators)'
  }
]
