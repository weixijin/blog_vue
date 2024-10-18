<template>
    <div>
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_notes_list_echarts"
            :customize="false"
             :visOptions="visOptions"
        >
        </TrainPage>
    </div>
</template>

<script>
export default {
    name: 'notesEcharts',
    data() {
        return {
            visOptions:{},
            list: [],
            searchConfig: [
                {
                    label: '是否过滤',
                    type: 'select',
                    modelName: 'checked',
                    options: [
                        {
                            label: '是',
                            value: true,
                        },
                        {
                            label: '否',
                            value: false,
                        },
                    ],
                },
                {
                    label: '完成状态',
                    type: 'select',
                    modelName: 'note_done',
                    isMuli: true,
                    options: () => {
                        return this.noteDoneType
                    },
                },
                {
                    label: '纪要分类',
                    type: 'select',
                    modelName: 'note_type',
                  
                    options: () => {
                        return this.summaryTypeOptions
                    },
                },
                {
                    label: '时间范围',
                    type: 'datetimerange',
                    modelName: ['start_time', 'end_time'],
                    isArray: true,
                    valueType: 'timestamp',
                    pickerOptions: this.getPickerOptions(),
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
    computed: {
        ...Vuex.mapState(['userdata', 'options']),
        noteDoneType() {
            return this.options?.noteDoneType || []
        },
        summaryTypeOptions() {
            return this.options?.summaryTypeOptions || []
        },
    },
    methods: {
        // 初始化echarts
         handlerEcharts() {
            let { list } = this
            let { checked, start_time, end_time } = this.$refs.TrainPageRef?.searchData || {}
            // 每个分类的标题
            let allNotes = []
            // 总时长数组
            let time1_start = []
            let time1_end = []

            // 开发阶段数组
            let time2_start = []
            let time2_end = []
            // 测试阶段数组
            let time3_start = []
            let time3_end = []

            if (checked) {
                // 只展示开发时间在搜索条件范围的
                list = list
                    .filter(({ note_begin_time, note_testing_time, note_end_time, note_type }) => {
                        if (
                            +note_type === 7 &&
                            ((start_time < note_begin_time && note_begin_time < end_time) ||
                                (start_time < note_testing_time && note_testing_time < end_time))
                        ) {
                            return true
                        }

                        if (
                            +note_type === 4 &&
                            ((start_time < note_begin_time && note_begin_time < end_time) ||
                                (start_time < note_end_time && note_end_time < end_time))
                        ) {
                            return true
                        }
                    })
                    .map((item) => {
                        let { note_begin_time, note_testing_time, note_type } = item
                        if (note_begin_time < start_time) {
                            item.note_begin_time = start_time
                        }
                        if (note_testing_time > end_time && +note_type === 7) {
                            item.note_testing_time = end_time
                        }

                        return item
                    })
            }
            // 按开始时间升序
            list = list.sort((a, b) => {
                return a.note_begin_time - b.note_begin_time
            })
            list.forEach(
                ({
                    note_content,
                    note_begin_time,
                    note_testing_time,
                    note_end_time,
                    note_type,
                }) => {
                    allNotes.push(note_content)
                    const note_begin_time_str = new Date(this.klDateFormat(note_begin_time))
                    const note_end_time_str = new Date(this.klDateFormat(note_end_time))
                    const note_testing_time_str = new Date(this.klDateFormat(note_testing_time))
                    // 总时长
                    time1_start.push(note_begin_time_str)
                    time1_end.push(note_end_time_str)
                    time2_start.push(note_begin_time_str)

                    if (+note_type === 7) {
                        time2_end.push(note_testing_time_str)
                        time3_start.push(note_testing_time_str)
                        time3_end.push(note_end_time_str)
                    } else {
                        time2_end.push(note_end_time_str)
                    }
                },
            )

            if (checked) {
                // 只展示开发阶段
                time1_start = []
                time1_end = []
                time3_start = []
                time3_end = []
            }

            this.visOptions = {
                backgroundColor: '#fff',
                title: {
                    text: '',
                    padding: 20,
                    textStyle: {
                        fontSize: 17,
                        fontWeight: 'bolder',
                        color: '#333',
                    },
                    subtextStyle: {
                        fontSize: 13,
                        fontWeight: 'bolder',
                    },
                },
                legend: {
                    data: allNotes,
                    align: 'right',
                    right: 80,
                    top: 50,
                },
                grid: {
                    containLabel: true,
                    show: false,
                    right: 130,
                    left: 40,
                    bottom: 40,
                    top: 90,
                },
                xAxis: {
                    type: 'time',
                    axisLabel: {
                        show: true,
                        interval: 0,
                    },
                },
                yAxis: {
                    axisLabel: {
                        show: true,
                        interval: 0,
                        formatter: function (value, index) {
                            var last = ''
                            var max = 5
                            var len = value.length
                            var hang = Math.ceil(len / max)
                            if (hang > 1) {
                                for (var i = 0; i < hang; i++) {
                                    var start = i * max
                                    var end = start + max
                                    var temp = value.substring(start, end) + '\n'
                                    last += temp //凭借最终的字符串
                                }
                                return last
                            } else {
                                return value
                            }
                        },
                    },
                    data: allNotes,
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        var res = ''
                        var name = ''
                        var start0 = ''
                        var start = ''
                        var end0 = ''
                        var end = ''
                        for (var i in params) {
                            var k = i % 2
                            if (!k) {
                                //偶数
                                start0 = params[i].data
                                start =
                                    start0.getFullYear() +
                                    '-' +
                                    (start0.getMonth() + 1) +
                                    '-' +
                                    start0.getDate()
                            }
                            if (k) {
                                //奇数
                                name = params[i].seriesName
                                end0 = params[i].data
                                end =
                                    end0.getFullYear() +
                                    '-' +
                                    (end0.getMonth() + 1) +
                                    '-' +
                                    end0.getDate()
                                res += name + ' : ' + start + '~' + end + '</br>'
                            }
                        }
                        return res
                    },
                },
                series: [
                    {
                        name: '开始时间',
                        type: 'bar',
                        stack: '总量0',
                        itemStyle: {
                            normal: {
                                color: 'white',
                            },
                        },
                        zlevel: -1,
                        z: 3,
                        data: time1_start,
                    },

                    {
                        name: '整个阶段时间',
                        type: 'bar',
                        stack: '总量0',
                        label: {
                            normal: {
                                show: true,
                                color: '#000',
                                position: 'right',
                                formatter: function (params) {
                                    return params.seriesName
                                },
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: 'skyblue',
                                borderColor: '#fff',
                                borderWidth: 2,
                            },
                        },
                        zlevel: -1,
                        data: time1_end,
                    },

                    {
                        name: '开始时间',
                        type: 'bar',
                        stack: '总量1',
                        itemStyle: {
                            normal: {
                                color: 'white',
                            },
                        },
                        zlevel: -1,
                        z: 3,
                        data: time2_start,
                    },
                    {
                        name: '开发阶段时间',
                        type: 'bar',
                        stack: '总量1',
                        label: {
                            normal: {
                                show: true,
                                color: '#000',
                                position: 'right',
                                formatter: function (params) {
                                    return params.seriesName
                                },
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: 'green',
                                borderColor: '#fff',
                                borderWidth: 2,
                            },
                        },
                        zlevel: -1,
                        data: time2_end,
                    },

                    {
                        name: '开始时间',
                        type: 'bar',
                        stack: '总量2',
                        itemStyle: {
                            normal: {
                                color: 'white',
                            },
                        },
                        zlevel: -1,
                        z: 3,
                        data: time3_start,
                    },
                    {
                        name: '测试阶段时间',
                        type: 'bar',
                        stack: '总量2',
                        label: {
                            normal: {
                                show: true,
                                color: '#000',
                                position: 'right',
                                formatter: function (params) {
                                    return params.seriesName
                                },
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: 'yellow',
                                borderColor: '#fff',
                                borderWidth: 2,
                            },
                        },
                        zlevel: -1,
                        data: time3_end,
                    },
                ],
            }
        },
    },
}
</script>
