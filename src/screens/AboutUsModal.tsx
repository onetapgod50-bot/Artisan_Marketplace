import React from 'react';
import {
  X,
  Info,
  Award,
  Heart,
  ShieldCheck,
  Globe2,
  Users,
  Sparkles,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutUsModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen, showToast } = useApp();

  if (!isAboutOpen) return null;

  const pillars = [
    {
      title: 'Zero Middlemen',
      desc: '100% of fair-trade retail price flows directly into the verified artisan’s bank account with full ledger transparency.',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      title: 'GI Certified Heritage',
      desc: 'Authentic Indian Geographical Indication (GI) lineages verified through regional handloom and handicraft cooperatives.',
      icon: Award,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: 'Living Artisan Wages',
      desc: 'Guaranteed minimum ₹180/hr labor wage floor factoring in hereditary techniques and hours of patient craftsmanship.',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Eco-Friendly & Natural',
      desc: 'Pure organic cotton, natural vegetable vegetable dyes, sustainably harvested neem wood, terracotta clay, and recyclable brass.',
      icon: Globe2,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
  ];

  const heritageClusters = [
    { region: 'Thanjavur, Tamil Nadu', craft: '22K Gold Foil Tanjore Art & Bronze Casting' },
    { region: 'Channapatna, Karnataka', craft: 'Natural Lacquerware Turned Wooden Toys' },
    { region: 'Kanchipuram, Tamil Nadu', craft: 'Pure Mulberry Silk & Zari Handlooms' },
    { region: 'Jaipur & Sanganer, Rajasthan', craft: 'Hand Block Printing & Blue Pottery' },
    { region: 'Bastar & Kondagaon, Chhattisgarh', craft: 'Lost-Wax Dhokra Tribal Metal Castings' },
    { region: 'Varanasi, Uttar Pradesh', craft: 'Traditional Banarasi Brocades & Wooden Carvings' },
  ];

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E4E8E6] flex items-center justify-between bg-gradient-to-r from-[#F7F9F8] to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B8F56]/10 text-[#0B8F56] flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#1E2723]">About Artisan Connect</h2>
              <p className="text-[11px] text-[#66736D]">Honoring centuries of living Indian craftsmanship</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAboutOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* Mission Hero */}
          <div className="p-5 bg-gradient-to-br from-[#0B8F56] to-[#006B43] rounded-2xl text-white shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-white/80 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Our Cultural Purpose</span>
            </div>
            <h3 className="text-base font-black leading-snug mb-2">
              Empowering 200+ Master Artisans Across 20 Authentic Indian Craft Traditions
            </h3>
            <p className="text-xs text-white/90 leading-relaxed font-medium">
              Artisan Connect is an ethical direct-to-artisan digital ecosystem created to celebrate, preserve,
              and sustain traditional Indian handicrafts. We bridge conscious buyers worldwide directly with
              hereditary craftspeople, cutting out exploitative middlemen and ensuring dignity for every maker.
            </p>
          </div>

          {/* Impact Numbers */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 bg-[#F7F9F8] border border-[#E4E8E6] rounded-2xl text-center">
              <span className="text-lg font-black text-[#0B8F56] block">200+</span>
              <span className="text-[10px] font-bold text-[#1E2723] uppercase tracking-wider block">
                Artisans
              </span>
              <span className="text-[10px] text-[#66736D]">Hereditary Masters</span>
            </div>
            <div className="p-3 bg-[#F7F9F8] border border-[#E4E8E6] rounded-2xl text-center">
              <span className="text-lg font-black text-[#0B8F56] block">20</span>
              <span className="text-[10px] font-bold text-[#1E2723] uppercase tracking-wider block">
                Categories
              </span>
              <span className="text-[10px] text-[#66736D]">GI Traditions</span>
            </div>
            <div className="p-3 bg-[#F7F9F8] border border-[#E4E8E6] rounded-2xl text-center">
              <span className="text-lg font-black text-[#0B8F56] block">100%</span>
              <span className="text-[10px] font-bold text-[#1E2723] uppercase tracking-wider block">
                Direct
              </span>
              <span className="text-[10px] text-[#66736D]">Zero Commission</span>
            </div>
          </div>

          {/* 4 Core Pillars */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#1E2723] block mb-3">
              The Artisan Connect Charter
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 bg-white border border-[#E4E8E6] rounded-2xl space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 ${pillar.color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-black text-[#1E2723]">{pillar.title}</h4>
                    </div>
                    <p className="text-[11px] text-[#66736D] leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Heritage Craft Clusters */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#1E2723] block mb-3">
              Active Heritage Craft Clusters
            </span>
            <div className="bg-[#F7F9F8] border border-[#E4E8E6] rounded-2xl divide-y divide-[#E4E8E6] overflow-hidden">
              {heritageClusters.map((hc, idx) => (
                <div key={idx} className="p-3 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0B8F56] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1E2723] block">{hc.region}</span>
                    <span className="text-[11px] text-[#66736D]">{hc.craft}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organization Info */}
          <div className="p-4 bg-gray-50 border border-[#E4E8E6] rounded-2xl space-y-2 text-xs">
            <span className="font-black text-[#1E2723] block">Foundation & Guild Credentials</span>
            <p className="text-[11px] text-[#66736D] leading-relaxed">
              Artisan Connect operates in partnership with certified artisan self-help groups (SHGs),
              district handloom societies, and national cultural development boards across India.
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] text-[#006B43] font-bold border-t border-gray-200">
              <span>Registered Craft Guild Initiative</span>
              <button
                type="button"
                onClick={() => showToast('Guild Certification #IND-ART-2026-GI')}
                className="hover:underline flex items-center gap-1"
              >
                <span>View Certification</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E4E8E6] bg-gray-50 flex items-center justify-between">
          <span className="text-[11px] text-[#66736D]">Artisan Connect • Version 1.2.0</span>
          <button
            type="button"
            onClick={() => setIsAboutOpen(false)}
            className="px-4 py-2 bg-[#1E2723] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
