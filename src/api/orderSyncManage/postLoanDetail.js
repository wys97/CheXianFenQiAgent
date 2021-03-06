import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

/** 
 * 贷后检查-详情-头部数据
 * @param id   
 * 
 * */

export function detailHead(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/top_detail',
		method: 'post',
		data
	})
}

/** 
 * 贷后检查-详情-基本信息-查询
 * @param id   
 * 
 * */

export function basicInfo(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/basic_info',
		method: 'post',
		data
	})
}

/** 
 * 贷后检查-详情-基本信息-保存
 * @param id   
 * 
 * */

export function saveBasicInfo({
	id,
	operatorId,
	inspectMode,
	cooperateDegree
}) {
	let data = {
		id,
		operatorId,
		inspectMode,
		cooperateDegree,
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/save_basic_info',
		method: 'post',
		data
	})
}

/** 
 * 检查前准备工作-基于近期检查-查询
 * @param id   
 * 
 * */

export function recebtRisk(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/recebt_risk',
		method: 'post',
		data
	})
}
/** 
 * 检查前准备工作-基于近期检查-保存
 * @param id   
 * 
 * */

export function saveRecebtRisk({
	id,
	recentRiskStr
}) {
	let data = {
		id,
		recentRiskStr,
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/save_recebt_risk',
		method: 'post',
		data
	})
}
/** 
 * 基于财务报表-报表内容多选框
 * @param id   
 * 
 * */

export function financialReportType() {
	return fetch({
		url: test + '/admin/trade_post_inspect/financial_report_type',
		method: 'post'
	})
}
/** 
 * 基于财务报表-查询
 * @param id   
 * 
 * */

export function financialReport(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/financial_report',
		method: 'post',
		data
	})
}
/** 
 * 基于财务报表 - 保存
 * @param id   
 * 
 * */

export function saveFinancialReport({
	id,
	financialReportType,
	stockBalance,
	stockBalanceLast,
	stockGrowGrately,
	receivableBalance,
	receivableBalanceLast,
	receivableGrowGrately,
	bankLoanBalance,
	bankLoanBalanceLast,
	bankLoanGrow,
	saleAmount,
	saleDownGrately,
	cashAmount,
	cashDownGrately,
	cashIncomeMatch,
	financialOther
}) {
	let data = {
		id,
		financialReportType,
		stockBalance,
		stockBalanceLast,
		stockGrowGrately,
		receivableBalance,
		receivableBalanceLast,
		receivableGrowGrately,
		bankLoanBalance,
		bankLoanBalanceLast,
		bankLoanGrow,
		saleAmount,
		saleDownGrately,
		cashAmount,
		cashDownGrately,
		cashIncomeMatch,
		financialOther,
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/save_financial_report',
		method: 'post',
		data
	})
}
/** 
 * 基于征信报告-查询
 * @param id   
 * 
 * */

export function creditInfo(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/credit_info',
		method: 'post',
		data
	})
}

/** 
 * 基于征信报告-保存
 * @param id   
 * 
 * */

export function saveCreditInfo({
	id,
	creditQueryDate,
	creditInfo,
	creditAbnormal,
	creditAbnormalInfo
}) {
	let data = {
		id,
		creditQueryDate,
		creditInfo,
		creditAbnormal,
		creditAbnormalInfo,
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/save_credit_info',
		method: 'post',
		data
	})
}
/** 
 * 基于网络查询-查询
 * @param id   
 * 
 * */

export function negativeInfo(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/negative_info',
		method: 'post',
		data
	})
}
/** 
 * 基于网络查询 - 保存
 * @param id   
 * 
 * */

export function saveNegativeInfo({
	id,
	negative,
	negativeInfo
}) {
	let data = {
		id,
		negative,
		negativeInfo,
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/save_negative_info',
		method: 'post',
		data
	})
}
/** 
 * 平台交易数据-查询
 * @param id   
 * 
 * */

export function platformTradeInfo(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/platform_trade_info',
		method: 'post',
		data
	})
}
/** 
 * 平台交易数据 - 保存
 * @param id   
 * 
 * */

