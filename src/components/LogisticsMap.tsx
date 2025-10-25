import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { Icon, LatLngBoundsExpression } from 'leaflet'
import { Warehouse as WarehouseIcon, Factory, Truck, X, Filter, Info } from 'lucide-react'
import type { Warehouse, ProcessingUnit, TransportRoute, MapFilters } from '../types'
import MapLegend from './MapLegend'
import 'leaflet/dist/leaflet.css'

interface LogisticsMapProps {
  warehouses: Warehouse[]
  processingUnits: ProcessingUnit[]
  routes: TransportRoute[]
  className?: string
}

function MapBoundsUpdater({ bounds }: { bounds: LatLngBoundsExpression }) {
  const map = useMap()
  
  useMemo(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [bounds, map])
  
  return null
}

const statusColors = {
  warehouse: {
    operational: '#10b981',
    maintenance: '#f59e0b',
    critical: '#ef4444'
  },
  processing: {
    operational: '#3b82f6',
    maintenance: '#f59e0b',
    critical: '#ef4444'
  },
  route: {
    active: '#10b981',
    delayed: '#ef4444',
    scheduled: '#6b7280',
    completed: '#8b5cf6'
  }
}

function createCustomIcon(color: string, type: 'warehouse' | 'processing') {
  const iconHtml = type === 'warehouse'
    ? `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/>
         </svg>
       </div>`
    : `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>
         </svg>
       </div>`

  return new Icon({
    iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconHtml),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    html: iconHtml
  })
}

