<template>
  <div>
    <div style="display: flex; justify-content: center; align-items: center">
      <input type="file" id="file-input" @change="handleFileChange" />
      <button @click="uploadFile">Salvar</button>
      <canvas ref="canvas"></canvas>
    </div>

    <div style="width: 100%; display: inline-block">
      <Cut />
      <Contrast />
      <Resize />
      <Filters />
    </div>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { photoStore } from "../store";
import Cut from "../componentes/Cut.vue";
import Contrast from "../componentes/Contrast.vue";
import Resize from "../componentes/Resize.vue";
import Filters from "../componentes/Filters.vue";

export default {
  name: "PhotoEditor",
  components: {
    Cut,
    Contrast,
    Resize,
    Filters,
  },
  data() {
    return {};
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
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

    uploadFile() {
      const file = document.querySelector("#file-input").files[0];
      this.photoStore.upload(file.name, file); // se quiser trocar, revisar esta linha
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
