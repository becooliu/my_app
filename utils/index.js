import md5 from 'js-md5'
//md5 加密密码并翻转
function md5Pass(password) {
    return md5(password.toString()).split('').reverse().join('')
}

//判断是否登录，持久化
function isLogin() {
    return localStorage.getItem("userCookie") && getCookie('userCookie').length;
}

//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//如果session保存到vuex的话除外

//设置cookie
function setCookie(cookieName, cookieValue, expireDays) {
    expireDays = Number(expireDays) ? Number(expireDays) : 1
    let exdate = new Date()
    exdate.setDate(exdate.getDate() + expireDays)
    document.cookie = cookieName + "=" + escape(cookieValue) +
        ((expireDays == null) ? 1 : ";path=/; expires=" + exdate.toGMTString())
}

//获取cookie、
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    }
    return null;
}

//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString();
}

//设置登录成功后的一些常用操作
function setLoginStorage(key, value) {
    if (localStorage.getItem(key)) {
        localStorage.removeItem(key)
    }
    localStorage.setItem(key, value)
}

//设置注销帐号后的一些常用操作
function setLogoutStorage(key) {
    localStorage.removeItem(key)
}

//验证身份证号码
function isID(value) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(x|X|\d)$)/
    return reg.test(value)
}

//验证邮箱
function isEmail(value) {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    return reg.test(value)
}
//验证电话号码
function isPhone(value) {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    return reg.test(value)
}

export {
    md5Pass,
    setCookie,
    getCookie,
    delCookie,
    setLoginStorage,
    setLogoutStorage,
    isLogin,
    isID,
    isEmail,
    isPhone
}