<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";

const { content } = useStore();
const { auth } = content;

const router = useRouter();

const email = ref("");
const password = ref("");

const passwordConfirmation = ref("");
const passwordType = ref("password");

async function handleSignUp() {
  const result = await auth.signUp(email.value, password.value);
  if (!result) {
    alert("email ou senha invalidos");
    return;
  }
  router.push("/login");
}

const isPasswordConfirmed = computed(() => {
  return password.value === passwordConfirmation.value;
});

const showPassword = () => {
  passwordType.value =
    passwordType.value === "password" ? "text" : "password";
};
</script>

<template>
  <div
    class="page bg-grey-lighten-3 d-flex align-center justify-center flex-column"
  >
    <h1>CADASTRO</h1>
    <br />
    <v-card class="card bg-grey-lighten-4 px-16" rounded="xl" elevation="16">
      <v-form class="mt-8">
        <v-text-field
          required
          variant="underlined"
          type="email"
          v-model="email"
          label="Email"
        />

        <v-text-field
          v-model="password"
          :type="passwordType"
          required
          variant="underlined"
          label="Senha"
          append-inner-icon="mdi-eye"
          @click:append-inner="showPassword"
          />
          
        <v-text-field
          v-model="passwordConfirmation"
          :type="passwordType"
          required
          variant="underlined"
          label="Confirme Senha"
          append-inner-icon="mdi-eye"
          @click:append-inner="showPassword"
        />
      </v-form>
      <v-divider class="my-6" />
      <v-btn
        block
        color="teal-darken-2"
        size="large"
        type="submit"
        variant="elevated"
        class="rounded-xl font-weight-bold text-white text-h7"
        elevation="4"
        height="60px"
        @click="handleSignUp"
        :disabled="!isPasswordConfirmed"
      >
        Sign Up
      </v-btn>
      <v-divider class="my-6" />
      <v-card-actions
        class="text-body-1 d-flex flex-column align-center justify-center"
      >
        <p class="text-grey-darken-3">Já possui cadastro?</p>
        <router-link
          to="./login"
          class="text-teal-darken-1 text-decoration-none"
        >
          Log In
        </router-link>
      </v-card-actions>
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
