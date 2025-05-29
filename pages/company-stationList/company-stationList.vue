<template>
    <view >
		<view >
			<button class="add" @click="viewDeviceDetail">+添加换热站</button>
		</view>
		<scroll-view scroll-y class="device-list">
		  <view class="device-item"  v-for="(item, index) in list"  :key="index" @click="showDetailModal(item)">
		    <view class="device-content">
		      <image class="device-icon" src="/static/station_icon.png"></image>
		      <view class="device-info">
		        <text class="device-name">{{ item.stationName }}</text>
		        <text class="device-address">{{ item.address }}</text>
		      </view>
		    </view>
		  </view>
		</scroll-view>
    </view>
	<uni-popup ref="detailPopup" type="center">
	  <view class="modal-content">
	    <view class="modal-header">
	      <text class="modal-title">{{ currentDevice?.stationName }}</text>
	      <uni-icons 
	        type="closeempty" 
	        size="20" 
	        color="#666"
	        @click="closeDetailModal"
	      ></uni-icons>
	    </view>
	    
	    <view class="modal-body">
	      <view class="info-item">
	        <text class="label">地址：</text>
	        <text class="value">{{ currentDevice?.address || '暂无信息' }}</text>
	      </view>
	      
	      <view class="info-item">
	        <text class="label">所属公司：</text>
	        <text class="value">{{ currentDevice?.company || '暂无信息' }}</text>
	      </view>
	      
	      <view class="info-item">
	        <text class="label">负责人：</text>
	        <text class="value">{{ currentDevice?.userName || '暂无信息' }}</text>
	      </view>
	      
	      <view class="info-item">
	        <text class="label">联系方式：</text>
	        <text class="value">{{ currentDevice?.phone || '暂无信息' }}</text>
	      </view>
		  
		  <view class="info-item">
		    <text class="label">位置信息：</text>
		    <text class="value">{{ currentDevice?.location || '暂无信息' }}</text>
		  </view>
		  
		  <view class="info-item">
		    <text class="label">站点地址：</text>
		    <text class="value">{{ currentDevice?.address || '暂无信息' }}</text>
		  </view>
		  
		  <view class="info-item">
		    <text class="label">站点简介：</text>
		    <text class="value">{{ currentDevice?.detail || '暂无信息' }}</text>
		  </view>
		  
		   <view class="action-buttons">
		        <button class="btn heat-station" @click="showDeviceForm">添加设备</button>
		        <button class="btn edit" @click="updatestation">修改信息</button>
		        <button class="btn delete" @click="deletestation">删除换热站</button>
			</view>
	    </view>
	  </view>
	</uni-popup>
	  <!-- 添加设备弹窗 -->
	  <uni-popup ref="devicePopup" type="center">
	    <view class="device-form">
	      <view class="form-header">
	        <text class="title">添加设备</text>
	        <uni-icons type="closeempty" size="20" @click="closeDeviceForm"></uni-icons>
	      </view>
	      
	      <scroll-view scroll-y class="form-body">
	        <!-- 设备名称 -->
	        <view class="form-item">
	          <text class="label">* 设备名称</text>
	          <uni-easyinput v-model="deviceForm.deviceName" placeholder="请输入设备名称" />
	        </view>
	
	        <!-- 设备序列号 -->
	        <view class="form-item">
	          <text class="label">* 设备序列号</text>
	          <uni-easyinput v-model="deviceForm.deviceNumber" placeholder="请输入设备序列号" />
	        </view>
			
			<!-- 设备类型 -->
			<view class="form-item">
			  <text class="label">* 设备类型</text>
			  <uni-easyinput v-model="deviceForm.type"/>
			</view>
			
			<!-- 开启提醒 -->
			<view class="form-item">
			  <text class="label">开启提醒</text>
			  <view class='switch-wrapper'>
			  <switch :checked="deviceForm.alarm" @change="val => deviceForm.alarm = val.detail.value" />
			</view></view>
			
	        <!-- 安装日期 -->
	        <view class="form-item">
	          <text class="label">* 安装日期</text>
	          <uni-datetime-picker v-model="deviceForm.installDate" type='date' :show-time='false'/>
	        </view>
			
			<!-- 所属企业 -->
			<view class="form-item">
			  <text class="label">* 所属企业</text>
			  <uni-easyinput v-model="deviceForm.companyName" :disabled="true"/>
			</view>
			
	        <!-- 上传间隔 -->
	        <view class="form-item">
	          <text class="label">* 上传间隔（分钟）</text>
	          <uni-number-box v-model="deviceForm.uploadTime" :min="1" :max="60" />
	        </view>
	
	        <!-- 开关状态 -->
	        <view class="form-item">
	          <text class="label">开关状态</text>
			  <view class='switch-wrapper'>
	          <switch :checked="deviceForm.switchState" @change="val => deviceForm.switchState = val.detail.value" />
	          </view>
			</view>
			
			<!-- 联网状态 -->
			<view class="form-item">
			  <text class="label">联网状态</text>
			  <view class='switch-wrapper'>
			  <switch :checked="deviceForm.onlineState" @change="val => deviceForm.onlineState = val.detail.value" />
			</view></view>
			
			<!-- 所属换热站 -->
			<view class="form-item">
			  <text class="label">* 所属换热站</text>
			  <uni-easyinput v-model="deviceForm.deviceStation" :disabled="true" />
			</view>
			
	        <!-- 温度计信息 -->
	        <view class="form-item">
	          <text class="label">* 一网回水温度计</text>
	          <uni-easyinput v-model="deviceForm.temp1In" placeholder="请输入一网回水温度计序列号" />
	        </view>
	
	        <view class="form-item">
	          <text class="label">* 二网供水温度计</text>
	          <uni-easyinput v-model="deviceForm.temp2Out" placeholder="请输入一网回水温度计序列号" />
	        </view>
	
	        <!-- 操作按钮 -->
	        <view class="form-footer">
	          <button class="btn cancel" @click="closeDeviceForm">取消</button>
	          <button class="btn confirm" @click="submitDeviceForm">确定</button>
	        </view>
	      </scroll-view>
	    </view>
	  </uni-popup>
	  <!-- 新增修改信息弹窗 -->
	  <uni-popup ref="editPopup" type="center">
		  <view class="device-form">
			  <view class="form-header">
				  <text class="title">修改换热站信息</text>
				  <uni-icons 
					  type="closeempty" 
					  size="20" 
					  color="#666"
					  @click="closeEditModal"
				  ></uni-icons>
			  </view>
			  
			  <scroll-view scroll-y class="form-body">
				  <!-- 换热站名称 -->
				  <view class="form-item">
					  <text class="label">* 换热站名称</text>
					  <uni-easyinput v-model="editForm.stationName" :disabled="true"/>
				  </view>

				  <!-- 所属公司 -->
				  <view class="form-item">
					  <text class="label">* 所属公司</text>
					  <uni-easyinput v-model="editForm.company" :disabled="true"/>
				  </view>

				  <!-- 负责人 -->
				  <view class="form-item">
					  <text class="label">* 站内负责人</text>
					  <uni-easyinput v-model="editForm.userName" placeholder="请输入负责人"/>
				  </view>

				  <!-- 联系方式 -->
				  <view class="form-item">
					  <text class="label">* 联系方式</text>
					  <uni-easyinput v-model="editForm.phone" placeholder="请输入电话"/>
				  </view>

				  <!-- 经纬度 -->
				  <view class="form-item">
					  <text class="label">* 经纬度</text>
					  <view class="location-picker">
						  <text>经度：{{ editForm.longitude || '未选择' }}</text>
						  <text>纬度：{{ editForm.latitude || '未选择' }}</text>
						  <button class="mini-btn" @click="chooseLocation">选择位置</button>
					  </view>
				  </view>

				  <!-- 地址 -->
				  <view class="form-item">
					  <text class="label">* 换热站地址</text>
					  <uni-easyinput 
						  v-model="editForm.address" 
						  :disabled="true"
					  />
					  <text class="tip" v-if="editForm.longitude">地址已通过经纬度自动填充</text>
				  </view>

				  <!-- 简介 -->
				  <view class="form-item">
					  <text class="label">* 换热站简介</text>
					  <uni-easyinput 
						  type="textarea" 
						  v-model="editForm.detail" 
						  placeholder="请输入简介"
					  />
				  </view>

				  <!-- 操作按钮 -->
				  <view class="action-buttons">
					  <button class="btn cancel" @click="closeEditModal">取消</button>
					  <button class="btn confirm" @click="submitEdit">确定</button>
				  </view>
			  </scroll-view>
		  </view>
	  </uni-popup>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { fetchStationList, deleteStation, addDevice, updateStation } from '../../utils/api'
