<template>
  <div id="setting">
    <h2 style="color: #188ffd">*当前面试官微信号(貌似现在只能添加不能修改)</h2>
    <a-select
      mode="tags"
      style="width: 100%"
      @change="handleChange"
      :defaultValue="defaultWeChat"
      placeholder="输入微信ID"
    ></a-select>
    <h2 id="title">*当前面试轮次</h2>
    <a-radio-group
      @change="demo"
      :defaultValue="1"
      :value="turns"
      buttonStyle="solid"
      id="radio_group"
    >
      <a-radio-button value="1">一轮</a-radio-button>
      <a-radio-button value="2">二轮</a-radio-button>
    </a-radio-group>

    <h2 id="title">*当前评价参数(必须5个)</h2>
    <div id="checkBox">
      <div>
        <a-checkbox @change="onCheckAllChange" :checked="checkAll"
          >Check all</a-checkbox
        >
      </div>
      <br />
      <a-checkbox-group
        :options="plainOptions"
        v-model="checkedList"
        @change="onChange"
      />
      <a-select
        mode="tags"
        style="width: 17%"
        @change="handleChange_2"
        placeholder="自定义评价参数,按回车确认"
      ></a-select>
    </div>
    <a-divider />
    <div id="button">
      <a-button size="large" disabled=true>查看二维码</a-button>
      <a-button size="large" type="primary" @click="submit">修改/确认</a-button>
    </div>
  </div>
</template>
<script>
import Api from "../../api/api.js";
import store from "../../store/store.js";
const plainOptions = ["性格", "礼貌", "技术水平"];
const defaultCheckedList = ["性格","礼貌","技术水平"];

export default {
  async mounted() {
    const { data } = await Api.getInterviewEr(store.state.login.departmentID);
    const data_2 = await Api.getInterviewMsg(store.state.login.departmentID);

    this.defaultWeChat.push(...data);
    this.turns = data_2.data.interviewRounds + "";
    store.commit({
      type: 'setParam',
      param4: data_2.data.param4Name,
      param5: data_2.data.param5Name
    })
    if (this.plainOptions.length === 3) {
      this.plainOptions.push(data_2.data.param4Name, data_2.data.param5Name);
    }
  },
  data() {
    return {
      defaultWeChat: [],
      checkedList: defaultCheckedList,
      checkAll: false,
      plainOptions,
      valueLength: 0,
      watchedValue: [],
      turns: "1",
    };
  },
  watch: {
    watchedValue: {
      handler(newVal, oldVal) {
        // let targetIndex = this.plainOptions.length
        this.plainOptions = this.plainOptions.slice(0, 3).concat(newVal);
        if (oldVal.length < newVal.length) {
          if ((this.checkAll = true)) {
            this.checkAll = false;
          }
        } else {
          oldVal.forEach((item) => {
            if (newVal.indexOf(item) === -1) {
              let index = this.checkedList.indexOf(item);
              this.checkedList.splice(index, 1);
            }
          });
        }
      },
      deep: true,
    },
  },
  methods: {
    handleChange(value) {
      this.defaultWeChat = value.slice(0);
    },
    handleChange_2(value) {
      this.watchedValue = value;
    },
    demo(e) {
      this.turns = e.target.value;
    },
    onChange() {
      this.checkAll = this.checkedList.length === this.plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions : [],
        checkAll: e.target.checked,
      });
    },

    async submit() {
      if (this.defaultWeChat.length === 0 || this.checkedList.length !== 5) {
        this.$notification.open({
          message: "消息提示",
          description: "微信号不能为空/评价参数必须5个",
          icon: <a-icon type="stop" />,
          duration: 2,
        });
      } else {
        const msg = {
          departmentId: store.state.login.departmentID,
          interviewRounds: this.turns,
          param1Name: this.checkedList[0],
          param2Name: this.checkedList[1],
          param3Name: this.checkedList[2],
          param4Name: this.checkedList[3],
          param5Name: this.checkedList[4],
        };

        await Api.addInterviewEr({
          departmentId: store.state.login.departmentID,
          userId: this.defaultWeChat,
        });

        await Api.addInterviewMsg(msg);
        this.$notification.open({
          message: "消息提示",
          description: "成功修改，正在刷新页面",
          icon: <a-icon type="smile" style="color: #108ee9" />,
          duration: 2,
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 1000);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
#select
  margin: 20px 0
#title
  margin-top: 30px
  color: #188ffd
#radio_group
  margin-bottom: 15px
#button
  display: flex
  flex-direction: row
  justify-content: space-around
</style>
