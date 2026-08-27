import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeBanner from './components/MarqueeBanner';
import TrendingCategories from './components/TrendingCategories';
import ProductGallery from './components/ProductGallery';
import MysteryBundle from './components/MysteryBundle';
import HowItWorks from './components/HowItWorks';
import TopCurators from './components/TopCurators';
import Footer from './components/Footer';

// Modals & Overlays
import QuickViewModal from './components/QuickViewModal';
import UploadModal from './components/UploadModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

function MainContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#2C4234] text-[#F4EFE6]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Flow */}
      <main className="flex-1 w-full">
        <HeroSection />
        <MarqueeBanner />
        <TrendingCategories />
        <ProductGallery />
        <MysteryBundle />
        <HowItWorks />
        <TopCurators />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <QuickViewModal />
      <UploadModal />
      <CartDrawer />
      <AuthModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <MainContent />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}
