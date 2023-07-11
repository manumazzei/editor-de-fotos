<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";

const { content } = useStore();
const { auth } = content;

const router = useRouter();

const email = ref("");
const password = ref("");

async function handleSignUp() {
  const result = await auth.signIn(email.value, password.value);
  if (!result) {
    alert("email ou senha incorretos");
    return;
  }
  router.push("/login");
}

</script>

<template>
  <h1>REGISTER</h1>
  <main>
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <button @click="handleSignIn">Sign Up</button>

    <div>
        {{ auth?.user }}
    </div>
  </main>
</template>