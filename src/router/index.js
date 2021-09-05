/* global Vue */
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      redirect: "/index/login",
      name: "Index",
      component: () => import("@/pages/login/login"),
      children: [
        {
          path: "login",
          name: "Login",
          component: () => import("@/components/Login-box/login-box.vue"),
        },
        {
          path: "register",
          name: "Register",
          component: () => import("@/components/Register-box/register-box.vue"),
        },
      ],
    },
    {
      path: "/home",
      redirect: "/home/setting",
      name: "Home",
      component: () => import("@/pages/home/home"),
      meta: { requireLogin: false },
      children: [
        {
          path: "table1",
          name: "Table",
          component: () => import("@/components/Table/table_1"),
        },
        {
          path: "table2",
          name: "Table",
          component: () => import("@/components/Table/table_2"),
        },
        {
          path: "table3",
          name: "Table",
          component: () => import("@/components/Table/table_3"),
        },
        {
          path: "table4",
          name: "Table",
          component: () => import("@/components/Table/table_4"),
        },
        {
          path: "table5",
          name: "Table",
          component: () => import("@/components/Table/table_5"),
        },
        {
          path: "table0",
          name: "Table",
          component: () => import("@/components/Table/table_6"),
        },
        {
          path: "setting",
          name: "Setting",
          component: () => import("@/components/Setting-box/Setting.vue"),
        },
      ],
    },
  ],
});
