<template>
  <view class="container">
    <!-- 错误记录列表 -->
    <scroll-view scroll-y class="error-list">
		<view class="action-buttons">
		     <button class="btn" @click="viewLockedUser">查看登录锁定用户</button>
		</view>
      <view 
        class="error-item" 
        v-for="(item, index) in errorList" 
        :key="item.id"
        @click="showErrorDetail(item.username)"
      >
        <image class="error-icon" src="/static/error_icon.png"></image>
        <view class="error-info">
          <view class="error-title">
            <text class="error-username">{{ item.username }}</text>
            <text class="error-count">登录错误次数: {{ item.count }}</text>
          </view>
          <text class="error-time">最后错误登录时间: {{ item.lastTime }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { fetchLoginList } from '../../utils/api';

export default {
  data() {
    return {
      errorList: [] // 初始化空数组
    };
  },
  methods: {
	  viewLockedUser(url) {
	    uni.redirectTo({
	      url: '/pages/lockedUser/lockedUser'
	    })
	  },
    // 获取错误日志列表
    async getErrorList() {
      try {
        const res = await fetchLoginList();
        if (res.code === 200 && res.data) {
          this.processLoginData(res.data);
        }
      } catch (error) {
        console.error('获取日志失败:', error);
      }
    },

    // 数据处理逻辑
    processLoginData(logs) {
      const errorMap = {};
      
      logs.forEach(log => {
		  console.log(log.createTime)
        // 过滤成功日志（detail包含"成功"的视为成功记录）
        if (log.detail.includes('成功')) return;

        const username = log.userName;
        if (!errorMap[username]) {
          errorMap[username] = {
            username,
            count: 0,
            lastTime: '',
            logs: []
          };
        }

        // 统计错误次数
        errorMap[username].count++;
        
        // 记录所有错误日志（用于详情弹窗）
        errorMap[username].logs.push({
          time: log.createTime,
          detail: log.detail
        });

        // 更新最近错误时间
        if (!errorMap[username].lastTime || 
            new Date(log.createTime) > new Date(errorMap[username].lastTime)) {
          errorMap[username].lastTime = log.createTime;
        }
      });

      // 转换为数组格式
      this.errorList = Object.values(errorMap).map((user, index) => ({
        id: index + 1,
        ...user
      }));
    },

    // 显示错误详情
    showErrorDetail(username) {
      const user = this.errorList.find(u => u.username === username);
      if (!user) return;

      const detailContent = user.logs.map((log, index) => 
        `${index + 1}. 时间：${log.time}\n   详情：${log.detail}`
      ).join('\n\n');

      uni.showModal({
        title: `${username} 的错误记录（共${user.count}次）`,
        content: detailContent,
        showCancel: false,
        confirmText: '关闭'
      });
    }
  },
  onLoad() {
    this.getErrorList();
  }
};
</script>

<!-- 样式部分保持原有结构，建议补充以下优化 -->
<style scoped>
	.btn{
		flex: 1;
		padding: 10rpx;
		border-radius: 8rpx;
		font-size: 25rpx;
		background: #4285f4;
		color: white;
	}
	.container {
	  display: flex;
	  flex-direction: column;
	  height: 100vh;
	  background-color: #f5f5f5;
	  position: relative;
	}
	
	/* 顶部标题栏 */
	.header {
	  height: 90rpx;
	  background-color: #4285f4;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  padding-top: 20rpx;
	}
	
	.header-title {
	  color: #FFFFFF;
	  font-size: 36rpx;
	  font-weight: bold;
	}
	
	/* 错误记录列表 */
	.error-list {
	  flex: 1;
	}
	
	.error-item {
	  padding: 20rpx 30rpx;
	  background-color: #FFFFFF;
	  border-bottom: 1rpx solid #EEEEEE;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	}
	
	.error-icon {
	  width: 90rpx;
	  height: 90rpx;
	  margin-right: 30rpx;
	}
	
	.error-info {
	  flex: 1;
	  display: flex;
	  flex-direction: column;
	}
	
	.error-title {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  margin-bottom: 8rpx;
	}
	
	.error-username {
	  font-size: 34rpx;
	  color: #666666;
	  margin-right: 20rpx;
	}
	
	.error-count {
	  font-size: 30rpx;
	  color: #666666;
	}
	
	.error-time {
	  font-size: 20rpx;
	  color: #999999;
	}
	
	/* 浮动添加按钮 */
	.add-button {
	  position: fixed;
	  right: 40rpx;
	  bottom: 40rpx;
	  width: 100rpx;
	  height: 100rpx;
	  background-color: #FFFFFF;
	  border-radius: 50%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
	}
	
	.add-icon {
	  font-size: 60rpx;
	  color: #666666;
	  line-height: 90rpx;
	}
/* 新增点击效果 */
.error-item {
  transition: all 0.2s;
}
.error-item:active {
  background-color: #f0f0f0;
  transform: scale(0.98);
}

/* 优化时间显示 */
.error-time {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400rpx;
}
</style>
