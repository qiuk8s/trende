import { Trophy, TrendingUp, Users, DollarSign, Star, Quote, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const successStories = [
  {
    id: '1',
    name: 'Kafe Kita',
    business: 'Cafe in Shah Alam',
    image: '☕',
    beforeViews: '1.2K',
    afterViews: '12.5K',
    increase: '940%',
    timeframe: '2 weeks',
    testimonial: 'Dulu posting gambar je, takde orang tengok. Pakai app ni buat video pouring kopi - viral terus! Queue panjang sampai luar kedai now.',
    metric: 'Sales increased 3x',
    gradient: 'from-[#FF7A00] to-[#FF9A3E]'
  },
  {
    id: '2',
    name: 'Aunty Lily Cleaning Services',
    business: 'House Cleaning in KL',
    image: '🧹',
    beforeViews: '2.5K',
    afterViews: '24.8K',
    increase: '890%',
    timeframe: '1 week',
    testimonial: 'I just follow the Before-After template. Show dirty kitchen, then show clean. Customers now booking 2 weeks in advance!',
    metric: 'Bookings up 250%',
    gradient: 'from-[#2D9CDB] to-[#56CCF2]'
  },
  {
    id: '3',
    name: 'Sambal Sedap',
    business: 'Homemade Sambal in Penang',
    image: '🌶️',
    beforeViews: '3.5K',
    afterViews: '45.2K',
    increase: '1200%',
    timeframe: '3 weeks',
    testimonial: 'Guided shot system senang sangat. Customer reaction video I buat - 45K views! Sold out sambal for 1 month straight.',
    metric: 'Revenue up 400%',
    gradient: 'from-[#EB4D87] to-[#FF4FD1]'
  },
  {
    id: '4',
    name: 'Baju Raya Ayu',
    business: 'Boutique in Ipoh',
    image: '👗',
    beforeViews: '1.8K',
    afterViews: '8.7K',
    increase: '380%',
    timeframe: '10 days',
    testimonial: 'AI hook suggestions memang power. Posting time pun dia suggest. Now I get DMs everyday asking for stock.',
    metric: 'Orders up 180%',
    gradient: 'from-[#9B51E0] to-[#BB78F0]'
  },
];

const stats = [
  { icon: Users, label: 'SMEs Helped', value: '2,847', color: 'text-[#A55BFF]' },
  { icon: TrendingUp, label: 'Avg Engagement Boost', value: '320%', color: 'text-[#2D9CDB]' },
  { icon: DollarSign, label: 'Extra Revenue Generated', value: 'RM1.2M+', color: 'text-[#FF7A00]' },
  { icon: Star, label: 'Success Rate', value: '94%', color: 'text-[#EB4D87]' },
];

export function SuccessStoriesScreen() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [animatedStats, setAnimatedStats] = useState<{ [key: number]: number }>({});

  // Animate overall stats on mount
  useEffect(() => {
    const targets = [
      { index: 0, value: 2847 },
      { index: 1, value: 320 },
      { index: 2, value: 1.2 },
      { index: 3, value: 94 }
    ];

    targets.forEach(({ index, value }) => {
      const steps = 50;
      const increment = value / steps;
      const stepDuration = 1500 / steps;
      
      let currentValue = 0;
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= value) {
          currentValue = value;
          clearInterval(interval);
        }
        setAnimatedStats(prev => ({ ...prev, [index]: currentValue }));
      }, stepDuration);
    });
  }, []);

  const formatStatValue = (index: number) => {
    const value = animatedStats[index] || 0;
    if (index === 0) return Math.round(value).toLocaleString();
    if (index === 1) return `${Math.round(value)}%`;
    if (index === 2) return `RM${value.toFixed(1)}M+`;
    if (index === 3) return `${Math.round(value)}%`;
    return value.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4FF] via-[#FFEFE5] to-[#FFF6F0]">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-7 h-7 text-[#A55BFF]" strokeWidth={2} />
            <h1 className="text-[#3A3A3A]">Success Stories</h1>
          </div>
          <p className="text-[#7D7D7D]">
            Real results from Malaysian SMEs like you
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 ${stat.color}`} strokeWidth={2} />
                  <p className="text-xs text-[#7D7D7D]">{stat.label}</p>
                </div>
                <p className={`text-2xl ${stat.color} mb-1 font-medium`}>{formatStatValue(index)}</p>
              </div>
            );
          })}
        </div>

        {/* Success Stories */}
        <div className="space-y-6 mb-8">
          {successStories.map((story) => (
            <div 
              key={story.id} 
              onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer ${
                selectedStory === story.id ? 'ring-2 ring-[#A55BFF] scale-[1.02]' : ''
              }`}
            >
              {/* Header with Gradient */}
              <div className={`bg-gradient-to-r ${story.gradient} text-white p-5`}>
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{story.image}</div>
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{story.name}</h3>
                    <p className="text-sm text-white text-opacity-90">{story.business}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-white mb-1">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                      <p className="text-xl font-medium">{story.increase}</p>
                    </div>
                    <p className="text-xs text-white text-opacity-80">in {story.timeframe}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Before/After Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-4 bg-[#EB4D87] rounded-xl shadow-sm">
                    <p className="text-xs text-white text-opacity-90 mb-1">Before</p>
                    <p className="text-2xl text-white mb-1 font-bold">{story.beforeViews}</p>
                    <p className="text-xs text-white text-opacity-90">avg views</p>
                  </div>
                  <div className="text-center p-4 bg-[#2D9CDB] rounded-xl shadow-sm">
                    <p className="text-xs text-white text-opacity-90 mb-1">After</p>
                    <p className="text-2xl text-white mb-1 font-bold">{story.afterViews}</p>
                    <p className="text-xs text-white text-opacity-90">avg views</p>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-[#FFF7FB] rounded-xl p-4 mb-4 relative hover:bg-[#FFE5F8] transition-colors">
                  <Quote className="w-6 h-6 text-[#A55BFF] opacity-20 absolute top-3 left-3" strokeWidth={2} />
                  <p className="text-sm text-[#3A3A3A] italic pl-6">
                    &quot;{story.testimonial}&quot;
                  </p>
                </div>

                {/* Business Metric */}
                <div className={`bg-gradient-to-r ${story.gradient} bg-opacity-10 border-2 border-opacity-30 rounded-xl p-3 text-center hover:bg-opacity-20 transition-colors`}
                     style={{ borderColor: 'currentColor' }}>
                  <p className="text-[#3A3A3A] text-sm">
                    🎯 <strong>{story.metric}</strong>
                  </p>
                </div>

                {selectedStory === story.id && (
                  <div className="mt-4 pt-4 border-t border-[#E8E8E8]">
                    <button className="w-full bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white py-2 rounded-xl text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium">
                      <Trophy className="w-4 h-4" strokeWidth={2} />
                      Use Their Template
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white rounded-2xl p-6 text-center shadow-xl mb-6">
          <h3 className="text-white mb-3">Your Turn to Succeed</h3>
          <p className="text-sm text-white text-opacity-90 mb-4">
            These are real SMEs who started with zero video marketing experience. 
            If they can do it, so can you.
          </p>
          <button className="bg-white text-[#A55BFF] px-6 py-3 rounded-xl hover:bg-opacity-90 hover:shadow-lg transition-all font-medium">
            Start Creating Videos
          </button>
        </div>

        {/* Tips from Success Stories */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-[#3A3A3A] mb-4">What They All Did:</h3>
          <ul className="space-y-3 text-sm text-[#7D7D7D]">
            <li className="flex items-start gap-3 hover:bg-[#FFF7FB] -mx-3 px-3 py-2 rounded-xl transition-colors cursor-pointer">
              <span className="text-[#2D9CDB] text-lg flex-shrink-0">✓</span>
              <span>Posted consistently (3-5 videos per week)</span>
            </li>
            <li className="flex items-start gap-3 hover:bg-[#FFF7FB] -mx-3 px-3 py-2 rounded-xl transition-colors cursor-pointer">
              <span className="text-[#2D9CDB] text-lg flex-shrink-0">✓</span>
              <span>Used AI-suggested hooks and captions</span>
            </li>
            <li className="flex items-start gap-3 hover:bg-[#FFF7FB] -mx-3 px-3 py-2 rounded-xl transition-colors cursor-pointer">
              <span className="text-[#2D9CDB] text-lg flex-shrink-0">✓</span>
              <span>Followed the guided shot system exactly</span>
            </li>
            <li className="flex items-start gap-3 hover:bg-[#FFF7FB] -mx-3 px-3 py-2 rounded-xl transition-colors cursor-pointer">
              <span className="text-[#2D9CDB] text-lg flex-shrink-0">✓</span>
              <span>Posted at recommended times (7-9 PM)</span>
            </li>
            <li className="flex items-start gap-3 hover:bg-[#FFF7FB] -mx-3 px-3 py-2 rounded-xl transition-colors cursor-pointer">
              <span className="text-[#2D9CDB] text-lg flex-shrink-0">✓</span>
              <span>Showed real people (not just products)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}