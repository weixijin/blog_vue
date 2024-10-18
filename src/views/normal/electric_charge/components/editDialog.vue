<template>
        <e-dialog
            :clickModal="false"
            :footer="!IS_PC"
            :width="IS_PC?'80vw':'95vw'"
            v-model="visable"
            :title="rowCopy._id ? '编辑' : '新增'"
            @closed="dialogClosed"
            @confirm="save"
        >
            <div class="p-20">
                <e-form
                    ref="ruleFormRef"
                    :labelWidth="labelWidth"
                    :formConfig="formConfig"
                    :formRule="rules"
                    :formData="rowCopy"
                ></e-form>
                <div class="h-60vh flex-wrap p-b-20 p-t-10 m-t-10" v-if="IS_PC">
                    <mavonEditor
                        upload_file_url="electric_charge"
                        v-model="rowCopy.charge_string"
                        @save="save"
                    ></mavonEditor>
                </div>
            </div>
        </e-dialog>
</template>

<script>
export default {
    components: {
        mavonEditor: () => import('@/components/mavonEditor/index.vue'),
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        rowInfo:{
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            rowCopy: {
                _id: '',
                charge_string: '',
                charge_html: '',
                charge_user_id: '',
                money: '',
                charge_date: '',
            },
            rules: {
                charge_user_id: [{ required: true, message: '请选择租客', trigger: 'change' }],
                money: [
                    // 范围 0.01-99999999.99
                    {
                        validator: (rule, value, callback) => {
                            if (value && (value < 0.01 || value > 99999999.99)) {
                                callback(new Error('金额范围 0.01-99999999.99'))
                            } else {
                                callback()
                            }
                        },
                    },
                ],
                charge_date: [{ required: true, message: '请选择缴费日期', trigger: 'change' }],
            },
            formConfig: [
                // 分析类型
                {
                    label: '租客',
                    type: 'select',
                    modelName: 'charge_user_id',
                    options: [],
                },
                {
                    label: '金额',
                    type: 'inputNumber',
                    modelName: 'money',
                    className: 'w-220',
                    min: 0.01,
                    max: 9999,
                    precision: 2,
                },
                {
                    label: '缴费日期',
                    type: 'datePicker',
                    isNeedTime: true,
                    modelName: 'charge_date',
                    valueFormat: '',
                    format: '',
                },
            ],
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
        IS_PC(){
            return this.isPc()
        },
        labelWidth(){
            return this.IS_PC?'115px':'80px'
        }
    },
    watch: {
        value(val) {
            if (val) {
                this.init()
            }
        },
    },
    created(){
        this.formConfig[0].options = this.allTenants
    },

    methods: {
        async save({ str: charge_string = '', html: charge_html = '' } = {}) {
            const v = await this.$refs.ruleFormRef.validateFn().catch(() => {
                return false
            })
            if (v === false) return
            Object.assign(this.rowCopy, {
                charge_string,
                charge_html,
            })
            const loading = this.$loading({
                lock: true,
                text: '保存中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })

            const params = this.deepCopy(this.rowCopy)
            if (!params._id) {
                delete params._id
            }

            const { charge_date } = params
            if (charge_date) {
                params.charge_date = new Date(charge_date).getTime()
            }

            this.$apis
                .post_electric_charge(params)
                .then(async (res) => {
                    this.$message.success(res.msg || '操作成功')
                    this.$emit('init',-1)
                    this.$emit('input',false)
                    this.$emit('submit',params,res)
                })
                .catch(() => {})
                .finally(() => {
                    loading.close()
                })
        },
        dialogClosed() {
            this.visable = false
            Object.assign(this.rowCopy, {
                _id: '',
                charge_string: '',
                charge_html: '',
                charge_user_id: '',
                money: '',
                charge_date: '',
            })
        },
        init() {
           Object.assign(this.rowCopy, this.rowInfo)
        },
    },
}
</script>

<style lang="scss" scoped></style>
