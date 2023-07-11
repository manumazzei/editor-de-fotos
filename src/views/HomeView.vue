<template>
  <button @click="startEdit">Começar a editar</button>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    startEdit() {
      this.$router.push("/editor");
    },
  },
};
</script>
