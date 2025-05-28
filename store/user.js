
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

const saveUser= (user) => {
    uni.setStorage({
        key: 'user',
        data: user,
        success: () => {
            console.log('user存储成功');
			// eventBus.emit('user-changed', user) // 触发事件
        },
        fail: (err) => {
            console.error('user存储失败:', err);
        }
    });
};

const getUser = () => {
    return new Promise((resolve, reject) => {
        uni.getStorage({
            key: 'user',
            success: (res) => {
                resolve(res.data);
            },
            fail: (err) => {
                console.error('user获取失败:', err);
                reject(err);
            }
        });
    });
};
const saveDevice= (device) => {
    uni.setStorage({
        key: 'device',
        data: device,
        success: () => {
            console.log('device存储成功');
        },
        fail: (err) => {
            console.error('device存储失败:', err);
        }
    });
};

const getDevice = () => {
    return new Promise((resolve, reject) => {
        uni.getStorage({
            key: 'device',
            success: (res) => {
                resolve(res.data);
            },
            fail: (err) => {
                console.error('device获取失败:', err);
                reject(err);
            }
        });
    });
};

const saveAuthority= (authority) => {
    uni.setStorage({
        key: 'authority',
        data: authority,
        success: () => {
            console.log('authority存储成功');
        },
        fail: (err) => {
            console.error('authority存储失败:', err);
        }
    });
};

const getAuthority = () => {
    return new Promise((resolve, reject) => {
        uni.getStorage({
            key: 'authority',
            success: (res) => {
                resolve(res.data);
            },
            fail: (err) => {
                console.error('authority获取失败:', err);
                reject(err);
            }
        });
    });
};

const saveNumber= (number) => {
    uni.setStorage({
        key: 'number',
        data: number,
        success: () => {
            console.log('number存储成功');
        },
        fail: (err) => {
            console.error('number存储失败:', err);
        }
    });
};

const getNumber = () => {
    return new Promise((resolve, reject) => {
        uni.getStorage({
            key: 'number',
            success: (res) => {
                resolve(res.data);
            },
            fail: (err) => {
                console.error('number获取失败:', err);
                reject(err);
            }
        });
    });
};
export{saveTokenToLocalStorage,getTokenFromLocalStorage,saveUser,getUser,saveDevice,getDevice,getAuthority,saveAuthority,getNumber,saveNumber}