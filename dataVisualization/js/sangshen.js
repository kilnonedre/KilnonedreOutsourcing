var chartDom = document.getElementById('live')
var myChart = echarts.init(chartDom)
var option

option = {
  title: {
    text: '人均生活用品及服务消费支出（元）',
    top: '2%',
    left: 'center',
  },
  series: {
    type: 'sankey',
    layout: 'none',
    emphasis: {
      focus: 'adjacency',
    },
    data: [
      {
        name: '东部地区',
      },
      {
        name: '东三省',
      },
      {
        name: '环渤海',
      },
      {
        name: '长三角',
      },
      {
        name: '北京市',
      },
      {
        name: '天津市',
      },
      {
        name: '河北省',
      },
      {
        name: '山西省',
      },
      {
        name: '内蒙古自治区',
      },
      {
        name: '辽宁省',
      },
      {
        name: '吉林省',
      },
      {
        name: '华南',
      },
      {
        name: '黑龙江省',
      },
      {
        name: '上海市',
      },
      {
        name: '江苏省',
      },
      {
        name: '浙江省',
      },
      {
        name: '安徽省',
      },
      {
        name: '福建省',
      },
      {
        name: '江西省',
      },
    ],
    links: [
      {
        source: '东三省',
        target: '黑龙江省',
        value: 1293.0778,
      },
      {
        source: '东三省',
        target: '吉林省',
        value: 1377.3867,
      },
      {
        source: '东三省',
        target: '辽宁省',
        value: 1638.3362,
      },
      {
        source: '东部地区',
        target: '东三省',
        value: 1293.0778 + 1377.3867 + 1638.3362,
      },
      {
        source: '环渤海',
        target: '北京市',
        value: 2744.5285,
      },
      {
        source: '环渤海',
        target: '天津市',
        value: 2105.3538,
      },
      {
        source: '环渤海',
        target: '内蒙古自治区',
        value: 1547.0832,
      },
      {
        source: '环渤海',
        target: '河北省',
        value: 1483.3578,
      },
      {
        source: '东部地区',
        target: '环渤海',
        value: 1483.3578 + 1547.0832 + 2105.3538 + 2744.5285,
      },
      {
        source: '长三角',
        target: '上海市',
        value: 2328.1725,
      },
      {
        source: '长三角',
        target: '江苏省',
        value: 2176.4034,
      },
      {
        source: '长三角',
        target: '浙江省',
        value: 2417.9029,
      },
      {
        source: '东部地区',
        target: '长三角',
        value: 2417.9029 + 2176.4034 + 2328.1725,
      },
      {
        source: '东部地区',
        target: '安徽省',
        value: 1671.1764,
      },
      {
        source: '东部地区',
        target: '江西省',
        value: 1445.7911,
      },
      {
        source: '东部地区',
        target: '山西省',
        value: 1390.9486,
      },
      {
        source: '华南',
        target: '福建省',
        value: 1793.6083,
      },
      {
        source: '东部地区',
        target: '华南',
        value: 1793.6083,
      },
    ],
  },
}

option && myChart.setOption(option)
