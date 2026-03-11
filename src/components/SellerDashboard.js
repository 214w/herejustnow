import React, { useState } from 'react';
    import { useLiveQuery } from 'dexie-react-hooks';
    import { db } from '../lib/db'; // Make sure this path points to your actual db.js file
    
    export default function SellerDashboard() {
      // Local Component State
      const [storeName, setStoreName] = useState('');
      const [itemName, setItemName] = useState('');
      const [itemPrice, setItemPrice] = useState('');
    
      // Observe local inventory reactively from IndexedDB
      const inventory = useLiveQuery(() => db.inventory.toArray());
    
      // Handle saving the store profile locally
      const handleUpdateStoreProfile = async (e) => {
        e.preventDefault();
        try {
          // Upserting the store profile. Using a hardcoded ID '1' since there is only one user per device.
          await db.stores.put({ id: 1, storeName: storeName, status: 'offline' });
          alert('Store profile saved locally!');
        } catch (error) {
          console.error('Failed to update store:', error);
        }
      };
    
      // Handle adding new items to the local inventory table
      const handleAddItem = async (e) => {
        e.preventDefault();
        if (!itemName || !itemPrice) return;
    
        try {
          await db.inventory.add({
            name: itemName,
            price: parseFloat(itemPrice),
            createdAt: Date.now()
          });
          // Clear inputs
          setItemName('');
          setItemPrice('');
        } catch (error) {
          console.error('Failed to add item:', error);
        }
      };
    
      // Handle deleting items from local inventory
      const handleDeleteItem = async (id) => {
        try {
          await db.inventory.delete(id);
        } catch (error) {
          console.error('Failed to delete item:', error);
        }
      };
    
      return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-md mx-auto space-y-6">
            
            {/* Header */}
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center">
              Seller Dashboard
            </h1>
    
            {/* 1. Store Profile Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">1. Store Setup</h2>
              <form onSubmit={handleUpdateStoreProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Store Name</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black p-3 border"
                    placeholder="e.g., Midnight Tacos"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gray-900 text-white font-medium p-3 rounded-lg hover:bg-gray-800 transition"
                >
                  Save Profile
                </button>
              </form>
            </div>
    
            {/* 2. Inventory Management Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">2. Add Inventory</h2>
              <form onSubmit={handleAddItem} className="space-y-4 mb-6">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black p-3 border"
                      placeholder="Item Name"
                      required
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black p-3 border"
                      placeholder="$0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-black text-white px-5 rounded-lg hover:bg-gray-800 transition font-medium"
                  >
                    Add
                  </button>
                </div>
              </form>
    
              {/* Render Inventory List */}
              <div className="space-y-3">
                {inventory?.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center italic">No items added yet. Your store is empty!</p>
                ) : (
                  inventory?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">${item.price.toFixed(2)}</span>
                        <button 
                          onClick={() => handleDeleteItem(item.id)} 
                          className="text-red-500 hover:text-red-700 text-sm font-bold tracking-wide"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
    
            {/* 3. The "Live" Handshake Button */}
            <div className="pt-4">
              <button
                // onClick={handleGoLive} <-- We will wire this up next!
                className="w-full bg-emerald-500 text-white font-extrabold text-xl p-4 rounded-2xl shadow-lg hover:bg-emerald-600 transition transform hover:-translate-y-1"
              >
                Go Live (1 Hour) 📍
              </button>
              <p className="text-xs text-center text-gray-500 mt-3 px-4">
                Location will be requested exactly once. Your store will automatically vanish from the map in 60 minutes.
              </p>
            </div>
            
          </div>
        </div>
      );
    }
    
