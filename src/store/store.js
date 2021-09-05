import Vuex from "vuex";
import Vue from "vue";
import home from "./module/home";
import login from "./module/login";
import validate from "./module/validate";
import department from "./module/departmentMsg";
/* global Vue */
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    home,
    login,
    validate,
    department,
  },
});

export default store;
