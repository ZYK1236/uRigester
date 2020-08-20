<template>
  <div>
    <div>
      <div style="margin-bottom: 16px">
        <span style="color:rgb(35, 130, 224);fontSize:20px">
          {{
          tableTitle
          }}
        </span>

        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{
            `Selected ${selectedRowKeys.length} items`
            }}
          </template>
        </span>
      </div>

      <a-table
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :columns="tableColumns"
        :dataSource="computedData"
        size="middle"
      >
        <tr
          slot="name"
          slot-scope="text"
          :style="nameStyleController(text)"
        >{{ text }}{{stateInfo(text)}}</tr>
      </a-table>

      <div>
        <a-button
          class="buttonstyle"
          size="large"
          v-if="buttonList.indexOf(1)>-1 && computedData.length !== 0"
          @click="funcExportOffer"
        >导出录取通知</a-button>
        <a-button
          class="buttonstyle"
          size="large"
          v-if="buttonList.indexOf(2)>-1 && computedData.length !== 0"
          @click="funcProduceTable"
        >生成部员名单</a-button>
        <a-button
          class="buttonstyle"
          size="large"
          v-if="buttonList.indexOf(3)>-1 && computedData.length !== 0"
          @click="funcInterviewMessage"
        >发布面试通知</a-button>
        <a-button
          class="buttonstyle"
          size="large"
          v-if="buttonList.indexOf(4)>-1 && computedData.length !== 0"
          @click="funcOffer"
        >录取</a-button>
        <a-button
          class="buttonstyle"
          size="large"
          v-if="buttonList.indexOf(5)>-1 && computedData.length !== 0"
          @click="funcMoveStageSec"
        >晋升至二面</a-button>
        <a-button
          class="buttonstyle"
          size="large"
          v-if="buttonList.indexOf(6)>-1 && computedData.length !== 0"
          @click="funcMoveStageSec"
        >捞回二面</a-button>
        <a-button
          class="buttonstyle"
          size="large"
          v-if="buttonList.indexOf(7)>-1 && computedData.length !== 0"
          @click="funcEliminate"
        >淘汰</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { data, prefabOutput } from "./table-data";
import { Methods } from "./Methods";

export default {
  name: "infoTable",
  data() {
    /* 1.data是每个成员的信息：具体qq,具体学号什么的
     * 2.selectedRowKeys是table里面的一行行数据,被选中的话前面的小方块变为蓝色
     * 4.selectedRowKeysList用于存储各个表格中不同的selectedRowKeys
     * 3.prefabOut:储存表格的预制体
     */
    return {
      data,
      prefabOutput,
      selectedRowKeysList: [],
      selectedRowKeys: []
    };
  },
  computed: {
    /**
     * @description数据描述
     * 1.index:需要展示的table的索引值
     * 2.tableTitle:需要展示的table的标题
     * 3.tableColumns需要展示的table的列
     * 4.buttonList：需要展示的按钮的集合
     * 5.computedData:判断是否需要淘汰输出不同的Data
     */
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
    index() {
      return parseInt(this.$route.params.index);
    },
    tableTitle() {
      return this.prefabOutput[this.index].tableTitle;
    },
    tableColumns() {
      return this.prefabOutput[this.index].tableColumns;
    },
    buttonList() {
      return this.prefabOutput[this.index].buttonList;
    },
    computedData() {
      if (this.prefabOutput[this.index].filterCondition) {
        let cond = this.prefabOutput[this.index].filterCondition;
        let dataFiltered = data;
        for (let i = 0; i < cond.length; i++) {
          dataFiltered = this.filteCertainProperty(
            dataFiltered,
            cond[i].propertyName,
            cond[i].direction
          );
        }
        return dataFiltered;
      } else {
        return data;
      }
    },
    computedDataNameList() {
      let ret = [];
      for (let i = 0; i < this.computedData.length; i++) {
        ret.push(this.computedData[i].name);
      }
      return ret;
    }
  },
  watch: {
    $route: "changeSelectedKeys"
  },
  created: function() {
    for (let i = 0; i < this.prefabOutput.length; i++) {
      this.selectedRowKeysList.push([]);
    }
  },
  methods: {
    /**
     * @description在table中选中对应的小方块后统计当前已经选了多少小方块
     * @param {object} selectedRowkeys是一个对象
     * 控制台打印如下(选中两页table打印出来的)：selectedRowKeys changed:  (20) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
     */
    onSelectChange: Methods.onSelectChange,
    filteCertainProperty: Methods.filteCertainProperty,
    changeSelectedKeys: Methods.changeSelectedKeys,
    nameStyleController: Methods.nameStyleController,
    stateInfo: Methods.stateInfo,
    funcExportOffer: Methods.funcExportOffer,
    funcProduceTable: Methods.funcProduceTable,
    funcInterviewMessage: Methods.funcInterviewMessage,
    funcOffer: Methods.funcOffer,
    funcMoveStageSec: Methods.funcMoveStageSec,
    funcEliminate: Methods.funcEliminate,
    funcSelectedClear: Methods.funcSelectedClear
  }
};
</script>

<style>
.buttonstyle {
  bottom: 30px;
  left: 100px;
  margin: 0px 100px 0px 0px;
}
</style>
