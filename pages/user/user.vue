<template>
  <view class="container">
<<<<<<< HEAD
    <!-- 标题区域 -->
    <view class="header">
      <text class="title">我的换热站</text>
      <text class="count">共计{{ pagination.total }}个换热站</text>
=======
	  
	  <view class="float-btn" @click="showAddModal">
	        <uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
	      </view>
		
    <!-- 标题 -->
    <view class="header">
      <text class="title">企业列表</text>
>>>>>>> d322fe5ca631249fd8aefcda11bd7fc60ea67653
    </view>

    <!-- 搜索区域 -->
    <view class="search-box">
      <uni-search-bar 
<<<<<<< HEAD
        placeholder="输入换热站名称搜索" 
        @confirm="handleSearch"
        v-model="searchKey"
      />
=======
        placeholder="请输入企业名称关键字" 
        radius="100"
		v-model="searchKeyword"
        @confirm="handleSearch"
		@cancel="handleCancel"
      ></uni-search-bar>
>>>>>>> d322fe5ca631249fd8aefcda11bd7fc60ea67653
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
        
<<<<<<< HEAD
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
=======
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
		  
		   <view class="action-buttons">
		        <button class="btn heat-station" @click="viewHeatStations">查看换热站</button>
		        <button class="btn edit" @click="editCompany">修改信息</button>
		        <button class="btn delete" @click="deletecompany">删除公司</button>
			</view>
        </view>
      </view>
    </uni-popup>
	<uni-popup ref="addPopup" type="center">
	      <view class="add-modal">
	        <view class="modal-header">
	          <text class="title">添加企业</text>
	          <uni-icons 
	            type="closeempty" 
	            size="20" 
	            color="#666"
	            @click="closeAddModal"
	          ></uni-icons>
	        </view>
	
	        <view class="form-item">
	          <text class="label">* 企业名称</text>
	          <uni-easyinput 
	            v-model="newCompany.name" 
	            placeholder="请输入企业名称"
	          ></uni-easyinput>
	        </view>
	
	        <view class="form-item">
	          <text class="label">* 联系电话</text>
	          <uni-easyinput 
	            v-model="newCompany.phone" 
	            placeholder="请输入联系电话"
	            type="number"
	          ></uni-easyinput>
	        </view>
	
	        <view class="form-item">
	          <text class="label">* 负责人</text>
	          <uni-easyinput 
	            v-model="newCompany.userName" 
	            placeholder="请输入负责人姓名"
	          ></uni-easyinput>
	        </view>
	
	        <view class="form-item">
				<text class="label">* 管理员</text>
	              <uni-data-select
	                v-model="newCompany.admin"
	                placeholder="选择管理员"
	                :localdata="filteredAdmins"
	                :clear="true"
	              ></uni-data-select>
	            </view>
	        
	            <!-- 用户选择 -->
	            <view class="form-item">
					<text class="label">* 用户</text>
	              <uni-data-select
	                v-model="newCompany.user"
	                placeholder="选择用户"
	                :localdata="filteredusers"
	                :clear="true"
	              ></uni-data-select>
	            </view>
	        
	            <!-- 销售选择 -->
	            <view class="form-item">
					<text class="label">* 销售</text>
	              <uni-data-select
	                v-model="newCompany.sale"
	                placeholder="选择销售"
	                :localdata="filteredSales"
	                :clear="true"
	              ></uni-data-select>
	            </view>
	
	        <view class="modal-footer">
	          <button class="btn cancel" @click="closeAddModal">取消</button>
	          <button class="btn confirm" @click="handleSubmit">确定</button>
	        </view>
	      </view>
	    </uni-popup>
		<!-- 新增：编辑企业弹窗 -->
		<uni-popup ref="editPopup" type="center">
		  <view class="add-modal">
		    <view class="modal-header">
		      <text class="title">修改企业信息</text>
		      <uni-icons 
		        type="closeempty" 
		        size="20" 
		        color="#666"
		        @click="closeEditModal"
		      ></uni-icons>
		    </view>
			
			<view class="form-item">
			  <text class="label">* 企业名称</text>
			  <uni-easyinput 
			    v-model="editCompanyData.name" 
			    placeholder="请输入企业名称"
				:disabled=true
			  ></uni-easyinput>
			</view>
			
		    <view class="form-item">
		      <text class="label">* 联系电话</text>
		      <uni-easyinput 
		        v-model="editCompanyData.phone" 
		        placeholder="请输入联系电话"
		        type="number"
		      ></uni-easyinput>
		    </view>
		    	
		    <view class="form-item">
		      <text class="label">* 负责人</text>
		      <uni-easyinput 
		        v-model="editCompanyData.userName" 
		        placeholder="请输入负责人姓名"
		      ></uni-easyinput>
		    </view>
		    	
		    <view class="form-item">
		    	<text class="label">* 管理员</text>
		          <uni-data-select
		            v-model="editCompanyData.admin"
		            placeholder="选择管理员"
		            :localdata="filteredAdmins"
		            :clear="true"
		          ></uni-data-select>
		        </view>
		    
		        <!-- 用户选择 -->
		        <view class="form-item">
		    		<text class="label">* 用户</text>
		          <uni-data-select
		            v-model="editCompanyData.user"
		            placeholder="选择用户"
		            :localdata="filteredusers"
		            :clear="true"
		          ></uni-data-select>
		        </view>
		    
		        <!-- 销售选择 -->
		        <view class="form-item">
		    		<text class="label">* 销售</text>
		          <uni-data-select
		            v-model="editCompanyData.sale"
		            placeholder="选择销售"
		            :localdata="filteredSales"
		            :clear="true"
		          ></uni-data-select>
		        </view>
		
		    <view class="modal-footer">
		      <button class="btn cancel" @click="closeEditModal">取消</button>
		      <button class="btn confirm" @click="handleUpdateSubmit">提交修改</button>
		    </view>
		  </view>
		</uni-popup>
  </view>
