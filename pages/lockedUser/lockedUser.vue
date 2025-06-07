<template>
  <view class="container">
    <!-- 有数据时显示列表 -->
    <scroll-view
      v-if="lockedUserList.length"
      scroll-y
      class="lockedUser-list"
    >
      <view 
        class="lockedUser-item" 
        v-for="(item, index) in lockedUserList" 
        :key="item.id"
      >
        <view class="lockedUser-info">
          <view class="lockedUser-title">
            <text class="lockedUser-username">{{ item.userName }}</text>
          </view>
          <text class="lockedUser-phoneNumber">电话号码：{{ item.detail }}</text>
          <text class="lockedUser-time">锁定时间：{{ item.createTime }}</text>
        </view>
        
        <button 
          class="unlock-btn"
          @click="unlockuser(item.userName)"
        >
          解锁
        </button>
      </view>
    </scroll-view>

    <!-- 无数据时显示空状态 -->
    <view 
      v-else 
      class="empty-state"
    >
      <text class="empty-text">暂无锁定用户</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLockedUser, unlockUser } from '../../utils/api'

const lockedUserList = ref([])

const unlockuser = (username) => {
  uni.showModal({
    title: '确认解锁',
    content: `确定要解锁用户 ${username} 吗？`,
    success: async (res) => {
      if (res.confirm) {
        try {
          await unlockUser(username)
          uni.showToast({ title: '解锁成功', icon: 'success' })
          // 刷新列表
          const res2 = await getLockedUser()
          lockedUserList.value = res2.data.map(item => ({
            createTime: item.createTime,
            detail: item.detail,
            id: item.id,
            userName: item.userName
          }))
        } catch (error) {
          uni.showToast({ title: '解锁失败', icon: 'error' })
          console.error('解锁失败:', error)
        }
      }
    }
  })
}

onMounted(() => {
  ;(async () => {
    const res = await getLockedUser()
    lockedUserList.value = res.data.map(item => ({
      createTime: item.createTime,
      detail: item.detail,
      id: item.id,
      userName: item.userName
    }))
  })()
})
</script>

<style>
.container {
  flex: 1;
  position: relative;
}

/* 锁定用户列表 */
.lockedUser-list {
  flex: 1;
}

.lockedUser-item {
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #FFFFFF;
  border-bottom: 1rpx solid #EEEEEE;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.lockedUser-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.lockedUser-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8rpx;
}

.lockedUser-username {
  font-size: 34rpx;
  color: #666666;
  margin-right: 20rpx;
}

.lockedUser-phoneNumber,
.lockedUser-time {
  font-size: 20rpx;
  color: #999999;
}

/* 解锁按钮样式 */
.unlock-btn {
  width: 120rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 26rpx;
  background-color: #07c160;
  color: white;
  border-radius: 10rpx;
  margin-left: 20rpx;
  padding: 0;
}

/* 空状态样式 */
.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: white;
}

.empty-text {
  font-size: 28rpx;
  color: #999999;
}
</style>
