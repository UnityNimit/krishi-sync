export interface CropRecommendation {
  id: string
  cropName: string
  suitabilityScore: number
  estimatedYield: string
  waterRequirement: string
  profitPotential: string
  season: string
  reasons: string[]
}

export interface SeasonalAdvisory {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: 'irrigation' | 'fertilization' | 'pest-control' | 'weather' | 'harvest'
  actionDate: string
  status: 'pending' | 'completed' | 'in-progress'
}

export interface PestPrediction {
  id: string
  pestName: string
  riskLevel: 'high' | 'medium' | 'low'
  affectedCrops: string[]
  probability: number
  preventiveMeasures: string[]
  earlySymptoms: string[]
  estimatedImpact: string
}

export interface CreditEligibility {
  isEligible: boolean
  score: number
  maxLoanAmount: number
  interestRate: number
  repaymentPeriod: number
  factors: {
    name: string
    score: number
    weight: number
  }[]
}

export interface InsurancePlan {
  id: string
  name: string
  coverage: string
  premium: number
  coverageAmount: number
  crops: string[]
  benefits: string[]
  recommended: boolean
}

export type StakeholderRole = 'farmer' | 'fpo' | 'processor' | 'retailer' | 'policymaker'

export type TrendDirection = 'positive' | 'negative' | 'neutral'

export type ImpactLevel = 'high' | 'medium' | 'low'

export interface StakeholderKPI {
  id: string
  label: string
  value: string
  change: string
  trend: TrendDirection
}

export interface StakeholderAction {
  id: string
  title: string
  description: string
  dueDate: string
  impact: ImpactLevel
  owner: string
}

export type CommunicationStatus = 'awaiting-response' | 'scheduled' | 'resolved'

export interface StakeholderCommunication {
  id: string
  counterpart: string
  topic: string
  lastMessage: string
  lastUpdated: string
  status: CommunicationStatus
}

export type OpportunityStatus = 'negotiation' | 'matched' | 'new'

export interface StakeholderOpportunity {
  id: string
  buyer: string
  requirement: string
  value: string
  timeline: string
  status: OpportunityStatus
}

export type LogisticsStatus = 'in-transit' | 'scheduled' | 'delayed' | 'delivered'

export interface StakeholderLogistics {
  id: string
  route: string
  status: LogisticsStatus
  eta: string
  mode: string
  progress: number
}

export interface StakeholderHighlight {
  title: string
  subtitle: string
  context: string
}

export interface StakeholderDashboardData {
  highlight: StakeholderHighlight
  kpis: StakeholderKPI[]
  actions: StakeholderAction[]
  communications: StakeholderCommunication[]
  opportunities: StakeholderOpportunity[]
  logistics: StakeholderLogistics[]
}

export type MarketLotStatus = 'available' | 'in-negotiation' | 'under-fulfillment' | 'fulfilled'

export interface MarketplaceBuyerInterest {
  id: string
  buyerName: string
  organization: string
  offerPerTon: number
  volumeTons: number
  status: 'active' | 'counter' | 'accepted'
  updatedAt: string
}

export interface MarketplaceLogisticsOption {
  id: string
  provider: string
  mode: string
  estimatedCost: string
  transitTime: string
  availability: string
  capacity: string
  reliabilityScore: number
}

export interface MarketplaceCreditOption {
  id: string
  provider: string
  product: string
  rate: string
  maxAmount: string
  approvalTime: string
  notes: string
}

export interface MarketplaceLot {
  id: string
  crop: string
  variety: string
  lotSizeTons: number
  qualityGrade: string
  moisture: string
  location: string
  harvestDate: string
  status: MarketLotStatus
  askingPricePerTon: number
  bestOfferPerTon: number
  contractCurrency: string
  engagementScore: number
  activeOffers: number
  assuranceNotes: string[]
  buyerInterest: MarketplaceBuyerInterest[]
  logisticsOptions: MarketplaceLogisticsOption[]
  creditOptions: MarketplaceCreditOption[]
}

export type WeatherAlertSeverity = 'info' | 'watch' | 'warning'

export type WeatherAlertCategory = 'crop' | 'logistics' | 'general'

export interface WeatherCurrent {
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  precipitationChance: number
  description: string
  icon: string
}

export interface WeatherForecastEntry {
  timestamp: string
  temperature: number
  precipitationChance: number
  windSpeed: number
  description: string
  icon: string
}

export interface WeatherAlert {
  id: string
  title: string
  severity: WeatherAlertSeverity
  category: WeatherAlertCategory
  description: string
  impactAreas: string[]
  recommendedActions: string[]
}

export interface WeatherApiResponse {
  location: string
  source: 'live' | 'mock'
  lastUpdated: string
  current: WeatherCurrent
  forecast: WeatherForecastEntry[]
  alerts: WeatherAlert[]
}

export type SupplyChainEventType =
  | 'planting'
  | 'growth-monitoring'
  | 'pest-treatment'
  | 'irrigation'
  | 'fertilization'
  | 'harvesting'
  | 'processing'
  | 'quality-inspection'
  | 'packaging'
  | 'distribution'
  | 'retail-delivery'

export type EPCISEventType = 'ObjectEvent' | 'AggregationEvent' | 'TransformationEvent' | 'TransactionEvent'

