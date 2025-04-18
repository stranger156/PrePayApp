<template>
  <view class="container">
    <form @submit="handleSubmit">
      <!-- 设备编号选择 -->
      <view class="form-item" @click="showDeviceIdPicker = true">
        <text class="label">设备编号</text>
        <view class="value">
          {{ formData.deviceId || '选择设备编号' }}
        </view>
      </view>

      <!-- 设备名称选择 -->
      <view class="form-item" @click="showDeviceNamePicker = true">
        <text class="label">设备名称</text>
        <view class="value">
          {{ formData.deviceName || '选择设备名称' }}
        </view>
      </view>

      <!-- 充值信息 -->
      <view class="form-item">
        <text class="label">充值金额</text>
        <input
          class="input"
          type="number"
          v-model="formData.amount"
          placeholder="请输入充值金额"
        />
      </view>

      <!-- 系统信息 -->
      <view class="form-item readonly">
        <text class="label">操作人员</text>
        <text class="value">{{ formData.operator }}</text>
      </view>

      <view class="form-item readonly">
        <text class="label">当前余额</text>
        <text class="value">{{ formData.balance }}</text>
      </view>

      <view class="form-item readonly">
        <text class="label">创建时间</text>
        <text class="value">{{ formData.createTime }}</text>
      </view>

      <!-- 设备编号选择弹窗 -->
      <view v-if="showDeviceIdPicker" class="picker-modal">
        <view class="picker-mask" @click="showDeviceIdPicker = false"></view>
        <view class="picker-content">
          <view class="search-box">
            <input
              v-model="deviceIdKeyword"
              placeholder="请输入搜索内容"
              class="search-input"
            />
          </view>
          <scroll-view scroll-y class="list-container">
            <view
              v-for="(item, index) in filteredDeviceIds"
              :key="index"
              class="list-item"
              @click="selectDeviceId(item)"
            >
              {{ item }}
            </view>
          </scroll-view>
        </view>
      </view>

      <!-- 设备名称选择弹窗 -->
      <view v-if="showDeviceNamePicker" class="picker-modal">
        <view class="picker-mask" @click="showDeviceNamePicker = false"></view>
        <view class="picker-content">
          <view class="search-box">
            <input
              v-model="deviceNameKeyword"
              placeholder="请输入搜索内容"
              class="search-input"
            />
          </view>
          <scroll-view scroll-y class="list-container">
            <view
              v-for="(item, index) in filteredDeviceNames"
              :key="index"
              class="list-item"
              @click="selectDeviceName(item)"
            >
              {{ item }}
            </view>
          </scroll-view>
        </view>
      </view>

      <!-- 提交按钮 -->
      <button 
        class="submit-btn" 
        form-type="submit"
        :disabled="!formValid"
      >
        提交充值信息
      </button>
    </form>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 表单数据
const formData = ref({
  deviceId: '',
  deviceName: '',
  amount: '',
  operator: 'root',
  balance: '0.00',
  createTime: new Date().toLocaleString()
})

// 设备编号相关
const showDeviceIdPicker = ref(false)
const deviceIdKeyword = ref('')
const deviceIds = ref([
  '11111', '111112', '12000443', '12000456',
  '12000458', '12000463', '12000474', '12000475',
  '12000479', '12000481', '12000489', '12000491'
])

// 设备名称相关
const showDeviceNamePicker = ref(false)
const deviceNameKeyword = ref('')
const deviceNames = ref([
  '二次回水', '二次回水', '二次回水', '二次回水',
  '高区二次回', '二次回水', '二次回水', 
  '高区二次回', '二次回水', '低区二次回水'
])

// 过滤后的列表
const filteredDeviceIds = computed(() => {
  return deviceIds.value.filter(item => 
    item.includes(deviceIdKeyword.value))
})

const filteredDeviceNames = computed(() => {
  return deviceNames.value.filter(item =>
    item.includes(deviceNameKeyword.value))
})

// 选择处理
const selectDeviceId = (id) => {
  formData.value.deviceId = id
  showDeviceIdPicker.value = false
  deviceIdKeyword.value = ''
}

const selectDeviceName = (name) => {
  formData.value.deviceName = name
  showDeviceNamePicker.value = false
  deviceNameKeyword.value = ''
}

// 表单验证
const formValid = computed(() => {
  return formData.value.deviceId && 
         formData.value.deviceName && 
         Number(formData.value.amount) > 0
})

// 提交处理
const handleSubmit = () => {
  uni.showLoading({ title: '提交中...' })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '充值成功',
      icon: 'success'
    })
  }, 1500)
}
</script>

<style>
.container {
  padding: 24rpx;
  background-color: #f8f8f8;
}

.form-item {
  background-color: #fff;
  padding: 24rpx;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  font-size: 28rpx;
  color: #666;
  width: 200rpx;
}

.input {
  flex: 1;
  font-size: 28rpx;
  padding: 12rpx;
  border-bottom: 1rpx solid #eee;
}

.readonly .value {
  flex: 1;
  font-size: 28rpx;
  color: #333;
  padding: 12rpx 0;
}

.submit-btn {
  margin-top: 40rpx;
  background-color: #007aff;
  color: white;
  border-radius: 50rpx;
  font-size: 32rpx;
}

.submit-btn[disabled] {
  background-color: #cccccc;
  opacity: 0.6;
}

/* 新增弹窗样式 */
.picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

.picker-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}

.picker-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 30rpx;
  max-height: 70vh;
}

.search-box {
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.search-input {
  background: #fff;
  padding: 20rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.list-container {
  max-height: 50vh;
}

.list-item {
  padding: 28rpx 20rpx;
  border-bottom: 1rpx solid #eee;
  font-size: 28rpx;
}

.list-item:active {
  background-color: #f8f8f8;
}
</style>