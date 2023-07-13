<template>
  <div>
    <div style="display: flex; justify-content: center; align-items: center">
      <input type="file" id="file-input" @change="handleFileChange" />
      <canvas ref="canvas"></canvas>

      <v-btn @click="openInfos">Infos</v-btn>
    </div>

    <div>
      <button @click="showCropArea = true">Recortar</button>
      <Cut v-if="showCropArea" @close="showCropArea = false" />

      <button @click="showBrilho = true">Brilho e Contraste</button>
      <Contrast v-if="showBrilho" @close="showBrilho = false" />

      <button @click="showResize = true">Redimensionar</button>
      <Resize v-if="showResize" @close="showResize = false" />

      <button @click="showFiltros = true">Filtros</button>
      <Filters v-if="showFiltros" @close="showFiltros = false" />
    </div>
  </div>

  <div v-if="showInfos">
    <div>
      <h2>Novo Post</h2>
    </div>
    <form @submit.prevent>
      <input v-model="nome" placeholder="Nome da foto" />
      <input v-model="dataEdicao" type="date" placeholder="Data Edição" />
      <input v-model="descricao" placeholder="Descrição" />

      <input v-model="medidas" placeholder="Altura x largura" />
      <input v-model="fotografo" placeholder="Nome do fotográfo" />

      <button @click="handleSave" variant="tonal">Salvar</button>
      <button @click="showInfos = false ">Cancelar</button>
    </form>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { photoStore } from "../store";
import Cut from "../componentes/Cut.vue";
import Contrast from "../componentes/Contrast.vue";
import Resize from "../componentes/Resize.vue";
import Filters from "../componentes/Filters.vue";
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";

const { content } = useStore();

export default {
  name: "PhotoEditor",
  components: {
    Cut,
    Contrast,
    Resize,
    Filters,
  },
  data() {
    return {
      showInfos: false,
      nome: "",
      dataEdicao: "",
      descricao: "",
      medidas: "",
      fotografo: "",
      imgRef: null,
      showBrilho: false,
      showResize: false,
      showFiltros: false,
      showCropArea: false,
    };
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.imgRef = file
      const reader = new FileReader();

      reader.onload = (e) => {
        this.canvas.clear();
        const dataURL = e.target.result;

        fabric.Image.fromURL(dataURL, (img) => {
          this.fabricImage = img;
          this.canvas.add(this.fabricImage);
        });
      };

      reader.readAsDataURL(file);
    },
    handleSave() {
      const payload = {
        nome: this.nome.valueOf(),
        dataEdicao: this.dataEdicao.valueOf(),
        descricao: this.descricao.valueOf(),
        medidas: this.medidas.valueOf(),
        fotografo: this.fotografo.valueOf(),
      };

      const imgPayload = this.imgRef;
      const res = content.photo.createItem(payload, imgPayload);

      if (res) {
        alert("criado com sucesso!");
      }
    },
    handleInfos(event) {
      this.imgRef = event.target.files[0];
    },
    openInfos() {
      this.showInfos = true;
    },
  },
  setup() {
    return {
      photoStore,
    };
  },
};
</script>

<style scoped>
canvas {
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80%;
}
</style>
