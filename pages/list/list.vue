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
        @tap="showStationDetail(item) "
      >
        <view class="station-header">
          <text class="station-name">{{ item.stationName }}</text>
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

    <!-- 详情弹窗 -->
    <view v-if="showDetailDialog" class="dialog-mask" @tap="closeDialog">
      <view class="dialog-content" @tap.stop>
        <view class="dialog-header">
          <text class="dialog-title">换热站详情</text>
          <uni-icons 
            type="closeempty" 
            size="24" 
            color="#999" 
            @tap="closeDialog"
          ></uni-icons>
        </view>

        <scroll-view scroll-y class="detail-scroll">
          <view class="detail-section">
            <view class="detail-row">
              <text class="detail-label">换热站名称：</text>
              <text class="detail-value">{{ selectedStation.stationName }}</text>
            </view>
            <view class="detail-row">
              <text class="detail-label">所属公司：</text>
              <text class="detail-value">{{ selectedStation.company }}</text>
            </view>
            <view class="detail-row">
              <text class="detail-label">负责人：</text>
              <text class="detail-value">{{ selectedStation.person || '暂无' }}</text>
            </view>
            <view class="detail-row">
              <text class="detail-label">联系电话：</text>
              <text class="detail-value">{{ selectedStation.phone || '暂无' }}</text>
            </view>
            <view class="detail-row">
              <text class="detail-label">地址：</text>
              <text class="detail-value">{{ selectedStation.address || '暂无' }}</text>
            </view>
            <view class="detail-row">
              <text class="detail-label">经度：</text>
              <text class="detail-value">{{ selectedStation.longitude }}</text>
            </view>
            <view class="detail-row">
              <text class="detail-label">纬度：</text>
              <text class="detail-value">{{ selectedStation.latitude }}</text>
            </view>
			<view class="detail-row">
			  <text class="detail-label">详细信息：</text>
			  <text class="detail-value">{{ selectedStation.detail }}</text>
			</view>
			
          </view>

          <view class="detail-section">
            <text class="section-title">设备列表（{{ selectedStation.devices?.length || 0 }}台）</text>
            <view 
              v-for="(device, index) in selectedStation.devices" 
              :key="index"
              class="device-item"
            >
              <text class="device-name">{{ device.name }}</text>
              <view class="device-info">
                <text>编号：{{ device.code }}</text>
                <view class="device-actions">
                    <text 
                      class="action-btn" 
                      @tap.stop="showDeviceDetail(device)"
                    >查看详情</text>
                  <text class="action-btn">安装信息</text>
                  <text class="action-btn">充值</text>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
	
	<!-- 设备详情弹窗 -->
<view v-if="showDeviceDetailDialog" class="dialog-mask" @tap="closeDeviceDialog">
  <view class="dialog-content device-detail-content" @tap.stop>
    <view class="dialog-header">
      <text class="dialog-title">设备详情</text>
      <uni-icons 
        type="closeempty" 
        size="24" 
        color="#999" 
        @tap="closeDeviceDialog"
      ></uni-icons>
    </view>

    <scroll-view scroll-y class="detail-scroll">
      <!-- 基本信息 -->
      <view class="detail-section">
        <view class="detail-row">
          <text class="detail-label">设备名称：</text>
          <text class="detail-value">{{ selectedDevice.name }}</text>
        </view>
        <view class="detail-row">
          <text class="detail-label">设备编号：</text>
          <text class="detail-value">{{ selectedDevice.code }}</text>
        </view>
        <view class="detail-row">
          <text class="detail-label">剩余时间：</text>
          <text class="detail-value">{{ selectedDevice.remainingTime || '--' }}</text>
        </view>
        <view class="detail-row">
          <text class="detail-label">更新时间：</text>
          <text class="detail-value">{{ selectedDevice.updateTime || '--' }}</text>
        </view>
      </view>

      <!-- 温度数据 -->
      <view class="detail-section">
        <view class="temperature-grid">
          <view class="temp-item">
            <text class="temp-label">一网回水温度</text>
            <text class="temp-value">{{ selectedDevice.temp1 }}°C</text>
          </view>
          <view class="temp-item">
            <text class="temp-label">二网供水温度</text>
            <text class="temp-value">{{ selectedDevice.temp2 }}°C</text>
          </view>
          <view class="temp-item">
            <text class="temp-label">当前温差</text>
            <text 
              class="temp-value"
              :style="{color: selectedDevice.tempDiff < 0 ? '#ff4444' : '#4CAF50'}"
            >
              {{ selectedDevice.tempDiff }}°C
            </text>
          </view>
        </view>
      </view>

      <!-- 历史记录 -->
      <view class="detail-section">
        <text class="section-title">温差历史记录（{{ selectedDevice.history?.length || 0 }}条）</text>
        <view class="history-chart">
          <!-- 这里可以集成echarts图表 -->
            
             <!-- 图表容器 -->
             <ec-canvas 
               id="temp-chart" 
               ref="tempChart"
               :option="chartOption" 
               canvas-id="temp-chart"
               width="100%"
               height="300px"
             />
             
             <!-- 无数据提示 -->
             <view 
               v-if="selectedDevice.history?.length === 0" 
               class="empty-tip"
             >
               暂无历史记录
             </view>
			 
        </view>
      </view>
    </scroll-view>
  </view>
