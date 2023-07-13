import {
  uploadBytes,
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase.config";

const store = getStorage();
const listRef = ref(storage);
/* getDocs() */

// docRef.data()
// const imagem =  await getDownloadURL(ref(storage, `${docRef.id}`))

export async function createItem(payload, image) {
  const docRef = await addDoc(collection(db, "images"), payload);

  console.log("Imagem aqui", image);
  const imageRef = ref(storage, `${docRef.id}`);

  uploadBytes(imageRef, image);

  return docRef;
}

export const Save = async (storageRef, file) => {
  try {
    const result = await uploadBytes(storageRef, file);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};

/* 
export const Save = async (storageRef, file) => {
  try {
    const result = await uploadBytes(storageRef, file);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}; */
