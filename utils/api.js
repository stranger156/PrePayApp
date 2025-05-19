import {getTokenFromLocalStorage, getUser}from "../store/user.js"
import  request from "./request";

// 登录接口
export const login = (params) => {
    return request({
        url: "/web/user/login",
        method: 'POST',
		data:params
    });
};




// 获取公司列表接口
export const fetchCompanyList =async()=> {
	const token = await getTokenFromLocalStorage();
	return request({
		url: "/web/company/page",
		method: 'GET',
		headers: {
			'token': token
		},
		data: {
			page: 1,
			size: 10000
		}
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
export const fetchUserList=async()=> {
	const token = await getTokenFromLocalStorage();
	return request({
		url: "/web/user/page",
		method: 'GET',
		headers: {
			'token': token
		},
		data: {
			page: 1,
			size: 10000
		}
	});
};

// 获取登录信息接口
export const fetchLoginList=async()=> {
	const token = await getTokenFromLocalStorage();
	return request({
		url: "/web/login/errors",
		method: 'GET',
		headers: {
			'token': token
		}
	});
};

// 获取充值记录接口
export const fetchRechargeList=async()=> {
	const token = await getTokenFromLocalStorage();
	return request({
		url: "/web/recharge/page",
		method: 'GET',
		headers: {
			'token': token
		},
		data: {
			'page': 1,
			'size': 10000
		}
	});
};

// 修改密码接口
export const revisePwd=async(params)=> {
	const token = await getTokenFromLocalStorage();
	const user = await getUser();
	return request({
		url: "/web/user/changePassword",
		method: 'POST',
		headers: {
			'token': token
		},
		data: {
			'userName': user,
			'oldPassword': params.oldpassword,
			'newPassword': params.newpassword
		}
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
     
    return request({
        url: "/web/stations/page",
        method: 'GET', 
        headers: {
                "token": token
            },
        data:{
            page:1,
            size:10000}
    })
}

// // 获取站点设备列表
// export const getStationDevices = (stationName) => {
//   return request({
//     url: `/web/stations/${encodeURIComponent(stationName)}`,
//     method: 'GET'
//   });
// };
// // 在api.js中添加
export const getStationDevices = async (stationName) => {
  const token = await getTokenFromLocalStorage();
  return request({
    url: `/web/stations/${stationName}`,
    method: 'GET',
    headers: {
      "token": token
    }
  })
}

export const getDetailDevices = async (deviceNumber) => {
  const token = await getTokenFromLocalStorage();
  return request({
    url: `/web/device/${deviceNumber}`,
    method: 'GET',
    headers: {
      "token": token
    }
  })
}
