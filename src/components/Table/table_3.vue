<template>
  <div>
    <div style="margin-bottom: 0px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        :loading="loading"
        @click="start"
      >
        发送面试通知短信
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${selectedRowKeys.length} items` }}
        </template>
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
    const { data } = await Api.getUnSecondMsg({
      organizationId: store.state.login.organizationID,
      pageNum: 1,
      pageSize: 1000,
      departmentName: store.state.home.name,
    });

    this.data = this.data.concat(data.list);
    let i = 0;
    this.data.forEach((element) => {
      element.key = i++;
    });
    this.pageSetter.total = this.data.length;
  },
  data() {
    return {
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pageSetter: {
        total: 50,
      },
      data: [],
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    async start() {
      let userId = [];
      this.selectedRowKeys.forEach((element) => {
        let re = this.data[element].userId;
        userId.push(re);
      });
      await Api.postSecondMessage({
        userId,
        departmentName: store.state.home.name,
        organizationName: store.state.login.organizationName,
        timeSlot: "明天",
        place: "大活",
        telNo: "11010101123",
      });
      this.loading = true;
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
