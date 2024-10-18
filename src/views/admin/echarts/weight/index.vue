<template>
    <div>
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_weights"
            :customize="false"
            :visOptions="visOptions"
        >
        </TrainPage>

        <e-dialog
            custom-class="zl-dialog"
            :title="rowDate._id ? '编辑' : '新增'"
            width="600px"
            header
            v-model="dialogVisible"
            :close-on-click-modal="false"
            @closed="handleClosed"
            @confirm="handleConfirm"
        >
            <div class="p-l-20 p-t-20">
                <el-input-number
                    v-model="weight"
                    controls-position="right"
                    @change="handleChange"
                    :min="1"
                    :max="500"
                ></el-input-number>
            </div>
        </e-dialog>
    </div>
</template>

<script>
import adminApi from '@/api/blog/admin.js'
export default {
    name: 'weightEcharts',
    data() {
        return {
            standardWeight: 70,
            list: [],
            visOptions: {},
            isLoading: true,
            height: 0,
            width: 0,
            rowDate: {},
            dialogVisible: false,

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
                    label: '最大返回条数',
                    type: 'input',
                    modelName: 'page_size',
                },
            ],
            tableConfig: {
                isShowTable: false,
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                visType: 'echarts',
                filterData: async (data) => {
                    this.list = data
                    await this.handlerEcharts1()
                    return data
                },
                btns: {
                    children: [
                        {
                            label: '新增',
                            type: 'primary',
                            clickFn: () => {
                                this.openDialog()
                            },
                        },
                    ],
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
        async handlerEcharts() {
            console.log(this.list)

            this.visOptions = {
                type: 'line',
                data: {
                    labels: this.list.map((item) => {
                        return this.klDateFormat(item.create_time)
                    }),
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: this.list.map((item) => {
                                return item.weight - 75
                            }),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgb(255, 99, 132)',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart',
                        },
                    },
                },
                scales: {
      x: {
        type: 'linear'
      }
    }
            }
        },
        async handlerEcharts1() {
            if(typeof echarts === 'undefined'){
                await this.sleep()
                this.handlerEcharts1()
                return 
            }
            this.visOptions = {
                backgroundColor: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                        {
                            offset: 0,
                            color: '#c86589',
                        },
                        {
                            offset: 1,
                            color: '#06a7ff',
                        },
                    ],
                    false,
                ),
                title: {
                    text: '体重趋势图',
                    left: 'center',
                    bottom: '5%',
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                    },
                },
                grid: {
                    top: '10%',
                    left: '5%',
                    right: '5%',
                    bottom: '15%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    axisLabel: {
                        margin: 30,
                        color: '#ffffff',
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: true,
                        length: 25,
                        lineStyle: {
                            color: '#ffffff1f',
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ffffff1f',
                        },
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        position: 'right',
                        axisLabel: {
                            margin: 20,
                            color: '#ffffff',
                        },

                        axisTick: {
                            show: true,
                            length: 15,
                            lineStyle: {
                                color: '#ffffff1f',
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#ffffff1f',
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff',
                                width: 2,
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: '注册总量',
                        type: 'line',
                        smooth: true, //是否平滑曲线显示
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: {
                            normal: {
                                color: '#fff', // 线条颜色
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                            },
                        },
                        itemStyle: {
                            color: 'red',
                            borderColor: '#fff',
                            borderWidth: 3,
                        },
                        tooltip: {
                            show: false,
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: '#eb64fb',
                                        },
                                        {
                                            offset: 1,
                                            color: '#3fbbff0d',
                                        },
                                    ],
                                    false,
                                ),
                            },
                        },
                        data: [],
                    },
                ],
            }

            let xData = []
            let yData = []
            this.list.forEach(({ updata_time, weight }) => {
                xData.unshift(this.klDateFormat(updata_time, 'MM/dd'))
                yData.unshift((weight - this.standardWeight).toFixed(2))
            })
            this.visOptions.xAxis.data = xData
            this.visOptions.series[0].data = yData
        },
        del(item) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    adminApi
                        .delete_weight({
                            _id: item._id,
                        })
                        .then(() => {
                            this.initTable()
                        })
                        .catch((err) => {
                            this.Toast(err)
                        })
                })
                .catch((err) => {})
        },
        handleClosed() {
            this.rowDate = {}
            this.dialogVisible = false
        },
        handleConfirm() {
            let { _id } = this.rowDate
            let params = {
                weight: this.weight,
            }
            if (_id) {
                params._id = _id
            }
            adminApi
                .post_weight(params)
                .then((res) => {
                    this.handleClosed()
                    this.initTable()
                })
                .catch((err) => {
                    this.Toast(err)
                })
        },
        openDialog() {
            this.dialogVisible = true
        },
    },
}
</script>
