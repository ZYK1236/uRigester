<template>
  <div>
    <h1>Welcome</h1>
    <div id="form">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <!-- 用户名 -->
        <a-form-item>
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
            placeholder="账户名称"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- 密码 -->
        <a-form-item :validate-status="status" has-feedback>
          <a-input
            type="password"
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your password!' }] }
        ]"
            placeholder="password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- 记住密码 -->
        <a-checkbox
          v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
        >记住密码</a-checkbox>
        <router-link :to="{name: 'Register'}" class="login-form-forgot">注册账户</router-link>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">Log in(测试版)</a-button>
          <a-button class="login-form-button" @click="stepIn">已登录，直接进入</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import Methods from "./Methods";
export default {
  data() {
    return {
      status: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit: Methods.handleSubmit,
    stepIn: Methods.stepIn
  }
};
</script>

<style lang="stylus" scoped>
h1
  position: fixed
  width: 250px
  left: 0
  top: 150px
  right: 0
  margin: 0 auto
  font-size: 60px
  color: whitesmoke
#form
  position: fixed
  width: 30%
  padding: 20px 50px
  top: 280px
  right: 0
  left: 0
  margin: 0 auto
  background-color: rgba(255, 255, 255, 0.7)
  border-radius: 10px
#components-form-demo-normal-login .login-form
  max-width: 300px
#components-form-demo-normal-login .login-form-forgot
  float: right
#components-form-demo-normal-login .login-form-button
  width: 100%
@media (max-width: 350px)
    #form
        width: 250px
        height: 250px
    #logo
        display: none
</style>