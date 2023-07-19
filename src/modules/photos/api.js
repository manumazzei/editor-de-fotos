import {
  uploadBytes,
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  uploadString,
} from "firebase/storage";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { storage, db } from "../../../firebase.config";
/* 
const store = getStorage(); */
const listRef = ref(storage);
/* getDocs() */

// docRef.data()
// const imagem =  await getDownloadURL(ref(storage, `${docRef.id}`))

export async function createItem(payload, image) {
  try {
    const docRef = await addDoc(collection(db, "images"), payload);

    const imageRef = ref(storage, `${docRef.id}`);

    await uploadString(imageRef, image, "data_url");

    return docRef;
  } catch (err) {
    console.error(err);
    return;
  }
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
