import { router } from "@/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const routes = [
  {
    path: "/editor",
    name: "editor",
    component: () => import("../views/Editor.vue"),
    meta: {
      requiresAuth: true,
    },

  },
]; 

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListner = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListner();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async(to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Faça login!");
      next("/login");
    }
  } else {
    next();
  }
});