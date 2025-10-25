import { Warehouse, Factory, Truck } from 'lucide-react'

function MapLegend() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Map Legend</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Locations</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                <Warehouse className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs text-gray-700">Warehouse</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <Factory className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs text-gray-700">Processing Unit</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-600" />
              <span className="text-xs text-gray-700">Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-600" />
              <span className="text-xs text-gray-700">Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600" />
              <span className="text-xs text-gray-700">Critical</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Transport Routes</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3 text-green-600" />
                <div className="w-6 h-1 bg-green-600 rounded" />
              </div>
              <span className="text-xs text-gray-700">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3 text-red-600" />
                <div className="w-6 h-1 bg-red-600 rounded" />
              </div>
              <span className="text-xs text-gray-700">Delayed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3 text-gray-600" />
                <div className="w-6 h-1 border-t-2 border-dashed border-gray-600" />
              </div>
              <span className="text-xs text-gray-700">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3 text-purple-600" />
                <div className="w-6 h-1 bg-purple-600 rounded" />
              </div>
              <span className="text-xs text-gray-700">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapLegend
