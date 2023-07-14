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
  emits: ["close"],
  props: ["foto"],
  data() {
    return {
      showResize: false,
      newWidth: 0,
      newHeight: 0,
    };
  },
  methods: {},
};
</script>
