import { openDB } from 'idb';

const dbPromise = () => {
  if (!('indexedDB' in window)) {
    throw new Error('Browser does not support IndexedDB');
  }
  return openDB('bäckereiDB', 1, {
    upgrade(db) {
      db.createObjectStore('products', {
        keyPath: 'ArtNr',
      });
    },
  });
};

const save = async (products) => {
  try {
    const db = await dbPromise();
    const tx = db.transaction('products', 'readwrite');
    const store = tx.objectStore('products');
    products.forEach((product) => {
      store.put(product.fields);
    });
    return tx.complete;
  } catch (error) {
    return error;
  }
};

const getOne = async (ArtNr) => {
  try {
    const db = await dbPromise();
    const tx = db.transaction('products', 'readonly');
    const store = tx.objectStore('products');
    return store.get(ArtNr);
  } catch (error) {
    return error;
  }
};

const getAll = async () => {
  try {
    const db = await dbPromise();
    const tx = db.transaction('products', 'readonly');
    const store = tx.objectStore('products');
    return store.getAll();
  } catch (error) {
    return error;
  }
};

export default {
  getOne,
  getAll,
  save,
};
