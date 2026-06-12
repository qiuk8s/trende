import { BarChart3, TrendingUp, Eye, Heart, MessageCircle, Share2, Target, AlertCircle, Lightbulb, Zap } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface AnalyticsScreenProps {
  goal?: string;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return { text: 'text-[#2D9CDB]', bg: 'bg-[#2D9CDB]/10', gradient: 'from-[#2D9CDB] to-[#56CCF2]' };
  if (score >= 70) return { text: 'text-[#9B51E0]', bg: 'bg-[#9B51E0]/10', gradient: 'from-[#9B51E0] to-[#BB78F0]' };
  if (score >= 60) return { text: 'text-[#FF7A00]', bg: 'bg-[#FF7A00]/10', gradient: 'from-[#FF7A00] to-[#FF9A3E]' };
  return { text: 'text-[#EB4D87]', bg: 'bg-[#EB4D87]/10', gradient: 'from-[#EB4D87] to-[#FF4FD1]' };
};

const weeklyStats = {
  videosPosted: 4,
  totalViews: 12847,
  totalEngagement: 3421,
  avgWatchTime: 78,
  bestPerformer: 'Food Pouring Reel',
};

const videoPerformance = [
  {
    id: '1',
    title: 'Food Pouring Reel',
    template: 'Food Pouring',
    views: 5420,
    likes: 892,
    comments: 47,
    shares: 23,
    score: 94,
    status: 'High Performance'
  },
  {
    id: '2',
    title: 'Daily Special Showcase',
    template: 'Daily Special',
    views: 3210,
    likes: 421,
    comments: 28,
    shares: 12,
    score: 78,
    status: 'Good'
  },
  {
    id: '3',
    title: 'Behind the Scenes',
    template: 'BTS Morning',
    views: 2847,
    likes: 312,
    comments: 19,
    shares: 8,
    score: 71,
    status: 'Average'
  },
  {
    id: '4',
    title: 'Customer Reaction',
    template: 'Customer Reaction',
    views: 1370,
    likes: 145,
    comments: 11,
    shares: 4,
    score: 58,
    status: 'Needs Improvement'
  },
];

const insights = [
  {
    type: 'success',
    icon: TrendingUp,
    message: 'Your "Food Pouring" videos get 3x more engagement',
    action: 'Create more pouring content',
    color: 'from-[#2D9CDB] to-[#56CCF2]'
  },
  {
    type: 'warning',
    icon: AlertCircle,
    message: 'Videos under 15s perform 45% better for your audience',
    action: 'Keep future videos shorter',
    color: 'from-[#FF7A00] to-[#FF9A3E]'
  },
  {
    type: 'info',
    icon: Lightbulb,
    message: 'Posting at 7-8 PM gets you 2x more reach',
    action: 'Schedule next video for tonight',
    color: 'from-[#9B51E0] to-[#BB78F0]'
  },
];

