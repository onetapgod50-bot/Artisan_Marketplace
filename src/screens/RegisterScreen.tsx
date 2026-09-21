import React, { useState } from 'react';
import { User, Mail, Lock, Globe, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface RegisterScreenProps {
  onSwitchToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onSwitchToLogin }) => {
  const { login } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'artisan'>('buyer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    login(email || 'newuser@gmail.com', name || 'New Artisan');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-10 max-w-md mx-auto">
      <div className="mb-6">
        <button
          onClick={onSwitchToLogin}
          type="button"
          className="flex items-center gap-1 text-xs font-bold text-[#66736D] hover:text-[#1E2723] mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </button>
        <h2 className="text-2xl font-black text-[#1E2723]">Create Account</h2>
        <p className="text-xs text-[#66736D] mt-1">Join our community of artisans and craft lovers</p>
      </div>

      {/* Role Selection */}
      <div className="mb-5 p-1 bg-[#F7F9F8] rounded-xl border border-[#E4E8E6] flex">
        <button
          type="button"
          onClick={() => setRole('buyer')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            role === 'buyer'
              ? 'bg-[#0B8F56] text-white shadow-xs'
              : 'text-[#66736D] hover:text-[#1E2723]'
          }`}
        >
          🛍️ Buyer Account
        </button>
        <button
          type="button"
          onClick={() => setRole('artisan')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            role === 'artisan'
              ? 'bg-[#0B8F56] text-white shadow-xs'
              : 'text-[#66736D] hover:text-[#1E2723]'
          }`}
        >
          👨‍🎨 Artisan Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-[#1E2723] mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-[#66736D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full pl-10 pr-4 py-2 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-sm focus:outline-hidden focus:border-[#0B8F56]"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-[#1E2723] mb-1">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#66736D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. ramesh@gmail.com"
              className="w-full pl-10 pr-4 py-2 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-sm focus:outline-hidden focus:border-[#0B8F56]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-[#1E2723] mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#66736D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full pl-10 pr-4 py-2 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-sm focus:outline-hidden focus:border-[#0B8F56]"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-bold text-[#1E2723] mb-1">Confirm Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#66736D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full pl-10 pr-4 py-2 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-sm focus:outline-hidden focus:border-[#0B8F56]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3 bg-[#0B8F56] hover:bg-[#006B43] text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
        >
          Register
        </button>
      </form>

      <div className="mt-5">
        <div className="relative flex items-center justify-center mb-4">
          <div className="border-t border-[#E4E8E6] w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-[#66736D] uppercase">OR</span>
          <div className="border-t border-[#E4E8E6] w-full" />
        </div>

        <button
          type="button"
          onClick={() => login('google.user@gmail.com', 'Google User')}
          className="w-full py-2.5 border border-[#E4E8E6] hover:bg-gray-50 rounded-xl text-xs font-bold text-[#1E2723] flex items-center justify-center gap-2 transition-colors"
        >
          <Globe className="w-4 h-4 text-red-500" />
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-[#66736D]">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-[#0B8F56] hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
