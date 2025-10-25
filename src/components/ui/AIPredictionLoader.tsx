import { useState, useEffect } from 'react';
import { Brain, CheckCircle, Loader2 } from 'lucide-react';
import { 
  getAILoadingDuration, 
  getStageTimings, 
  getRandomProcessingMessage,
  getAnimationSpeed,
  getPulseDelay,
  ComplexityLevel,
  StageTimings
} from '../../lib/aiLoading';
import { loadingTimeTracker } from '../../lib/loadingTimeTracker';

interface AIPredictionLoaderProps {
  onComplete: () => void;
  complexity?: ComplexityLevel;
  title?: string;
  subtitle?: string;
}

export function AIPredictionLoader({ 
  onComplete, 
  complexity = 'medium',
  title = 'AI Model Processing...',
  subtitle = 'Analyzing data with machine learning models'
}: AIPredictionLoaderProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [stages, setStages] = useState<StageTimings[]>([]);
  const [progress, setProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState(getRandomProcessingMessage());
  const [showMessage] = useState(Math.random() < 0.3);
  const [spinnerSpeed] = useState(getAnimationSpeed());
  
  useEffect(() => {
    // Generate variable duration
    const totalDuration = getAILoadingDuration(complexity);
    const stageTimings = getStageTimings(totalDuration);
    setStages(stageTimings);
    
    // Track loading time
    loadingTimeTracker.track(title, totalDuration, complexity);
    
    let elapsed = 0;
    let stageIndex = 0;
    
    // Progress through stages with variable timing
    const interval = setInterval(() => {
      elapsed += 50;
      setProgress((elapsed / totalDuration) * 100);
      
      // Check if we should move to next stage
      let cumulativeTime = 0;
      for (let i = 0; i <= stageIndex; i++) {
        cumulativeTime += stageTimings[i]?.duration || 0;
      }
      
      if (elapsed >= cumulativeTime && stageIndex < stageTimings.length - 1) {
        setCurrentStage(++stageIndex);
      }
      
      if (elapsed >= totalDuration) {
        clearInterval(interval);
        onComplete();
      }
    }, 50);
    
    // Change processing message every 2-3 seconds
    const messageInterval = setInterval(() => {
      setProcessingMessage(getRandomProcessingMessage());
    }, 2000 + Math.random() * 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [complexity, onComplete, title]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      {/* Animated Spinner */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
        <div 
          className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"
          style={{
            animationDuration: `${spinnerSpeed}s` // Variable spin speed
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      
      {/* Main Status */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {stages[currentStage]?.name || subtitle}
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Stage List */}
      <div className="space-y-2 w-80">
        {stages.map((stage, idx) => (
          <div 
            key={idx}
            className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${
              idx === currentStage 
                ? 'opacity-100' 
                : idx < currentStage 
                  ? 'opacity-50' 
                  : 'opacity-30'
            }`}
          >
            {idx < currentStage ? (
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            ) : idx === currentStage ? (
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
            ) : (
              <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full flex-shrink-0"></div>
            )}
            <span className={`${
              idx === currentStage 
                ? 'text-gray-900 dark:text-gray-100 font-medium' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {stage.name}
            </span>
            {idx === currentStage && (
              <span className="ml-auto text-xs text-blue-600 dark:text-blue-400 animate-pulse">
                {Math.round((stage.duration / 1000) * 10) / 10}s
              </span>
            )}
          </div>
        ))}
      </div>
      
      {/* Occasional "System Messages" */}
      {showMessage && progress > 30 && (
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 animate-pulse">
          {processingMessage}...
        </div>
      )}
    </div>
  );
}

export function VariableSpinner() {
  const [spinDuration] = useState(0.6 + Math.random() * 0.6); // 0.6-1.2s
  const [pulseDelay] = useState(getPulseDelay());
  
  return (
    <div className="relative w-16 h-16">
      <div 
        className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"
        style={{ animationDuration: `${spinDuration}s` }}
      ></div>
      <div 
        className="absolute inset-2 border-4 border-blue-400 rounded-full border-b-transparent animate-spin"
        style={{ 
          animationDuration: `${spinDuration * 1.5}s`,
          animationDirection: 'reverse',
          animationDelay: `${pulseDelay}s`
        }}
      ></div>
    </div>
  );
}
