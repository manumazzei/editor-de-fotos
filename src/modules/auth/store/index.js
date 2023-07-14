import { reactive } from "vue";
import { signIn, signUp, signInGoogle, logOut } from "../api";

export const authStore = reactive({
  user: {},
  setUser(user) {
    this.user = user;
  },
  async signIn(email, password) {
    const res = await signIn(email, password);
    this.user = res;
    return res;
  },
  async signInGoogle() {
    const res = await signInGoogle();
    this.user = res;
    return res;
  },
  signUp: signUp,

  async logOut() {
    const res = await logOut();
    this.user = res;
    return res;
  },
});
