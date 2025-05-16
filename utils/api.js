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
// export const register = (params) => {
//     return request({
//         url: "/web/user/add",
//         method: 'POST',
// 		params
//     });
// };

export const getStationList=async()=>{
	  const token = await getTokenFromLocalStorage();  
	  console.log(111)
	  console.log(token)
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