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

// 注册接口
export const register = (params) => {
    return request({
        url: "/web/user/add",
        method: 'POST',
		params
    });
};

// 获取公司列表接口
export const fetchCompanyList = (params) => {
	return request({
		url: "web/company/page",
		method: 'GET',
		params
	});
};

// 获取换热站列表接口
export const fetchStationList = (params) => {
	return request({
		url: "/web/stations/list",
		method: 'GET',
		params
	});
};

// 添加设备接口
export const addDevice = (params) => {
	return request({
		url: "/web/device/add",
		method: 'POST',
		params
	});
};

// 修改换热站接口
export const adviseStation = (params) => {
	return request({
		url: "/web/stations/update",
		method: 'PUT',
		params
	});
};

// 删除换热站接口
export const deleteStation = (params) => {
	return request({
		url: `/web/stations/delete/${params}`,
		method: 'DELETE',
	});
};

// 获取用户列表接口
export const fetchUserList = (params) => {
	return request({
		url: "/web/user/page",
		method: 'GET',
		params
	});
};

// 修改公司接口
export const reviseCompany = (params) => {
	return request({
		url: "/web/company/update",
		method: 'PUT',
		params
	});
};

// 搜索管理员用户接口
export const searchAdminUsers = (params) => {
	return request({
		url: "/web/user/page",
		method: 'GET',
		params
	});
};

// 搜索普通用户接口
export const searchNormalUsers = (params) => {
	return request({
		url: "/web/user/page",
		method: 'GET',
		params
	});
};

// 搜索销售用户接口
export const searchSaleUsers = (params) => {
	return request({
		url: "/web/user/page",
		method: 'GET',
		params
	});
};

// 添加公司接口
export const addCompany = (params) => {
	return request({
		url: "/web/company/add",
		method: 'POST',
		params
	});
};

// 添加换热站接口
export const addStation = (params) => {
	return request({
		url: "/web/stations/add",
		method: 'POST',
		params
	});
};

export const getStationList=async()=>{
	  const token = await getTokenFromLocalStorage();  
	  console.log(111)
	  console.log(token)
	return request({
		url: "/web/stations/page",
		method: 'GET', 
		headers: {
			'token': token
		}
	})
}