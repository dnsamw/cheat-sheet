import { collection, getDocs, doc, addDoc, getDoc, updateDoc, deleteDoc,serverTimestamp, query, where } from "firebase/firestore";
import {db} from "../config/firebaseConfig";
import { I_Article } from "../types/article";


const itemsCollection = collection(db, "items");


//Notes
export const getAllArticles = async () => {
  const q = query(itemsCollection, where("type", "==", "article"));
  const acrticlesSnapshot = await getDocs(q);
  
  const articlesList = acrticlesSnapshot.docs.map((doc) => ({
    id: doc.id,
    type: doc.data().type,
    title: doc.data().title,
    thumbnailUrl: doc.data().thumbnailUrl,
    body: doc.data().body,
    tags: doc.data().tags,
    project: doc.data().project,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  }));

  return articlesList;
};

export const getArticleById = async (id: string) => {
    const docRef = doc(itemsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.type === 'article') {
        return { 
          id: docSnap.id, 
          type: data.type,
          title: data.title, 
          thumbnailUrl: data.thumbnailUrl, 
          body: data.body, 
          tags: data.tags,
          project: data.project, 
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };
      }
    }
    
    return null;
  };

  export const createArticle = async (article: Omit<I_Article, 'id' | 'type' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    console.log("CREATING ARTICLE", article);
    const docRef = await addDoc(itemsCollection, {
      ...article,
      type: 'article',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  };
  
  export const updateArticle = async (id: string, article: Partial<Omit<I_Article, 'id' | 'type' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
    console.log("UPDATING ARTICLE", article, id);
    const docRef = doc(itemsCollection, id);
    await updateDoc(docRef, {
      ...article,
      updatedAt: serverTimestamp()
    });
  };
  
  export const deleteArticle = async (id: string): Promise<void> => {
    const docRef = doc(itemsCollection, id);
    await deleteDoc(docRef);
  };
