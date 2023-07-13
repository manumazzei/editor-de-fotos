<script>
export default {
  data() {
    return {};
  },
  methods: {
  },
};
</script>

<template>
  <main>
    <h1>HOME SITE</h1>

    <router-link
      to="/register"
    >
      Sign Up
    </router-link>

    <router-link
      to="/login"
      >Login</router-link
    >
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  gap: 2rem;
}
</style>
