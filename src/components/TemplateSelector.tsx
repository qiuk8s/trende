import { useState } from 'react';
import { ArrowLeft, Play, Clock, Star, TrendingUp, Utensils, Droplet, Package, Shirt, Home as HomeIcon, Users } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Medium';
  trending: boolean;
  icon: React.ElementType;
  successRate: number;
  shots: {
    id: number;
    instruction: string;
    duration: number;
    tips: string;
    cameraAngle: string;
  }[];
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Food Pouring Reel',
    category: 'F&B',
    description: 'Perfect for drinks, sauces, or liquid dishes. Highly engaging!',
    duration: '7-15s',
    difficulty: 'Easy',
    trending: true,
    icon: Utensils,
    successRate: 92,
    shots: [
      {
        id: 1,
        instruction: 'Show your logo or store sign',
        duration: 2,
        tips: 'Keep it quick - just a branding moment',
        cameraAngle: 'Front view, stable'
      },
      {
        id: 2,
        instruction: 'Close-up of empty glass/bowl',
        duration: 2,
        tips: 'Get VERY close, fill the frame',
        cameraAngle: 'Top-down or 45° angle'
      },
      {
        id: 3,
        instruction: 'Slow-motion pour',
        duration: 5,
        tips: 'This is the hero shot! Use phone slow-mo',
        cameraAngle: 'Side angle, capture the flow'
      },
      {
        id: 4,
        instruction: 'Final product showcase',
        duration: 3,
        tips: 'Show the finished drink/dish beautifully',
        cameraAngle: 'Slightly overhead'
      }
    ]
  },
  {
    id: '2',
    name: 'Before-After Cleaning',
    category: 'Services',
    description: 'Dramatic transformation that stops the scroll',
    duration: '10-20s',
    difficulty: 'Easy',
    trending: true,
    icon: Droplet,
    successRate: 89,
    shots: [
      {
        id: 1,
        instruction: 'Show the messy "before" state',
        duration: 3,
        tips: 'Make it look really dirty/messy for impact',
        cameraAngle: 'Wide shot showing full area'
      },
      {
        id: 2,
        instruction: 'Quick timelapse of cleaning',
        duration: 5,
        tips: 'Fast cuts of you working (hands in frame)',
        cameraAngle: 'Multiple angles'
      },
      {
        id: 3,
        instruction: 'Reveal the clean result',
        duration: 4,
        tips: 'Same angle as shot 1 for comparison',
        cameraAngle: 'Exact same as first shot'
      },
      {
        id: 4,
        instruction: 'Your face with satisfied look',
        duration: 2,
        tips: 'Human connection builds trust!',
        cameraAngle: 'Selfie-style'
      }
    ]
  },
  {
    id: '3',
    name: 'Daily Special Showcase',
    category: 'F&B',
    description: 'Highlight today\'s menu item with appetite appeal',
    duration: '12-18s',
    difficulty: 'Easy',
    trending: false,
    icon: Package,
    successRate: 85,
    shots: [
      {
        id: 1,
        instruction: 'Text overlay: "Today\'s Special"',
        duration: 2,
        tips: 'Use your hand to point at text',
        cameraAngle: 'Selfie mode with text overlay'
      },
      {
        id: 2,
        instruction: 'Cooking/prep process',
        duration: 5,
        tips: 'Show motion - stirring, chopping, etc.',
        cameraAngle: 'Overhead or side angle'
      },
      {
        id: 3,
        instruction: 'Plating the dish',
        duration: 4,
        tips: 'Make it look appetizing',
        cameraAngle: 'Close-up, good lighting'
      },
      {
        id: 4,
        instruction: 'Price reveal + CTA',
        duration: 3,
        tips: 'Show price on screen, point to caption',
        cameraAngle: 'Front-facing with text'
      }
    ]
  },
  {
    id: '4',
    name: 'Product Unboxing',
    category: 'Retail',
    description: 'Build anticipation with reveal-style content',
    duration: '15-25s',
    difficulty: 'Easy',
    trending: false,
    icon: Package,
    successRate: 81,
    shots: [
      {
        id: 1,
        instruction: 'Show sealed package',
        duration: 2,
        tips: 'Build curiosity - what\'s inside?',
        cameraAngle: 'Overhead, hands in frame'
      },
      {
        id: 2,
        instruction: 'Opening process',
        duration: 5,
        tips: 'Slow and satisfying unwrapping',
        cameraAngle: 'Close-up of hands'
      },
      {
        id: 3,
        instruction: 'Reveal product',
        duration: 4,
        tips: 'Your genuine reaction!',
        cameraAngle: 'Product + your face'
      },
      {
        id: 4,
        instruction: 'Product features tour',
        duration: 6,
        tips: 'Point out key features',
        cameraAngle: 'Multiple angles, close-ups'
      }
    ]
  },
  {
    id: '5',
    name: 'Customer Reaction',
    category: 'All',
    description: 'Social proof that sells - real customer trying your product',
    duration: '10-20s',
    difficulty: 'Medium',
    trending: true,
    icon: Users,
    successRate: 94,
    shots: [
      {
        id: 1,
        instruction: 'Customer receiving order',
        duration: 3,
        tips: 'Capture genuine first impression',
        cameraAngle: 'Front angle, get their face'
      },
      {
        id: 2,
        instruction: 'First bite/try moment',
        duration: 4,
        tips: 'This is the MONEY SHOT - real reactions!',
        cameraAngle: 'Close on their face'
      },
      {
        id: 3,
        instruction: 'Customer quote/testimonial',
        duration: 5,
        tips: 'Let them speak naturally',
        cameraAngle: 'Steady, clear audio'
      }
    ]
  },
  {
    id: '6',
    name: 'Behind-the-Scenes Morning',
    category: 'All',
    description: 'Day-in-life content builds authentic connection',
    duration: '20-30s',
    difficulty: 'Medium',
    trending: false,
    icon: HomeIcon,
    successRate: 78,
    shots: [
      {
        id: 1,
        instruction: 'Early morning arrival (show time)',
        duration: 3,
        tips: 'Text overlay with actual time (e.g., 4:30 AM)',
        cameraAngle: 'Selfie or front door shot'
      },
      {
        id: 2,
        instruction: 'Prep work montage',
        duration: 8,
        tips: 'Fast cuts every 2-3 seconds',
        cameraAngle: 'Various angles of work'
      },
      {
        id: 3,
        instruction: 'First customer arrives',
        duration: 4,
        tips: 'Show the hustle, the energy',
        cameraAngle: 'Wide shot of action'
      },
      {
        id: 4,
        instruction: 'You to camera: why you do it',
        duration: 5,
        tips: 'Be authentic, speak from heart',
        cameraAngle: 'Selfie mode, good lighting'
      }
    ]
  }
];

