<template>
  <v-sheet
    class="d-flex flex-column align-center bg-grey-darken-4"
    style="height: 100vh"
  >
    <header
      style="
        width: 100vw;
        height: 10vh;
        background-color: rgba(148, 184, 182, 0.308);
      "
      class="d-flex flex-column justify-center align-center"
    >
      <div class="d-flex justify-space-between align-center" style="width: 95%">
        <v-btn
          class="font text-teal-darken-3 rounded-xl"
          color="grey-lighten-2"
          @click="GoBack"
          >Cancelar Edição</v-btn
        >
        <h1
          class="title"
          style="
            font-family: Bad Script, cursive;
            font-size: 3rem;
            color: rgb(102, 184, 187);
          "
        >
          Artfy
        </h1>
        <v-btn
          class="font text-teal-darken-3 rounded-xl"
          color="grey-lighten-2"
          @click="changeModals"
          >Próximo</v-btn
        >
      </div>
    </header>
    <v-card class="w-50 pa-4 bg-grey-lighten-4 mt-4" style="height: 50%">
      <v-file-input
        color="teal-darken-1"
        counter
        multiple
        placeholder="Select your files"
        prepend-icon="mdi-paperclip"
        variant="outlined"
        :show-size="1000"
        @click:clear="clearImg"
        @change="handleFileSelect"
      >
        <template v-slot:selection="{ fileNames }">
          <template v-for="(fileName, index) in fileNames" :key="fileName">
            <v-chip
              v-if="index < 2"
              color="teal-darken-1"
              label
              size="small"
              class="me-2"
            >
              {{ fileName }}
            </v-chip>
          </template>
        </template>
      </v-file-input>

      <div style="height: 35vh; width: 45vw" class="ml-6">
        <canvas ref="canvas" width="822" height="340"></canvas>
      </div>

      <v-col class="d-flex justify-space-between">
        <v-tooltip location="top">
          <template v-slot:activator="{ props: tooltip }">
            <v-icon
              v-bind="tooltip"
              class="mdi mdi-white-balance-sunny"
              @click="showBrilho = true"
              color="teal-darken-3"
            ></v-icon>
          </template>
          <span>Brilho</span>
        </v-tooltip>

        <v-tooltip location="top">
          <template v-slot:activator="{ props: tooltip }">
            <v-icon
              v-bind="tooltip"
              class="mdi mdi-resize"
              @click="showResize = true"
              color="teal-darken-3"
            ></v-icon>
          </template>
          <span>Redimensionar</span>
        </v-tooltip>

        <v-tooltip location="top">
          <template v-slot:activator="{ props: tooltip }">
            <v-icon
              v-bind="tooltip"
              class="mdi mdi-image-filter-hdr"
              @click="showFiltros = true"
              color="teal-darken-3"
            ></v-icon>
          </template>
          <span>Filtros</span>
        </v-tooltip>

        <v-tooltip location="top">
          <template v-slot:activator="{ props: tooltip }">
            <v-icon
              v-bind="tooltip"
              class="mdi mdi-undo"
              @click="showSpin = true"
              color="teal-darken-3"
            ></v-icon>
          </template>
          <span>Girar</span>
        </v-tooltip>
      </v-col>
    </v-card>

    <v-sheet
      class="d-flex justify-center align-center"
      style="background-color: rgb(245, 245, 245)"
    >
      <v-sheet
        v-if="showEditor"
        class="d-inline-flex justify-space-between bg-grey-darken-4"
        style="height: 36vh; width: 50vw"
      >
        <v-sheet style="width: 30%; background-color: transparent">
          <Contrast
            v-if="showBrilho"
            :image="image"
            @filter="applyFilters"
            @reset="resetFilters"
            @close="showBrilho = false"
          />
        </v-sheet>

        <v-sheet style="width: 30%; background-color: transparent">
          <Resize
            v-if="showResize"
            :image="image"
            @filter="applyFilters"
            @close="showResize = false"
            @reset="resetFilters"
          />
        </v-sheet>
        <v-sheet style="width: 30%; background-color: transparent">
          <Filters
            v-if="showFiltros"
            :image="image"
            @filter="applyFilters"
            @reset="resetFilters"
            @close="showFiltros = false"
          />
        </v-sheet>
        <v-sheet style="width: 30%; background-color: transparent">
          <Spin
            v-if="showSpin"
            :image="image"
            @filterRight="applyFilters"
            @filterLeft="applyFilters"
            @eventX="applyFilters"
            @eventY="applyFilters"
            @close="showSpin = false"
          />
        </v-sheet>
      </v-sheet>
    </v-sheet>

    <v-card
      v-if="showModalInfos"
      class="h-50 w-50"
      style="background-color: rgb(245, 245, 245)"
    >
      <v-form
        @submit.prevent
        class="d-flex flex-column justify-center align-center"
      >
        <v-text-field
          class="w-75"
          required
          variant="underlined"
          v-model="nome"
          placeholder="Nome da foto"
        />
        <v-text-field
          class="w-75"
          required
          variant="underlined"
          v-model="dataEdicao"
          type="date"
          placeholder="Data Edição"
        />
        <v-text-field
          class="w-75"
          required
          variant="underlined"
          v-model="descricao"
          placeholder="Descrição"
        />

        <v-text-field
          class="w-75"
          required
          variant="underlined"
          v-model="medidas"
          placeholder="Altura x largura"
        />
        <v-text-field
          class="w-75"
          required
          variant="underlined"
          v-model="fotografo"
          placeholder="Nome do fotográfo"
        />
        <v-sheet
          class="d-inline-flex justify-space-between w-50"
          style="background-color: rgb(245, 245, 245)"
        >
          <v-btn @click="showModalInfos = false">Fechar</v-btn>
          <v-btn @click="handleSave">Salvar</v-btn>
        </v-sheet>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Spin from "../componentes/Spin.vue";
