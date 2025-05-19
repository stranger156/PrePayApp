<template>
    <view >
		<view >
			<button class="add" @click="viewDeviceDetail">+添加换热站</button>
		</view>
		<scroll-view scroll-y class="device-list">
		  <view class="device-item"  v-for="(item, index) in list"  :key="index" @click="showDevicePopup(item)">
		    <view class="device-content">
		      <image class="device-icon" src="/static/station_icon.png"></image>
		      <view class="device-info">
		        <text class="device-name">{{ item.stationName }}</text>
		        <text class="device-address">{{ item.address }}</text>
		      </view>
		    </view>
		  </view>
		</scroll-view>
<view class="popup-mask" v-if="showPopup" @click="closePopup"></view>
    <view class="popup-content" v-if="showPopup">
      <view class="popup-header">
        <text class="popup-title">换热站详情</text>
        <text class="popup-close" @click="closePopup">×</text>
      </view>
      
      <view class="popup-body">
        <view class="popup-item">
          <text class="popup-label">名称:</text>
          <text class="popup-value">{{ currentDevice.stationName }}</text>
        </view>
        <view class="popup-item">
          <text class="popup-label">地址:</text>
          <text class="popup-value">{{ currentDevice.address }}</text>
        </view>
		<view class="popup-item">
		  <text class="popup-label">所属公司:</text>
		  <text class="popup-value">{{ currentDevice.company }}</text>
		</view>
		<view class="popup-item">
		  <text class="popup-label">负责人:</text>
		  <text class="popup-value">{{ currentDevice.userName }}</text>
		</view>
        <view class="popup-item">
          <text class="popup-label">联系方式:</text>
          <text class="popup-value">{{currentDevice.phone}}</text>
        </view>
        
        <view class="popup-buttons">
          <button class="popup-button" @click="viewDeviceDetail">导航到换热站</button>
          <button class="popup-button primary" @click="controlDevice">查看实时数据</button>
        </view>
      </view>
	   </view>
    </view>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive,ref } from 'vue'
import { fetchStationList } from '../../utils/api'
import { useRoute } from 'vue-router'
import { getDevice } from '../../store/user'
const list=reactive([])
const currentDevice=ref(null)
const showPopup=ref(false)
const showDevicePopup=(item)=>{
	currentDevice.value=item
	showPopup.value=true
	console.log(currentDevice)
}
const viewDeviceDetail=()=>{
	uni.navigateTo({
		url:"/pages/add-station/add-station"
	})
}
const closePopup=()=>{
	currentDevice.value=null;
	showPopup.value=false
}
	const query =ref(null) 
onMounted:{
	 getDevice().then(res=>{
		fetchStationList(res).then(res=>{
			list.push(...res.data)
			console.log(res.data)
		})
	 })
	        
}
</script>

<style scoped>
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
  width: 150rpx;
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
