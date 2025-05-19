<template>
  <view class="container">
	  
	  <view class="float-btn" @click="showAddModal">
	        <uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
	      </view>
		
    <!-- 标题 -->
    <view class="header">
      <text class="title">企业列表</text>
    </view>

    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar 
        placeholder="请输入企业名称关键字" 
        radius="100"
		v-model="searchKeyword"
        @confirm="handleSearch"
		@cancel="handleCancel"
      ></uni-search-bar>
    </view>

    <!-- 用户列表 -->
    <view class="user-list" scroll-y>
      <view 
        v-for="(user, index) in filteredUsers" 
        :key="index" 
        class="user-item"
        @click="showDetailModal(user)"
      >
        <view class="user-info">
          <text class="user-name">{{ user.name }}</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
      </view>
    </view>

    <!-- 详情弹窗 -->
    <uni-popup ref="detailPopup" type="center">
      <view class="modal-content">
        <view class="modal-header">
          <text class="modal-title">{{ currentUser?.name }}</text>
          <uni-icons 
            type="closeempty" 
            size="20" 
            color="#666"
            @click="closeDetailModal"
          ></uni-icons>
        </view>
        
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
import { fetchCompanyList } from '../../utils/api';
import { fetchUserList } from '../../utils/api';
import { addCompany } from '../../utils/api';
import { deleteCompany } from '../../utils/api';
import { updateCompany } from '../../utils/api';

// 用户数据
const users = ref([]);
const currentUser = ref(null);
const searchKeyword = ref('');
const detailPopup = ref(null);

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
  margin-bottom: 30rpx;
}

.user-list {
  height: calc(100vh - 200rpx);
  background-color: #fff;
  border-radius: 12rpx;
  
  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .user-info {
      flex: 1;
      
      .user-name {
        display: block;
        font-size: 32rpx;
        color: #333;
      }
    }
  }
}

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