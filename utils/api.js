import {getTokenFromLocalStorage}from "../store/user.js"
import  request from "./request";


// 登录接口
export const login = (params) => {
    return request({
        url: "/login",
        method: 'POST',
		  data:params
    });
};
//注册接口
export const register = (params) => {
    return request({
        url: "/signUp",
        method: 'POST',
		  data:params
    });
};

// 获取学院列表
export const getFaculties = async () => {
    try {
        // 使用 await 等待 getTokenFromLocalStorage 获取 token
        const token = await getTokenFromLocalStorage();  

        if (!token) {
            uni.showToast({
                title: '请先登录',
                icon: 'none'
            });
            return Promise.reject(new Error('Token 不存在'));
        }

        // 使用获取的 token 发送请求
        return request({
            url: "/getFaculties",
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        console.error('获取 Token 失败:', err);
        uni.showToast({
            title: '获取 Token 失败',
            icon: 'none'
        });
        return Promise.reject(err);
    }
};

//获取学院班级信息
export const getClassesByFaculty = async (params) => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/getClassesByFaculty",
	        method: 'POST',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            },
	    	data:params
	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);
	}
};
//获取用户信息
export const getUserInfo = async () => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/getUserInfo",
	        method: 'GET',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            }
	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);
	}
};
//修改密码
export const revisePassword= async (params) => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/revisePassword",
	        method: 'POST',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            },
			data:params
	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);
	}
};

//获取学院教师列表
export const getTeachersByCollege = async () => {
    try {
        const token = await getTokenFromLocalStorage();  

        if (!token) {
            uni.showToast({
                title: '请先登录',
                icon: 'none'
            });
            return Promise.reject(new Error('Token 不存在'));
        }

        // 使用获取的 token 发送请求
        return request({
            url: "/getTeachersByCollege",
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        console.error('获取 Token 失败:', err);
        uni.showToast({
            title: '获取 Token 失败',
            icon: 'none'
        });
        return Promise.reject(err);
    }
};


//获取学院教室列表
export const getBuildingsAndClassrooms = async () => {
    try {
        const token = await getTokenFromLocalStorage();  

        if (!token) {
            uni.showToast({
                title: '请先登录',
                icon: 'none'
            });
            return Promise.reject(new Error('Token 不存在'));
        }

        // 使用获取的 token 发送请求
        return request({
            url: "/getBuildingsAndClassrooms",
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        console.error('获取 Token 失败:', err);
        uni.showToast({
            title: '获取 Token 失败',
            icon: 'none'
        });
        return Promise.reject(err);
    }
};

//获取院系班级
export const getDepartmentsAndClasses = async () => {
    try {
        const token = await getTokenFromLocalStorage();  

        if (!token) {
            uni.showToast({
                title: '请先登录',
                icon: 'none'
            });
            return Promise.reject(new Error('Token 不存在'));
        }

        // 使用获取的 token 发送请求
        return request({
            url: "/getDepartmentsAndClasses",
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        console.error('获取 Token 失败:', err);
        uni.showToast({
            title: '获取 Token 失败',
            icon: 'none'
        });
        return Promise.reject(err);
    }
};
//获取班级
export const getClassroom= async () => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/getClassroom",
	        method: 'GET',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            }
	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);
	}
};

export const getTeacher= async () => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/getTeacher",
	        method: 'GET',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            }
	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);
	}
};


export const getSchedule= async (params) => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/getSchedule",
	        method: 'POST',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            }, 
			data:params

	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);}}

export const scheduleClasses = async (params) => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/scheduleClasses",
	        method: 'POST',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            },
			data:params
	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);
	}
};

//保存排课任务
export const getCourseTask = async (params) => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/scheduleClasses",
	        method: 'POST',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            },
			data:params
	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);

	}
};