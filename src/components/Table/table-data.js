const columns = [
	{
		title: "学号",
		dataIndex: "stuId",
	},
	{
		title: "姓名",
		dataIndex: "name",
		slots: { title: "customTitle" },
		scopedSlots: { customRender: "name" },
	},
	{
		title: "性别",
		dataIndex: "sex",
	},
	{
		title: "电话",
		dataIndex: "telephone",
	},
	{
		title: "QQ",
		dataIndex: "qq",
	},
	{
		title: "专业",
		dataIndex: "spec",
	},
	{
		title: "我评",
		dataIndex: "mComment",
	},
	{
		title: "他评",
		dataIndex: "oComment",
	},
	{
		title: "另一志愿",
		dataIndex: "oIdeal",
	},
	{
		title: "关键字",
		dataIndex: "tags",
	},
	{
		title: "",
		dataIndex: "info",
	},
];
const data = [];
for (let i = 0; i < 46; i++) {
	data.push({
		key: i,
		stuId: i,
		name: `Edward King ${i}`,
		sex: "male",
		telephone: "123456788",
		qq: "987654321",
		spec: "计算机科学与技术",
		mComment: "A 28",
		oComment: " C 18",
		oIdeal: "网络技术工作室",
		tags: "有基础，有热情",
		info: "详情",
		eliminated: false,
		accepted: false,
		firstInterviewDone: i % 2 === 1?true:false ,
		secondInterview: false,
		secondInterviewDone: false,
	});
}
const prefabOutput = [
	{
		tableTitle: "部员名单",
		tableColumns: [
			columns[0],
			columns[1],
			columns[2],
			columns[3],
			columns[4],
			columns[5],
		],
		buttonList: [1, 2],
		filterCondition: [
			{
				propertyName: "accepted",
				direction: true,
			},
		],
		selectedRowKeys: [],
	},
	{
		tableTitle: "Ⅰ待面试名单",
		tableColumns: [
			columns[0],
			columns[1],
			columns[2],
			columns[3],
			columns[4],
			columns[5],
		],
		buttonList: [3],
		selectedRowKeys: [],
	},
	{
		tableTitle: "Ⅰ已面试名单",
		tableColumns: [
			columns[1],
			columns[2],
			columns[3],
			columns[4],
			columns[5],
			columns[9],
			columns[10],
		],
		buttonList: [4, 5, 7],
		selectedRowKeys: [],
		filterCondition: [
			{
				propertyName: "firstInterviewDone",
				direction: true,
			},
		],
	},
	{
		tableTitle: "Ⅱ待面试名单",
		tableColumns: [
			columns[0],
			columns[1],
			columns[2],
			columns[3],
			columns[4],
			columns[5],
			columns[9],
			columns[10],
		],
		buttonList: [3],
		selectedRowKeys: [],
		filterCondition: [
			{
				propertyName: "secondInterview",
				direction: true,
			},
		],
	},
	{
		tableTitle: "Ⅱ已面试名单",
		tableColumns: [
			columns[1],
			columns[2],
			columns[3],
			columns[4],
			columns[5],
			columns[9],
			columns[10],
		],
		buttonList: [4, 7],
		selectedRowKeys: [],
		filterCondition: [
			{
				propertyName: "secondInterview",
				direction: true,
			},
			{
				propertyName: "secondInterviewDone",
				direction: true,
			},
		],
	},
	{
		tableTitle: "已淘汰名单",
		tableColumns: [
			columns[1],
			columns[2],
			columns[3],
			columns[4],
			columns[5],
			columns[9],
			columns[10],
		],
		buttonList: [4, 6],
		selectedRowKeys: [],
		filterCondition: [
			{
				propertyName: "eliminated",
				direction: true,
			},
		],
	},
];

export { columns, data, prefabOutput };
