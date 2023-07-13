<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";

const { content } = useStore();
const { auth } = content;

const router = useRouter();

const email = ref("");
const password = ref("");

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
</script>

<template>
  <h1>LOGIN</h1>
  <main>
    <input type="email" v-model="email" />
    <input type="text" v-model="password" />
    <v-btn @click="handleSignIn">Log In</v-btn>

    <v-btn @click="handleSignInGoogle">Log In with Google</v-btn>

    <div>
      {{ auth?.user }}
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
