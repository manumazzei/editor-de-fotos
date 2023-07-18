<template>
  <v-sheet
    class="d-flex flex-column mt-2 h-100"
    style="background-color: rgb(245, 245, 245)"
  >
    <v-sheet class="d-flex flex-column justify-center h-100 w-100" style="background-color: rgb(245, 245, 245);">
      <v-sheet
        class="d-inline-flex mt-2 ml-4"
        style="font-size: 20px; background-color: rgb(245, 245, 245);"
      >
        <v-icon
          @click="rotateRightImage"
          class="mdi mdi-redo"
          color="success"
        ></v-icon>
        <p class="ml-2">Girar</p>
      </v-sheet>

      <v-sheet
        class="d-inline-flex mt-6 ml-4"
        style="font-size: 20px; background-color: rgb(245, 245, 245);"
      >
        <v-icon
          @click="rotateLeftImage"
          class="mdi mdi-undo"
          color="success"
        ></v-icon>
        <p class="ml-2">Girar</p>
      </v-sheet>

      <v-sheet
        class="d-inline-flex mt-6 ml-4"
        style="font-size: 20px; background-color: rgb(245, 245, 245);"
      >
        <v-icon
          @click="flipImageY"
          class="mdi mdi-arrow-split-horizontal"
          color="warning"
        ></v-icon>
        <p class="ml-2">Inverter</p>
      </v-sheet>
      <v-sheet
        class="d-inline-flex mt-6 ml-4"
        style="font-size: 20px; background-color: rgb(245, 245, 245);"
      >
        <v-icon
          @click="flipImageX"
          class="mdi mdi-arrow-split-vertical"
          color="warning"
        ></v-icon>
        <p class="ml-2">Inverter</p>
      </v-sheet>
      <v-sheet
        class="d-inline-flex mt-6 ml-4"
        style="font-size: 20px; background-color: rgb(245, 245, 245);"
      >
        <v-icon
          @click="$emit('close')"
          class="mdi mdi-window-close"
          color="error"
        ></v-icon>
        <p class="ml-2">Cancelar</p>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  props: ["image"],
  emits: ["close", "filterRight", "filterLeft", "eventX", "eventY"],
  data() {
    return {
      angulo: 0,
    };
  },
  methods: {
    rotateRightImage() {
      if (this.image) {
        this.angulo = this.angulo + 90;
        const rotationAngle = this.angulo;

        this.image.rotate(rotationAngle);
      }
      this.$emit("filterRight", [this.angulo]);
    },

    rotateLeftImage() {
      if (this.image) {
        this.angulo = this.angulo - 90;
        const rotationAngle = this.angulo;

        this.image.rotate(rotationAngle);
      }
      this.$emit("filterLeft", [this.angulo]);
    },

    flipImageY() {
      if (this.image) {
        this.image.flipY = !this.image.flipY;
      }
      this.$emit("eventY", [this.image.flipY]);
    },

    flipImageX() {
      if (this.image) {
        this.image.flipX = !this.image.flipX;
      }
      this.$emit("eventX", [this.image.flipX]);
    },
  },
};
</script>
