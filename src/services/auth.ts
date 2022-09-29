import {proxyAPI} from '@/services/proxyAPI';
import { request } from '@/utils/T';
const { get, post } = request;

/**
 * 权限管理
 */
class Permission {
    // constructor() {
    //     this.localPermissioKey = "sk_permission";
    // }

    localPermissioKey = "sk_permission";

    /**
     * 是否已经登录
     * @return {boolean}
     */
    isLogin = () => {
        return this.getLoginInfo();
    }
    /**
     * 获取locastorage里的标识
     * @return {boolean}
     */
    getLoginInfo = () => {
        return !!localStorage.getItem(this.localPermissioKey);
    }
    /**
     * 删除locastorage里的标识
     * @return {boolean}
     */
    delLoginInfo = () => {
        localStorage.removeItem(this.localPermissioKey);
    }
    /**
     * 设置locastorage里的标识
     * @return {boolean}
     */
    setLoginInfo = (loginInfo: string) => {
        localStorage.setItem(this.localPermissioKey, loginInfo);
    }
}

/**
 * 导出权限
 * @type {Permission}
 */
export const permission = new Permission();


/**
 * 登录
 * @return {Promise}
 */
export const login = (userName: string, password: string) => new Promise((resolve, reject) => {
    post(proxyAPI("/authc/dologin"), {userName, password}).then((resp) => {
        // 用于保存当前登录者的权限信息
        permission.setLoginInfo('login');

        resolve(resp)
    }, (resp) => reject(resp) );
});


/**
 * 退出登录
 * @return {Promise}
 */
export const logout = () => new Promise((resolve, reject) => {
    get(proxyAPI("/authc/loginout")).then(resp => {
        // 清空权限信息
        permission.delLoginInfo();
        resolve(resp);
    },(resp) => reject(resp))
});




