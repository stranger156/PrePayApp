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
            前 往
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
					
                   <text 
                      class="action-btn" 
                      @tap.stop="showInstallInfo(device)"
                    >安装信息</text>
                  
				 
                      <text 
                        class="action-btn" 
                        @tap.stop="showPayDetail(device)"
                      >充值</text>
					  
					<text 
					    class="action-btn delete-btn" 
					    @tap.stop="confirmDeleteDevice(device)"
					  >删除设备</text>
					  
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
       
       <!-- 历史记录图表 -->
       <view class="chart-container" v-if="selectedDevice.history?.length > 0">
         <!-- 使用uni-app中的ec-canvas组件 -->
         <ec-canvas 
           id="tempChart" 
           canvas-id="tempChart"
           :ec="tempChartInit"
           style="width: 100%; height: 300px;"
         ></ec-canvas>
       </view>
       
       <!-- 无数据提示 -->
       <view v-if="!selectedDevice.history?.length" class="no-data">
         <text>暂无历史数据</text>
       </view>
     </view>
	  
	  
	  
    </scroll-view>
  </view>
</view>

<!-- 充值弹窗 -->
    <view v-if="showRechargeDialog" class="dialog-mask" @tap="closeRechargeDialog">
      <view class="dialog-content recharge-content" @tap.stop>
        <view class="dialog-header">
          <text class="dialog-title">设备充值</text>
          <uni-icons 
            type="closeempty" 
            size="24" 
            color="#999" 
            @tap="closeRechargeDialog"
          ></uni-icons>
        </view>
        <form @submit="handleRecharge">
          <view class="form-item">
            <label class="form-label">设备编号</label>
            <input 
              class="form-input" 
              type="text" 
              placeholder="设备编号" 
              v-model="rechargeForm.deviceCode" 
              disabled
            />
          </view>
          <view class="form-item">
            <text class="detail-label">设备名称：</text>
            <text class="detail-value">{{ selectedDevice.name }}</text>
          </view>
		  <view class="form-item">
		    <text class="detail-label">设备编号：</text>
		    <text class="detail-value">{{ selectedDevice.code }}</text>
		  </view>
		  
        <view class="form-item">
          <label class="form-label">充值天数</label>
          <view class="number-input-group">
            <button class="number-btn minus-btn" @tap.stop="decreaseDays">-</button>
            <input 
              class="form-input number-input" 
              type="number" 
              placeholder="输入天数" 
              v-model.number="rechargeForm.days" 
              min="1" 
              @input="validateDays"
            />
            <button class="number-btn plus-btn" @tap.stop="increaseDays">+</button>
          </view>
          <view class="price-calculation">
            <text>预计费用: ¥{{ (rechargeForm.days * unitPrice).toFixed(2) }}</text>
          </view>
        </view>
		  
          <view class="form-buttons">
            <button 
              class="form-button" 
              formType="reset"
            >取消</button>
            <button 
              class="form-button form-button-confirm" 
              formType="submit"
            >确定充值</button>
			
			
			
          </view>
        </form>
      </view>
    </view>
<!-- 删除确认弹窗 -->
<view v-if="showDeleteConfirm" class="confirm-mask" @tap="cancelDelete">
  <view class="confirm-dialog" @tap.stop>
    <view class="confirm-title">确认删除</view>
    <view class="confirm-content">确定要删除设备"{{ deviceToDelete?.name }}"吗？此操作不可恢复。</view>
    <view class="confirm-buttons">
      <button class="confirm-btn cancel-btn" @tap="cancelDelete">取消</button>
      <button class="confirm-btn delete-btn" @tap="confirmDelete">确认删除</button>
    </view>
  </view>
