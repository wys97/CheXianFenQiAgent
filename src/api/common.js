import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 公共接口

/**
 * 银行列表
 */
export function comboboxBankList() {
    return fetch({
        url: test + '/agent-api/combobox/bank_list',
        method: 'post'
    })
}

/**
 * 核心企业
 */
export function comboboxCentreEnterprise() {
    return fetch({
        url: test + '/agent-api/combobox/centre_enterprise',
        method: 'post'
    })
}

/**
 * 商户信息-信息下拉
 */
export function queryEnterprise() {
    return fetch({
        url: test + '/agent-api/combobox/query_enterprise',
        method: 'post'
    })
}

/**
 * 资金方
 */
export function queryCapitalEnterprise() {
    return fetch({
        url: test + '/agent-api/combobox/query_capital_enterprise',
        method: 'post'
    })
}

/**
 * 商户进件对接资方-下拉
 */
export function queryCapitalEnterprise_abutment() {
    return fetch({
        url: test + '/agent-api/data_abutment/query_capital_enterprise',
        method: 'post'
    })
}
/**
 * 还款管理-是否逾期下拉
 */
export function overdueStatus() {
    return fetch({
        url: test + '/agent-api/combobox/overdue_status',
        method: 'post'
    })
}

/**
 * 申请登记-状态下拉
 */
export function registerStatus() {
    return fetch({
        url: test + '/agent-api/combobox/register_status',
        method: 'post'
    })
}

/**
 * 押品管理-押品类型下拉
 */
export function collateralType() {
    return fetch({
        url: test + '/agent-api/combobox/collateral_type',
        method: 'post'
    })
}

/**
 * 押品管理-押品来源下拉
 */
export function collateralSource() {
    return fetch({
        url: test + '/agent-api/combobox/collateral_source',
        method: 'post'
    })
}
/**
 * 押品管理-押品信息登记-状态下拉
 */
export function collateralRegisterStatus() {
    return fetch({
        url: test + '/agent-api/combobox/collateral_register_status',
        method: 'post'
    })
}
/**
 *押品管理 - 押品评估 - 下拉列表
 */
export function collateraAssessStatus() {
    return fetch({
        url: test + '/agent-api/combobox/collatera_assess_status',
        method: 'post'
    })
}
/**
 *学历-状态下拉
 */
export function educationBackground() {
    return fetch({
        url: test + '/agent-api/combobox/education_background',
        method: 'post'
    })
}
/**
 *婚姻状态-状态下拉
 */
export function maritalStatus() {
    return fetch({
        url: test + '/agent-api/combobox/marital_status',
        method: 'post'
    })
}

/**
 * 供应商评级-下拉列表
 */
export function supplierGrade() {
    return fetch({
        url: test + '/agent-api/combobox/supplier_grade',
        method: 'post'
    })
}

/**
 * 客户类型 (客户业务类型)-下拉
 */
export function customerType() {
    return fetch({
        url: test + '/agent-api/combobox/customer_type',
        method: 'post'
    })
}

/**
 * 业务类型 (融资服务类型)-下拉
 */
export function financeType() {
    return fetch({
        url: test + '/agent-api/combobox/finance_type',
        method: 'post'
    })
}

/**
 * 资料明细-借款产品类型
 */
export function loanProductType() {
    return fetch({
        url: test + '/agent-api/combobox/loan_product_type',
        method: 'post'
    })
}

/**
 * 还款方式
 */
export function repaymentMethod() {
    return fetch({
        url: test + '/agent-api/combobox/repayment_method',
        method: 'post'
    })
}
/**
 * 经营地情况
 */
export function officeStable() {
    return fetch({
        url: test + '/agent-api/combobox/office_Stable',
        method: 'post'
    })
}
/**
 * 审批管理-尽调资料-销售额稳定程度
 */
export function saleStable() {
    return fetch({
        url: test + '/agent-api/combobox/sale_stable',
        method: 'post'
    })
}
/**
 * 审批管理-尽调资料-历史征信资料
 */
export function creditScore() {
    return fetch({
        url: test + '/agent-api/combobox/credit_score',
        method: 'post'
    })
}
/**
 * 审批管理-尽调资料-征信查询记录
 */
export function creditQueryTimes() {
    return fetch({
        url: test + '/agent-api/combobox/credit_query_times',
        method: 'post'
    })
}
/**
 * 审批管理-尽调资料-互联网信息核查
 */
export function internetOpinion() {
    return fetch({
        url: test + '/agent-api/combobox/internet_opinion',
        method: 'post'
    })
}
/**
 * 审批管理-尽调资料-法律诉讼核查
 */
export function litigationSeverity() {
    return fetch({
        url: test + '/agent-api/combobox/litigation_severity',
        method: 'post'
    })
}
/**
 * 审批管理-尽调资料-担保价值认可度
 */
export function guaranteeValue() {
    return fetch({
        url: test + '/agent-api/combobox/guarantee_value',
        method: 'post'
    })
}
/**
 * 评分卡类型
 */
export function cardType() {
    return fetch({
        url: test + '/agent-api/combobox/card_type',
        method: 'post'
    })
}
/**
 * 启用禁用
 */
export function enabledDisabled() {
    return fetch({
        url: test + '/agent-api/combobox/enabled_disabled',
        method: 'post'
    })
}

/**
 * 评分卡应用场景
 */
export function cardSceneType() {
    return fetch({
        url: test + '/agent-api/combobox/card_scene_type',
        method: 'post'
    })
}

export default {
    comboboxBankList,
    comboboxCentreEnterprise,
    queryEnterprise,
    queryCapitalEnterprise,
    queryCapitalEnterprise_abutment,
    overdueStatus,
    registerStatus,
    collateralType,
    collateralSource,
    collateralRegisterStatus,
    collateraAssessStatus,
    educationBackground,
    maritalStatus,
    supplierGrade,
    customerType,
    financeType,
    loanProductType,
    repaymentMethod,
    officeStable,
    saleStable,
    creditScore,
    creditQueryTimes,
    internetOpinion,
    litigationSeverity,
    guaranteeValue,
    cardType,
    enabledDisabled,
    cardSceneType
}