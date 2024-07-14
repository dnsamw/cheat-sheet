import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import app from "../config/firebaseConfig";

const db = getFirestore(app);

const getAllItems = async () => {
  const itemsCollection = collection(db, "items");
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

export {getAllItems}