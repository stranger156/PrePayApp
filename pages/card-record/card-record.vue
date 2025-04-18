<template>
  <view class="container">
    <!-- 记录列表 -->
    <scroll-view scroll-y class="charge-record-list">
      <view class="record-item" v-for="(item, index) in deviceList" :key="index" @click="viewDeviceDetail(item)">
        <image class="device-icon" src="/static/card.png"></image>
        <view class="device-info">
          <text class="device-id">{{ item.deviceId }}</text>
          <text class="device-days">充值天数: {{ item.days }}</text>
        </view>
      </view>
      
      <!-- 无数据提示 -->
      <view class="no-data" v-if="deviceList.length === 0">
        <text class="no-data-text">暂无设备记录</text>
      </view>
    </scroll-view>
    
    <!-- 底部添加按钮区域 -->
    <view class="add-charge-record" @click="addDevice">
      <view class="add-button-content">
        <image class="add-icon" src="/static/images/add_icon.png"></image>
        <text class="add-text">添加设备</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      deviceList: [
        { id: 1, deviceId: 'DEV2024001', days: 30 },
        { id: 2, deviceId: 'DEV2024002', days: 25 },
        { id: 3, deviceId: 'DEV2024003', days: 15 },
        { id: 4, deviceId: 'DEV2024004', days: 20 },
        { id: 5, deviceId: 'DEV2024005', days: 10 }
      ]
    };
  },
  methods: {
    // 查看设备详情
    viewDeviceDetail(item) {
      uni.navigateTo({
        url: `/pages/device-detail/device-detail?id=${item.id}`
      });
    },
    
    // 添加设备
    addDevice() {
      uni.navigateTo({
        url: '/pages/add-device/add-device'
      });
    },
    
    // 获取设备列表
    getDeviceList(callback) {
      // 模拟请求延迟
      setTimeout(() => {
        if (callback) callback();
      }, 500);
    }
  },
  onLoad() {
    // 页面加载时从服务器获取设备列表
    this.getDeviceList();
  },
  onPullDownRefresh() {
    // 下拉刷新
    this.getDeviceList(() => {
      uni.stopPullDownRefresh();
    });
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 记录列表 */
.charge-record-list {
  flex: 1;
}

.record-item {
  padding: 20rpx 30rpx;
  background-color: #FFFFFF;
  border-bottom: 1rpx solid #EEEEEE;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.device-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  margin-right: 30rpx;
}

.device-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.device-id {
  font-size: 34rpx;
  color: #666666;
  margin-bottom: 10rpx;
}

.device-days {
  font-size: 28rpx;
  color: #999999;
}

.no-data {
  padding: 100rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-data-text {
  color: #999999;
  font-size: 30rpx;
}

/* 底部添加按钮区域 */
.add-charge-record {
  height: 104rpx;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1rpx solid #EEEEEE;
}

.add-button-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.add-icon {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}

.add-text {
  font-size: 40rpx;
  color: #333333;
}
</style>