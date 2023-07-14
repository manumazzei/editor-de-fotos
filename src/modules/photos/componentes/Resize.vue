<template>
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

    <button @click="resizeImage">Confirmar</button>
    <button @click="$emit('close')">Cancelar</button>

</template>

<script>
export default {
  emits: ["close"],
  data() {
    return {
      showResize: false,
      newWidth: 0,
      newHeight: 0,
    };
  },
  methods: {
    updatePreview() {
      // adicionar a atualização
    },
    resizeImage() {
      if (this.newWidth > 0 && this.newHeight > 0) {
        this.$emit("resize", this.newWidth, this.newHeight);
      }
    },
  },
};
</script>
