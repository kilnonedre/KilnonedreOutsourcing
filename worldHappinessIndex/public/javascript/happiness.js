var myChart = echarts.init(document.getElementById('happiness'), 'westeros');

// 指定图表的配置项和数据
const data = [
    [
        [28604, 98.21, 17096869, '芬兰', 2022],
        [31163, 76.36, 27662440, '丹麦', 2022],
        [1516, 75.57, 1154605773, '冰岛', 2022],
        [13670, 75.12, 10582082, '瑞士', 2022],
        [28599, 74.15, 4986705, '荷兰', 2022],
        [29476, 74.04, 56943299, '卢森堡', 2022],
        [31476, 73.84, 78958237, '瑞典', 2022],
        [28666, 73.65, 254830, '挪威', 2022],
        [1777, 73.64, 870601776, '以色列', 2022],
        [29550, 72, 122249285, '新西兰', 2022],
        [2076, 71.63, 20194354, '奥地利', 2022],
        [12087, 71.62, 42972254, '澳大利亚', 2022],
        [24021, 70.41, 3397534, '爱尔兰', 2022],
        [43296, 70.34, 4240375, '德国', 2022],
        [10088, 70.25, 38195258, '加拿大', 2022],
        [19349, 69.77, 147568552, '美国', 2022],
        [10670, 69.43, 53994605, '英国', 2022],
        [26424, 69.20, 57110117, '捷克', 2022],
        [37062, 68.05, 252847810, '比利时', 2022]
    ],
    [
        [44056, 76.32, 23968973, '芬兰', 2018],
        [13334, 75.55, 1376048943, '丹麦', 2018],
        [21291, 74.95, 11389562, '冰岛', 2018],
        [38923, 74.87, 5503457, '瑞士', 2018],
        [37599, 74.41, 64395345, '荷兰', 2018],
        [19360, 69.10, 78665830, '卢森堡', 2018],
        [5903, 73.14, 1311050527, '瑞典', 2018],
        [43294, 75.94, 35939927, '挪威', 2018],
        [1390, 71.90, 25155317, '以色列', 2018],
        [42182, 73.24, 329425, '新西兰', 2018],
        [34644, 71.39, 50293439, '奥地利', 2018],
        [36162, 72.72, 126573481, '澳大利亚', 2018],
        [64304, 69.77, 5210967, '爱尔兰', 2018],
        [24787, 69.65, 38611794, '德国', 2018],
        [44053, 73.28, 80688545, '加拿大', 2018],
        [38225, 68.86, 64715810, '美国', 2018],
        [53354, 68.14, 321773631, '英国', 2018],
        [34186, 70.72, 4528526, '哥斯达黎加', 2018],
        [23038, 69.27, 143456918, '比利时', 2018]
    ]
];
option = {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
            offset: 0,
            color: '#FACDAE'
        },
        {
            offset: 1,
            color: '#F5C7D4'
        }
    ]),
    title: {
        text: '2022年世界幸福指数',
        left: '5%',
        top: '3%'
    },
    legend: {
        right: '10%',
        top: '3%',
        data: ['2018', '2022']
    },
    grid: {
        left: '8%',
        top: '10%'
    },
    xAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        scale: true
    },
    series: [{
            name: '2018',
            data: data[0],
            type: 'scatter',
            symbolSize: function(data) {
                return Math.sqrt(data[2]) / 5e2;
            },
            emphasis: {
                focus: 'series',
                label: {
                    show: true,
                    formatter: function(param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(100, 200, 227)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(25, 183, 177)'
                    }
                ])
            }
        },
        {
            name: '2022',
            data: data[1],
            type: 'scatter',
            symbolSize: function(data) {
                return Math.sqrt(data[2]) / 5e2;
            },
            emphasis: {
                focus: 'series',
                label: {
                    show: true,
                    formatter: function(param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 100, 73)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(204, 136, 72)'
                    }
                ])
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);