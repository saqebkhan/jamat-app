<template>
  <div :class="bcg">
    <h2>Set Preffered background color</h2>
    <select name="" id="" v-model="bcg">
      <option value="black">Black</option>
      <option value="red">Red</option>
      <option value="gray">Gray</option>
      <option value="blue">Blue</option>
    </select>
    <h1>{{bcg}}</h1>
    <input v-model="message" @keyup.enter="sendMessage" placeholder="message" style="border:1px solid gray"/>
    <ul v-for="(message, index) in messages" :key="index">
      <li>{{ message }}</li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: null,
      messages: [],
      message: "",
      bcg: ""
    };
  },
  mounted() {
    this.socket = io("http://localhost:3000");
    this.socket.on("message", (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    sendMessage() {
      this.socket.emit("message", this.message);
      this.message = "";
    },
  },
};
</script>
<style scoped>
.black{
  background-color: black;
}
.red{
  background-color: red;
}
.gray{
  background-color: gray;
}
.blue{
  background-color: blue;
}
</style>