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
	
	
<!-- 在页面最外层添加 -->
<view v-if="showCustomToast" class="custom-toast">
  <view class="custom-toast-content">
    <uni-icons type="checkmarkempty" size="24" color="#fff"></uni-icons>
    <text>保存成功</text>
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
   <view class="chart-container">
     <qiun-data-charts 
       type="line"
       :chartData="chartData"
       :opts="chartOptions"
       canvasId="lineChart"
       canvas2d
     />
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
        <form>
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
			  @tap="closeRechargeDialog"
            >取消</button>
            <button 
              class="form-button form-button-confirm" 
              formType="submit"
			  @tap="submitCharge"
            >充值</button>
			
			
			
          </view>
        </form>
      </view>
    </view>
<!-- 删除确认弹窗 -->
<view v-if="showDeleteConfirm" class="confirm-mask" @tap="cancelDelete">
  <view class="confirm-dialog" @tap.stop>
    <view class="confirm-title">确认删除</view>
    <view class="confirm-content">确定要删除设备"{{ deviceToDelete?.name }}"吗？设备删除后相关数据将无法恢复（请将现场设备移除后删除，否则设备仍将向服务器发送数据）</view>
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
      <button class="modify-btn" @tap="showEditDeviceDialog">
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
            <text class="info-value">{{ selectedDevice.deviceNumber || '无设备号码' }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">设备名称：</text>
            <text class="info-value">{{ selectedDevice.deviceName || '无设备名称' }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">设备类型：</text>
            <text class="info-value">{{ selectedDevice.type || '无设备类型' }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">所属公司：</text>
            <text class="info-value">{{ selectedDevice.companyName || '无公司名称' }}</text>
          </view>
          <view class="info-item wide-item">
            <text class="info-label">所属站点：</text>
            <text class="info-value">{{ selectedDevice.deviceStation || '无所属站点' }}</text>
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

<!-- 编辑设备信息弹窗 -->
<view v-if="showEditDialog" class="dialog-mask" @tap="closeEditDialog">
  <view class="edit-dialog" @tap.stop>
    <view class="dialog-header">
      <text class="dialog-title">编辑设备信息</text>
      <uni-icons 
        type="closeempty" 
        size="24" 
        color="#999" 
        @tap="closeEditDialog"
      ></uni-icons>
    </view>

    <scroll-view scroll-y class="edit-form">
      <!-- 设备编号 - 不可修改 -->
      <view class="form-group">
        <text class="form-label required">设备编号</text>
        <input 
          class="form-input disabled" 
          type="text" 
          v-model="editForm.deviceNumber" 
          disabled
        />
      </view>

      <!-- 设备名称 - 可修改 -->
      <view class="form-group">
        <text class="form-label required">设备名称</text>
        <input 
          class="form-input" 
          type="text" 
          v-model="editForm.deviceName" 
          placeholder="请输入设备名称" 
        />
      </view>

      <!-- 设备类型 - 不可修改 -->
      <view class="form-group">
        <text class="form-label required">设备类型</text>
        <input 
          class="form-input disabled" 
          type="text" 
          v-model="editForm.type" 
          disabled
        />
      </view>

      <!-- 所属公司 - 有下拉选择 -->
      <view class="form-group">
        <text class="form-label required">所属公司</text>
        <picker 
          class="form-picker" 
          :value="companyIndex" 
          :range="companyList" 
          range-key="name" 
          @change="handleCompanyChange"
        >
          <view class="picker-view">
            {{ editForm.companyName || '请选择公司' }}
            <uni-icons type="arrowdown" size="16" color="#999"></uni-icons>
          </view>
        </picker>
      </view>

      <!-- 所属站点 - 有下拉选择 -->
      <view class="form-group">
        <text class="form-label required">所属站点</text>
        <picker 
          class="form-picker" 
          :value="stationIndex" 
          :range="stationList" 
          range-key="name" 
          @change="handleStationChange"
          :disabled="!editForm.companyName"
        >
          <view class="picker-view">
            {{ editForm.deviceStation || '请选择站点' }}
            <uni-icons type="arrowdown" size="16" color="#999"></uni-icons>
          </view>
        </picker>
      </view>

     <view class="form-group">
       <text class="form-label required">安装日期</text>
       <uni-datetime-picker
         type="date"
         v-model="editForm.installDate"
         @change="handleDateChange"
         return-type="string"
         format="yyyy-MM-dd"
       />
     </view>
      <!-- 数据上传频率 -->
      <view class="form-group">
        <text class="form-label required">数据上传频率</text>
        <view class="number-input-group">
          <button class="number-btn minus-btn" @tap="decreaseUploadTime">-</button>
          <input 
            class="form-input number-input" 
            type="number" 
            v-model.number="editForm.uploadTime" 
            min="1" 
            max="60"
            @input="validateUploadTime"
          />
          <button class="number-btn plus-btn" @tap="increaseUploadTime">+</button>
          <text class="unit-text">分钟/次</text>
        </view>
      </view>

      <!-- 开关状态设置 -->
      <view class="form-group">
        <text class="form-label required">联网状态</text>
        <switch 
          :checked="editForm.onlineState" 
          @change="(e) => editForm.onlineState = e.detail.value"
          color="#1296db"
        />
      </view>

      <view class="form-group">
        <text class="form-label required">开关状态</text>
        <switch 
          :checked="editForm.switchState" 
          @change="(e) => editForm.switchState = e.detail.value"
          color="#1296db"
        />
      </view>

      <view class="form-group">
        <text class="form-label required">停机状态</text>
        <switch 
          :checked="editForm.stopState" 
          @change="(e) => editForm.stopState = e.detail.value"
          color="#1296db"
        />
      </view>

      <view class="form-group">
        <text class="form-label required">开启提醒</text>
        <switch 
          :checked="editForm.alarm" 
          @change="(e) => editForm.alarm = e.detail.value"
          color="#1296db"
        />
      </view>

      <!-- 温度计信息 -->
      <view class="form-group">
        <text class="form-label required">一网回水温度计</text>
        <input 
          class="form-input" 
          type="text" 
          v-model="editForm.temp1In" 
          placeholder="请输入一网回水温度计编号" 
        />
      </view>

      <view class="form-group">
        <text class="form-label required">二网供水温度计</text>
        <input 
          class="form-input" 
          type="text" 
          v-model="editForm.temp2Out" 
          placeholder="请输入二网供水温度计编号" 
        />
      </view>
    </scroll-view>
    
    <!-- 底部按钮 -->
    <view class="dialog-footer">
      <button class="footer-btn cancel-btn" @tap="closeEditDialog">取消</button>
      <button class="footer-btn confirm-btn" @tap="saveDeviceInfo">保存</button>
    </view>
  </view>
</view>

    <!-- 加载提示 -->
    <view v-if="pagination.loading" class="loading-mask">
      <uni-load-more status="loading" />
    </view>
  </view>
</template>

<script>
import { getStationList,getStationDevices,getDetailDevices,getDeviceInstallInfo, chargeDevice, charge, updateDeviceInfo} from '@/utils/api';


export default {
  data() {
    return {
		
		 showCustomToast: false,
		 showEditDialog: false,
		    editForm: {
		      deviceNumber: '',
		      deviceName: '',
		      type: '预付费', // 默认值
		      companyName: '',
		      deviceStation: '',
		      installDate: '',
		      uploadTime: 5, // 默认值
		      onlineState: false,
		      switchState: false,
		      stopState: false,
		      alarm: false,
		      temp1In: '',
		      temp2Out: ''
		    },
		    companyList: [],
		    companyIndex: 0,
		    stationList: [],
		    stationIndex: 0,

		 showDeleteConfirm: false,
		    deviceToDelete: null,
		rechargeForm: {
		      deviceCode: '',
		      days: 1  // 默认值
		    },
		    unitPrice: 10 ,
	chartData:{
	  categories: [],
	  series: [
	      {
	        name: '温差',
	        data: [],
	        color: '#5470c6',
	        // 关键修改：禁用数据点标签
	        point: {
	          show: false  // 关闭数值标签显示
	        }
	      }
	    ]
	},
	// 图表配置项
	chartOptions :{
	  padding: [15, 0, 0, 15], // 上右下左内边距
	  backgroundColor: '#ffffff', // 明确设置背景色
	  extra: {
	    line: {
	      type: 'curve',    // 平滑曲线类型
	      width: 4,         // 线宽
	      activePoint: true ,// 启用激活点样式
		        onTop: true,    // 确保线在顶部
		        connectNulls: true  ,// 连接空值
		    point: { show: false }   // 同时隐藏数据点标记
		 
	    }
	  },
	   dataLabel: false,
	   point:false,
	  legend: {
	    show: true,
	    position: 'top',
	    float: 'center'     // 图例居中显示
	  },
	  xAxis: {
	    disableGrid: true,
		labelCount:4,
		fontSize:10,
	    axisLabel: {
	      rotate: 150        // 刻度标签旋转角度
	    }
	  },
	  yAxis: {
	    gridType: 'dash',   // 虚线网格
	    dashLength: 4,      // 虚线长度
	    splitNumber: 5,     // 网格分割段数
	    data: [
	      { min: -5,
		   max:5},       // 明确Y轴范围
	    ]
	  }
	},
		showEditDialog: false,
		    companyList: [], // 公司列表
		    companyIndex: 0,
		    stationList: [], // 站点列表
		    stationIndex: 0,
		    editForm: {
		      deviceNumber: '',
		      deviceName: '',
		      type: '',
		      companyName: '',
		      deviceStation: '',
		      installDate: '',
		      uploadTime: 5,
		      onlineState: true,
		      switchState: true,
		      stopState: false,
		      alarm: false,
		      temp1In: '',
		      temp2Out: ''
		    },

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
	  originalAllData: [], // 保存原始完整数据
	      filteredData: [], // 经过搜索过滤后的数据
	      isSearchActive: false, // 标记是否处于搜索状态
      allData: [],
      backendPage: 1,
      hasMore: true,//、
	  // 图表初始化对象
	        tempChartInit: {
	          lazyLoad: true // 延迟加载
	        }
	  
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.size);
    }
  },
  
    mounted() {
       this.$nextTick(() => {
           setTimeout(() => {
             // 如果需要可以在这里更新图表数据
           }, 300);
         });
       
    },

  methods: {
	  
	   // 显示编辑设备信息弹窗
	    showEditDeviceDialog() {
	      // 初始化表单数据
	      this.editForm = {
	        deviceNumber: this.selectedDevice.deviceNumber || '',
	        deviceName: this.selectedDevice.deviceName || '',
	        type: this.selectedDevice.type || '预付费',
	        companyName: this.selectedDevice.companyName || '',
	        deviceStation: this.selectedDevice.deviceStation || '',
	        installDate: this.selectedDevice.installDate || this.formatDate(new Date()),
	        uploadTime: this.selectedDevice.uploadTime || 5,
	        onlineState: this.selectedDevice.onlineState || false,
	        switchState: this.selectedDevice.switchState || false,
	        stopState: this.selectedDevice.stopState || false,
	        alarm: this.selectedDevice.alarm || false,
	        temp1In: this.selectedDevice.temp1In || '',
	        temp2Out: this.selectedDevice.temp2Out || ''
	      };
	      
	      // 加载公司和站点数据
	      this.loadCompanyList();
	      this.loadDeviceData();
	      
	      this.showEditDialog = true;
	    },
	    
	    // 关闭编辑弹窗
	    closeEditDialog() {
	      this.showEditDialog = false;
	    },
	    
	    // 格式化日期
	    formatDate(date) {
	      const year = date.getFullYear();
	      const month = String(date.getMonth() + 1).padStart(2, '0');
	      const day = String(date.getDate()).padStart(2, '0');
	      return `${year}-${month}-${day}`;
	    },
	    
	    // 加载公司列表
	    async loadCompanyList() {
	      try {
	        // 假设有一个获取公司列表的API
	        const res = await getCompanyList();
	        if (res?.code === 200 && res.data) {
	          this.companyList = res.data;
	          // 找到当前选中的公司索引
	          const index = this.companyList.findIndex(item => 
	            item.name === this.editForm.companyName
	          );
	          this.companyIndex = index > -1 ? index : 0;
	        }
	      } catch (error) {
	        console.error('加载公司列表失败:', error);
	      }
	    },
	    
	    
	    
	    // 处理公司选择变化
	    handleCompanyChange(e) {
	      this.companyIndex = e.detail.value;
	      this.editForm.companyName = this.companyList[this.companyIndex].name;
	    },
	    
	    // 处理站点选择变化
	    handleStationChange(e) {
	      this.stationIndex = e.detail.value;
	      this.editForm.deviceStation = this.stationList[this.stationIndex].name;
	    },
	    
	    // 处理日期选择变化
	    handleDateChange(e) {
	      this.editForm.installDate = e.detail.value;
	    },
	    
	    // 减少上传时间间隔
	    decreaseUploadTime() {
	      if (this.editForm.uploadTime > 1) {
	        this.editForm.uploadTime--;
	      }
	    },
	    
	    // 增加上传时间间隔
	    increaseUploadTime() {
	      if (this.editForm.uploadTime < 60) {
	        this.editForm.uploadTime++;
	      }
	    },
	    
	    // 验证上传时间间隔
	    validateUploadTime() {
	      let value = parseInt(this.editForm.uploadTime);
	      if (isNaN(value) || value < 1) {
	        this.editForm.uploadTime = 1;
	      } else if (value > 60) {
	        this.editForm.uploadTime = 60;
	      } else {
	        this.editForm.uploadTime = value;
	      }
	    },
	    
	    // 保存设备信息
	 // list.vue 中的 saveDeviceInfo 方法
	 async saveDeviceInfo() {
	   try {
	     // 表单验证
	     if (!this.editForm.deviceNumber) {
	       uni.showToast({
	         title: '请输入设备编号',
	         icon: 'none'
	       });
	       return;
	     }
	     
	     if (!this.editForm.deviceName) {
	       uni.showToast({
	         title: '请输入设备名称',
	         icon: 'none'
	       });
	       return;
	     }
	     
	     // 更多验证可以根据需要添加...
	     
	     uni.showLoading({
	       title: '保存中...'
	     });
	     
	     // 调用API函数更新设备信息
	     const res = await updateDeviceInfo(this.editForm);
	     
	     if (res.code === 200) {
			 console.log("hello")
			 
			 // 在保存成功时
			 this.showCustomToast = true;
			 setTimeout(() => {
			   this.showCustomToast = false;
			 }, 3000);
	    // 确保Toast显示在最上层
	    uni.showToast({
	      title: '保存成功',
	      icon: 'success',
	      duration: 3000,
	      position: 'top', // 显示在顶部
	      mask: true // 添加遮罩层，防止用户点击
	    });
	         
	         
	         
	       
	       // 更新当前显示的设备信息
	       this.selectedDevice = {
	         ...this.selectedDevice,
	         ...this.editForm
	       };
	       
	       // 关闭编辑弹窗
	       this.closeEditDialog();
	       
	       // 如果需要，刷新设备列表
	
	     } else {
	       uni.showToast({
	         title: res.msg || '保存失败',
	         icon: 'none'
	       });
	     }
	   } catch (error) {
	     console.error('保存设备信息失败:', error);
	     uni.showToast({
	       title: '网络异常，请稍后重试',
	       icon: 'none'
	     });
	   } finally {
	     uni.hideLoading();
	   }
	 },
		
		
		  handleDateChange(value) {
		    this.editForm.installDate = value;
		    console.log('选择的日期:', value);
		  },
		
		
		
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
	      
		
	   // 在methods中添加或修改handleRecharge方法
	 // 修改handleRecharge方法，移除e.preventDefault()
	 async handleRecharge(e) {
	   try {
	     // 移除 e.preventDefault() 这一行
	     // uniapp表单事件不支持这个方法
	     
	     // 表单验证
	     if (!this.rechargeForm.days || this.rechargeForm.days < 1) {
	       uni.showToast({
	         title: '请输入有效的充值天数',
	         icon: 'none'
	       });
	       return;
	     }
	     
	     // 显示加载提示
	     uni.showLoading({
	       title: '充值中...'
	     });
	     
	     // 准备请求参数
	     const params = {
	       deviceNumber: this.selectedDevice.code, // 设备编号
	       days: this.rechargeForm.days // 充值天数
	     };
	     
	     // 调用充值API
	     const res = await chargeDevice(params);
	     
	     // 处理响应
	     if (res?.code === 200) {
	       // 充值成功
	       uni.showToast({
	         title: '充值成功',
	         icon: 'success'
	       });
	       
	       // 关闭充值弹窗
	       this.closeRechargeDialog();
	       
	       // 如果需要，可以刷新设备数据
	       if (this.selectedDevice) {
	         // 重新获取设备详情，更新剩余时间等信息
	         this.showDeviceDetail(this.selectedDevice);
	       }
	     } else {
	       // 充值失败
	       uni.showToast({
	         title: res?.msg || '充值失败',
	         icon: 'none'
	       });
	     }
	   } catch (error) {
	     console.error('设备充值失败:', error);
	     uni.showToast({
	       title: '设备充值异常，请稍后重试',
	       icon: 'none'
	     });
	   } finally {
	     // 隐藏加载提示
	     uni.hideLoading();
	   }
	 },
	   
	   // 增加表单验证方法
	   validateDays() {
	     let days = parseInt(this.rechargeForm.days);
	     if (isNaN(days) || days < 1) {
	       this.rechargeForm.days = 1;
	     } else {
	       this.rechargeForm.days = days;
	     }
	   },
	   
	   // 增加递增/递减天数的方法
	   increaseDays() {
	     this.rechargeForm.days = parseInt(this.rechargeForm.days || 1) + 1;
	   },
	   
	   decreaseDays() {
	     if (this.rechargeForm.days > 1) {
	       this.rechargeForm.days = parseInt(this.rechargeForm.days) - 1;
	     }
	   },
		
	
	    
	    
    async loadDeviceData() {
        if (this.pagination.loading || !this.hasMore) return;
        
        this.pagination.loading = true;
        try {
          const res = await getStationList();
    
          if (res?.code === 200 && res.data) {
            console.log(res);
            const data = res.data;
            this.allData = [...this.allData, ...data.records];
            this.originalAllData = [...this.allData]; // 保存一份原始数据
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
		console.log(res)
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
async submitCharge() {
  try {
    // 显示确认对话框
    const [confirmError, confirmResult] = await uni.showModal({
      title: '充值确认',
      content: `确定要为设备【${this.selectedDevice.name}】充值 ${this.rechargeForm.days} 天吗？`,
      confirmText: '确认充值',
      cancelText: '取消',
      confirmColor: '#ff0000',
      showCancel: true
    }).then(res => [null, res]).catch(err => [err]);

    // 处理确认结果
    if (confirmResult?.cancel) {
      return;
    }

    if (confirmError) {
      throw new Error('确认对话框加载失败');
    }

    // 执行充值请求
    const res = await charge({
      'deviceAmount': this.rechargeForm.days,
      'deviceName': this.selectedDevice.name,
      'deviceNumber': this.rechargeForm.deviceCode
    });

    console.log('充值响应:', res);
    
    if (res?.code === 200) {
      uni.showToast({ title: '充值成功' });
      // 这里可以添加成功后的其他逻辑（如刷新页面、重置表单等）
    } else {
      throw new Error(res?.message || '未知错误');
    }

  } catch (error) {
    console.error('充值流程错误:', error);
    uni.showToast({
      title: error?.message || '充值失败',
      icon: 'none'
    });
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

// 修改showPayDetail方法
showPayDetail(device) {
  this.selectedDevice = device;
  // 初始化充值表单
  this.rechargeForm = {
    deviceCode: device.code,  // 设备编号
    days: 1                  // 默认充值1天
  };
  this.showRechargeDialog=true;
},

 async showDeviceDetail(device) {
      this.selectedDevice = device;
      this.showDeviceDetailDialog = true;
      
      try {
        console.log(device);
        const res = await getDetailDevices(device.code);
		console.log(res.data)
        console.log(res.data.tempDiffHistory.length)
		let xarr=[]
		let yarr=[]
		for(let i=0;i<res.data.tempDiffHistory.length;i+=20){
			xarr.push(res.data.tempDiffHistory[i].addTime.slice(0,10))
			yarr.push(res.data.tempDiffHistory[i].diff)
		}
		// res.data.tempDiffHistory.forEach(item=>{
		// 	xarr.push(item.addTime.slice(0,10))
		// 	yarr.push(item.diff)
		// })
		this.chartData.categories=xarr
		this.chartData.series[0].data=yarr
		console.log(this.chartData.series[0].data)
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
        // 如果搜索关键词为空，显示所有数据
        if (!this.searchKey.trim()) {
          this.clearSearch();
          return;
        }
    
        this.isSearchActive = true;
        
        // 过滤数据
        this.filteredData = this.originalAllData.filter(item => {
          // 可以根据需要搜索多个字段
          const stationNameMatch = item.stationName?.toLowerCase().includes(this.searchKey.toLowerCase());
          const companyMatch = item.company?.toLowerCase().includes(this.searchKey.toLowerCase());
          const addressMatch = item.address?.toLowerCase().includes(this.searchKey.toLowerCase());
          const personMatch = item.person?.toLowerCase().includes(this.searchKey.toLowerCase());
          
          // 任一字段匹配即可
          return stationNameMatch || companyMatch || addressMatch || personMatch;
        });
        
        // 更新分页信息
        this.pagination.total = this.filteredData.length;
        this.pagination.current = 1; // 重置到第一页
        
        // 更新显示的数据
        this.updateCurrentPageData();
        
        // 显示搜索结果数量
        uni.showToast({
          title: `找到 ${this.filteredData.length} 个匹配结果`,
          icon: 'none'
        });
      },


	// 清除搜索
	  clearSearch() {
	    this.searchKey = '';
	    this.isSearchActive = false;
	    this.filteredData = [];
	    
	    // 恢复原始数据
	    this.allData = [...this.originalAllData];
	    this.pagination.total = this.originalAllData.length;
	    this.pagination.current = 1; // 重置到第一页
	    
	    // 更新显示的数据
	    this.updateCurrentPageData();
	  },
	  
    updateCurrentPageData() {
        const start = (this.pagination.current - 1) * this.pagination.size;
        const end = start + this.pagination.size;
        
        // 根据是否在搜索状态选择数据源
        const sourceData = this.isSearchActive ? this.filteredData : this.allData;
        
        // 获取当前页的数据
        const currentPageData = sourceData.slice(start, end);
        
        // 处理并更新显示的数据
        this.deviceList = this.processStationData(currentPageData);
      },
      
      // 页面切换
      changePage(step) {
        const newPage = this.pagination.current + step;
        // 计算总页数
        const totalPages = Math.ceil(
          (this.isSearchActive ? this.filteredData.length : this.allData.length) / 
          this.pagination.size
        );
        
        if (newPage > 0 && newPage <= totalPages) {
          this.pagination.current = newPage;
          this.updateCurrentPageData();
        }
      },
      
      // 跳转到指定页
      handleJump() {
        if (!this.jumpPage || isNaN(this.jumpPage)) return;
        
        // 计算总页数
        const totalPages = Math.ceil(
          (this.isSearchActive ? this.filteredData.length : this.allData.length) / 
          this.pagination.size
        );
        
        const targetPage = Math.max(1, 
          Math.min(parseInt(this.jumpPage), totalPages)
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
  padding: 2.625rem 16rpx;
  background: white;
  /* margin: 20rpx 10rpx 120rpx 10rpx; *//* 增加底部边距，避开导航栏 */
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  /* position: relative; */ /* 改为相对定位，不再固定在底部 */
/*  z-index: 100; */
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
  /* z-index: 999; */
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
  z-index: 600;
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

/* 调整输入框宽度 */
.form-input, .form-picker, .picker-view {
   /* 从100%减小到70%，您可以根据需要调整这个值 */
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 20rpx;
  border: 1rpx solid #ddd;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #f8f8f8;
}

/* 修改表单组布局，使输入框对齐 */
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

/* 调整标签宽度，保持一致性 */
.form-label {
  width: 30%; /* 设置固定宽度 */
  font-size: 28rpx;
  color: #333;
}

/* 确保数字输入组的样式也保持一致 */


.number-btn {
  width: 60rpx;
  height: 60rpx;
  line-height: 56rpx;
  text-align: center;
  border: 1rpx solid #ddd;
  border-radius: 10rpx;
  background-color: #f8f8f8;
}

.unit-text {
  margin-left: 10rpx;
  font-size: 26rpx;
  color: #666;
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
  padding: 0.46875rem 1.625rem;
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
  width: 60%;
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
  /* z-index: 9999; /* 确保是最高层级 */
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
.chart-container {
  width: 100%;
  height:auto; /* 使用视口高度单位 */
  min-height: 400rpx; /* 最小高度保障 */
  background-color: #fff; /* 修复背景色错误 */
  border-radius: 16rpx;  /* 添加圆角 */
  box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.05); /* 添加微妙阴影 */
  overflow: hidden;      /* 防止内容溢出 */
  padding: 8rpx;         /* 增加内边距 */
}

/* 编辑设备信息弹窗样式改进 */
.edit-dialog {
  position: relative;
  width: 90%;
  max-width: 700rpx;
  max-height: 80vh;
  background: #fff;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
}

.edit-form {
  flex: 1;
  padding: 20rpx 30rpx;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
}

/* 修改标签区域的宽度和对齐方式 */
.form-label {
  width: 160rpx; /* 减小标签宽度 */
  font-size: 28rpx;
  color: #333;
  text-align: left; /* 改为左对齐 */
  margin-right: 20rpx;
  flex-shrink: 0; /* 防止缩小 */
}

.required::before {
  content: '*';
  color: #f56c6c;
  margin-right: 4rpx;
}

/* 调整输入框样式 */




.picker-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70rpx;
  padding: 0 20rpx;
  border: 1rpx solid #ebeef5;
  border-radius: 8rpx;
  background-color: #f8f9fa;
  font-size: 28rpx;
}



.number-btn {
  width: 60rpx; /* 减小按钮宽度 */
  height: 70rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  border: 1rpx solid #ebeef5;
  font-size: 32rpx;
  padding: 0;
  margin: 0;
}

.minus-btn {
  border-radius: 8rpx 0 0 8rpx;
}

.plus-btn {
  border-radius: 0 8rpx 8rpx 0;
}

.number-input {
  flex: 0 0 80rpx; /* 减小输入框宽度 */
  text-align: center;
  border-radius: 0;
  border-left: none;
  border-right: none;
}

.unit-text {
  margin-left: 15rpx;
  font-size: 26rpx;
  color: #666;
}

/* 简化底部按钮组的样式 */
.dialog-footer {
  display: flex;
  padding: 20rpx;
  border-top: 1rpx solid #ebeef5;
}

.footer-btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 8rpx;
  font-size: 28rpx;
  margin: 0 10rpx;
}

.cancel-btn {
  background: #f8f9fa;
  color: #666;
  border: 1rpx solid #dcdfe6;
}

.confirm-btn {
  background: #1296db;
  color: #fff;
}

.custom-toast {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10%;
  z-index: 99999; /* 确保这个值足够大 */
  pointer-events: none; /* 允许点击穿透 */
}

.custom-toast-content {
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 8px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.picker-view-date {
  width: 100%;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 10rpx;
}

.calendar-icon {
  font-size: 32rpx;
}
</style>