import { useRoute } from 'vue-router'
import { getDevice } from '../../store/user'
const list=ref([])
const currentDevice=ref(null)
const detailPopup=ref(null)
// 显示详情弹窗
const showDetailModal = (device) => {
  currentDevice.value = {
	  ...device,
	  location: `经度：${device.longitude}\n纬度：${device.latitude}`
  };
  detailPopup.value.open();
};
const viewDeviceDetail=()=>{
	uni.navigateTo({
		url:"/pages/add-station/add-station"
	})
}
// 关闭详情弹窗
const closeDetailModal = () => {
	detailPopup.value.close(() => {
	    // 在弹窗完全关闭后清空数据
	    currentDevice.value = null;
	  });
};
	const query =ref(null) 
onMounted:{
	 getDevice().then(res=>{
		fetchStationList(res).then(res=>{
			list.value.push(...res.data)
			console.log(res.data)
		})
	 })
	        
}
const deletestation = async () => { 
 
  // 显示确认对话框
  const modalResult = await uni.showModal({
      title: '确认删除',
      content: `确定要删除换热站【${currentDevice.value.stationName}】吗？`,
    }).catch(() => ({ confirm: false }))
   
    if (!modalResult.confirm) return
 
  try {
    // 调用删除接口
    const res = await deleteStation(currentDevice.value.stationName)
 
    if (res.code === 200) {
      uni.showToast({ title: '删除成功', icon: 'success' })
      
	  closeDetailModal();
	  getDevice().then(res=>{
	  		fetchStationList(res).then(res=>{
				list.value = []
	  			list.value.push(...res.data)
	  			console.log(res.data)
	  		})
	  })
    } else {
      uni.showToast({ title: res.message || '删除失败', icon: 'none' })
    }
  } catch (error) {
    console.error('删除失败:', error)
    uni.showToast({ title: '删除失败，请重试', icon: 'none' })
  }
}

