<template>
  <div>
    <label for="filter">Filtro:</label>
    <select id="filter" v-model="selectedFilter">
      <option value="none">Nenhum</option>
      <option value="grayscale">Tons de Cinza</option>
      <option value="sepia">Sépia</option>
      <option value="noise">Ruido</option>
      <option value="pixelate">Pixel</option>
    </select>
    <div
      v-if="selectedFilter === 'brightness' || selectedFilter === 'contrast'"
    >
      <label for="filterValue">Valor:</label>
      <input
        type="range"
        id="filterValue"
        v-model="filterValue"
        :min="filterMinValue"
        :max="filterMaxValue"
        :step="filterStep"
      />
    </div>
    <v-btn @click="Filtros">Aplicar</v-btn>
    <v-btn @click="resetFiltros">Redefinir</v-btn>
    <v-btn @click="$emit('close')">Cancelar</v-btn>
  </div>
</template>

<script>
export default {
  props: ["image"],
  emits: ["close", "reset", "filter"],
  data() {
    return {
      selectedFilter: "",
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
