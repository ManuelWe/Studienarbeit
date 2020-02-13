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
      db.createObjectStore('images', {
        keyPath: 'ArtNr',
      });
    },
  });
};

const save = async (images) => {
  try {
    const db = await dbPromise();
    const tx = db.transaction('images', 'readwrite');
    const store = tx.objectStore('images');
    images.forEach((image) => {
      store.put(image);
    });
    return tx.complete;
  } catch (error) {
    return error;
  }
};

const getOne = async (ArtNr) => {
  try {
    const db = await dbPromise();
    const tx = db.transaction('images', 'readonly');
    const store = tx.objectStore('images');
    return store.get(ArtNr);
  } catch (error) {
    return error;
  }
};

const getAll = async () => {
  try {
    const db = await dbPromise();
    const tx = db.transaction('images', 'readonly');
    const store = tx.objectStore('images');
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