</view>
<!-- 安装信息弹窗 -->
<view v-if="showInstallInfoDialog" class="dialog-mask" @tap="closeInstallInfoDialog">
  <view class="dialog-content install-info-content" @tap.stop>
    <view class="dialog-header">
      <text class="dialog-title">设备安装信息</text>
      <uni-icons 
        type="closeempty" 
        size="24" 
        color="#999" 
        @tap="closeInstallInfoDialog"
      ></uni-icons>
    </view>

    <view class="install-info-header">
      <text class="info-header-title">安装信息</text>
      <button class="modify-btn">
        <uni-icons type="compose" size="14" color="#fff"></uni-icons>
        修改设备信息
      </button>
    </view>

    <scroll-view scroll-y class="detail-scroll">
      <!-- 基本信息 -->
      <view class="detail-section">
        <view class="section-header">
          <uni-icons type="info-filled" size="16" color="#1296db"></uni-icons>
          <text class="section-title">基本信息</text>
        </view>
        
        <view class="info-grid">
          <view class="info-item">
            <text class="info-label">设备编号：</text>
            <text class="info-value">{{ selectedDevice.deviceNumber || '12000638' }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">设备名称：</text>
            <text class="info-value">{{ selectedDevice.deviceName || '二网进水端头' }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">设备类型：</text>
            <text class="info-value">{{ selectedDevice.type || '预付费' }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">所属公司：</text>
            <text class="info-value">{{ selectedDevice.companyName || '甘肃白银靖城热力' }}</text>
          </view>
          <view class="info-item wide-item">
            <text class="info-label">所属站点：</text>
            <text class="info-value">{{ selectedDevice.deviceStation || '0号站' }}</text>
          </view>
        </view>
      </view>

      <!-- 安装信息 -->
      <view class="detail-section">
        <view class="section-header">
          <uni-icons type="calendar-filled" size="16" color="#1296db"></uni-icons>
          <text class="section-title">安装信息</text>
        </view>
        
        <view class="info-grid">
          <view class="info-item">
            <text class="info-label">安装日期：</text>
            <text class="info-value">{{ selectedDevice.installDate || '2020-11-02' }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">数据上传：</text>
            <text class="info-value">{{ selectedDevice.uploadTime || '5' }}分钟/次</text>
          </view>
        </view>
      </view>

      <!-- 运行状态 -->
      <view class="detail-section">
        <view class="section-header">
          <uni-icons type="gear-filled" size="16" color="#1296db"></uni-icons>
          <text class="section-title">运行状态</text>
        </view>
        
        <view class="info-grid">
          <view class="info-item">
            <text class="info-label">联网状态：</text>
            <view class="status-tag" 
                  :class="selectedDevice.onlineState ? 'online' : 'offline'">
              {{ selectedDevice.onlineState ? '联网' : '离线' }}
            </view>
          </view>
          <view class="info-item">
            <text class="info-label">开关状态：</text>
            <view class="status-tag"
                  :class="selectedDevice.switchState ? 'on' : 'off'">
              {{ selectedDevice.switchState ? '开' : '关' }}
            </view>
          </view>
          <view class="info-item">
            <text class="info-label">停机状态：</text>
            <view class="status-tag"
                  :class="selectedDevice.stopState ? 'stopped' : 'running'">
              {{ selectedDevice.stopState ? '停机' : '非停机' }}
            </view>
          </view>
          <view class="info-item">
            <text class="info-label">开启提醒：</text>
            <view class="status-tag"
                  :class="selectedDevice.alarm ? 'on' : 'off'">
              {{ selectedDevice.alarm ? '开' : '关' }}
            </view>
          </view>
        </view>
      </view>

      <!-- 温度计信息 -->
      <view class="detail-section">
        <view class="section-header">
          <uni-icons type="mic-filled" size="16" color="#1296db"></uni-icons>
          <text class="section-title">温度计信息</text>
        </view>
        
        <view class="info-grid">
          <view class="info-item">
            <text class="info-label">一网回水温度计：</text>
            <text class="info-value">{{ selectedDevice.temp1In || '31000822' }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">二网供水温度计：</text>
            <text class="info-value">{{ selectedDevice.temp2Out || '31000819' }}</text>
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
import { getStationList,getStationDevices,getDetailDevices,getDeviceInstallInfo, } from '@/utils/api';

import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/dataZoom';

export default {
  data() {
    return {
		
		 showDeleteConfirm: false,
		    deviceToDelete: null,
		rechargeForm: {
		      deviceCode: '',
		      days: 1  // 默认值
		    },
		    unitPrice: 10 ,
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
	  showRechargeDialog:false,	
	  showInstallInfoDialog:false,
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
      hasMore: true,//、
	  // 图表初始化对象
	        tempChartInit: {
	          lazyLoad: true // 延迟加载
	        }
	  // 图表配置
	        // chartOption: {
	        //   tooltip: {
	        //     trigger: 'axis',
	        //     formatter: '{b}<br/>{a}: {c}°C'
	        //   },
	        //   grid: {
	        //     left: '3%',
	        //     right: '4%',
	        //     bottom: '3%',
	        //     containLabel: true
	        //   },
	        //   xAxis: {
	        //     type: 'category',
	        //     data: [],
	        //     axisLabel: {
	        //       formatter: value => value.split(' ')[0], // 只显示日期
	        //       interval: 0,
	        //       rotate: 30
	        //     }
	        //   },
	        //   yAxis: {
	        //     type: 'value',
	        //     axisLabel: {
	        //       formatter: '{value} °C'
	        //     }
	        //   },
	        //   series: [{
	        //     name: '温差',
	        //     type: 'line',
	        //     data: [],
	        //     smooth: true,
	        //     symbol: 'circle',
	        //     symbolSize: 6,
	        //     itemStyle: {
	        //       color: '#1296db' // 主色
	        //     },
	        //     lineStyle: {
	        //       width: 3
	        //     },
	        //     areaStyle: {
	        //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
	        //         { offset: 0, color: 'rgba(18,150,219,0.6)' },
	        //         { offset: 1, color: 'rgba(18,150,219,0.1)' }
	        //       ])
	        //     }
	        //   }]
	        // }
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.size);
    }
  },
  
    mounted() {
     
    },
  methods: {
		initTempChart() {
		      // 确保有历史数据
		      if (!this.selectedDevice?.history?.length) return;
		      
		      // 获取图表组件实例
		      this.$nextTick(() => {
		        // 获取图表组件实例
		        if (this.$refs.tempChart) {
		          const chart = this.$refs.tempChart.init(echarts);
		          
		          // 准备图表数据
		          const xData = this.selectedDevice.history.map(item => item.time);
		          const yData = this.selectedDevice.history.map(item => item.value);
		          
		          // 设置图表选项
		          const option = {
		            tooltip: {
		              trigger: 'axis',
		              formatter: '{b}<br/>温差: {c}°C'
		            },
		            grid: {
		              left: '3%',
		              right: '4%',
		              bottom: '3%',
		              containLabel: true
		            },
		            xAxis: {
		              type: 'category',
		              data: xData,
		              axisLabel: {
		                interval: 0,
		                rotate: 45,
		                fontSize: 10
		              }
		            },
		            yAxis: {
		              type: 'value',
		              name: '温差(°C)',
		              axisLabel: {
		                formatter: '{value}°C'
		              }
		            },
		            series: [{
		              name: '温差',
		              type: 'line',
		              data: yData,
		              smooth: true,
		              symbolSize: 6,
		              itemStyle: {
		                color: '#1296db'
		              },
		              markLine: {
		                data: [
		                  { type: 'average', name: '平均值' }
		                ]
		              }
		            }]
		          };
		          
		          // 设置图表
		          chart.setOption(option);
		        }
		      });
		    },
	  
	  // 确认删除设备
	    // 显示删除确认弹窗
	      confirmDeleteDevice(device) {
	        this.deviceToDelete = device;
	        this.showDeleteConfirm = true;
	      },
	      
	      // 取消删除
	      cancelDelete() {
	        this.showDeleteConfirm = false;
	        this.deviceToDelete = null;
	      },
	      
	    // 删除设备
	     // 确认删除
	      async confirmDelete() {
	        if (!this.deviceToDelete) return;
	        
	        try {
	          uni.showLoading({
	            title: '正在删除...'
	          });
	          
	          // 调用删除设备API
	          const res = await deleteDeviceById(this.deviceToDelete.code);
	          
	          if (res?.code === 200) {
	            uni.showToast({
	              title: '设备删除成功',
	              icon: 'success'
	            });
	            
	            // 从列表中移除该设备
	            if (this.selectedStation && this.selectedStation.devices) {
	              const index = this.selectedStation.devices.findIndex(
	                item => item.code === this.deviceToDelete.code
	              );
	              if (index !== -1) {
	                this.selectedStation.devices.splice(index, 1);
	              }
	            }
	          } else {
	            uni.showToast({
	              title: res?.msg || '删除失败',
	              icon: 'none'
	            });
	          }
	        } catch (error) {
	          console.error('删除设备失败:', error);
	          uni.showToast({
	            title: '删除设备失败，请稍后重试',
	            icon: 'none'
	          });
	        } finally {
	          uni.hideLoading();
	          this.showDeleteConfirm = false;
	          this.deviceToDelete = null;
	        }
	      },
	      
		
	   increaseDays() {
	      this.rechargeForm.days = parseInt(this.rechargeForm.days || 1) + 1;
	      this.validateDays();
	    },
	    
	    // 减少天数
	    decreaseDays() {
	      if (this.rechargeForm.days > 1) {
	        this.rechargeForm.days = parseInt(this.rechargeForm.days) - 1;
	      }
	      this.validateDays();
	    },
	    
	    // 验证天数输入
	    validateDays() {
	      // 确保是数字且大于0
	      let days = parseInt(this.rechargeForm.days);
	      if (isNaN(days) || days < 1) {
	        this.rechargeForm.days = 1;
	      } else {
	        this.rechargeForm.days = days;
	      }
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
          title: "数据加载失败: ${error.message || '未知错误'}",
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
async showInstallInfo(device) {
  this.selectedDevice = device;
  this.showInstallInfoDialog = true;
  
  try {
    console.log(device);
    const res = await getDeviceInstallInfo(device.code);
    
    // 成功响应处理
    if (res?.code === 200 && res.data) {
      // 更新 selectedDevice 对象，包含安装信息
      this.selectedDevice = {
        ...this.selectedDevice,
        // 设备基础信息
        deviceNumber: res.data.deviceNumber,
        deviceName: res.data.deviceName,
        type: res.data.type,
        companyName: res.data.companyName,
        deviceStation: res.data.deviceStation,
        
        // 安装信息
        installDate: res.data.installDate,
        uploadTime: res.data.uploadTime,
        
        // 运行状态
        onlineState: res.data.onlineState,
        switchState: res.data.switchState,
        stopState: res.data.stopState,
        alarm: res.data.alarm,
        
        // 温度计信息
        temp1In: res.data.temp1In,
        temp2Out: res.data.temp2Out
      };
    }
  } catch (error) {
    console.error('加载设备安装信息失败:', error);
    uni.showToast({
      title: '设备安装信息加载失败',
      icon: 'none'
    });
  }
},

async  showPayDetail(device) {
    this.selectedDevice = device;
    this.rechargeForm.deviceCode = device.code;
    this.rechargeForm.days = 1; // 默认一天
    this.showRechargeDialog = true;
  },
 async showDeviceDetail(device) {
      this.selectedDevice = device;
      this.showDeviceDetailDialog = true;
      
      try {
        console.log(device);
        const res = await getDetailDevices(device.code);
        
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
          
          // 初始化图表
          this.$nextTick(() => {
            this.initTempChart();
          });
        }
      } catch (error) {
        console.error('加载设备失败:', error);
        uni.showToast({
          title: '加载设备数据失败',
          icon: 'none'
        });
      }
    },
		
		
closeDeviceDialog() {
	      this.showDeviceDetailDialog = false;
	      this.selectedDevice = null;
	    },
closeInstallInfoDialog(){
	this.showInstallInfoDialog = false;
},	
		
closeRechargeDialog() {
	     this.showRechargeDialog = false;
	    
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
.container {
  padding: 20rpx;
  height: 90vh;
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
  height: calc(100vh - 350rpx);
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

/* 调整分页控件位置和样式 */
.pagination {
 position: relative;
 /* bottom:100rpx; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20rpx 16rpx;
  background: white;
  /* margin: 20rpx 10rpx 120rpx 10rpx; *//* 增加底部边距，避开导航栏 */
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  /* position: relative; */ /* 改为相对定位，不再固定在底部 */
  z-index: 100;
}

/* 页码按钮样式 */
.page-btn {
  height: 70rpx;
  min-width: 100rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  background: #007AFF;
  color: white;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

/* 页码信息样式 */
.page-info {
  font-size: 28rpx;
  color: #333;
  margin: 0 10rpx;
}

/* 跳转控件样式 */
.page-jump {
  display: flex;
  align-items: center;
}

/* 输入框样式 */
.jump-input {
  width: 80rpx;
  height: 60rpx;
  background: #fff;
  border-radius: 8rpx;
  padding: 0 10rpx;
  margin-right: 20rpx; /* 增加输入框与按钮之间的距离 */
  text-align: center;
  font-size: 28rpx;
  color: #333;
  border: 1rpx solid #ddd;
}

/* 跳转按钮样式 */
.jump-btn {
  height: 60rpx;
  min-width: 70rpx;
  padding: 0 15rpx;
  background: #007AFF;
  color: white;
  border-radius: 8rpx;
  font-size: 24rpx;
  line-height: 60rpx;
  border: none;
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
  width: 100%;
  max-width: 600rpx;
  border-radius: 16rpx;
  padding: 30rpx;
  max-height: 100vh;
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
  margin-right: 20px;
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
  text-align: center;
  font-size: 24rpx;
  padding: 5rpx 10rpx;
  border: 1rpx solid #007AFF;
  border-radius: 6rpx;
}

/* 设备详情特有样式 */
.device-detail-content {
  width: 85%;
  max-width: 600rpx;
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
/* 充值弹窗样式 */
.recharge-content {
  width: 85%;
  max-width: 600rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.1);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 30rpx 20rpx;
  border-bottom: 1rpx solid #eee;
}

.dialog-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.form-item {
  padding: 25rpx 30rpx;
  border-bottom: 1rpx solid #eee;
}

.form-label {
  display: block;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 15rpx;
}

.form-input {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 20rpx;
  border: 1rpx solid #ddd;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #f8f8f8;
}

.form-input[disabled] {
  color: #999;
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  padding: 30rpx;
}

.form-button {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  border-radius: 12rpx;
  font-size: 30rpx;
  font-weight: 500;
}
/* 删除按钮特殊样式 */
.delete-btn {
  color: #ff4444;
  border-color: #ff4444;
}
.form-button:first-child {
  margin-right: 20rpx;
  background-color: #f5f5f5;
  color: #666;
}

.form-button-confirm {
  background-color: #007AFF;
  color: #fff;
}

/* 动画效果 */
.dialog-mask {
  transition: opacity 0.3s ease;
}

.recharge-content {
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.dialog-mask.enter {
  opacity: 0;
}

.dialog-mask.enter-active {
  opacity: 1;
}

.recharge-content.enter {
  transform: translateY(50rpx);
}

.recharge-content.enter-active {
  transform: translateY(0);
}

/*这里的是安装信息弹窗的样式*/
.dialog-content {
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  width: 600px;
  max-height: 80vh;
  /* overflow-y: auto; */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dialog-content.install-info-content {
  background: #fff;
  border-radius: 12rpx;
  padding: 0;
  width: 90%;
  max-width: 700rpx;
  max-height: 85vh;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25rpx 30rpx;
  border-bottom: 1rpx solid #eee;
}

.dialog-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.install-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #eee;
}

.info-header-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.modify-btn {
  background-color: #1296db;
  color: #fff;
  font-size: 24rpx;
  padding: 8rpx 16rpx;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  border: none;
  line-height: 1.5;
}

.modify-btn uni-icons {
  margin-right: 8rpx;
}

.detail-scroll {
  flex: 1;
  padding: 20rpx;
}

.detail-section {
  margin-bottom: 30rpx;
  border-radius: 8rpx;
  overflow: hidden;
  background: #fff;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  margin-bottom: 15rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-left: 12rpx;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.info-item {
  padding: 10rpx 0;
}

.wide-item {
  grid-column: span 2;
}

.info-label {
  font-size: 26rpx;
  color: #666;
}

.info-value {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
}

.status-tag {
  display: inline-block;
  padding: 4rpx 16rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
  color: white;
  text-align: center;
}

.status-tag.online {
  background-color: #67c23a;
}

.status-tag.offline {
  background-color: #909399;
}

.status-tag.on {
  background-color: #67c23a;
}

.status-tag.off {
  background-color: #909399;
}

.status-tag.running {
  background-color: #67c23a;
}

.status-tag.stopped {
  background-color: #f56c6c;
}

/* 修改设备信息区块的样式为浅灰色背景 */
.detail-section {
  background-color: #f9f9f9;
  padding: 15rpx 20rpx;
  border-radius: 8rpx;
}

/* 信息项目两列布局样式 */
.info-item {
  display: flex;
  flex-direction: column;
}

/* 按钮样式调整 */
.modify-btn {
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modify-btn uni-icons {
  margin-right: 8rpx;
}

/* 数字输入组样式 */
.number-input-group {
  display: flex;
  align-items: center;
  margin: 10rpx 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8rpx;
  overflow: hidden;
  height: 80rpx;
}

.number-btn {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  color: #333;
  font-size: 32rpx;
  font-weight: bold;
  padding: 0;
  margin: 0;
  border: none;
  line-height: 1;
}

.minus-btn {
  border-right: 1px solid #ddd;
}

.plus-btn {
  border-left: 1px solid #ddd;
}

.number-input {
  flex: 1;
  height: 80rpx;
  text-align: center;
  border: none;
  background-color: #fff;
  padding: 0;
  margin: 0;
  min-width: 80rpx;
}

.price-calculation {
  margin-top: 15rpx;
  font-size: 28rpx;
  color: #ff6600;
  text-align: right;
}

/* 确认删除弹窗样式 */
.confirm-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 确保是最高层级 */
}

.confirm-dialog {
  width: 80%;
  max-width: 600rpx;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.confirm-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  text-align: center;
}

.confirm-content {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 30rpx;
  text-align: center;
  padding: 0 20rpx;
}

.confirm-buttons {
  display: flex;
  justify-content: space-between;
}

.confirm-btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 8rpx;
  font-size: 28rpx;
  margin: 0 15rpx;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666;
}

.delete-btn {
  background-color: #ff4444;
  color: #fff;
}
</style>