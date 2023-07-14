<template>
  <div>
    <v-btn @click="showCropArea = true" disabled >Selecionar área</v-btn>
    <v-btn @click="cropImage" v-if="showCropArea">Ajustar</v-btn>
    <v-btn @click="$emit('close')">Cancelar</v-btn>

  </div>
</template>

<script>
export default {
  props: ["foto"],
  emits: ["close", "crop-confirmed"],
  data() {
    return {
      showCropArea: false,
      canvas: null,
      cropArea: null,
      selectArea: false,
    };
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
  },
  methods: {
    
  },
};
</script>
