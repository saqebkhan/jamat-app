// import Vue from 'vue'
// import App from './App.vue'
// import vuetify from './plugins/vuetify'

// Vue.config.productionTip = false

// new Vue({
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')
import Vue from "vue";
import App from "./App.vue";
import * as msal from "msal";
import vuetify from "./plugins/vuetify";
// import { UserAgentApplication } from "msal";

const msalConfig = {
  auth: {
    clientId: "b39228e9-a63c-43be-a181-b3e9e6e5c80f",
    // authority: "https://wissencom.onmicrosoft.com",
    redirectUri: "http://localhost:8080",
  },
  // cache: {
  //   cacheLocation: "localStorage",
  //   storeAuthStateInCookie: false
  // }
};

export const graphScopes = { scopes: ["user.read"] };

export const myMSALObj = new msal.UserAgentApplication(msalConfig);

// console.log(myMSALObj);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
