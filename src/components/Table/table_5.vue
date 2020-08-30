<template>
  <div>
    <div style="margin-bottom: 0px">
      <span style="margin-left: 8px">
        <template v-if="hasSelected">{{ `当前已选择${selectedRowKeys.length} 个目标` }}</template>
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
    >
      <a-tooltip slot="detail" slot-scope="text">
        <template slot="title">{{text.detail}}</template>
        <span style="color: #00868B">查看详情</span>
      </a-tooltip>
    </a-table>
  </div>
</template>
<script>
import Api from '../../api/api'
import store from '../../store/store'

const columns = [
  {
    title: '姓名',
    dataIndex: 'userName',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性格',
    dataIndex: 'param1Score'
  },
  {
    title: '礼貌',
    dataIndex: 'param2Score'
  },
  {
    title: '技术水平',
    dataIndex: 'param3Score'
  },
  {
    title: store.state.department.param4,
    dataIndex: 'param4Score'
  },
  {
    title: store.state.department.param5,
    dataIndex: 'param5Score'
  },
  {
    title: '综评',
    dataIndex: 'overview'
  },
  {
    title: '详情',
    width: '100px',
    scopedSlots: { customRender: 'detail' },
    fixed: 'right',
    align: 'center'
  }
]

export default {
  async mounted() {
    const { data } = await Api.getLowerMsg({
      organizationId: store.state.login.organizationID,
      pageNum: 1,
      pageSize: 1000,
      departmentName: store.state.home.name
    })

    this.loading = false
    this.pageSetter.total = data.total
    this.data = this.data.concat(data.list)
    let i = 0
    this.data.forEach((element) => {
      element.key = i++
    })
  },
  data() {
    return {
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pageSetter: {
        total: 0
      },
      data: [],
      loading: true
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>
