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
    />
  </div>
</template>
<script>
import Api from '../../api/api'
import store from '../../store/store'

const columns = [
  {
    title: '学号',
    dataIndex: 'userStuNum'
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'userSex'
  },
  {
    title: '电话',
    dataIndex: 'userTel'
  },
  {
    title: 'QQ',
    dataIndex: 'userQQNum'
  },
  {
    title: '学院',
    dataIndex: 'userCollege'
  },
  {
    title: '专业',
    dataIndex: 'userProfession'
  }
]

export default {
  async mounted() {
    const { data } = await Api.getMemberMsg({
      pageNum: 1,
      pageSize: 1000,
      departmentId: store.state.login.departmentID
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
    start() {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>
