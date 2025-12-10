import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AccountSetupScreen } from './components/AccountSetupScreen';
import { HomeScreen } from './components/HomeScreen';
import { TemplateSelector } from './components/TemplateSelector';
import { GuidedShootFlow } from './components/GuidedShootFlow';
import { TrendsScreen } from './components/TrendsScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { SuccessStoriesScreen } from './components/SuccessStoriesScreen';
import { Home, TrendingUp, BarChart3, Trophy } from 'lucide-react';

type Screen = 'welcome' | 'setup' | 'home' | 'trends' | 'analytics' | 'success';
type Template = {
  id: string;
  name: string;
  category: string;
  shots: {
    id: number;
    instruction: string;
    duration: number;
    tips: string;
    cameraAngle: string;
  }[];
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userIndustry, setUserIndustry] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleLogin = () => {
    setCurrentScreen('setup');
  };

  const handleContinueWithoutLogin = () => {
    setCurrentScreen('setup');
  };

  const handleSetupComplete = (industry: string, goal: string) => {
    setUserIndustry(industry);
    setUserGoal(goal);
    setCurrentScreen('home');
  };

  const handleCreateVideo = () => {
    setIsCreating(true);
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
  };

  const handleBackToHome = () => {
    setIsCreating(false);
    setSelectedTemplate(null);
    setCurrentScreen('home');
  };

  // Navigation tabs
  const tabs = [
    { id: 'home' as Screen, label: 'Home', icon: Home },
    { id: 'trends' as Screen, label: 'Trends', icon: TrendingUp },
    { id: 'analytics' as Screen, label: 'Analytics', icon: BarChart3 },
    { id: 'success' as Screen, label: 'Success', icon: Trophy },
  ];

  // Show welcome or setup screens
  if (currentScreen === 'welcome') {
    return <WelcomeScreen onLogin={handleLogin} onContinueWithoutLogin={handleContinueWithoutLogin} />;
  }

  if (currentScreen === 'setup') {
    return <AccountSetupScreen onComplete={handleSetupComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF7FB] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {!isCreating && currentScreen === 'home' && (
          <HomeScreen onCreateVideo={handleCreateVideo} industry={userIndustry} />
        )}
        {!isCreating && currentScreen === 'trends' && <TrendsScreen />}
        {!isCreating && currentScreen === 'analytics' && <AnalyticsScreen goal={userGoal} />}
        {!isCreating && currentScreen === 'success' && <SuccessStoriesScreen />}
        
        {isCreating && !selectedTemplate && (
          <TemplateSelector 
            onSelectTemplate={handleTemplateSelect}
            onBack={handleBackToHome}
            industry={userIndustry}
          />
        )}
        
        {isCreating && selectedTemplate && (
          <GuidedShootFlow 
            template={selectedTemplate}
            onBack={handleBackToTemplates}
            onComplete={handleBackToHome}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      {!isCreating && currentScreen !== 'welcome' && currentScreen !== 'setup' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E8E8] shadow-lg">
          <div className="max-w-lg mx-auto flex items-center justify-around px-6 py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentScreen === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentScreen(tab.id)}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    isActive ? 'text-[#A55BFF]' : 'text-[#7D7D7D]'
                  }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-xs">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
