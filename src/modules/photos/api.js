import { uploadBytes } from "firebase/storage";

export const Save = async (storageRef, file) => {
  try {
    const result = await uploadBytes(storageRef, file);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
