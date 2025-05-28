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




// 添加公司接口
export const addCompany =async(params)=> {
	const token = await getTokenFromLocalStorage();
	return request({
		url: "/web/company/add",
		method: 'POST',
		headers: {
			'token': token
		},
		data: {
			'companyName': params.name,
			'phone': params.phone,
			'userName': params.userName,
			'admin': params.admin,
			'user': params.user,
			'sale': params.sale
		}
	});
};

// 添加用户接口
export const addUser =async(params)=> {
	const token = await getTokenFromLocalStorage();
	return request({
		url: "/web/user/add",
		method: 'POST',
		headers: {
			'token': token
		},
		data: params
	});
};

// 删除用户接口
export const deleteUser =async(params)=> {
	const token = await getTokenFromLocalStorage();
	return request({
		url: `/web/user/${params}`,
		method: 'DELETE',
		headers: {
			'token': token
		},
	});
};

// 更新用户接口
export const updateUser =async(params)=> {
	const token = await getTokenFromLocalStorage();
	return request({
		url: '/web/user/update',
		method: 'PUT',
		headers: {
			'token': token
		},
		data: params
	});
};

// 获取换热站列表接口
export const fetchStationList = async(params) => {
	const token = await getTokenFromLocalStorage();
	return request({
		url: "/web/stations/list",
		method: 'GET',
		headers: {
			'token': token
		},
		data:{
			companyName:params
		}
	});
};


// 添加设备接口
export const addDevice = async(params) => {
	const token = await getTokenFromLocalStorage();
	return request({
		url: "/web/device/add",
		method: 'POST',
		headers: {
			'token': token
		},
		data: params
	});
};

// 修改换热站接口
export const updateStation = async(params) => {
	const token = await getTokenFromLocalStorage();
	return request({
		url: "/web/stations/update",
		method: 'PUT',
		headers: {
			'token': token
		},
		data: params
	});
};

// 删除公司接口
export const deleteCompany = async(params) => {
	const token = await getTokenFromLocalStorage();
	return request({
		url: `/web/company/${params}`,
		method: 'DELETE',
		headers: {
			'token': token
		},
	});
};

// 更新公司接口
export const updateCompany = async(params) => {
	const token = await getTokenFromLocalStorage();
	return request({
		url: '/web/company/update',
		method: 'PUT',
		headers: {
			'token': token
		},
		data: {
			'companyName': params.name,
			'phone': params.phone,
			'userName': params.userName,
			'admin': params.admin,
			'user': params.user,
			'sale': params.sale
		}
	});
};

// 删除换热站接口
export const deleteStation=async(params)=> {
	const token = await getTokenFromLocalStorage();
	return request({
		url: `/web/stations/${params}`,
		method: 'DELETE',
		headers: {
			'token': token
		}
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

// 添加换热站接口
export const addStation = async(params) => {
	const token = await getTokenFromLocalStorage();  
	return request({
		url: "/web/stations/add",
		method: 'POST',
		headers: {
		        "token": token
		    },
		data:params
	});
};




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

export const getDeviceInstallInfo = async (deviceNumber) => {
  const token = await getTokenFromLocalStorage();
  return request({
    url: `/web/device/install/${deviceNumber}`,
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
			size:10000
			}
	})
}
