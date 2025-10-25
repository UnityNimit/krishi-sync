import { useMemo, useState } from 'react'
import {
  ShoppingCart,
  Filter,
  Search,
  ArrowUpRight,
  Truck,
  CreditCard,
  ArrowRight,
  X,
  Users
} from 'lucide-react'
import { mockMarketplaceLots } from '../data/marketplaceData'
import { MarketplaceLot } from '../types'

type ActivityLogEntry = {
  id: string
  message: string
  timestamp: string
}

const statusLabels: Record<MarketplaceLot['status'], string> = {
  available: 'Open to offers',
  'in-negotiation': 'Negotiating',
  'under-fulfillment': 'Fulfilment in progress',
  fulfilled: 'Fulfilled'
}

const statusClasses: Record<MarketplaceLot['status'], string> = {
  available: 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300',
  'in-negotiation': 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
  'under-fulfillment': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  fulfilled: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
}

const interestStatusClasses = {
  active: 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300',
  counter: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
  accepted: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
} as const

const interestStatusLabels = {
  active: 'Active offer',
  counter: 'Counter offer',
  accepted: 'Accepted'
} as const

const formatCurrency = (value: number, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value)

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))

const formatTime = () =>
  new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date())

function Marketplace() {
  const [lots, setLots] = useState<MarketplaceLot[]>(mockMarketplaceLots)
  const [selectedCrop, setSelectedCrop] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [sortOption, setSortOption] = useState<'engagement' | 'price-high' | 'price-low' | 'harvest'>('engagement')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLot, setSelectedLot] = useState<MarketplaceLot | null>(null)
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(() => [
    {
      id: 'activity-initial',
      message: 'Marketplace seeded with initial lots',
      timestamp: formatTime()
    }
  ])

  const pushActivity = (message: string) => {
    const timestamp = formatTime()
    setActivityLog((prev) =>
      [
        { id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, message, timestamp },
        ...prev
      ].slice(0, 5)
    )
  }

  const cropOptions = useMemo(() => ['all', ...Array.from(new Set(lots.map((lot) => lot.crop)))], [lots])
  const regionOptions = useMemo(() => ['all', ...Array.from(new Set(lots.map((lot) => lot.location)))], [lots])

  const filteredLots = useMemo(() => {
    const search = searchTerm.trim().toLowerCase()

    let result = lots.filter((lot) => {
      const matchesCrop = selectedCrop === 'all' || lot.crop === selectedCrop
      const matchesStatus = selectedStatus === 'all' || lot.status === selectedStatus
      const matchesRegion = selectedRegion === 'all' || lot.location === selectedRegion
      return matchesCrop && matchesStatus && matchesRegion
    })

    if (search.length > 0) {
      result = result.filter((lot) => {
        const baseText = `${lot.crop} ${lot.variety} ${lot.location}`.toLowerCase()
        const buyerMatches = lot.buyerInterest.some((buyer) => `${buyer.buyerName} ${buyer.organization}`.toLowerCase().includes(search))
        return baseText.includes(search) || buyerMatches
      })
    }

    const sorted = [...result]
    sorted.sort((a, b) => {
      switch (sortOption) {
        case 'price-high':
          return b.bestOfferPerTon - a.bestOfferPerTon
        case 'price-low':
          return a.bestOfferPerTon - b.bestOfferPerTon
        case 'harvest':
          return new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime()
        case 'engagement':
        default:
          return b.engagementScore - a.engagementScore
      }
    })

    return sorted
  }, [lots, searchTerm, selectedCrop, selectedStatus, selectedRegion, sortOption])

  const marketplaceMetrics = useMemo(() => {
    if (filteredLots.length === 0) {
      return {
        totalVolume: 0,
        pipelineValue: 0,
        avgEngagement: 0,
        activeOffers: 0,
        uniqueBuyers: 0
      }
    }

    const totalVolume = filteredLots.reduce((acc, lot) => acc + lot.lotSizeTons, 0)
    const pipelineValue = filteredLots.reduce((acc, lot) => acc + lot.bestOfferPerTon * lot.lotSizeTons, 0)
    const avgEngagement = Math.round(
      filteredLots.reduce((acc, lot) => acc + lot.engagementScore, 0) / filteredLots.length
    )
    const activeOffers = filteredLots.reduce((acc, lot) => acc + lot.activeOffers, 0)
    const uniqueBuyerIds = new Set<string>()
    filteredLots.forEach((lot) => {
      lot.buyerInterest.forEach((buyer) => {
        uniqueBuyerIds.add(buyer.organization)
      })
    })

    return {
      totalVolume,
      pipelineValue,
      avgEngagement,
      activeOffers,
      uniqueBuyers: uniqueBuyerIds.size
    }
  }, [filteredLots])

  const handleRaiseOffer = (lotId: string) => {
    let lotName = ''
    let engagementAfter = 0

    setLots((prev) =>
      prev.map((lot) => {
        if (lot.id !== lotId || lot.status === 'fulfilled' || lot.status === 'under-fulfillment') {
          return lot
        }

        lotName = `${lot.crop} • ${lot.id}`
        const newBestOffer = Math.min(lot.bestOfferPerTon + 250, lot.askingPricePerTon + 2000)
        engagementAfter = Math.min(100, lot.engagementScore + 6)
        const newInterest = {
          id: `buyer-sim-${Date.now()}`,
          buyerName: 'FPO Trading Desk',
          organization: 'Demo Counter Offer',
          offerPerTon: newBestOffer,
          volumeTons: Math.min(lot.lotSizeTons, Math.max(6, Math.round(lot.lotSizeTons * 0.6))),
          status: 'active' as const,
          updatedAt: 'moments ago'
        }

        return {
          ...lot,
          bestOfferPerTon: newBestOffer,
          engagementScore: engagementAfter,
          activeOffers: lot.activeOffers + 1,
          status: lot.status === 'available' ? 'in-negotiation' : lot.status,
          buyerInterest: [newInterest, ...lot.buyerInterest]
        }
      })
    )

    if (lotName) {
      pushActivity(`Raised a fresh counter offer on ${lotName}. Engagement now at ${engagementAfter}%.`)
    }
  }

  const handleConfirmFulfillment = (lotId: string) => {
    let lotName = ''
    let updated = false

    setLots((prev) =>
      prev.map((lot) => {
        if (lot.id !== lotId) {
          return lot
        }

        if (lot.status === 'fulfilled') {
          return lot
        }

        lotName = `${lot.crop} • ${lot.id}`
        updated = true

        const updatedBuyerInterest = lot.buyerInterest.length
          ? [
              { ...lot.buyerInterest[0], status: 'accepted' as const, updatedAt: 'just now' },
              ...lot.buyerInterest.slice(1)
            ]
          : lot.buyerInterest

        const updatedNotes = lot.assuranceNotes.includes('Marked fulfilled in marketplace demo')
          ? lot.assuranceNotes
          : [...lot.assuranceNotes, 'Marked fulfilled in marketplace demo']

        return {
          ...lot,
          status: 'fulfilled' as const,
          engagementScore: Math.max(lot.engagementScore, 95),
          buyerInterest: updatedBuyerInterest,
          assuranceNotes: updatedNotes
        }
      })
    )

    if (updated && lotName) {
      pushActivity(`${lotName} confirmed as fulfilled for customer storytelling.`)
    }
  }

  const canRaiseOffer = (status: MarketplaceLot['status']) => status === 'available' || status === 'in-negotiation'
  const canConfirmFulfillment = (status: MarketplaceLot['status']) =>
    status === 'in-negotiation' || status === 'under-fulfillment'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <ShoppingCart className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
          Farmer Marketplace
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
          Navigate active crop lots, buyer demand, and fulfilment logistics from a single narrative console.
          Filters and demo actions below let you shape the story in real-time for stakeholder walkthroughs.
        </p>
      </div>

      <div className="card">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Pipeline value</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2 flex items-center gap-2">
              {formatCurrency(marketplaceMetrics.pipelineValue)}
              <ArrowUpRight className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Based on current best offers</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Volume in play</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{marketplaceMetrics.totalVolume} MT</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Across filtered lots</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Avg. engagement</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{marketplaceMetrics.avgEngagement}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Buyer readiness score</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Active buyers</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              {marketplaceMetrics.uniqueBuyers}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Unique organisations engaged</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Activity log</p>
          <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50">
            {activityLog.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No recent marketplace actions yet.</p>
            ) : (
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {activityLog.map((entry) => (
                  <li key={entry.id} className="flex items-start gap-3">
                    <span className="mt-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">{entry.timestamp}</span>
                    <span className="flex-1 leading-snug">{entry.message}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300 font-semibold">
            <Filter className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
            Refine marketplace view
          </div>
          <div className="w-full lg:w-auto">
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search crop, buyer or region"
                className="w-full lg:w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div>
            <label className="text-xs uppercase text-gray-500 dark:text-gray-400 block mb-1">Crop</label>
            <select
              value={selectedCrop}
              onChange={(event) => setSelectedCrop(event.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {cropOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All crops' : option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase text-gray-500 dark:text-gray-400 block mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All statuses</option>
              <option value="available">Open to offers</option>
              <option value="in-negotiation">Negotiating</option>
              <option value="under-fulfillment">Fulfilment in progress</option>
              <option value="fulfilled">Fulfilled</option>
            </select>
          </div>
          <div>
            <label className="text-xs uppercase text-gray-500 dark:text-gray-400 block mb-1">Region</label>
            <select
              value={selectedRegion}
              onChange={(event) => setSelectedRegion(event.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {regionOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All regions' : option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase text-gray-500 dark:text-gray-400 block mb-1">Sort by</label>
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as typeof sortOption)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="engagement">Buyer engagement</option>
              <option value="price-high">Price (high to low)</option>
              <option value="price-low">Price (low to high)</option>
              <option value="harvest">Harvest date (newest)</option>
            </select>
          </div>
        </div>
      </div>

      {filteredLots.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">No lots match the current filters.</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Adjust the filters or clear the search term to see marketplace activity.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredLots.map((lot) => {
            const topBuyer = lot.buyerInterest[0]
            const totalValue = lot.bestOfferPerTon * lot.lotSizeTons

            return (
              <div key={lot.id} className="card flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className={`badge ${statusClasses[lot.status]}`}>{statusLabels[lot.status]}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(lot.harvestDate)}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-3">
                        {lot.crop} • {lot.variety}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{lot.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase text-gray-500 dark:text-gray-400">Best offer</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(lot.bestOfferPerTon, lot.contractCurrency)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(totalValue, lot.contractCurrency)} total</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Lot volume</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{lot.lotSizeTons} MT</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Quality grade</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{lot.qualityGrade} • Moisture {lot.moisture}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Active offers</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{lot.activeOffers}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Leading buyer</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {topBuyer ? `${topBuyer.buyerName} · ₹${topBuyer.offerPerTon.toLocaleString('en-IN')}` : '—'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Buyer engagement</span>
                      <span>{lot.engagementScore}% aligned</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <div
                        className="h-2 bg-primary-600 dark:bg-primary-500 rounded-full"
                        style={{ width: `${lot.engagementScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {lot.assuranceNotes.map((note) => (
                      <span key={note} className="badge bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleRaiseOffer(lot.id)}
                    disabled={!canRaiseOffer(lot.status)}
                    className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Raise Offer
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLot(lot)}
                    className="btn-secondary"
                  >
                    View Logistics & Credit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmFulfillment(lot.id)}
                    disabled={!canConfirmFulfillment(lot.status)}
                    className="px-4 py-2 rounded-lg font-medium border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Confirm Fulfilment
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {selectedLot && (
        <div
          className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 flex items-center justify-center px-4 py-6"
          onClick={() => setSelectedLot(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className={`badge ${statusClasses[selectedLot.status]}`}>{statusLabels[selectedLot.status]}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {selectedLot.crop} • {selectedLot.variety}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedLot.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLot(null)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <p className="text-xs uppercase text-gray-500 dark:text-gray-400">Harvested</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{formatDate(selectedLot.harvestDate)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500 dark:text-gray-400">Lot volume</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{selectedLot.lotSizeTons} MT</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500 dark:text-gray-400">Offer bandwidth</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {formatCurrency(selectedLot.bestOfferPerTon, selectedLot.contractCurrency)} best · Asking {formatCurrency(selectedLot.askingPricePerTon, selectedLot.contractCurrency)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500 dark:text-gray-400">Quality & moisture</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{selectedLot.qualityGrade} • {selectedLot.moisture}</p>
                </div>
              </div>

              {selectedLot.assuranceNotes.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-2">Assurance & readiness</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedLot.assuranceNotes.map((note) => (
                      <span key={note} className="badge bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Buyer interest</h3>
                <div className="space-y-3">
                  {selectedLot.buyerInterest.map((buyer) => (
                    <div
                      key={buyer.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{buyer.buyerName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{buyer.organization}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Offer: ₹{buyer.offerPerTon.toLocaleString('en-IN')}/MT</span>
                        <span>Volume: {buyer.volumeTons} MT</span>
                        <span>Updated: {buyer.updatedAt}</span>
                      </div>
                      <span className={`badge ${interestStatusClasses[buyer.status]}`}>
                        {interestStatusLabels[buyer.status]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  Logistics options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedLot.logisticsOptions.map((option) => (
                    <div key={option.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{option.provider}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{option.mode}</p>
                        </div>
                        <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">{option.reliabilityScore}% reliability</span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{option.estimatedCost}</span>
                        <span>Transit: {option.transitTime}</span>
                        <span>{option.availability}</span>
                        <span>Capacity: {option.capacity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  Credit enablement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedLot.creditOptions.map((option) => (
                    <div key={option.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{option.provider}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{option.product}</p>
                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">Rate: {option.rate}</p>
                        <p>Max amount: {option.maxAmount}</p>
                        <p>Approval: {option.approvalTime}</p>
                        <p className="leading-snug">{option.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleRaiseOffer(selectedLot.id)
                    setSelectedLot(null)
                  }}
                  disabled={!canRaiseOffer(selectedLot.status)}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Raise Offer from Modal
                  <ArrowRight className="h-4 w-4 ml-2 inline" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleConfirmFulfillment(selectedLot.id)
                    setSelectedLot(null)
                  }}
                  disabled={!canConfirmFulfillment(selectedLot.status)}
                  className="px-4 py-2 rounded-lg font-medium border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Confirm Fulfilment
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLot(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketplace
