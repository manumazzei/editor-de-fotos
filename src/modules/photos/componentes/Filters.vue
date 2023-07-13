<template>
  <div>
    <label for="filter">Filtro:</label>
    <select id="filter" v-model="selectedFilter">
      <option value="None">Nenhum</option>
      <option value="Grayscale">Tons de Cinza</option>
      <option value="Sepia">Sépia</option>
      <option value="Invert">Inverter Cores</option>
      <option value="Brightness">Brilho</option>
      <option value="Contrast">Contraste</option>
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
    <button @click="applyFilter">Aplicar Filtro</button>
    <button @click="resetFilter">Redefinir Filtro</button>
    <button @click="$emit('close')">Cancelar</button>
  </div>
</template>

<script>
export default {
  emits: ["close"],
  data() {
    return {
      showFiltros: false,
      selectedFilter: false,
    };
  },
  methods: {
    applyFilter() {
      if (this.image) {
        this.image.filters = [];

        if (this.selectedFilter == "None") return this.canvas.renderAll();

        let filterData = undefined;
        if (this.selectedFilter == "Brightness") {
          filterData = {
            brightness: this.filterValue / 100,
          };
        } else if (this.selectedFilter == "Contrast") {
          filterData = {
            contrast: this.filterValue / 100,
          };
        }

        this.image.filters.push(
          new fabric.Image.filters[this.selectedFilter](filterData)
        );
        this.applyFilters();
      }
    },

    resetFilter() {
      if (this.image) {
        this.image.filters = [];
        reader.readAsDataURL(file);

        this.selectedFilter = "none";
        this.filterValue = 0;
      }
    },
  },
};
</script>
