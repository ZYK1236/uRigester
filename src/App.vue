<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getLCP, getFID, getCLS, getFCP } from "web-vitals";
import axios from "axios";

export default {
  name: "App",
  components: {},
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("login")) {
      this.$store.state.login = Object.assign(
        {},
        JSON.parse(sessionStorage.getItem("login"))
      );
    }
    if (sessionStorage.getItem("home")) {
      this.$store.state.home = Object.assign(
        {},
        JSON.parse(sessionStorage.getItem("home"))
      );
    }
    if (sessionStorage.getItem("department")) {
      this.$store.state.department = Object.assign(
        {},
        JSON.parse(sessionStorage.getItem("department"))
      );
    }
    sessionStorage.clear();
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      alert(1);
      this.$store.commit({ type: "UNVALIDATE" });
      sessionStorage.setItem("login", JSON.stringify(this.$store.state.login));
      sessionStorage.setItem("home", JSON.stringify(this.$store.state.home));
      sessionStorage.setItem(
        "department",
        JSON.stringify(this.$store.state.department)
      );
    });
  },
  mounted() {
    getFCP((data) => {
      const fcp = data.value / 1000;
      getLCP((data) => {
        const lcp = data.value / 1000;
        axios.post("https://redtour.net/property", {
          fcp,
          lcp,
          dom_content_loaded: lcp + 0.01,
          loaded: fcp + lcp,
        });
      });
    });
  },
};
</script>

<style>
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
