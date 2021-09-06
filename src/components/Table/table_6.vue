<template>
  <div>
    <div style="margin-bottom: 0px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        :loading="loading"
        @click="activateModal"
        style="margin-bottom: 10px"
        >发送录取短信</a-button
      >
      <a-modal v-model="isVisible_1" title="短信信息" @ok="checkIfLegal">
        <a-input v-model="time" placeholder="群号" style="margin-top: 20px">
          <a-icon slot="prefix" type="clock-circle" />
        </a-input>
        <a-alert
          message="群号不得为空！"
          banner
          style="margin-top: 5px"
          v-if="isTimeIllegal"
        />
      </a-modal>

      <span style="margin-left: 8px">
        <template v-if="hasSelected">{{
          `当前已选择${selectedRowKeys.length} 个目标`
        }}</template>
      </span>
    </div>
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="data"
      :pagination="pageSetter"
      :loading="loading"
    />
  </div>
</template>
<script>
import Api from "../../api/api";
import store from "../../store/store";

const columns = [
  {
    title: "学号",
    dataIndex: "userStuNum",
  },
  {
    title: "姓名",
    dataIndex: "userName",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
  },
  {
    title: "性别",
    dataIndex: "userSex",
  },
  {
    title: "电话",
    dataIndex: "userTel",
  },
  {
    title: "QQ",
    dataIndex: "userQQNum",
  },
  {
    title: "学院",
    dataIndex: "userCollege",
  },
  {
    title: "专业",
    dataIndex: "userProfession",
  },
];

export default {
  async mounted() {
    const { data } = await Api.getMemberMsg({
      pageNum: 1,
      pageSize: 1000,
      departmentId: store.state.login.departmentID,
    });

    this.loading = false;
    if (data && data.total) {
      this.pageSetter.total = data.total;
    }
    if (data && data.list) {
      this.data = this.data.concat(data.list);
    }
    let i = 0;
    this.data.forEach((element) => {
      element.key = i++;
    });
  },
  data() {
    return {
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pageSetter: {
        total: 0,
      },
      data: [],
      time: "",
      location: "",
      phoneNumber: "",
      isTimeIllegal: false,
      isLocatinIllegal: false,
      isPhoneNumberIllegal: false,
      isVisible_1: false,
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    activateModal() {
      this.isVisible_1 = true;
    },
    checkIfLegal() {
      if (this.time) {
        this.isVisible_1 = false;
        this.start();
      }
    },
    async start() {
      this.loading = true;
      let userId = [];
      this.selectedRowKeys.forEach((element) => {
        let re = this.data[element].userId;
        userId.push(re);
      });
      await Api.postThirdMessage({
        userId,
        departmentName: store.state.home.name,
        organizationName: store.state.login.organizationName,
        secret: this.time,
      });
      this.loading = false;
      this.selectedRowKeys = [];
      this.$notification.open({
        message: "消息提示",
        description: "成功发送",
        icon: <a-icon type="smile" style="color: #108ee9" />,
        duration: 2,
      });
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
  },
};
</script>
