<template>
  <view class="setting-page">
    <view
      v-for="item in menuList"
      :key="item.title"
      class="menu-item"
      @click="navigate(item.url)"
    >
      <image class="icon" :src="item.icon" mode="aspectFit" />
      <text class="title">{{ item.title }}</text>
      <image class="arrow" src="/static/enter_icon.png" mode="aspectFit" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const menuList = ref([
  {
    title: '企业管理',
    icon: '/static/user_icon.png',
    url: '/pages/user/user'
  },
  {
    title: '账号管理',
    icon: '/static/account_icon.png',
    url: '/pages/account/account'
  },
  {
    title: '异常信息',
    icon: '/static/alarm_icon.png',
    url: '/pages/error/error'
  },
  {
    title: '充值记录',
    icon: '/static/charge_icon.png',
    url: '/pages/recharge-record/recharge-record'
  },
  {
    title: '设置',
    icon: '/static/setting_icon.png',
    url: '/pages/setting/setting'
  },
  {
    title: '远程充值',
    icon: '/static/icons/remote-charge.png',
    url: '/pages/remote-charge/remote-charge'
  }
])

function navigate(url) {
  uni.navigateTo({ url })
}
</script>

<style>
.setting-page {
  background-color: #fff;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}
.icon {
  width: 24px;
  height: 24px;
}
.title {
  flex: 1;
  margin-left: 12px;
  font-size: 16px;
  color: #333;
}
.arrow {
  width: 18px;
  height: 18px;
}
</style>
