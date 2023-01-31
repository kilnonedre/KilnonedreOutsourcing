var chartDom = document.getElementById('food')
var myChart = echarts.init(chartDom)
var option

option = {
  title: {
    text: '人均食品烟酒消费支出（元）',
    top: '90%',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  legend: {
    data: ['人均GDP', '幸福指数'],
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '北京市',
        '天津市',
        '河北省',
        '山西省',
        '内蒙古自治区',
        '辽宁省',
        '吉林省',
        '黑龙江省',
        '上海市',
        '江苏省',
        '浙江省',
        '安徽省',
        '福建省',
        '江西省',
      ],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '支出',
      min: 5000,
      max: 15000,
      interval: 2000,
      axisLabel: {
        formatter: '{value} 元',
      },
    },
    {
      type: 'value',
      name: '',
      min: 5000,
      max: 15000,
      interval: 2000,
      axisLabel: {
        formatter: '',
      },
    },
  ],
  series: [
    {
      name: 'GDP',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 元'
        },
      },
      data: [
        9719.5959, 9708.4273, 6521.5967, 5528.5499, 7325.8606, 8183.9079,
        6626.626, 7095.0924, 12877.5863, 9590.351, 11283.4073, 8468.5699,
        10612.2012, 7722.6511,
      ],
    },
    {
      name: '',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value
        },
      },
      data: [
        9719.5959, 9708.4273, 6521.5967, 5528.5499, 7325.8606, 8183.9079,
        6626.626, 7095.0924, 12877.5863, 9590.351, 11283.4073, 8468.5699,
        10612.2012, 7722.6511,
      ],
    },
  ],
}

option && myChart.setOption(option)
