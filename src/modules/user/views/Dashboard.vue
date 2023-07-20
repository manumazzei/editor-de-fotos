<script setup>
import { ref, onMounted } from "vue";
import { listStore } from "../store";
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";
import Loading from "../components/Loading.vue";

const { content } = useStore();

const router = useRouter();

const files = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    await listStore.listPhotos();
    console.log(listStore.photo, listStore.photos);
    files.value = listStore.photos;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

function logOut() {
  content.auth.logOut();
  router.push("/");
}
function createPost() {
  router.push("/editor");
}
</script>

<template>
  <Loading v-if="loading"></Loading>

  <v-sheet
    class="bg-grey-darken-4 d-flex flex-column justify-center align-center"
    style="
      max-width: 100vw;
      max-height: 100vh;
      background-color: rgba(148, 184, 182, 0.308);
    "
  >
    <header
      style="width: 100vw; height: 10vh"
      class="d-flex flex-column justify-center align-center"
    >
      <div class="d-flex justify-space-between align-center" style="width: 95%">
        <v-btn
          class="text-teal-darken-3 rounded-xl"
          style="font-family: 'Manrope', sans-serif; font-size: 1rem"
          color="grey-lighten-2"
          @click="logOut"
          >Log Out</v-btn
        >
        <h1
          class="py-2"
          style="
            font-family: 'Bad Script', cursive;
            font-size: 3rem;
            color: rgb(102, 184, 187);
          "
        >
          Artfy Feed
        </h1>
        <v-btn
          class="text-teal-darken-3 rounded-xl"
          style="font-family: 'Manrope', sans-serif; font-size: 1rem"
          color="grey-lighten-2"
          @click="createPost"
          >Criar novo post</v-btn
        >
      </div>
    </header>
    <v-card width="60%" class="bg-transparent overflow-auto pr-2 mt-4">
      <v-list
        class="teste2 bg-transparent"
        v-for="photo in listStore.photos"
        :key="photo"
      >
        <v-card
          class="mb-4 bg-grey-lighten-2 d-flex flex-row-reverse justify-center align-center"
          elevation="12"
          rounded="xl"
        >
          <div
            class="d-flex flex-column justify-center align-start text-grey-darken-3 my-4"
            style="
              width: 35%;
              font-family: 'Manrope', sans-serif;
              font-size: 1.3rem;
            "
          >
            <v-list-item class="text-h5">Nome: {{ photo.nome }}</v-list-item>
            <v-list-item class="text-subtitle-1 mb-12"
              >Fotográfo: {{ photo.fotografo }}</v-list-item
            >
            <v-list-item>Descrição: {{ photo.descricao }}</v-list-item>
            <v-list-item class="text-subtitle-1"
              >Dimensões: {{ photo.medidas }}cm</v-list-item
            >
            <v-list-item class="text-subtitle-1"
              >Data da edição: {{ photo.dataEdicao }}</v-list-item
            >
          </div>
          <div class="bg-transparent" style="width: 100%">
            <div class="bg-transparent" style="width: 100%">
              <v-list-item
                class="ma-8 pa-0 bg-transparent d-flex justify-center align-center"
              >
                <img
                  style="max-width: 750px; max-height: 600px"
                  :src="photo.url"
                />
              </v-list-item>
            </div>
          </div>
        </v-card>
      </v-list>
    </v-card>
  </v-sheet>
</template>

<style scoped>
::-webkit-scrollbar {
  margin-top: 20px;
  width: 10px;
  box-shadow: inset 0 0 1px #242424;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: rgb(102, 184, 187);
  border-radius: 5px;
}
</style>
