import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log("Content have been added to the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.add({ id: 1, value: content });
  const result = await request;
  console.log("Data have been added successfully", result.jate);

  if (err) {
    console.error("putDb not implemented");
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  // Open the database
  const jateDb = await openDB("jate", 1);
  // Begin a new transaction
  const tx = jateDb.transaction("jate", "readonly");
   // Access the object store
  const store = tx.objectStore("jate");
  // Get all the content from the object store
  const request = store.getAll(1);
  // Wait for the request to complete
  const result = await request;
  if (result.length > 0) {
    console.log('result.value', result.jate);
    return result.jate;
  } else {
    // Log if there is no data
    console.log('getDb is not able to be implemented');
  }
  
}
initdb();
