const saveTokenToLocalStorage = (token) => {
    uni.setStorage({
        key: 'token',
        data: token,
        success: () => {
            console.log('Token 存储成功');
        },
        fail: (err) => {
            console.error('Token 存储失败:', err);
        }
    });
};

const getTokenFromLocalStorage = () => {
    return new Promise((resolve, reject) => {
        uni.getStorage({
            key: 'token',
            success: (res) => {
                resolve(res.data);
            },
            fail: (err) => {
                console.error('Token 获取失败:', err);
                reject(err);
            }
        });
    });
};

export{saveTokenToLocalStorage,getTokenFromLocalStorage}