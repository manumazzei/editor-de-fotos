<script setup>
</script>

<template>
  <main>
    <div class="content">
      <h1>PhotoMaster</h1>
      <h3>
        Venha conhecer o PhotoMaster! Ele foi projetado para transformar suas fotos comuns
        em obras de arte deslumbrantes! Com recursos avançados de edição e filtros
        exclusivos, você terá o poder de criar imagens impressionantes com apenas
        alguns toques!
      </h3>
      <br />
      <div class="image">
        <img src="../assets/photos/praia.jpg" alt="" />
        <img src="../assets/photos/pb.jpeg" alt="" />
        <img src="../assets/photos/azul.jpeg" alt="" />
      </div>
    </div>
    <br />

    <div class="router">
      <div class="register">
        <p>Faça já seu cadastro!</p>
        <router-link class="btn" to="/register"> Sign Up </router-link>
      </div>
      <router-link class="btn" to="/login">Login</router-link>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  margin-left: 10vw;
}
.image {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80vw;
  gap: 5rem;
}
img {
  height: 600px;
}
.router {
  background-color: rgba(121, 206, 209, 0.151);
  height: 10vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  

}
.register {
  display: flex;
  flex-direction: column;
}
.btn {
  text-decoration: none;
  color: rgb(75, 129, 131);
  font-size: 1.3rem;
}
main {
  height: 100vh;
  width: 100vw;
  padding-top: 10px;
  background-color: rgb(245, 245, 245);
}
</style>
