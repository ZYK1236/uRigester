<template>
  <div id="setting">
    <div class="spin-wrap" v-if="spinning">
      <a-spin size="large" :spinning="spinning" />
    </div>
    <div v-if="!spinning">
      <h2 style="color: #666666">
        *面试官U报名小程序ID（U报名小程序头像下方），面试官只能增加不能删除
      </h2>
      <a-select
        mode="tags"
        style="width: 100%"
        @change="handleChange"
        :defaultValue="defaultWeChat"
        placeholder="输入微信ID"
      ></a-select>
      <h2 id="title">*面试轮次</h2>
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

      <h2 id="title">*评价参数(必须5个)</h2>
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
        <a-button size="large" :href="memberListExcelUrl" :disabled="true"
          >下载部员名单</a-button
        >
        <a-button size="large" type="primary" @click="submit"
          >修改/确认</a-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import Api from "../../api/api.js";
import store from "../../store/store.js";
const defaultCheckedList = [];

export default {
  async mounted() {
    const { data } = await Api.getInterviewEr(store.state.login.departmentID);
    const data_2 = await Api.getInterviewMsg(store.state.login.departmentID);

    this.spinning = false;
    this.defaultWeChat.push(...data);
    this.turns = data_2.data.interviewRounds + "";

    store.commit({
      type: "setParam",
      param3: data_2.data.param3Name,
      param4: data_2.data.param4Name,
      param5: data_2.data.param5Name,
    });

    if (
      data_2.data.param3Name &&
      data_2.data.param4Name &&
      data_2.data.param5Name
    ) {
      this.plainOptions.push(
        data_2.data.param3Name,
        data_2.data.param4Name,
        data_2.data.param5Name
      );
    }
  },
  data() {
    return {
      defaultWeChat: [],
      checkedList: defaultCheckedList,
      checkAll: false,
      plainOptions: ["性格", "礼貌"],
      valueLength: 0,
      watchedValue: [],
      turns: "1",
      spinning: true,
    };
  },
  watch: {
    watchedValue: {
      handler(newVal, oldVal) {
        // let targetIndex = this.plainOptions.length
        this.plainOptions = this.plainOptions.slice(0, 2).concat(newVal);
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
  computed: {
    memberListExcelUrl() {
      return (
        "https://xdvolunteer.xyz/department/export?departmentId=" +
        store.state.login.departmentID
      );
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

    async download() {
      await Api.download({
        departmentId: store.state.login.departmentID,
      });
    },

    async submit() {
      this.$store.commit({
        type: "SET_TURNS",
        turns: this.turns,
      });

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
          departmentName: store.state.login.departmentName,
          interviewRounds: this.turns,
          param1Name: this.checkedList[0],
          param2Name: this.checkedList[1],
          param3Name: this.checkedList[2],
          param4Name: this.checkedList[3],
          param5Name: this.checkedList[4],
          organizationId: store.state.login.organizationID,
          organizationName: store.state.login.organizationName,
        };

        try {
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
        } catch (error) {
          this.$notification.open({
            message: "消息提示",
            description: "后端又出错啦",
            icon: <a-icon type="dislike" style="color: red" />,
            duration: 2,
          });
        }
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
#select {
  margin: 20px 0;
}

#title {
  margin-top: 30px;
  color: #666666;
}

#radio_group {
  margin-bottom: 15px;
}

#button {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.spin-wrap {
  text-align: center;
  background: rgba(0, 0, 0, 0);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>