export function AnalyticsScreen({ goal }: AnalyticsScreenProps) {
  const [hasVideos] = useState(true); // Change to false to show empty state
  const [timeRange, setTimeRange] = useState('week');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [animatedStats, setAnimatedStats] = useState({
    videosPosted: 0,
    totalViews: 0,
    totalEngagement: 0,
    avgWatchTime: 0,
  });
  const [animatedPrediction, setAnimatedPrediction] = useState({
    views: 0,
    likes: 0,
    successRate: 0,
  });

  // Animate weekly stats on mount
  useEffect(() => {
    const animateValue = (key: keyof typeof weeklyStats, target: number, duration: number) => {
      const steps = 50;
      const increment = target / steps;
      const stepDuration = duration / steps;
      
      let currentValue = 0;
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= target) {
          currentValue = target;
          clearInterval(interval);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.round(currentValue) }));
      }, stepDuration);
    };

    animateValue('videosPosted', weeklyStats.videosPosted, 1000);
    animateValue('totalViews', weeklyStats.totalViews, 1500);
    animateValue('totalEngagement', weeklyStats.totalEngagement, 1500);
    animateValue('avgWatchTime', weeklyStats.avgWatchTime, 1200);
  }, []);

  // Animate prediction values
  useEffect(() => {
    const targets = { views: 4.2, likes: 850, successRate: 85 };
    
    const animateValue = (key: keyof typeof targets, target: number, duration: number) => {
      const steps = 50;
      const increment = target / steps;
      const stepDuration = duration / steps;
      
      let currentValue = 0;
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= target) {
          currentValue = target;
          clearInterval(interval);
        }
        setAnimatedPrediction(prev => ({ ...prev, [key]: currentValue }));
      }, stepDuration);
    };

    animateValue('views', targets.views, 1500);
    animateValue('likes', targets.likes, 1500);
    animateValue('successRate', targets.successRate, 1200);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4FF] via-[#FFEFE5] to-[#FFF6F0]">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-7 h-7 text-[#A55BFF]" strokeWidth={2} />
              <h1 className="text-[#3A3A3A]">Analytics</h1>
            </div>
            <p className="text-[#7D7D7D]">
              Your performance this {timeRange === 'week' ? 'week' : 'month'}
            </p>
          </div>
          <Tabs defaultValue="week" onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {!hasVideos ? (
          <EmptyState
            icon="analytics"
            title="No Analytics Yet"
            description="Your analytics will appear after you post videos. Create your first video to start tracking performance!"
            actionLabel="Create First Video"
            onAction={() => {/* navigate to create */}}
          />
        ) : (
          <>
            {/* Weekly Summary Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer">
                <p className="text-sm text-[#7D7D7D] mb-2">Videos Posted</p>
                <p className="text-3xl text-[#A55BFF] mb-2 font-medium">{animatedStats.videosPosted}</p>
                <p className="text-xs text-[#2D9CDB] font-medium">+2 from last week</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer">
                <p className="text-sm text-[#7D7D7D] mb-2">Total Views</p>
                <p className="text-3xl text-[#A55BFF] mb-2 font-medium">{animatedStats.totalViews.toLocaleString()}</p>
                <p className="text-xs text-[#2D9CDB] font-medium">+127% from last week</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer">
                <p className="text-sm text-[#7D7D7D] mb-2">Total Engagement</p>
                <p className="text-3xl text-[#A55BFF] mb-2 font-medium">{animatedStats.totalEngagement.toLocaleString()}</p>
                <p className="text-xs text-[#2D9CDB] font-medium">+89% from last week</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer">
                <p className="text-sm text-[#7D7D7D] mb-2">Avg Watch Time</p>
                <p className="text-3xl text-[#A55BFF] mb-2 font-medium">{animatedStats.avgWatchTime}%</p>
                <p className="text-xs text-[#2D9CDB] font-medium">+12% from last week</p>
              </div>
            </div>

            {/* AI Insights */}
            <div className="mb-8">
              <h2 className="text-[#3A3A3A] mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#A55BFF]" strokeWidth={2} />
                AI Insights
              </h2>
              <div className="space-y-3">
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <div 
                      key={index}
                      className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-r ${insight.color}`}>
                          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#3A3A3A] text-sm mb-2">{insight.message}</p>
                          <p className="text-xs text-[#7D7D7D]">
                            Tip: {insight.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Video Performance */}
            <div className="mb-8">
              <h2 className="text-[#3A3A3A] mb-4">Video Performance</h2>
              <div className="space-y-3">
                {videoPerformance.map((video) => {
                  const colors = getScoreColor(video.score);
                  return (
                    <div 
                      key={video.id} 
                      onClick={() => setSelectedVideo(selectedVideo === video.id ? null : video.id)}
                      className={`bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer ${
                        selectedVideo === video.id ? 'ring-2 ring-[#A55BFF] scale-[1.02]' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-[#3A3A3A] text-sm mb-1">{video.title}</h3>
                          <p className="text-xs text-[#7D7D7D]">{video.template} template</p>
                        </div>
                        <div className={`text-xs px-3 py-1 rounded-full flex-shrink-0 ml-3 font-medium bg-opacity-10 ${colors.bg} ${colors.text}`}>
                          Score: {video.score}
                        </div>
                      </div>

                      {/* Score Bar */}
                      <div className="bg-[#E8E8E8] rounded-full h-2 mb-4 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out bg-gradient-to-r ${colors.gradient}`}
                          style={{ width: `${video.score}%` }}
                        />
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="hover:bg-[#FFF7FB] p-2 rounded-lg transition-colors">
                          <div className="flex items-center justify-center gap-1 text-[#A55BFF] mb-1">
                            <Eye className="w-4 h-4" strokeWidth={2} />
                          </div>
                          <p className="text-xs text-[#3A3A3A] font-medium">{video.views.toLocaleString()}</p>
                        </div>
                        <div className="hover:bg-[#FFF7FB] p-2 rounded-lg transition-colors">
                          <div className="flex items-center justify-center gap-1 text-[#A55BFF] mb-1">
                            <Heart className="w-4 h-4" strokeWidth={2} />
                          </div>
                          <p className="text-xs text-[#3A3A3A] font-medium">{video.likes}</p>
                        </div>
                        <div className="hover:bg-[#FFF7FB] p-2 rounded-lg transition-colors">
                          <div className="flex items-center justify-center gap-1 text-[#A55BFF] mb-1">
                            <MessageCircle className="w-4 h-4" strokeWidth={2} />
                          </div>
                          <p className="text-xs text-[#3A3A3A] font-medium">{video.comments}</p>
                        </div>
                        <div className="hover:bg-[#FFF7FB] p-2 rounded-lg transition-colors">
                          <div className="flex items-center justify-center gap-1 text-[#A55BFF] mb-1">
                            <Share2 className="w-4 h-4" strokeWidth={2} />
                          </div>
                          <p className="text-xs text-[#3A3A3A] font-medium">{video.shares}</p>
                        </div>
                      </div>

                      {selectedVideo === video.id && (
                        <div className="mt-4 pt-4 border-t border-[#E8E8E8] grid grid-cols-2 gap-2">
                          <button className="bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white py-2 rounded-xl text-xs hover:shadow-lg transition-all">
                            View Details
                          </button>
                          <button className="bg-[#FFF7FB] text-[#A55BFF] py-2 rounded-xl text-xs hover:bg-[#FFE5F8] transition-all font-medium">
                            Recreate This
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Video Prediction */}
            <div className="bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white rounded-2xl p-5 shadow-xl">
              <h3 className="text-white mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" strokeWidth={2} />
                Next Video Prediction
              </h3>
              <p className="text-sm text-white text-opacity-90 mb-4">
                Based on your performance, if you post a &quot;Food Pouring Reel&quot; tonight at 7 PM:
              </p>
              <div className="bg-white/20 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-2xl text-white mb-1 font-medium">{animatedPrediction.views.toFixed(1)}K</p>
                    <p className="text-xs text-white text-opacity-80">Est. Views</p>
                  </div>
                  <div>
                    <p className="text-2xl text-white mb-1 font-medium">{Math.round(animatedPrediction.likes)}+</p>
                    <p className="text-xs text-white text-opacity-80">Est. Likes</p>
                  </div>
                  <div>
                    <p className="text-2xl text-white mb-1 font-medium">{Math.round(animatedPrediction.successRate)}%</p>
                    <p className="text-xs text-white text-opacity-80">Success Rate</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-white text-[#A55BFF] py-3 rounded-xl hover:bg-opacity-90 hover:shadow-lg transition-all font-medium">
                Create This Video Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}