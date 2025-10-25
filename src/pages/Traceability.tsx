import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  Package,
  QrCode,
  CheckCircle,
  XCircle,
  Info,
  Link2,
  Shield,
  Clock,
  MapPin,
  User,
  Sprout,
  Droplets,
  Leaf,
  FlaskConical,
  Boxes,
  Truck,
  Store,
  AlertTriangle,
  Plus,
  Network,
  FileCheck,
  Satellite,
  Lock,
  Users,
  TrendingUp,
  ArrowRight,
  Layers
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TraceabilityBatch, SupplyChainEventType, BlockchainVerification, LocationData } from '../types'
import { mockBatches } from '../data/traceabilityData'
import { networkInfo, traceabilityKPIs } from '../data/networkData'
import { verifyChain, createEventHash, generateBatchId } from '../utils/blockchain'

const eventIcons: Record<SupplyChainEventType, LucideIcon> = {
  planting: Sprout,
  'growth-monitoring': Leaf,
  'pest-treatment': AlertTriangle,
  irrigation: Droplets,
  fertilization: FlaskConical,
  harvesting: Package,
  processing: Boxes,
  'quality-inspection': CheckCircle,
  packaging: Package,
  distribution: Truck,
  'retail-delivery': Store
}

const eventColors: Record<SupplyChainEventType, string> = {
  planting: 'text-green-600 bg-green-50 dark:bg-green-900/30',
  'growth-monitoring': 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30',
  'pest-treatment': 'text-amber-600 bg-amber-50 dark:bg-amber-900/30',
  irrigation: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30',
  fertilization: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30',
  harvesting: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30',
  processing: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30',
  'quality-inspection': 'text-teal-600 bg-teal-50 dark:bg-teal-900/30',
  packaging: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30',
  distribution: 'text-orange-600 bg-orange-50 dark:bg-orange-900/30',
  'retail-delivery': 'text-pink-600 bg-pink-50 dark:bg-pink-900/30'
}

const epcisColors: Record<string, string> = {
  ObjectEvent: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  AggregationEvent: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  TransformationEvent: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
  TransactionEvent: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
}

