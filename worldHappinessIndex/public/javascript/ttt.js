var myChart1 = echarts.init(document.getElementById('main1'), 'vintage');
// 指定图表的配置项和数据
var option1 = {
    title: {
        text: '压力来源',
        top: 30,
        left: 'center'
    },
    tooltip: {},
    toolbox: {
        show: true,
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        },
        bottom: 15,
        right: 'center'
    },
    grid: {
        left: 80,
        top: 100,
        bottom: 80
    },
    xAxis: {
        data: ['房贷、车贷', '育儿', '赡养老人', '生病', '学业']
    },
    yAxis: {},
    series: [{
        type: 'bar',
        data: [191, 142, 117, 89, 67],
        label: {
            show: true,
            fontSize: 15,
            color: 'white'
        },
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);