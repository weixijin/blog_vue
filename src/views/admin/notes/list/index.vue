<template>
    <div>
        <!-- 搜索条件 -->
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_notes"
            customize
            @getSelectionList="getSelectionList"
        >
            <!-- <template slot="btnList">
                <el-button class="h-40" type="success" @click="addTableData">新增纪要</el-button>
                <el-button type="warning" class="m-l-30 h-40" @click="openExportDialog"
                    >导出</el-button
                >
            </template> -->

            <template slot="note_need_remind" slot-scope="{ record }">
                <el-switch
                    v-model="record.note_need_remind"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="handleTable('put_note', record)"
                >
                </el-switch>
            </template>

            <template slot="note_progress" slot-scope="{ record }">
                <el-input v-model="record.note_progress" @change="handleTable('put_note', record)">
                </el-input>
            </template>

            <template slot="note_done" slot-scope="{ record }">
                <el-dropdown @command="handleTypeCommand">
                    <span class="el-dropdown-link cu">
                        {{ record.note_done | filterNoteDone(that) }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            :command="beforeHandleCommand(record, item.value)"
                            v-for="item in noteDoneType"
                            :key="item.value"
                            >{{ item.label }}</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </template>

            <template slot="note_content" slot-scope="{ record }">
                <div
                    :class="['cu note-content f-550', colorType(record)]"
                    @click="editTable(record, true)"
                    v-html="record.note_content.replace(/\n/g, '<br>')"
                ></div>
                <div
                    :class="['cu note-content', colorType(record)]"
                    @click="editTable(record, true)"
                    v-html="record.note_details.replace(/\n/g, '<br>')"
                ></div>

                <template v-if="+record.note_type === 7">
                    <div v-if="record.note_backend_name" class="t-a-l m-t-10">
                        后端：{{ getArrayLabel(record.note_backend_name, 'houUserList') }}
                        {{ record._note_backend_time }}
                    </div>
                    <div v-if="record.note_test_name" class="t-a-l">
                        测试：{{ getArrayLabel(record.note_test_name, 'ceUserList') }}
                    </div>
                    <div v-if="record.note_ui_name" class="t-a-l">
                        ui：{{ getArrayLabel(record.note_ui_name, 'uiUserList') }}
                        {{ record._note_ui_time }}
                    </div>
                </template>

                <div class="t-a-l m-t-10">
                    <el-button
                        size="mini"
                        v-if="+record.note_type === 7"
                        type="primary"
                        @click="copyText1(record.note_content.replace(/\n/g, '<br>'))"
                        >复制任务名</el-button
                    >
                    <el-button
                        v-if="record.note_link"
                        type="success"
                        size="mini"
                        @click="goTo(record.note_link, { target: '_blank' })"
                        >链接</el-button
                    >

                    <el-button
                        v-if="record.note_ui_link"
                        type="info"
                        size="mini"
                        @click="goTo(record.note_ui_link, { target: '_blank' })"
                        >ui链接</el-button
                    >

                    <el-button
                        v-if="record.note_brain_link"
                        type="warning"
                        size="mini"
                        @click="goTo(record.note_brain_link, { target: '_blank' })"
                        >脑图链接</el-button
                    >
                </div>
            </template>

            <template slot="author_name" slot-scope="{ record }">
                {{ record?.author_id?.username || '---' }}
            </template>
            <!-- <template slot="projectDetail" slot-scope="{ record }">
                <el-button size="mini" type="text" @click="editTable(record)">编辑</el-button>
                <el-button
                    class="m-l-5"
                    size="mini"
                    type="text"
                    @click="handleTable('delete', record)"
                    >删除</el-button
                >
            </template> -->
        </TrainPage>

        <!-- 新增与编辑纪要弹窗 -->
        <NoteEditDialog
            ref="noteEditDialogRef"
            :activeDate="activeDate"
            :title="noteDialogTitle"
            :editNoteId="editNoteId"
            @determine="determineEditDialog"
        />

        <!-- 导出弹窗 -->
        <exportDialog v-model="exportVisible" :list="exportList" />
    </div>
</template>

<script>
import exportDialog from '@/views/admin/notes/list/components/exportDialog.vue'
import NoteEditDialog from '@/mixins/components/kl-calendar/components/noteEditDialog.vue'
import { postNote, putNote, deleteNote, putAuthor } from '@/api/blog'

export default {
    components: {
        NoteEditDialog,
        exportDialog,
    },
    data() {
        return {
            searchConfig: [
                {
                    label: '纪要搜索',
                    type: 'input',
                    modelName: 'content',
                },
                {
                    label: '完成状态',
                    type: 'select',
                    modelName: 'note_done',
                    isMuli: true,
                    options: () => {
                        return this.options.noteDoneType ?? []
                    },
                },
                {
                    label: '纪要分类',
                    type: 'select',
                    modelName: 'note_type',
                    options: () => {
                        return this.options.summaryTypeOptions ?? []
                    },
                },
                {
                    label: '任务权重',
                    type: 'select',
                    modelName: 'note_weight_import',
                    options: () => {
                        return [1, 2, 3, 4, 5].map((item) => {
                            return {
                                label: item,
                                value: item,
                            }
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
                isSelection: true,
                maxHeightFlag: false,
                stripe: true,
                tableIndex: false,
                filterData: (data) => {
                    return this.handlerTableData(data)
                },
                btns:{
                    children:[
                        {
                            label: '新增纪要',
                            type: 'success',
                            clickFn: (row) => {
                                this.addTableData()
                            },
                        },
                        {
                            label: '导出',
                            type: 'warning',
                            clickFn: (row) => {
                                this.openExportDialog()
                            },
                        },
                    ]
                },
                columnObj: [
                    {
                        label: '是否需要提醒',
                        props: 'note_need_remind',
                        slot: 'note_need_remind',
                        width: '130px',
                    },
                    { label: '完成状态', props: 'note_done', slot: 'note_done', width: '100px' },
                    {
                        label: '纪要内容',
                        props: 'note_content',
                        slot: 'note_content',
                        minWidth: '300px',
                    },
                    { label: '版本', props: 'note_version', width: '140px', sortable: true },
                    { label: '所属项目', props: 'note_types_', width: '150px' },
                    { label: '权重', props: 'note_weight_import', width: '60px' },
                    {
                        label: '纪要进度',
                        props: 'note_progress',
                        width: 100,
                        slot: 'note_progress',
                    },
                    {
                        label: '开始时间',
                        props: 'note_begin_time_',
                        sortable: true,
                        width: '120px',
                    },

                    {
                        label: '提测时间',
                        props: 'note_testing_time_',
                        sortable: true,
                        width: '120px',
                    },
                    { label: '结束时间', props: 'note_end_time_', sortable: true, width: '120px' },
                    {
                        label: '完成时间',
                        props: 'note_complete_time_',
                        sortable: true,
                        width: '120px',
                    },

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
                                    this.editTable(row)
                                },
                            },
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.handleTable('delete',row)
                                },
                            }
                        ],
                    },
                ],
            },

            exportList: [],
            selectList: [],

            exportVisible: false,
            noteDialogTitle: '', // 编辑纪要类型提示标题
            editNoteId: '', // 编辑的纪要id
            activeDate: [], // 当前选中的日期 默认今日
            isLoading: true,
            pickerOptions: {
                shortcuts: [
                    {
                        text: '近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        },
                    },
                    {
                        text: '近两月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 60)
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
                    {
                        text: '未来一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        },
                    },
                ],
            },
            timeRang: [], // 时间范围
            that: this,
            dialogOptionTable: {
                note_list_type: '',
                options: [
                    {
                        value: 'note_updata_time',
                        label: '更新时间',
                    },
                    {
                        value: 'note_weight_import',
                        label: '主任务权重',
                    },
                    {
                        value: 'note_need_remind',
                        label: '是否需要提醒',
                    },
                    {
                        value: 'note_end_time',
                        label: '结束时间',
                    },
                ],

                defaultProps: {
                    children: 'children',
                    label: 'label',
                },
                dialogVisible: false,
                title: '表格项配置',
                defaultCheckKeys: [],
            },

            dialogOptionOne: {
                dialogVisible: false,
                title: '编辑',
                key: '',
                formData: {
                    _id: '',
                    note_content: '',
                    note_need_remind: '',
                    note_weight_import: '',
                    note_begin_time: '',
                    note_end_time: '',
                    note_done: '',
                    note_progress: '',
                    note_type: '',
                    note_weight: 100,
                    note_ancestors_id: '',
                    note_father_id: '',
                    children: [],
                },
            },
            filterRow: [],
            dialogOption: {
                dialogVisible: false,
                title: '新增',
                _id: '',

                ruleForm: {
                    _id: '',
                    note_content: '',
                    note_need_remind: false,
                    note_begin_time: '',
                    note_end_time: '',
                    note_done: '1',
                    note_progress: 0,
                    task_time: [],
                    note_type: '7',
                    note_weight_import: 1,
                    note_weight: 100,
                    note_ancestors_id: '',
                    note_father_id: '',
                    children: [],
                },
                rules: {
                    note_content: [
                        { required: true, message: '请输入纪要', trigger: 'blur' },
                        { min: 1, message: '长度大于0', trigger: 'blur' },
                    ],
                    note_progress: [{ min: 0, max: 100, message: '0~100', trigger: 'blur' }],
                },
            },

            summaryTypeOptions: [],
        }
    },

    filters: {
        filterNoteDone(val, that) {
            let typeObj = that.noteDoneType.find((item) => item.value == val)
            if (typeObj) {
                return typeObj.label
            }
            return '未知'
        },
        filterNoteType(val, that) {
            let option = that.summaryTypeOptions.find((item) => +item.value === +val)
            return option ? option.label : '没有配置'
        },
        filterAuthorsTime(val, that) {
            return val ? that.klDateFormat(val - 0, 'yyyy-MM-dd') : '没有设置'
        },
    },
    computed: {
        ...Vuex.mapState(['userdata', 'options']),
        ...Vuex.mapGetters([
            'noteWprkTypesOptions',
            'houUserList',
            'ceUserList',
            'uiUserList',
            'isAdmin',
        ]),

        noteDoneType() {
            return this.options.noteDoneType ?? []
        },

        colorType() {
            return (val) => {
                let { note_need_remind, note_end_time, note_done } = val
                if (note_done == 2) {
                    return 'c-success'
                }
                if (note_done == 3) {
                    return 'c-danger'
                }
                if (note_need_remind && note_done == 1) {
                    let newTime = Date.now()
                    let time1 = note_end_time - newTime
                    if (time1 <= 0) {
                        return 'c-danger'
                    }

                    if (time1 > 0 && time1 < 7 * 24 * 3600 * 1000) {
                        return 'c-warning'
                    }

                    return 'c-primary'
                }
                return ''
            }
        },
    },

    created() {
        if (this.isAdmin) {
            this.searchConfig.push({
                label: '用户',
                type: 'select',
                modelName: '_user_id',
                options: async () => {
                    return new Promise((resolve) => {
                        this.$apis
                            .get_authors({
                                page: 1,
                                limit: 50,
                                cache: true,
                                expire_time: 3600 * 1000,
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
            })
        }
    },

    methods: {
        ...Vuex.mapMutations(['setUserData']),

        getArrayLabel(val, key) {
            if (!val) {
                return '--'
            }
            const arr1 = val.split(',')
            const arr = []
            const arr2 = this[key] || []
            arr1.forEach((item) => {
                const user = arr2.find((user) => user.value == item)
                if (user) {
                    arr.push(user.label)
                }
            })

            return this.isArrayLength(arr) ? arr.join(',') : '--'
        },

        getnotetypeslables(note_types) {
            if (!note_types) {
                return ''
            }
            let result = []
            note_types.split(',').forEach((item) => {
                this.noteWprkTypesOptions.find((itey) => {
                    if (itey.value == item) {
                        result.push(itey.label)
                    }
                })
            })
            return result.join(',')
        },
        getSelectionList(row) {
            this.selectList = row
        },
        // 导出任务
        openExportDialog() {
            let { selectList } = this
            if (!this.isArrayLength(selectList)) {
                this.$message.error('请选择需要导出的任务')
                return
            }

            // 排序规则
            // note_version 迭代版本
            // note_types 不同项目
            // 分支内容

            // 示例结构
            // const list = [
            //     {
            //         note_version: 'v1',
            //         note_types: 'pc',
            //         children: [
            //             {
            //                 note_content: '',
            //             },
            //         ],
            //     },
            // ]
            const list = []

            let newSelectList = this.deepCopy(selectList)
            let isFlag = false
            newSelectList.find((item) => {
                if (!item.note_types) {
                    this.$message.warning(`请补充${item.note_content}-note_types`)
                    isFlag = true
                    return true
                }
                item.note_types.split(',').forEach((item1) => {
                    list.push({
                        ...item,
                        note_type1: item1,
                    })
                })
            })
            if (isFlag) return

            const result = []
            list.find((item) => {
                let { note_content, note_version, note_type1, _id } = item
                if (!note_version) {
                    this.$message.warning(`请补充${item.note_content}-note_version`)
                    isFlag = true
                    return true
                }

                let index = result.findIndex((itey) => {
                    return itey.note_version === note_version && itey.note_type1 === note_type1
                })
                const obj = {
                    note_version,
                    note_type1,
                    children: [
                        {
                            note_content,
                        },
                    ],
                }
                if (index === -1) {
                    result.push(obj)
                } else {
                    result[index].children.push({
                        _id,
                        note_content,
                    })
                }
            })
            if (isFlag) return

            this.exportList = result
            this.exportVisible = true
        },
        copyText1(str) {
            this.copyText(str)
                .then(() => {
                    this.$message.success('复制成功')
                })
                .catch(() => {
                    this.$message.error('复制失败')
                })
        },
        handleSelectionChange(val) {
            this.selectList = val
        },

        addTableData() {
            this.noteDialogTitle = '新增纪要'
            this.editNoteId = ''
            this.activeDate = this.klDateFormat(Date.now(), '[yyyy,MM,dd]')
            let { noteEditDialogRef } = this.$refs
            noteEditDialogRef && noteEditDialogRef.init()
        },
        editTable(row, isDb = false) {
            let { _id, note_link } = row
            const fun = () => {
                this.noteDialogTitle = '编辑纪要'
                this.editNoteId = _id
                let { noteEditDialogRef } = this.$refs
                noteEditDialogRef && noteEditDialogRef.init()
            }
            if (!isDb) {
                fun()
                return
            }

            this.dbClick().then(() => {
                if (note_link) {
                }
                fun()
            })
        },
        handlerTableData(row) {
            return row.map((item) => {
                let {
                    note_begin_time,
                    note_testing_time,
                    note_end_time,
                    note_complete_time,
                    note_types = [],
                    note_backend_time,
                    note_ui_time,
                } = item
                return {
                    ...item,
                    note_begin_time_: this.klDateFormat(note_begin_time, 'yyyy-MM-dd'),
                    note_testing_time_: this.klDateFormat(note_testing_time, 'yyyy-MM-dd'),
                    note_end_time_: this.klDateFormat(note_end_time, 'yyyy-MM-dd'),
                    note_complete_time_: this.klDateFormat(note_complete_time, 'yyyy-MM-dd'),
                    note_types_: this.getnotetypeslables(note_types),
                    _note_backend_time: this.klDateFormat(note_backend_time, 'yyyy-MM-dd'),
                    _note_ui_time: this.klDateFormat(note_ui_time, 'yyyy-MM-dd'),
                }
            })
        },
        determineEditDialog(row = null) {
            if (row) {
                this.$refs.TrainPageRef.tableData = this.handlerTableData(
                    this.$refs.TrainPageRef.tableData.map((item) => {
                        if (item._id === row._id) {
                            return row
                        }
                        return item
                    }),
                )

                return
            }
            this.initTable()
        },

        // 组装值
        beforeHandleCommand(row, command) {
            return {
                row,
                command,
            }
        },
        // 切换状态
        handleTypeCommand(commandObj) {
            let {
                command,
                row: { _id },
            } = commandObj
            let params = {
                _id,
                note_done: command,
                type: 1,
            }

            this.noteList = []
            putNote(params)
                .then((res) => {
                    this.$message.success(res.msg)
                })
                .catch((_) => {})
                .finally(() => {
                    this.initTable()
                })
        },
        handleDialogTable(type, row, key) {
            let obj = {
                open: () => {
                    this.setUserConfig()
                    this.dialogOptionTable.currentCheckIds = this.deepClone(
                        this.dialogOptionTable.defaultCheckKeys,
                    )
                    this.dialogOptionTable.dialogVisible = true
                },
                close: () => {
                    this.dialogOptionTable.dialogVisible = false
                    this.handleDialogTable('clear')
                },
                clear: () => {},
                determine: () => {
                    let params = {}
                    let { currentCheckIds, note_list_type } = this.dialogOptionTable
                    if (!currentCheckIds.length) {
                        params.note_list_column_arr = ''
                    } else {
                        params.note_list_column_arr = currentCheckIds.join(',')
                    }

                    if (note_list_type) {
                        params.note_list_type = note_list_type
                    }

                    putAuthor(params)
                        .then((res) => {
                            this.$message.success(res.msg)
                            let userdata = this.deepClone(this.userdata)
                            userdata.note_list_type = note_list_type
                            userdata.note_list_column_arr = params.note_list_column_arr
                            this.setUserData({ user: userdata })
                            this.handleDialogTable('close')
                            this.dialogOptionTable.defaultCheckKeys = currentCheckIds

                            this.initTable()
                        })
                        .catch((_) => {})
                },
            }
            if (type && Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },

        handleDialogOne(type, row, key) {
            let obj = {
                close: () => {
                    let { key } = this.dialogOptionOne
                    this.dialogOptionOne.formData[key] = ''
                    this.dialogOptionOne.key = ''
                    this.dialogOptionOne.dialogVisible = false
                },
                determine: async () => {
                    let { key, formData } = this.dialogOptionOne
                    if (['note_begin_time', 'note_end_time'].includes(key)) {
                        formData[key] = new Date(formData[key]).getTime()
                    }
                    let params = {}

                    if (key === 'note_end_time') {
                        params[key] = formData[key] + 24 * 3600 * 1000 - 1000
                    } else {
                        params[key] = formData[key]
                    }

                    params._id = formData._id
                    if (key !== 'note_content') {
                        params.type = 1
                    }
                    putNote(params)
                        .then((res) => {
                            this.$message.success(res.msg)
                            this.noteList = []

                            this.initTable()
                            this.handleDialogOne('close')
                        })
                        .catch((_) => {})
                },
            }
            if (type && Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },

        handleDialog(type, row) {
            let { dialogOption } = this
            let obj = {
                edit: () => {
                    dialogOption.title = '编辑'
                    // 设置
                    let newRow = this.deepClone(row)
                    let { note_begin_time, note_end_time, note_type } = newRow
                    note_begin_time = note_begin_time ? this.moment(newRow.note_begin_time - 0) : ''
                    note_end_time = note_end_time ? this.moment(newRow.note_end_time - 0) : ''

                    // 对于纪要分类需要单独处理
                    newRow.note_type = note_type

                    newRow.note_begin_time = note_begin_time
                    newRow.note_end_time = note_end_time
                    newRow.task_time = [newRow.note_begin_time, newRow.note_end_time]
                    this.dialogOption.ruleForm = newRow
                    dialogOption.dialogVisible = true
                },
                open: () => {
                    if (row && row._id) {
                        let { _id, note_ancestors_id } = row
                        dialogOption.title = '新增子任务'
                        this.dialogOption.ruleForm.note_father_id = _id
                        if (note_ancestors_id) {
                            this.dialogOption.ruleForm.note_ancestors_id = note_ancestors_id
                        } else {
                            this.dialogOption.ruleForm.note_ancestors_id = _id
                        }
                    } else {
                        dialogOption.title = '新增主任务'
                    }
                    this.dialogOption.ruleForm.note_need_remind = false
                    this.dialogOption.ruleForm.note_weight_import = 5
                    dialogOption.dialogVisible = true

                    // 对时间赋初值
                    let newTime = Date.now()
                    let note_begin_time = this.moment(newTime, 3)
                    let note_end_time = this.moment(newTime, 3) + ' 23:59:59'
                    this.dialogOption.ruleForm.note_begin_time = note_begin_time
                    this.dialogOption.ruleForm.note_end_time = note_end_time
                    this.dialogOption.ruleForm.task_time = [note_begin_time, note_end_time]
                },
                clear: () => {
                    this.dialogOption.ruleForm = {
                        _id: '',
                        note_content: '',
                        note_need_remind: false,
                        note_begin_time: '',
                        note_end_time: '',
                        note_done: '1',
                        note_progress: 0,
                        task_time: [],
                        note_type: [],
                        note_weight_import: 1,
                        note_father_id: '',
                        note_ancestors_id: '',
                        note_weight: 100,
                        children: [],
                    }
                    this.dialogOption.title = ''
                    this.dialogOption._id = ''
                },
                close: () => {
                    this.handleDialog('clear')
                    dialogOption.dialogVisible = false
                },
                determine: async () => {
                    this.$refs['addoreditRef'].validate((valid) => {
                        if (valid) {
                            dialogOption.ruleForm.note_begin_time = new Date(
                                dialogOption.ruleForm.task_time[0],
                            ).getTime()
                            dialogOption.ruleForm.note_end_time = new Date(
                                dialogOption.ruleForm.task_time[1],
                            ).getTime()

                            if (dialogOption.title.includes('新增')) {
                                postNote(dialogOption.ruleForm)
                                    .then((res) => {
                                        this.$message.success(res.msg)
                                        this.handleDialog('clear')
                                        this.initTable()
                                        this.handleDialog('close')
                                    })
                                    .catch((_) => {})
                            }
                            if (dialogOption.title.includes('编辑')) {
                                putNote(dialogOption.ruleForm)
                                    .then((res) => {
                                        this.$message.success(res.msg)
                                        this.noteList = []
                                        this.handleDialog('clear')
                                        this.initTable()
                                        this.handleDialog('close')
                                    })
                                    .catch((_) => {})
                            }
                        }
                    })
                },
                delete: () => {
                    if (confirm('确定删除吗?')) {
                        deleteNote({ _id: row._id })
                            .then((res) => {
                                this.noteList = []
                                this.$message.success(res.msg)
                                this.handleDialog('clear')
                                this.initTable()
                                this.handleDialog('close')
                            })
                            .catch((_) => {})
                    }
                },
            }

            if (type && Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },
        // table相关操作
        handleTable(type, row) {
            let obj = {
                delete: () => {
                    this.$confirm('确定删除吗?')
                        .then((_) => {
                            deleteNote({ _id: row._id })
                                .then((res) => {
                                    this.$message.success(res.msg)
                                    this.initTable()
                                })
                                .catch((_) => {})
                        })
                        .catch((_) => {})
                },
                put_note: () => {
                    putNote(row).then((res) => {
                        this.initTable()
                        this.$message.success(res.msg)
                    })
                },
            }

            if (type && Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },
    },
}
</script>

<style>
.notes-list-page {
    /* max-height: calc(100vh - 105px); */
    max-width: calc(100vw - 230px);
}
</style>
<style lang="scss" scoped>
// 全局重置el-mentui样式
::v-deep {
    .zl-dialog {
        .el-dialog__header {
            display: flex;
            border-bottom: 1px solid #f1f1f1;
            padding: 20px 0;
            color: $primary;
            font-weight: 500;
            background-color: #edf5ff !important;
            .el-dialog__title {
                flex: 1;
                text-align: center;
                color: $primary;
            }
            .el-dialog__headerbtn .el-dialog__close {
                color: $primary;
            }
        }
        .el-dialog__footer {
            border-top: 1px solid #f1f1f1;
            padding: 20px 0;
            text-align: center;
        }
    }
    .el-dialog__wrapper {
        text-align: center;
        white-space: nowrap;
        overflow: auto;
        &:after {
            content: '';
            display: inline-block;
            vertical-align: middle;
            height: 100%;
        }
        .el-dialog {
            margin: 30px auto !important;
            display: inline-block;
            vertical-align: middle;
            text-align: left;
            white-space: normal;
        }
    }
    .el-table {
        thead {
            color: $primary;
            font-weight: 500;
            background-color: #edf5ff !important;
            & th {
                text-align: center;
                background-color: transparent;
            }
            & tr {
                background-color: transparent;
            }
        }
        tbody {
            td {
                text-align: center;
            }
        }
    }
}
.note-content {
    text-align: left;
}
.my-bread {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .item {
        display: flex;
        align-items: center;
        i {
            margin: 0 5px;
            color: #888;
        }
        span {
            max-width: 150px;
        }
    }
}

.search-cover {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 15px;
    .item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        span {
            white-space: nowrap;
            margin-right: 10px;
        }
        .el-input {
            width: 200px;
        }
    }
}
.note-weight-import {
    display: block;
}
.m-bt-10 {
    margin-left: 10px;
    margin-right: 10px;
}
.common-bg-2 {
    padding: 15px 15px 0;
}
</style>
