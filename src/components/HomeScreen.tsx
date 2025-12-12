import { Video, TrendingUp, Lightbulb } from 'lucide-react';
import { Logo } from './Logo';
import { Utensils, Droplet, Package, Star } from 'lucide-react';

interface HomeScreenProps {
  onCreateVideo: () => void;
  industry?: string;
}

const recommendedTemplates = [
  { id: '1', name: 'Food Pouring Reel', icon: Utensils, category: 'fnb', trending: true },
  { id: '2', name: 'Before-After Cleaning', icon: Droplet, category: 'cleaning', trending: false },
  { id: '3', name: 'Daily Special Showcase', icon: Package, category: 'fnb', trending: true },
  { id: '4', name: 'Product Unboxing', icon: Package, category: 'retail', trending: false },
];

const categories = [
  { id: 'fnb', name: 'F&B', count: 12, gradient: 'from-[#FF7A00] to-[#FF9A3E]' },
  { id: 'cleaning', name: 'Cleaning', count: 8, gradient: 'from-[#2D9CDB] to-[#56CCF2]' },
  { id: 'retail', name: 'Retail', count: 15, gradient: 'from-[#9B51E0] to-[#BB78F0]' },
  { id: 'beauty', name: 'Beauty', count: 10, gradient: 'from-[#FF4FD1] to-[#FF75E3]' },
];

export function HomeScreen({ onCreateVideo, industry }: HomeScreenProps) {
  // Filter templates based on user's industry
  const filteredTemplates = industry 
    ? recommendedTemplates.filter(t => t.category === industry || t.trending)
    : recommendedTemplates;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4FF] via-[#FFEFE5] to-[#FFF6F0]">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <Logo size="small" showText={true} variant="gradient" />
          <p className="text-[#7D7D7D] mt-2">
            Create viral Reels & TikTok videos with AI-guided shots
          </p>
        </div>

        {/* Main CTA */}
        <button
          onClick={onCreateVideo}
          className="w-full bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all mb-8 flex items-center justify-center gap-3"
        >
          <Video className="w-6 h-6" strokeWidth={2} />
          <span className="text-lg font-medium">Create Video</span>
        </button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl hover:scale-[1.05] transition-all cursor-pointer">
            <p className="text-2xl text-[#A55BFF] mb-1 font-medium">2,847</p>
            <p className="text-xs text-[#7D7D7D]">Videos Created</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl hover:scale-[1.05] transition-all cursor-pointer">
            <p className="text-2xl text-[#2D9CDB] mb-1 font-medium">94%</p>
            <p className="text-xs text-[#7D7D7D]">Success Rate</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl hover:scale-[1.05] transition-all cursor-pointer">
            <p className="text-2xl text-[#FF7A00] mb-1 font-medium">3.2x</p>
            <p className="text-xs text-[#7D7D7D]">Avg. Engagement</p>
          </div>
        </div>

        {/* Recommended Templates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#3A3A3A]">Recommended for You</h2>
            <TrendingUp className="w-5 h-5 text-[#A55BFF]" strokeWidth={2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  onClick={onCreateVideo}
                  className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.05] transition-all cursor-pointer relative overflow-hidden group"
                >
                  {template.trending && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF9A3E] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                        <Star className="w-3 h-3 fill-current" strokeWidth={0} />
                        Hot
                      </div>
                    </div>
                  )}
                  <div className="bg-[#A55BFF]/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-[#A55BFF]" strokeWidth={2} />
                  </div>
                  <p className="text-[#3A3A3A] text-sm mb-1">{template.name}</p>
                  <p className="text-xs text-[#7D7D7D]">Quick & Easy</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-[#3A3A3A] mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={onCreateVideo}
                className={`bg-gradient-to-r ${category.gradient} text-white rounded-2xl p-5 cursor-pointer hover:shadow-xl hover:scale-[1.05] transition-all shadow-md`}
              >
                <p className="text-lg mb-1 font-medium">{category.name}</p>
                <p className="text-sm opacity-90">{category.count} templates</p>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Tip */}
        <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-[#3A3A3A] mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#FF7A00]" strokeWidth={2} />
            Today&apos;s Tip
          </h3>
          <p className="text-[#7D7D7D] text-sm mb-2">
            Videos with faces in the first 3 seconds get 67% more engagement!
          </p>
          <p className="text-[#A55BFF] text-sm font-medium">
            Try: &quot;Food Pouring Reel&quot; or &quot;Daily Special Showcase&quot;
          </p>
        </div>
      </div>
    </div>
  );
}