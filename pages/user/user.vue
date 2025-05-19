<template>
  <view class="container">
    <!-- 标题区域 -->
    <view class="header">
      <text class="title">我的换热站</text>
      <text class="count">共计{{ pagination.total }}个换热站</text>
    </view>

    <!-- 搜索区域 -->
    <view class="search-box">
      <uni-search-bar 
        placeholder="输入换热站名称搜索" 
        @confirm="handleSearch"
        v-model="searchKey"
      />
    </view>

    <!-- 列表区域 -->
    <scroll-view class="scroll-view" scroll-y>
      <view 
        v-for="(item, index) in deviceList" 
        :key="item.uniqueId"
        class="station-item"
      >
        <view class="station-header">
          <text class="station-name">{{ item.name }}</text>
          <text class="station-company">{{ item.company }}</text>
        </view>

        <view class="station-info">
          <text class="info-label">地址：</text>
          <text class="info-value">{{ item.address || '暂无地址信息' }}</text>
        </view>

        <view class="station-info">
          <text class="info-label">负责人：</text>
          <text class="info-value">{{ item.person || '暂无负责人' }}</text>
        </view>

        <view class="divider" v-if="index < deviceList.length - 1"></view>
      </view>

      <!-- 分页控件 -->
      <view class="pagination">
        <button 
          class="page-btn" 
          :disabled="pagination.current === 1 || pagination.loading"
          @click="changePage(-1)"
        >
          上一页
        </button>
        <text class="page-info">
          第 {{ pagination.current }} 页 / 共 {{ totalPages }} 页
        </text>
        <button 
          class="page-btn" 
          :disabled="pagination.current >= totalPages || pagination.loading"
          @click="changePage(1)"
        >
          下一页
        </button>
        
        <!-- 新增跳转控件 -->
        <view class="page-jump">
          <input 
            class="jump-input"
            type="number" 
            v-model="jumpPage"
            placeholder="页数"
            :max="totalPages"
            :min="1"
          />
          <button 
            class="jump-btn" 
            @click="handleJump"
            :disabled="pagination.loading"
          >
            前往
          </button>
        </view>
      </view>
    </scroll-view>

    <!-- 加载提示 -->
    <view v-if="pagination.loading" class="loading-mask">
      <uni-load-more status="loading" />
    </view>
  </view>
</template>

<script>
import { getStationList } from '@/utils/api';

