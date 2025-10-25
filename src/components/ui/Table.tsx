import { ReactNode } from 'react'

export interface TableColumn<T> {
  key: string
  header: string
  render?: (row: T) => ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  keyExtractor: (row: T, index: number) => string | number
  className?: string
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
  emptyMessage?: string
}

export function Table<T>({
  data,
  columns,
  keyExtractor,
  className = '',
  striped = false,
  hoverable = true,
  compact = false,
  emptyMessage = 'No data available'
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={`card ${className}`}>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </div>
      </div>
    )
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                style={column.width ? { width: column.width } : undefined}
                className={`${compact ? 'px-3 py-2' : 'px-6 py-3'} text-${column.align || 'left'} text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700`}>
          {data.map((row, index) => {
            const key = keyExtractor(row, index)
            return (
              <tr
                key={key}
                className={`
                  ${striped && index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                  ${hoverable ? 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors' : ''}
                `}
              >
                {columns.map((column) => {
                  const cellValue = column.render 
                    ? column.render(row) 
                    : (row as Record<string, unknown>)[column.key]?.toString() || '-'
                  
                  return (
                    <td
                      key={column.key}
                      className={`${compact ? 'px-3 py-2' : 'px-6 py-4'} text-${column.align || 'left'} text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap`}
                    >
                      {cellValue}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
