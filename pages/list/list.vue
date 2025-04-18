<template>
  <view class="container">
    <!-- 设备列表视图 -->
    <view class="device-list-layout">
      <!-- 搜索框 -->
      <view class="search-box">
        <input
          class="search-input"
          placeholder="搜索"
          v-model="searchText"
          confirm-type="search"
        />
        <image class="search-icon" src="/static/search.png"></image>
      </view>
      
      <!-- 列表内容 -->
      <view class="list-container">
        <scroll-view scroll-y class="device-list">
          <view class="device-item" v-for="(item, index) in filteredDeviceList" :key="index" @click="showDevicePopup(item)">
            <view class="device-content">
              <image class="device-icon" src="/static/station_icon.png"></image>
              <view class="device-info">
                <text class="device-name">{{ item.name }}</text>
                <text class="device-address">{{ item.address }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
        
        <!-- 侧边索引条 -->
        <view class="side-bar">
          <text 
            v-for="(letter, index) in indexList" 
            :key="index" 
            class="side-bar-item"
            @touchstart="onLetterTouch(letter)"
          >
            {{ letter }}
          </text>
        </view>
        
        <!-- 当前选中字母提示 -->
        <view class="letter-hint" v-if="showLetterHint">
          <text class="hint-text">{{ currentLetter }}</text>
        </view>
      </view>
    </view>
    
    <!-- 换热站详情弹窗 -->
    <view class="popup-mask" v-if="showPopup" @click="closePopup"></view>
    <view class="popup-content" v-if="showPopup">
      <view class="popup-header">
        <text class="popup-title">换热站详情</text>
        <text class="popup-close" @click="closePopup">×</text>
      </view>
      
      <view class="popup-body">
        <view class="popup-item">
          <text class="popup-label">名称:</text>
          <text class="popup-value">{{ currentDevice.name }}</text>
        </view>
        <view class="popup-item">
          <text class="popup-label">地址:</text>
          <text class="popup-value">{{ currentDevice.address }}</text>
        </view>
        <view class="popup-item">
          <text class="popup-label">状态:</text>
          <text class="popup-value">正常运行</text>
        </view>
        
        <view class="popup-buttons">
          <button class="popup-button" @click="viewDeviceDetail">查看详情</button>
          <button class="popup-button primary" @click="controlDevice">远程控制</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      deviceList: [
        { id: 1, name: "换热站1", address: "北京市海淀区学院路1号", letter: "H" },
        { id: 2, name: "换热站2", address: "北京市朝阳区朝阳门2号", letter: "H" },
        { id: 3, name: "阳光换热站", address: "北京市西城区西单3号", letter: "Y" }
      ],
      indexList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      showLetterHint: false,
      currentLetter: '',
      showPopup: false,
      currentDevice: {}
    };
  },
  computed: {
    filteredDeviceList() {
      return this.searchDevices();
    }
  },
  methods: {
    // 显示设备弹窗
    showDevicePopup(item) {
      this.currentDevice = item;
      this.showPopup = true;
    },
    
    // 关闭弹窗
    closePopup() {
      this.showPopup = false;
    },
    
    // 查看设备详情
    viewDeviceDetail() {
      uni.navigateTo({
        url: `/pages/device-detail/device-detail?id=${this.currentDevice.id}`
      });
      this.closePopup();
    },
    
    // 控制设备
    controlDevice() {
      uni.navigateTo({
        url: `/pages/device-control/device-control?id=${this.currentDevice.id}`
      });
      this.closePopup();
    },
    
    // 触摸字母索引
    onLetterTouch(letter) {
      this.currentLetter = letter;
      this.showLetterHint = true;
      
      // 查找该字母对应的第一个设备
      const target = this.deviceList.find(item => item.letter === letter);
      if (target) {
        // 滚动到对应位置的逻辑
        // 这里需要获取元素位置进行滚动，可以用uni.createSelectorQuery()实现
      }
      
      // 1秒后隐藏提示
      setTimeout(() => {
        this.showLetterHint = false;
      }, 1000);
    },
    
    // 搜索设备
    searchDevices() {
      if(!this.searchText) {
        return this.deviceList;
      }
      return this.deviceList.filter(item => 
        item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.address.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },
  onLoad() {
    // 这里可以添加从服务器获取设备列表的逻辑
  }
};
</script>

<style>
.container {
  flex: 1;
  flex-direction: column;
  background-color: #f5f5f5;
}

/* 设备列表视图 */
.device-list-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.search-box {
  height: 80rpx;
  background-color: #FFFFFF;
  position: relative;
  padding: 0 20rpx;
}

.search-input {
  height: 80rpx;
  padding-left: 70rpx;
  font-size: 30rpx;
}

.search-icon {
  position: absolute;
  left: 40rpx;
  top: 20rpx;
  width: 40rpx;
  height: 40rpx;
}

.list-container {
  flex: 1;
  position: relative;
}

.device-list {
  height: 100%;
}

.device-item {
  padding: 30rpx;
  background-color: #FFFFFF;
  border-bottom: 1rpx solid #EEEEEE;
}

.device-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.device-icon {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}

.device-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.device-name {
  font-size: 32rpx;
  color: #333333;
  margin-bottom: 10rpx;
}

.device-address {
  font-size: 26rpx;
  color: #999999;
}

.side-bar {
  position: absolute;
  right: 10rpx;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  z-index: 99;
  background-color: rgba(200, 200, 200, 0.4);
  border-radius: 20rpx;
  padding: 5rpx;
}

.side-bar-item {
  font-size: 24rpx;
  color: #666666;
  padding: 6rpx 10rpx;
  text-align: center;
}

.letter-hint {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 120rpx;
  height: 120rpx;
  background-color: rgba(0, 150, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60rpx;
}

.hint-text {
  color: #FFFFFF;
  font-size: 60rpx;
  font-weight: bold;
}

/* 弹窗样式 */
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.popup-content {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  background-color: #FFFFFF;
  border-radius: 12rpx;
  z-index: 1000;
  overflow: hidden;
}

.popup-header {
  position: relative;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1rpx solid #EEEEEE;
}

.popup-title {
  font-size: 36rpx;
  color: #333333;
  font-weight: bold;
}

.popup-close {
  position: absolute;
  right: 30rpx;
  top: 20rpx;
  font-size: 50rpx;
  color: #999999;
  line-height: 1;
}

.popup-body {
  padding: 30rpx;
}

.popup-item {
  display: flex;
  margin-bottom: 20rpx;
}

.popup-label {
  width: 120rpx;
  font-size: 30rpx;
  color: #666666;
}

.popup-value {
  flex: 1;
  font-size: 30rpx;
  color: #333333;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 40rpx;
}

.popup-button {
  width: 240rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 40rpx;
  font-size: 30rpx;
  background-color: #F5F5F5;
  color: #666666;
}

.popup-button.primary {
  background-color: #1E90FF;
  color: #FFFFFF;
}
</style>