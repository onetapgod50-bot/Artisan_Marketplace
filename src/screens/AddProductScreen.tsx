import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Camera,
  Sparkles,
  Upload,
  CheckCircle2,
  DollarSign,
  Tag,
  Layers,
  Image as ImageIcon,
  Mic,
  Scissors,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/catalog';
import { Product } from '../types';

export const AddProductScreen: React.FC = () => {
  const {
    isAddProductOpen,
    setIsAddProductOpen,
    addProduct,
    updateProduct,
    editingProduct,
    setEditingProduct,
    user,
    showToast,
  } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0].name);
  const [price, setPrice] = useState('750');
  const [stock, setStock] = useState('15');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Handmade, Eco-friendly, Traditional');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=800&q=80'
  );
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const [bgRemovalActive, setBgRemovalActive] = useState(false);
  const [aiPricingBreakdown, setAiPricingBreakdown] = useState<{
    suggested: number;
    floor: number;
    ceiling: number;
    reasoning: string;
  } | null>(null);

  // Sync editingProduct state
  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.name);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price.toString());
      setStock((editingProduct.stock || 15).toString());
      setDescription(editingProduct.description);
      setTags(editingProduct.tags.join(', '));
      setImageUrl(editingProduct.imageUrl);
    } else {
      setTitle('');
      setCategory(categories[0].name);
      setPrice('750');
      setStock('15');
      setDescription('');
      setTags('Handmade, Eco-friendly, Traditional');
      setImageUrl(
        'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=800&q=80'
      );
    }
  }, [editingProduct, isAddProductOpen]);

  if (!isAddProductOpen) return null;

  // Preset sample artisan craft photos for quick demonstration
  const sampleCrafts = [
    {
      name: 'Terracotta Pot',
      url: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=800&q=80',
      category: 'Pottery',
      title: 'Handcrafted Terracotta Temple Diya',
      desc: 'Hand-thrown natural terracotta diya with intricate traditional carvings, kiln-fired using centuries-old heritage methods by local village potters.',
      price: 450,
      tags: 'Terracotta, Pottery, Diya, Eco-friendly',
    },
    {
      name: 'Warli Art Frame',
      url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=800&q=80',
      category: 'Paintings',
      title: 'Authentic Warli Tribal Canvas Art',
      desc: 'Traditional Maharashtra folk art depicting rural harvest celebration, painted with natural rice paste pigment on handmade mud-treated canvas.',
      price: 1250,
      tags: 'Warli, Folk Art, Tribal Painting, Handmade',
    },
    {
      name: 'Carved Wood Box',
      url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
      category: 'Wooden Crafts',
      title: 'Sheesham Wood Hand-Carved Jewelry Box',
      desc: 'Artisanal keepsake box crafted from sustainably sourced Sheesham wood with delicate brass inlay and velvet interior lining.',
      price: 890,
      tags: 'Woodcraft, Sheesham, Brass Inlay, Keepsake',
    },
    {
      name: 'Handwoven Shawl',
      url: 'https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=800&q=80',
      category: 'Textiles',
      title: 'Pure Khadi Handloom Embroidered Stole',
      desc: 'Hand-spun organic cotton threads hand-dyed with natural indigo and vegetable extracts, featuring fine geometric border motifs.',
      price: 1450,
      tags: 'Khadi, Handloom, Natural Dye, Sustainable',
    },
  ];

  // AI Smart Cataloging simulation based on craft selection / AI microservice logic
  const handleAIAssist = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      // Pick matching sample craft or generate dynamic metadata
      const matched = sampleCrafts.find((s) => s.category === category) || sampleCrafts[0];
      setTitle(matched.title);
      setDescription(matched.desc);
      setPrice(matched.price.toString());
      setTags(matched.tags);
      setCategory(matched.category);
      setImageUrl(matched.url);

      const basePrice = matched.price;
      setAiPricingBreakdown({
        suggested: basePrice,
        floor: Math.round(basePrice * 0.8),
        ceiling: Math.round(basePrice * 1.35),
        reasoning:
          'Calculated using: Material cost (35%) + Artisan labor hours (4.5 hrs @ standard fair-trade artisan wage) + Regional craft demand index.',
      });

      setIsGeneratingAI(false);
      showToast('AI smart cataloging generated specs successfully!');
    }, 900);
  };

  const handleVoiceInput = () => {
    setIsDictating(true);
    setTimeout(() => {
      setIsDictating(false);
      const voiceSample =
        'Handcrafted using centuries-old heritage methods. Made from natural red river clay and hand-carved with traditional floral filigree. Finished with organic vegetable polish.';
      setDescription((prev) => (prev ? `${prev} ${voiceSample}` : voiceSample));
      showToast('Voice speech transcribed into craft description!');
    }, 1200);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: title || editingProduct.name,
        category,
        price: Number(price) || editingProduct.price,
        stock: Number(stock) || 10,
        description: description || editingProduct.description,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        imageUrl: imageUrl || editingProduct.imageUrl,
      };
      updateProduct(updated);
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: title || 'Handmade Artisan Craft',
        category,
        artisan: user.name || 'Traditional Artisan',
        city: 'Chennai',
        price: Number(price) || 500,
        rating: 5.0,
        reviews: 0,
        description: description || 'Authentic handmade craft made by local artisans.',
        imageUrl: imageUrl || sampleCrafts[0].url,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        featured: true,
        stock: Number(stock) || 10,
      };
      addProduct(newProduct);
    }
    setIsAddProductOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#E4E8E6] px-4 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setIsAddProductOpen(false);
            setEditingProduct(null);
          }}
          className="p-1.5 -ml-1 text-[#1E2723] hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-sm text-[#1E2723]">
          {editingProduct ? 'Edit Artisan Craft' : 'Artisan Smart Cataloging'}
        </span>
        <div className="w-8" />
      </div>

      <div className="max-w-md mx-auto p-4 pb-16">
        {/* AI Helper Callout */}
        <div className="bg-[#E9F7F0] border border-[#0B8F56]/30 rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-[#006B43]">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-black text-xs uppercase tracking-wider">
                AI Smart Cataloging Assistant
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAIAssist}
              disabled={isGeneratingAI}
              className="px-3 py-1.5 bg-[#0B8F56] hover:bg-[#006B43] text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingAI ? 'Analyzing...' : 'Auto-Fill with AI'}</span>
            </button>
          </div>
          <p className="text-xs text-[#1E2723]/90 leading-relaxed font-medium">
            Take a photo of your craft. Our AI will automatically generate an SEO-friendly title,
            engaging heritage description, and fair-wage price recommendation.
          </p>
        </div>

        {/* Sample Crafts Quick Selector */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-[#1E2723] mb-2">
            Select or Upload Craft Photo
          </label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {sampleCrafts.map((sc) => (
              <div
                key={sc.name}
                onClick={() => {
                  setImageUrl(sc.url);
                  setCategory(sc.category);
                  setTitle(sc.title);
                  setDescription(sc.desc);
                  setPrice(sc.price.toString());
                  setTags(sc.tags);
                }}
                className={`border rounded-xl p-1 text-center cursor-pointer transition-all ${
                  imageUrl === sc.url
                    ? 'border-[#0B8F56] ring-2 ring-[#0B8F56]/20 bg-[#E9F7F0]'
                    : 'border-[#E4E8E6] bg-white hover:bg-gray-50'
                }`}
              >
                <img
                  src={sc.url}
                  alt={sc.name}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square rounded-lg object-cover mb-1"
                />
                <span className="text-[10px] font-bold text-[#1E2723] block truncate">
                  {sc.name}
                </span>
              </div>
            ))}
          </div>

          {/* AI Background Clean-up Toggle */}
          <div className="p-3 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#0B8F56]" />
              <div>
                <span className="text-xs font-extrabold text-[#1E2723] block">
                  AI Background Clean-up
                </span>
                <span className="text-[10px] text-[#66736D]">
                  {bgRemovalActive ? 'Clean gallery white backdrop active' : 'Standard workshop background'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setBgRemovalActive(!bgRemovalActive);
                showToast(
                  !bgRemovalActive
                    ? 'AI Background removed: Clean studio white applied'
                    : 'Restored original photo background'
                );
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                bgRemovalActive
                  ? 'bg-[#0B8F56] text-white border-[#0B8F56]'
                  : 'bg-white text-[#1E2723] border-[#E4E8E6]'
              }`}
            >
              {bgRemovalActive ? 'Clean Studio' : 'Original'}
            </button>
          </div>
        </div>

        {/* Product Details Form */}
        <form onSubmit={handlePublish} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#1E2723] mb-1">Craft Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Handcrafted Terracotta Temple Diya"
              className="w-full px-3 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-[#1E2723] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
            >
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1E2723] mb-1">Price (₹)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₹ Amount"
                className="w-full px-3 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E2723] mb-1">Stock Quantity</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Units in inventory"
                className="w-full px-3 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
              />
            </div>
          </div>

          {/* AI Pricing Recommendation Details */}
          {aiPricingBreakdown && (
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs mb-1">
                <DollarSign className="w-3.5 h-3.5" />
                <span>AI Fair-Trade Pricing Model</span>
              </div>
              <div className="flex gap-4 text-xs mb-1.5 font-semibold">
                <span className="text-gray-600">
                  Floor: <b className="text-gray-900">₹{aiPricingBreakdown.floor}</b>
                </span>
                <span className="text-[#0B8F56]">
                  Fair Wage: <b className="text-[#006B43]">₹{aiPricingBreakdown.suggested}</b>
                </span>
                <span className="text-gray-600">
                  Ceiling: <b className="text-gray-900">₹{aiPricingBreakdown.ceiling}</b>
                </span>
              </div>
              <p className="text-[11px] text-gray-600">{aiPricingBreakdown.reasoning}</p>
            </div>
          )}

          {/* Description with Voice Dictation */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#1E2723]">
                Heritage & Craft Story
              </label>
              <button
                type="button"
                onClick={handleVoiceInput}
                disabled={isDictating}
                className={`text-[11px] font-bold flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all ${
                  isDictating
                    ? 'bg-red-500 text-white border-red-500 animate-pulse'
                    : 'bg-white text-[#0B8F56] border-[#0B8F56]/30 hover:bg-[#E9F7F0]'
                }`}
              >
                <Mic className="w-3 h-3 text-red-500" />
                <span>{isDictating ? 'Listening...' : 'Voice Dictate'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell buyers about the materials, techniques, and tradition behind this craft..."
              className="w-full p-3 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-[#1E2723] mb-1">
              Search Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. Handmade, Terracotta, Diya, Organic"
              className="w-full px-3 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
            />
          </div>

          {/* Publish Button */}
          <button
            type="submit"
            className="w-full mt-3 py-3.5 bg-[#0B8F56] hover:bg-[#006B43] text-white font-black text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{editingProduct ? 'Save Changes' : 'Publish to Marketplace'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
