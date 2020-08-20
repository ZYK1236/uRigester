const Methods = {
	funcExportOffer() {
		console.log("导出录取通知");
		this.funcSelectedClear();
	},
	funcProduceTable() {
		console.log("生成部员名单");
		this.funcSelectedClear();
	},
	funcInterviewMessage() {
		console.log("发布面试通知");
		this.funcSelectedClear();
	},
	funcOffer() {
		console.log("录取");
		for (let i in this.selectedRowKeys) {
			this.data[this.selectedRowKeys[i]].eliminated = false;
			this.data[this.selectedRowKeys[i]].accepted = true;
		}
		this.funcSelectedClear();
	},
	funcMoveStageSec() {
		console.log("晋升至二面");
		for (let i in this.selectedRowKeys) {
			this.data[this.selectedRowKeys[i]].eliminated = false;
			this.data[this.selectedRowKeys[i]].secondInterview = true;
		}
		this.funcSelectedClear();
	},
	funcEliminate() {
		console.log("淘汰了");
		for (let i in this.selectedRowKeys) {
			this.data[this.selectedRowKeys[i]].eliminated = true;
		}
		this.funcSelectedClear();
	},
	funcSelectedClear() {
		console.log("clear");
		this.selectedRowKeys = [];
		this.selectedRowKeysList[this.index] = [];
	},
	stateInfo(text) {
		let index = this.computedDataNameList.indexOf(text);
		let tablesWithNoStyle = [1, 3];
		if (tablesWithNoStyle.indexOf(this.index) < 0) {
			if (this.computedData[index].eliminated) {
				return "(已淘汰)";
			} else if (this.computedData[index].accepted) {
				return "(已录取)";
			} else if (
				!this.computedData[index].eliminated &&
				this.computedData[index].secondInterview
			) {
				return "(已晋升二面)";
			}
		}
	},
	nameStyleController(text) {
		let index = this.computedDataNameList.indexOf(text);
		let tablesWithNoStyle = [1, 3];
		if (tablesWithNoStyle.indexOf(this.index) < 0) {
			if (this.computedData[index].eliminated) {
				return "color:#909399;text-decoration:line-through;font-style:italic";
			} else if (this.computedData[index].accepted) {
				return "color:#67C23A";
			} else if (
				!this.computedData[index].eliminated &&
				this.computedData[index].secondInterview
			) {
				return "color:#409EFF";
			}
		}
	},
	changeSelectedKeys() {
		this.selectedRowKeys = this.selectedRowKeysList[this.index];
	},
	filteCertainProperty(arr, propertyName, direction) {
		let ret = [];
		for (let i = 0; i < arr.length; i++) {
			if (arr[i][propertyName] == (true && direction)) {
				ret.push(arr[i]);
			}
		}
		return ret;
	},
	onSelectChange(selectedRowKeys) {
		console.log("selectedRowKeys changed: ", selectedRowKeys);
		this.selectedRowKeys = selectedRowKeys;
		this.selectedRowKeysList[this.index] = selectedRowKeys; //时刻更新selectedRowKeysList中的数据
	},
};

export { Methods };
