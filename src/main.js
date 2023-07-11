import './assets/main.css'
import "../firebase.config";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@/modules/auth";
import "@/modules/user";

const app = createApp(App)

app.use(router)

app.mount('#app')
