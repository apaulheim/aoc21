import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    days: [
      { id: 1, x: 3, y: 3, langs: [] },
      { id: 2, x: 50, y: 70, langs: [] },
      { id: 3, x: 8, y: 70, langs: [] },
      { id: 4, x: 73, y: 70, langs: [] },
      { id: 5, x: 10, y: 20, langs: [] },
      { id: 6, x: 63, y: 4, langs: [] },
      { id: 7, x: 40, y: 30, langs: [] },
      { id: 8, x: 90, y: 15, langs: [] },
      { id: 9, x: 70, y: 30, langs: [] },
      { id: 10, x: 30, y: 5, langs: [] },
      { id: 11, x: 50, y: 3, langs: [] },
      { id: 12, x: 80, y: 3, langs: [] },
      { id: 13, x: 60, y: 41, langs: [] },
      { id: 14, x: 30, y: 40, langs: [] },
      { id: 15, x: 90, y: 40, langs: [] },
      { id: 16, x: 18, y: 5, langs: [] },
      { id: 17, x: 40, y: 70, langs: [] },
      { id: 18, x: 80, y: 50, langs: [] },
      { id: 19, x: 63, y: 70, langs: [] },
      { id: 20, x: 20, y: 30, langs: [] },
      { id: 21, x: 27, y: 75, langs: [] },
      { id: 22, x: 20, y: 70, langs: [] },
      { id: 23, x: 40, y: 3, langs: [] },
      { id: 24, x: 3, y: 40, langs: [] },
    ],
  },
  mutations: {},
});

export default store;
