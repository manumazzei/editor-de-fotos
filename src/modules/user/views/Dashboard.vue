<template>
  <div>
    <h2>Lista de Arquivos</h2>
    <ul>
      <li v-for="file in files" :key="file.name">
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { storage } from "@/firebase";

export default {
  data() {
    return {
      files: [],
    };
  },
  created() {
    this.listFiles();
  },
  methods: {
    async listFiles() {
      try {
        const storageRef = storage.ref();
        const filesRef = storageRef.child();

        const filesSnapshot = await filesRef.listAll();
        const files = filesSnapshot.items.map((item) => item.name);

        this.files = files;
      } catch (error) {
        console.error("Erro ao listar os arquivos:", error);
      }
    },
  },
};
</script>
