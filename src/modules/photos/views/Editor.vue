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

  <div>
    <h2>Filtros</h2>
    <div>
      <label for="filter">Filtro:</label>
      <select id="filter" v-model="selectedFilter">
        <option value="none">Nenhum</option>
        <option value="grayscale">Tons de Cinza</option>
        <option value="sepia">Sépia</option>
        <option value="noise">Ruido</option>
        <option value="pixelate">Pixel</option>
      </select>
      <div
        v-if="selectedFilter === 'brightness' || selectedFilter === 'contrast'"
      >
        <label for="filterValue">Valor:</label>
        <input
          type="range"
          id="filterValue"
          v-model="filterValue"
          :min="filterMinValue"
          :max="filterMaxValue"
          :step="filterStep"
        />
      </div>
      <button @click="Filtros">Aplicar</button>
      <button @click="resetFiltros">Redefinir</button>
    </div>
  </div>

  <div>
    <h2>Redimensionar</h2>
    <div>
      <label for="width">Largura:</label>
      <input
        type="number"
        id="width"
        v-model="newWidth"
        @input="updatePreview"
      />
      <label for="height">Altura:</label>
      <input
        type="number"
        id="height"
        v-model="newHeight"
        @input="updatePreview"
      />
      <button @click="resizeImage">Redimensionar</button>
    </div>
  </div>

  <div>
    <h2>Girar e inverter</h2>

    <button @click="rotateImage">Girar</button>
    <button @click="flipImage">Inverter</button>
  </div>

  <input type="file" @change="handleFileSelect" />
  <canvas ref="canvas"></canvas>
</template>

<script>
import { getStorage, ref, uploadBytes } from "firebase/storage";
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
    return {
      brightness: 0,
      contrast: 0,
      showCropArea: false,
      photo: null,
      showBrilho: false,
      showResize: false,
      showFiltros: false,
      selectedFilter: "none",
      canvas: null,
      image: null,
      newWidth: 0,
      newHeight: 0,
      filterValue: 0,
      filterMinValue: -100,
      filterMaxValue: 100,
      filterStep: 1,
      cropMode: false,
      cropStartPosition: { x: 0, y: 0 },
      angulo: 0,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.fabricCanvas = new fabric.Canvas(this.canvas);
  },
  methods: {
    rotateImage() {
      if (this.image) {
        this.angulo = this.angulo + 90;
        const rotationAngle = this.angulo;

        this.image.rotate(rotationAngle);
        this.canvas.renderAll();
      }
    },

    flipImage() {
      if (this.image) {
        this.image.flipX = !this.image.flipX;
        this.image.flipY = !this.image.flipY;
        this.canvas.renderAll();
      }
    },

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
    handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.photo = e.target.result;
      };

      reader.readAsDataURL(file);
    },

    Filtros() {
      if (this.image) {
        /*  this.image.filters = []; */

        switch (this.selectedFilter) {
          case "none":
            this.applyFilters();
            break;
          case "grayscale":
            this.image.filters.push(new fabric.Image.filters.Grayscale());
            this.applyFilters();
            break;
          case "sepia":
            this.image.filters.push(new fabric.Image.filters.Sepia());
            this.applyFilters();
            break;
          case "pixelate":
            this.image.filters.push(
              new fabric.Image.filters.Pixelate({
                blocksize: 5,
              })
            );
            this.applyFilters();
            break;
        }
      }
      this.canvas.renderAll();
    },

    applyFilters() {
      this.image.applyFilters();
      this.canvas.renderAll();
    },

    resetFiltros() {
      if (this.image) {
        this.image.filters = [];
        this.image.applyFilters();
        this.canvas.requestRenderAll();

        this.selectedFilter = "none";
        this.filterValue = 0;
      }
    },
    resetFilters() {
      if (this.image) {
        this.image.filters = [];
        this.image.applyFilters();
        this.canvas.requestRenderAll();
      }
    },
    updatePreview() {
      this.previewImage = this.image ? this.image.toDataURL() : "";
    },

    /* resizeImage() {
      if (this.image && this.newWidth > 0 && this.newHeight > 0) {
        this.image.scaleToWidth(this.newWidth);
        this.image.scaleToHeight(this.newHeight);
        this.canvas.requestRenderAll();
      } else if (this.image && this.newWidth > 0) {
        this.image.scaleToWidth(this.newWidth);
        this.canvas.requestRenderAll();
      } else if (this.image && this.newHeight > 0) {
        this.image.scaleToHeight(this.newHeight);
        this.canvas.requestRenderAll();
      }
    },
    deixa so o botao de altura e deixa escrito que a largura se altera proporcionalmente 
    */

    resizeImage() {
      if (this.image && this.newWidth > 0 && this.newHeight > 0) {
        this.image.scaleToWidth(this.newWidth);
        this.image.scaleToHeight(this.newHeight);
        this.canvas.requestRenderAll();
      } else if (this.image && this.newWidth > 0) {
        this.image.scaleToWidth(this.newWidth);
        this.canvas.requestRenderAll();
      } else if (this.image && this.newHeight > 0) {
        this.image.scaleToHeight(this.newHeight);
        this.canvas.requestRenderAll();
      }
    },

    resetFilter() {
      if (this.image) {
        this.image.filters = [];

        this.selectedFilter = "none";
        this.filterValue = 0;
      }
    },

    uploadFile() {
      const file = document.querySelector("#file-input").files[0];
      const storageRef = ref(
        getStorage(),
        "path/to/storage/folder/" + file.name
      );
      uploadBytes(storageRef, file)
        .then(() => {
          console.log("Arquivo enviado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao enviar o arquivo:", error);
        });
    },
  },
};
</script>