export interface DigitalSignature {
  signer: string
  role: string
  publicKey: string
  signature: string
  signedAt: string
  verified?: boolean
}

export interface IoTVerification {
  device: string
  type: string
  reading: string
  calibrationDate?: string
  certified?: boolean
  standard?: string
  coordinates?: { lat: number; lon: number }
  timestamp?: string
  signature: string
  verified?: boolean
}

export interface SatelliteVerification {
  provider: string
  acquisitionDate: string
  ndvi: number
  areaCrossCheck: string
  dataHash: string
}

export interface LabCertification {
  labName: string
  reportId: string
  parameters: Record<string, string>
  grade?: string
  verifiableCredential: string
  signature: string
  verified?: boolean
}

export interface AssetQuantity {
  assetType: string
  assetId: string
  quantity: { value: number; uom: string }
  variety?: string
  product?: string
}

export interface TransformationData {
  inputs: AssetQuantity[]
  outputs: AssetQuantity[]
  losses?: { value: number; uom: string; reason: string }
  massBalanceVerified: boolean
}

export interface LocationData {
  name: string
  gln?: string
  coordinates?: { lat: number; lon: number }
  region?: string
}

export interface ConsentRecord {
  purpose: string
  grantedAt: string
  expiresAt: string
  canRevoke: boolean
}

export interface SupplyChainEvent {
  id: string
  batchId: string
  eventType: SupplyChainEventType
  epcisType?: EPCISEventType
  timestamp: string
  location: string | LocationData
  actor: string
  actorDID?: string
  data: Record<string, string | number | boolean>
  previousHash: string
  currentHash: string
  blockNumber: number
  signatures?: DigitalSignature[]
  iotVerifications?: IoTVerification[]
  satelliteVerification?: SatelliteVerification
  labCertification?: LabCertification
  transformationData?: TransformationData
  offChainDataHash?: string
  offChainStorage?: string
  consensusSignatures?: number
  consentRecords?: ConsentRecord[]
}

export interface TraceabilityBatch {
  id: string
  batchNumber: string
  crop: string
  quantity: string
  originFarm: string
  createdAt: string
  status: 'active' | 'completed'
  events: SupplyChainEvent[]
  isVerified: boolean
  provenanceDAG?: ProvenanceDAG
}

export interface ProvenanceNode {
  id: string
  type: string
  percentage: number
  label?: string
}

export interface ProvenanceEdge {
  from: string
  to: string
  type: 'transformation' | 'blending' | 'aggregation' | 'split'
}

export interface ProvenanceDAG {
  nodes: ProvenanceNode[]
  edges: ProvenanceEdge[]
  sourceFarms?: Array<{
    farmerId: string
    location: string
    percentage: number
  }>
}

export interface VerificationCheck {
  passed: number
  failed: number
}

export interface VerificationIssue {
  blockIndex: number
  type: string
  severity: 'critical' | 'warning'
  description: string
}

export interface BlockchainVerification {
  isValid: boolean
  totalBlocks: number
  invalidBlocks: number[]
  message: string
  checks: {
    hashIntegrity: VerificationCheck
    signatures: VerificationCheck
    massBalance: VerificationCheck
    timestamps: VerificationCheck
  }
  issues: VerificationIssue[]
}

export interface ConsortiumMember {
  org: string
  role: string
  nodes: number
  status: 'active' | 'inactive'
}

export interface NetworkInfo {
  networkType: string
  consensus: string
  consortium: ConsortiumMember[]
  totalNodes: number
  blockTime: string
  finality: string
}

export interface TraceabilityKPI {
  label: string
  value: string
  description: string
}

export interface GeoLocation {
  lat: number
  lng: number
  address: string
}

export interface GeoPoint {
  lat: number
  lng: number
}

export type WarehouseStatus = 'operational' | 'maintenance' | 'critical'

export interface Warehouse {
  id: string
  name: string
  type: 'warehouse'
  location: GeoLocation
  status: WarehouseStatus
  capacity: {
    total: number
    used: number
    available: number
  }
  commodities: string[]
  temperature: number
  lastUpdated: string
}

export type ProcessingStatus = 'operational' | 'maintenance' | 'critical'

export interface ProcessingUnit {
  id: string
  name: string
  type: 'processing'
  location: GeoLocation
  status: ProcessingStatus
  throughput: {
    current: number
    capacity: number
    efficiency: number
  }
  commodities: string[]
  activeBatches: number
  lastUpdated: string
}

export type RouteStatus = 'active' | 'delayed' | 'scheduled' | 'completed'

export interface TransportRoute {
  id: string
  name: string
  type: 'route'
  status: RouteStatus
  commodity: string
  origin: GeoPoint & { name: string }
  destination: GeoPoint & { name: string }
  waypoints: GeoPoint[]
  mode: string
  distance: number
  estimatedTime: string
  progress: number
  vehicleId: string
  lastUpdated: string
}

export interface LogisticsGeoData {
  warehouses: Warehouse[]
  processingUnits: ProcessingUnit[]
  routes: TransportRoute[]
}

export interface MapFilters {
  commodities: string[]
  statuses: string[]
  showWarehouses: boolean
  showProcessingUnits: boolean
  showRoutes: boolean
}
