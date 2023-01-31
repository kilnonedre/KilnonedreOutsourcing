var chartDom = document.getElementById('house')
var myChart = echarts.init(chartDom)
var option
const gaugeData = [
  {
    value: 92,
    name: '北京市',
    title: {
      offsetCenter: ['-40%', '80%'],
    },
    detail: {
      offsetCenter: ['-40%', '95%'],
    },
  },
  {
    value: 70,
    name: '天津市',
    title: {
      offsetCenter: ['0%', '80%'],
    },
    detail: {
      offsetCenter: ['0%', '95%'],
    },
  },
  {
    value: 49,
    name: '河北省',
    title: {
      offsetCenter: ['40%', '80%'],
    },
    detail: {
      offsetCenter: ['40%', '95%'],
    },
  },
]
option = {
  title: {
    text: ' 居住消费支出（元）',
    top: '2%',
    left: 'center',
  },

  series: [
    {
      type: 'gauge',
      anchor: {
        show: true,
        showAbove: true,
        size: 18,
        itemStyle: {
          color: '#FAC858',
        },
      },
      pointer: {
        icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
        width: 4,
        length: '80%',
        offsetCenter: [0, '8%'],
      },
      progress: {
        show: true,
        overlap: true,
        roundCap: true,
      },
      axisLine: {
        roundCap: true,
      },
      data: gaugeData,
      title: {
        fontSize: 14,
      },
      detail: {
        width: 40,
        height: 14,
        fontSize: 14,
        color: '#fff',
        backgroundColor: 'inherit',
        borderRadius: 3,
        formatter: '{value}%',
      },
    },
  ],
}

option && myChart.setOption(option)
