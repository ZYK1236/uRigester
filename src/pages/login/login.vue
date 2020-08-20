<template>
  <div id="login">
    <img id="logo" :src="logo_src" alt="logo" />
    <img id="background" :src="background_src" alt="背景" />

    <!-- 显示登录框和注册框 -->
    <router-view></router-view>

    <h2>U报名后台管理 &copy;青鸢工作室</h2>
  </div>
</template>

<script>

export default {
  data() {
    return {
      logo_src: require("../../assets/img/logo.png"),
      background_src: require("../../assets/img/background.png")
    };
  }
};
</script>

<style lang="stylus" scoped>
#background
  position: fixed
  bottom: 0
  top: 0
  left: 0
  right: 0
  margin: auto
  width: 100%
  height: 100%
  min-width: 1000px
  z-index: -10
  zoom: 1
  background-repeat: no-repeat
  background-size: cover
  -webkit-background-size: cover
  -o-background-size: cover
#logo
  height: 120px
  width: 200px
  position: fixed
  z-index: -1
  top: 50px
  left: 0
  right: 0
  margin: 0 auto
h2
  width: 270px
  position: fixed
  bottom: 30px
  left: 0
  right: 0
  margin: 0 auto
  color: whitesmoke
@media (max-width: 350px)
    h2
        display: none
  
</style>