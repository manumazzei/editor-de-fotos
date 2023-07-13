
import "../firebase.config";
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import fabric from 'fabric';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
import "@/modules/auth";
import "@/modules/photos";

const app = createApp(App);

app.use(router);

app.mount('#app');

app.use(vuetify)

