<script setup></script>

<template>
  <main class="bg-grey-lighten-4 overflow-hidden d-flex flex-column align-center"
  height="100vh"
  width="100vw">
    <div class="content d-flex flex-column justify-center align-center ">
      <h1 class="font-weight-light">PhotoMaster</h1>
      <p class="text-subtitle-1 font-weight-light text-grey-darken-4 mb-8 mx-10">
        Venha conhecer o PhotoMaster! Ele foi projetado para transformar suas fotos comuns
        em obras de arte deslumbrantes! Com recursos avançados de edição e filtros
        exclusivos, você terá o poder de criar imagens impressionantes com apenas
        alguns toques!
      </p>
     
      <div class="d-flex flex-row justify-center align-center"
      width="80vw">
        <img src="../assets/photos/praia.jpg" class="" height="600" />
        <img src="../assets/photos/pb.jpeg" class="mx-12" height="600"/>
        <img src="../assets/photos/azul.jpeg" class="" height="600" />
      </div>
    </div>

    <div class="router bg-teal-lighten-5 d-flex flex-row justify-space-evenly align-center"
    width="100vw">
      <div class="d-flex flex-column align-center">
        <p class="text-grey-darken-4 text-subtitle-1">Faça já seu cadastro!</p>
        <router-link class="text-decoration-none text-h4 text-teal-darken-1 font-weight-medium" to="/register"> Sign Up </router-link>
      </div>
      <router-link class="text-decoration-none text-h4 text-teal-darken-1 font-weight-medium" to="/login">Login</router-link>
    </div>
  </main>
</template>

<style scoped>
h1 {
  font-size: 6rem;
  font-family: 'Lobster Two', cursive;
  color: rgb(75, 129, 131);
}
.content{
  height: 85vh;
  width: 80vw;
}
.router {
  height: 15vh;
  width: 100vw;
}
</style>
