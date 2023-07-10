<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/composables/useStore";

const { content } = useStore();
const { auth } = content;

const router = useRouter();

const email = ref("");
const password = ref("");
const passwordtest = "";
const show = false;

async function handleSignUp() {
  const result = await auth.signUp(email.value, password.value);
  if (!result) {
    alert("email ou senha invalidos");
    return;
  }
  router.push("/login");
}

function requiredRules (input) {
      return !!input || "Field is required";
    }

function passwordRules(input) {
      let regexSpecial = /\W|_/;
      let regexNumber = /(\d+)| /g;
      if (input.includes(" ")) return "No spaces";
      if (input.length < 8, !regexSpecial.test(input), !regexNumber.test(input))
        return "At least 8 characters, 1 special character and 1 number";
      return true;
    }
function confirmPassword(passwordtest) {
      return passwordtest !== this.password ? "Passwords don't match" : true;
    }


</script>

<template>
  <h1>REGISTER</h1>
  <main>
    <input type="email" v-model="email" />

    <input 
    v-model="password"
    :rules="[requiredRules, passwordRules]"
    label="Password"
    :type="show ? 'text' : 'password'"
    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append-inner="show = !show"
    />

    <input 
    v-model="passwordtest"
    :rules="[requiredRules, confirmPassword]"
    label="Confirm Password"
    :type="show ? 'text' : 'password'"
    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append-inner="show = !show"/>

    <button @click="handleSignUp">Sign Up</button>

  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem ;
}
</style>