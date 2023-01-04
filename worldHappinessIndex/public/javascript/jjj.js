var chartDom = document.getElementById('jjj');
var myChart = echarts.init(chartDom);
var option;

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    legend: {
        data: ['人均GDP', '幸福指数']
    },
    xAxis: [{
        type: 'category',
        data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        axisPointer: {
            type: 'shadow'
        }
    }],
    yAxis: [{
            type: 'value',
            name: '人均GDP',
            min: 50000,
            max: 100000,
            interval: 10000,
            axisLabel: {
                formatter: '{value} 元'
            }
        },
        {
            type: 'value',
            name: '幸福指数',
            min: 5,
            max: 5.6,
            interval: 0.12,
            axisLabel: {
                formatter: '{value} 指数'
            }
        }
    ],
    series: [{
            name: 'GDP',
            type: 'bar',
            tooltip: {
                valueFormatter: function(value) {
                    return value + ' 元';
                }
            },
            data: [
                53817.0, 59660.0, 64520.7, 70892.0, 72447.0, 80976.0, 97431.0
            ]
        },
        {
            name: '幸福指数',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
                valueFormatter: function(value) {
                    return value;
                }
            },
            data: [5.243, 5.224, 5.246, 5.191, 5.124, 5.339, 5.585]
        }
    ]
};

option && myChart.setOption(option);