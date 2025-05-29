<template>
  <!-- 图表容器 -->
  sacoibsaiuo
  <view class="chart-container">
    <qiun-data-charts 
      type="line"
      :chartData="chartData"
      :opts="chartOptions"
      canvasId="lineChart"
      canvas2d
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 图表数据配置
const chartData = ref({
  categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
  series: [
    {
      name: '销售额',
      data: [35, 20, 25, 37, 4, 20],
      color: '#5470c6'  // 添加系列专属颜色
    }
  ]
});

// 图表配置项
const chartOptions = ref({
  padding: [15, 15, 0, 15], // 上右下左内边距
  backgroundColor: '#ffffff', // 明确设置背景色
  extra: {
    line: {
      type: 'curve',    // 平滑曲线类型
      width: 4,         // 线宽
      activePoint: true // 启用激活点样式
    }
  },
  legend: {
    show: true,
    position: 'top',
    float: 'center'     // 图例居中显示
  },
  xAxis: {
    disableGrid: false,
    itemCount: 4,       // 可见刻度数量
    axisLabel: {
      rotate: 0         // 刻度标签旋转角度
    }
  },
  yAxis: {
    gridType: 'dash',   // 虚线网格
    dashLength: 4,      // 虚线长度
    splitNumber: 5,     // 网格分割段数
    data: [
      { min: 0 },       // 明确Y轴范围
    ]
  },
  tooltip: {
    show: true,         // 启用提示框
    bgColor: 'rgba(0,0,0,0.7)'
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height:auto; /* 使用视口高度单位 */
  min-height: 600rpx; /* 最小高度保障 */
  background-color: #fff; /* 修复背景色错误 */
  border-radius: 16rpx;  /* 添加圆角 */
  box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.05); /* 添加微妙阴影 */
  overflow: hidden;      /* 防止内容溢出 */
  padding: 8rpx;         /* 增加内边距 */
}
</style>