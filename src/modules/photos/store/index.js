import { ref } from "firebase/storage";
import { storage } from "../../../../firebase.config";
import { Save } from "../api";
import { reactive } from "vue";

export const photoStore = reactive({
  uploadedPhoto: null,
  async upload(name = "new-photo", file) {
    const storageRef = ref(storage, name);
    return await Save(storageRef, file);
  },
});
