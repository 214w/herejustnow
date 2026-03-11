import React, { useState, useEffect } from 'react';
    import { useLiveQuery } from 'dexie-react-hooks';
    import { db } from '../lib/db';
    
    export default function SellerDashboard() {
      const [storeName, setStoreName] = useState('');
      const [itemName, setItemName] = useState('');
      const [itemPrice, setItemPrice] = useState('');
      const [timeLeft, setTimeLeft] = useState(null);
    
      const inventory = useLiveQuery(() => db.inventory.toArray());
      const store = useLiveQuery(() => db.stores.get(1));
    
      useEffect(() => {
        if (store?.locationStamp) {
          const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - store.locationStamp) / 1000);
            const remaining = 3600 - elapsed;
            if (remaining <= 0) {
              handleVanish();
              clearInterval(interval);
            } else {
              setTimeLeft(remaining);
            }
          }, 1000);
          return () => clearInterval(interval);
        } else {
          setTimeLeft(null);
        }
      }, [store?.locationStamp]);
    
      const handleUpdateStoreProfile = async (e) => {
        e.preventDefault();
        await db.stores.put({ id: 1, storeName, status: 'offline' });
        alert('Profile saved!');
      };
    
      const handleGoLive = () => {
        if (!navigator.geolocation) return alert('Geolocation not supported');
        navigator.geolocation.getCurrentPosition(async (pos) => {
          await db.stores.update(1, {
            locationStamp: Date.now(),
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            status: 'online'
          });
        }, (err) => alert('Location access denied'));
      };
    
      const handleVanish = async () => {
        await db.stores.update(1, { locationStamp: null, latitude: null, longitude: null, status: 'offline' });
        setTimeLeft(null);
      };
    
      const handleAddItem = async (e) => {
        e.preventDefault();
        await db.inventory.add({ name: itemName, price: parseFloat(itemPrice) });
        setItemName(''); setItemPrice('');
      };
    
      return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-md mx-auto space-y-6">
            <h1 className="text-3xl font-extrabold text-center">Seller Dashboard</h1>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">1. Store Setup</h2>
              <form onSubmit={handleUpdateStoreProfile} className="space-y-4">
                <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full rounded-lg p-3 border" placeholder="Store Name" required />
                <button type="submit" className="w-full bg-gray-900 text-white p-3 rounded-lg">Save Profile</button>
              </form>
            </div>
    
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">2. Inventory</h2>
              <form onSubmit={handleAddItem} className="space-y-4 mb-6">
                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Item Name" required />
                <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Price" required />
                <button type="submit" className="w-full bg-black text-white p-3 rounded-lg">Add Item</button>
              </form>
              {inventory?.map(item => (
                <div key={item.id} className="flex justify-between p-3 bg-gray-50 rounded-xl mb-2">
                  <span>{item.name}</span>
                  <button onClick={() => db.inventory.delete(item.id)} className="text-red-500 font-bold">X</button>
                </div>
              ))}
            </div>
    
            <div className="pt-4">
              <button 
                onClick={handleGoLive}
                disabled={!!timeLeft}
                className={`w-full text-white font-extrabold text-xl p-4 rounded-2xl shadow-lg transition ${timeLeft ? 'bg-gray-400' : 'bg-emerald-500 hover:bg-emerald-600'}`}
              >
                {timeLeft ? `Live: ${Math.floor(timeLeft/60)}m ${timeLeft%60}s` : 'Go Live (1 Hour) 📍'}
              </button>
              {timeLeft && (
                <button onClick={handleVanish} className="w-full mt-2 text-red-500 text-sm font-bold underline">End Session Now</button>
              )}
            </div>
          </div>
        </div>
      );
    }
