<template>
  <view class="container">
    <!-- 顶部统计信息 -->
    <view class="header">
	  <view class="stats">
	    <view class="search-container">
	      <uni-icons 
	        type="search" 
	        size="18" 
	        color="#999" 
	        class="search-icon"
	      ></uni-icons>
	      <input 
	        class="stats-info" 
			v-model=input
	        :placeholder="`共计${totalStations}个换热站`"
	      > <button 
      class="search-btn" 
     @click="handleEnter"
    >
      搜索
    </button>
	    </view>
	  </view>
    </view>

    <!-- 地图容器 -->
    <view class="map-container">
     <map 
       id="stationMap"
       style="width: 100%; height:60%;"
       :latitude="mapCenter.latitude"
       :longitude="mapCenter.longitude"
       :markers="markers"
       show-location
       @markertap="handleMarkerTap"
       @tap="handleMapTap"
     >
     </map>
   <view v-if="selectedStation" class="info-window">
   		 <view class="info-header">
   		    <text class="title">{{ selectedStation?.stationName || '加载中...' }}</text>
   		   <!-- <uni-icons 
   		       type="close" 
   		       size="20" 
   		       color="#999" 
   		       @click="selectedStation = null"
   		     ></uni-icons> -->
   		   </view>
   		   
   		   <view class="info-content">
   		     <view class="info-item">
   		       <text class="label">所属公司：</text>
   		       <text class="value">{{ selectedStation.company }}</text>
   		     </view>
   		 		  <view class="info-item">
   		 		    <text class="label">负责人：</text>
   		 		    <text class="value">{{ selectedStation.username }}</text>
   		 		  </view>
   		 		  <view class="info-item">
   		 		    <text class="label">联系电话：</text>
   		 		    <text class="value">{{ selectedStation.phone }}</text>
   		 		  </view>
   		 		  <view class="info-item">
   		 		    <text class="label">详细地址：</text>
   		 		    <text class="value">{{ selectedStation.address }}</text>
   		 		  </view>
   		 		  <view class="info-item">
   		 		    <text class="label">站点简介：</text>
   		 		    <text class="value">{{ selectedStation.detail }}</text>
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
import { onMounted, reactive, ref ,onUnmounted} from 'vue';
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import { getStationList } from '../../utils/api';

// 响应式数据
const selectedStation = ref(null);
const totalStations = ref(0);
const input=ref(null)

const mapCenter = ref({
  latitude: 39.9042,
  longitude: 116.4074
});

const markers = reactive([]);

const stations = reactive([]);

// 处理标记点击
const handleMarkerTap = (e) => {
  const markerId = e.detail.markerId;
 const station = stations.find(item => item.id === markerId);
   selectedStation.value=JSON.parse(JSON.stringify(station))
    setTimeout(() => {
      selectedStation.value = {...selectedStation.value};
    }, 50);
};

// 在script中添加
const handleMapTap = () => {
  selectedStation.value = null;
}

//处理输入框
const handleEnter=()=>{
	selectedStation.value = stations.find(item => item.address.includes(input.value.toLowerCase()))||null;
}


onMounted:{
getStationList().then(res=>{
	totalStations.value=res.data.records.length
	res.data.records.forEach((item,index)=>{
		markers.push({
			id: index+1,
			latitude: item.latitude,
			longitude: item.longitude,
			iconPath: '../../static/mapLogo.png',
			width: 10,
			height: 10,
			 anchor: { x: 0.5, y: 1 }
  })
  stations.push( { 
    phone:item.phone,
	company:item.company,
    id: index+1,
	address: item.address,
	detail: item.detail,
	stationName: item.stationName,
	userName: item.userName
  })
	})
})
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
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
	  padding: 12rpx;
	  
	  .search-icon {
	    position: absolute;
	    left: 15rpx;
	    z-index: 1;
	  }
	.search-btn {
	  /* 按钮样式自定义 */
	  min-width: 60rpx;
	  height: 60rpx;
	  line-height: 60rpx;
	  padding: 0 16rpx;
	  border-radius: 4rpx;
	  font-size: 28rpx;
	  border: none;
	  outline: none;
	   box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
	}
	  .stats-info {
	    flex: 1;
	    padding-left: 70rpx;  // 给图标留出空间
	    height: 60rpx;
	    font-size: 28rpx;
	    color: #666;
	    background-color: #fff;
	   
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
flex-grow: 1;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  margin: 0 20rpx 20rpx;
  overflow: hidden;
  position: relative;
  z-index: 1; /* 确保低于 info-window */
}

.info-window {
	 position: fixed; /* 固定定位，确保不受地图影响 */
	  bottom: 20rpx;
	  left: 20rpx;
	  right: 20rpx;
	  background: white;
	  border-radius: 12rpx;
	  padding: 25rpx;
	  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
	  z-index: 9999; /* 设置足够高的 z-index */
	  transform: translateZ(100px); /* 触发 GPU 加速 */
	  animation: fadeIn 0.3s ease;

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