</view>

    <!-- 加载提示 -->
    <view v-if="pagination.loading" class="loading-mask">
      <uni-load-more status="loading" />
    </view>
  </view>
</template>

<script>
import { getStationList,getStationDevices,getDetailDevices } from '@/utils/api';
import * as echarts from 'echarts';
export default {
  data() {
    return {
		
		// chartOption: {
		//       tooltip: {
		//         trigger: 'axis',
		//         formatter: '{b}<br/>{a}: {c}°C'
		//       },
		//       xAxis: {
		//         type: 'category',
		//         data: [],
		//         axisLabel: {
		//           formatter: value => value.split(' ')[0] // 只显示日期
		//         }
		//       },
		//       yAxis: {
		//         type: 'value',
		//         axisLabel: {
		//           formatter: '{value} °C'
		//         }
		//       },
		//       series: [{
		//         name: '温差',
		//         type: 'line',
		//         data: [],
		//         itemStyle: {
		//           color: '#1890ff' // 主色
		//         },
		//         areaStyle: {
		//           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
		//             { offset: 0, color: 'rgba(24,144,255,0.6)' },
		//             { offset: 1, color: 'rgba(24,144,255,0.1)' }
		//           ])
		//         }
		//       }]
		//     },
	  	
      searchKey: '',
      jumpPage: null,
      deviceList: [],
      showDetailDialog: false,
	  showDeviceDetailDialog: false,
	  selectedDevice: null,
      selectedStation: null,
      pagination: {
        current: 1,
        size: 10,
        total: 984,
        loading: false
      },
      allData: [],
      backendPage: 1,
      hasMore: true
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.size);
    }
  },
  
    mounted() {
      this.initChart();
    },
  methods: {
	  
	  initChart() {
	        const chart = echarts.init(this.$refs.canvas, null, {
	          width: this.width,
	          height: this.height
	        });
	        chart.setOption(this.option);
	      },
	    
    async loadDeviceData() {
      if (this.pagination.loading || !this.hasMore) return;
      
      this.pagination.loading = true;
      try {
        const res = await getStationList(
          this.backendPage,
          20,
          this.searchKey
        );

        if (res?.code === 200 && res.data) {
          const data = res.data;
          this.allData = [...this.allData, ...data.records];
          this.pagination.total = data.total;
          this.hasMore = data.records.length >= 20;
          this.backendPage++;
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
      
      if (end > this.allData.length) {
        if (this.hasMore) {
          this.loadDeviceData();
        } else {
          const currentPageData = this.allData.slice(start);
          this.deviceList = this.processStationData(currentPageData);
        }
      } else {
        const currentPageData = this.allData.slice(start, end);
        this.deviceList = this.processStationData(currentPageData);
      }
    },

    processStationData(records) {
      return records.map((station, index) => ({
        uniqueId: `${station.id}_${Date.now()}_${index}`,
        id: station.id || 'N/A',
        stationName: station.stationName || '未命名换热站',
        address: station.address || '暂无地址信息',
        company: station.company || '未知公司',
        person: station.userName || '暂无负责人',
        phone: station.phone?.replace(/\D/g, '') || '暂无联系方式',
		detail:station.detail ||'暂无信息',
        latitude: parseFloat(station.latitude) || 0,
        longitude: parseFloat(station.longitude) || 0,
	
      }));
    },
		
 async showStationDetail(station) { // [!code focus]
	console.log(station)
    this.selectedStation = station;
    this.showDetailDialog = true;
    
    try {
      const devices = await this.generateDeviceList(station);
      this.selectedStation = {
        ...this.selectedStation,
        devices: devices
      };
    } catch (error) {
      console.error('加载设备失败:', error);
      this.selectedStation.devices = [{
        name: '数据加载失败', 
        code: 'ERROR', 
        status: '异常'
      }];
    }
  },

// 修改后的 generateDeviceList 方法
async   generateDeviceList(station) {
  try {
    // 调用设备接口

    const res =await  getStationDevices(station.stationName);
   
	
    // 成功响应处理
    if (res?.code === 200 && res.data) {
		console.log(666)
      return res.data.map(device => ({
        name: device.deviceName || '未命名设备',  // 映射设备名称
        code: device.deviceNumber || 'N/A',      // 映射设备编号
        status: '正常'                          // 根据实际情况可添加状态字段
      }));
    }
    
    // 异常数据返回空
    return []; 
  } catch (error) {
    // 错误处理
    console.error('获取设备失败:', error);
    return [{
      name: '数据加载失败',
      code: 'ERROR',
      status: '异常'
    }];
  }
},

async showDeviceDetail(device) {
		 
	      this.selectedDevice = device;
	      this.showDeviceDetailDialog = true;
		
		  try {
			console.log(device)
			const res =await  getDetailDevices(device.code);
			   
			
			// 成功响应处理
			if (res?.code === 200 && res.data) {
				  const { deviceInfo, temperatureInfo, tempDiffHistory } = res.data;
				      
				      // 合并数据到 selectedDevice
				      this.selectedDevice = {
				        ...this.selectedDevice,
				        // 设备基础信息
				        code: deviceInfo.deviceNumber,
				        installDate: deviceInfo.addTime,
				        updateTime: deviceInfo.dateTime,
				        status: deviceInfo.deviceState ? '正常' : '离线',
				        remainingTime: `${deviceInfo.day}天${deviceInfo.hour}小时${deviceInfo.minute}分`,
				        
				        // 温度信息
				        temp1: temperatureInfo.temp1In,
				        temp2: temperatureInfo.temp2Out,
				        tempDiff: (temperatureInfo.temp2Out - temperatureInfo.temp1In).toFixed(1),
				        
				        // 历史记录（取前10条）
				        history: tempDiffHistory.slice(0, 10).map(item => ({
				          time: item.addTime,
				          value: item.diff
				        }))
						
						
						
						
				      };
					  
					  // 更新图表数据
					        this.chartOption = {
					          ...this.chartOption,
					          xAxis: {
					            ...this.chartOption.xAxis,
					            data: this.selectedDevice.history.map(item => item.time)
					          },
					          series: [{
					            ...this.chartOption.series[0],
					            data: this.selectedDevice.history.map(item => item.value)
					          }]
					        };
					  
					        // 强制更新图表
					        this.$nextTick(() => {
					          const chart = echarts.getInstanceByDom(this.$refs.tempChart);
					          if (chart) chart.setOption(this.chartOption);
					        });
			}
			
		  } catch (error) {
		    console.error('加载设备失败:', error);
		    this.selectedStation.devices = [{
		      name: '数据加载失败', 
		      code: 'ERROR', 
		      status: '异常'
		    }];
		  }
		},
	    closeDeviceDialog() {
	      this.showDeviceDetailDialog = false;
	      this.selectedDevice = null;
	    },
	    

    closeDialog() {
      this.showDetailDialog = false;
      this.selectedStation = null;
    },

    handleSearch() {
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
/* 原有样式保持不变... */

/* 图表容器样式 */
.ec-canvas {
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 无数据提示 */
.empty-tip {
  text-align: center;
  padding: 20px;
  color: #888;
}

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
/* 新增弹窗样式 */
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  width: 90%;
  max-width: 600rpx;
  border-radius: 16rpx;
  padding: 30rpx;
  max-height: 80vh;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.dialog-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.detail-scroll {
  max-height: 60vh;
}

.detail-section {
  margin-bottom: 30rpx;
  border-bottom: 1rpx solid #eee;
  padding-bottom: 20rpx;
}

.detail-row {
  display: flex;
  margin: 15rpx 0;
  font-size: 28rpx;
}

.detail-label {
  color: #666;
  min-width: 160rpx;
}

.detail-value {
  color: #333;
  flex: 1;
}

.section-title {
  display: block;
  font-weight: bold;
  color: #333;
  margin: 20rpx 0;
}

.device-item {
  background: #f8f8f8;
  border-radius: 8rpx;
  padding: 20rpx;
  margin: 15rpx 0;
}

.device-name {
  font-size: 28rpx;
  color: #007AFF;
  margin-bottom: 10rpx;
  display: block;
}

.device-info {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: #666;
}

.device-actions {
  display: flex;
  gap: 15rpx;
}

.action-btn {
  color: #007AFF;
  font-size: 24rpx;
  padding: 5rpx 10rpx;
  border: 1rpx solid #007AFF;
  border-radius: 6rpx;
}

/* 设备详情特有样式 */
.device-detail-content {
  width: 85%;
  max-width: 700rpx;
}

.temperature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-top: 20rpx;
}

.temp-item {
  background: #f8f8f8;
  border-radius: 12rpx;
  padding: 24rpx;
  text-align: center;
}

.temp-label {
  display: block;
  color: #666;
  font-size: 24rpx;
  margin-bottom: 10rpx;
}

.temp-value {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.history-chart {
  height: 300rpx;
  margin-top: 20rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>