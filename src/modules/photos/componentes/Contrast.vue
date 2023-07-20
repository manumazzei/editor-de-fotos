<script>
export default {
  props: ["image"],
  emits: ["close", "filter", "reset"],
  data() {
    return {
      contrast: 0,
      brightness: 0,
      saturation: 0,
      hue: 0,
    };
  },
  methods: {
    brilhoEcontraste() {
      const brightness = this.brightness / 200; // escala de -0,5 a 0,5
      const contrast = (this.contrast + 100) / 100; // escala de 0 a 2
      const saturation = (this.saturation + 100) / 100; // escala de 0 a 2
      const hue = this.hue; // ângulo de -180 a 180

      const brightnessFilter = new fabric.Image.filters.Brightness({
        brightness: brightness,
      });
      const contrastFilter = new fabric.Image.filters.Contrast({
        contrast: contrast,
      });
      const saturationFilter = new fabric.Image.filters.Saturation({
        saturation: saturation,
      });

      const hueFilter = new fabric.Image.filters.HueRotation({
        rotation: hue,
      });
      this.image.filters = [
        new fabric.Image.filters.Brightness({ brightness: brightness }),
        new fabric.Image.filters.Contrast({ contrast: contrast }),
        new fabric.Image.filters.Saturation({ saturation: saturation }),
        new fabric.Image.filters.HueRotation({ rotation: hue }),
      ];

      this.$emit("filter", [
        brightnessFilter,
        contrastFilter,
        saturationFilter,
        hueFilter,
      ]);
    },
    reset() {
      this.brightness = 0;
      this.contrast = 0;
      this.saturation = 0;
      this.hue = 0;
      this.$emit("reset");
    },
  },
};
</script>

<template>
  <v-sheet
    style="background-color: rgb(245, 245, 245);"
    class="mt-2 h-100"
    align="center"
  >
    <v-sheet
      style="background-color: rgb(245, 245, 245); font-size: 15px"
      class="pt-4 px-2"
    >
      <label for="brightness">Brilho:</label>
      <v-slider
        style="grid-area: none;"
        :thumb-size="15"
        type="range"
        id="brightness"
        v-model="brightness"
        min="-100"
        max="100"
        step="1"
        color="teal-darken-1"
      />

      <label for="contrast">Contraste:</label>
      <v-slider
        :thumb-size="15"
        type="range"
        id="contrast"
        v-model="contrast"
        min="-100"
        max="100"
        step="1"
        color="teal-darken-1"
      />

      <label for="saturation">Saturação:</label>
      <v-slider
        :thumb-size="15"
        type="range"
        id="saturation"
        v-model="saturation"
        min="-100"
        max="100"
        step="1"
        color="teal-darken-1"
      />

      <label for="hue">Matiz:</label>
      <v-slider
        :thumb-size="15"
        type="range"
        id="hue"
        v-model="hue"
        min="-180"
        max="180"
        step="1"
        color="teal-darken-1"
      />

      <v-sheet
        class="d-flex justify-space-between w-75 align-center"
        style="background-color: rgb(245, 245, 245)"
      >
        <v-icon
          @click="brilhoEcontraste"
          class="mdi mdi-check"
          color="success"
        ></v-icon>

        <v-icon @click="reset" class="mdi mdi-restart" color="warning"></v-icon>

        <v-icon
          @click="$emit('close')"
          class="mdi mdi-window-close"
          color="error"
        ></v-icon>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

