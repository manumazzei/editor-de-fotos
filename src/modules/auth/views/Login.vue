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
    alert("email ou senha incorretos");
    return;
  }
  router.push("/about");
}

async function handleSignInGoogle() {
  const result = await auth.signInGoogle();
  console.log(result);

  if (!result) {
    alert("email ou senha incorretos");
    return;
  }
  router.push("/about");
}
</script>

<template>
  <h1>LOGIN</h1>
  <main>
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <button @click="handleSignIn">Log In</button>

    <button @click="handleSignInGoogle">Log In with Google</button>

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