// 设备表单数据
const deviceForm = ref({
  deviceName: '',
  deviceNumber: '',
  type: '预付费',
  uploadTime: 5,
  alarm: true,
  installDate: '',
  companyName: '',
  switchState: true,
  onlineState: true,
  deviceStation: '',
  temp1In: '',
  temp2Out: ''
})

// 显示/隐藏弹窗
const devicePopup = ref(null)
const showDeviceForm = () => {
	devicePopup.value.open();
	console.log(currentDevice);
	getDevice().then(res=>{
	  		deviceForm.value.companyName = res
	  })
	console.log(currentDevice.stationName)
	deviceForm.value.deviceStation = currentDevice.value.stationName;
}
const closeDeviceForm = () => {
	devicePopup.value.close(() => {
	    deviceForm.value = null;
	  });
}

const submitDeviceForm = async () => {
  // 必填项验证
  const requiredFields = [
    'deviceName', 'deviceNumber', 'temp1In', 'temp2Out'
  ]
  const missingFields = requiredFields.filter(field => !deviceForm.value[field])
  
  if (missingFields.length > 0) {
    uni.showToast({ 
      title: `请填写${missingFields.map(f => `【${f}】`).join('、')}`,
      icon: 'none' 
    })
    return
  }

  // 新增确认对话框
  const {confirm} = await uni.showModal({
    title: '确认添加设备',
    content: `确定要添加设备【${deviceForm.value.deviceName}】吗？`,
  }).catch(() => ({ confirm: false }))

  if (!confirm) return

  try {
    // 数据格式转换（保持原有逻辑）
    const params = {
      deviceName: deviceForm.value.deviceName,
      deviceNumber: deviceForm.value.deviceNumber,
      type: deviceForm.value.type,
      uploadTime: deviceForm.value.uploadTime,
      alarm: deviceForm.value.alarm ? "true" : "false",
      installDate: deviceForm.value.installDate,
      company: deviceForm.value.companyName,
      switchState: deviceForm.value.switchState ? "true" : "false",
      onlineState: deviceForm.value.onlineState ? "true" : "false",
      deviceStation: deviceForm.value.deviceStation,
      temp1In: deviceForm.value.temp1In,
      temp2Out: deviceForm.value.temp2Out
    }

    console.log('提交参数:', params)
    const res = await addDevice(params)
    
    if (res.code === 200) {
      uni.showToast({ title: '添加成功', icon: 'success' })
      closeDeviceForm()

    } else {
      uni.showToast({ 
        title: res.message || '添加失败', 
        icon: 'none',
        duration: 2000
      })
    }
  } catch (error) {
    console.error('添加设备失败:', error)
    uni.showToast({ 
      title: '请求失败，请检查网络',
      icon: 'none',
      duration: 2000
    })
  }
}
// 修改表单数据
const editForm = ref({
    stationName: '',
    company: '',
    userName: '',
    phone: '',
    longitude: '',
    latitude: '',
    address: '',
    detail: ''
})

const editPopup = ref(null)

// 打开修改弹窗
const updatestation = () => {
    editForm.value = {
        ...currentDevice.value
    }
    editPopup.value.open()
}
const closeEditModal = () => {
	editPopup.value.close(() => {
	    editForm.value = null;
	  });
}
// 地图选择
const selectedLocation=ref(null)
const chooseLocation = async () => {
	
     uni.navigateTo({
       url: '/pages/select-location/select-location',
       events: {
         // 接收从地图页面返回的数据
         acceptLocation: (data) => {
           selectedLocation.value = data
           editForm.value.longitude= selectedLocation.value.longitude
           editForm.value.latitude=selectedLocation.value.latitude
         }
       },
       success: (res) => {
         // 保存事件通道
         mapPageEventChannel = res.eventChannel
       }
     })
}

