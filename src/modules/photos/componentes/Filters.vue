<template>
  <v-sheet
    style="background-color: rgb(245, 245, 245)"
    class="mt-2 h-100"
    align="center"
  >
    <v-autocomplete
      class="pt-12 px-4"
      :items="CamposdeFiltros"
      v-model="selectedFilter"
      variant="outlined"
      label="Filtros:"
      item-title="label"
      item-value="value"
    ></v-autocomplete>

    <v-sheet
      class="d-flex justify-space-between align-end ml-4 mt-8 w-75 h-50"
      style="background-color: rgb(245, 245, 245)"
    >
      <v-icon @click="Filtros" class="mdi mdi-check" color="success"></v-icon>
      <v-icon
        @click="resetFiltros"
        class="mdi mdi-restart"
        color="warning"
      ></v-icon>
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
  emits: ["close", "reset", "filter"],
  data() {
    return {
      selectedFilter: "",
      CamposdeFiltros: [
        { label: "Nenhum", value: "none" },
        { label: "Tons de Cinza", value: "grayscale" },
        { label: "Sépia", value: "sepia" },
        { label: "Pixel", value: "pixelate" },
        { label: "Vintage", value: "vintage" },
        { label: "Nitidez", value: "sharpen" },
        { label: "Relevo", value: "emboss" },
      ],
    };
  },
  methods: {
    Filtros() {
      if (this.image) {
        // this.image.filters = [];

        switch (this.selectedFilter) {
          case "none":
            this.$emit("filter", [this.selectedFilter]);
            break;
          case "grayscale":
            this.image.filters.push(new fabric.Image.filters.Grayscale());
            this.$emit("filter", [this.selectedFilter]);
            break;
          case "sepia":
            this.image.filters.push(new fabric.Image.filters.Sepia());
            this.$emit("filter", [this.selectedFilter]);
            break;
          case "pixelate":
            this.image.filters.push(
              new fabric.Image.filters.Pixelate({
                blocksize: 5,
              })
            );
            this.$emit("filter", [this.selectedFilter]);
            break;
          case "vintage":
            this.image.filters.push(new fabric.Image.filters.Vintage());
            this.$emit("filter", [this.selectedFilter]);
            break;
          case "sharpen":
            this.image.filters.push(
              new fabric.Image.filters.Convolute({
                matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
              })
            );
            this.$emit("filter", [this.selectedFilter]);
            break;
          case "emboss":
            this.image.filters.push(
              new fabric.Image.filters.Convolute({
                matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
              })
            );
            this.$emit("filter", [this.selectedFilter]);
            break;
        }
      }
    },
    resetFiltros() {
      this.selectedFilter = "";
      this.$emit("reset");
    },
  },
};
</script>
