import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('newNote', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the jateDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('newNote', 'readwrite');
  const store = tx.objectStore('newNote');
  const request = store.put({content, id: 1});
  const result = await request;
  
  if (!result) {
    console.error('putDb not implemented')
  } else {
    console.log('Data saved to the database', result);
  }
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all code content from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('newNote', 'readonly');
  const store = tx.objectStore('newNote');
  const request = store.get(1);
  const result = await request;
 
  if (!result) {
    console.error('getDb not implemented');
  } else {
    console.log('result.value', result);
    return result.content;
  }
}
initdb();
