<template>
  <div class="container" ref="container"></div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch, toRefs } from 'vue'
import * as echarts from 'echarts' // 引入echarts

const props = defineProps({
  options: {
    type: Object,
    default: {},
    required: true,
  },
  theme: {
    type: String,
    default: '', //dark为深色模式
    required: false,
  },
})
const { options } = toRefs(props)
const container = ref(null)
let chart

//组件挂载后将echarts挂载在container上，并将给echarts设置传入的options
onMounted(() => {
  chart = echarts.init(container.value, props.options.theme)
  chart.setOption(props.options)
})

//监听options发生变化时，重新给echarts设置传入的options
watch(
  options,
  (newOptions) => {
    chart.setOption(newOptions)
  },
  { deep: true },
)
</script>
<style scoped>
.container {
  width: 70vw;
  height: 60vh;
}
</style>
