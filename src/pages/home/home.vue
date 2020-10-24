<template>
  <div style="height: 100%">
    <a-alert
      v-if="show"
      message="Error"
      description="当前网页不允许移动端访问,请切换至桌面端访问,3秒后自动切回登录页面."
      type="error"
      showIcon
    />
    <a-layout v-if="!show">
      <a-layout id="components-layout-demo-top-side-2">
        <a-layout-sider width="200" style="background: #fff" v-model="collapsed" collapsible>
          <a-menu
            :theme="theme"
            @click="handleClick"
            mode="inline"
            :selectedKeys="[current]"
            :style="{ height: '100%', borderRight: 0 }"
          >
            <a-switch
              id="switch"
              defaultChecked
              @change="changeTheme"
              checkedChildren="dark"
              unCheckedChildren="light"
            />
            <a-menu-item key="0" @click="settingClick">
              <a-icon type="setting" />
              <span>设置</span>
            </a-menu-item>

            <a-sub-menu key="1" @titleClick="titleClick">
              <span slot="title">
                <a-icon type="user" />
                <span>我的部员</span>
              </span>
              <a-menu-item key="5" @click="activeClick(0)">部员名单</a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="2" @titleClick="titleClick">
              <span slot="title">
                <a-icon type="laptop" />
                <span>一面情况</span>
              </span>
              <a-menu-item key="6" @click="activeClick(1)">待面试成员</a-menu-item>
              <a-menu-item key="7" @click="activeClick(2)">已面试成员</a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="3" @titleClick="titleClick" v-if="showSecond">
              <span slot="title">
                <a-icon type="notification" />
                <span>二面情况</span>
              </span>
              <a-menu-item key="8" @click="activeClick(3)">待面试成员</a-menu-item>
              <a-menu-item key="9" @click="activeClick(4)">已面试成员</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="4" @click="activeClick(5)">
              <a-icon type="close-circle" />
              <span>淘汰名单</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item style="color: black">{{ clickedTitle }}</a-breadcrumb-item>
            <a-breadcrumb-item style="color: black">{{ clickedHandle }}</a-breadcrumb-item>
          </a-breadcrumb>
          <div id="introduce">
            <span style="display:inline-block">欢迎你:{{name}}</span>
            <a-button type="primary" style="margin-left: 15px" @click="logOut">退出</a-button>
          </div>

          <a-layout-content
            :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
          >
            <!-- 表格数据区 -->
            <router-view></router-view>
            <!-- 表格数据区 -->
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Methods from "./Methods";

export default {
  /**
   * @description数据描述
   * activekey是table里面的属性,即进入页面后默认展示哪一页的数据(默认是0,即部员名单)
   * loading是table更新时(一般是发ajax时)出现的加载动画,用true/false来控制是否出现
   * title/handle都是写死的数据,即导航栏上面的文字显示(标题和对应下拉)
   * clickedTitle/clickedHandle是鼠标点击后table上面的标题
   * theme:选择dark or light
   * current: 选中时的颜色变化
   * name: 登陆者的姓名
   */
  data() {
    return {
      loading: false,
      title: ["设置", "我的部员", "一面情况", "二面情况", "淘汰名单"],
      handle: [
        "部门信息自定义",
        "",
        "",
        "",
        "",
        "部员名单",
        "待面试人员",
        "已面试成员",
        "待面试人员",
        "已面试成员",
      ],
      clickedTitle: "设置",
      clickedHandle: "部门信息自定义",
      theme: "dark",
      current: "1",
      name: "",
      show: false,
      collapsed: false,
      showSecond: true,
    };
  },
  mounted() {
    //判断是不是移动端,是的话不允许访问
    if (window.navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
      this.show = true;
      let timer = setTimeout(() => {
        this.$router.push({ name: "Login" });
        clearTimeout(timer);
      }, 3000);
    }
    if (!this.$store.state.login.login) {
      this.$router.push({ name: "Login" });
    } else {
      this.name = this.$store.state.home.name;
    }
    if (this.$store.state.login.turns != 2) {
      this.showSecond = false;
    }
  },
  /**
   * @description方法
   */
  methods: {
    activeClick: Methods.activeClick,
    settingClick: Methods.settingClick,
    handleClick: Methods.handleClick,
    titleClick: Methods.titleClick,
    changeTheme: Methods.changeTheme,
    logOut: Methods.logOut,
  },
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 750px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}

#introduce {
  position: fixed;
  right: 60px;
  top: 10px;
}

#switch {
  margin: 15px 0 10px 25px;
}
</style>
