import { Clock } from 'lucide-react';
import { loadingTimeTracker } from '../../lib/loadingTimeTracker';

interface LoadingTimeDisplayProps {
  feature?: string;
  className?: string;
}

export function LoadingTimeDisplay({ feature, className = '' }: LoadingTimeDisplayProps) {
  const recentTimes = loadingTimeTracker.getFormattedTimes(feature);
  const averageDuration = loadingTimeTracker.getAverageDuration(feature);

  if (recentTimes.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 ${className}`}>
      <Clock className="h-3 w-3" />
      <span>Recent processing times: {recentTimes.join(', ')}</span>
      {averageDuration > 0 && (
        <span className="text-gray-400 dark:text-gray-500">
          (avg: {(averageDuration / 1000).toFixed(1)}s)
        </span>
      )}
    </div>
  );
}