export default function Traceability() {
  const [batches, setBatches] = useState<TraceabilityBatch[]>(mockBatches)
  const [selectedBatch, setSelectedBatch] = useState<TraceabilityBatch | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)
  const [verification, setVerification] = useState<BlockchainVerification | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'verification' | 'network' | 'how-it-works' | 'kpis'>('overview')
  const [showCreateBatch, setShowCreateBatch] = useState(false)
  const [newBatchData, setNewBatchData] = useState({
    crop: '',
    quantity: '',
    originFarm: '',
    actor: ''
  })

  useEffect(() => {
    if (selectedBatch) {
      verifyBatch(selectedBatch)
    }
  }, [selectedBatch])

  const verifyBatch = async (batch: TraceabilityBatch) => {
    const result = await verifyChain(batch.events)
    setVerification(result)
  }

  const handleCreateBatch = async () => {
    if (!newBatchData.crop || !newBatchData.quantity || !newBatchData.originFarm || !newBatchData.actor) {
      return
    }

    const batchId = generateBatchId()
    const timestamp = new Date().toISOString()
    const genesisHash = '0000000000000000000000000000000000000000000000000000000000000000'

    const firstEventHash = await createEventHash(
      batchId,
      'planting',
      timestamp,
      newBatchData.originFarm,
      newBatchData.actor,
      {
        seedVariety: 'Generic',
        fieldArea: 'Not specified',
        soilType: 'Not specified',
        soilPH: 'Not specified'
      },
      genesisHash
    )

    const newBatch: TraceabilityBatch = {
      id: String(batches.length + 1),
      batchNumber: batchId,
      crop: newBatchData.crop,
      quantity: newBatchData.quantity,
      originFarm: newBatchData.originFarm,
      createdAt: timestamp,
      status: 'active',
      isVerified: true,
      events: [
        {
          id: `evt-${Date.now()}`,
          batchId,
          eventType: 'planting',
          timestamp,
          location: newBatchData.originFarm,
          actor: newBatchData.actor,
          data: {
            seedVariety: 'Generic',
            fieldArea: 'Not specified',
            soilType: 'Not specified',
            soilPH: 'Not specified'
          },
          previousHash: genesisHash,
          currentHash: firstEventHash,
          blockNumber: 0
        }
      ]
    }

    setBatches([...batches, newBatch])
    setSelectedBatch(newBatch)
    setShowCreateBatch(false)
    setNewBatchData({ crop: '', quantity: '', originFarm: '', actor: '' })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatEventType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const getLocationString = (location: string | LocationData): string => {
    if (typeof location === 'string') return location
    return location.name
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Link2 className="h-10 w-10" />
              <h1 className="text-3xl font-bold">Blockchain Traceability</h1>
            </div>
            <p className="text-emerald-50 text-lg">
              Tamper-Evident & Audit-Ready Supply Chain System
            </p>
          </div>
          <button
            onClick={() => setShowCreateBatch(true)}
            className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Batch</span>
          </button>
        </div>
      </div>

      {showCreateBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Create New Batch</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Crop Name</label>
                <input
                  type="text"
                  value={newBatchData.crop}
                  onChange={(e) => setNewBatchData({ ...newBatchData, crop: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  placeholder="e.g., Organic Tomatoes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                <input
                  type="text"
                  value={newBatchData.quantity}
                  onChange={(e) => setNewBatchData({ ...newBatchData, quantity: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  placeholder="e.g., 1000 kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Origin Farm</label>
                <input
                  type="text"
                  value={newBatchData.originFarm}
                  onChange={(e) => setNewBatchData({ ...newBatchData, originFarm: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  placeholder="e.g., Sunshine Farm, Karnataka"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Farmer Name</label>
                <input
                  type="text"
                  value={newBatchData.actor}
                  onChange={(e) => setNewBatchData({ ...newBatchData, actor: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  placeholder="e.g., John Doe (Farmer)"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleCreateBatch}
                  className="flex-1 bg-emerald-600 dark:bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition"
                >
                  Create Batch
                </button>
                <button
                  onClick={() => {
                    setShowCreateBatch(false)
                    setNewBatchData({ crop: '', quantity: '', originFarm: '', actor: '' })
                  }}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
              Tamper-Evident ≠ Fraud-Proof
            </h3>
            <p className="text-amber-800 dark:text-amber-200 mb-3">
              Blockchain makes any tampering immediately <strong>detectable</strong>, not preventable. 
              It creates an immutable audit trail where changes to historical data break the cryptographic chain.
            </p>
            <div className="bg-white dark:bg-amber-950 rounded p-3 mb-3">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">Data Quality Controls:</p>
              <ul className="list-disc list-inside text-sm text-amber-800 dark:text-amber-200 space-y-1">
                <li>Multi-party verification (farmer + FPO + weighbridge)</li>
                <li>IoT sensor integration (moisture, weight, GPS)</li>
                <li>Third-party lab certifications (NABL accredited)</li>
                <li>Satellite imagery cross-verification</li>
              </ul>
            </div>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              These additional controls ensure data quality at source, making the entire system robust against fraud.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Package className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <span>Available Batches</span>
          </h2>
          {batches.map((batch) => (
            <div
              key={batch.id}
              onClick={() => {
                setSelectedBatch(batch)
                setShowQRCode(false)
                setActiveTab('overview')
              }}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition hover:shadow-lg border-2 ${
                selectedBatch?.id === batch.id ? 'border-emerald-500 dark:border-emerald-400' : 'border-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">{batch.crop}</h3>
                {batch.isVerified ? (
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{batch.quantity}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{batch.originFarm}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  batch.status === 'active' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}>
                  {batch.status === 'active' ? 'In Progress' : 'Completed'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{batch.events.length} events</span>
              </div>
              {batch.provenanceDAG && (
                <div className="mt-2 flex items-center space-x-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <Layers className="h-3 w-3" />
                  <span>DAG Provenance</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedBatch ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedBatch.crop}</h2>
                  <button
                    onClick={() => setShowQRCode(!showQRCode)}
                    className="flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition"
                  >
                    <QrCode className="h-5 w-5" />
                    <span>{showQRCode ? 'Hide' : 'Show'} QR Code</span>
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Batch: {selectedBatch.batchNumber}</p>
              </div>

              {showQRCode && (
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-6 bg-gray-50 dark:bg-gray-800">
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Scan to view full traceability</p>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
                      <QRCodeSVG
                        value={JSON.stringify({
                          batchId: selectedBatch.batchNumber,
                          crop: selectedBatch.crop,
                          url: `https://agri-trace.example.com/batch/${selectedBatch.batchNumber}`
                        })}
                        size={200}
                        level="H"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center max-w-xs">
                      Consumers can scan this QR code to view the complete journey of this product
                    </p>
                  </div>
                </div>
              )}

              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex space-x-1 px-6 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 font-medium transition whitespace-nowrap ${
                      activeTab === 'overview'
                        ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className={`px-4 py-3 font-medium transition whitespace-nowrap ${
                      activeTab === 'events'
                        ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    Event Timeline
                  </button>
                  <button
                    onClick={() => setActiveTab('verification')}
                    className={`px-4 py-3 font-medium transition whitespace-nowrap ${
                      activeTab === 'verification'
                        ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    Verification
                  </button>
                  <button
                    onClick={() => setActiveTab('network')}
                    className={`px-4 py-3 font-medium transition whitespace-nowrap ${
                      activeTab === 'network'
                        ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    Network
                  </button>
                  <button
                    onClick={() => setActiveTab('kpis')}
                    className={`px-4 py-3 font-medium transition whitespace-nowrap ${
                      activeTab === 'kpis'
                        ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    KPIs
                  </button>
                  <button
                    onClick={() => setActiveTab('how-it-works')}
                    className={`px-4 py-3 font-medium transition whitespace-nowrap ${
                      activeTab === 'how-it-works'
                        ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    How It Works
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-[600px] overflow-y-auto">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Quantity</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedBatch.quantity}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Origin</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedBatch.originFarm}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Created</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(selectedBatch.createdAt)}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Status</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{selectedBatch.status}</p>
                      </div>
                    </div>

                    {selectedBatch.provenanceDAG && (
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                          <span>Provenance DAG (Blending & Transformation)</span>
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Source Farm Breakdown:</p>
                            <div className="space-y-2">
                              {selectedBatch.provenanceDAG.sourceFarms?.map((farm, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded">
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{farm.farmerId}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{farm.location}</p>
                                  </div>
                                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{farm.percentage}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-3 rounded">
                            <p className="font-semibold mb-1">Transformation Flow:</p>
                            <p>This retail batch is derived from {selectedBatch.provenanceDAG.nodes.filter(n => n.type === 'OilseedLot').length} seed lots, 
                            processed into {selectedBatch.provenanceDAG.nodes.filter(n => n.type === 'OilBatch').length} oil batches, 
                            and blended to create the final retail product.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Supply Chain Summary</h3>
                      <div className="space-y-2">
                        {selectedBatch.events.map((event, index) => {
                          const Icon = eventIcons[event.eventType]
                          return (
                            <div key={event.id} className="flex items-center space-x-3">
                              <div className={`p-2 rounded-full ${eventColors[event.eventType]}`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium text-gray-900 dark:text-white">{formatEventType(event.eventType)}</p>
                                  {event.epcisType && (
                                    <span className={`text-xs px-2 py-0.5 rounded ${epcisColors[event.epcisType]}`}>
                                      {event.epcisType}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(event.timestamp)}</p>
                              </div>
                              {index < selectedBatch.events.length - 1 && (
                                <ArrowRight className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {verification && (
                      <div className={`rounded-lg p-4 ${
                        verification.isValid ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {verification.isValid ? (
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          )}
                          <span className={`font-semibold ${verification.isValid ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}>
                            Verification Status
                          </span>
                        </div>
                        <p className={verification.isValid ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'}>
                          {verification.message}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'events' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Chronological Event Timeline
                    </h3>
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="space-y-6">
                        {selectedBatch.events.map((event) => {
                          const Icon = eventIcons[event.eventType]
                          return (
                            <div key={event.id} className="relative pl-16">
                              <div className={`absolute left-0 p-3 rounded-full ${eventColors[event.eventType]} border-4 border-white dark:border-gray-800`}>
                                <Icon className="h-6 w-6" />
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                                        {formatEventType(event.eventType)}
                                      </h4>
                                      {event.epcisType && (
                                        <span className={`text-xs px-2 py-0.5 rounded ${epcisColors[event.epcisType]}`}>
                                          {event.epcisType}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-300">
                                      <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{formatDate(event.timestamp)}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                                    Block #{event.blockNumber}
                                  </span>
                                </div>
                                <div className="space-y-2 mt-3">
                                  <div className="flex items-start space-x-2">
                                    <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{getLocationString(event.location)}</span>
                                  </div>
                                  <div className="flex items-start space-x-2">
                                    <User className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <span className="text-sm text-gray-700 dark:text-gray-300">{event.actor}</span>
                                      {event.actorDID && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{event.actorDID}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {event.signatures && event.signatures.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                                      <FileCheck className="h-4 w-4" />
                                      <span>Digital Signatures ({event.signatures.length})</span>
                                    </p>
                                    <div className="space-y-2">
                                      {event.signatures.map((sig, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded text-xs">
                                          <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{sig.signer}</p>
                                            <p className="text-gray-500 dark:text-gray-400">{sig.role}</p>
                                          </div>
                                          {sig.verified ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                          ) : (
                                            <XCircle className="h-4 w-4 text-red-500" />
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                                      ✓ {event.signatures.filter(s => s.verified).length}/{event.signatures.length} signatures verified
                                    </p>
                                  </div>
                                )}

                                {event.iotVerifications && event.iotVerifications.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                                      <Satellite className="h-4 w-4" />
                                      <span>IoT Verifications</span>
                                    </p>
                                    <div className="space-y-2">
                                      {event.iotVerifications.map((iot, idx) => (
                                        <div key={idx} className="bg-white dark:bg-gray-800 p-2 rounded text-xs">
                                          <div className="flex items-center justify-between">
                                            <p className="font-medium text-gray-900 dark:text-white">{iot.device}</p>
                                            {iot.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                                          </div>
                                          <p className="text-gray-600 dark:text-gray-400">{iot.type}: {iot.reading}</p>
                                          {iot.calibrationDate && (
                                            <p className="text-gray-500 dark:text-gray-400 text-xs">Calibrated: {iot.calibrationDate}</p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {event.labCertification && (
                                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                                      <FileCheck className="h-4 w-4" />
                                      <span>Lab Certification</span>
                                    </p>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                      <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium text-gray-900 dark:text-white">{event.labCertification.labName}</p>
                                        {event.labCertification.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                                      </div>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Report: {event.labCertification.reportId}</p>
                                      {event.labCertification.grade && (
                                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">{event.labCertification.grade}</p>
                                      )}
                                      <div className="space-y-1 text-xs">
                                        {Object.entries(event.labCertification.parameters).map(([key, value]) => (
                                          <div key={key} className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                                            <span className="text-gray-900 dark:text-white font-medium">{value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {event.transformationData && (
                                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
                                      <Layers className="h-4 w-4" />
                                      <span>Transformation (Mass Balance)</span>
                                    </p>
                                    <div className="space-y-3">
                                      <div>
                                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Inputs:</p>
                                        {event.transformationData.inputs.map((input, idx) => (
                                          <div key={idx} className="text-xs bg-white dark:bg-gray-800 p-2 rounded mb-1">
                                            <p className="font-medium text-gray-900 dark:text-white">{input.assetId} - {input.variety}</p>
                                            <p className="text-gray-600 dark:text-gray-400">{input.quantity.value} {input.quantity.uom}</p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="flex items-center justify-center">
                                        <ArrowRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                      </div>
                                      <div>
                                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Outputs:</p>
                                        {event.transformationData.outputs.map((output, idx) => (
                                          <div key={idx} className="text-xs bg-white dark:bg-gray-800 p-2 rounded mb-1">
                                            <p className="font-medium text-gray-900 dark:text-white">{output.assetId} - {output.product}</p>
                                            <p className="text-gray-600 dark:text-gray-400">{output.quantity.value} {output.quantity.uom}</p>
                                          </div>
                                        ))}
                                      </div>
                                      {event.transformationData.losses && (
                                        <div className="text-xs bg-amber-50 dark:bg-amber-900/30 p-2 rounded">
                                          <p className="text-gray-700 dark:text-gray-300">
                                            <strong>Losses:</strong> {event.transformationData.losses.value} {event.transformationData.losses.uom}
                                          </p>
                                          <p className="text-gray-600 dark:text-gray-400">{event.transformationData.losses.reason}</p>
                                        </div>
                                      )}
                                      <div className={`text-xs p-2 rounded ${
                                        event.transformationData.massBalanceVerified 
                                          ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                                          : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                      }`}>
                                        {event.transformationData.massBalanceVerified ? '✓ Mass balance verified' : '✗ Mass balance error'}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {event.offChainDataHash && (
                                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <div className="flex items-start space-x-2">
                                      <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                                      <div className="text-xs">
                                        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Privacy-Preserving</p>
                                        <p className="text-gray-600 dark:text-gray-400 mb-1">Detailed data stored off-chain ({event.offChainStorage})</p>
                                        <p className="font-mono text-xs bg-white dark:bg-gray-800 p-1 rounded break-all text-gray-500 dark:text-gray-400">
                                          {event.offChainDataHash}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400 mt-1">✓ DPDP Act compliant - Minimal on-chain PII</p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {event.consensusSignatures && (
                                  <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                                    <Network className="h-3 w-3 inline mr-1" />
                                    {event.consensusSignatures}/{networkInfo.totalNodes} validator signatures
                                  </div>
                                )}

                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Details:</p>
                                  <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(event.data).map(([key, value]) => (
                                      <div key={key} className="text-sm">
                                        <span className="text-gray-600 dark:text-gray-300">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                        <span className="text-gray-900 dark:text-white ml-1 font-medium">{String(value)}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'verification' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Blockchain Hash Chain Verification
                      </h3>
                      {verification && (
                        <>
                          <div className={`rounded-lg p-4 mb-6 ${
                            verification.isValid ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                          }`}>
                            <div className="flex items-center space-x-2 mb-2">
                              {verification.isValid ? (
                                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                              ) : (
                                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                              )}
                              <span className={`font-bold text-lg ${verification.isValid ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}>
                                {verification.message}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Total Blocks</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{verification.totalBlocks}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Invalid Blocks</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{verification.invalidBlocks.length}</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Verification Checks</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Hash Chain Integrity</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {verification.checks.hashIntegrity.passed}/{verification.totalBlocks}
                                  </span>
                                  {verification.checks.hashIntegrity.failed === 0 ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Digital Signatures</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {verification.checks.signatures.passed} verified
                                  </span>
                                  {verification.checks.signatures.failed === 0 ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Mass Balance</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {verification.checks.massBalance.passed} verified
                                  </span>
                                  {verification.checks.massBalance.failed === 0 ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Timestamp Sequence</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {verification.checks.timestamps.passed}/{verification.totalBlocks}
                                  </span>
                                  {verification.checks.timestamps.failed === 0 ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {verification.issues.length > 0 && (
                            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
                              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Issues Detected</h4>
                              <div className="space-y-2">
                                {verification.issues.map((issue, idx) => (
                                  <div key={idx} className="text-sm">
                                    <p className="font-medium text-red-800 dark:text-red-200">
                                      {issue.type} ({issue.severity})
                                    </p>
                                    <p className="text-red-700 dark:text-red-300">{issue.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Hash Chain Details</h4>
                      <div className="space-y-3">
                        {selectedBatch.events.map((event, index) => (
                          <div key={event.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Block #{event.blockNumber}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">|</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{formatEventType(event.eventType)}</span>
                              </div>
                              {verification?.invalidBlocks.includes(event.blockNumber) ? (
                                <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                              ) : (
                                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                              )}
                            </div>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Previous Hash:</p>
                                <p className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 break-all text-gray-900 dark:text-gray-100">
                                  {event.previousHash}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Current Hash:</p>
                                <p className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 break-all text-gray-900 dark:text-gray-100">
                                  {event.currentHash}
                                </p>
                              </div>
                            </div>
                            {index < selectedBatch.events.length - 1 && (
                              <div className="flex items-center justify-center mt-3">
                                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                                  <div className="w-4 h-px bg-emerald-600 dark:bg-emerald-400"></div>
                                  <Link2 className="h-4 w-4" />
                                  <div className="w-4 h-px bg-emerald-600 dark:bg-emerald-400"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                          <p className="font-medium mb-1">How Hash Chain Verification Works:</p>
                          <p>Each block's hash is calculated from its data plus the previous block's hash. This creates an unbreakable chain where any tampering with historical data would immediately be detected, as it would break the hash chain continuity.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'network' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <Network className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span>Consortium Network</span>
                      </h3>
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Network Type</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{networkInfo.networkType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Consensus</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{networkInfo.consensus}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Nodes</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{networkInfo.totalNodes}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Block Time</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{networkInfo.blockTime}</p>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded p-3">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Finality</p>
                          <p className="text-emerald-600 dark:text-emerald-400 font-semibold">{networkInfo.finality}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Consortium Members</h4>
                      <div className="space-y-3">
                        {networkInfo.consortium.map((member, idx) => (
                          <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  <p className="font-medium text-gray-900 dark:text-white">{member.org}</p>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{member.nodes} node{member.nodes > 1 ? 's' : ''}</p>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded ${
                                member.status === 'active' 
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' 
                                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                              }`}>
                                {member.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                          <p className="font-medium mb-1">Distributed Trust</p>
                          <p>No single organization controls the network. Each transaction requires consensus from multiple nodes operated by different consortium members, ensuring transparency and preventing unilateral data manipulation.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'kpis' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span>Traceability Metrics</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {traceabilityKPIs.map((kpi, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-6">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{kpi.label}</p>
                          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{kpi.value}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{kpi.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'how-it-works' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Understanding Production-Grade Blockchain Traceability
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <FileCheck className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                              Digital Signatures & Non-Repudiation
                            </h4>
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              Every event is cryptographically signed by the actor's private key. The signature is stored on-chain, 
                              ensuring no one can later deny creating that record. Multiple parties endorse critical events (3+ signatures), 
                              creating a web of accountability.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Network className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                              Distributed Consensus (PBFT)
                            </h4>
                            <p className="text-sm text-purple-800 dark:text-purple-200">
                              {networkInfo.totalNodes} nodes operated by government agencies, FPOs, processors, and testing labs validate each 
                              transaction using Practical Byzantine Fault Tolerance consensus. No single entity controls the data. 
                              Instant finality means transactions cannot be reversed once committed.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                              Tamper-Evident, Not Fraud-Proof
                            </h4>
                            <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                              Blockchain makes any post-hoc data modification immediately detectable through broken hash chains. 
                              However, it cannot prevent false data entry at source.
                            </p>
                            <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">We mitigate this through:</p>
                            <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1 list-disc list-inside">
                              <li>Multi-party endorsements (3+ signatures per critical event)</li>
                              <li>IoT sensors (calibrated weighbridges, moisture meters, GPS)</li>
                              <li>Third-party lab certifications (NABL accredited)</li>
                              <li>Satellite cross-verification of crop area and yield</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Lock className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                              Privacy by Design (DPDP Act Compliant)
                            </h4>
                            <p className="text-sm text-green-800 dark:text-green-200">
                              Only minimal event metadata and cryptographic hashes are stored on-chain. Detailed data (PII, GPS coordinates, 
                              lab reports) is stored off-chain (IPFS) with access controls. Users can grant/revoke consent, and data minimization 
                              principles are followed throughout.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Layers className="h-6 w-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                              Handling Blending & Transformation (DAG)
                            </h4>
                            <p className="text-sm text-indigo-800 dark:text-indigo-200">
                              Unlike simple products, oil supply chains involve constant blending and transformation (seed → oil + cake). 
                              We model this as a Directed Acyclic Graph (DAG) with mass-balance verification, allowing traceability of retail 
                              products back to multiple source farms by percentage contribution.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Satellite className="h-6 w-6 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">
                              EPCIS 2.0 Event Standard
                            </h4>
                            <p className="text-sm text-teal-800 dark:text-teal-200">
                              We implement the global EPCIS (Electronic Product Code Information Services) 2.0 standard with four event types:
                            </p>
                            <ul className="text-sm text-teal-800 dark:text-teal-200 space-y-1 mt-2 list-disc list-inside">
                              <li><strong>ObjectEvent:</strong> Movement and handling of products</li>
                              <li><strong>AggregationEvent:</strong> Grouping/ungrouping (e.g., packaging)</li>
                              <li><strong>TransformationEvent:</strong> Processing with mass balance (inputs → outputs + losses)</li>
                              <li><strong>TransactionEvent:</strong> Commercial exchanges with ownership transfer</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-lg">Select a batch to view its traceability details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
