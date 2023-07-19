import { collection, query, getDocs } from "firebase/firestore";
import { storage, db } from "../../../firebase.config";

import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

// const storage = getStorage();
const listRef = ref(storage);

// salvar um dado em images no firestore usando userId real de quem está logado e salvando uma url fixa(ex: 'teste')
// no dashboard, buscar os dados da imagem no firestore e usar a url para buscar a imagem no storage

// item é o dado do firestore
// getDownloadUrl(ref(storage, item.url))

// listar os dados de imagens do firestore que tem o userId do usuário logado
// pegar cada uma das imagens(reais) do storage utilizando o caminho dos dados de imagem do firestore

//

export const listProjects = async () => {
  try {
    const res = await listAll(listRef);
    const items = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const data = await getMetadata(itemRef);
        return { ...data, url };
      })
    );
    return items;
  } catch (error) {
    console.log(error);
  }
};

export const infoImg = async () => {
  try {
    const querySnapshot = await getDocs(query(collection(db, "images")));
    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
   /*  console.log(data[2].nome); */
    return data;
  } catch (error) {
    console.log(error);
  }
};
