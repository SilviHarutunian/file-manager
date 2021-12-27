import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";

export const allElementsRef = collection(db, "allElements");
export const trashElementsRef = collection(db, "trashElements");

export const getElements = async () => {
  const data = await getDocs(allElementsRef);
  return data.docs.map((doc) => {
    const { parentId, name, type, content } = doc.data();
    return { id: doc.id, name, parentId, type, content };
  });
};

export const getTrashedElements = async () => {
  const data = await getDocs(trashElementsRef);

  return data.docs.map((doc) => {
    const { parentId, name, type, content } = doc.data();
    return { id: doc.id, name, parentId, type, content };
  });
};
