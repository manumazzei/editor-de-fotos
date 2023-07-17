<template>
  <div>
    <v-btn @click="rotateImage">Girar</v-btn>
    <v-btn @click="flipImage">Inverter</v-btn>
    <v-btn @click="$emit('close')">Cancelar</v-btn>
  </div>
</template>

<script>
export default {
  props: ["image"],
  emits: ["close", "filter", "event"],
  data() {
    return {
      angulo: 0,
    };
  },
  methods: {
    rotateImage() {
      if (this.image) {
        this.angulo = this.angulo + 90;
        const rotationAngle = this.angulo;

        this.image.rotate(rotationAngle);
      }
      this.$emit("filter", [this.angulo]);
    },

    flipImage() {
      if (this.image) {
        this.image.flipX = !this.image.flipX;
        this.image.flipY = !this.image.flipY;
      }
      this.$emit("event", [this.image.flipX, this.image.flipY]);
    },
  },
};
</script>
