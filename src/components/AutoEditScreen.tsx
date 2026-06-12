import { useState, useEffect } from 'react';
import { Sparkles, Wand2, Download, Share2 } from 'lucide-react';
import { AIHookSelector } from './AIHookSelector';

interface Template {
  id: string;
  name: string;
}

interface AutoEditScreenProps {
  template: Template;
  onBack: () => void;
  onComplete: () => void;
}

export function AutoEditScreen({ template, onBack, onComplete }: AutoEditScreenProps) {
  const [editingProgress, setEditingProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(true);
  const [showAIHooks, setShowAIHooks] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const interval = setInterval(() => {
        setEditingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsEditing(false);
            setTimeout(() => setShowAIHooks(true), 500);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isEditing]);

  const editingSteps = [
    { label: 'Syncing to music', progress: 20 },
    { label: 'Adding transitions', progress: 40 },
    { label: 'Color correction', progress: 60 },
    { label: 'Applying effects', progress: 80 },
    { label: 'Finalizing', progress: 100 },
  ];

  const currentStep = editingSteps.find(step => editingProgress <= step.progress) || editingSteps[editingSteps.length - 1];

  if (showAIHooks) {
    return <AIHookSelector template={template} onBack={onBack} onComplete={onComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {isEditing ? (
          <>
            {/* AI Magic Animation */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-pulse">
                  <Wand2 className="w-12 h-12 text-purple-300" />
                </div>
                <div className="absolute inset-0 animate-ping">
                  <div className="w-24 h-24 bg-purple-500 rounded-full opacity-20" />
                </div>
              </div>
              
              <h2 className="text-white mt-6 mb-2 text-center">AI Auto-Editing Your Video</h2>
              <p className="text-purple-200 text-center">{currentStep.label}...</p>
            </div>

            {/* Progress Bar */}
            <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden mb-4">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${editingProgress}%` }}
              />
            </div>
            <p className="text-center text-purple-200 text-sm mb-8">{editingProgress}% Complete</p>

            {/* What We're Doing */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="text-white mb-4 flex items-center gap-2 font-medium">
                <Sparkles className="w-5 h-5 text-purple-300" />
                What AI is doing:
              </h3>
              <ul className="space-y-3 text-sm">
                {editingSteps.map((step, index) => (
                  <li key={index} className={`flex items-center gap-3 transition-colors ${
                    editingProgress >= step.progress ? 'text-white font-medium' : 'text-purple-200'
                  }`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      editingProgress >= step.progress 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-purple-300/50 text-transparent'
                    }`}>
                      {editingProgress >= step.progress && <span className="text-xs">OK</span>}
                    </div>
                     {step.label}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Completion Animation */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-12 h-12" />
              </div>
              <h2 className="text-white mb-2">Video Ready!</h2>
              <p className="text-purple-200 text-center">
                Your video has been auto-edited with AI magic
              </p>
            </div>

            {/* Video Preview */}
            <div className="bg-black rounded-xl aspect-[9/16] max-w-xs mx-auto mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                  Play
                </div>
                <p className="text-sm text-gray-400">Preview</p>
              </div>
            </div>

            <button
              onClick={() => setShowAIHooks(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-3"
            >
              <Sparkles className="w-5 h-5" />
              Continue to AI Hooks & Captions
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 rounded-xl bg-white bg-opacity-10 hover:bg-opacity-20 transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Save Draft
              </button>
              <button className="py-3 rounded-xl bg-white bg-opacity-10 hover:bg-opacity-20 transition-all flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