export default {
  data() {
    return {
      searchKey: '',
      jumpPage: null,
      deviceList: [],
      pagination: {
        current: 1,    // 当前前端页码
        size: 10,      // 每页显示10条
        total: 984,    // 总数据量（根据实际返回修改）
        loading: false
      },
      allData: [],     // 存储所有已加载数据
      backendPage: 1,  // 后端当前页码
      hasMore: true    // 是否还有更多数据
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.size);
    }
  },
  methods: {
    async loadDeviceData() {
      if (this.pagination.loading || !this.hasMore) return;
      
      this.pagination.loading = true;
      try {
        // 请求后端数据
        const res = await getStationList(
          this.backendPage,
          20,  // 假设后端每页返回20条
          this.searchKey
        );
		console.log(res)
        if (res?.code === 200 && res.data) {
          const data = res.data;
          // 合并新数据到总数据池
          this.allData = [...this.allData, ...data.records];
          
          // 更新总数量
          this.pagination.total = data.total;
          
          // 判断是否需要继续加载
          this.hasMore = data.records.length >= 20;
          this.backendPage++;

          // 更新当前页数据
          this.updateCurrentPageData();
        }
      } catch (error) {
        uni.showToast({
          title: `数据加载失败: ${error.message || '未知错误'}`,
          icon: 'none'
        });
      } finally {
        this.pagination.loading = false;
      }
    },

    updateCurrentPageData() {
      const start = (this.pagination.current - 1) * this.pagination.size;
      const end = start + this.pagination.size;
      
      // 检查数据是否足够
      if (end > this.allData.length) {
        if (this.hasMore) {
          // 需要加载更多数据
          this.loadDeviceData();
        } else {
          // 没有更多数据但显示不足
          const currentPageData = this.allData.slice(start);
          this.deviceList = this.processStationData(currentPageData);
        }
      } else {
        // 正常显示当前页数据
        const currentPageData = this.allData.slice(start, end);
        this.deviceList = this.processStationData(currentPageData);
      }
    },

    processStationData(records) {
      return records.map((station, index) => ({
        uniqueId: `${station.id}_${Date.now()}_${index}`, // 唯一标识
        id: station.id || 'N/A',
        name: station.stationName || '未命名换热站',
        address: station.address || '暂无地址信息',
        company: station.company || '未知公司',
        person: station.userName || '暂无负责人',
        phone: station.phone?.replace(/\D/g, '') || '暂无联系方式',
        latitude: parseFloat(station.latitude) || 0,
        longitude: parseFloat(station.longitude) || 0,
        detail: station.detail || '暂无详细信息'
      }));
    },

    handleSearch() {
      // 重置所有状态
      this.pagination.current = 1;
      this.backendPage = 1;
      this.allData = [];
      this.hasMore = true;
      this.loadDeviceData();
    },

    changePage(step) {
      const newPage = this.pagination.current + step;
      if (newPage > 0 && newPage <= this.totalPages) {
        this.pagination.current = newPage;
        this.updateCurrentPageData();
      }
    },

    handleJump() {
      if (!this.jumpPage || isNaN(this.jumpPage)) return;
      
      const targetPage = Math.max(1, 
        Math.min(parseInt(this.jumpPage), this.totalPages)
      );
      
      this.pagination.current = targetPage;
      this.jumpPage = null;
      this.updateCurrentPageData();
    }
  },
  onLoad() {
    this.loadDeviceData();
  }
};
</script>

<style scoped>
.container {
  padding: 20rpx;
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.header {
  padding: 30rpx 0;
}

.title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.count {
  font-size: 24rpx;
  color: #666;
  margin-top: 10rpx;
}

.search-box {
  margin: 20rpx 0;
}

.scroll-view {
  height: calc(100vh - 240rpx);
}

.station-item {
  background: white;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.05);
}

.station-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.station-name {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.station-company {
  font-size: 24rpx;
  color: #666;
  max-width: 35%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.station-info {
  display: flex;
  margin: 10rpx 0;
  font-size: 28rpx;
}

.info-label {
  color: #999;
  min-width: 120rpx;
}

.info-value {
  color: #666;
  flex: 1;
}

.divider {
  height: 1rpx;
  background-color: #eee;
  margin: 24rpx 0;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background: white;
  margin-top: 20rpx;
  border-radius: 12rpx;
  position: sticky;
  bottom: 0;
}

.page-btn {
  font-size: 28rpx;
  padding: 12rpx 40rpx;
  background-color: #007AFF;
  color: white;
  border-radius: 8rpx;
  line-height: 1.5;
}

.page-btn[disabled] {
  background-color: #ddd;
  color: #999;
  opacity: 0.7;
}

.page-info {
  font-size: 28rpx;
  color: #666;
  margin: 0 20rpx;
  flex-shrink: 0;
}

.page-jump {
  display: flex;
  align-items: center;
  margin-left: 30rpx;
}

.jump-input {
  width: 120rpx;
  height: 60rpx;
  border: 1rpx solid #ddd;
  border-radius: 8rpx;
  padding: 0 20rpx;
  margin: 0 10rpx;
  text-align: center;
  font-size: 28rpx;
}

.jump-btn {
  height: 60rpx;
  padding: 0 30rpx;
  background-color: #007AFF;
  color: white;
  border-radius: 8rpx;
  font-size: 28rpx;
  line-height: 60rpx;
}

.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

@media (max-width: 480px) {
  .page-jump {
    margin-left: 10rpx;
  }
  .jump-input {
    width: 80rpx;
  }
  .jump-btn {
    padding: 0 20rpx;
  }
}
</style> 