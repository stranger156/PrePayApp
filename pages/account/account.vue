<template>
  <view class="container">
    <!-- 标题 -->
    <view class="header">
      <text class="title">账户列表</text>
    </view>

    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar 
        placeholder="请输入关键字" 
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
        @click="selectAccount(account)"
      >
        <text class="account-name">{{ account }}</text>
        <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import UniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'

// 账户数据
const accounts = ref([
  'adminTest',
  'adminTest2',
  'saleTest',
  'userTest'
]);

// 搜索关键字
const searchKeyword = ref('');

// 过滤后的账户列表
const filteredAccounts = computed(() => {
  if (!searchKeyword.value) return accounts.value;
  const keyword = searchKeyword.value.toLowerCase();
  return accounts.value.filter(account => 
    account.toLowerCase().includes(keyword)
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

// 选择账户
const selectAccount = (account) => {
  uni.showToast({
    title: `已选择: ${account}`,
    icon: 'none'
  });
  // 实际项目中可以跳转到详情页或执行其他操作
  // uni.navigateTo({
  //   url: `/pages/accountDetail/accountDetail?account=${account}`
  // });
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
</style>