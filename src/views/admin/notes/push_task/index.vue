<template>
    <div>
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_push_tasks"
            customize
        >
        </TrainPage>

        <e-dialog
            class="dialog-center"
            v-model="visable"
            width="600px"
            @closed="handleClose"
            @confirm="confirm"
        >
            <div class="p-l-20 p-r-20">
                <h3 class="h-60 flex-center">
                    {{ dialogTitle }}
                </h3>
                <div class="flex-wrap">
                    <div class="w-60 flex-center-wrap h-40">类型：</div>
                    <el-select
                        @change="typeChange"
                        class="w-505"
                        v-model="rowData.type"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in pushDaskTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>

                <div class="flex-wrap m-t-20" v-if="+rowData.type !== 1">
                    <div class="w-60 flex-center-wrap h-40">日期：</div>

                    <el-select
                        class="w-505"
                        multiple
                        clearable
                        filterable
                        v-model="rowData.time"
                        placeholder="请选择"
                        v-if="[1, 2, 3].includes(+rowData.type)"
                    >
                        <el-option
                            v-for="item in dayOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>

                    <el-date-picker
                        class="w-505"
                        v-else
                        v-model="rowData.time1"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </div>

                <div class="flex-wrap m-t-20">
                    <div class="w-60 flex-center-wrap h-40">内容：</div>
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="rowData.content"
                    >
                    </el-input>
                </div>
                、

                <div class="flex-wrap m-t-20">
                    <div class="w-60 flex-center-wrap h-40">链接：</div>
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="rowData.note_link"
                    >
                    </el-input>
                </div>
            </div>
        </e-dialog>
    </div>
</template>

<script>
import calendar from 'js-calendar-converter'
import adminApi from '@/api/blog/admin'
export default {
    name: 'pushTaskList',
    data() {
        return {
            weekList: [],
            monthList: [],
            visable: false,
            rowData: {
                type: '',
                time: [],
                time1: '',
                content: '',
                note_link: '',
            },
            params: {
                type: '1',
            },
            searchConfig: [
                {
                    label: '分类',
                    type: 'select',
                    modelName: 'type',
                    options: () => {
                        return this.pushDaskTypes
                    },
                },
                {
                    label: '内容',
                    type: 'input',
                    modelName: 'content',
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { content, type } = item
                        return {
                            ...item,
                            _content: content.replace(/\n/g, '<br>'),
                            _time: this.getTime(item),
                            _type: this.getLabel(this.pushDaskTypes, type),
                        }
                    })
                },
                btns: {
                    children: [
                        {
                            label: '新增',
                            type: 'primary',
                            clickFn: (row) => {
                                this.openDialogAdd()
                            },
                        },
                        {
                            label: '每日推送',
                            type: 'success',
                            clickFn: (row) => {
                                this.goTo('/normal/push_task')
                            },
                        },
                    ],
                },
                columnObj: [
                    { label: '分类', props: '_type', width: 150 },
                    {
                        label: '日期',
                        props: '_time',
                        width: 200,
                        html: '_time',
                    },
                    { label: '内容', props: '_content', html: '_content' },
                    {
                        label: '操作',
                        slot: 'projectDetail',

                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        children: [
                            {
                                label: '编辑',
                                type: 'primary',
                                clickFn: (row) => {
                                    this.openDialogEdit(row)
                                },
                            },
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.delteOne(row)
                                },
                            },
                        ],
                    },
                ],
            },
        }
    },
    computed: {
        ...Vuex.mapState(['options', 'keyboardEventKay']),
        pushDaskTypes() {
            let { options } = this
            if (!this.isObject(options)) {
                return []
            }

            return options.pushDaskTypes || []
        },
        taskList() {
            let { type } = this.params
            return this.lists[type] || []
        },
        dialogTitle() {
            return this.rowData._id ? '编辑' : '新增'
        },
        dayOptions() {
            let obj = {
                2: 'weekList',
                3: 'monthList',
            }
            return this[obj[this.rowData.type]] || []
        },
    },
    watch: {
        keyboardEventKay(val) {
            if (val === 'ctrl_s') {
                if (this.visable) {
                    this.confirm()
                }
            }
        },
    },
    mounted() {
        this.weekList = []
        this.monthList = []
        for (let i = 0; i < 7; i++) {
            const str = i + 1 + ''
            let obj = {
                label: `星期${str}`,
                value: str,
            }
            this.weekList.push(obj)
        }
        for (let i = 0; i < 31; i++) {
            const str = i + 1 + ''
            let obj = {
                label: `${str}`,
                value: str,
            }
            this.monthList.push(obj)
        }
    },
    methods: {
        getTime(row) {
            if ([1, 2, 3].includes(+row.type)) {
                return +row.type === 1 ? '---' : row.time
            } else {
                return `<div>阴历： ${this.klDateFormat(row.time - 0, 'yyyy-MM-dd')}</div>
                        <div>阳历： ${this.getYangli(row.time - 0)}</div>`
            }
        },
        // 通过阴历的时间戳获取阳历的yyyy-MM-dd
        getYangli(str) {
            let [yyyy, MM, dd] = this.klDateFormat(str, '[yyyy,MM,dd]')
            let date = calendar.lunar2solar(yyyy, MM, dd)
            let { cYear, cMonth, cDay } = date
            return `${cYear}-${this.addZero(cMonth)}-${this.addZero(cDay)}`
        },
        delteOne({ _id }) {
            this.$confirm('确定删除吗?')
                .then(() => {
                    adminApi
                        .delete_push_task({ _id })
                        .then(() => {
                            this.$message.success('删除成功')
                        })
                        .catch((err) => {
                            this.Toast(err)
                        })
                        .finally(() => {
                            this.initTable()
                        })
                })
                .catch(() => {
                    this.$message.success('取消成功')
                })
        },
        typeChange() {
            Object.assign(this.rowData, {
                time: [],
                content: '',
            })
        },
        openDialogEdit(row) {
            this.visable = true

            this.rowData = this.deepClone(row)
            if (typeof this.rowData.time === 'string') {
                if ([1, 2, 3].includes(+this.params.type)) {
                    this.rowData.time = this.rowData.time.split(',')
                } else {
                    this.rowData.time1 = this.klDateFormat(this.rowData.time - 0, 'yyyy-MM-dd')
                }
            }
        },
        confirm() {
            let { time, content, _id, type, time1, note_link } = this.rowData
            const params = {
                type,
            }
            if (!type) {
                this.$message.error('请选择类型')
                return
            }
            if (!content) {
                this.$message.error('请输入内容')
                return
            }
            params.content = content

            if (note_link) {
                params.note_link = note_link
            }
            if ([2, 3].includes(+type)) {
                if (!this.isArrayLength(time, '请选择日期')) return
                params.time = time.join(',')
            }

            if (_id) {
                params._id = _id
            }

            if (+type === 4) {
                if (!time1) {
                    this.$message.error('请选择日期')
                    return
                }
                // 转为时间戳
                params.time = new Date(time1).getTime()
            }

            adminApi
                .post_push_task(params)
                .then(() => {
                    this.$message.success('操作成功')
                    this.handleClose()
                })
                .catch((err) => {
                    this.Toast(err)
                })
                .finally(() => {
                    this.initTable()
                })
        },
        handleClose() {
            Object.assign(this.rowData, {
                _id: '',
                time: [],
                content: '',
                note_link: '',
            })

            this.visable = false
        },
        openDialogAdd() {
            this.rowData.type = this.params.type
            this.visable = true
        },
    },
}
</script>
