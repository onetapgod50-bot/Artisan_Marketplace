export interface Product {
  id: number;
  name: string;
  category: string;
  artisan: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  materials?: string[];
  stock?: number;
  isUserCreated?: boolean;
}

export interface CategoryInfo {
  name: string;
  icon: string;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  products: Product[];
  quantities: { [productId: number]: number };
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  total: number;
  deliveryMethod?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  trackingNumber?: string;
  courierName?: string;
}

export interface Review {
  id: string;
  productId: number;
  userName: string;
  userCity?: string;
  rating: number;
  comment: string;
  date: string;
  artisanReply?: string;
  verifiedBuyer?: boolean;
}

export interface TrackingStep {
  title: string;
  time: string;
  completed: boolean;
  iconName: 'receipt' | 'inventory' | 'truck' | 'delivery' | 'home';
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'artisan';
  avatar?: string;
}
