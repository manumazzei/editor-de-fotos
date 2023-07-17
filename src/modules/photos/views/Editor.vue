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
};
</script>
