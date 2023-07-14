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
    <v-btn @click="applyFilter">Aplicar Filtro</v-btn>
    <v-btn @click="resetFilter">Redefinir Filtro</v-btn>
    <v-btn @click="$emit('close')">Cancelar</v-btn>
  </div>
</template>

<script>
export default {
  props: ["foto"],
  emits: ["close"],
  data() {
    return {
      showFiltros: false,
      selectedFilter: false,
    };
  },
  methods: {},
};
</script>
