import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param enterpriseName 企业名称
 * @param businessLicenseNo 信用代码
 * @param mobile 手机号码
 * @param beginCreateTime 最早得入驻时间
 * @param endCreateTime 最晚得入驻时间
 * @param status 阶段状态
 */
export function getListData ({limit, page,merchantCode,merchantName,orderDateFrom,orderDateTo,orderStatus,paymentStatus}) {
  const data = {
    limit,
    page,
    merchantCode,
    merchantName,
    orderDateFrom,
    orderDateTo,
    orderStatus,
    paymentStatus
  }
  return fetch({
    url: test + '/admin/loan_post_inspect/list',
    method: 'post',
    data
  })
}

/**
 * 商户列表查询-（入驻阶段接口）
 */
export function getRegisterStatusList () {
  return fetch({
    url: test + '/admin/combobox/register_status',
    method: 'post'
  })
}
/**
 * 下拉列表 - 订单状态
 */
export function orderStatusList () {
  return fetch({
    url: test + '/admin/loan_post_inspect/order_status_list',
    method: 'post'
  })
}
/**
 * 下拉列表 - 支付状态
 */
export function paymentStatusList () {
  return fetch({
    url: test + '/admin/loan_post_inspect/payment_status_list',
    method: 'post'
  })
}

/**
 * 查询统计信息
 * @param limit
 * @param page
 * @param merchantCode
 * @param merchantName
 * @param orderDateFrom
 * @param orderDateTo
 * @param orderStatus
 * @param paymentStatus
 */
export function queryTotalInfo ({limit, page,merchantCode,merchantName,orderDateFrom,orderDateTo,orderStatus,paymentStatus}) {
  const data = {
    limit,
    page,
    merchantCode,
    merchantName,
    orderDateFrom,
    orderDateTo,
    orderStatus,
    paymentStatus
  }
  return fetch({
    url: test + '/admin/loan_post_inspect/total',
    method: 'post',
    data
  })
}

export default {
  getListData,
  getRegisterStatusList,
  orderStatusList,
  paymentStatusList,
  queryTotalInfo
}
