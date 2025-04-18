<template>
  <view class="container">
    <!-- 标题 -->
    <view class="header">
      <text class="title">用户列表</text>
    </view>

    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar 
        placeholder="请输入企业商标关键字" 
        radius="100"
        @confirm="handleSearch"
      ></uni-search-bar>
    </view>

    <!-- 用户列表 -->
    <view class="user-list" scroll-y>
      <view 
        v-for="(user, index) in filteredUsers" 
        :key="index" 
        class="user-item"
        @click="navigateToDetail(user)"
      >
        <view class="user-info">
          <text class="user-name">{{ user.name }}</text>
          <text class="device-count">设备数量：{{ user.deviceCount }}台</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import UniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue';
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';

// 用户数据
const users = ref([
  { id: '00001', name: '00001demo', deviceCount: 2 },
  { id: '00002', name: '00002demo', deviceCount: 0 },
  { id: '00003', name: '00003demo', deviceCount: 0 },
  { id: '00004', name: '00004demo', deviceCount: 0 },
  { id: '2020', name: '2020年滕州热力', deviceCount: 22 },
  { id: '213', name: '213工程 北京台基厂项目热力工程', deviceCount: 12 },
  { id: '丰台', name: '北京丰台北燃热力公司', deviceCount: 11 },
  { id: '华源', name: '北京华源泰盟寿光晨鸣热电三厂厂', deviceCount: 5 },
  { id: '延庆', name: '北京华源热力延庆分公司', deviceCount: 5 },
  { id: '天成', name: '北京华通天成供热有限公司', deviceCount: 3 },
  { id: '协和', name: '北京协和医院西院', deviceCount: 2 }
]);

// 搜索关键字
const searchKeyword = ref('');

// 过滤后的用户列表
const filteredUsers = computed(() => {
  if (!searchKeyword.value) return users.value;
  return users.value.filter(user => 
    user.name.includes(searchKeyword.value)
  );
});

// 搜索处理
const handleSearch = (e) => {
  searchKeyword.value = e.value;
};

// 跳转到详情页
const navigateToDetail = (user) => {
  uni.navigateTo({
    url: `/pages/userDetail/userDetail?id=${user.id}`
  });
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  height: 100vh;
  box-sizing: border-box;
}

.header {
  padding: 30rpx 0;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

.search-box {
  margin-bottom: 30rpx;
}

.user-list {
  height: calc(100vh - 200rpx);
  background-color: #fff;
  border-radius: 12rpx;
  
  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .user-info {
      flex: 1;
      
      .user-name {
        display: block;
        font-size: 32rpx;
        color: #333;
        margin-bottom: 10rpx;
      }
      
      .device-count {
        font-size: 26rpx;
        color: #999;
      }
    }
  }
}
</style>