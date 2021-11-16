import Vue from "vue";
import App from "./App";
import About from "./About";

Vue.config.productionTip = false;

// https://github.com/vuejs/vue-cli/issues/2754#issuecomment-506260131

new Vue({
  render: (h) => h(App),
  components: { App, About },
}).$mount("#app");
