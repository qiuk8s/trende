import { Video, TrendingUp, BarChart3, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'video' | 'trending' | 'analytics' | 'sparkles';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  icon = 'video', 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  const icons = {
    video: Video,
    trending: TrendingUp,
    analytics: BarChart3,
    sparkles: Sparkles,
  };

  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-6 text-center">
      {/* Icon */}
      <div className="w-24 h-24 bg-gradient-to-br from-[#A55BFF] to-[#FF4FD1] bg-opacity-10 rounded-3xl flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-[#A55BFF]" strokeWidth={2} />
      </div>

      {/* Title */}
      <h3 className="text-[#3A3A3A] mb-3">{title}</h3>

      {/* Description */}
      <p className="text-[#7D7D7D] max-w-sm mb-6">{description}</p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
