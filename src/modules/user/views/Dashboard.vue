<script setup>
import { ref, onMounted } from "vue";
import { listStore } from "../store";
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";

const { content } = useStore();

const router = useRouter();

const files = ref([]);

onMounted(async () => {
  listStore.listProjects();
  await listStore.infoImg();
  files.value = listStore.data;
});

function startEdit() {
  router.push("/editor");
}

function logOut() {
  content.auth.logOut();
  router.push("/");
}
</script>

<template>
  <v-sheet
    class="page pt-10 bg-grey-lighten-3 d-flex flex-column justify-center align-center"
  >
    <p class="text-teal-darken-3 text-h2">Feed</p>
    <div class="btn d-flex justify-space-between">
      <v-btn class="text-teal-darken-3 rounded-xl" @click="startEdit">Criar novo post</v-btn>
      <v-btn class="text-teal-darken-3 rounded-xl" @click="logOut">Log Out</v-btn>
    </div>
    <v-card width="80%" class="bg-grey-lighten-4 overflow-auto pr-2 mt-4">
      <v-list
        class="teste2 bg-transparent"
        v-for="data in listStore.data"
        :key="data"
      >
        <v-card
          class="mb-4 d-flex flex-row-reverse"
          elevation="12"
          rounded="xl"
        >
          <div
            class="w35 d-flex flex-column justify-center align-start text-grey-darken-3 text-subtitle-1 my-4"
          >
            <v-list-item>Nome: {{ data.nome }}</v-list-item>
            <v-list-item>Fotográfo: {{ data.fotografo }}</v-list-item>
            <v-list-item>Descrição: {{ data.descricao }}</v-list-item>
            <v-list-item>Dimensões: {{ data.medidas }}</v-list-item>
            <v-list-item>Data da edição: {{ data.dataEdicao }}</v-list-item>
            <v-list-item>id: {{ data.id }}</v-list-item>
          </div>
          <div
            class="w100 bg-transparent d-flex flex-column align-center justify-center"
          >
            <v-list
              class="w100 bg-transparent"
              v-for="photo in listStore.photos"
              :key="photo"
            >
              <v-list-item
                class="ma-8 pa-0 bg-transparent d-flex justify-center align-center"
                v-if="photo.name === data.id"
              >
                <!-- <p class="text-weight-bold text-h4">{{ photo.name }}</p> -->
                <img class="photo" :src="photo.url" />
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-list>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.page {
  max-width: 100vw;
  max-height: 100vh;
}
.btn {
  width: 80vw;
}
::-webkit-scrollbar {
  width: 10px;
  box-shadow: inset 0 0 1px #d1d4d4;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: #577b7c;
  border-radius: 5px;
}
.w35 {
  width: 35%;
}
.w100 {
  width: 100%;
}
.photo {
  width: 750px;
}
</style>