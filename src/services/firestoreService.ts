import { getFirestore, collection, getDocs, doc, addDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import app from "../config/firebaseConfig";
import { I_CheatItem } from "../types/item";

const db = getFirestore(app);
const itemsCollection = collection(db, "items");

const getAllItems = async () => {
  const itemsSnapshot = await getDocs(itemsCollection);
  const itemsList = itemsSnapshot.docs.map((doc) => ({
    id: doc.id,
    title:doc.data().title,
    text:doc.data().text,
    codes:doc.data().codes,
    tags:doc.data().tags
  }));
  return itemsList;
};

export const getItemById = async (id: string) => {
  const docRef = doc(itemsCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, 
    title:docSnap.data().title, 
    text:docSnap.data().text, 
    codes:docSnap.data().codes, 
    tags:docSnap.data().tags } ;
  return null;
};

export const createItem = async (item: Omit<I_CheatItem, 'id'>): Promise<string> => {
  const docRef = await addDoc(itemsCollection, item);
  return docRef.id;
};

export const updateItem = async (id: string, item: Partial<I_CheatItem>): Promise<void> => {
  const docRef = doc(itemsCollection, id);
  await updateDoc(docRef, item);
};

export const deleteItem = async (id: string): Promise<void> => {
  const docRef = doc(itemsCollection, id);
  await deleteDoc(docRef);
};

export {getAllItems}