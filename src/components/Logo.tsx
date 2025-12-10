import { Sparkles, TrendingUp, Zap } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  variant?: 'default' | 'white' | 'gradient';
}

export function Logo({ size = 'medium', showText = true, variant = 'default' }: LogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-20 h-20',
  };

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-10 h-10',
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] flex items-center justify-center relative overflow-hidden shadow-lg`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <TrendingUp className={`absolute top-1 right-1 ${iconSizes[size]} text-white rotate-12`} strokeWidth={2} />
          <Zap className={`absolute bottom-1 left-1 ${iconSizes[size]} text-white -rotate-12`} strokeWidth={2} />
        </div>
        {/* Main icon */}
        <Sparkles className={`${iconSizes[size]} text-white relative z-10`} strokeWidth={2.5} />
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizes[size]} ${
            variant === 'white' ? 'text-white' : 
            variant === 'gradient' ? 'bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] bg-clip-text text-transparent' :
            'text-[#3A3A3A]'
          } tracking-tight leading-none`} style={{ fontWeight: 800 }}>
            TRENDE
          </h1>
          {size !== 'small' && (
            <p className={`text-xs ${
              variant === 'white' ? 'text-white text-opacity-80' : 'text-[#7D7D7D]'
            } tracking-wider`}>
              CREATE VIRAL VIDEOS
            </p>
          )}
        </div>
      )}
    </div>
  );
}
