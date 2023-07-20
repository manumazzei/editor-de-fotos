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

// export const listPhotos = async () => {
//   try {
//     const res = await listAll(listRef);
//     const items = await Promise.all(
//       res.items.map(async (itemRef) => {
//         const url = await getDownloadURL(itemRef);
//         const data = await getMetadata(itemRef);
//         return { ...data, url };
//       })
//     );
//     return items;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const listPhotos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "images"));
    const data = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        // pegar a imagem do storage
        const imageRef = ref(storage, `${doc.id}`);

        const url = await getDownloadURL(imageRef);
        return { id: doc.id, url, ...doc.data() };
      })
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
