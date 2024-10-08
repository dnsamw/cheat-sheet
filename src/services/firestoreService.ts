import { collection, getDocs, doc, addDoc, getDoc, updateDoc, deleteDoc,serverTimestamp, query, where } from "firebase/firestore";
import {db, auth} from "../config/firebaseConfig";
import { I_CheatItem } from "../types/item";
import { I_User } from "../types/user";
import { signInWithEmailAndPassword } from "firebase/auth";


const itemsCollection = collection(db, "items");
const usersCollection = collection(db, "users");

//Notes
export const getAllNotes = async () => {
  const q = query(itemsCollection, where("type", "==", "note"));
  const notesSnapshot = await getDocs(q);
  
  const notesList = notesSnapshot.docs.map((doc) => ({
    id: doc.id,
    type: doc.data().type,
    title: doc.data().title,
    text: doc.data().text,
    codes: doc.data().codes,
    tags: doc.data().tags,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  }));

  return notesList;
};

// get all items
const getAllItems = async () => {
  const itemsSnapshot = await getDocs(itemsCollection);
  const itemsList = itemsSnapshot.docs.map((doc) => ({
    id: doc.id,
    type:doc.data().type,
    title:doc.data().title,
    text:doc.data().text,
    codes:doc.data().codes,
    tags:doc.data().tags,
    createdAt:doc.data().createdAt,
    updatedAt:doc.data().updatedAt
  }));  
  return itemsList;
};

export const getItemById = async (id: string) => {
  const docRef = doc(itemsCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { 
    id: docSnap.id, 
    type:docSnap.data().type,
    title:docSnap.data().title, 
    text:docSnap.data().text, 
    codes:docSnap.data().codes, 
    tags:docSnap.data().tags } ;
  return null;
};

export const createItem = async (item: Omit<I_CheatItem, 'id'>): Promise<string> => {
  console.log("CREATING FIREBASE SERVICE",item);
  const docRef = await addDoc(itemsCollection, {...item, createdAt: serverTimestamp(),updatedAt: serverTimestamp()});
  return docRef.id;
};

export const updateItem = async (id: string, item: Partial<I_CheatItem>): Promise<void> => {
  console.log("UPDATING FIREBASE SERVICE",item, id);
  const docRef = doc(itemsCollection, id);
  await updateDoc(docRef, {...item,updatedAt: serverTimestamp()});
};

export const deleteItem = async (id: string): Promise<void> => {
  const docRef = doc(itemsCollection, id);
  await deleteDoc(docRef);
};

// AUTH
export const login = async (email:string , password:string) => {
  try {
    return await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    // const userData = userDoc.data();
  } catch (error) {
    throw new Error("Invaqlid email or password");
  }
}

export const logout = async () => {
  await auth.signOut();
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

export const getUserbyUUID = async (uuid: string): Promise<any | null> => {
  const docRef = doc(usersCollection, uuid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  return null;
};

export {getAllItems}