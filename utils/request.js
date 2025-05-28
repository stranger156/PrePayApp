const baseUrl = 'http://47.95.208.71:80';

const request = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + options.url,
            method: options.method || 'GET',
            data: options.data || {},  // 改为 data 而不是 params
            header: {
                'Content-Type': 'application/json',
                ...options.headers  // 合并自定义 headers
            },
            success: (res) => {
                if ([200, 201].includes(res.statusCode)) {
                    resolve(res.data);
                } else {
					console.log(res)
                    const errorMessage = res.data?.message || `请求失败,状态码: ${res.statusCode}`;
                    uni.showToast({
                        title: errorMessage,
                        icon: 'none'
                    });
                    reject(new Error(errorMessage));
                }
            },
            fail: (err) => {
				console.log(5555)
                uni.showToast({
                    title: '网络请求失败',
                    icon: 'none'
                });
                reject(err);
            }
        });
    });
};

export default request;