import Dexie from 'dexie';
    export const db = new Dexie('HereJustNowDB');
    db.version(1).stores({
      stores: '++id, name, locationStamp, latitude, longitude',
      inventory: '++id, storeId, itemName, price'
    });
