<script setup>
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";

const { content } = useStore();

const router = useRouter();

function logOut() {
  content.auth.logOut();
  router.push("/");
}
</script>

<template>
  <div class="about">
    <h1>DASHBOARD</h1>
    <p>TESTE</p>
    <v-btn @click="logOut">log out</v-btn>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>