<template>
  <view class="echarts" :style="{ width: width + 'px', height: height + 'px' }">
    <canvas ref="canvas" :id="canvasId" :canvas-id="canvasId" style="width: 100%; height: 100%;" />
  </view>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'EcCanvas',
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 200
    },
    option: {
      type: Object,
      required: true
    },
    canvasId: {
      type: String,
      default: 'myChart'
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.canvas;
      const chart = echarts.init(chartDom);
      chart.setOption(this.option);
    }
  }
};
</script>

<style scoped>
.echarts {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
