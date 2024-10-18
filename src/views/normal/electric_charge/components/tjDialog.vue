<template>
    <e-dialog v-model="visable" width="1000px" title="统计信息" :footer="false">
        <div
            :style="{
                width: width + 'px',
                height: height + 'px',
            }"
            v-loading="isLoading"
        >
            <echartsPage
                id="echartsBox"
                :width="width"
                :height="height"
                :options="options"
                v-if="!isLoading"
            ></echartsPage>
        </div>
    </e-dialog>
</template>

<script>
import echartsPage from '@/components/echartsPage/index.vue'

export default {
    components: {
        echartsPage,
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isLoading: true,
            list: [],
            width: 1000,
            height: 600,
        }
    },
    computed: {
        ...Vuex.mapGetters(['allTenants']),
        visable: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            },
        },

        options() {
            const allUsers = this.allTenants.map((item) => item.label)
            const allData = [0, 0, 0, 0]
            this.list.forEach((item) => {
                let { charge_user_id, money } = item
                this.allTenants.find((itey, index) => {
                    if (charge_user_id === itey.value) {
                        allData[index] += money
                        return true
                    }
                })
            })
            return {
                title: {
                    text: '租房电费统计图（总）',
                    textStyle: {
                        align: 'center',
                        color: '#fff',
                        fontSize: 20,
                    },
                    top: '3%',
                    left: '10%',
                },
                backgroundColor: '#0f375f',
                grid: {
                    top: '25%',
                    bottom: '10%', //也可设置left和right设置距离来控制图表的大小
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true,
                        },
                    },
                },
                legend: {
                    top: '15%',
                    textStyle: {
                        color: '#ffffff',
                    },
                },
                xAxis: {
                    data: allUsers,
                    axisLine: {
                        show: true, //隐藏X轴轴线
                        lineStyle: {
                            color: '#01FCE3',
                        },
                    },
                    axisTick: {
                        show: true, //隐藏X轴刻度
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#ebf8ac', //X轴文字颜色
                        },
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '元',
                        nameTextStyle: {
                            color: '#ebf8ac',
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: true,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#FFFFFF',
                            },
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#ebf8ac',
                            },
                        },
                    },

                    {
                        type: 'value',
                        gridIndex: 0,
                        min: 50,
                        max: 100,
                        splitNumber: 8,
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)'],
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: '缴纳金额',
                        type: 'bar',
                        barWidth: 15,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#369258',
                                        fontSize: 14,
                                    },
                                },
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#00FFE3',
                                    },
                                    {
                                        offset: 1,
                                        color: '#4693EC',
                                    },
                                ]),
                            },
                        },
                        data: allData,
                    },
                ],
            }
        },
    },
    watch: {
        value(val) {
            if (val) {
                this.init()
            }
        },
    },

    methods: {
        init() {
            Promise.all([
                this.$apis.get_electric_charges({
                    _type: 'all',
                    cache: true,
                    expire_time: 30 * 1000,
                }),
            ])
                .then((res) => {
                    this.list = res[0].data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    this.Toast(err)
                    this.list = []
                })
        },
    },
}
</script>

<style lang="scss" scoped></style>
