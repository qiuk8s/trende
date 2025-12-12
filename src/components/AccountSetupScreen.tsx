import { useState } from 'react';
import { ArrowRight, Utensils, Droplet, Package, Sparkles, TrendingUp, Users, Target } from 'lucide-react';

interface AccountSetupScreenProps {
  onComplete: (industry: string, goal: string) => void;
}

const industries = [
  { id: 'fnb', name: 'F&B', icon: Utensils, gradient: 'from-[#FF7A00] to-[#FF9A3E]' },
  { id: 'cleaning', name: 'Cleaning', icon: Droplet, gradient: 'from-[#2D9CDB] to-[#56CCF2]' },
  { id: 'retail', name: 'Retail', icon: Package, gradient: 'from-[#9B51E0] to-[#BB78F0]' },
  { id: 'beauty', name: 'Beauty', icon: Sparkles, gradient: 'from-[#FF4FD1] to-[#FF75E3]' },
];

const goals = [
  { id: 'sales', name: 'Increase Sales', icon: TrendingUp, description: 'Drive more purchases and orders' },
  { id: 'engagement', name: 'Boost Engagement', icon: Users, description: 'Get more likes, comments, shares' },
  { id: 'awareness', name: 'Build Awareness', icon: Target, description: 'Grow your brand recognition' },
];

export function AccountSetupScreen({ onComplete }: AccountSetupScreenProps) {
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');

  const handleContinue = () => {
    if (step === 1 && selectedIndustry) {
      setStep(2);
    } else if (step === 2 && selectedGoal) {
      onComplete(selectedIndustry, selectedGoal);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4FF] via-[#FFEFE5] to-[#FFF6F0] flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white border-b border-[#E8E8E8] px-6 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#7D7D7D]">Step {step} of 2</span>
            <span className="text-sm text-[#A55BFF]">{step === 1 ? '50%' : '100%'}</span>
          </div>
          <div className="bg-[#E8E8E8] rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] h-full transition-all duration-300"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          {step === 1 ? (
            <>
              <h1 className="text-[#3A3A3A] text-center mb-3">What&apos;s your industry?</h1>
              <p className="text-[#7D7D7D] text-center mb-8">
                This helps us recommend the best templates for you
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <button
                      key={industry.id}
                      onClick={() => setSelectedIndustry(industry.id)}
                      className={`p-6 rounded-2xl transition-all ${
                        selectedIndustry === industry.id
                          ? `bg-gradient-to-r ${industry.gradient} shadow-xl scale-105`
                          : 'bg-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                        selectedIndustry === industry.id
                          ? 'bg-white shadow-sm'
                          : `bg-gradient-to-r ${industry.gradient}`
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          selectedIndustry === industry.id 
                            ? industry.id === 'fnb' ? 'text-[#FF7A00]' :
                              industry.id === 'cleaning' ? 'text-[#2D9CDB]' :
                              industry.id === 'retail' ? 'text-[#9B51E0]' :
                              'text-[#FF4FD1]'
                            : 'text-white'
                        }`} />
                      </div>
                      <p className={`text-center ${
                        selectedIndustry === industry.id ? 'text-white' : 'text-[#3A3A3A]'
                      }`}>
                        {industry.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-[#3A3A3A] text-center mb-3">What&apos;s your main goal?</h1>
              <p className="text-[#7D7D7D] text-center mb-8">
                We&apos;ll personalize your analytics and AI suggestions
              </p>

              <div className="space-y-4 mb-8">
                {goals.map((goal) => {
                  const Icon = goal.icon;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`w-full p-5 rounded-2xl transition-all flex items-center gap-4 ${
                        selectedGoal === goal.id
                          ? 'bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] shadow-xl scale-105'
                          : 'bg-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        selectedGoal === goal.id
                          ? 'bg-white shadow-sm'
                          : 'bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1]'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          selectedGoal === goal.id ? 'text-[#A55BFF]' : 'text-white'
                        }`} />
                      </div>
                      <div className="text-left flex-1">
                        <p className={`mb-1 ${
                          selectedGoal === goal.id ? 'text-white' : 'text-[#3A3A3A]'
                        }`}>
                          {goal.name}
                        </p>
                        <p className={`text-sm ${
                          selectedGoal === goal.id ? 'text-white text-opacity-90' : 'text-[#7D7D7D]'
                        }`}>
                          {goal.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <button
            onClick={handleContinue}
            disabled={(step === 1 && !selectedIndustry) || (step === 2 && !selectedGoal)}
            className={`w-full py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${
              (step === 1 && selectedIndustry) || (step === 2 && selectedGoal)
                ? 'bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white shadow-xl hover:shadow-2xl'
                : 'bg-[#E8E8E8] text-[#7D7D7D] cursor-not-allowed'
            }`}
          >
            <span>{step === 2 ? 'Get Started' : 'Continue'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
