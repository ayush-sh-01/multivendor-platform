import React, { useState } from 'react';
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
import CollectionsView from './components/CollectionsView';
import JournalView from './components/JournalView';
import Footer from './components/Footer';

// Modals & Overlays
import QuickViewModal from './components/QuickViewModal';
import UploadModal from './components/UploadModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import Chatbot from './components/Chatbot';

function MainContent() {
  const [activeView, setActiveView] = useState('discover'); // 'discover' | 'collections' | 'journal'

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-[#DCDCDC] selection:bg-[#D49A7A] selection:text-[#121212]">
      {/* Top Transparent Luxury Navbar */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Multi-Page Flow */}
      <main className="flex-1 w-full">
        {activeView === 'discover' && (
          <>
            <HeroSection />
            <MarqueeBanner />
            <TrendingCategories />
            <ProductGallery />
            <MysteryBundle />
            <HowItWorks />
            <TopCurators />
          </>
        )}

        {activeView === 'collections' && (
          <>
            <CollectionsView />
            <MarqueeBanner />
          </>
        )}

        {activeView === 'journal' && (
          <>
            <JournalView />
            <MarqueeBanner />
          </>
        )}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <QuickViewModal />
      <UploadModal />
      <CartDrawer />
      <AuthModal />
      <Toast />
      
      {/* Special AI Concierge Floating Action Button (Burgundy Pill with Microphone) */}
      <Chatbot />
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
