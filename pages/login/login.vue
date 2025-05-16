<template>
  <view class="container">
    <!-- 标题和输入框区域 -->
    <view class="input-container">
      <view class="input-item">
       <img style="margin-left: 20rpx;height: 5vh;" src="/static/username_icon.png"  />
        <input  v-model="user.username" placeholder="请输入用户名" />
      </view>
      <view class="input-item">
        <img style="margin-left:20rpx;height: 5vh;" src="/static/passwords_icon.png"  />
        <input  v-model="user.password" type="password" placeholder="请输入密码" />
      </view>
    </view>
    <!-- 记住密码和自动登录复选框 -->
<!--  <view class="checkbox-container">
      <view class="checkbox-item">
        <checkbox v-model="rememberPasswords">记住密码</checkbox>
      </view>
      <view class="checkbox-item">
        <checkbox v-model="loginAuto">自动登录</checkbox>
      </view>
    </view> -->
    <!-- 登录按钮 -->
    <button  class="login-button" @click="loginButton">登录</button>
   
    <!-- 详情按钮 -->
    <view class="detail-button" @click="goToDetail">了解波思环球</view>
  <!-- 联系电话 -->
  <view class="phone-call" @click="callPhone">24小时客户服务电话：400 858 1855</view>
  </view>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from 'vue';
import { login } from '../../utils/api';
// import { useStorage } from '@/utils/storage.js'; // 假设你已经封装了存储工具函数

// // 定义页面数据
const user=reactive({
	username:'',
	password:''
})
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

// 登录函数

const loginButton=()=>{
  if (user.username === '' || user.password === '') {
    uni.showToast({
      title: '用户名和密码不能为空!',
      icon: 'none'
    })
  }
  console.log(1111)
  console.log(user)
  login(user).then((res)=>{
	  console.log(res)
	  if(res.code===200){
		saveTokenToLocalStorage(res.data.token)
		  console.log(res.data.token)
		  uni.switchTab({
		      url: '/pages/map/map' // 假设这是一个 tabBar 页面
		  })
	  }
  })
}
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
  width: 65vw;
  padding: 5px;
  margin-left: 2vw;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.checkbox-container {
  margin-top: 50rpx;
}

.checkbox-item {
  margin-bottom: 10px;
  float: left;
 margin-left: 100rpx;
}

.login-button {
  width: 80vw;
  background-color: #007AFF;
  color: #fff;
  border: none;
  border-radius: 100rpx;
  font-size: 16px;
}

.phone-call {
  text-align: center;
  margin-top: 20px;
  color: #007AFF;
  cursor: pointer;
   font-size: 20rpx;
}

.detail-button {
  text-align: center;
  margin-top: 20px;
  color: #007AFF;
  cursor: pointer;
   font-size: 20rpx;
}
</style>