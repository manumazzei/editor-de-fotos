import { reactive } from "vue";
import { listPhotos } from "../api";

export const listStore = reactive({
  photo: {},
  photos: [],
  setList(photo) {
    this.photo = photo;
  },

  async listPhotos() {
    const res = await listPhotos();
    this.photos = res;
    return res;
  },
});
