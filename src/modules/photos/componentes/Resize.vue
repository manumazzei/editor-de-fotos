<template>
  <v-sheet
    style="background-color: rgb(245, 245, 245)"
    class="h-100 mt-2"
    align="center"
  >
    <v-text-field
      class="pt-12 px-2"
      label="Largura"
      variant="outlined"
      type="number"
      id="width"
      v-model="newWidth"
    />

    <strong style="font-size: 10px" class="pt-12"
      >O auto-ajuste pode afetar sua largura proporcionalmente!</strong
    >

    <v-text-field
      class="pa-2"
      label="Altura"
      variant="outlined"
      type="number"
      id="height"
      v-model="newHeight"
    />

    <v-sheet
      class="d-flex justify-space-between w-75 pt-10"
      style="background-color: rgb(245, 245, 245)"
    >
      <v-icon
        @click="resizeImage"
        class="mdi mdi-check"
        color="success"
      ></v-icon>

      <v-icon @click="reset" class="mdi mdi-restart" color="warning"></v-icon>

      <v-icon
        @click="$emit('close')"
        class="mdi mdi-window-close"
        color="error"
      ></v-icon>
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  props: ["image"],
  emits: ["close", "filter", "reset"],
  data() {
    return {
      originalWidth: this.image.width,
      originalHeight: this.image.height,
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

      this.$emit("filter", this.image);
    },
    reset() {
      this.newWidth = this.originalWidth;
      this.newHeight = this.originalHeight;
      this.resizeImage();
      this.$emit("reset");
    },
  },
};
</script>
