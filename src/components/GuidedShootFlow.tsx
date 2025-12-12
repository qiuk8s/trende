import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Check, Sparkles, RotateCcw, X } from 'lucide-react';
import { AutoEditScreen } from './AutoEditScreen';
import { ErrorModal } from './SuccessModal';

interface Shot {
  id: number;
  instruction: string;
  duration: number;
  tips: string;
  cameraAngle: string;
}

interface Template {
  id: string;
  name: string;
  shots: Shot[];
}

interface GuidedShootFlowProps {
  template: Template;
  onBack: () => void;
  onComplete: () => void;
}

export function GuidedShootFlow({ template, onBack, onComplete }: GuidedShootFlowProps) {
  const [currentShotIndex, setCurrentShotIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [completedShots, setCompletedShots] = useState<number[]>([]);
  const [shootingComplete, setShootingComplete] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [showPermissionError, setShowPermissionError] = useState(false);

  const currentShot = template.shots[currentShotIndex];
  const progress = ((currentShotIndex + 1) / template.shots.length) * 100;

  const handleRecord = () => {
    // Start 3-second countdown
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      startRecording();
    }
  }, [countdown]);

  const startRecording = () => {
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
      setCompletedShots([...completedShots, currentShot.id]);
      
      if (currentShotIndex < template.shots.length - 1) {
        setCurrentShotIndex(currentShotIndex + 1);
      } else {
        setShootingComplete(true);
      }
    }, currentShot.duration * 1000);
  };

  const handleRetake = () => {
    setCompletedShots(completedShots.filter(id => id !== currentShot.id));
  };

  const handleSkip = () => {
    if (currentShotIndex < template.shots.length - 1) {
      setCurrentShotIndex(currentShotIndex + 1);
    }
  };

  const handleBack = () => {
    if (completedShots.length > 0) {
      setShowBackConfirm(true);
    } else {
      onBack();
    }
  };

  if (shootingComplete) {
    return <AutoEditScreen template={template} onBack={onBack} onComplete={onComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-black bg-opacity-80 backdrop-blur-sm p-4 relative z-20">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={handleBack} className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" strokeWidth={2} />
            </button>
            <div className="text-sm text-white">
              Shot {currentShotIndex + 1} of {template.shots.length}
            </div>
            <button 
              onClick={() => setShowPermissionError(true)}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            >
              <Camera className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Camera Preview Area */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-900">
        {/* Simulated Camera View */}
        <div className="relative w-full max-w-lg aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
          
          {/* Rule of Thirds Grid (always visible) */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-30">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-white border-opacity-20" />
            ))}
          </div>

          {/* Camera Guide Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-4 border-dashed border-[#A55BFF] border-opacity-50 w-3/4 h-3/4 rounded-lg flex items-center justify-center relative">
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-[#FF4FD1]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#FF4FD1]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#FF4FD1]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-[#FF4FD1]" />
              
              {/* Center indicator */}
              {!isRecording && !completedShots.includes(currentShot.id) && countdown === null && (
                <div className="text-center space-y-2 animate-pulse">
                  <Camera className="w-16 h-16 mx-auto text-[#A55BFF]" strokeWidth={2} />
                  <p className="text-sm text-[#A55BFF]">Frame your shot here</p>
                </div>
              )}
            </div>
          </div>

          {/* Countdown Overlay */}
          {countdown !== null && countdown > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
              <div className="text-9xl text-white animate-pulse">
                {countdown}
              </div>
            </div>
          )}

          {/* Recording Indicator with Timer */}
          {isRecording && (
            <div className="absolute top-4 left-0 right-0 flex flex-col items-center gap-2 z-10">
              <div className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full" />
                <span className="text-sm text-white">REC</span>
              </div>
              {/* Progress ring */}
              <div className="w-16 h-16 rounded-full border-4 border-white border-opacity-30 flex items-center justify-center">
                <span className="text-white text-lg">{currentShot.duration}s</span>
              </div>
            </div>
          )}

          {/* Completion Check */}
          {completedShots.includes(currentShot.id) && !isRecording && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-600 bg-opacity-20 animate-fadeIn">
              <div className="bg-gradient-to-r from-[#2D9CDB] to-[#56CCF2] rounded-full p-6 shadow-2xl">
                <Check className="w-16 h-16 text-white" strokeWidth={3} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Instruction Panel */}
      <div className="bg-gradient-to-t from-black via-black to-transparent p-6 relative z-20">
        <div className="max-w-lg mx-auto">
          {/* Current Shot Instructions */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] px-3 py-1 rounded-full text-sm">
                {currentShot.duration} seconds
              </div>
              <div className="bg-white bg-opacity-10 px-3 py-1 rounded-full text-sm">
                {currentShot.cameraAngle}
              </div>
            </div>
            <h2 className="text-white text-lg font-medium mb-3">{currentShot.instruction}</h2>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <p className="text-yellow-300 font-medium text-sm flex gap-2">
                <span className="text-lg">💡</span>
                {currentShot.tips}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {!completedShots.includes(currentShot.id) ? (
            <div className="space-y-3">
              <button
                onClick={handleRecord}
                disabled={isRecording || countdown !== null}
                className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  isRecording || countdown !== null
                    ? 'bg-red-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] hover:shadow-lg'
                }`}
              >
                <Camera className="w-5 h-5" strokeWidth={2} />
                {countdown !== null ? 'Get Ready...' : isRecording ? 'Recording...' : 'Start Recording'}
              </button>
              
              <button
                onClick={handleSkip}
                disabled={isRecording || countdown !== null}
                className="w-full py-3 rounded-xl bg-white bg-opacity-10 hover:bg-opacity-20 transition-all text-sm disabled:opacity-50"
              >
                Skip This Shot
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-[#2D9CDB] to-[#56CCF2] bg-opacity-20 border-2 border-[#2D9CDB] rounded-xl p-4 flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-[#2D9CDB]" strokeWidth={2.5} />
                <span className="text-[#2D9CDB]">Shot Captured!</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleRetake}
                  className="py-3 rounded-xl bg-white bg-opacity-10 hover:bg-opacity-20 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" strokeWidth={2} />
                  Retake
                </button>
                
                <button
                  onClick={() => {
                    if (currentShotIndex < template.shots.length - 1) {
                      setCurrentShotIndex(currentShotIndex + 1);
                    } else {
                      setShootingComplete(true);
                    }
                  }}
                  className="py-3 rounded-xl bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {currentShotIndex < template.shots.length - 1 ? 'Next Shot' : 'Finish & Edit'}
                  <Sparkles className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          )}

          {/* Shot Thumbnails */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {template.shots.map((shot, index) => (
              <div
                key={shot.id}
                onClick={() => setCurrentShotIndex(index)}
                className={`flex-shrink-0 w-16 h-24 rounded-lg cursor-pointer transition-all ${
                  index === currentShotIndex
                    ? 'ring-2 ring-[#A55BFF] bg-[#A55BFF] bg-opacity-20'
                    : completedShots.includes(shot.id)
                    ? 'bg-[#2D9CDB] bg-opacity-20 border-2 border-[#2D9CDB]'
                    : 'bg-gray-800 border-2 border-gray-700'
                }`}
              >
                <div className="h-full flex flex-col items-center justify-center p-2">
                  {completedShots.includes(shot.id) ? (
                    <Check className="w-6 h-6 text-[#2D9CDB]" strokeWidth={2.5} />
                  ) : (
                    <Camera className="w-6 h-6 text-gray-500" strokeWidth={2} />
                  )}
                  <span className="text-xs mt-1">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Confirmation Modal */}
      <ErrorModal
        isOpen={showBackConfirm}
        onClose={() => setShowBackConfirm(false)}
        title="Exit Shooting?"
        message={`You have ${completedShots.length} shot(s) recorded. Going back will lose all progress.`}
      />

      {/* Permission Error Modal */}
      <ErrorModal
        isOpen={showPermissionError}
        onClose={() => setShowPermissionError(false)}
        title="Camera Permission Needed"
        message="Please enable camera access in your browser settings to record videos."
      />
    </div>
  );
}
