<template>
  <view class="container">
    <!-- 标题和输入框区域 -->
 
    <view class="input-container">
      <view class="input-item">
       <img style="margin-right: 10px;" src="/static/username_icon.png"  />
        <input  v-model="account" placeholder="请输入用户名" />
      </view>
      <view class="input-item">
        <img style="margin-right: 10px;" src="/static/passwords_icon.png"  />
        <input  v-model="passwords" type="password" placeholder="请输入密码" />
      </view>
    </view>
    <!-- 记住密码和自动登录复选框 -->
 <!--   <view class="checkbox-container">
      <view class="checkbox-item">
        <checkbox v-model="rememberPasswords">记住密码</checkbox>
      </view>
      <view class="checkbox-item">
        <checkbox v-model="loginAuto">自动登录</checkbox>
      </view>
    </view> -->
    <!-- 登录按钮 -->
    <button  class="login-button" @click="login">登录</button>
   
    <!-- 详情按钮 -->
    <view class="detail-button" @click="goToDetail">了解波思环球</view>
  <!-- 联系电话 -->
  <view class="phone-call" @click="callPhone">24小时客户服务电话：400 858 1855</view>
  </view>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
// import { uniFetch } from '@/utils/uniFetch.js'; // 假设你已经封装了uni.request的网络请求工具函数
// import { useStorage } from '@/utils/storage.js'; // 假设你已经封装了存储工具函数

// // 定义页面数据
const account = ref('');
const passwords = ref('');
const rememberPasswords = ref(false);
const loginAuto = ref(false);
const { proxy } = getCurrentInstance();

// // 检查并请求权限（这里以示例权限为例，实际需根据需求调整）
// const checkAndRequestPermissions = async () => {
//   const permissionList = [];
//   const permissionChecks = [
//     { permission: 'android.permission.ACCESS_FINE_LOCATION', granted: false },
//     { permission: 'android.permission.WRITE_EXTERNAL_STORAGE', granted: false }
//   ];

//   for (const check of permissionChecks) {
//     const result = await uni.getSetting();
//     if (!result.authSetting[check.permission]) {
//       permissionList.push(check.permission);
//     }
//   }

//   if (permissionList.length > 0) {
//     const res = await uni.authorize({
//       scope: permissionList.join(',')
//     });
//     if (res.deny) {
//       uni.showToast({
//         title: '需授权才可使用本程序',
//         icon: 'none'
//       });
//       proxy.$router.push('/'); // 这里根据你的路由配置调整
//     }
//   }
// };

// // 页面挂载时检查权限
// onMounted(() => {
//   checkAndRequestPermissions();
//   const storedData = useStorage('data');
//   if (storedData.get('rememberPasswords')) {
//     account.value = storedData.get('account');
//     passwords.value = storedData.get('passwords');
//     rememberPasswords.value = true;
//   }
// });

// // 登录函数
// const login = async () => {
//   if (account.value === '' || passwords.value === '') {
//     uni.showToast({
//       title: '用户名和密码不能为空!',
//       icon: 'none'
//     });
//     return;
//   }

//   const random = getRandom(15);
//   const json = {
//     method: 'login',
//     username: account.value,
//     imme: random,
//     passwords: passwords.value
//   };

//   try {
//     const response = await uniFetch(json);
//     const loginInfo = response.data;
//     if (loginInfo.authority === 'nouser' || loginInfo.authority === 'passerror') {
//       uni.showToast({
//         title: '用户名或密码错误！',
//         icon: 'none'
//       });
//     } else if (loginInfo.authority === 'errorLogin') {
//       uni.showToast({
//         title: '密码输入错误超过三次，请联系超级管理员解除锁定',
//         icon: 'none'
//       });
//     } else if (
//       loginInfo.authority ==='superadmin' ||
//       loginInfo.authority === 'admin' ||
//       loginInfo.authority === 'accountant' ||
//       loginInfo.authority === 'user' ||
//       loginInfo.authority ==='sale'
//     ) {
//       const storedData = useStorage('data');
//       if (rememberPasswords.value) {
//         storedData.set('rememberPasswords', true);
//         storedData.set('account', account.value);
//         storedData.set('passwords', passwords.value);
//         storedData.set('authority', loginInfo.authority);
//         if (loginAuto.value) {
//           storedData.set('loginAuto', true);
//         } else {
//           storedData.set('loginAuto', false);
//         }
//       } else {
//         storedData.clear();
//       }

//       // 这里假设你有一个DeviceList页面，根据实际路由配置调整
//       proxy.$router.push({
//         name: 'DeviceList',
//         params: {
//           info: [loginInfo.authority, account.value]
//         }
//       });
//       uni.showToast({
//         title: '登录成功',
//         icon: 'none'
//       });
//     } else {
//       uni.showToast({
//         title: '未知登录错误',
//         icon: 'none'
//       });
//     }
//   } catch (error) {
//     uni.showToast({
//       title: '网络连接失败',
//       icon: 'none'
//     });
//   }
// };

// 生成随机数函数
// const getRandom = (n) => {
//   const radmon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//   let sb = '';
//   const rd = Math.random();
//   for (let i = 0; i < n; i++) {
//     const s = radmon[Math.floor(rd * 10)];
//     sb += s;
//   }
//   return sb;
// };

// 拨打电话函数
const callPhone = () => {
  uni.makePhoneCall({
    phoneNumber: '400 858 1855'
  });
};

// 跳转到详情页面函数
const goToDetail = () => {
	uni.navigateTo({
	    url: '/pages/more/more'
	  });
	
};
</script>

<style scoped>
.container {
	background-image: url(/static/background_main.jpg);
	background-size: cover;
 padding: 20px;
  background-color: #fff;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.input-container {
  margin-top: 30vh;
}

.input-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-items: center;
}

.input-item input {
  width: 60vw;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.checkbox-container {
  margin-bottom: 20px;
}

.checkbox-item {
  margin-bottom: 10px;
  float: left;
 margin-left: 10%;
}

.login-button {

  width: 100%;
  padding: 10px;
  background-color: #007AFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}

.phone-call {
  text-align: center;
  margin-top: 20px;
  color: #007AFF;
  cursor: pointer;
}

.detail-button {
  text-align: center;
  margin-top: 20px;
  color: #007AFF;
  cursor: pointer;
}
</style>