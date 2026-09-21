import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { Product, Order, UserProfile, Review } from '../types';
import { buildProducts } from '../data/catalog';
import { initialReviews } from '../data/reviews';

interface AppContextType {
  // Catalog
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;

  // Cart
  cart: { [productId: number]: number };
  cartProducts: { product: Product; quantity: number }[];
  addToCart: (product: Product, quantity?: number) => void;
  removeOneFromCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;

  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (deliveryMethod?: string, address?: string, paymentMethod?: string) => string;
  updateOrderStatus: (orderId: string, status: Order['status'], trackingNumber?: string, courierName?: string) => void;
  latestOrderId: string;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getReviewsForProduct: (productId: number) => Review[];

  // User & Auth
  user: UserProfile;
  isLoggedIn: boolean;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  switchRole: (role: 'buyer' | 'artisan') => void;

  // Navigation & Modals
  activeTab: number;
  setActiveTab: (tab: number) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  selectedArtisan: string | null;
  setSelectedArtisan: (artisan: string | null) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (category: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  priceRange: number;
  setPriceRange: (max: number) => void;
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (orderId: string | null) => void;
  checkoutStep: 'idle' | 'checkout' | 'payment' | 'review' | 'success';
  setCheckoutStep: (step: 'idle' | 'checkout' | 'payment' | 'review' | 'success') => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isRecommendationsOpen: boolean;
  setIsRecommendationsOpen: (open: boolean) => void;
  isAddProductOpen: boolean;
  setIsAddProductOpen: (open: boolean) => void;
  isArtisanStudioOpen: boolean;
  setIsArtisanStudioOpen: (open: boolean) => void;
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial states with localStorage caching if available
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ac_products');
      if (saved) return JSON.parse(saved);
    } catch {}
    return buildProducts();
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('ac_reviews');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialReviews;
  });

  const [cart, setCart] = useState<{ [productId: number]: number }>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@gmail.com',
    role: 'buyer',
  });

  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('Relevance');
  const [priceRange, setPriceRange] = useState<number>(2500);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'checkout' | 'payment' | 'review' | 'success'>('idle');
  const [latestOrderId, setLatestOrderId] = useState<string>('AC20260905001');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState<boolean>(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState<boolean>(false);
  const [isArtisanStudioOpen, setIsArtisanStudioOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial seed orders matching Flutter lib/screens/orders_screen.dart
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ac_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    const initialList = buildProducts();
    return [
      {
        id: 'AC20260905001',
        products: [initialList[0], initialList[1]],
        quantities: { [initialList[0].id]: 1, [initialList[1].id]: 1 },
        status: 'Processing',
        date: '05 Sep 2026',
        total: initialList[0].price + initialList[1].price,
        deliveryMethod: 'Standard Delivery (3-5 days)',
        shippingAddress: 'John Doe\n123, Anna Nagar\nChennai – 600040, Tamil Nadu',
        paymentMethod: 'UPI (Google Pay)',
        trackingNumber: 'IND9872630',
        courierName: 'India Post Artisan Express',
      },
      {
        id: 'AC20260828012',
        products: [initialList[7]],
        quantities: { [initialList[7].id]: 1 },
        status: 'Shipped',
        date: '28 Aug 2026',
        total: initialList[7].price,
        deliveryMethod: 'Express Delivery (1-2 days)',
        shippingAddress: 'John Doe\n123, Anna Nagar\nChennai – 600040, Tamil Nadu',
        paymentMethod: 'Credit / Debit Card',
        trackingNumber: 'DLV8812903',
        courierName: 'Blue Dart Crafts',
      },
      {
        id: 'AC20260815008',
        products: [initialList[25], initialList[26]],
        quantities: { [initialList[25].id]: 1, [initialList[26].id]: 1 },
        status: 'Delivered',
        date: '15 Aug 2026',
        total: initialList[25].price + initialList[26].price,
        deliveryMethod: 'Standard Delivery',
        shippingAddress: 'John Doe\n123, Anna Nagar\nChennai – 600040, Tamil Nadu',
        paymentMethod: 'Net Banking',
        trackingNumber: 'IND7718290',
        courierName: 'India Post Speed Post',
      },
      {
        id: 'AC20260720044',
        products: [initialList[50]],
        quantities: { [initialList[50].id]: 1 },
        status: 'Cancelled',
        date: '20 Jul 2026',
        total: initialList[50].price,
        deliveryMethod: 'Standard Delivery',
        shippingAddress: 'John Doe\n123, Anna Nagar\nChennai – 600040, Tamil Nadu',
        paymentMethod: 'Cash on Delivery',
      },
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ac_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('ac_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ac_reviews', JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast('Product published to catalog successfully!');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast('Product updated successfully!');
  };

  const deleteProduct = (productId: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog');
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order['status'],
    trackingNumber?: string,
    courierName?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              ...(trackingNumber ? { trackingNumber } : {}),
              ...(courierName ? { courierName } : {}),
            }
          : o
      )
    );
    showToast(`Order #${orderId} marked as ${status}`);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Today, Just now',
    };
    setReviews((prev) => [newRev, ...prev]);

    // Recalculate product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === reviewData.productId) {
          const newReviewsCount = p.reviews + 1;
          const newRating = Number(
            (((p.rating * p.reviews) + reviewData.rating) / newReviewsCount).toFixed(1)
          );
          return { ...p, rating: newRating, reviews: newReviewsCount };
        }
        return p;
      })
    );

    showToast('Review submitted! Thank you for supporting artisans.');
  };

  const getReviewsForProduct = (productId: number) => {
    return reviews.filter((r) => r.productId === productId);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const current = prev[product.id] || 0;
      return { ...prev, [product.id]: current + quantity };
    });
    showToast('Added to cart');
  };

  const removeOneFromCart = (product: Product) => {
    setCart((prev) => {
      const current = prev[product.id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[product.id];
        return copy;
      }
      return { ...prev, [product.id]: current - 1 };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart({});
  };

  const cartProducts = useMemo(() => {
    const list: { product: Product; quantity: number }[] = [];
    const productMap = new Map(products.map((p) => [p.id, p]));
    for (const [idStr, qty] of Object.entries(cart)) {
      const p = productMap.get(Number(idStr));
      if (p && qty > 0) {
        list.push({ product: p, quantity: qty });
      }
    }
    return list;
  }, [cart, products]);

  const itemCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartProducts]);

  const shipping = useMemo(() => {
    if (subtotal === 0 || subtotal >= 1500) return 0;
    return 80;
  }, [subtotal]);

  const total = subtotal + shipping;

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const placeOrder = (
    deliveryMethod = 'Standard Delivery (3-5 days)',
    address = 'John Doe\n123, Anna Nagar\nChennai – 600040, Tamil Nadu',
    paymentMethod = 'UPI (Google Pay, PhonePe, etc.)'
  ) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `AC20260905${randomSuffix}`;
    const orderedProducts = cartProducts.map((cp) => cp.product);
    const quantitiesMap: { [productId: number]: number } = {};
    cartProducts.forEach((cp) => {
      quantitiesMap[cp.product.id] = cp.quantity;
    });

    const newOrder: Order = {
      id: orderId,
      products: orderedProducts,
      quantities: quantitiesMap,
      status: 'Processing',
      date: 'Today, Just now',
      total: total,
      deliveryMethod,
      shippingAddress: address,
      paymentMethod,
      trackingNumber: `IND${randomSuffix}90`,
      courierName: 'India Post Artisan Express',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrderId(orderId);
    clearCart();
    setCheckoutStep('success');
    return orderId;
  };

  const login = (email = 'john@gmail.com', name = 'John Doe') => {
    setUser((prev) => ({ ...prev, email, name }));
    setIsLoggedIn(true);
    showToast('Logged in successfully');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('Logged out');
  };

  const switchRole = (role: 'buyer' | 'artisan') => {
    setUser((prev) => ({ ...prev, role }));
    showToast(`Switched to ${role === 'artisan' ? 'Artisan' : 'Buyer'} mode`);
    if (role === 'artisan') {
      setIsArtisanStudioOpen(true);
    } else {
      setIsArtisanStudioOpen(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        cartProducts,
        addToCart,
        removeOneFromCart,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        shipping,
        total,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        latestOrderId,
        reviews,
        addReview,
        getReviewsForProduct,
        user,
        isLoggedIn,
        login,
        logout,
        switchRole,
        activeTab,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        selectedArtisan,
        setSelectedArtisan,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        isSearchOpen,
        setIsSearchOpen,
        isFilterOpen,
        setIsFilterOpen,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        checkoutStep,
        setCheckoutStep,
        isDrawerOpen,
        setIsDrawerOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isRecommendationsOpen,
        setIsRecommendationsOpen,
        isAddProductOpen,
        setIsAddProductOpen,
        isArtisanStudioOpen,
        setIsArtisanStudioOpen,
        editingProduct,
        setEditingProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

