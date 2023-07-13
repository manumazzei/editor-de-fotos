<template>
  <div class="image-cropper">
    <button @click="startCrop" v-if="!showCropArea">Recortar</button>
    <button @click="cropImage" v-if="showCropArea">Recortar</button>
    <button @click="cancelCrop" v-if="showCropArea">Cancelar</button>
    <button @click="resetCrop" v-if="showCropArea">Ajustar</button>
  </div>
</template>

<script>
export default {
  props: {
    
  },
  data() {
    return {
      canvas: null,
      image: null,
      showCropArea: false,
      cropAreaStyle: null,
      cropData: null,
      originalCroppedImage: null,
      resizing: false,
      resizeHandle: null,
    };
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgObj = new Image();
        imgObj.onload = () => {
          this.image = new fabric.Image(imgObj);
          this.image.set({
            left: this.canvas.width / 2,
            top: this.canvas.height / 2,
            originX: "center",
            originY: "center",
          });
          this.canvas.add(this.image);
        };
        imgObj.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    startCrop() {
      this.showCropArea = true;
      const canvasWidth = this.canvas.width;
      const canvasHeight = this.canvas.height;
      const cropSize = Math.min(canvasWidth, canvasHeight) * 0.5; // 50% of canvas size
      const cropAreaLeft = (canvasWidth - cropSize) / 2;
      const cropAreaTop = (canvasHeight - cropSize) / 2;

      this.cropAreaStyle = {
        left: `${cropAreaLeft}px`,
        top: `${cropAreaTop}px`,
        width: `${cropSize}px`,
        height: `${cropSize}px`,
      };

      this.originalCroppedImage = this.canvas.toDataURL({
        left: cropAreaLeft,
        top: cropAreaTop,
        width: cropSize,
        height: cropSize,
      });
    },
    cropImage() {
      const cropArea = this.canvas._objects.find((obj) => obj.type === "rect");
      const croppedImage = new fabric.Image(this.image.getElement(), {
        left: this.image.left - cropArea.left,
        top: this.image.top - cropArea.top,
        width: cropArea.width,
        height: cropArea.height,
        scaleX: this.image.scaleX,
        scaleY: this.image.scaleY,
        angle: this.image.angle,
        originX: "left",
        originY: "top",
      });

      this.canvas.clear();
      this.canvas.add(croppedImage);

      this.showCropArea = false;
      this.cropAreaStyle = null;
      this.cropData = {
        left: cropArea.left,
        top: cropArea.top,
        width: cropArea.width,
        height: cropArea.height,
      };
    },
    cancelCrop() {
      this.showCropArea = false;
      this.cropAreaStyle = null;
      this.canvas.clear();

      const imgObj = new Image();
      imgObj.onload = () => {
        this.image = new fabric.Image(imgObj);
        this.canvas.add(this.image);
      };
      imgObj.src = this.originalCroppedImage;
    },
    resetCrop() {
      this.showCropArea = false;
      this.cropAreaStyle = null;
      this.canvas.clear();

      const imgObj = new Image();
      imgObj.onload = () => {
        this.image = new fabric.Image(imgObj);
        this.canvas.add(this.image);
      };
      imgObj.src = this.originalCroppedImage;
      this.originalCroppedImage = null;
    },
    startResize(event, handle) {
      this.resizing = true;
      this.resizeHandle = handle;

      const cropArea = this.canvas._objects.find((obj) => obj.type === "rect");
      this.resizeData = {
        cropArea,
        startX: event.clientX,
        startY: event.clientY,
      };

      document.addEventListener("mousemove", this.resizeCropArea);
      document.addEventListener("mouseup", this.stopResizeCropArea);
    },
    resizeCropArea(event) {
      if (this.resizing && this.resizeHandle) {
        const { cropArea, startX, startY } = this.resizeData;
        const { clientX, clientY } = event;

        let newLeft = cropArea.left;
        let newTop = cropArea.top;
        let newWidth = cropArea.width;
        let newHeight = cropArea.height;

        if (this.resizeHandle === "top-left") {
          newLeft += clientX - startX;
          newTop += clientY - startY;
          newWidth -= clientX - startX;
          newHeight -= clientY - startY;
        } else if (this.resizeHandle === "top-right") {
          newTop += clientY - startY;
          newWidth += clientX - startX;
          newHeight -= clientY - startY;
        } else if (this.resizeHandle === "bottom-right") {
          newWidth += clientX - startX;
          newHeight += clientY - startY;
        } else if (this.resizeHandle === "bottom-left") {
          newLeft += clientX - startX;
          newWidth -= clientX - startX;
          newHeight += clientY - startY;
        }

        cropArea.set({
          left: newLeft,
          top: newTop,
          width: newWidth,
          height: newHeight,
        });

        this.canvas.renderAll();

        this.resizeData.startX = clientX;
        this.resizeData.startY = clientY;
      }
    },
    stopResizeCropArea() {
      this.resizing = false;
      this.resizeHandle = null;

      document.removeEventListener("mousemove", this.resizeCropArea);
      document.removeEventListener("mouseup", this.stopResizeCropArea);
    },
  },
};
</script>
