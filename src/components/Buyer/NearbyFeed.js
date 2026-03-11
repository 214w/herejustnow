import React, { useState, useEffect } from 'react';
    import { db } from '../../lib/db';
    
    export default function NearbyFeed() {
      const [activeStores, setActiveStores] = useState([]);
    
      // In a full implementation, this would fetch from the stateless relay/WebSocket
      // For now, it reads from the local 'stores' table to demonstrate the loop
      useEffect(() => {
        const fetchStores = async () => {
          const allStores = await db.stores
            .filter(s => s.status === 'online' && s.locationStamp > (Date.now() - 3600000))
            .toArray();
          setActiveStores(allStores);
        };
    
        fetchStores();
        const interval = setInterval(fetchStores, 30000); // Refresh every 30s
        return () => clearInterval(interval);
      }, []);
    
      return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-md mx-auto space-y-6">
            <h1 className="text-3xl font-extrabold text-center text-gray-900">Nearby Now 📍</h1>
            <p className="text-center text-gray-500 text-sm italic">Showing stores active in the last hour</p>
            
            <div className="space-y-4">
              {activeStores.length === 0 ? (
                <div className="text-center py-20">
                  <span className="text-5xl block mb-4">👻</span>
                  <p className="text-gray-400">It's a ghost town... No active stores nearby.</p>
                </div>
              ) : (
                activeStores.map(store => (
                  <div key={store.id} className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-emerald-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{store.storeName}</h3>
                        <p className="text-xs text-gray-400 font-mono mt-1">
                          LOC: {store.latitude.toFixed(4)}, {store.longitude.toFixed(4)}
                        </p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                        LIVE
                      </span>
                    </div>
                    <button className="w-full mt-4 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">
                      View Menu
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
    }
