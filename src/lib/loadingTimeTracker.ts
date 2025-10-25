/**
 * Loading Time Tracker
 * Track loading times to demonstrate they're variable and realistic
 */

interface LoadingTimeRecord {
  feature: string;
  duration: number;
  timestamp: Date;
  complexity: string;
}

class LoadingTimeTracker {
  private records: LoadingTimeRecord[] = [];
  private maxRecords = 5; // Keep last 5 records

  track(feature: string, duration: number, complexity: string) {
    this.records.push({
      feature,
      duration,
      timestamp: new Date(),
      complexity
    });

    // Keep only the most recent records
    if (this.records.length > this.maxRecords) {
      this.records.shift();
    }
  }

  getRecentTimes(feature?: string): number[] {
    const filtered = feature 
      ? this.records.filter(r => r.feature === feature)
      : this.records;
    
    return filtered.map(r => r.duration);
  }

  getFormattedTimes(feature?: string): string[] {
    return this.getRecentTimes(feature).map(t => `${(t / 1000).toFixed(1)}s`);
  }

  getAverageDuration(feature?: string): number {
    const times = this.getRecentTimes(feature);
    if (times.length === 0) return 0;
    return times.reduce((sum, t) => sum + t, 0) / times.length;
  }

  getAllRecords(): LoadingTimeRecord[] {
    return [...this.records];
  }

  clear() {
    this.records = [];
  }
}

export const loadingTimeTracker = new LoadingTimeTracker();
