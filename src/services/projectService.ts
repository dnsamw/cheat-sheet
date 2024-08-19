import { collection, getDocs, doc, addDoc, getDoc, updateDoc, deleteDoc,serverTimestamp, query, where } from "firebase/firestore";
import {db} from "../config/firebaseConfig";
import { I_Project } from "../types/project";

const itemsCollection = collection(db, "items");

//Projects
export const getAllProjects = async () => {
  const q = query(itemsCollection, where("type", "==", "project"));
  const projectsSnapshot = await getDocs(q);
  
  const projectsList = projectsSnapshot.docs.map((doc) => ({
    id: doc.id,
    type: doc.data().type,
    name: doc.data().name,
    description: doc.data().description,
    tags: doc.data().tags,
    repositories: doc.data().repositories,
    environments: doc.data().environments,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  }));

  return projectsList;
};

export const getProjectById = async (id: string) => {
    const docRef = doc(itemsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.type === 'project') {
        return { 
          id: docSnap.id, 
          type: data.type,
          name: data.name, 
          description: data.description, 
          tags: data.tags,
          repositories: data.repositories, 
          environments: data.environments, 
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };
      }
    }
    
    return null;
  };

  export const createProject = async (project: Omit<I_Project, 'id' | 'type' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    console.log("CREATING PROJECT", project);
    const docRef = await addDoc(itemsCollection, {
      ...project,
      type: 'project',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  };
  
  export const updateProject = async (id: string, project: Partial<Omit<I_Project, 'id' | 'type' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
    console.log("UPDATING PROJECT", project, id);
    const docRef = doc(itemsCollection, id);
    await updateDoc(docRef, {
      ...project,
      updatedAt: serverTimestamp()
    });
  };
  
  export const deleteProject = async (id: string): Promise<void> => {
    const docRef = doc(itemsCollection, id);
    await deleteDoc(docRef);
  };
