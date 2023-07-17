<script setup></script>

<template>
  <main
    class="bg-grey-darken-4 overflow-hidden d-flex flex-column align-center"
    height="100vh"
    width="100vw"
  >
    <div class="content d-flex flex-column justify-center align-center">
      <h1 class="font-weight-medium my-8">Artfy</h1>
      <p class="font-weight-light text-white mb-8 mx-10 text-center">
        Venha conhecer o Artfy! Ele foi projetado para transformar suas fotos
        comuns em obras de arte deslumbrantes! Com recursos avançados de edição
        e filtros exclusivos, você terá o poder de criar imagens impressionantes
        com apenas alguns toques!
      </p>

      <div class="d-flex flex-row justify-center align-center mb-10" width="80vw">
        <img src="../assets/photos/praia.jpg" class="" height="600" />
        <img src="../assets/photos/pb.jpeg" class="mx-12" height="600" />
        <img src="../assets/photos/azul.jpeg" class="" height="600" />
      </div>
    </div>

    <div
      class="router  d-flex flex-row justify-space-evenly align-center"
      width="100vw"
    >
      <div class="d-flex flex-column align-center">
        <router-link
          class="font text-decoration-none font-weight-bold"
          to="/register"
        >
          Sign Up
        </router-link>
      </div>
      <router-link
        class="font text-decoration-none font-weight-bold"
        to="/login"
        >Login</router-link
      >
    </div>
  </main>
</template>

<style scoped>
h1 {
  font-size: 6rem;
  font-family: "Bad Script", cursive;
  color: rgb(102, 184, 187);
}
p{
  font-family: "Manrope", sans-serif;
  font-size: 1.2rem;
  width: 60vw;
}
.content {
  height: 90vh;
  width: 80vw;
}
.router {
  height: 10vh;
  width: 100vw;
  background-color: rgba(148, 184, 182, 0.308);
}
.font {
  font-family: "Bad Script", cursive;
  font-size: 2rem;
  color: rgb(102, 184, 187);
}
</style>
