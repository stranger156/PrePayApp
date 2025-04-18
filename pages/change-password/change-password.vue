<template>
  <view class="change-password-page">
    <view class="input-group">
      <text>旧密码</text>
      <input v-model="oldPassword" type="password" placeholder="请输入旧密码" />
    </view>

    <view class="input-group">
      <text>新密码</text>
      <input v-model="newPassword" type="password" placeholder="请输入新密码" />
    </view>

    <view class="input-group">
      <text>确认密码</text>
      <input v-model="confirmPassword" type="password" placeholder="请再次输入新密码" />
    </view>

    <view class="submit-wrapper">
      <button class="submit-button" @click="submit">提交密码修改</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

function submit() {
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    uni.showToast({
      title: '两次输入的密码不一致，请重新确认密码',
      icon: 'none',
    })
    return
  }

  // 模拟后端处理
  uni.showToast({
    title: '修改成功',
    icon: 'success'
  })

  setTimeout(() => {
    uni.navigateBack()
  }, 1000)
}
</script>

<style>
.change-password-page {
  background-color: #fff;
  padding: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.input-group text {
  margin-bottom: 6px;
  font-size: 16px;
  color: #333;
}

.input-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.submit-wrapper {
  margin-top: 24px;
}

.submit-button {
  background-color: #007aff;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  padding: 6px 0;
}
</style>
