<template>
    <div class="p-20">
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_monitors"
            customize
        >
            <template slot="load_time" slot-scope="{ record }">
                <div v-for="(item, index) in record.load_time" :key="index">
                    <div class="t-a-l">{{ item.label }}:{{ item.value }}ms</div>
                </div>
            </template>

            <template slot="netInfo" slot-scope="{ record }">
                <div v-if="isArrayLength(record.netInfo)">
                    <div v-for="(item, index) in record.netInfo" :key="index">
                        <div class="t-a-l">{{ item.label }}:{{ item.value }}</div>
                    </div>
                </div>
                <div class="t-a-l" v-else>--</div>
            </template>

            <template slot="projectDetail" slot-scope="{ record }">
                <el-button size="small" type="danger" @click="del(record._id)">删除</el-button>
            </template>
        </TrainPage>
    </div>
</template>

<script>
export default {
    name: 'jsmindList',
    components: {},
    data() {
        return {
            list: [],
            searchConfig: [
                {
                    label: '用户',
                    type: 'select',
                    modelName: 'author_id',
                    options: async () => {
                        return new Promise((resolve) => {
                            this.$apis
                                .get_authors({
                                    page: 1,
                                    limit: 50,
                                    cache: true
                                })
                                .then((res) => {
                                    const result = res.data.data.map((item) => {
                                        return {
                                            label: item.username,
                                            value: item._id,
                                        }
                                    })

                                    resolve(result)
                                })
                        })
                    },
                },
                {
                    label: '时间范围',
                    type: 'datetimerange',
                    modelName: ['start_time', 'end_time'],
                    isArray: true,
                    valueType: 'timestamp',
                    pickerOptions: this.getPickerOptions()
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { create_time, user_id = {} } = item
                        return {
                            ...item,
                            create_time_: this.klDateFormat(create_time),
                            user_id: user_id.username || '--',
                        }
                    })
                },
                btns:{
                    children:[
                        {
                            label:'可视化',
                            type:'primary',
                            clickFn:(row)=>{
                               this.goTo('/admin/echarts/monitor_echarts')
                            }
                        }
                    ]
                },
                columnObj: [
                    {
                        label: '用户',
                        props: 'user_id',
                    },
                    { label: '加载信息', props: 'load_time', slot: 'load_time' },
                    { label: '网络信息', props: 'netInfo', slot: 'netInfo' },
                    { label: '上报时间', props: 'create_time_' },
                    // {
                    //     label: '操作',
                    //     slot: 'projectDetail',
                    //     width: 150,
                    //     props: 'action',
                    //     lock: true,
                    //     fixed: 'right',
                    // },
                ],
            },
        }
    },
    computed: {
        ...Vuex.mapGetters(['jsmindTypes', 'jsmindTypes1']),
        ...Vuex.mapGetters(['getterNavId', 'isAdmin']),
    },

    methods: {
        getObj1(obj) {
            if (!this.isObject(obj)) {
                return {}
            }

            return
        },
        del(_id) {
            this.$confirm('确认删除该记录吗？')
                .then(() => {
                    this.$apis
                        .del_mind({ _id })
                        .then(() => {
                            this.$message.success('删除成功')
                            this.$refs.TrainPageRef.getAddData()
                        })
                        .catch(() => {})
                })
                .catch(() => {})
        },
    },
}
</script>
