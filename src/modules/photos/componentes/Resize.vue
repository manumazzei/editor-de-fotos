<template>
  <button @click="startRedimensiona">Redimensionar</button>

  <div v-if="showRedimensiona">
    <div style="display: flex">
      <label for="width">Largura:</label>
      <input
        type="number"
        id="width"
        v-model="newWidth"
        @input="updatePreview"
      />
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

    <button @click="resizeImage">Redimensionar</button>
    <button @click="showRedimensiona = false">Cancelar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showRedimensiona: false,
    };
  },
  methods: {
    startRedimensiona() {
      this.showRedimensiona = true;
    },
    resizeImage() {
      if (this.fabricImage && this.newWidth > 0 && this.newHeight > 0) {
        this.fabricImage.scaleToWidth(this.newWidth);
        this.fabricImage.scaleToHeight(this.newHeight);

        reader.readAsDataURL(file);
      }
    },
  },
};
</script>
