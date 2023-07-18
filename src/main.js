
import "../firebase.config";


import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import fabric from "fabric";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  }
})
import "@/modules/auth";
import "@/modules/user";
import "@/modules/photos";

const app = createApp(App);

app.use(router);

app.mount('#app');

app.use(vuetify)

