<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="danger" @click="low">
        不通过
      </a-button>
      <a-button type="primary" ghost style="margin-left: 30px" @click="pass">
        录取为我的部员
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
        onChange: onSelectChange
      }"
      :columns="columns"
      :data-source="data"
      :pagination="pageSetter"
    >
      <tr slot="name" slot-scope="text">
        <span v-html="text"></span></tr
    ></a-table>
  </div>
</template>
<script>
import Api from "../../api/api";
import store from "../../store/store";
// console.log(store.state.department.param4);

const columns = [
  {
    title: "姓名",
    dataIndex: "userName",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "性格",
    dataIndex: "param1Score",
  },
  {
    title: "礼貌",
    dataIndex: "param2Score",
  },
  {
    title: "技术水平",
    dataIndex: "param3Score",
  },
  {
    title: store.state.department.param4,
    dataIndex: "param4Score",
  },
  {
    title: store.state.department.param5,
    dataIndex: "param5Score",
  },
  {
    title: "综评",
    dataIndex: "overview",
  },
  {
    title: "详情",
    dataIndex: "detail",
  },
];

export default {
  async mounted() {
    const { data } = await Api.getSecondedMsg({
      organizationId: store.state.login.organizationID,
      pageNum: 1,
      pageSize: 1000,
      departmentName: store.state.home.name,
    });

    console.log(data.list);
    this.pageSetter.total = data.total;
    this.data = this.data.concat(data.list);
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
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    low() {
      let low = [];
      this.selectedRowKeys.forEach((element) => {
        low.push(this.data[element]);
      });
      store.commit({
        type: "setLow",
        low,
      });
      this.$notification.open({
        message: "消息提示",
        description: "成功修改",
        icon: <a-icon type="smile" style="color: #108ee9" />,
        duration: 2,
      });
    },
    async pass() {
      let pass = [];
      this.selectedRowKeys.forEach((element) => {
        pass.push(this.data[element].userId);
        this.data[
          element
        ].userName = ` <span style="color: #60b911">${this.data[element].userName} (二面待面试)</span> `;
      });
      await Api.addSecondMsg({
        organizationId: store.state.login.organizationID,
        departmentId: store.state.login.departmentID,
        departmentName: store.state.home.name,
        userId: pass,
      });
      this.$notification.open({
        message: "消息提示",
        description: "成功修改",
        icon: <a-icon type="smile" style="color: #108ee9" />,
        duration: 2,
      });
    },
  },
};
</script>
