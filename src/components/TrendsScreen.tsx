import { TrendingUp, Music, Video, Clock, MapPin, Star, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const trendingAudio = [
  { id: '1', name: 'Lagu Viral Raya 2024', artist: 'Local Artist', uses: '245K', trend: '+89%', rank: 1 },
  { id: '2', name: 'TikTok Trending Sound #43', artist: 'Global', uses: '1.2M', trend: '+156%', rank: 2 },
  { id: '3', name: 'Bahasa Rojak Remix', artist: 'MY Producer', uses: '89K', trend: '+45%', rank: 3 },
  { id: '4', name: 'Nostalgia 90s Malaysia', artist: 'Throwback', uses: '156K', trend: '+78%', rank: 4 },
];

const trendingStyles = [
  { 
    id: '1', 
    style: 'POV: Customer Reactions',
    description: 'Real customer trying your product for first time',
    performance: 94,
    bestFor: 'F&B, Beauty',
    gradient: 'from-[#FF7A00] to-[#FF9A3E]'
  },
  { 
    id: '2', 
    style: 'Before -> After Transformation',
    description: 'Dramatic visual change that stops scrolling',
    performance: 91,
    bestFor: 'Cleaning, Renovation',
    gradient: 'from-[#2D9CDB] to-[#56CCF2]'
  },
  { 
    id: '3', 
    style: 'Day in the Life (4AM start)',
    description: 'Behind-the-scenes daily hustle',
    performance: 87,
    bestFor: 'F&B, Services',
    gradient: 'from-[#9B51E0] to-[#BB78F0]'
  },
  { 
    id: '4', 
    style: 'Slow Motion Pour/Process',
    description: 'Satisfying food/drink preparation shots',
    performance: 89,
    bestFor: 'F&B, Beverages',
    gradient: 'from-[#FF4FD1] to-[#FF75E3]'
  },
];

const bestPostingTimes = [
  { time: '12:00 PM - 2:00 PM', reason: 'Lunch break browsing', engagement: 'High', color: 'bg-[#2D9CDB]' },
  { time: '7:00 PM - 9:00 PM', reason: 'After dinner relaxation', engagement: 'Peak', color: 'bg-[#FF7A00]' },
  { time: '10:00 PM - 11:00 PM', reason: 'Before sleep scrolling', engagement: 'High', color: 'bg-[#2D9CDB]' },
  { time: 'Sat-Sun 9:00 AM - 11:00 AM', reason: 'Weekend morning leisure', engagement: 'Medium', color: 'bg-[#7D7D7D]' },
];

const localTrends = [
  { location: 'Klang Valley', trending: 'Late night supper spots', posts: '12.5K' },
  { location: 'Penang', trending: 'Heritage food tours', posts: '8.3K' },
  { location: 'JB', trending: 'Border crossing food runs', posts: '15.2K' },
  { location: 'Ipoh', trending: 'Old town coffee shops', posts: '6.7K' },
];

export function TrendsScreen() {
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [animatedUses, setAnimatedUses] = useState<{ [key: string]: number }>({});
  const [animatedPosts, setAnimatedPosts] = useState<{ [key: string]: number }>({});

  // Animate audio uses on mount
  useEffect(() => {
    const usesMap: { [key: string]: number } = {};
    trendingAudio.forEach(audio => {
      const targetValue = parseInt(audio.uses.replace(/[^0-9.]/g, '')) * (audio.uses.includes('M') ? 1000 : 1);
      usesMap[audio.id] = 0;
      
      const duration = 1500;
      const steps = 50;
      const increment = targetValue / steps;
      const stepDuration = duration / steps;
      
      let currentValue = 0;
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(interval);
        }
        setAnimatedUses(prev => ({ ...prev, [audio.id]: currentValue }));
      }, stepDuration);
    });
  }, []);

  // Animate local trends posts on mount
  useEffect(() => {
    const postsMap: { [key: string]: number } = {};
    localTrends.forEach(trend => {
      const targetValue = parseFloat(trend.posts.replace(/[^0-9.]/g, ''));
      postsMap[trend.location] = 0;
      
      const duration = 1500;
      const steps = 50;
      const increment = targetValue / steps;
      const stepDuration = duration / steps;
      
      let currentValue = 0;
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(interval);
        }
        setAnimatedPosts(prev => ({ ...prev, [trend.location]: currentValue }));
      }, stepDuration);
    });
  }, []);

  const formatAnimatedUses = (id: string, originalUses: string) => {
    const value = animatedUses[id] || 0;
    if (originalUses.includes('M')) {
      return `${(value / 1000).toFixed(1)}M`;
    }
    return `${Math.round(value)}K`;
  };

  const formatAnimatedPosts = (location: string) => {
    const value = animatedPosts[location] || 0;
    return `${value.toFixed(1)}K`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4FF] via-[#FFEFE5] to-[#FFF6F0]">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-7 h-7 text-[#A55BFF]" strokeWidth={2} />
            <h1 className="text-[#3A3A3A]">Trending Now</h1>
          </div>
          <p className="text-[#7D7D7D]">
            What&apos;s viral in Malaysia this week
          </p>
        </div>

        {/* Trending Audio */}
        <div className="mb-8">
          <h2 className="text-[#3A3A3A] mb-4 flex items-center gap-2">
            <Music className="w-5 h-5 text-[#A55BFF]" strokeWidth={2} />
            Trending Audio
          </h2>
          <div className="space-y-3">
            {trendingAudio.map((audio) => (
              <div 
                key={audio.id} 
                onClick={() => setSelectedAudio(selectedAudio === audio.id ? null : audio.id)}
                className={`bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer ${
                  selectedAudio === audio.id ? 'ring-2 ring-[#A55BFF] scale-[1.02]' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${
                    selectedAudio === audio.id ? 'scale-110' : ''
                  } ${
                    audio.rank === 1 
                      ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF9A3E]'
                      : 'bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1]'
                  }`}>
                    <Music className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#3A3A3A] text-sm mb-1 truncate">{audio.name}</h3>
                        <p className="text-xs text-[#7D7D7D]">{audio.artist}</p>
                      </div>
                      {audio.rank === 1 && (
                        <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF9A3E] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 ml-2 flex-shrink-0">
                          <Star className="w-3 h-3 fill-current" strokeWidth={0} />
                          #1
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#7D7D7D] mt-2">
                      <span className="text-[#3A3A3A] font-medium">{formatAnimatedUses(audio.id, audio.uses)} uses</span>
                      <div className="h-3 w-px bg-[#E8E8E8]" />
                      <span className="text-[#2D9CDB] flex items-center gap-1 font-medium">
                        <TrendingUp className="w-3 h-3" strokeWidth={2} />
                        {audio.trend}
                      </span>
                    </div>
                  </div>
                </div>
                {selectedAudio === audio.id && (
                  <div className="mt-4 pt-4 border-t border-[#E8E8E8]">
                    <button className="w-full bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white py-2 rounded-xl text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <Music className="w-4 h-4" strokeWidth={2} />
                      Use This Audio
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trending Video Styles */}
        <div className="mb-8">
          <h2 className="text-[#3A3A3A] mb-4 flex items-center gap-2">
            <Video className="w-5 h-5 text-[#A55BFF]" strokeWidth={2} />
            Trending Video Styles
          </h2>
          <div className="space-y-3">
            {trendingStyles.map((style) => (
              <div 
                key={style.id} 
                onClick={() => setSelectedStyle(selectedStyle === style.id ? null : style.id)}
                className={`bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer ${
                  selectedStyle === style.id ? 'ring-2 ring-[#A55BFF] scale-[1.02]' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-[#3A3A3A] flex-1">{style.style}</h3>
                  <div className="flex items-center gap-1 text-sm text-[#2D9CDB] flex-shrink-0 ml-3 font-medium">
                    <TrendingUp className="w-4 h-4" strokeWidth={2} />
                    {style.performance}%
                  </div>
                </div>
                <p className="text-sm text-[#7D7D7D] mb-3">{style.description}</p>
                <div className="bg-gray-100 px-3 py-2 rounded-xl inline-block">
                  <span className="text-xs text-[#3A3A3A] font-medium">Best for: {style.bestFor}</span>
                </div>
                {selectedStyle === style.id && (
                  <div className="mt-4 pt-4 border-t border-[#E8E8E8]">
                    <button className="w-full bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white py-2 rounded-xl text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <Video className="w-4 h-4" strokeWidth={2} />
                      Use This Style
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Best Posting Times */}
        <div className="mb-8">
          <h2 className="text-[#3A3A3A] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#A55BFF]" strokeWidth={2} />
            Best Posting Times
          </h2>
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="space-y-3">
              {bestPostingTimes.map((slot, index) => (
                <div key={index} className={`flex items-center justify-between py-3 hover:bg-[#FFF7FB] -mx-3 px-3 rounded-xl transition-colors cursor-pointer ${
                  index !== bestPostingTimes.length - 1 ? 'border-b border-[#E8E8E8]' : ''
                }`}>
                  <div className="flex-1">
                    <p className="text-[#3A3A3A] text-sm mb-1 font-medium">{slot.time}</p>
                    <p className="text-xs text-[#7D7D7D]">{slot.reason}</p>
                  </div>
                  <span className={`${slot.color} text-white text-xs px-3 py-1 rounded-full flex-shrink-0 ml-3 font-medium`}>
                    {slot.engagement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Local Trends */}
        <div className="mb-8">
          <h2 className="text-[#3A3A3A] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#A55BFF]" strokeWidth={2} />
            Local Trends (Malaysia)
          </h2>
          <div className="space-y-3">
            {localTrends.map((trend) => (
              <div key={trend.location} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-[#A55BFF] mb-1 flex items-center gap-1 font-medium">
                      <MapPin className="w-4 h-4" strokeWidth={2} />
                      {trend.location}
                    </p>
                    <p className="text-[#3A3A3A] text-sm">{trend.trending}</p>
                  </div>
                  <div className="text-right ml-3">
                    <p className="text-xs text-[#7D7D7D] mb-1">Mentions</p>
                    <p className="text-sm text-[#3A3A3A] font-medium">{formatAnimatedPosts(trend.location)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* This Week's Strategy */}
        <div className="bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white rounded-2xl p-5 shadow-xl">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" strokeWidth={2} />
            This Week&apos;s Strategy
          </h3>
          <p className="text-sm text-white text-opacity-90 mb-4">
            POV-style customer reactions are performing 94% better than product-only videos. 
            Show real people trying your products!
          </p>
          <button className="bg-white text-[#A55BFF] px-5 py-3 rounded-xl text-sm hover:bg-opacity-90 hover:shadow-lg transition-all flex items-center gap-2 font-medium">
            Use This Template
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}