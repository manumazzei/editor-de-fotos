<template>
  <v-btn @click="startBrilho">Brilho e Contraste</v-btn>

  <div v-if="showBrilho">
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
    <v-btn @click="applyFilters">Aplicar Filtros</v-btn>
    <v-btn @click="resetFilters">Redefinir Filtros</v-btn>
    <v-btn @click="showBrilho = false">Cancelar</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBrilho: false,
    };
  },
  methods: {
    startBrilho() {
      this.showBrilho = true;
    },
    applyFilters() {
      if (!this.fabricImage) return;
      const brightness = this.brightness / 100; // Escala de -1 a 1
      const contrast = (this.contrast + 100) / 100; // Escala de 0 a 2

      const brightnessFilter = new fabric.Image.filters.Brightness({
        brightness: brightness,
      });
      const contrastFilter = new fabric.Image.filters.Contrast({
        contrast: contrast,
      });

      this.fabricImage.filters = [brightnessFilter, contrastFilter];
      this.fabricImage.applyFilters();
      reader.readAsDataURL(file);
    },
    uploadFile() {
      const file = document.querySelector("#file-input").files[0];
      this.photoStore.upload(file.name, file); // se quiser trocar, revisar esta linha
    },
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
  },
  resetFilters() {
    if (this.fabricImage) {
      this.fabricImage.filters = [];
      this.fabricImage.applyFilters();
      reader.readAsDataURL(file);
    }
  },
};
</script>
