<template>
  <view class="container">
    <!-- 标题 -->
    <view class="header">
      <text class="title">企业管理</text>
    </view>

    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar 
        placeholder="请输入企业名称关键字" 
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
        @click="showDetailModal(user)"
      >
        <view class="user-info">
          <text class="user-name">{{ user.name }}</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
      </view>
    </view>

    <!-- 详情弹窗 -->
    <uni-popup ref="detailPopup" type="center">
      <view class="modal-content">
        <view class="modal-header">
          <text class="modal-title">{{ currentUser?.name }}</text>
          <uni-icons 
            type="closeempty" 
            size="20" 
            color="#666"
            @click="closeDetailModal"
          ></uni-icons>
        </view>
        
        <view class="modal-body">
          <view class="info-item">
            <text class="label">联系电话：</text>
            <text class="value">{{ currentUser?.phone || '暂无信息' }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">负责人：</text>
            <text class="value">{{ currentUser?.userName || '暂无信息' }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">管理员：</text>
            <text class="value">{{ currentUser?.admin || '暂无信息' }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">销售代表：</text>
            <text class="value">{{ currentUser?.sale || '暂无信息' }}</text>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import UniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue';
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import UniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';
import { fetchCompanyList } from '../../utils/api';

// 用户数据
const users = ref([]);
const currentUser = ref(null);
const searchKeyword = ref('');
const detailPopup = ref(null);

// 页面加载时获取数据
onMounted(async () => {
  try {
    const res = await fetchCompanyList();
    users.value = res.data?.records?.map((item, index) => ({
      id: String(index),
      name: item.companyName || '未知企业',
      phone: item.phone,
	  userName: item.userName,
      admin: item.admin,
      user: item.user,
      sale: item.sale
    })) || [];
  } catch (error) {
    console.error('获取企业列表失败:', error);
    uni.showToast({
      title: '数据加载失败',
      icon: 'none'
    });
  }
});

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

// 显示详情弹窗
const showDetailModal = (user) => {
  currentUser.value = user;
  detailPopup.value.open();
};

// 关闭详情弹窗
const closeDetailModal = () => {
  currentUser.value = null;
  detailPopup.value.close();
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
      }
    }
  }
}

/* 弹窗样式 */
.modal-content {
  width: 600rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  
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