export function savePlatformTradeInfo({
	id,
	platformTradeInfo
}) {
	let data = {
		id,
		platformTradeInfo,
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/save_platform_trade_info',
		method: 'post',
		data
	})
}
/** 
 * 检查要点-企业基本情况
 * @param id   
 * 
 * */

export function inspectEnterpriseInfo(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/inspect_enterprise_info',
		method: 'post',
		data
	})
}
/** 
 * 检查要点 - 企业基本信息保存
 * @param id   
 * 
 * */

export function saveInspectEnterpriseInfo({
	id,
	inspectInfo
}) {
	let data = {
		id,
		inspectInfo,
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/save_inspect_enterprise_info',
		method: 'post',
		data
	})
}
/** 
 * 检查要点-企业经营情况
 * @param id   
 * 
 * */

export function inspectEnterpriseBusiness(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/inspect_enterprise_business',
		method: 'post',
		data
	})
}
/** 
 * 检查要点 - 企业经营情况保存
 * @param id   
 * 
 * */

export function saveInspectEnterpriseBusiness({
	id,
	businessInfo
}) {
	let data = {
		id,
		businessInfo,
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/save_inspect_enterprise_business',
		method: 'post',
		data
	})
}
/** 
 * 检查结论
 * @param id   
 * 
 * */

export function conclusionRisk(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/conclusion_risk',
		method: 'post',
		data
	})
}
/** 
 * 检查结论 - 保存
 * @param id   
 * 
 * */

export function saveConclusionRisk({
	id,
	conclusionRisk,
	conclusionRiskInfo,
	conclusionSuggestion
}) {
	let data = {
		id,
		conclusionRisk,
		conclusionRiskInfo,
		conclusionSuggestion,
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/save_conclusion_risk',
		method: 'post',
		data
	})
}
/** 
 * 确认检查完成
 * @param id   
 * 
 * */

export function inspectFinish(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/inspect_finish',
		method: 'post',
		data
	})
}
/** 
 * 删除
 * @param id   
 * 
 * */

export function deleteInspect(id) {
	let data = {
		id
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/delete_inspect',
		method: 'post',
		data
	})
}
/** 
 * 融资信息-下拉列表
 * @param id   
 * 
 * */
export function financeDataPullDown() {
	return fetch({
		url: test + '/admin/trade_post_inspect/finance_data_pull_down',
		method: 'post',
	})
}
/** 
 * 检查人员-下拉列表
 * @param id   
 * 
 * */
export function inspectorList() {
	return fetch({
		url: test + '/admin/trade_post_inspect/inspector_list',
		method: 'post',
	})
}
/** 
 * 检查方式-下拉列表
 * @param id   
 * 
 * */
export function inspectMode() {
	return fetch({
		url: test + '/admin/trade_post_inspect/inspect_mode',
		method: 'post',
	})
}
/** 
 * 检查配合程度-下拉列表
 * @param id   
 * 
 * */
export function cooperateDegree() {
	return fetch({
		url: test + '/admin/trade_post_inspect/cooperate_degree',
		method: 'post',
	})
}
/** 
 * 贷后检查-新增
 * @param id   
 * 
 * */
export function tradePostInspectAdd({
	orderNo,
	operatorId,
	inspectMode,
	cooperateDegree
}) {
	let data = {
		orderNo,
		operatorId,
		inspectMode,
		cooperateDegree,
	}
	return fetch({
		url: test + '/admin/trade_post_inspect/add',
		method: 'post',
		data
	})
}

export default {
	detailHead,
	basicInfo,
	saveBasicInfo,
	recebtRisk,
	saveRecebtRisk,
	financialReportType,
	financialReport,
	saveFinancialReport,
	creditInfo,
	saveCreditInfo,
	negativeInfo,
	saveNegativeInfo,
	platformTradeInfo,
	savePlatformTradeInfo,
	inspectEnterpriseInfo,
	saveInspectEnterpriseInfo,
	inspectEnterpriseBusiness,
	saveInspectEnterpriseBusiness,
	conclusionRisk,
	saveConclusionRisk,
	inspectFinish,
	deleteInspect,
	financeDataPullDown,
	inspectorList,
	inspectMode,
	cooperateDegree,
	tradePostInspectAdd,
}