const submitEdit = async () => {
    // 必填项验证
    const requiredFields = [
        { field: 'userName', name: '负责人' },
        { field: 'phone', name: '联系方式' },
        { field: 'address', name: '地址' },
		{ field: 'detail', name: '换热站简介'}
    ]
    
    const missing = requiredFields.filter(f => !editForm.value[f.field])
    if (missing.length > 0) {
        uni.showToast({ 
            title: `请填写${missing.map(f => f.name).join('、')}`, 
            icon: 'none' 
        })
        return
    }

    // 新增确认弹窗
    const confirmRes = await uni.showModal({
        title: '确认修改',
        content: `确认要修改${editForm.value.stationName}换热站的信息吗`,
        confirmText: '确认',
        cancelText: '取消'
    })

    if (!confirmRes.confirm) {
        return // 用户取消操作
    }

    try {
        const params = { ...editForm.value }
        console.log(params)
        const res = await updateStation(params)
        if (res.code === 200) {
            uni.showToast({ title: '修改成功', icon: 'success' })
            closeEditModal()
			currentDevice.value = params
            // 刷新列表
            getDevice().then(res => {
                fetchStationList(res).then(res => {
                    list.value = []
                    list.value.push(...res.data)
                    console.log(res.data)
                })
            })
        }
    } catch (error) {
        uni.showToast({ 
            title: '修改失败，' + (error?.response?.data?.msg || '请检查网络'), 
            icon: 'none' 
        })
    }
}

// 逆地理编码示例
const getReverseGeocoding = async (lng, lat) => {
    try {
        const res = await uni.request({
            url: 'https://restapi.amap.com/v3/geocode/regeo',
            data: {
                key: 'YOUR_MAP_KEY',
                location: `${lng},${lat}`
            }
        })
        editForm.value.address = res.data.regeocode.formatted_address
    } catch (error) {
        console.error('逆地理编码失败:', error)
    }
}
</script>

<style scoped>
/* 新增样式 */
.location-picker {
    display: flex;
    flex-direction: column;
    gap: 10rpx;
    padding: 20rpx;
    background: #f5f5f5;
    border-radius: 8rpx;
}

.mini-btn {
    width: 200rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 24rpx;
    margin-top: 10rpx;
    background: #007AFF;
    color: white;
    border-radius: 8rpx;
}

.tip {
    color: #999;
    font-size: 24rpx;
    display: block;
    margin-top: 10rpx;
}

.switch-wrapper {
  /* 关键缩放代码 */
  transform: scale(0.75);
  transform-origin: left center;
  display: inline-block;
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
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
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

.action-buttons {
      margin-top: 40rpx;
      display: flex;
      gap: 10rpx;
      justify-content: space-between;
  
      .btn {
        flex: 1;
        padding: 10rpx;
        border-radius: 8rpx;
        font-size: 20rpx;
        
        &.heat-station {
          background: #4CAF50;
          color: white;
        }
        
        &.edit {
          background: #FF9800;
          color: white;
        }
        
        &.delete {
          background: #F44336;
          color: white;
        }
      }
    }
.device-form {
  width: 80vw;
  background: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.form-body {
  max-height: 70vh;
}

.form-item {
  margin-bottom: 20rpx;
}

.label {
  display: block;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.form-footer {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
}

.btn {
  flex: 1;
  border-radius: 8rpx;
  
  &.cancel {
    background: #f0f0f0;
    color: #666;
  }
  
  &.confirm {
    background: #007AFF;
    color: #fff;
  }
}

/* 弹窗样式 */
.modal-content {
  width: 600rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  
  .action-buttons {
      margin-top: 40rpx;
      display: flex;
      gap: 10rpx;
      justify-content: space-between;
  
      .btn {
        flex: 1;
        padding: 10rpx;
        border-radius: 8rpx;
        font-size: 20rpx;
        
        &.heat-station {
          background: #4CAF50;
          color: white;
        }
        
        &.edit {
          background: #FF9800;
          color: white;
        }
        
        &.delete {
          background: #F44336;
          color: white;
        }
      }
    }
	
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
    
    .modal-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
    }
  }
  
  .modal-body {
    .info-item {
      display: flex;
      margin-bottom: 24rpx;
      
      .label {
        width: 160rpx;
        font-size: 28rpx;
        color: #666;
      }
      
      .value {
        flex: 1;
        font-size: 28rpx;
        color: #333;
      }
    }
  }
}

</style>
