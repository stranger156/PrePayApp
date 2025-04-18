<template>
  <view class="container">
    <!-- 顶部标题栏 -->
  
    <!-- 错误记录列表 -->
    <scroll-view scroll-y class="error-list">
      <view class="error-item" v-for="(item, index) in errorList" :key="index" @click="viewErrorDetail(item)">
        <image class="error-icon" src="/static/error_icon.png"></image>
        <view class="error-info">
          <view class="error-title">
            <text class="error-username">{{ item.username }}</text>
            <text class="error-count">登录错误次数: {{ item.count }}</text>
          </view>
          <text class="error-time">最后错误登录时间: {{ item.lastTime }}</text>
        </view>
      </view>
    </scroll-view>
    
    <!-- 浮动添加按钮 -->
    <view class="add-button">
      <text class="add-icon">+</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      errorList: [
        { id: 1, username: 'root', count: 11, lastTime: '2025-04-17 22:15:45' },
        { id: 2, username: 'userTest', count: 12, lastTime: '2025-04-16 18:52:51' },
        { id: 3, username: 'saleTest', count: 2, lastTime: '2025-04-15 18:42:48' },
        { id: 4, username: 'adminTest2', count: 1, lastTime: '2025-04-15 17:41:31' },
        { id: 5, username: 'adminTest', count: 1, lastTime: '2025-03-23 13:43:32' }
      ]
    };
  },
  methods: {
    viewErrorDetail(item) {
      uni.navigateTo({
        url: `/pages/error-detail/error-detail?id=${item.id}&username=${item.username}`
      });
    },
    
    // 获取错误日志列表
    getErrorList() {
      // 这里可以添加从服务器获取数据的代码
    }
  },
  onLoad() {
    this.getErrorList();
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

/* 顶部标题栏 */
.header {
  height: 90rpx;
  background-color: #4285f4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20rpx;
}

.header-title {
  color: #FFFFFF;
  font-size: 36rpx;
  font-weight: bold;
}

/* 错误记录列表 */
.error-list {
  flex: 1;
}

.error-item {
  padding: 20rpx 30rpx;
  background-color: #FFFFFF;
  border-bottom: 1rpx solid #EEEEEE;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.error-icon {
  width: 90rpx;
  height: 90rpx;
  margin-right: 30rpx;
}

.error-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.error-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8rpx;
}

.error-username {
  font-size: 34rpx;
  color: #666666;
  margin-right: 20rpx;
}

.error-count {
  font-size: 30rpx;
  color: #666666;
}

.error-time {
  font-size: 28rpx;
  color: #999999;
}

/* 浮动添加按钮 */
.add-button {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
}

.add-icon {
  font-size: 60rpx;
  color: #666666;
  line-height: 90rpx;
}
</style>