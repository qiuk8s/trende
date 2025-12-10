import { Sparkles, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

export function LoadingState({ message = 'Loading...', subMessage }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-6">
      <div className="relative mb-6">
        {/* Animated background circles */}
        <div className="absolute inset-0 animate-ping">
          <div className="w-20 h-20 bg-[#A55BFF] rounded-full opacity-20" />
        </div>
        <div className="absolute inset-0 animate-pulse" style={{ animationDelay: '150ms' }}>
          <div className="w-20 h-20 bg-[#FF4FD1] rounded-full opacity-20" />
        </div>
        
        {/* Main icon */}
        <div className="relative w-20 h-20 bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] rounded-full flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-white animate-pulse" strokeWidth={2} />
        </div>
      </div>

      <h3 className="text-[#3A3A3A] mb-2">{message}</h3>
      {subMessage && (
        <p className="text-sm text-[#7D7D7D] text-center max-w-sm">{subMessage}</p>
      )}

      {/* Loading dots */}
      <div className="flex gap-2 mt-4">
        <div className="w-2 h-2 bg-[#A55BFF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-[#FF4FD1] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-[#A55BFF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

export function AILoadingState({ message = 'AI is working...', progress = 0 }: { message?: string; progress?: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-6">
      <div className="relative mb-6">
        {/* Rotating gradient ring */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#A55BFF] via-[#FF4FD1] to-transparent opacity-50" />
        </div>
        
        {/* Center icon */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white animate-pulse" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <h3 className="text-[#3A3A3A] mb-2">{message}</h3>
      
      {/* Progress bar */}
      {progress > 0 && (
        <div className="w-full max-w-xs mt-4">
          <div className="bg-[#E8E8E8] rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#7D7D7D] text-center mt-2">{progress}%</p>
        </div>
      )}
    </div>
  );
}
