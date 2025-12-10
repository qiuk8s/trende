import { Check, X, Sparkles } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  actionLabel, 
  onAction 
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7D7D7D] hover:text-[#3A3A3A] transition-colors"
        >
          <X className="w-6 h-6" strokeWidth={2} />
        </button>

        {/* Success animation */}
        <div className="mb-6 relative">
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-[#2D9CDB] rounded-full opacity-20 animate-ping" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: '150ms' }}>
            <div className="w-24 h-24 bg-[#2D9CDB] rounded-full opacity-20 animate-ping" />
          </div>

          {/* Check icon */}
          <div className="relative w-24 h-24 bg-gradient-to-r from-[#2D9CDB] to-[#56CCF2] rounded-full flex items-center justify-center mx-auto">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-[#3A3A3A] mb-3">{title}</h2>
        <p className="text-[#7D7D7D] mb-6">{message}</p>

        {/* Actions */}
        <div className="space-y-3">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="w-full bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              {actionLabel}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full bg-[#E8E8E8] text-[#3A3A3A] py-3 rounded-xl hover:bg-[#d8d8d8] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function ErrorModal({ 
  isOpen, 
  onClose, 
  title = 'Oops!', 
  message 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title?: string; 
  message: string; 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7D7D7D] hover:text-[#3A3A3A] transition-colors"
        >
          <X className="w-6 h-6" strokeWidth={2} />
        </button>

        {/* Error icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-[#EB4D87] to-[#FF4FD1] bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
            <div className="text-5xl">⚠️</div>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-[#3A3A3A] mb-3">{title}</h2>
        <p className="text-[#7D7D7D] mb-6">{message}</p>

        {/* Action */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
