<template>
  <div class="container">
    <h1>{{ count }}</h1>
    <div v-if="!authenticated">
      <button @click="login">Login</button>
    </div>
    <div v-else>
      <button @click="logout">Logout</button>
      <button @click="incrementCount">Click me</button>
    </div>
  </div>
</template>

<script>
import { graphScopes } from "../main";
import { myMSALObj } from "../main";
export default {
  data() {
    return {
      count: 0,
      authenticated: false,
    };
  },
  methods: {
    incrementCount() {
      this.count++;
    },
    async login() {
      try {
        console.log(graphScopes);
        console.log(myMSALObj, "msa obj");
        await myMSALObj.loginPopup(graphScopes);
        this.authenticated = true;
      } catch (err) {
        console.error(err);
      }
    },
    async logout() {
      try {
        await myMSALObj.logout();
        this.authenticated = false;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
