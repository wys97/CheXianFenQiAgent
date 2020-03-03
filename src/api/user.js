import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 用户操作相关页面




/**
 * 登录
 * @param loginName - 用户名
 * @param loginPassword - 密码
 * @param captcha - 验证码
 */
export function loginByUsername(loginName, loginPassword, captcha) {
    const data = {
        loginName,
        loginPassword,
        captcha
    }
    return fetch({
        url: test + '/agent-api/login',
        method: 'post',
        data
    })
}



/**
 * 取消修改密码
 */
export function UpdateLoginStatus() {
    return fetch({
        url: test + '/agent-api/update_login_status'
    })
}




/**
 * 退出
 */
export function logout() {
    return fetch({
        url: test + '/agent-api/logout'
    })
}




/**
 * 密码修改
 * @param newPassword - 用户名
 * @param oldPassword - 密码
 */
export function updatePassword(data) {

    return fetch({
        url: test + '/agent-api/update_login_password',
        method: 'post',
        data
    })
}

/**
 * 密码修改
 * @param newPassword - 用户名
 * @param oldPassword - 密码
 */
export function updatePasswordAgain(data) {

    return fetch({
        url: test + '/agent-api/update_password',
        method: 'post',
        data
    })
}



/**
 * 获取用户信息
 */
export function getUserInfo() {
    return fetch({
        url: test + '/agent-api/current_opeartor'
    })
}

export default {
    UpdateLoginStatus,
    getUserInfo,
    updatePassword
}