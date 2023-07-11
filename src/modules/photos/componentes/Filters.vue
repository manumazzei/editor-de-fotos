<template>
  <button @click="startChangeFilters">Filtros</button>

  <div v-if="showFiltros">
    <label for="filter">Filtro:</label>
    <select id="filter" v-model="selectedFilter">
      <option value="none">Nenhum</option>
      <option value="grayscale">Tons de Cinza</option>
      <option value="sepia">Sépia</option>
      <option value="invert">Inverter Cores</option>
      <option value="brightness">Brilho</option>
      <option value="contrast">Contraste</option>
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
    <button @click="showFiltros = false">Cancelar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFiltros: false,
    };
  },
  methods: {
    startChangeFilters() {
      this.showFiltros = true;
    },
    applyFilter() {
      if (this.image) {
        this.image.filters = [];

        switch (this.selectedFilter) {
          case "none":
            this.canvas.renderAll();
            break;
          case "grayscale":
            this.image.filters.push(new fabric.Image.filters.Grayscale());
            this.applyFilters();
            break;
          case "sepia":
            this.image.filters.push(new fabric.Image.filters.Sepia());
            this.applyFilters();
            break;
          case "invert":
            this.image.filters.push(new fabric.Image.filters.Invert());
            this.applyFilters();
            break;
          case "brightness":
            this.image.filters.push(
              new fabric.Image.filters.Brightness({
                brightness: this.filterValue / 100,
              })
            );
            this.applyFilters();
            break;
          case "contrast":
            this.image.filters.push(
              new fabric.Image.filters.Contrast({
                contrast: this.filterValue / 100,
              })
            );
            this.applyFilters();
            break;
        }
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
