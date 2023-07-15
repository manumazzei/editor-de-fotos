<template>
  <div>
    <h2 @click="showBrilho = true">Brilho</h2>
    <Contrast
      v-if="showBrilho"
      :image="image"
      @filter="applyFilters"
      @reset="resetFilters"
      @close="showBrilho = false"
    />
  </div>

  <h2 @click="showResize = true">Redimensionar</h2>
  <Resize
    v-if="showResize"
    :image="image"
    @filter="applyFilters"
    @close="showResize = false"
  />

  <h2 @click="showFiltros = true">Filtros</h2>
  <Filters
    v-if="showFiltros"
    :image="image"
    @filter="applyFilters"
    @reset="resetFilters"
    @close="showFiltros = false"
  />

  <h2 @click="showSpin = true">Girar e inverter</h2>
  <Spin
    v-if="showSpin"
    :image="image"
    @filter="applyFilters"
    @event="applyFilters"
    @close="showSpin = false"
  />

  <input type="file" @change="handleFileSelect" />
  <canvas ref="canvas"></canvas>
</template>

<script>
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Spin from "../componentes/Spin.vue";
import Contrast from "../componentes/Contrast.vue";
import Resize from "../componentes/Resize.vue";
import Filters from "../componentes/Filters.vue";

export default {
  name: "PhotoEditor",
  components: {
    Spin,
    Contrast,
    Resize,
    Filters,
  },
  data() {
    return {
      showSpin: false,
      showBrilho: false,
      showResize: false,
      showFiltros: false,
      image: null,
      canvas: null,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.fabricCanvas = new fabric.Canvas(this.canvas);
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataURL = e.target.result;

        fabric.Image.fromURL(dataURL, (img) => {
          this.image = img;

          this.canvas = new fabric.Canvas(this.$refs.canvas);
          this.canvas.add(this.image);
        });
      };

      reader.readAsDataURL(file);
    },

    applyFilters() {
      this.image.applyFilters();
      this.canvas.renderAll();
    },

    resetFilters() {
      if (this.image) {
        this.image.filters = [];
        this.image.applyFilters();
        this.canvas.requestRenderAll();
      }
    },
  },
};
</script>
