<template>
    <div class="box1" v-loading="isLoading">
        <i class="f-28 el-icon-edit c-primary" v-if="isAdmin" @click="visable = true"></i>
        <van-tabs
            class="xb-van-tabs"
            v-model="active"
            swipeable
            animated
            background="#fcfcfc"
            :lazy-render="false"
        >
            <van-tab title="列表">
                <div class="containner-scroll better-scroll">
                    <div class="item11 m-b-20 p-10" v-for="(item, index) in list" :key="item._id">
                        <div class="m-b-5">序号：{{ index + 1 }}</div>
                        <div class="m-b-5">
                            租户：{{ getLabel(allTenants, item.charge_user_id) }}
                        </div>
                        <div class="m-b-5">缴费金额：{{ item.money }}元</div>
                        <div>缴费日期：{{ klDateFormat(item.charge_date - 0, 'yyyy/MM/dd') }}</div>

                        <el-button size="small" class="m-t-10" v-if="isAdmin" @click="edit(item)"
                            >编辑</el-button
                        >
                    </div>
                </div>
                /></van-tab
            >
            <van-tab title="统计">
                <div
                    :style="{
                        width: width + 'px',
                        height: height + 'px',
                    }"
                >
                    <echartsPage
                        id="echartsBox"
                        :width="width"
                        :height="height"
                        :options="options"
                        v-if="!isLoading && loadScript"
                    ></echartsPage>
                </div>
            </van-tab>
        </van-tabs>

        <!-- 新增编辑弹窗 -->
        <editDialog v-model="visable" :rowInfo="rowCopy" @init="init" />
    </div>
</template>

<script>
import echartsPage from '@/components/echartsPage/index.vue'
export default {
    components: {
        echartsPage,
        editDialog: () => import('@/views/normal/electric_charge/components/editDialog.vue'),
    },
    props: {
        loadScript: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            active: 0,
            isLoading: true,
            list: [],
            width: 375,
            height: 600,
            visable: false,
            rowCopy: {},
        }
    },
    computed: {
        ...Vuex.mapGetters(['allTenants', 'isAdmin']),
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
    mounted() {
        this.init()
    },
    methods: {
        async edit(row) {
            this.rowCopy = this.deepClone(row)
            if (row.charge_date) {
                this.rowCopy.charge_date = this.klDateFormat(row.charge_date)
            }
            await this.sleep(50)
            this.visable = true
        },
        init(expire_time = 30 * 1000) {
            // 获取可视区高度与宽度
            const { width, height } = this.getViewportSize()

            this.width = width
            this.height = height - 44

            Promise.all([
                this.$apis.get_electric_charges({
                    _type: 'all',
                    cache: true,
                    expire_time,
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

<style lang="scss" scoped>
.box1 {
    width: 100vw;
    height: 100vh;
}
.containner-scroll {
    height: calc(100vh - 44px);
    overflow-y: auto;
    background-color: #fff;
    padding: 10px;
}
.item11 {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    -webkit-backdrop-filter: saturate(130%) blur(20px);
    backdrop-filter: saturate(130%) blur(20px);
    transition: 0.6s var(--ease-out-cubic);
}

/* 设置高亮线 */
::v-deep {
    .xb-van-tabs {
        .van-tabs__wrap {
            border-bottom: 1px solid #f1f1f1;
        }
    }
    .xb-van-tabs .van-tabs__line {
        width: 20px !important;
        height: 2px !important;
        background: $primary;
        border-radius: 0 !important;
    }

    /* 设置底线 */
    .van-tabs--line::after {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 0.02rem;
        background: #f5f5f5;
    }
}

.el-icon-edit {
    position: fixed;
    right: 20px;
    bottom: 50px;
    z-index: 999;
}
</style>