</template>

<script setup>
import UniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue';
import { ref, computed, onMounted } from 'vue';
import UniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue';
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import UniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';
import { fetchCompanyList, fetchStationList } from '../../utils/api';
import { fetchUserList } from '../../utils/api';
import { addCompany } from '../../utils/api';
import { deleteCompany } from '../../utils/api';
import { updateCompany } from '../../utils/api';
import { saveDevice } from '../../store/user';
>>>>>>> d322fe5ca631249fd8aefcda11bd7fc60ea67653

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

<<<<<<< HEAD
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
=======
async function deletecompany() {
  // 弹出确认对话框
  const { confirm } = await uni.showModal({
    title: '删除确认',
    content: `确定要删除企业“${currentUser.value.name}”吗？`,
    confirmText: '确定',
    cancelText: '取消'
  });

  // 用户点击取消，不执行操作
  if (!confirm) return;

  try {
    // 调用删除接口
    const res = await deleteCompany(currentUser.value.name); // 建议使用唯一标识（如ID）而非名称
    if (res.code === 200) {
      // 删除成功提示
      uni.showToast({
        title: '删除成功',
        icon: 'success'
      });
      
      const listRes = await fetchCompanyList();
      users.value = listRes.data?.records?.map((item, index) => ({
        id: String(index),
        name: item.companyName || '未知企业',
        phone: item.phone,
        userName: item.userName,
        admin: item.admin,
        user: item.user,
        sale: item.sale
      })) || [];
      
      // 关闭详情弹窗（可选）
      closeDetailModal();
    } else {
      // 接口返回错误
      uni.showToast({
        title: res.message || '删除失败',
        icon: 'none'
      });
    }
  } catch (error) {
    // 网络或系统错误
    console.error('删除企业失败:', error);
    uni.showToast({
      title: '删除失败，请重试',
      icon: 'none'
    });
  }
}
const viewHeatStations=()=>{
	saveDevice(currentUser.value.name)
	uni.navigateTo({
	  url: `/pages/company-stationList/company-stationList`
	})
}
// 页面加载时获取数据
onMounted(async () => {
  try {
    const res = await fetchCompanyList();
	console.log(res)
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

const handleCancel = () => {
  searchKeyword.value = '';  // 清空搜索关键词
};

// 显示详情弹窗
const showDetailModal = (user) => {
  currentUser.value = user;
  detailPopup.value.open();
};

// 关闭详情弹窗
const closeDetailModal = () => {
	detailPopup.value.close(() => {
	    // 在弹窗完全关闭后清空数据
	    currentUser.value = null;
	  });
>>>>>>> d322fe5ca631249fd8aefcda11bd7fc60ea67653
};
// 新增响应式数据
const addPopup = ref(null);
const newCompany = ref({
  name: '',
  phone: '',
  userName: '',
  admin: '',
  user: '',
  sale: ''
});

// 关闭添加弹窗
const closeAddModal = () => {
	addPopup.value.close(() => {
	    newCompany.value = {
			name: '',
			phone: '',
			userName: '',
			admin: '',
			user: '',
			sale: ''
		  };
	  });
  
};

// 提交表单
const handleSubmit = async () => {
	console.log(newCompany.value)
  if (!newCompany.value.name || !newCompany.value.phone || !newCompany.value.userName || !newCompany.value.admin || !newCompany.value.user || !newCompany.value.sale) {
    uni.showToast({ title: '企业信息不完整', icon: 'none' });
    return;
  }
  
  try {
	  // console.log(newCompany.value)
    let data=await addCompany(newCompany.value);
	console.log(data)
    uni.showToast({ title: '添加成功' });
    closeAddModal();
    // 添加成功后刷新列表
    const res = await fetchCompanyList();
	console.log(res.data)
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
    uni.showToast({ title: '添加失败', icon: 'none' });
	console.log(error)
	console.log(55)
  }
};
// 新增数据
const allUsers = ref([]);

// 获取用户数据
const loadUsers = async () => {
  try {
    const res = await fetchUserList();
    allUsers.value = res.data?.records || [];
  } catch (error) {
    uni.showToast({ title: '用户数据加载失败', icon: 'none' });
  }
};

// 过滤后的管理员列表
const filteredAdmins = computed(() => {
  return filterUsers('admin');
});

// 过滤后的普通用户列表
const filteredusers = computed(() => {
  return filterUsers('user');
});

// 过滤后的销售列表
const filteredSales = computed(() => {
  return filterUsers('sale');
});

// 通用过滤方法
const filterUsers = (role) => {
  return allUsers.value
      .filter(user => user.authority_id === role)      // 按角色过滤
      .map(user => ({
        value: user.userName,     // 保留唯一标识
        text: user.userName        // 直接使用已映射的 userName
      }));
}

// 在弹窗打开时加载用户数据
const showAddModal = async () => {
  if (allUsers.value.length === 0) {
    await loadUsers();
  }
  addPopup.value.open();
};

// 新增响应式数据
const editPopup = ref(null);
const editCompanyData = ref({
  id: '',       // 新增ID字段
  name: '',
  phone: '',
  userName: '',
  admin: '',
  user: '',
  sale: ''
});

// 修改信息按钮点击事件
const editCompany = async () => {
	if (allUsers.value.length === 0) {
	  await loadUsers();
	}
  // 填充当前企业数据到编辑表单
  editCompanyData.value = {  // 假设currentUser中有唯一ID
    name: currentUser.value.name,
    phone: currentUser.value.phone,
    userName: currentUser.value.userName,
    admin: currentUser.value.admin,
    user: currentUser.value.user,
    sale: currentUser.value.sale
  };
  editPopup.value.open();
};

// 关闭编辑弹窗
const closeEditModal = () => {
	editPopup.value.close(() => {
	    editCompanyData.value = {
	      id: '',
	      name: '',
	      phone: '',
	      userName: '',
	      admin: '',
	      user: '',
	      sale: ''
	    };
	  });
};

// 提交修改
const handleUpdateSubmit = async () => {
  // 验证必填字段
  if (!editCompanyData.value.name || 
      !editCompanyData.value.phone || 
      !editCompanyData.value.userName || 
      !editCompanyData.value.admin || 
      !editCompanyData.value.user || 
      !editCompanyData.value.sale) {
    uni.showToast({ title: '企业信息不完整', icon: 'none' });
    return;
  }

  // 二次确认
  const { confirm } = await uni.showModal({
    title: '确认修改',
    content: `确定要修改 ${editCompanyData.value.name} 的企业信息吗？`,
    confirmText: '确定修改',
    cancelText: '取消'
  });

  if (!confirm) return;

  try {
    // 调用更新接口
    const res = await updateCompany(editCompanyData.value);
    if (res.code === 200) {
      uni.showToast({ title: '修改成功', icon: 'success' });
	  currentUser.value = {
	    name: editCompanyData.value.name,
	    phone: editCompanyData.value.phone,
	    userName: editCompanyData.value.userName,
	    admin: editCompanyData.value.admin,
	    user: editCompanyData.value.user,
	    sale: editCompanyData.value.sale
	  };
      closeEditModal();
      
	  console.log(currentUser.value.phone)
      // 刷新列表
      const listRes = await fetchCompanyList();
      users.value = listRes.data?.records?.map((item, index) => ({
        id: String(index),
        name: item.companyName || '未知企业',
        phone: item.phone,
        userName: item.userName,
        admin: item.admin,
        user: item.user,
        sale: item.sale
      })) || [];
    } else {
      uni.showToast({ title: res.message || '修改失败', icon: 'none' });
    }
  } catch (error) {
    console.error('修改失败:', error);
    uni.showToast({ title: '修改失败，请重试', icon: 'none' });
  }
};

</script>

<<<<<<< HEAD
<style scoped>
=======
<style lang="scss" scoped>
	/* 新增悬浮按钮样式 */
	.float-btn {
	  position: fixed;
	  right: 40rpx;
	  bottom: 20rpx;
	  width: 100rpx;
	  height: 100rpx;
	  background: #007AFF;
	  border-radius: 50%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.2);
	  z-index: 999;
	}
	
	.add-modal {
	  width: 600rpx;
	  background: #fff;
	  border-radius: 16rpx;
	  padding: 30rpx;
	
	  .modal-header {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    margin-bottom: 30rpx;
	
	    .title {
	      font-size: 36rpx;
	      font-weight: bold;
	      color: #333;
	    }
	  }
	
	  .form-item {
	    margin-bottom: 0rpx;
		height: 80%;
	    .label {
	      font-size: 16rpx;
	      color: #666;
	      margin-bottom: 0rpx;
	      display: block;
	    }
	  }
	
	  .modal-footer {
	    margin-top: 20rpx;
	    display: flex;
	    justify-content: flex-end;
	    gap: 20rpx;
	
	    .btn {
	      padding: 8rpx 16rpx;
	      border-radius: 8rpx;
		font-size: 20rpx;
	      &.cancel {
			  padding: 10rpx 30rpx;
	        background: #f0f0f0;
	        color: #666;
	      }
	
	      &.confirm {
			padding: 10rpx 30rpx;
	        background: #007AFF;
	        color: #fff;
	      }
	    }
	  }
	}
>>>>>>> d322fe5ca631249fd8aefcda11bd7fc60ea67653
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

<<<<<<< HEAD
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
=======
/* 弹窗样式 */
.modal-content {
  width: 600rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  
  .action-buttons {
      margin-top: 40rpx;
      display: flex;
      gap: 10rpx;
      justify-content: space-between;
  
      .btn {
        flex: 1;
        padding: 10rpx;
        border-radius: 8rpx;
        font-size: 20rpx;
        
        &.heat-station {
          background: #4CAF50;
          color: white;
        }
        
        &.edit {
          background: #FF9800;
          color: white;
        }
        
        &.delete {
          background: #F44336;
          color: white;
        }
      }
    }
	
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
>>>>>>> d322fe5ca631249fd8aefcda11bd7fc60ea67653
  }
  .jump-input {
    width: 80rpx;
  }
  .jump-btn {
    padding: 0 20rpx;
  }
}
</style> 