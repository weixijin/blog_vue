<template>
    <div :class="[isAdminPage ? '' : 'p-20 bg-f7f8fa']">
        <TrainPage 
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_electric_charges"
            customize
        >
            <template slot="edit_users" slot-scope="{ record }">
                <userList :list="record.edit_users"></userList>
            </template>
        </TrainPage>

        <!-- 新增编辑弹窗 -->
        <editDialog v-model="visable" :rowInfo="rowCopy" @submit="submit" />

        <!-- 统计弹窗 -->
        <tjDialog v-model="visable1" :list="tableData" />
    </div>
</template>

<script>
export default {
    components: {
        tjDialog: () => import('@/views/normal/electric_charge/components/tjDialog.vue'),
        editDialog: () => import('@/views/normal/electric_charge/components/editDialog.vue'),
    },
    data() {
        return {
            tableData: [],
            visable1: false,
            rowCopy: {
                _id: '',
                charge_string: '',
                charge_html: '',
                charge_user_id: '',
                money: '',
                charge_date: '',
            },

            visable: false,
            searchConfig: [
                {
                    label: '租客',
                    type: 'select',
                    modelName: 'charge_user_id',
                    options: () => {
                        return this.allTenants
                    },
                },
                {
                    label: '缴费日期',
                    type: 'datetimerange',
                    modelName: ['start_time', 'end_time'],
                    isArray: true,
                    valueType: 'timestamp',
                    pickerOptions: {
                        shortcuts: [
                            {
                                text: '本月',
                                onClick: (picker) => {
                                    let [yyyy, MM] = this.klDateFormat(Date.now(), '[yyyy,MM]')
                                    const str2 = `${yyyy}/${MM}/01 00:00:00`
                                    const start = new Date(str2)
                                    const end = new Date(
                                        this.klDateFormat(
                                            new Date(str2).getTime() +
                                                3600 * 1000 * 24 * this.getDaysInMonth(yyyy, MM) -
                                                1,
                                        ),
                                    )
                                    picker.$emit('pick', [start, end])
                                },
                            },
                            {
                                text: '上月',
                                onClick: (picker) => {
                                    let [yyyy, MM] = this.klDateFormat(Date.now(), '[yyyy,MM]')
                                    if (+MM === 1) {
                                        yyyy = yyyy - 1
                                        MM = 12
                                    } else {
                                        MM = MM - 1
                                    }

                                    const str2 = `${yyyy}/${MM}/01 00:00:00`
                                    const start = new Date(str2)
                                    const end = new Date(
                                        this.klDateFormat(
                                            new Date(str2).getTime() +
                                                3600 * 1000 * 24 * this.getDaysInMonth(yyyy, MM) -
                                                1,
                                        ),
                                    )
                                    picker.$emit('pick', [start, end])
                                },
                            },

                            {
                                text: '往前半年',
                                onClick(picker) {
                                    const end = new Date()
                                    const start = new Date()
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
                                    picker.$emit('pick', [start, end])
                                },
                            },
                        ],
                    },
                },
            ],
        }
    },
    watch: {
        visable(val) {
            if (val) {
                this.setImgp()
            }
        },
    },
    computed: {
        ...Vuex.mapGetters(['allTenants', 'isAdmin']),
        isAdminPage() {
            return this.$route.path.includes('admin')
        },
        tableConfig() {
            const result = {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return this.handlerTableData(data)
                },
                btns: {
                    children: [
                        {
                            label: '新增',
                            type: 'primary',
                            show: ()=>{
                                return this.isAdmin
                            },
                            clickFn: () => {
                                this.openDialog()
                            },
                        },
                        {
                            label: '查看统计',
                            type: 'success',
                            clickFn: (row) => {
                                this.openTjDialog(row)
                            },
                        },
                        {
                            label: '复制nomal用户链接',
                            type: 'info',
                            show: async()=>{
                               return this.isAdmin
                            },
                            clickFn: () => {
                                this.copy()
                            },
                        },
                    ]
                },
                columnObj: [
                    {
                        label: '租客',
                        props: '_charge_user_id',
                    },
                    { label: '缴费金额（元）', props: 'money' },

                    { label: '缴费日期', props: '_charge_date' },
                    { label: '更新日期', props: 'update_time_',minWidth:150 },
                    { label: '创建日期', props: 'create_time_' ,minWidth:150},
                    {
                        label: '备注',
                        minWidth: 200,
                        props: 'charge_html',
                        html: 'charge_html',
                    },
                ],
            }

            if (this.isAdmin) {
                result.columnObj.push({
                    label: '操作',
                    slot: 'projectDetail',
      
                    props: 'action',
                    lock: true,
                    fixed: 'right',
                    children: [
                        {
                            label: '编辑',
                            type: 'success',
                            clickFn: (row) => {
                                this.edit(row)
                            },
                        },
                        {
                            label: '删除',
                            type: 'danger',
                            clickFn: (row) => {
                                this.delFn(row._id)
                            },
                        },
                    ],
                })
            }
            return result
        },
    },
    methods: {
        copy() {
            this.copyText(location.host + '/#/normal/electric_charge').then((_) => {
                this.$message.success('复制成功')
            })
        },
        openTjDialog() {
            this.tableData = this.$refs.TrainPageRef.tableData
            this.visable1 = true
        },

        async delFn(_id) {
            let res = await this.$confirm('确定删除吗？').catch(() => {
                return false
            })
            if (res === false) return
            this.$apis.del_ctric_charges({ _id }).then(() => {
                this.$message.success('删除成功')
                this.initTable()
            })
        },
        handlerTableData(list) {
            return list.map((item) => {
                let { charge_user_id, create_time, update_time, charge_date } = item
                return {
                    ...item,
                    _charge_user_id: this.allTenants.find((item) => item.value === charge_user_id)
                        .label,
                    _charge_date: this.klDateFormat(charge_date, 'yyyy/MM/dd'),
                    create_time_: this.klDateFormat(create_time),
                    update_time_: this.klDateFormat(update_time),
                }
            })
        },

        async setImgp(target = '.el-table img') {
            await this.sleep()
            let imgList = document.querySelectorAll(target)
            // 所有图片加载完毕后，设置预览事件
            let imgListArr = Array.from(imgList)
            for (let i = 0; i < imgListArr.length; i++) {
                let item = imgListArr[i]
                // 是否已经绑定，防止重复绑定
                item.removeEventListener('click', () => {})
                item.addEventListener('click', () => {
                    this.prevewImg(item)
                })
            }
        },

        async edit(row) {
            this.rowCopy = this.deepClone(row)
            if (row.charge_date) {
                this.rowCopy.charge_date = this.klDateFormat(row.charge_date)
            }
            await this.sleep(50)
            this.visable = true
        },
        submit(params = {}, res = {}) {
            this.visable = false
            if (!params._id) {
                this.initTable()
                return
            }

            this.$refs.TrainPageRef.tableData = this.handlerTableData(
                this.$refs.TrainPageRef.tableData.map((item) => {
                    if (item._id === res.data.data._id) {
                        return res.data.data
                    }
                    return item
                }),
            )
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
        openDialog() {
            // 默认当前时刻
            this.rowCopy.charge_date = new Date()
            this.visable = true
        },
    },
}
</script>

<style lang="scss" scoped></style>
