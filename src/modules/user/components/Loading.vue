<template>
  <div class="loading-container w-100 h-100">
    <v-progress-circular 
    :size="65" 
    :width="7"
    color="teal-lighten-3" 
    indeterminate>
    </v-progress-circular>
  </div>
</template>

<style>
.loading-container {
  position: fixed;
  background-color: rgb(39, 38, 38);
  top: 10vh;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
