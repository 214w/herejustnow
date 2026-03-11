import React, { useState } from 'react';
    import SellerDashboard from '../components/SellerDashboard';
    import NearbyFeed from '../components/Buyer/NearbyFeed';
    
    export default function Home() {
      const [view, setView] = useState('buyer');
    
      return (
        <div className="min-h-screen bg-gray-100 font-sans">
          <nav className="bg-white shadow-md p-4 flex justify-center space-x-6 sticky top-0 z-10">
            <button 
              onClick={() => setView('buyer')}
              className={`px-6 py-2 rounded-full font-bold transition ${view === 'buyer' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Find Nearby 📍
            </button>
            <button 
              onClick={() => setView('seller')}
              className={`px-6 py-2 rounded-full font-bold transition ${view === 'seller' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Seller Portal 🏪
            </button>
          </nav>
    
          <main className="py-8 max-w-4xl mx-auto px-4">
            {view === 'buyer' ? <NearbyFeed /> : <SellerDashboard />}
          </main>
          
          <footer className="text-center py-8 text-gray-400 text-xs">
            Built for the HereJustNow Stateless Ghost Marketplace
          </footer>
        </div>
      );
    }
