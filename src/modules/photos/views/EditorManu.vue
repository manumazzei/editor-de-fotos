<template>
    <!--  <input type="file" @change="handleFileSelect" />
    <v-sheet
      class="d-flex justify-center align-center"
      color="rgb(245, 245, 245)"
      v-if="photo"
    >
   
      <v-card class="pa-5 card-animation">
        <img :src="photo" ref="canvas" />
      </v-card>
    </v-sheet> -->
  
    <div>
      <h2>Brilho</h2>
      <input type="file" @change="handleFileSelect" />
      <canvas ref="canvas"></canvas>
      <label for="brightness">Brilho:</label>
      <input
        type="range"
        id="brightness"
        v-model="brightness"
        min="-100"
        max="100"
        step="1"
      />
      <label for="contrast">Contraste:</label>
      <input
        type="range"
        id="contrast"
        v-model="contrast"
        min="-100"
        max="100"
        step="1"
      />
      <button @click="brilhoEcontraste">Aplicar</button>
      <button @click="resetFilters">Redefinir</button>
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
  
  <!--   <div>
      <h2>Recortar</h2>
      <button @click="cropImage">Recortar</button>
      <button @click="confirmCrop">Salvar</button>
    </div> -->
  
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
  
    <!--  <v-sheet color="rgb(245, 245, 245)" class="d-flex flex-column w-50 mt-8">
        <v-btn @click="showCropArea = true" class="mb-2" disabled>Recortar</v-btn>
        <Cut v-if="showCropArea" :photo="photo" @close="showCropArea = false" />
  
        <v-btn @click="showBrilho = true" class="mb-2">Brilho e Contraste</v-btn>
        <Contrast
          v-if="showBrilho"
          :photo="photo"
          @close="showBrilho = false"
          @filter="contrast"
        />
  
        <v-btn @click="showResize = true" class="mb-2">Redimensionar</v-btn>
        <Resize v-if="showResize" :photo="photo" @close="showResize = false" />
  
        <v-btn @click="showFiltros = true" class="mb-2">Filtros</v-btn>
        <Filters v-if="showFiltros" :photo="photo" @close="showFiltros = false" />
      </v-sheet> -->
  </template>
  
  <script>
  import { getStorage, ref, uploadBytes } from "firebase/storage";
  import { fabric } from "fabric";
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
        previewImage: "",
        filterValue: 0,
        filterMinValue: -100,
        filterMaxValue: 100,
        filterStep: 1,
        cropMode: false,
        cropStartPosition: { x: 0, y: 0 },
      };
    },
    mounted() {
      this.canvas = this.$refs.canvas;
      this.fabricCanvas = new fabric.Canvas(this.canvas);
    },
    methods: {
      rotateImage() {
        if (this.image) {
          const rotationAngle = 90;
  
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
      cropImage() {
        if (
          this.image &&
          this.image.cropX >= 0 &&
          this.image.cropY >= 0 &&
          this.image.cropWidth > 0 &&
          this.image.cropHeight > 0
        ) {
          const croppedX = this.image.cropX * this.image.width;
          const croppedY = this.image.cropY * this.image.height;
          const croppedWidth = this.image.cropWidth * this.image.width;
          const croppedHeight = this.image.cropHeight * this.image.height;
          const cropped = new fabric.Image(this.image.getElement(), {
            left: croppedX,
            top: croppedY,
            width: croppedWidth,
            height: croppedHeight,
            scaleX: 1 / this.image.scaleX,
            scaleY: 1 / this.image.scaleY,
          });
          this.canvas.remove(this.image);
          this.canvas.add(cropped);
          this.canvas.renderAll();
        }
      },
  
      confirmCrop() {
        if (this.cropArea) {
          const cropData = {
            left: this.cropArea.left,
            top: this.cropArea.top,
            width: this.cropArea.width,
            height: this.cropArea.height,
          };
  
          this.$emit("crop-confirmed", cropData);
        }
  
        this.showCropArea = false;
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
            case "noise":
              this.image.filters.push(new fabric.Image.filters.Noise());
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
  
          this.brightness = 0;
          this.contrast = 0;
        }
      },
      updatePreview() {
        this.previewImage = this.image ? this.image.toDataURL() : "";
      },
  
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
  
      brilhoEcontraste() {
        const brightness = this.brightness / 200; // escala de -0,5 a 0,5
        const contrast = (this.contrast + 100) / 100; // escala de 0 a 2
  
        const brightnessFilter = new fabric.Image.filters.Brightness({
          brightness: brightness,
        });
        const contrastFilter = new fabric.Image.filters.Contrast({
          contrast: contrast,
        });
  
        this.image.filters = [brightnessFilter, contrastFilter];
        this.image.applyFilters();
        this.canvas.requestRenderAll();
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
  