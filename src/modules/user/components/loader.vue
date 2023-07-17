<template>
  <modal class="loading-container w-100 h-100">
    <v-progress-circular 
    :size="55" 
    color="pink-lighten-1" 
    indeterminate>
    </v-progress-circular>
  </modal>
</template>

<style>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
