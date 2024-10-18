<template>
    <div class="weight">
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_monitor_echarts"
            :customize="false"
             :visOptions="visOptions"
        >
        </TrainPage>
    </div>
</template>

<script>
export default {

    data() {
        return {
            visOptions:{},
            list: [],
            searchConfig: [
                {
                    label: '时间范围',
                    type: 'datetimerange',
                    modelName: ['start_time', 'end_time'],
                    isArray: true,
                    valueType: 'timestamp',
                    pickerOptions: this.getPickerOptions(),
                },
                {
                    label: '上报终端',
                    type: 'select',
                    modelName: 'weight',
                    options:[]
                },
                {
                    label: '加载时间分类',
                    type: 'select',
                    modelName: 'weight',
                    options:[]
                },
            ],
            tableConfig: {
                isShowTable: false,
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                visType: 'echarts',
                filterData: (data) => {
                    this.list = data
                    this.handlerEcharts()
                    return data
                },
            },
        }
    },
    methods: {
        async handlerEcharts() {
            const data = [
                {
                    name: '姓名1',
                    value: (Math.random() * 10).toFixed(0),
                    sum: 10,
                }
            ].sort((a, b) => {
                return b.value - a.value
            })

            const getArrByKey = (data, k) => {
                let key = k || 'value'
                let res = []
                if (data) {
                    data.forEach(function (t) {
                        res.push(t[key])
                    })
                }
                return res
            }
            const opt = {
                index: 0,
            }
            const color = ['#FC619D', '#FF904D', '#48BFE3']

            this.visOptions = {
                grid: {
                    top: '2%',
                    bottom: -15,
                    right: 30,
                    left: -30,
                    containLabel: true,
                },
                xAxis: {
                    show: false,
                },
                yAxis: [
                    {
                        triggerEvent: true,
                        show: true,
                        inverse: true,
                        data: getArrByKey(data, 'name'),
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            interval: 0,
                            color: '#666',
                            align: 'left',
                            margin: 80,
                            fontSize: 13,
                            formatter: function (value, index) {
                                if (opt.index === 0 && index < 3) {
                                    return (
                                        '{idx' +
                                        index +
                                        '|' +
                                        (1 + index) +
                                        '} {title|' +
                                        value +
                                        '}'
                                    )
                                } else if (opt.index !== 0 && index + opt.index < 9) {
                                    return (
                                        '{idx|0' +
                                        (1 + index + opt.index) +
                                        '} {title|' +
                                        value +
                                        '}'
                                    )
                                } else {
                                    return (
                                        '{idx|' +
                                        (1 + index + opt.index) +
                                        '} {title|' +
                                        value +
                                        '}'
                                    )
                                }
                            },
                            rich: {
                                idx0: {
                                    color: '#FB375E',
                                    backgroundColor: '#FFE8EC',
                                    borderRadius: 100,
                                    padding: [5, 8],
                                },
                                idx1: {
                                    color: '#FF9023',
                                    backgroundColor: '#FFEACF',
                                    borderRadius: 100,
                                    padding: [5, 8],
                                },
                                idx2: {
                                    color: '#01B599',
                                    backgroundColor: '#E1F7F3',
                                    borderRadius: 100,
                                    padding: [5, 8],
                                },
                                idx: {
                                    color: '#333',
                                    borderRadius: 100,
                                    padding: [5, 8],
                                },
                                title: {
                                    width: 165,
                                },
                            },
                        },
                    },
                    {
                        triggerEvent: true,
                        show: true,
                        inverse: true,
                        data: getArrByKey(data, 'name'),
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            interval: 0,
                            color: '#666',
                            align: 'left',
                            margin: 20,
                            fontSize: 13,
                            formatter: function (value, index) {
                                return (
                                    '上报次数：' +
                                    data[index].value +
                                    '个    平均加载时间：' +
                                    ((data[index].value / data[index].sum) * 100).toFixed(2) +
                                    '%'
                                )
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: '条',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: data,
                        barWidth: 10,
                        itemStyle: {
                            color: (val) => {
                                if (val.dataIndex < 3 && opt.index === 0) {
                                    return color[val.dataIndex]
                                } else {
                                    return '#1990FF'
                                }
                            },
                            barBorderRadius: 30,
                        },
                    },
                ],
            }
        }
    },
}
</script>
