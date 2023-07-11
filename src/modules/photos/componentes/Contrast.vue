<template>
  <button @click="startBrilho">Brilho e Contraste</button>

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
    <button @click="applyFilters">Aplicar Filtros</button>
    <button @click="resetFilters">Redefinir Filtros</button>
    <button @click="showBrilho = false">Cancelar</button>
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
      if (!this.fabricImage) return
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
      }
    },
    resetFilters() {
      if (this.fabricImage) {
        this.fabricImage.filters = [];
        this.fabricImage.applyFilters();
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>
