<template>
  <view class="container">
    <!-- 记录列表 -->
    <scroll-view scroll-y class="charge-record-list">
      <view 
        class="record-item" 
        v-for="(item, index) in deviceList" 
        :key="item.id"
        @click="viewDeviceDetail(item)"
      >
        <image class="device-icon" src="/static/card.png"></image>
        <view class="device-info">
          <text class="device-id">设备号：{{ item.deviceNumber }}</text>
          <text class="device-days">充值时间：{{ item.date }}</text>
        </view>
        <text class="amount">+{{ parseInt(item.rechargeAmount) }}天</text>
      </view>
      
      <!-- 无数据提示 -->
      <view class="no-data" v-if="deviceList.length === 0">
        <text class="no-data-text">暂无充值记录</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { fetchRechargeList } from '../../utils/api';

export default {
  data() {
    return {
      deviceList: []
    };
  },
  methods: {
    // 获取充值记录列表
    async getDeviceList() {
      try {
        const res = await fetchRechargeList();
        if (res.code === 200 && res.data?.records) {
          this.deviceList = res.data.records.map(record => ({
            id: record.id,
            deviceNumber: record.deviceNumber,
            rechargeAmount: record.rechargeAmount,
            date: record.date,
            operator: record.operator,
            currentFee: record.currentFee
          }));
        }
      } catch (error) {
        console.error('获取充值记录失败:', error);
        uni.showToast({
          title: '数据加载失败',
          icon: 'none'
        });
      }
    },

    // 查看详情
    viewDeviceDetail(item) {
      const content = `
        设备号：${item.deviceNumber}
        充值金额：${item.rechargeAmount}元
        操作员：${item.operator}
        充值时间：${item.date}
        当前余额：${item.currentFee}元
      `;

      uni.showModal({
        title: '充值详情',
        content: content.trim(),
        showCancel: false,
        confirmText: '关闭'
      });
    }
  },
  onLoad() {
    this.getDeviceList();
  },
  onPullDownRefresh() {
    this.getDeviceList().then(() => {
      uni.stopPullDownRefresh();
    });
  }
};
</script>

<style>
	.container {
	  display: flex;
	  flex-direction: column;
	  height: 100vh;
	  background-color: #f5f5f5;
	}
	
	/* 记录列表 */
	.charge-record-list {
	  flex: 1;
	}
	
	.record-item {
	  padding: 20rpx 30rpx;
	  background-color: #FFFFFF;
	  border-bottom: 1rpx solid #EEEEEE;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	}
	
	.device-icon {
	  width: 96rpx;
	  height: 96rpx;
	  border-radius: 50%;
	  margin-right: 30rpx;
	}
	
	.device-info {
	  flex: 1;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	}
	
	.device-id {
	  font-size: 34rpx;
	  color: #666666;
	  margin-bottom: 10rpx;
	}
	
	.device-days {
	  font-size: 28rpx;
	  color: #999999;
	}
	
	.no-data {
	  padding: 100rpx 0;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.no-data-text {
	  color: #999999;
	  font-size: 30rpx;
	}
	
	/* 底部添加按钮区域 */
	.add-charge-record {
	  height: 104rpx;
	  background-color: #FFFFFF;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  border-top: 1rpx solid #EEEEEE;
	}
	
	.add-button-content {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	}
	
	.add-icon {
	  width: 60rpx;
	  height: 60rpx;
	  margin-right: 20rpx;
	}
	
	.add-text {
	  font-size: 40rpx;
	  color: #333333;
	}
/* 原有样式保持不变，新增以下样式 */
.amount {
  font-size: 32rpx;
  color: #ff4444;
  margin-left: 20rpx;
}

/* 优化详情弹窗样式 */
.uni-modal__content {
  white-space: pre-line !important;
  padding: 30rpx !important;
}
</style>