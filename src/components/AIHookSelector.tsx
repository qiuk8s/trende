import { useState } from 'react';
import { Sparkles, Copy, Check, TrendingUp, Hash, Target, ArrowRight } from 'lucide-react';

interface Template {
  id: string;
  name: string;
}

interface AIHookSelectorProps {
  template: Template;
  onBack: () => void;
  onComplete: () => void;
}

interface Hook {
  text: string;
  type: 'curiosity' | 'question' | 'bold' | 'value';
  engagement: number;
}

const hooks: Hook[] = [
  { text: 'Wait for it... 😳', type: 'curiosity', engagement: 92 },
  { text: 'POV: You just discovered...', type: 'curiosity', engagement: 88 },
  { text: 'How is this even possible? 🤯', type: 'question', engagement: 85 },
  { text: 'Most people don\'t know this...', type: 'value', engagement: 90 },
  { text: 'This is why we wake up at 4AM', type: 'bold', engagement: 87 },
];

const captions = [
  'Made fresh every morning at our store in Shah Alam 🌅 DM to order!',
  'Behind the scenes of our daily prep ✨ Tag someone who needs to try this!',
  'This is what dedication looks like 💪 Visit us today!',
];

const hashtags = [
  '#malaysiafood #shahalam #foodiemalaysia #supportlocal #smemalaysia',
  '#viralmalaysia #makananviral #jommakanmalaysia #klangvalleyfood',
  '#smallbusinessmalaysia #usahawanmalaysia #freshfood #homemade',
];

export function AIHookSelector({ template, onBack, onComplete }: AIHookSelectorProps) {
  const [selectedHook, setSelectedHook] = useState(0);
  const [selectedCaption, setSelectedCaption] = useState(0);
  const [selectedHashtags, setSelectedHashtags] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    // Fallback clipboard method that works without permissions
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const copyAll = () => {
    const fullText = `${hooks[selectedHook].text}\n\n${captions[selectedCaption]}\n\n${hashtags[selectedHashtags]}`;
    
    // Fallback clipboard method that works without permissions
    const textarea = document.createElement('textarea');
    textarea.value = fullText;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopied('all');
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h1 className="text-gray-900">AI Hook & Caption Generator</h1>
          </div>
          <p className="text-gray-600">
            AI-generated hooks based on trending Malaysian content
          </p>
        </div>

        {/* Engagement Predictor */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white">Predicted Performance</h3>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex items-end gap-4">
            <div className="text-4xl">{hooks[selectedHook].engagement}</div>
            <div className="text-lg opacity-90 mb-1">/ 100</div>
          </div>
          <p className="text-sm text-green-100 mt-2">
            High engagement potential! ✨ Strong hook + clear CTA
          </p>
        </div>

        {/* Viral Hooks Section */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Opening Hook
            </h3>
            <button
              onClick={() => handleCopy(hooks[selectedHook].text, 'hook')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {copied === 'hook' ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          <div className="space-y-2">
            {hooks.map((hook, index) => (
              <div
                key={index}
                onClick={() => setSelectedHook(index)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedHook === index
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-gray-900">{hook.text}</p>
                  <div className="flex items-center gap-1 text-xs text-purple-600 ml-2 flex-shrink-0">
                    <Target className="w-3 h-3" />
                    {hook.engagement}%
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 capitalize">{hook.type} hook</p>
              </div>
            ))}
          </div>
        </div>

        {/* Caption Section */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Caption</h3>
            <button
              onClick={() => handleCopy(captions[selectedCaption], 'caption')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {copied === 'caption' ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          <div className="space-y-2">
            {captions.map((caption, index) => (
              <div
                key={index}
                onClick={() => setSelectedCaption(index)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedCaption === index
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-400'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <p className="text-gray-700 text-sm">{caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hashtags Section */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 flex items-center gap-2">
              <Hash className="w-5 h-5 text-purple-600" />
              Hashtags
            </h3>
            <button
              onClick={() => handleCopy(hashtags[selectedHashtags], 'hashtags')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {copied === 'hashtags' ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          <div className="space-y-2">
            {hashtags.map((tag, index) => (
              <div
                key={index}
                onClick={() => setSelectedHashtags(index)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedHashtags === index
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-400'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <p className="text-gray-700 text-sm">{tag}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-5 mb-6">
          <h3 className="text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Recommendations
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Strong curiosity hook - will reduce scroll-past rate</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Clear call-to-action in caption</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">⚠</span>
              <span>Best posting time: 7-9 PM for Malaysian audience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">💡</span>
              <span>Add location tag for local discovery</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={copyAll}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {copied === 'all' ? (
              <>
                <Check className="w-5 h-5" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy All & Post
              </>
            )}
          </button>

          <button
            onClick={onComplete}
            className="w-full bg-white border-2 border-purple-300 text-purple-600 py-4 rounded-xl hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
          >
            Done - Back to Home
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}