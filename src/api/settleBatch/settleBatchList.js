import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''



/**
 * 结算列表
 */
export function agentSettleList() {
    return fetch({
        url: test + '/agent-api/settle/list',
        method: 'post'
    })
}



/**
 * 推广配置
 */
export function agentRecommandSetting() {
    return fetch({
        url: test + '/agent-api/recommend/recommand_setting',
        method: 'post'
    })
}



/**
 * 推广二维码
 */
export function agentRecommandQrcode() {
    return fetch({
        url: test + '/agent-api/recommend/recommand_qrcode',
        method: 'post'
    })
}


export default {
    agentSettleList,
    agentRecommandSetting,
    agentRecommandQrcode
}