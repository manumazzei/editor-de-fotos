<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";

const { content } = useStore();
const { auth } = content;

const router = useRouter();

const email = ref("");
const password = ref("");
const passwordType = ref("password");

async function handleSignIn() {
  const result = await auth.signIn(email.value, password.value);
  if (!result) {
    alert("Email ou senha incorretos");
    return;
  }
  router.push("/dashboard");
}

async function handleSignInGoogle() {
  const result = await auth.signInGoogle();
  console.log(result);

  if (!result) {
    alert("Erro, por favor tente mais tarde");
    return;
  }
  router.push("/dashboard");
}
const showPassword = () => {
  passwordType.value =
    passwordType.value === "password" ? "text" : "password";
};
</script>

<template>

  <h1>LOGIN</h1>
  <main>
    <input type="email" v-model="email" />
    <input type="text" v-model="password" />
    <v-btn @click="handleSignIn">Log In</v-btn>

    <v-btn @click="handleSignInGoogle">Log In with Google</v-btn>
    </main>
=========
  <div
    class="page bg-grey-lighten-3 d-flex align-center justify-center flex-column"
  >
    <h1>LOGIN</h1>
    <br />
    <v-card class="card bg-grey-lighten-4 px-16" rounded="xl" elevation="16">
      <v-form class="mt-8 mx-4">
        <v-text-field
          required
          variant="underlined"
          type="email"
          v-model="email"
          label="Email"
        />

        <v-text-field
          required
          variant="underlined"
          type="password"
          v-model="password"
          label="Password"
        />
      </v-form>


      <div class="d-flex flex-column mx-16 mt-4">
        <v-btn
          color="teal-darken-2"
          size="large"
          type="submit"
          variant="elevated"
          class="rounded-xl font-weight-bold text-white text-h7"
          elevation="4"
          height="60px"
          @click="handleSignIn"
          :disabled="!password"
          >Log In</v-btn
        >
      </div>
      <v-divider class="my-6" />
      <div class="d-flex flex-column align-center mx-16">
        <p class="text-teal-darken-1 font-weight-bold mb-4">OU</p>
        <v-btn
          size="large"
          type="submit"
          variant="elevated"
          class="rounded-xl font-weight-bold text-teal-darken-2 text-h7"
          elevation="4"
          width="250px"
          height="50px"
          @click="handleSignInGoogle"
          >Log In with Google</v-btn
        >
      </div>
      <v-divider class="my-4" />
      <div
        class="footer text-body-1 d-flex flex-column align-center justify-space-around mx-4 mb-4 pb-4"
      >
        <p class="text-grey-darken-3">
          Não possui uma conta? Faça já seu cadastro
        </p>
        <router-link
          to="./register"
          class="text-teal-darken-1 text-decoration-none"
        >
          Sign Up
        </router-link>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Kaushan Script', cursive;
  color: rgb(75, 121, 131);
  font-size: 2.2rem;

}
.page {
  height: 100vh;
}
.card {
  width: 700px;
  height: 50%;
}
</style>
