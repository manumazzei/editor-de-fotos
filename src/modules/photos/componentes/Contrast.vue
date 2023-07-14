<template>
  <div>
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
    <button @click="reset">Redefinir</button>
    <v-btn @click="$emit('close')">Cancelar</v-btn>
  </div>
</template>

<script>
export default {
  props: ["image"],
  emits: ["close", "filter", "reset"], 
  data() {
    return {
      contrast: 0,
      brightness: 0,
      showBrilho: false,
    };
  },
  methods: {
    brilhoEcontraste() {
      const brightness = this.brightness / 200; // escala de -0,5 a 0,5
      const contrast = (this.contrast + 100) / 100; // escala de 0 a 2

      const brightnessFilter = new fabric.Image.filters.Brightness({
        brightness: brightness,
      });
      const contrastFilter = new fabric.Image.filters.Contrast({
        contrast: contrast,
      });
      this.image.filters.push(new fabric.Image.filters.Brightness({ brightness: brightness, contrast: contrast }));
      this.$emit("filter", [brightnessFilter, contrastFilter]);
    },
    reset() {
      this.brightness = 0;
      this.contrast = 0;
      this.$emit("reset");
    },
  },
};
</script>
