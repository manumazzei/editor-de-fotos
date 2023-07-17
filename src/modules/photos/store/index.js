import { ref } from "firebase/storage";
import { storage } from "../../../../firebase.config";
import { Save, createItem } from "../api";
import { reactive } from "vue";

export const photoStore = reactive({
  uploadedPhoto: null,
  async upload(name = "new-photo", file) {
    const storageRef = ref(storage, name);
    return await Save(storageRef, file);
  },
  dbItems: [],
  async getItems() {
    const res = await getItems();
    this.dbItems = res;
  },
  async createItem(payload, image) {
    const res = await createItem(payload, image);
    this.dbItems.push(res);
    return res;
  },
});

export const itemsStore = reactive({});
