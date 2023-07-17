<script setup>
import { RouterView } from "vue-router";
import { useStore } from "./composables/useStore";

const { content } = useStore();
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
