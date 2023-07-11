<template>
  <button @click="cropImage">Recortar</button>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    cropImage() {
      const canvasElement = document.getElementById("canvas");

      this.fabricCanvas = new fabric.Canvas(canvasElement);
      
      if (this.fabricImage) {
        const cropX = this.fabricImage.cropX;
        const cropY = this.fabricImage.cropY;
        const cropWidth = this.fabricImage.cropWidth;
        const cropHeight = this.fabricImage.cropHeight;

        const croppedImage = new fabric.Image(this.fabricImage.getElement(), {
          left: cropX * this.fabricImage.width,
          top: cropY * this.fabricImage.height,
          width: cropWidth * this.fabricImage.width,
          height: cropHeight * this.fabricImage.height,
          cropX: cropX,
          cropY: cropY,
          cropWidth: cropWidth,
          cropHeight: cropHeight,
        });

        this.fabricCanvas.clear();
        this.fabricCanvas.add(croppedImage);
        this.fabricCanvas.renderAll();
      }
    },
  },
};
</script>
