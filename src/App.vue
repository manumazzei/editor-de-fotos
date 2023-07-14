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
  <RouterView />
</template>

<style scoped>

</style>


