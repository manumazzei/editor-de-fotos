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
const passwordType = ref("password");

async function handleSignUp() {
  const result = await auth.signUp(email.value, password.value);
  if (!result) {
    alert("email ou senha invalidos");
    return;
  }
  router.push("/login");
}

const confirmPassword = computed(() => {
  return password.value === passwordTest.value;
});

// const showPassword = () => {
//   passwordType.value =
//     passwordType.value === "password" ? "text" : "password";
// };
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
          label="Password"
          />
          <!-- append-icon="mdi-eye"
          @click:append="showPassword" -->
          
        <v-text-field
          v-model="passwordTest"
          :type="passwordType"
          required
          variant="underlined"
          label="Confirm Password"
        />
        <!-- append-icon="mdi-eye"
        @click:append="showPassword" -->
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
        :disabled="!confirmPassword"
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
  font-family: "Lobster Two", cursive;
  color: rgb(75, 121, 131);
  font-size: 2.3rem;
}
.page {
  height: 100vh;
}
.card {
  width: 700px;
  height: 50%;
}
</style>
