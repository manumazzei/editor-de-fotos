<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";

const { content } = useStore();
const { auth } = content;

const router = useRouter();

const email = ref("");
const password = ref("");

const passwordTest = ref("");
const passwordType = ref ("password")

async function handleSignUp() {
  const result = await auth.signUp(email.value, password.value);
  if (!result) {
    alert("email ou senha invalidos");
    return;
  }
  router.push("/login");
}

const confirmPassword = computed(() => {
  password.value === passwordTest.value;
});

const showPassword = () => {
  passwordType.value =
    passwordType.value === "password" ? "text" : "password";
};
</script>

<template>
  <h1>REGISTER</h1>
  <main>
    <form>
      <input required type="email" v-model="email" placeholder="Email" />

      <input
        v-model="password"
        :type="passwordType"
        required
        placeholder="Password"
        append-icon="mdi-eye"
        @click:append="showPassword"
      />

      <input
        v-model="passwordTest"
        :type="passwordType"
        required
        placeholder="Confirm Password"
        append-icon="mdi-eye"
        @click:append="showPassword"
      />
    </form>

    <button 
    @click="handleSignUp"
    :disabled="!confirmPassword"
    >Sign Up</button>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
