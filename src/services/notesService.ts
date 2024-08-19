import { collection, getDocs, doc, addDoc, getDoc, updateDoc, deleteDoc,serverTimestamp, query, where } from "firebase/firestore";
import {db} from "../config/firebaseConfig";


const itemsCollection = collection(db, "items");

interface I_Note {
    id?: string;
    type: 'note';
    title: string;
    text: string;
    codes?: string[];
    tags?: string[];
    createdAt?: any;
    updatedAt?: any;
  }

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

export const getNoteById = async (id: string) => {
    const docRef = doc(itemsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.type === 'note') {
        return { 
          id: docSnap.id, 
          type: data.type,
          title: data.title, 
          text: data.text, 
          codes: data.codes, 
          tags: data.tags,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };
      }
    }
    
    return null;
  };

  export const createNote = async (note: Omit<I_Note, 'id' | 'type' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    console.log("CREATING NOTE", note);
    const docRef = await addDoc(itemsCollection, {
      ...note,
      type: 'note',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  };
  
  export const updateNote = async (id: string, note: Partial<Omit<I_Note, 'id' | 'type' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
    console.log("UPDATING NOTE", note, id);
    const docRef = doc(itemsCollection, id);
    await updateDoc(docRef, {
      ...note,
      updatedAt: serverTimestamp()
    });
  };
  
  export const deleteNote = async (id: string): Promise<void> => {
    const docRef = doc(itemsCollection, id);
    await deleteDoc(docRef);
  };
