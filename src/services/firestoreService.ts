import { collection, getDocs, doc, addDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from "../config/firebaseConfig";
import { I_CheatItem } from "../types/item";
import { I_User } from "../types/user";


const itemsCollection = collection(db, "items");
const usersCollection = collection(db, "users");

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


// USERS

export const createUser = async (user: Omit<I_User, 'id'>): Promise<string> => {
  const docRef = await addDoc(usersCollection, user);
  return docRef.id;
};

export const updateUser = async (id: string, user: Partial<I_CheatItem>): Promise<void> => {
  const docRef = doc(usersCollection, id);
  await updateDoc(docRef, user);
};

export const deleteUser = async (id: string): Promise<void> => {
  const docRef = doc(usersCollection, id);
  await deleteDoc(docRef);
};

export {getAllItems}