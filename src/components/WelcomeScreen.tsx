import { Mail, Chrome } from 'lucide-react';
import { Logo } from './Logo';

interface WelcomeScreenProps {
  onLogin: () => void;
  onContinueWithoutLogin: () => void;
}

export function WelcomeScreen({ onLogin, onContinueWithoutLogin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4FF] via-[#FFEFE5] to-[#FFF6F0] flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <Logo size="large" showText={false} />
          <div className="mt-6 text-center">
            <h1 className="text-[#3A3A3A] mb-2" style={{ fontWeight: 800, fontSize: '2.5rem' }}>
              TRENDE
            </h1>
            <p className="text-[#7D7D7D] text-lg">
              Create Viral Videos Easily
            </p>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4 mb-6">
          <button
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-[#A55BFF] to-[#FF4FD1] text-white py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            <Mail className="w-5 h-5" />
            <span>Login with Email</span>
          </button>

          <button
            onClick={onLogin}
            className="w-full bg-white text-[#3A3A3A] py-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 border-2 border-[#E8E8E8]"
          >
            <Chrome className="w-5 h-5" />
            <span>Login with Google</span>
          </button>
        </div>

        {/* Continue Without Login */}
        <button
          onClick={onContinueWithoutLogin}
          className="w-full text-[#7D7D7D] py-3 rounded-2xl hover:bg-white hover:bg-opacity-50 transition-all"
        >
          Continue without Login
        </button>

        {/* Terms */}
        <p className="text-center text-xs text-[#7D7D7D] mt-8 px-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}