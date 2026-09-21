import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Drawer } from './components/Drawer';
import { Toast } from './components/Toast';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { CartScreen } from './screens/CartScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { ArtisanDetailsScreen } from './screens/ArtisanDetailsScreen';
import { CheckoutFlow } from './screens/CheckoutFlow';
import { TrackingScreen } from './screens/TrackingScreen';
import { SearchModal } from './screens/SearchModal';
import { FilterModal } from './screens/FilterModal';
import { WishlistModal } from './screens/WishlistModal';
import { RecommendationsModal } from './screens/RecommendationsModal';
import { AddProductScreen } from './screens/AddProductScreen';
import { ArtisanStudioScreen } from './screens/ArtisanStudioScreen';

const MainShell: React.FC = () => {
  const { activeTab, isLoggedIn } = useApp();
  const [showRegister, setShowRegister] = useState(false);

  if (!isLoggedIn) {
    if (showRegister) {
      return <RegisterScreen onSwitchToLogin={() => setShowRegister(false)} />;
    }
    return <LoginScreen onSwitchToRegister={() => setShowRegister(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#1E2723] flex flex-col relative max-w-md mx-auto shadow-sm">
      {/* Top Header */}
      <Header />

      {/* Main Tab Body */}
      <main className="flex-1 overflow-x-hidden">
        {activeTab === 0 && <HomeScreen />}
        {activeTab === 1 && <CategoryScreen />}
        {activeTab === 2 && <CartScreen />}
        {activeTab === 3 && <OrdersScreen />}
        {activeTab === 4 && <ProfileScreen />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Overlays & Modals */}
      <Drawer />
      <ProductDetailsScreen />
      <ArtisanDetailsScreen />
      <CheckoutFlow />
      <TrackingScreen />
      <SearchModal />
      <FilterModal />
      <WishlistModal />
      <RecommendationsModal />
      <AddProductScreen />
      <ArtisanStudioScreen />
      <Toast />
    </div>
  );
};

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AppProvider>
      {showSplash ? (
        <SplashScreen onDismiss={() => setShowSplash(false)} />
      ) : (
        <MainShell />
      )}
    </AppProvider>
  );
};

export default App;
