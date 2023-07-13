<template>
  <div>
    <label for="brightness">Brilho:</label>
    <input
      type="range"
      id="brightness"
      min="-100"
      max="100"
      step="1"
    />
    <label for="contrast">Contraste:</label>
    <input
      type="range"
      id="contrast"
      min="-100"
      max="100"
      step="1"
    />
    <button @click="applyFilters">Aplicar Filtros</button>
    <button @click="resetFilters">Redefinir Filtros</button>
    <button @click="$emit('close')">Cancelar</button>
  </div>
</template>

<script>
export default {
  emits: ["close"],
  data() {
    return {
      showBrilho: false,
    };
  },
  methods: {
    applyFilters() {
      if (!this.fabricImage) return;
      const brightness = this.brightness / 100; // Escala de -1 a 1
      const contrast = (this.contrast + 100) / 100; // Escala de 0 a 2

      const brightnessFilter = new fabric.Image.filters.Brightness({
        brightness,
      });
      const contrastFilter = new fabric.Image.filters.Contrast({
        contrast,
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
