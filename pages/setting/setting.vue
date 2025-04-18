<template>
  <view class="setting-page">
    <view class="setting-item" @click="goToChangePassword">
      <text>修改密码</text>
    </view>

    <view class="setting-item">
      <text>异常提醒</text>
      <switch :checked="isAlertOn" @change="toggleAlert" />
    </view>

    <view class="logout-wrapper">
      <button class="logout-button" @click="logout">退出登录</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const isAlertOn = ref(false)

function toggleAlert(e) {
  isAlertOn.value = e.detail.value
}

function goToChangePassword() {
  uni.navigateTo({
    url: '/pages/change-password/change-password'
  })
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
</script>

<style>
.setting-page {
  background-color: #fff;
  padding: 16px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  color: #333;
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
