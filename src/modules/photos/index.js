import router from "@/router";
import { routes } from "./router";
import { photoStore } from "./store";
import { useStore } from "../../composables/useStore";

//registrar a store local
const store = useStore();
store.registerModule("photo", photoStore);

//registrar as rotas locais
routes.forEach((route) => {
  router.addRoute(route);
});
