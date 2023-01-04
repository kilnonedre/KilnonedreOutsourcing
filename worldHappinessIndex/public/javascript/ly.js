// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('binzi'), 'purple-passion');

// 指定图表的配置项和数据
option = {
    title: {
        text: '荷兰幸福指数影响因素',
        subtext: '百分比',
        top: '2%',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [{
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
            { value: 1592, name: '社会支持度' },
            { value: 1305, name: '人均 GDP ' },
            { value: 750, name: '健康预期寿命' },
            { value: 524, name: '慷慨程度' },
            { value: 484, name: '腐败' },
            { value: 300, name: '社会选择自由' }
        ],
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChart.resize();