<template>
  <div style="display: flex">
    <label for="width">Largura:</label>
    <input type="number" id="width" v-model="newWidth" @input="updatePreview" />
  </div>
  <div style="display: flex">
    <label for="height">Altura:</label>
    <input
      type="number"
      id="height"
      v-model="newHeight"
      @input="updatePreview"
    />
  </div>

  <v-btn @click="resizeImage">Confirmar</v-btn>
  <v-btn @click="$emit('close')">Cancelar</v-btn>
</template>

<script>
export default {
  props: ["image"],
  emits: ["close", "filter", "reset"],
  data() {
    return {
      newWidth: 0,
      newHeight: 0,
    };
  },
  methods: {
    resizeImage() {
      if (this.image && this.newWidth > 0 && this.newHeight > 0) {
        this.image.scaleToWidth(this.newWidth);
        this.image.scaleToHeight(this.newHeight);
      } else if (this.image && this.newWidth > 0) {
        this.image.scaleToWidth(this.newWidth);
      } else if (this.image && this.newHeight > 0) {
        this.image.scaleToHeight(this.newHeight);
      }
      this.$emit("filter", [this.newHeight, this.newWidth]);
    },
  },
};
</script>
