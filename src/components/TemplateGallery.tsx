import { useState } from 'react';
import { Play, Clock, TrendingUp, Users, DollarSign, Package, Utensils, Shirt, Home } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  industry: string;
  duration: string;
  icon: React.ElementType;
  structure: string[];
  example: string;
}

const templates: Template[] = [
  {
    id: '1',
    title: 'Problem → Solution Reveal',
    description: 'Show a common pain point, then reveal your product as the solution',
    industry: 'All',
    duration: '15-30s',
    icon: TrendingUp,
    structure: [
      'Hook: "Still struggling with..."',
      'Show the problem (3-5s)',
      'Introduce solution: "Until I found..."',
      'Show product in action (5-7s)',
      'Result/benefit (3s)',
      'CTA: "Try it today!"'
    ],
    example: 'Kedai roti: "Roti always lembik by afternoon? Our new packaging keeps it fresh till 8pm!"'
  },
  {
    id: '2',
    title: 'Before & After Transformation',
    description: 'Dramatic visual transformation that grabs attention',
    industry: 'Beauty, Renovation, Cleaning',
    duration: '7-15s',
    icon: Sparkles,
    structure: [
      'Hook: "Wait for it..."',
      'Show BEFORE state (2-3s)',
      'Quick transition',
      'Show AFTER result (3-5s)',
      'Caption reveals product/service',
      'CTA in comments'
    ],
    example: 'Laundry service: "This batik kena terkena kopi... tengok!" [shows stained → pristine]'
  },
  {
    id: '3',
    title: 'Behind-the-Scenes Process',
    description: 'Take viewers inside your process - builds trust and curiosity',
    industry: 'F&B, Manufacturing, Crafts',
    duration: '20-45s',
    icon: Users,
    structure: [
      'Hook: "How we make..."',
      'Step 1 (fast cut, 3s)',
      'Step 2 (fast cut, 3s)',
      'Step 3 (fast cut, 3s)',
      'Final product reveal (5s)',
      'CTA: Location/order info'
    ],
    example: 'Kuih maker: "How I make 500 kuih raya every day at 4am" [fast-paced morning routine]'
  },
  {
    id: '4',
    title: 'Trending Sound Hijack',
    description: 'Use trending audio and adapt it to your business',
    industry: 'All',
    duration: '7-20s',
    icon: Music,
    structure: [
      'Pick trending sound',
      'Adapt trend to your niche',
      'Add text overlay explaining context',
      'Show product/service naturally',
      'Let trend do the work'
    ],
    example: 'Hardware store: Use "little miss" trend → "Little miss always has the exact screw you need"'
  },
  {
    id: '5',
    title: 'Customer Reaction/Testimonial',
    description: 'Real reactions build massive trust and social proof',
    industry: 'All',
    duration: '15-30s',
    icon: Users,
    structure: [
      'Hook: Customer question/doubt',
      'Show customer trying product',
      'Capture genuine reaction (key moment!)',
      'Customer quote/testimonial',
      'Product info overlay',
      'CTA to order'
    ],
    example: 'Sambal business: "Customer kata not spicy enough... tengok muka dia lepas suap 😅"'
  },
  {
    id: '6',
    title: 'Myth-Busting / Did You Know',
    description: 'Educational content that positions you as an expert',
    industry: 'All',
    duration: '20-40s',
    icon: Lightbulb,
    structure: [
      'Hook: "Did you know..."',
      'State common myth (3s)',
      'Reveal truth (5s)',
      'Demonstrate with product (7s)',
      'Expert tip',
      'CTA to learn more'
    ],
    example: 'Tailor: "Most people get their size WRONG. Here\'s how to measure baju melayu correctly"'
  },
  {
    id: '7',
    title: 'Day in the Life',
    description: 'Personal connection through daily routine',
    industry: 'All',
    duration: '30-60s',
    icon: Clock,
    structure: [
      'Hook: "5am: Day starts..."',
      'Morning routine (fast cuts)',
      'Key business moments',
      'Customer interactions',
      'Behind scenes clips',
      'End: "This is why I love what I do"'
    ],
    example: 'Warung owner: "4:30am - masak nasi lemak for 200 people" [authentic daily grind]'
  },
  {
    id: '8',
    title: 'Price Reveal / Value Stack',
    description: 'Build anticipation then reveal amazing value',
    industry: 'Retail, Services',
    duration: '15-25s',
    icon: DollarSign,
    structure: [
      'Hook: "Guess the price?"',
      'Show item 1 (3s)',
      'Show item 2 (3s)',
      'Show item 3 (3s)',
      'Build suspense: "Total?"',
      'Reveal shocking price',
      'CTA: "Limited time!"'
    ],
    example: 'Tudung seller: "1 shawl RM15 ❌ Get 3 for RM35! Saving RM10!"'
  }
];

const industries = ['All', 'F&B', 'Retail', 'Beauty', 'Services', 'Manufacturing'];

function Music({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  );
}

function Lightbulb({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

export function TemplateGallery() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter(
    t => selectedIndustry === 'All' || t.industry === selectedIndustry || t.industry === 'All'
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Video Templates</h2>
        <p className="text-gray-600 mb-4">
          Proven viral video structures. Pick one and follow the steps.
        </p>

        {/* Industry Filter */}
        <div className="flex flex-wrap gap-2">
          {industries.map(industry => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedIndustry === industry
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {filteredTemplates.map(template => {
          const Icon = template.icon;
          return (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{template.title}</h3>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {template.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {template.industry}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedTemplate(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                {selectedTemplate.icon && <selectedTemplate.icon className="w-6 h-6 text-purple-600" />}
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 mb-1">{selectedTemplate.title}</h2>
                <p className="text-gray-600">{selectedTemplate.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">Shot Structure:</h3>
              <div className="space-y-2">
                {selectedTemplate.structure.map((step, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-4">
              <h3 className="text-gray-900 mb-2">Malaysian Example:</h3>
              <p className="text-gray-700">{selectedTemplate.example}</p>
            </div>

            <button
              onClick={() => setSelectedTemplate(null)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition-shadow"
            >
              Use This Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
