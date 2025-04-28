
const baseUrl = 'http://106.55.177.226:5000'; // 替换为实际的 API 根路径

// 封装请求方法
const request = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            header: options.headers||
			{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.statusCode === 200||res.statusCode === 201) {
                    resolve(res.data);
                } else { 
					if (res.statusCode === 409) {
                        // 从响应数据中获取错误信息
                        const errorMessage = res.data.message;
                        uni.showToast({
                            title: errorMessage,
                            icon: 'none'
                        });
                    }
					if (res.statusCode === 400) {
					    // 从响应数据中获取错误信息
					    const errorMessage = res.data.message;
					    uni.showToast({
					        title: errorMessage,
					        icon: 'none'
					    });
					}
                    // reject(new Error(`请求失败,状态码: ${res.statusCode}`));
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

export default request