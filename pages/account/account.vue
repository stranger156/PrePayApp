<template>
  <view class="container">
    <!-- 标题 -->
    <view class="header">
      <text class="title">账户列表</text>
    </view>

    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar 
        placeholder="请输入账号名/电话/邮箱" 
        radius="100"
        v-model="searchKeyword"
        @confirm="handleSearch"
        @clear="handleClear"
      ></uni-search-bar>
    </view>

    <!-- 账户列表 -->
    <scroll-view class="account-list" scroll-y>
      <view 
        v-for="(account, index) in filteredAccounts" 
        :key="index" 
        class="account-item"
        @click="showDetailModal(account)"
      >
        <text class="account-name">{{ account.userName }}</text>
        <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
      </view>
    </scroll-view>

    <!-- 详情弹窗 -->
    <uni-popup ref="detailPopup" type="center">
      <view class="modal-content">
        <view class="modal-header">
          <text class="modal-title">{{ currentUser?.userName || '用户详情' }}</text>
          <uni-icons 
            type="closeempty" 
            size="20" 
            color="#666"
            @click="closeDetailModal"
          ></uni-icons>
        </view>
        
        <view class="modal-body">
          <view class="info-item">
            <text class="label">账号编号：</text>
            <text class="value">{{ currentUser?.userNumber || '暂无信息' }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">账号名称：</text>
            <text class="value">{{ currentUser?.userName || '暂无信息' }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">联系电话：</text>
            <text class="value">{{ currentUser?.mobile || '暂无信息' }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">电子邮箱：</text>
            <text class="value">{{ currentUser?.email || '暂无信息' }}</text>
          </view>

          <view class="info-item">
            <text class="label">权限等级：</text>
            <text class="value">{{ currentUser?.authority_id || '暂无信息' }}</text>
          </view>

          <view class="info-item">
            <text class="label">所属账号：</text>
            <text class="value">{{ currentUser?.admin || '暂无信息' }}</text>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import UniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import UniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
import { fetchUserList } from '../../utils/api';

// 用户数据
const accounts = ref([]);
const currentUser = ref(null);
const searchKeyword = ref('');
const detailPopup = ref(null);

// 页面加载时获取数据
onMounted(async () => {
  try {
    const res = await fetchUserList();
    accounts.value = res.data?.records?.map(item => ({
      userNumber: item.userNumber,
      userName: item.userName,
      mobile: item.mobile,
      email: item.email,
      authority_id: item.authority_id,
      address: item.address,
      admin: item.admin,
      errorLogin: item.errorLogin
    })) || [];
  } catch (error) {
    console.error('获取用户列表失败:', error);
    uni.showToast({
      title: '数据加载失败',
      icon: 'none'
    });
  }
});

// 过滤后的用户列表
const filteredAccounts = computed(() => {
  if (!searchKeyword.value) return accounts.value;
  const keyword = searchKeyword.value.toLowerCase();
  return accounts.value.filter(account => 
    [account.userName, account.mobile, account.email].some(field => 
      String(field).toLowerCase().includes(keyword)
    )
  );
});

// 搜索处理
const handleSearch = (e) => {
  searchKeyword.value = e.value;
};

// 清除搜索
const handleClear = () => {
  searchKeyword.value = '';
};

// 显示详情弹窗
const showDetailModal = (user) => {
  currentUser.value = user;
  detailPopup.value.open('center');
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
	  margin-bottom: 20rpx;
	}
	
	.account-list {
	  height: calc(100vh - 180rpx);
	  background-color: #fff;
	  border-radius: 12rpx;
	  overflow: hidden;
	  
	  .account-item {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    padding: 28rpx 30rpx;
	    border-bottom: 1rpx solid #f0f0f0;
	    
	    &:last-child {
	      border-bottom: none;
	    }
	    
	    .account-name {
	      font-size: 32rpx;
	      color: #333;
	    }
	  }
	}
/* 保持原有容器样式 */
.account-list {
  height: calc(100vh - 180rpx);
  
  .account-item {
    padding: 28rpx 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:active {
      background-color: #f8f8f8;
    }
    
    .account-name {
      font-size: 32rpx;
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