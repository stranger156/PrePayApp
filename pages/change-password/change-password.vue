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
import { revisePwd } from '../../utils/api' // 假设API路径
 
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false) // 新增提交状态
 
 function submit() {
  // 基础校验
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
 
  if (newPassword.value !== confirmPassword.value) {
    uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
    return
  }
 
 
  try {
    isSubmitting.value = true // 启用提交状态
	
    revisePwd({
      oldpassword: oldPassword.value,
      newpassword: newPassword.value
    }).then(res=>{
		console.log(res)
		
		if (res.code === 200) {
		  uni.showToast({ title: '修改成功', icon: 'success' })
		  setTimeout(() => {
		    uni.navigateBack()
		  }, 1500)
		} else {
		  uni.showToast({ 
		    title: res.msg || '密码修改失败',
		    icon: 'none'
		
	})
   }
    })
  } catch (error) {
    console.error('修改密码失败:', error)
    uni.showToast({
      title: error?.message || '网络异常，请稍后重试',
      icon: 'none'
    })
  } finally {
    isSubmitting.value = false // 恢复提交状态
  }
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