const categories = ['All', 'F&B', 'Services', 'Retail'];

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  onBack: () => void;
  industry?: string;
}

export function TemplateSelector({ onSelectTemplate, onBack, industry }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState(industry || 'All');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter(
    t => selectedCategory === 'All' || t.category === selectedCategory || t.category === 'All'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-gray-900">Choose Template</h1>
              <p className="text-sm text-gray-600">Pick a proven viral format</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="space-y-4">
          {filteredTemplates.map(template => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                onClick={() => setPreviewTemplate(template)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-br ${
                    template.category === 'F&B' ? 'from-orange-100 to-red-100' :
                    template.category === 'Services' ? 'from-blue-100 to-cyan-100' :
                    'from-purple-100 to-pink-100'
                  } w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      {template.trending && (
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap ml-2">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {template.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {template.successRate}% success
                      </span>
                      <span className="text-green-600">{template.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
          <div 
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-gray-900 mb-1">{previewTemplate.name}</h2>
                  <p className="text-sm text-gray-600">{previewTemplate.shots.length} shots • {previewTemplate.duration}</p>
                </div>
                <button 
                  onClick={() => setPreviewTemplate(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="text-gray-700 mb-6">{previewTemplate.description}</p>

              <h3 className="text-gray-900 mb-3">Shot Breakdown:</h3>
              <div className="space-y-3 mb-6">
                {previewTemplate.shots.map((shot) => (
                  <div key={shot.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        {shot.id}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 mb-1">{shot.instruction}</p>
                        <p className="text-sm text-gray-600 mb-2">💡 {shot.tips}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {shot.duration}s
                          </span>
                          <span>📸 {shot.cameraAngle}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSelectTemplate(previewTemplate)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Guided Shooting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}