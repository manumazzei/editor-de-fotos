<template>
  <div>
    <h2>Lista de Arquivos</h2>
    <ul>
      <li v-for="photo in listStore.photos" :key="photo">
        <h2>{{ photo.name }}</h2>
        <img :src="photo.url" width="200" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import { listStore } from "../store";
export default {
  data() {
    return {
      files: [],
    };
  },
  mounted() {
    this.listStore.listProjects();
  },
  methods: {

  },
  setup() {
    return {
      listStore,
    };
  },
};
</script>
