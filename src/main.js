import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueRouter);

// https://github.com/vuejs/vue-cli/issues/2754#issuecomment-506260131

new Vue({
  render: (h) => h(App),
  store,
  router,
  components: { App },
}).$mount("#app");
