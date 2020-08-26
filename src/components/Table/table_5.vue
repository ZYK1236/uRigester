<template>
  <div>
    <div style="margin-bottom: 0px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        :loading="loading"
        @click="start"
      >
        捞回二面已面试
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
    const { data } = await Api.getLowerMsg({
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
  },
};
</script>
