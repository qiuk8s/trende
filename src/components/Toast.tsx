import { Check, X, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export function Toast({ isOpen, onClose, type = 'success', message, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const configs = {
    success: {
      icon: Check,
      gradient: 'from-[#2D9CDB] to-[#56CCF2]',
      bg: 'bg-[#2D9CDB]'
    },
    error: {
      icon: X,
      gradient: 'from-[#EB4D87] to-[#FF4FD1]',
      bg: 'bg-[#EB4D87]'
    },
    warning: {
      icon: AlertCircle,
      gradient: 'from-[#FF7A00] to-[#FF9A3E]',
      bg: 'bg-[#FF7A00]'
    },
    info: {
      icon: Info,
      gradient: 'from-[#9B51E0] to-[#BB78F0]',
      bg: 'bg-[#9B51E0]'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
      <div className={`bg-gradient-to-r ${config.gradient} text-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-3 max-w-sm`}>
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <p className="text-sm flex-1">{message}</p>
        <button onClick={onClose} className="text-white hover:text-opacity-80 transition-opacity">
          <X className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
