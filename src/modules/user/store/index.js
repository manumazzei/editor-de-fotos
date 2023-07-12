import { reactive } from "vue";
import { listProjects } from "../api";

export const listStore = reactive({
  photo: {},
  photos: [],
  setList(photo) {
    this.photo = photo;
  },
  async listPhoto(photo) {
    const res = await this.listPhoto(photo);
    this.photo = res;
    return res;
  },
  async listProjects() {
    const res = await listProjects();
    this.photos = res;
    return res;
  },
});
