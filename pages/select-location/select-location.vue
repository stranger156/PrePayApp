<template>
  <view class="map-container">
    <map
      id="myMap"
      style="width: 100%; height: 80vh;"
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
      @tap="handleMapTap"
      show-location
    ></map>
    
    <view class="coordinate-info" v-if="clickPosition">
      经度: {{ clickPosition.longitude.toFixed(6) }}
      纬度: {{ clickPosition.latitude.toFixed(6) }}
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'

const latitude = ref(39.90923)
const longitude = ref(116.397428)
const markers = ref([])
const clickPosition = ref(null)
let mapContext = null

onReady(() => {
  mapContext = uni.createMapContext('myMap', this)
})

const handleMapTap = (e) => {
  // 获取点击位置的经纬度
  clickPosition.value = e.detail
  
  // 添加标记
  markers.value = [{
    id: Date.now(),
    latitude: e.detail.latitude,
    longitude: e.detail.longitude,
    iconPath: '../../static/maker.png',
    width: 100,
    height: 100
  }]
  
  // 调用逆地理编码（需要后端API支持）
  reverseGeocode(e.detail.longitude, e.detail.latitude)
}

const reverseGeocode = (lng, lat) => {
  uni.request({
    url: 'https://your-api-domain.com/reverse-geocode',
    data: { lng, lat },
    success: (res) => {
      console.log('逆地理编码结果:', res.data)
    }
  })
}
</script>