import Contrast from "../componentes/Contrast.vue";
import Resize from "../componentes/Resize.vue";
import Filters from "../componentes/Filters.vue";
import { routerKey } from "vue-router";
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";
import { photoStore } from "../store";

const { content } = useStore();

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
      nome: "",
      dataEdicao: "",
      descricao: "",
      medidas: "",
      fotografo: "",
      imgRef: null,
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
      showModalInfos: false,
      showEditor: true,
      image: null,
      canvas: null,
      undoStack: [],
      redoStack: [],
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.fabricCanvas = new fabric.Canvas(this.canvas);
  },
  methods: {
    clearImg() {
      this.canvas = null;
    },
    handleFileSelect(event) {
      const file = event.target.files[0];
      this.imgRef = file;
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataURL = e.target.result;

        fabric.Image.fromURL(dataURL, (img) => {
          this.image = img;

          this.canvas = new fabric.Canvas(this.$refs.canvas);
          this.canvas.add(this.image);

          // tamanho do canvas e da imagem
          const canvasWidth = this.canvas.width;
          const canvasHeight = this.canvas.height;
          const imageWidth = this.image.width;
          const imageHeight = this.image.height;

          if (imageWidth > canvasWidth || imageHeight > canvasHeight) {
            // Calcula a escala para ajustar a imagem ao canvas
            const scaleX = canvasWidth / imageWidth;
            const scaleY = canvasHeight / imageHeight;
            const scale = Math.min(scaleX, scaleY);

            // Ajusta a escala da imagem para caber no canvas
            this.image.scaleX = scale;
            this.image.scaleY = scale;

            // Centraliza a imagem no canvas
            const x = (canvasWidth - this.image.getScaledWidth()) / 2;
            const y = (canvasHeight - this.image.getScaledHeight()) / 2;

            // Define as coordenadas x e y da imagem
            this.image.set({ left: x, top: y });
          }
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
    handleInfos(event) {
      this.imgRef = event.target.files[0];
    },
    openInfos() {
      this.showInfos = true;
    },
    GoBack() {
      this.$router.push("/dashboard");
    },
    openModalInfos() {
      this.showModalInfos = true;
    },
    changeModals() {
      this.showEditor = false;
      this.showModalInfos = true;
    },
    async handleSave() {
      const payload = {
        nome: this.nome.valueOf(),
        dataEdicao: this.dataEdicao.valueOf(),
        descricao: this.descricao.valueOf(),
        medidas: this.medidas.valueOf(),
        fotografo: this.fotografo.valueOf(),
      };
      const imgPayload = this.canvas.toDataURL("image/jpeg");
      const res = await content.photo.createItem(payload, imgPayload);
      if (res) {
        alert("criado com sucesso!");
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>
