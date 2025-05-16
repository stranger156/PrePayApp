<template>
  <view class="container">
    <!-- 顶部统计信息 -->
    <view class="header">
    <!--  <view class="stats">
        <text class="stats-title">我的换热站</text>
        <input class="stats-info" placeholder="Q 共计{{ totalStations }}个换热站，{{ totalDevices }}台设备..."></input>
      </view> -->
	  <view class="stats">
	    <text class="stats-title">我的换热站</text>
	    <view class="search-container">
	      <uni-icons 
	        type="search" 
	        size="18" 
	        color="#999" 
	        class="search-icon"
	      ></uni-icons>
	      <input 
	        class="stats-info" 
	        placeholder="Q 共计{{ totalStations }}个换热站，{{ totalDevices }}台设备..."
	      >
	    </view>
	  </view>
    </view>

    <!-- 地图容器 -->
    <view class="map-container">
      <map 
        id="stationMap"
        style="width: 100%; height: 100%;"
        :latitude="mapCenter.latitude"
        :longitude="mapCenter.longitude"
        :markers="markers"
        show-location
        @markertap="handleMarkerTap"
		@tap="handleMapTap"
      ></map>

      <!-- 信息弹窗 -->
      <view v-if="selectedStation" class="info-window">
        <view class="info-header">
          <text class="title">{{ selectedStation.chineseName }}</text>
          <uni-icons 
            type="close" 
            size="20" 
            color="#999" 
            @click="selectedStation = null"
          ></uni-icons>
        </view>
        <view class="info-content">
          <view class="info-item">
            <text class="label">英文名称：</text>
            <text class="value">{{ selectedStation.englishName }}</text>
          </view>
          <view class="info-item">
            <text class="label">设备状态：</text>
            <text class="value status-active">正常运行</text>
          </view>
          <view class="info-item">
            <text class="label">最后上报：</text>
            <text class="value">2023-08-20 14:30</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'

// 响应式数据
const selectedStation = ref(null);
const totalStations = ref(986);
const totalDevices = ref(1462);

const mapCenter = ref({
  latitude: 39.9042,
  longitude: 116.4074
});

const markers = ref([
  {
    id: 1,
    latitude: 39.9042,
    longitude: 116.4074,
    iconPath: '../../static/mapLogo.png',
    width: 30,
    height: 30
  },
 {
   id: 2,
   latitude: 50.9042,
   longitude: 116.4074,
   iconPath: '../../static/mapLogo.png',
   width: 30,
   height: 30
 },
]);

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

// 处理标记点击
const handleMarkerTap = (e) => {
  const markerId = e.detail.markerId;
  selectedStation.value = stations.value.find(item => item.id === markerId);
};

// 在script中添加
const handleMapTap = () => {
  selectedStation.value = null;
}

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 85vh;
}

.header {
  flex: 0 0 100rpx;
  padding: 10rpx 20rpx;
  
  .stats {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 10rpx;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
    
    &-title {
      display: block;
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }
    
	.search-container {
	  position: relative;
	  display: flex;
	  align-items: center;
	  
	  .search-icon {
	    position: absolute;
	    left: 15rpx;
	    z-index: 1;
	  }
	
	  .stats-info {
	    flex: 1;
	    padding-left: 70rpx;  // 给图标留出空间
	    height: 60rpx;
	    font-size: 28rpx;
	    color: #666;
	    background-color: #fff;
	    border-radius: 30rpx;
	    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
	    
	    // 调整placeholder颜色
	    &::placeholder {
	      color: #999;
	    }
	  }
	}
  }
}

.map-container {
  flex: 1;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  margin: 0 20rpx 20rpx;
  overflow: hidden;
  position: relative;
}

.info-window {
  position: absolute;
  bottom: 20rpx;
  left: 20rpx;
  right: 20rpx;
  background: white;
  border-radius: 12rpx;
  padding: 25rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  z-index: 999;

  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    
    .title {
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
    }
  }

  .info-content {
    .info-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15rpx;
      font-size: 28rpx;
      
      .label {
        color: #666;
      }

      .value {
        color: #333;
        font-weight: 500;
        
        &.status-active {
          color: #67C23A;
        }
      }
    }
  }
}
</style>