function LogisticsMap({ warehouses, processingUnits, routes, className = '' }: LogisticsMapProps) {
  const [filters, setFilters] = useState<MapFilters>({
    commodities: [],
    statuses: [],
    showWarehouses: true,
    showProcessingUnits: true,
    showRoutes: true
  })
  const [showFilters, setShowFilters] = useState(false)
  const [showLegend, setShowLegend] = useState(true)

  const allCommodities = useMemo(() => {
    const commoditySet = new Set<string>()
    warehouses.forEach(w => w.commodities.forEach(c => commoditySet.add(c)))
    processingUnits.forEach(p => p.commodities.forEach(c => commoditySet.add(c)))
    routes.forEach(r => commoditySet.add(r.commodity))
    return Array.from(commoditySet).sort()
  }, [warehouses, processingUnits, routes])

  const allStatuses = useMemo(() => {
    const statusSet = new Set<string>()
    warehouses.forEach(w => statusSet.add(w.status))
    processingUnits.forEach(p => statusSet.add(p.status))
    routes.forEach(r => statusSet.add(r.status))
    return Array.from(statusSet).sort()
  }, [warehouses, processingUnits, routes])

  const filteredWarehouses = useMemo(() => {
    if (!filters.showWarehouses) return []
    return warehouses.filter(w => {
      if (filters.statuses.length > 0 && !filters.statuses.includes(w.status)) return false
      if (filters.commodities.length > 0 && !w.commodities.some(c => filters.commodities.includes(c))) return false
      return true
    })
  }, [warehouses, filters])

  const filteredProcessingUnits = useMemo(() => {
    if (!filters.showProcessingUnits) return []
    return processingUnits.filter(p => {
      if (filters.statuses.length > 0 && !filters.statuses.includes(p.status)) return false
      if (filters.commodities.length > 0 && !p.commodities.some(c => filters.commodities.includes(c))) return false
      return true
    })
  }, [processingUnits, filters])

  const filteredRoutes = useMemo(() => {
    if (!filters.showRoutes) return []
    return routes.filter(r => {
      if (filters.statuses.length > 0 && !filters.statuses.includes(r.status)) return false
      if (filters.commodities.length > 0 && !filters.commodities.includes(r.commodity)) return false
      return true
    })
  }, [routes, filters])

  const mapBounds: LatLngBoundsExpression = useMemo(() => {
    const allPoints: [number, number][] = [
      ...filteredWarehouses.map(w => [w.location.lat, w.location.lng] as [number, number]),
      ...filteredProcessingUnits.map(p => [p.location.lat, p.location.lng] as [number, number]),
      ...filteredRoutes.flatMap(r => [
        [r.origin.lat, r.origin.lng] as [number, number],
        [r.destination.lat, r.destination.lng] as [number, number]
      ])
    ]
    
    if (allPoints.length === 0) {
      return [[28.6139, 77.2090], [28.7041, 77.1025]]
    }
    
    const lats = allPoints.map(p => p[0])
    const lngs = allPoints.map(p => p[1])
    
    return [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)]
    ] as LatLngBoundsExpression
  }, [filteredWarehouses, filteredProcessingUnits, filteredRoutes])

  const toggleCommodityFilter = (commodity: string) => {
    setFilters(prev => ({
      ...prev,
      commodities: prev.commodities.includes(commodity)
        ? prev.commodities.filter(c => c !== commodity)
        : [...prev.commodities, commodity]
    }))
  }

  const toggleStatusFilter = (status: string) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status]
    }))
  }

  const clearFilters = () => {
    setFilters({
      commodities: [],
      statuses: [],
      showWarehouses: true,
      showProcessingUnits: true,
      showRoutes: true
    })
  }

  const hasActiveFilters = filters.commodities.length > 0 || filters.statuses.length > 0

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-4 right-4 z-[1000] flex gap-2">
        <button
          onClick={() => setShowLegend(!showLegend)}
          className={`px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition ${
            showLegend
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Info className="h-4 w-4" />
          Legend
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition ${
            showFilters
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filters.commodities.length + filters.statuses.length}
            </span>
          )}
        </button>
      </div>

      {showLegend && (
        <div className="absolute bottom-4 left-4 z-[1000]">
          <MapLegend />
        </div>
      )}

      {showFilters && (
        <div className="absolute top-16 right-4 z-[1000] bg-white rounded-lg shadow-xl p-5 w-80 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Map Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Layer Visibility</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.showWarehouses}
                    onChange={(e) => setFilters(prev => ({ ...prev, showWarehouses: e.target.checked }))}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <WarehouseIcon className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Warehouses ({filteredWarehouses.length})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.showProcessingUnits}
                    onChange={(e) => setFilters(prev => ({ ...prev, showProcessingUnits: e.target.checked }))}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <Factory className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Processing Units ({filteredProcessingUnits.length})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.showRoutes}
                    onChange={(e) => setFilters(prev => ({ ...prev, showRoutes: e.target.checked }))}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <Truck className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-700">Transport Routes ({filteredRoutes.length})</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Commodities</h4>
              <div className="flex flex-wrap gap-2">
                {allCommodities.map(commodity => (
                  <button
                    key={commodity}
                    onClick={() => toggleCommodityFilter(commodity)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      filters.commodities.includes(commodity)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {commodity}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Status</h4>
              <div className="flex flex-wrap gap-2">
                {allStatuses.map(status => (
                  <button
                    key={status}
                    onClick={() => toggleStatusFilter(status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition capitalize ${
                      filters.statuses.includes(status)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}

      <MapContainer
        bounds={mapBounds}
        className={`w-full h-full rounded-lg ${className}`}
        style={{ minHeight: '500px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBoundsUpdater bounds={mapBounds} />

        {filteredWarehouses.map(warehouse => (
          <Marker
            key={warehouse.id}
            position={[warehouse.location.lat, warehouse.location.lng]}
            icon={createCustomIcon(statusColors.warehouse[warehouse.status], 'warehouse')}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{warehouse.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{warehouse.location.address}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      warehouse.status === 'operational'
                        ? 'bg-green-100 text-green-800'
                        : warehouse.status === 'maintenance'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {warehouse.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold text-gray-900">
                      {warehouse.capacity.used} / {warehouse.capacity.total} MT
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        (warehouse.capacity.used / warehouse.capacity.total) * 100 > 90
                          ? 'bg-red-500'
                          : (warehouse.capacity.used / warehouse.capacity.total) * 100 > 75
                          ? 'bg-amber-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${(warehouse.capacity.used / warehouse.capacity.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available:</span>
                    <span className="font-semibold text-green-700">{warehouse.capacity.available} MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temperature:</span>
                    <span className="font-semibold text-gray-900">{warehouse.temperature}°C</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-gray-600 block mb-2">Commodities:</span>
                    <div className="flex flex-wrap gap-1">
                      {warehouse.commodities.map(commodity => (
                        <span
                          key={commodity}
                          className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs font-medium"
                        >
                          {commodity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {filteredProcessingUnits.map(unit => (
          <Marker
            key={unit.id}
            position={[unit.location.lat, unit.location.lng]}
            icon={createCustomIcon(statusColors.processing[unit.status], 'processing')}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{unit.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{unit.location.address}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      unit.status === 'operational'
                        ? 'bg-blue-100 text-blue-800'
                        : unit.status === 'maintenance'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {unit.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Throughput:</span>
                    <span className="font-semibold text-gray-900">
                      {unit.throughput.current} / {unit.throughput.capacity} MT/day
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(unit.throughput.current / unit.throughput.capacity) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Efficiency:</span>
                    <span className="font-semibold text-blue-700">{unit.throughput.efficiency}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Batches:</span>
                    <span className="font-semibold text-gray-900">{unit.activeBatches}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-gray-600 block mb-2">Commodities:</span>
                    <div className="flex flex-wrap gap-1">
                      {unit.commodities.map(commodity => (
                        <span
                          key={commodity}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                        >
                          {commodity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {filteredRoutes.map(route => {
          const allPoints: [number, number][] = [
            [route.origin.lat, route.origin.lng],
            ...route.waypoints.map(wp => [wp.lat, wp.lng] as [number, number]),
            [route.destination.lat, route.destination.lng]
          ]
          
          return (
            <Polyline
              key={route.id}
              positions={allPoints}
              color={statusColors.route[route.status]}
              weight={4}
              opacity={0.7}
              dashArray={route.status === 'scheduled' ? '10, 10' : undefined}
            >
              <Popup>
                <div className="p-2 min-w-[250px]">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{route.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{route.vehicleId}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        route.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : route.status === 'delayed'
                          ? 'bg-red-100 text-red-800'
                          : route.status === 'completed'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {route.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origin:</span>
                      <span className="font-semibold text-gray-900 text-right">{route.origin.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Destination:</span>
                      <span className="font-semibold text-gray-900 text-right">{route.destination.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commodity:</span>
                      <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs font-medium capitalize">
                        {route.commodity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-semibold text-gray-900">{route.distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Time:</span>
                      <span className="font-semibold text-gray-900">{route.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mode:</span>
                      <span className="font-semibold text-gray-900 capitalize">{route.mode}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-semibold text-gray-900">{route.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            route.status === 'delayed'
                              ? 'bg-red-500'
                              : route.status === 'completed'
                              ? 'bg-purple-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${route.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Polyline>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default LogisticsMap
