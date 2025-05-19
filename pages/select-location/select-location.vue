<template>
  <view>
    <map 
      id="myMap"
      style="width: 100%; height: 80vh;"
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
      @tap="handleMapTap"
    ></map>
	<br />
	    <view class="coordinate-info" v-if="selectedPoint">
	      经度: {{ selectedPoint.longitude.toFixed(6) }}
	      纬度: {{ selectedPoint.latitude.toFixed(6) }}
	    </view>
    <button @click="confirmLocation">确认选择</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const latitude = ref(39.909)
const longitude = ref(116.404)
const markers = ref([])
const selectedPoint = ref(null)

const handleMapTap = (e) => {
  selectedPoint.value = e.detail
  markers.value = [{
    id: 1,
    latitude: e.detail.latitude,
    longitude: e.detail.longitude,
	 iconPath: '../../static/maker.png',
    title: '选择的位置'
  }]
}

const confirmLocation = () => {
  if (selectedPoint.value) {
    // 获取事件通道
     const pages = getCurrentPages()
       // 获取当前页面实例
       const currentPage = pages[pages.length - 1]
       // 获取事件通道
       const eventChannel = currentPage.getOpenerEventChannel()
    // 触发事件并传递数据
    eventChannel.emit('acceptLocation', {
      latitude: selectedPoint.value.latitude,
      longitude: selectedPoint.value.longitude
    })
    uni.navigateBack()
  } else {
    uni.showToast({
      title: '请先点击地图选择位置',
      icon: 'none'
    })
  }
}
</script>