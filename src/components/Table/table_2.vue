<template>
  <div>
    <div style="margin-bottom: 0px">
      <a-button type="danger" @click="low">
        不通过
      </a-button>
      <a-button type="primary" ghost style="margin-left: 30px" @click="pass">
        进入二面名单
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
    const { data } = await Api.getFirstedMsg({
      organizationId: store.state.login.organizationID,
      pageNum: 1,
      pageSize: 1000,
      departmentName: store.state.home.name,
    });

    this.pageSetter.total = data.total;
    this.data = this.data.concat(data.list);
    let i = 0;
    this.data.forEach((element) => {
      element.key = i++;
    });
    this.data.forEach((element) => {
      console.log(element.key);
    });
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
      second: [],
      // low: [],
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
      console.log(
        "selectedRowKeys changed: ",
        selectedRowKeys,
        this.data[selectedRowKeys[selectedRowKeys.length - 1]]
      );
      this.selectedRowKeys = selectedRowKeys;
    },
    async low() {
      let low = [];
      let lowId = [];
      let tempData = [];
      let i = 0;

      this.selectedRowKeys.forEach((element) => {
        i++;
        low.push(this.data[element]);
        lowId.push(this.data[element].userId);
        this.data.splice(element, 1, -1);
      });

      this.pageSetter.total = this.data.total - i;
      this.data.forEach((element) => {
        console.log(element);
        if (element !== -1) {
          tempData.push(element);
        }
      });

      this.data = tempData;
      this.selectedRowKeys = [];

      store.commit({
        type: "setLow",
        low,
      });

      await Api.setToLow({
        organizationId: store.state.login.organizationID,
        departmentId: store.state.login.departmentID,
        departmentName: store.state.home.name,
        userId: lowId,
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
      let passId = [];
      let tempData = [];
      let i = 0;

      this.selectedRowKeys.forEach((element) => {
        i++;
        pass.push(this.data[element]);
        passId.push(this.data[element].userId);
        this.data.splice(element, 1, -1);
      });

      this.data.forEach((element) => {
        if (element !== -1) {
          tempData.push(element);
        }
      });

      this.pageSetter.total = this.data.total - i;
      this.data = tempData;
      this.selectedRowKeys = [];

      store.commit({
        type: "setUnsecond",
        pass,
      });

      await Api.setToPass({
        organizationId: store.state.login.organizationID,
        departmentId: store.state.login.departmentID,
        departmentName: store.state.home.name,
        userId: passId,
      });

      this.$notification.open({
        message: "消息提示",
        description: "成功修改",
        icon: <a-icon type="smile" style="color: #108ee9" />,
        duration: 2,
      });
    }
  },
};
</script>
