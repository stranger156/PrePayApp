<template>
	<view  class="main">
	<image src="/static/background.png" alt="" class="img" />
	</view>
</template>

<script setup>
import { onMounted, getCurrentInstance} from 'vue';
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
	//实现定时页面跳转
  setTimeout(() => {
	uni.navigateTo({
        url: '/pages/login/login'
      });
  }, 2000);
});
	
</script>

<style scoped>
	  .img{
		  width: 100vw;
		  height: 100vh;
	  }
</style>
