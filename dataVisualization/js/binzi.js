// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('cloth'), 'purple-passion')

// 指定图表的配置项和数据
option = {
  title: {
    text: '人均衣着消费支出（元）',
    top: '2%',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      selectedMode: 'single',
      selectedOffset: 20,
      clockwise: true,
      startAngle: 90,
      legendHoverlink: true,
      roseType: true,
      radius: ['30%', '70%'],
      data: [
        { value: 2235.4923, name: '北京市' },
        { value: 2037.3934, name: '天津市' },
        { value: 1695.0052, name: '河北省' },
        { value: 1665.7728, name: '山西省' },
        { value: 2153.1585, name: '内蒙古自治区' },
        { value: 1783.358, name: '吉林省' },
        { value: 1780.2862, name: '黑龙江省' },
        { value: 2153.4434, name: '上海市' },
        { value: 2075.0747, name: '江苏省' },
        { value: 2437.2194, name: '浙江省' },
        { value: 1794.904, name: '安徽省' },
        { value: 1740.9461, name: '福建省' },
        { value: 1440.2359, name: '江西省' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option)
myChart.resize()
