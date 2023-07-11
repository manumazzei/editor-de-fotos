import { reactive } from "vue";
import { listProjects } from "../api";

export const listStore = reactive ({
    photo: {},
    setList (photo) {
        this.photo = photo;
    },
    async listPhoto(photo) {
        const res = await this.listPhoto(photo);
        this.photo = res;
        return res;
    },
    listProjects
})

