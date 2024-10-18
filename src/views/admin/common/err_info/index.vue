<template>
    <div class="err_info_list c-555">
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_errs"
            customize
            :othData="othData"
        >
            <template slot="btnList">
                <el-button type="danger" size="small" @click="deleteErrs(null)">
                    按条件删除
                </el-button>
            </template>
        </TrainPage>

        <!--详情弹窗 -->
        <e-dialog title="详情" v-model="dialogVisible" width="65%" :footer="false">
            <div class="p-20">
                <div
                    class="m-b-10 flex-wrap"
                    v-for="(value, key) in getRowData(rowData)"
                    :key="key"
                >
                    <div class="flex-0 w-90 t-a-r">
                        {{ key }}
                    </div>
                    :
                    <div class="m-l-10">
                        <div v-if="isObject(value)">
                            {
                            <div
                                class="m-b-10 flex-wrap"
                                v-for="(value1, key1) in value"
                                :key="key1"
                            >
                                <div class="flex-0 w-90 t-a-r">
                                    {{ key1 }}
                                </div>
                                :
                                <div class="m-l-10">
                                    {{ value1 }}
                                </div>
                            </div>
                            }
                        </div>
                        <template v-else>
                            {{ value }}
                        </template>
                    </div>
                </div>
            </div>
        </e-dialog>
    </div>
</template>

<script>
import httpApi from '@/api/blog/admin.js'

export default {
    data() {
        return {
            dialogVisible: false,
            rowData: {},
            othData: {},
            searchConfig: [
                {
                    label: '错误内容',
                    type: 'input',
                    modelName: 'content',
                },
                {
                    label: '平台',
                    type: 'select',
                    modelName: 'type',
                    options: () => {
                        return this.errsTypeOptions
                    },
                },
                {
                    label: '时间范围',
                    type: 'datetimerange',
                    modelName: ['start', 'end'],
                    isArray: true,
                    valueType: 'timestamp',
                    pickerOptions: this.getPickerOptions(),
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { create_time, type } = item
                        return {
                            ...item,
                            create_time_: this.klDateFormat(create_time),
                            type: this.getLabel(this.errsTypeOptions, type),
                        }
                    })
                },
                columnObj: [
                    {
                        label: '时间',
                        props: 'create_time_',
                        width: '200px',
                    },
                    { label: '平台', props: 'type', width: '150px' },
                    { label: '链接/接口', props: 'url' },
                    { label: '错误内容', props: 'content' },
                    {
                        label: '操作',
                 
                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        slot: 'projectDetail',
                        children:[
                            {
                                label: '查看项情',
                                type: 'primary',
                                clickFn: (row) => {
                                    this.handTableEvent('edit',row)
                                },
                            },
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.handTableEvent('delete',row)
                                },
                            }
                            
                        ]
                    },
                ],
            },

            tableData: [],
            pageOption: {
                page: 1,
                limit: 30,
                pageSizes: [30, 50, 100],
                total: 0,
            },

            query: {
                content: '',
                start: '',
                end: '',
                type: '',
            },

            timeArr: '',
        }
    },
    computed: {
        ...Vuex.mapState(['options', 'RP']),
        ...Vuex.mapGetters(['errsTypeOptions']),
    },

    methods: {
        getPickerOptions() {
            const that = this
            return {
                shortcuts: [
                    {
                        text: '今日',
                        onClick(picker) {
                            const [yyyy, MM, dd] = that.klDateFormat(new Date(), '[yyyy,MM,dd]')
                            const end = new Date(`${yyyy}-${MM}-${dd} 23:59:59`)
                            const start = new Date(`${yyyy}-${MM}-${dd} 00:00:00`)
                            start.setTime(start.getTime())
                            picker.$emit('pick', [start, end])
                        },
                    },
                    {
                        text: '本周',
                        onClick(picker) {
                            const [yyyy, MM, dd] = that.klDateFormat(new Date(), '[yyyy,MM,dd]')
                            let week = that.getWeek(yyyy, MM, dd)
                            const currentTime = new Date(`${yyyy}-${MM}-${dd} 23:59:59`).getTime()
                            const start = new Date()
                            const end = new Date(that.klDateFormat(currentTime + (7-week) * 3600*24*1000))
                            start.setTime(currentTime+1000 - 3600 * 1000 * 24 *week)
                            picker.$emit('pick', [start, end])
                        },
                    },
                    {
                        text: '本月',
                        onClick(picker) {
                            const [yyyy, MM, dd] = that.klDateFormat(new Date(), '[yyyy,MM,dd]')
                            // 获取这个月天数
                            const days = that.getMonthDays(yyyy, MM)
                            const currentTime = new Date(`${yyyy}-${MM}-${dd} 23:59:59`).getTime()
                            const start = new Date()
                            const end = new Date(that.klDateFormat(currentTime + (days-dd) * 3600*24*1000))
                            start.setTime(currentTime+1000 - 3600 * 1000 * 24 *days)
                            picker.$emit('pick', [start, end])
                        },
                    },
                    {
                        text: '最近半年',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
                            picker.$emit('pick', [start, end])
                        },
                    },
                ],
            }
        },
        getRowData(val) {
            if (val.url) {
                try {
                    val.url = JSON.parse(val.url)
                } catch (err) {
                    val.url = val.url
                }
            }
            if (val.content) {
                try {
                    val.content = JSON.parse(val.content)
                } catch (err) {
                    val.content = val.content
                }
            }
            return val
        },
        handTableEvent(key, row) {
            switch (key) {
                case 'delete':
                    this.deleteErrs(row)
                    break
                case 'edit':
                    this.dialogVisible = true
                    this.rowData = row
                    break
            }
        },
        deleteErrs(row) {
            let str = '此操作将按条件全部删除, 是否继续?'
            let rowType = this.getType(row)
            if (rowType == 'object') {
                str = '确定删除吗？'
            }
            this.$confirm(str, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    let query = {
                        my_type: 0,
                    }
                    if (rowType == 'object') {
                        query._id = row._id
                    } else {
                        // 按条件删除
                        let { content, start, end, type } = this.$refs.TrainPageRef.searchData ?? {}
                        query = {
                            content,
                            start,
                            end,
                            type,
                            my_type: 1,
                        }
                    }
                    query = this.filterQuery(query)
                    if (Object.keys(query).length == 1) {
                        this.$message({
                            type: 'error',
                            message: '请先选择条件',
                        })
                        return
                    }
                    httpApi
                        .del_errs(query)
                        .then((res) => {
                            this.$message.success(res.msg || '操作成功')
                            this.initTable({},false,false)
                        })
                        .catch((err) => {
                            this.saveError(err)
                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                })
        },
    },
}
</script>

<style lang="scss" scoped></style>
