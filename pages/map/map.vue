<template>
  <view class="container">
    <!-- 顶部统计信息 -->
    <view class="header">
      <view class="stats">
        <text class="stats-title">我的换热站</text>
        <text class="stats-info">Q 共计{{ totalStations }}个换热站，{{ totalDevices }}台设备...</text>
      </view>
    </view>

    <!-- 地图容器 -->
    <view class="map-container">
      <map 
        id="stationMap"
        style="width: 100%; height: 300px;"
        :latitude="mapCenter.latitude"
        :longitude="mapCenter.longitude"
        :markers="markers"
        show-location
        @markertap="handleMarkerTap"
      ></map>
    </view>

    <!-- 换热站列表 -->
    <view class="station-list">
      <view 
        v-for="(station, index) in stations" 
        :key="index" 
        class="station-item"
        @click="navigateToDetail(station)"
      >
        <view class="station-name">
          <text class="chinese-name">{{ station.chineseName }}</text>
          <text class="english-name">{{ station.englishName }}</text>
        </view>
   <!--     <uni-icons type="arrowright" size="16" color="#999"></uni-icons> -->
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 统计数据
const totalStations = ref(986);
const totalDevices = ref(1462);

// 地图中心点和标记点 - 修改为北京坐标便于测试
const mapCenter = ref({
  latitude: 39.9042,  // 北京纬度
  longitude: 116.4074 // 北京经度
});

const markers = ref([
  {
    id: 1,
    latitude: 39.9042,
    longitude: 116.4074,
    title: '测试标记',
    iconPath: '../../static/marker.png', // 确保此路径有图片
    width: 30,
    height: 30
  }
]);

// 换热站列表数据
const stations = ref([
  { 
    chineseName: '海沃德', 
    englishName: 'Hayward',
    id: 1
  },
  { 
    chineseName: '雷德伍德城', 
    englishName: 'Redwood City',
    id: 2
  }
]);

// 点击地图标记
const handleMarkerTap = (e) => {
  const markerId = e.markerId;
  const station = stations.value.find(item => item.id === markerId);
  if (station) {
    navigateToDetail(station);
  }
};

// 跳转到详情页
const navigateToDetail = (station) => {
  uni.navigateTo({
    url: `/pages/stationDetail/stationDetail?name=${encodeURIComponent(station.chineseName)}`
  });
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  margin-bottom: 30rpx;
  
  .stats {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    
    &-title {
      display: block;
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 15rpx;
    }
    
    &-info {
      font-size: 28rpx;
      color: #666;
    }
  }
}

.map-container {
  margin-bottom: 30rpx;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  height: 300px; /* 确保高度 */
}

.station-list {
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  
  .station-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .station-name {
      .chinese-name {
        display: block;
        font-size: 32rpx;
        color: #333;
        margin-bottom: 8rpx;
      }
      
      .english-name {
        font-size: 26rpx;
        color: #999;
      }
    }
  }
}
</style>