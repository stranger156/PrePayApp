<template>
  <view class="container">
    <view class="form-container">
      <uni-forms ref="form" :model="formData" :rules="rules">
        <!-- 换热站名称 -->
        <uni-forms-item label="换热站名称" required name="stationName">
          <uni-easyinput 
            v-model="formData.stationName" 
            placeholder="请输入换热站名称"
          />
        </uni-forms-item>
        
        <!-- 所属公司 -->
        <uni-forms-item label="所属公司" required name="company">
          <uni-easyinput 
            v-model="formData.company"
            placeholder="请选择所属公司"
          />
        </uni-forms-item>
        
        <!-- 站内负责人 -->
        <uni-forms-item label="站内负责人" required name="manager">
          <uni-easyinput 
            v-model="formData.userName" 
            placeholder="请输入站内负责人"
          />
        </uni-forms-item>
        
        <!-- 联系方式 -->
        <uni-forms-item label="联系方式" required name="contact">
          <uni-easyinput 
            v-model="formData.phone" 
            placeholder="请输入联系方式"
            type="number"
          />
        </uni-forms-item>
        
        <!-- 经纬度信息 -->
        <uni-forms-item label="经纬度信息" required name="coordinates">
          <view class="coordinate-input">
            <uni-easyinput 
              v-model="formData.longitude" 
              placeholder="经度"
              class="coordinate-item"
			    type="number"
            />
            <uni-easyinput 
              v-model="formData.latitude" 
              placeholder="纬度"
              class="coordinate-item"
			    type="number"
            />
            <button class="location-btn" @click="getLocation">选择位置</button>
          </view>
        </uni-forms-item>
        
        <!-- 换热站地址 -->
        <uni-forms-item label="换热站地址" required name="address">
          <uni-easyinput 
            v-model="formData.address" 
            placeholder="请输入换热站地址"
          />
        </uni-forms-item>
        
        <!-- 换热站简介 -->
        <uni-forms-item label="换热站简介" required name="description">
          <uni-easyinput 
            v-model="formData.detail" 
            placeholder="请输入换热站简介"
            type="textarea"
          />
        </uni-forms-item>
      </uni-forms>
      
      <button class="submit-btn" @click="submitForm">提交换热站信息</button>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getDevice } from '../../store/user';

// 表单数据
const formData = ref({
  stationName: '',
  company: '',
  userName: '',
  phone: '',
  longitude: '',
  latitude: '',
  address: '',
  detail: ''
});

// 公司选项
const companies = ref([
  { value: '01company', text: '第一供热公司' },
  { value: '02test', text: '测试公司' },
  { value: '03demo', text: '演示公司' }
]);

// 表单验证规则
const rules = ref({
  stationName: {
    rules: [{ required: true, errorMessage: '请输入换热站名称' }]
  },
  company: {
    rules: [{ required: true, errorMessage: '请选择所属公司' }]
  },
  coordinates: {
    rules: [{ 
      validateFunction: (rule, value, data, callback) => {
        if (!data.longitude || !data.latitude) {
          callback('请输入经纬度信息');
        }
        return true;
      }
    }]
  }
});

// 获取当前位置
const getLocation = () => {
  uni.getLocation({
    type: 'wgs84',
    success: (res) => {
      formData.value.longitude = res.longitude.toFixed(6);
      formData.value.latitude = res.latitude.toFixed(6);
      uni.showToast({
        title: '获取位置成功',
        icon: 'success'
      });
    },
    fail: (err) => {
      uni.showToast({
        title: '获取位置失败',
        icon: 'none'
      });
      console.error('获取位置失败:', err);
    }
  });
};

// 提交表单
const submitForm = () => {
  const form = ref(null);
  form.value.validate().then(() => {
    uni.showLoading({
      title: '提交中...'
    });
    
    // 这里替换为实际的API调用
    console.log('提交数据:', formData.value);
    
    setTimeout(() => {
      uni.hideLoading();
      uni.showToast({
        title: '提交成功',
        icon: 'success'
      });
      uni.navigateBack();
    }, 1500);
  }).catch(err => {
    console.log('表单验证失败:', err);
  });
};
onMounted(()=>{
	getDevice().then(res=>{
		formData.value.company=res
	})
})
</script>

<style lang="scss">
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}
.header {
  padding: 30rpx 0;
  text-align: center;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

.form-container {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.coordinate-input {
  display: flex;
  align-items: center;
  
  .coordinate-item {
    flex: 1;
    margin-right: 10rpx;
  }
  
  .location-btn {
    width: 120rpx;
    font-size: 10rpx;
    padding: 0 5rpx;
    height: 70rpx;
    line-height: 70rpx;
  }
}

.submit-btn {
  margin-top: 50rpx;
  background-color: #007aff;
  color: #fff;
  border-radius: 10rpx;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 32rpx;
}
</style>