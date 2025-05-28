<template>
  <view class="setting-page">
    <view
      v-for="item in menuList"
      :key="item.title"
      class="menu-item"
      @click="navigate(item.url)"
    >
      <image class="icon" :src="item.icon" mode="aspectFit" />
      <text class="title">{{ item.title }}</text>
      <image class="arrow" src="/static/enter_icon.png" mode="aspectFit" />
    </view>
	
	 <view class="logout-wrapper">
	   <button class="logout-button" @click="logout">退出登录</button>
	 </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuthority } from '../../store/user'
const authority=ref('')
const menuList = ref([
  {
    title: '企业管理',
    icon: '/static/user_icon.png',
    url: '/pages/user/user',
	
  },
  {
    title: '账号管理',
    icon: '/static/account_icon.png',
    url: '/pages/account/account'
  },
  {
    title: '异常信息',
    icon: '/static/alarm_icon.png',
    url: '/pages/error/error'
  },
  {
    title: '充值记录',
    icon: '/static/charge_icon.png',
    url: '/pages/recharge-record/recharge-record'
  },
  {
    title: '修改密码',
    icon: '/static/setting_icon.png',
    url: '/pages/change-password/change-password'
  },
])

function navigate(url) {
  uni.navigateTo({ url })
}
function logout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success(res) {
      if (res.confirm) {
        uni.redirectTo({
          url: '/pages/login/login' // 退出后跳转到登录页
        })
      }
    }
  })
}
onMounted(()=>{
	(async ()=>{
		authority.value=await getAuthority()
		if(authority.value === 'admin'){
			menuList.value = [
			  {
				title: '企业管理',
				icon: '/static/user_icon.png',
				url: '/pages/user/user',
				
			  },
			  {
				title: '账号管理',
				icon: '/static/account_icon.png',
				url: '/pages/account/account'
			  },
			  {
				title: '修改密码',
				icon: '/static/setting_icon.png',
				url: '/pages/change-password/change-password'
			  },
			]
		}else if(authority.value === 'sale' || authority.value === 'user'){
			menuList.value = [
			  {
				title: '修改密码',
				icon: '/static/setting_icon.png',
				url: '/pages/change-password/change-password'
			  },
			]
		}
	})()
})
</script>

<style>
.setting-page {
  background-color: #fff;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}
.icon {
  width: 24px;
  height: 24px;
}
.title {
  flex: 1;
  margin-left: 12px;
  font-size: 16px;
  color: #333;
}
.arrow {
  width: 18px;
  height: 18px;
}
.logout-wrapper {
  margin-top: 32px;
  padding: 0 16px;
}

.logout-button {
  background-color: #007aff;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  padding: 6px 0;
}
</style>
