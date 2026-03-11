import React, { useState } from 'react';
    import { db } from '../lib/db';
    
    function SellerDashboard() {
      const [itemName, setItemName] = useState('');
      const [price, setPrice] = useState('');
      const [storeId, setStoreId] = useState('1'); // Assuming a default or selected storeId
    
      const addItem = async () => {
        if (itemName && price) {
          try {
            await db.inventory.add({
              storeId: parseInt(storeId),
              itemName,
              price: parseFloat(price)
            });
            setItemName('');
            setPrice('');
            alert('Item added!');
          } catch (error) {
            console.error("Failed to add item: ", error);
            alert('Failed to add item.');
          }
        } else {
          alert('Please enter item name and price.');
        }
      };
    
      return (
        <div>
          <h2>Seller Dashboard</h2>
          <div>
            <label>Store ID: </label>
            <input 
              type="number" 
              value={storeId} 
              onChange={(e) => setStoreId(e.target.value)} 
              placeholder="Store ID" 
            />
          </div>
          <div>
            <label>Item Name: </label>
            <input 
              type="text" 
              value={itemName} 
              onChange={(e) => setItemName(e.target.value)} 
              placeholder="Item Name" 
            />
          </div>
          <div>
            <label>Price: </label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="Price" 
            />
          </div>
          <button onClick={addItem}>Add Item to Inventory</button>
        </div>
      );
    }
    
    export default SellerDashboard;
    
