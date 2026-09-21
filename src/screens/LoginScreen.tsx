import React, { useState } from 'react';
import { ShoppingBag, Mail, Lock, Eye, EyeOff, Smartphone, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LoginScreenProps {
  onSwitchToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSwitchToRegister }) => {
  const { login, switchRole } = useApp();
  const [email, setEmail] = useState('john@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'artisan'>('buyer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'john@gmail.com', 'John Doe');
    switchRole(selectedRole);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-12 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[#E9F7F0] mx-auto flex items-center justify-center mb-4">
          <ShoppingBag className="w-9 h-9 text-[#0B8F56]" />
        </div>
        <h2 className="text-2xl font-black text-[#1E2723]">Welcome Back</h2>
        <p className="text-xs text-[#66736D] mt-1">Login to continue to Artisan Connect</p>
      </div>

      {/* Role Toggle Selector */}
      <div className="mb-6 p-1 bg-[#F7F9F8] rounded-xl border border-[#E4E8E6] flex">
        <button
          type="button"
          onClick={() => setSelectedRole('buyer')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            selectedRole === 'buyer'
              ? 'bg-[#0B8F56] text-white shadow-xs'
              : 'text-[#66736D] hover:text-[#1E2723]'
          }`}
        >
          🛍️ Buyer Login
        </button>
        <button
          type="button"
          onClick={() => setSelectedRole('artisan')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            selectedRole === 'artisan'
              ? 'bg-[#0B8F56] text-white shadow-xs'
              : 'text-[#66736D] hover:text-[#1E2723]'
          }`}
        >
          👨‍🎨 Artisan Login
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-[#1E2723] mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#66736D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-sm focus:outline-hidden focus:border-[#0B8F56] transition-colors"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-[#1E2723] mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#66736D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-sm focus:outline-hidden focus:border-[#0B8F56] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#66736D] hover:text-[#1E2723]"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => alert('Password reset instructions will be sent to your email.')}
            className="text-xs font-semibold text-[#0B8F56] hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0B8F56] hover:bg-[#006B43] text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
        >
          Login
        </button>
      </form>

      {/* Social / Phone options */}
      <div className="mt-6">
        <div className="relative flex items-center justify-center mb-4">
          <div className="border-t border-[#E4E8E6] w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-[#66736D] uppercase">OR</span>
          <div className="border-t border-[#E4E8E6] w-full" />
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              login('google.user@gmail.com', 'Google User');
              switchRole(selectedRole);
            }}
            className="w-full py-2.5 border border-[#E4E8E6] hover:bg-gray-50 rounded-xl text-xs font-bold text-[#1E2723] flex items-center justify-center gap-2 transition-colors"
          >
            <Globe className="w-4 h-4 text-red-500" />
            <span>Continue with Google</span>
          </button>
          <button
            type="button"
            onClick={() => {
              login('phone.user@gmail.com', 'Phone User');
              switchRole(selectedRole);
            }}
            className="w-full py-2.5 border border-[#E4E8E6] hover:bg-gray-50 rounded-xl text-xs font-bold text-[#1E2723] flex items-center justify-center gap-2 transition-colors"
          >
            <Smartphone className="w-4 h-4 text-[#0B8F56]" />
            <span>Continue with Phone</span>
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-[#66736D]">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-[#0B8F56] hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};
