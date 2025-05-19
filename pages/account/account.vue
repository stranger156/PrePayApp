<template>
  <view class="container">
	  <view class="float-btn" @click="showAddModal">
	        <uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
	      </view>
    <!-- 标题 -->
    <view class="header">
      <text class="title">账户列表</text>
    </view>

    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar 
        placeholder="请输入账号名/电话/邮箱" 
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
        @click="showDetailModal(account)"
      >
        <text class="account-name">{{ account.userName }}</text>
        <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
      </view>
    </scroll-view>

    <!-- 详情弹窗 -->
    <uni-popup ref="detailPopup" type="center">
      <view class="modal-content">
        <view class="modal-header">
          <text class="modal-title">{{ currentUser?.userName || '用户详情' }}</text>
          <uni-icons 
            type="closeempty" 
            size="20" 
            color="#666"
            @click="closeDetailModal"
          ></uni-icons>
        </view>
        
        <view class="modal-body">
          <view class="info-item">
            <text class="label">账号编号：</text>
            <text class="value">{{ currentUser?.userNumber || '暂无信息' }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">账号名称：</text>
            <text class="value">{{ currentUser?.userName || '暂无信息' }}</text>
          </view>
          
		  <view class="info-item">
		    <text class="label">密码：</text>
		    <text class="value">{{ currentUser?.passwords || '暂无信息' }}</text>
		  </view>
		  
          <view class="info-item">
            <text class="label">联系电话：</text>
            <text class="value">{{ currentUser?.mobile || '暂无信息' }}</text>
          </view>
		  
		  <view class="info-item">
		    <text class="label">权限：</text>
		    <text class="value">{{ currentUser?.authority_id || '暂无信息' }}</text>
		  </view>
          
		  <view class="info-item">
		    <text class="label">地址：</text>
		    <text class="value">{{ currentUser?.address || '暂无信息' }}</text>
		  </view>
		  
          <view class="info-item">
            <text class="label">电子邮箱：</text>
            <text class="value">{{ currentUser?.email || '暂无信息' }}</text>
          </view>

          <view class="info-item">
            <text class="label">创建时间：</text>
            <text class="value">{{ currentUser?.createTime || '暂无信息' }}</text>
          </view>

          <view class="info-item">
            <text class="label">所属账号：</text>
            <text class="value">{{ currentUser?.admin || '暂无信息' }}</text>
          </view>
		  
		  <view class="action-buttons">
		    <button class="btn edit" @click="edituser">修改信息</button>
		    <button 
		      class="btn delete" 
		      @click="deleteuser"
		      v-if="currentUser?.userName !== 'root'"
		    >删除用户</button>
		  </view>
        </view>
      </view>
    </uni-popup>
	<uni-popup ref="addPopup" type="center">
	  <view class="add-modal">
	    <view class="modal-header">
	      <text class="title">添加用户</text>
	      <uni-icons 
	        type="closeempty" 
	        size="20" 
	        color="#666"
	        @click="closeAddModal"
	      ></uni-icons>
	    </view>
	
	    <view class="form-content">
	      <!-- 用户名 -->
	      <view class="form-item">
	        <text class="label">* 用户名</text>
	        <uni-easyinput 
	          v-model="newUser.userName"
	          placeholder="请输入用户名"
	        ></uni-easyinput>
	      </view>
	
	      <!-- 密码 -->
	      <view class="form-item">
	        <text class="label">* 密码</text>
	        <uni-easyinput 
	          v-model="newUser.passwords"
	          placeholder="请输入密码"
	        ></uni-easyinput>
	      </view>
	
	      <!-- 用户类型 -->
	      <view class="form-item">
	        <text class="label">* 用户类型</text>
	        <uni-data-select
	          v-model="newUser.authority_id"
	          placeholder="请选择用户类型"
	          :localdata="userTypes"
	        ></uni-data-select>
	      </view>
	
	      <!-- 所属管理员 -->
	      <view class="form-item">
	        <text class="label">* 所属管理员</text>
	        <uni-data-select
	          v-model="newUser.admin"
	          placeholder="请选择所属管理员"
	          :localdata="admins"
	          :disabled="isAdminOrSale"  
	          :clear="!isAdminOrSale"    
	        ></uni-data-select>
	      </view>
	
	      <!-- 其他字段（示例：联系方式） -->
	      <view class="form-item">
	        <text class="label">* 联系方式</text>
	        <uni-easyinput 
	          v-model="newUser.mobile"
	          placeholder="请输入手机号"
	          type="number"
	        ></uni-easyinput>
	      </view>
		  
		  <view class="form-item">
		    <text class="label">* 用户邮箱</text>
		    <uni-easyinput 
		      v-model="newUser.email"
		      placeholder="请输入用户邮箱"
		    ></uni-easyinput>
		  </view>
		  
		  <view class="form-item">
		    <text class="label">* 联系地址</text>
		    <uni-easyinput 
		      v-model="newUser.address"
		      placeholder="请输入联系地址"
		    ></uni-easyinput>
		  </view>
		  
		  <view class="form-item">
		    <text class="label">* 用户编号</text>
		    <uni-easyinput 
		      v-model="newUser.userNumber"
		      placeholder="请输入用户编号"
		      type="number"
		    ></uni-easyinput>
		  </view>
	
	      <!-- 提交按钮 -->
	      <view class="modal-footer">
	        <button class="btn cancel" @click="closeAddModal">取消</button>
	        <button class="btn confirm" @click="handleAddSubmit">确定添加</button>
	      </view>
	    </view>
	  </view>
	</uni-popup>
	<!-- 编辑弹窗 -->
	<uni-popup ref="editPopup" type="center">
	  <view class="edit-modal">
	    <view class="modal-header">
	      <text class="title">编辑用户</text>
	      <uni-icons 
	        type="closeempty" 
	        size="20" 
	        color="#666"
	        @click="closeEditModal"
	      ></uni-icons>
	    </view>
	
	    <view class="form-content">
	      <view class="form-item">
	        <text class="label">* 用户编号</text>
	        <uni-easyinput 
	          v-model="editUserData.userNumber"
	          :disabled="true"
	        ></uni-easyinput>
	      </view>
		  
		  <view class="form-item">
		    <text class="label">* 权限</text>
		    <uni-easyinput 
		      v-model="editUserData.authority_id"
		      :disabled="true"
		    ></uni-easyinput>
		  </view>
		  
		  <view class="form-item">
		    <text class="label">* 所属管理员</text>
		    <uni-easyinput 
		      v-model="editUserData.admin"
		      :disabled="true"
		    ></uni-easyinput>
		  </view>
			
		<view class="form-item">
		  <text class="label">* 用户名</text>
		  <uni-easyinput 
		    v-model="editUserData.userName"
		    placeholder="请输入用户名"
		  ></uni-easyinput>
		</view>
		<view class="form-item">
		  <text class="label">* 密码</text>
		  <uni-easyinput 
		    v-model="editUserData.passwords"
		    placeholder="请输入密码"
		  ></uni-easyinput>
		</view>
		<view class="form-item">
		  <text class="label">* 手机号</text>
		  <uni-easyinput 
		    v-model="editUserData.mobile"
		    placeholder="请输入密码"
		  ></uni-easyinput>
		</view>
	      <view class="form-item">
	        <text class="label">* 邮箱</text>
	        <uni-easyinput 
	          v-model="editUserData.email"
	          placeholder="请输入邮箱"
	        ></uni-easyinput>
	      </view>
	
	      <view class="form-item">
	        <text class="label">* 地址</text>
	        <uni-easyinput 
	          v-model="editUserData.address"
	          placeholder="请输入地址"
	        ></uni-easyinput>
	      </view>
	
	      <view class="modal-footer">
	        <button class="btn cancel" @click="closeEditModal">取消</button>
	        <button class="btn confirm" @click="handleEditSubmit">提交修改</button>
	      </view>
	    </view>
	  </view>
	</uni-popup>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import UniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import UniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
import { fetchUserList, deleteUser, updateUser, addUser } from '../../utils/api';

// 用户数据
const accounts = ref([]);
const currentUser = ref(null);
const searchKeyword = ref('');
const detailPopup = ref(null);

// 页面加载时获取数据
onMounted(async () => {
  try {
    const res = await fetchUserList();
	console.log(res)
    accounts.value = res.data?.records?.map(item => ({
      userNumber: item.userNumber,
      userName: item.userName,
	  passwords: item.passwords,
      mobile: item.mobile,
      email: item.email,
      authority_id: item.authority_id,
      address: item.address,
	  createTime: item.createTime,
      admin: item.admin,
      errorLogin: item.errorLogin
    })) || [];
  } catch (error) {
    console.error('获取用户列表失败:', error);
    uni.showToast({
      title: '数据加载失败',
      icon: 'none'
    });
  }
});

// 过滤后的用户列表
const filteredAccounts = computed(() => {
  if (!searchKeyword.value) return accounts.value;
  const keyword = searchKeyword.value.toLowerCase();
  return accounts.value.filter(account => 
    [account.userName, account.mobile, account.email].some(field => 
      String(field).toLowerCase().includes(keyword)
    )
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

// 显示详情弹窗
const showDetailModal = (user) => {
  currentUser.value = user;
  console.log(user)
  detailPopup.value.open('center');
};

// 关闭详情弹窗
	const closeDetailModal = () => {
	  detailPopup.value.close(() => {
	    currentUser.value = null;
	  });
	};
// 新增响应式数据
const addPopup = ref(null);
const newUser = ref({
  userName: '',
  passwords: '',
  authority_id: 'user',
  admin: '',
  mobile: '',
  email: '',
  address: '',
  userNumber: '',
  createTime: new Date().toISOString().split('T')[0] // 自动生成创建时间
});

// 用户类型选项（根据实际接口调整）
const userTypes = ref([
  { value: 'user', text: '普通用户' },
  { value: 'sale', text: '销售' },
  { value: 'admin', text: '管理员' }
]);

// 管理员列表（需要从接口获取）
const admins = ref([]);

// 打开添加弹窗
const showAddModal = () => {
  addPopup.value.open();
};

// 关闭添加弹窗
const closeAddModal = () => {
	addPopup.value.close(() => {
	    newUser.value = {
	      userName: '',
	      passwords: '',
	      authority_id: '',
	      admin: '',
	      mobile: '',
	      email: '',
	      address: '',
	      userNumber: '',
	      createTime: new Date().toISOString().split('T')[0]
	    };
	  });
};

// 提交新增用户
const handleAddSubmit = async () => {
  // 验证必填字段
  const requiredFields = [
    'userName', 'passwords', 'authority_id', 
    'admin', 'mobile'
  ];
  
  const missingFields = requiredFields.filter(field => !newUser.value[field]);
  if (missingFields.length > 0) {
    uni.showToast({ title: '请填写所有必填项', icon: 'none' });
    return;
  }

  // 手机号格式验证
  if (!/^1[3-9]\d{9}$/.test(newUser.value.mobile)) {
    uni.showToast({ title: '手机号格式不正确', icon: 'none' });
    return;
  }

  // 新增用户确认对话框
  const confirm = await uni.showModal({
    title: '确认添加用户',
    content: '确定要添加该用户吗？',
  });

  // 用户取消操作时直接返回
  if (!confirm.confirm) {
    return;
  }

  try {
    // 调用添加接口
    console.log(newUser.value);
    const res = await addUser(newUser.value);
    console.log(res);
    if (res.code === 200) {
      uni.showToast({ title: '添加成功', icon: 'success' });
      closeAddModal();
      
      // 刷新用户列表
      const listRes = await fetchUserList();
      accounts.value = listRes.data?.records?.map(item => ({
        userNumber: item.userNumber,
        userName: item.userName,
        passwords: item.passwords,
        mobile: item.mobile,
        email: item.email,
        authority_id: item.authority_id,
        address: item.address,
        createTime: item.createTime,
        admin: item.admin,
        errorLogin: item.errorLogin
      })) || [];
    } else {
      uni.showToast({ title: res.message || '添加失败', icon: 'none' });
    }
  } catch (error) {
    console.error('添加用户失败:', error);
    uni.showToast({ title: '添加失败，请重试', icon: 'none' });
  }
};
// 计算是否为管理员或销售
const isAdminOrSale = computed(() => {
  return ['sale', 'admin'].includes(newUser.value.authority_id); // 假设 2=销售，3=管理员
});

// 监听用户类型变化
watch(
  () => newUser.value.authority_id,
  (newVal) => {
    if (['sale', 'admin'].includes(newVal)) {
      // 自动设置管理员为root
      newUser.value.admin = 1;
	  console.log(newUser.value.admin)
    } else {
      // 重置为可选项
      newUser.value.admin = '';
    }
  }
);
onMounted(async () => {
  try {
    const res = await fetchUserList();
    accounts.value = res.data?.records?.map(item => ({
      userNumber: item.userNumber,
      userName: item.userName,
      passwords: item.passwords,
      mobile: item.mobile,
      email: item.email,
      authority_id: item.authority_id,
      address: item.address,
      createTime: item.createTime,
      admin: item.admin,
      errorLogin: item.errorLogin
    })) || [];

    // 处理admins数据，筛选出管理员用户（假设authority_id为3表示管理员）
    admins.value = accounts.value
      .filter(user => user.authority_id === 'admin' || user.authority_id === 'superadmin') // 根据实际情况调整条件
      .map(user => ({
        value: user.userNumber, // 使用userName作为value
        text: user.userName  // 使用userName作为显示文本
      }));

  } catch (error) {
    console.error('获取用户列表失败:', error);
    uni.showToast({
      title: '数据加载失败',
      icon: 'none'
    });
  }
});
// 新增响应式数据
const editPopup = ref(null);
const editUserData = ref({
  userName: '',
  passwords: '',
  mobile: '',
  email: '',
  address: '',
  userNumber: '',
  authority_id: '',
  admin: ''
});

// 修改信息方法
const edituser = () => {
  // 深拷贝当前用户数据
  editUserData.value = JSON.parse(JSON.stringify(currentUser.value));
  editPopup.value.open();
};

// 关闭编辑弹窗
const closeEditModal = () => {
  editPopup.value.close();
};

// 提交修改
const handleEditSubmit = async () => {
  // 验证必填字段
  const requiredFields = ['userName', 'passwords', 'mobile'];
  const missingFields = requiredFields.filter(field => !editUserData.value[field]);
  
  if (missingFields.length > 0) {
    uni.showToast({ title: '请填写所有必填项', icon: 'none' });
    return;
  }

  // 添加确认对话框
  uni.showModal({
    title: '确认修改',
    content: '确定要提交修改吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          const res = await updateUser(editUserData.value);
          if (res.code === 200) {
            uni.showToast({ title: '修改成功', icon: 'success' });
            // 更新本地数据
            const index = accounts.value.findIndex(item => 
              item.userNumber === editUserData.value.userNumber
            );
            if (index !== -1) {
              currentUser.value = { ...editUserData.value };
              accounts.value[index] = { ...editUserData.value };
            }
            closeEditModal();
          } else {
            uni.showToast({ title: res.message || '修改失败', icon: 'none' });
          }
        } catch (error) {
          console.error('修改用户失败:', error);
          uni.showToast({ title: '修改失败，请重试', icon: 'none' });
        }
      }
    }
  });
};

// 删除用户（添加确认对话框）
const deleteuser = () => {
  uni.showModal({
    title: '确认删除',
    content: `确定要删除用户 ${currentUser.value.userName} 吗？`,
    success: async (res) => {
      if (res.confirm) {
        try {
          const res = await deleteUser(currentUser.value.userNumber);
          if (res.code === 200) {
            uni.showToast({ title: '删除成功' });
            // 刷新列表
            const listRes = await fetchUserList();
            accounts.value = listRes.data?.records || [];
            closeDetailModal();
          }
        } catch (error) {
          uni.showToast({ title: '删除失败', icon: 'none' });
        }
      }
    }
  });
};
</script>

<style lang="scss" scoped>	
.float-btn {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
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
/* 保持原有容器样式 */
.account-list {
  height: calc(100vh - 180rpx);
  
  .account-item {
    padding: 28rpx 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:active {
      background-color: #f8f8f8;
    }
    
    .account-name {
      font-size: 32rpx;
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
        background: #007AFF;
        color: #fff;
      }
    }
  }
}
.edit-modal {
	  @extend .add-modal; // 复用添加弹窗样式
	}
</style>