import { reactive } from "vue";
import { listProjects, infoImg } from "../api";

export const listStore = reactive({
  photo: {},
  photos: [],
  data: {},
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
  async infoImg() {
    const res = await infoImg();
    this.data = res;
    return res;
  },
});
