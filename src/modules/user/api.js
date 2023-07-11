import { getStorage, ref, listAll } from "firebase/storage";

const storage = getStorage();
const listRef = ref(storage, "files/uid");

export const listProjects = () => {
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        listAll(folderRef).then((folderRes) => {
          const photo = folderRes
        });
      });
      res.items.forEach((itemRef) => {
        listAll(itemRef).then((itemRes) => {
          const item = itemRes
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
