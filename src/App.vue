<script setup>

import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from "vue";
import { useStore } from "./composables/useStore";

const { content } = useStore();
const { auth } = content;
onMounted(() => {
  const user = JSON.parse(
    localStorage.getItem(
      "firebase:authUser:0amaGqvizzUGksrJd323rpK9Wqt2:[DEFAULT]"
      
    )
  );

  if (user) {
    auth.setUser(user);
  }
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="/logo.png" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/editor">Editor</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>


