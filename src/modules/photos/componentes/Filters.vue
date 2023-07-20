<script>
export default {
  props: ["image"],
  emits: ["close", "reset", "filter"],
  data() {
    return {
      selectedFilter: "",
      CamposdeFiltros: [
        { label: "Nenhum", value: "none" },
        { label: "Tons de Cinza", value: "Grayscale" },
        { label: "Sépia", value: "Sepia" },
        { label: "Pixel", value: "Pixelate" },
        { label: "Vintage", value: "Vintage" },
        { label: "Nitidez", value: "Sharpen" },
        { label: "Relevo", value: "Emboss" },
      ],
    };
  },
  methods: {
    handleFilter() {
      let filter = this.selectedFilter;
      if (filter == "None") return this.$emit("filter", [this.selectedFilter]);

      if (filter == "Sharpen" || filter == "Emboss") filter = "Convolute";

      const filtersPayload = {
        Sharpen: {
          matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
        },
        Pixelate: {
          blocksize: 5,
        },
        Emboss: {
          matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
        },
      };

      const payload = filtersPayload[this.selectedFilter];
      this.image.filters.push(new fabric.Image.filters[filter](payload));
      this.$emit("filter", [this.selectedFilter]);
    },
    resetFiltros() {
      this.selectedFilter = "";
      this.$emit("reset");
    },
  },
};
</script>

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
      <v-icon
        @click="handleFilter"
        class="mdi mdi-check"
        color="success"
      ></v-icon>
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
