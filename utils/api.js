import {getTokenFromLocalStorage}from "../store/user.js"
import  request from "./request";
// 登录接口
export const login = (params) => {
    return request({
        url: "/web/user/login",
        method: 'POST',
		  data:params
    });
};
//注册接口
export const register = (params) => {
    return request({
        url: "/web/user/add",
        method: 'POST',
		  data:params
    });
};

