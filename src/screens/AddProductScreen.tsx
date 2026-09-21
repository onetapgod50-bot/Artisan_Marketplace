import React, { useState, useEffect, useRef } from 'react';
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
  X,
  RefreshCw,
  Sliders,
  MapPin,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories, realisticCraftImages } from '../data/catalog';
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [artisanName, setArtisanName] = useState(user.name || 'Traditional Artisan');
  const [craftCity, setCraftCity] = useState('Thanjavur');
  const [category, setCategory] = useState(categories[0].name);
  const [price, setPrice] = useState('750');
  const [stock, setStock] = useState('15');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Handmade, Eco-friendly, Traditional');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=800&q=80'
  );
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const [bgRemovalActive, setBgRemovalActive] = useState(false);
  const [aiPricingBreakdown, setAiPricingBreakdown] = useState<{
    suggested: number;
    floor: number;
    ceiling: number;
    reasoning: string;
  } | null>(null);

  // Sync editingProduct state or initialize
  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.name);
      setArtisanName(editingProduct.artisan);
      setCraftCity(editingProduct.city);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price.toString());
      setStock((editingProduct.stock || 15).toString());
      setDescription(editingProduct.description);
      setTags(editingProduct.tags.join(', '));
      setImageUrl(editingProduct.imageUrl);
      setIsPhotoUploaded(editingProduct.imageUrl.startsWith('data:'));
    } else {
      setTitle('');
      setArtisanName(user.name || 'Traditional Artisan');
      setCraftCity('Thanjavur');
      setCategory(categories[0].name);
      setPrice('750');
      setStock('15');
      setDescription('');
      setTags('Handmade, Eco-friendly, Traditional');
      setImageUrl(
        'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=800&q=80'
      );
      setIsPhotoUploaded(false);
      setAiPricingBreakdown(null);
    }
  }, [editingProduct, isAddProductOpen, user.name]);

  if (!isAddProductOpen) return null;

  // Realistic sample crafts for demonstration
  const sampleCrafts = [
    {
      name: 'Terracotta Temple Diya',
      url: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=800&q=80',
      category: 'Pottery',
      title: 'Handcrafted Terracotta Temple Diya with Sacred Cutouts',
      desc: 'Hand-thrown natural terracotta diya with intricate traditional carvings, kiln-fired using centuries-old heritage methods by hereditary village potters.',
      price: 450,
      tags: 'Terracotta, Pottery, Diya, Eco-friendly, Clay',
      city: 'Thanjavur',
    },
    {
      name: 'Warli Tribal Art',
      url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=800&q=80',
      category: 'Paintings',
      title: 'Authentic Warli Tribal Canvas Art - Harvest Celebration',
      desc: 'Traditional folk art depicting community harvest celebration, painted with natural rice pigment on handmade mud-treated textured canvas.',
      price: 1250,
      tags: 'Warli, Folk Art, Tribal Painting, Handmade, Natural Pigments',
      city: 'Thane',
    },
    {
      name: 'Carved Sheesham Box',
      url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
      category: 'Wooden Crafts',
      title: 'Sheesham Wood Hand-Carved Keepsake Box with Brass Inlay',
      desc: 'Artisanal keepsake box crafted from sustainably harvested Sheesham hardwood with delicate brass wire inlay and smooth beeswax finish.',
      price: 890,
      tags: 'Woodcraft, Sheesham, Brass Inlay, Keepsake, Carved',
      city: 'Saharanpur',
    },
    {
      name: 'Pure Khadi Stole',
      url: 'https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=800&q=80',
      category: 'Textiles',
      title: 'Pure Khadi Handloom Indigo Embroidered Stole',
      desc: 'Hand-spun organic cotton threads hand-dyed with natural indigo and vegetable extracts, woven on traditional wooden pit looms.',
      price: 1450,
      tags: 'Khadi, Handloom, Natural Dye, Sustainable, Cotton',
      city: 'Kolkata',
    },
  ];

  // Process & compress uploaded image file using an HTML5 canvas
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPEG, PNG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setImageUrl(compressedDataUrl);
          setIsPhotoUploaded(true);
          showToast('Craft photo uploaded and optimized for listing!');

          // If title is empty, suggest one automatically
          if (!title) {
            setTitle(`Handcrafted ${category} Masterpiece`);
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // AI Smart Cataloging simulation
  const handleAIAssist = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      const matched = sampleCrafts.find((s) => s.category === category) || sampleCrafts[0];
      setTitle(matched.title);
      setDescription(matched.desc);
      setPrice(matched.price.toString());
      setTags(matched.tags);
      setCategory(matched.category);
      setCraftCity(matched.city);

      if (!isPhotoUploaded) {
        setImageUrl(matched.url);
      }

      const basePrice = matched.price;
      setAiPricingBreakdown({
        suggested: basePrice,
        floor: Math.round(basePrice * 0.8),
        ceiling: Math.round(basePrice * 1.35),
        reasoning:
          'Evaluated: Sustainable raw materials (35%) + Hereditary artisan labor (4.5 hrs @ ₹180/hr fair wage) + Geographic GI craft premium.',
      });

      setIsGeneratingAI(false);
      showToast('AI Smart Cataloging generated title, description & fair-trade pricing!');
    }, 850);
  };

  const handleVoiceInput = () => {
    setIsDictating(true);
    setTimeout(() => {
      setIsDictating(false);
      const voiceSample =
        'Handcrafted using traditional heritage methods. Made from authentic natural river clay and hand-carved with floral filigree. Finished with organic plant-based wax polish.';
      setDescription((prev) => (prev ? `${prev} ${voiceSample}` : voiceSample));
      showToast('Voice dictation transcribed into craft description!');
    }, 1200);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Please provide a title for your craft');
      return;
    }

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: title.trim(),
        artisan: artisanName.trim() || user.name || 'Traditional Artisan',
        city: craftCity.trim() || 'Thanjavur',
        category,
        price: Number(price) || editingProduct.price,
        stock: Number(stock) || 10,
        description: description.trim() || editingProduct.description,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        imageUrl: imageUrl || editingProduct.imageUrl,
        isUserCreated: true,
      };
      updateProduct(updated);
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: title.trim(),
        category,
        artisan: artisanName.trim() || user.name || 'Traditional Artisan',
        city: craftCity.trim() || 'Thanjavur',
        price: Number(price) || 500,
        rating: 5.0,
        reviews: 0,
        description:
          description.trim() ||
          `Authentic handmade ${title.toLowerCase()} crafted by skilled hereditary artisans using traditional sustainable techniques.`,
        imageUrl: imageUrl || sampleCrafts[0].url,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        featured: true,
        stock: Number(stock) || 10,
        isUserCreated: true,
        materials: tags.split(',').map((t) => t.trim()).slice(0, 3),
      };
      addProduct(newProduct);
    }

    setIsAddProductOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-white overflow-y-auto">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs border-b border-[#E4E8E6] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsAddProductOpen(false);
              setEditingProduct(null);
            }}
            className="p-1.5 -ml-1 text-[#1E2723] hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-black text-sm text-[#1E2723]">
              {editingProduct ? 'Edit Artisan Craft' : 'Add New Craft Listing'}
            </h2>
            <p className="text-[11px] text-[#66736D]">
              {editingProduct ? 'Update product details' : 'AI-assisted cataloging & direct photo upload'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsAddProductOpen(false);
            setEditingProduct(null);
          }}
          className="text-xs font-bold text-gray-500 hover:text-black px-2 py-1 rounded-lg"
        >
          Cancel
        </button>
      </div>

      <div className="max-w-md mx-auto p-4 pb-20 space-y-5">
        {/* AI Helper Callout */}
        <div className="bg-[#E9F7F0] border border-[#0B8F56]/30 rounded-2xl p-4">
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
            Upload a photo of your craft below. Our AI analyzes your work to automatically suggest a
            cultural heritage narrative, fair-trade pricing, and search tags.
          </p>
        </div>

        {/* PHOTO UPLOAD & SELECTION SECTION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-[#1E2723] flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#0B8F56]" />
              <span>Craft Photo (Upload from Device or Select)</span>
            </label>
            {isPhotoUploaded && (
              <span className="text-[10px] font-bold text-[#0B8F56] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Photo Uploaded
              </span>
            )}
          </div>

          {/* Hidden File Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Active Photo Preview & Interactive Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
              isDragging
                ? 'border-[#0B8F56] bg-[#E9F7F0]/60 scale-[1.01]'
                : 'border-[#E4E8E6] bg-[#F7F9F8] hover:border-[#0B8F56]/50'
            }`}
          >
            {imageUrl ? (
              <div className="space-y-3">
                <div className="relative mx-auto w-48 h-48 rounded-xl overflow-hidden shadow-md border border-white">
                  <img
                    src={imageUrl}
                    alt="Craft Preview"
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all ${
                      bgRemovalActive ? 'bg-white p-2' : ''
                    }`}
                  />
                  {isPhotoUploaded && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#0B8F56] text-white text-[9px] font-black rounded-md shadow-xs">
                      Your Photo
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-[#E4E8E6] text-[#1E2723] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#0B8F56]" />
                    <span>Upload From Device</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-[#E4E8E6] text-[#1E2723] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#0B8F56]" />
                    <span>Take Camera Photo</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 space-y-2.5">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#E9F7F0] text-[#0B8F56] flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E2723]">Drag & drop craft photo here</p>
                  <p className="text-[11px] text-[#66736D]">PNG, JPG, WebP up to 10MB</p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 bg-[#0B8F56] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Choose Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="px-3.5 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-bold rounded-xl shadow-xs"
                  >
                    Camera
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* AI Clean Studio Background Switcher */}
          <div className="p-3 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#0B8F56]" />
              <div>
                <span className="text-xs font-extrabold text-[#1E2723] block">
                  AI Background Clean-up
                </span>
                <span className="text-[10px] text-[#66736D]">
                  {bgRemovalActive ? 'Gallery studio white background active' : 'Natural workshop background'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setBgRemovalActive(!bgRemovalActive);
                showToast(
                  !bgRemovalActive
                    ? 'Clean gallery background applied'
                    : 'Restored original workshop background'
                );
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                bgRemovalActive
                  ? 'bg-[#0B8F56] text-white border-[#0B8F56]'
                  : 'bg-white text-[#1E2723] border-[#E4E8E6]'
              }`}
            >
              {bgRemovalActive ? 'Studio White' : 'Original'}
            </button>
          </div>

          {/* Realistic Presets Fallback */}
          <div>
            <span className="text-[11px] font-bold text-[#66736D] block mb-2">
              Or pick from verified authentic craft samples:
            </span>
            <div className="grid grid-cols-4 gap-2">
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
                    setCraftCity(sc.city);
                    setIsPhotoUploaded(false);
                    showToast(`Loaded ${sc.name} details`);
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
          </div>
        </div>

        {/* PRODUCT DETAILS FORM */}
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
              className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
            />
          </div>

          {/* Artisan Name & City */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1E2723] mb-1">Artisan / Guild Name</label>
              <input
                type="text"
                required
                value={artisanName}
                onChange={(e) => setArtisanName(e.target.value)}
                placeholder="Your Name or Studio"
                className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1E2723] mb-1">Craft Village / City</label>
              <input
                type="text"
                required
                value={craftCity}
                onChange={(e) => setCraftCity(e.target.value)}
                placeholder="e.g. Thanjavur, Jaipur"
                className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-[#1E2723] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
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
                min={50}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₹ Amount"
                className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E2723] mb-1">Stock Units</label>
              <input
                type="number"
                required
                min={1}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Available quantity"
                className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
              />
            </div>
          </div>

          {/* AI Fair Wage Recommendation Breakdown */}
          {aiPricingBreakdown && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span>Fair Wage Evaluation:</span>
                <span className="font-extrabold text-[#006B43]">
                  ₹{aiPricingBreakdown.suggested} (Rec)
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-amber-800">
                <span>Guild Floor: ₹{aiPricingBreakdown.floor}</span>
                <span>Max Ceiling: ₹{aiPricingBreakdown.ceiling}</span>
              </div>
              <p className="text-[10px] text-amber-700 leading-tight">
                {aiPricingBreakdown.reasoning}
              </p>
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-[#1E2723] mb-1">
              Search Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. Handmade, Terracotta, Eco-friendly"
              className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-[#0B8F56] hover:bg-[#006B43] text-white font-black text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{editingProduct ? 'Save Changes' : 'Publish Craft to Marketplace'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
