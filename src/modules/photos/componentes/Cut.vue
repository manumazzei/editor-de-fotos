<template>
  <div>
    <button @click="cropImage">Ajustar</button>
    <button @click="$emit('close')">Cancelar</button>
  </div>
</template>

<script>
export default {
  props: ["foto"],
  emits: ["close"],
  data() {
    return {
      showCropArea: false,
      canvas: null,
      cropArea: null,
    };
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
  },
  methods: {
    cropImage() {
      this.showCropArea = true;
      this.canvas.clear();

      fabric.Image.fromURL(this.foto, (img) => {
        this.canvas.setWidth(img.width);
        this.canvas.setHeight(img.height);
        this.canvas.setBackgroundImage(
          img,
          this.canvas.renderAll.bind(this.canvas)
        );

        this.cropArea = new fabric.Rect({
          left: 100,
          top: 100,
          width: 200,
          height: 200,
          fill: "transparent",
          stroke: "red",
          strokeWidth: 2,
          selectable: false,
          evented: false,
        });

        this.canvas.add(this.cropArea);
      });
    },
  },
};
</script>
