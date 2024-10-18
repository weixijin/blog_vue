<template>
    <div class="code notes-list-page o-h b-r-4">
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_note_bug_apis"
            customize
        >
            <template slot="btnList">
                <el-button type="success" @click="openDialog('add')">新增</el-button>
            </template>
        </TrainPage>

        <!-- 新增/编辑弹窗 -->
        <e-dialog
            :title="dialogOption.title"
            v-model="dialogOption.dialogVisible"
            width="600px"
            @closed="closeDialogBefore"
            @confirm="post_note_bug_api"
        >
            <div class="p-20 p-b-0">
                <el-form
                    :model="dialogOption.ruleForm"
                    :rules="dialogOption.rules"
                    ref="addoreditRef"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="bug内容" prop="bug_content">
                        <el-input
                            type="textarea"
                            :rows="7"
                            v-model="dialogOption.ruleForm.bug_content"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="bug分类">
                        <el-select
                            clearable
                            v-model="dialogOption.ruleForm.bug_type"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in bugTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="bug次数">
                        <el-input-number
                            v-model="dialogOption.ruleForm.bug_number"
                            :min="1"
                            label="bug次数"
                        ></el-input-number>
                    </el-form-item>
                    <el-form-item label="衰减周期">
                        <el-input-number
                            v-model="dialogOption.ruleForm.decay_date"
                            :min="1"
                        ></el-input-number>
                    </el-form-item>
                </el-form>
            </div>
        </e-dialog>
    </div>
</template>

<script>
import admin from '@/api/blog/admin'
export default {
    components: {},
    data() {
        return {
            scrollHeight: 0,
            optionsType: [],
            that: this,

            filterRow: [],
            dialogOption: {
                dialogVisible: false,
                title: '新增',
                _id: '',

                ruleForm: {
                    _id: '',
                    bug_content: '',
                    bug_type: '3',
                    bug_number: 1,
                    decay_date: 10,
                },
                rules: {
                    bug_content: [
                        { required: true, message: '请输入bug内容', trigger: 'blur' },
                        { min: 1, message: '长度大于0', trigger: 'blur' },
                    ],
                },
            },
            searchOption: {
                keywords: '',
                bug_type: '',
            },

            tableData: [],
            pageOption: {
                pageSizes: [30, 50, 100],
                limit: 30,
                total: 0,
                page: 1,
            },

            searchConfig: [
                {
                    label: '关键字',
                    type: 'input',
                    modelName: 'keywords',
                },
                {
                    label: '分类',
                    type: 'select',
                    modelName: 'bug_type',
                    options: [],
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return this.handlerTableData(data)
                },
                columnObj: [
                    {
                        label: '类型',
                        props: 'bug_type_label',
                    },
                    { label: '内容', props: '_bug_content', html: true, minWidth: 200 },
                    {
                        label: '次数',
                        props: 'bug_number',
                        clickFn: (row) => {
                            this.updataBugNumber(row)
                        },
                    },
                    { label: '衰减周期', props: 'decay_date' },
                    { label: '坚持时长', props: '_persistence_time' },
                    { label: '手动更新时间', props: '_bug_updata_time', minWidth: 120 },
                    { label: '自动更新时间', props: '_auto_update_time', minWidth: 120 },
                    { label: '创建时间', props: '_bug_create_time', minWidth: 120 },
                    {
                        label: '操作',
                        slot: 'projectDetail',
                  
                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        children:[
                        {
                                label: '编辑',
                                type: 'warning',
                                clickFn: (row) => {
                                    this.openDialog('edit', row)
                                },
                            },
                            {
                                label: '删除',
                                type:'danger',
                                clickFn: (row) => {
                                    this.deleteBug(row)
                                },
                           },
                        ]
                    },
                ],
            },
        }
    },

    filters: {
        filterAuthorsTime(val, that) {
            return val ? that.moment(val - 0, 3) : '没有设置'
        },
    },
    computed: {
        ...Vuex.mapGetters(['bugTypeOptions']),
    },

    created() {
        this.searchConfig[1].options = this.bugTypeOptions
    },

    methods: {
        deleteBug({ _id }) {
            this.$confirm('确定删除吗')
                .then((res) => {
                    admin
                        .delete_note_bug_api(this.filterQuery({ _id }))
                        .then((res) => {
                            this.$message.success(res.msg)
                        })
                        .catch()
                        .finally(() => {
                            this.$refs.TrainPageRef.getAddData()
                        })
                })
                .catch(() => {
                    this.$message.success('取消成功')
                })
        },
        post_note_bug_api() {
            this.$refs['addoreditRef'].validate((valid) => {
                if (valid) {
                    let { title } = this.dialogOption
                    if (title === '新增') {
                        admin
                            .post_note_bug_api(this.filterQuery(this.dialogOption.ruleForm))
                            .then((res) => {
                                this.$message.success(res.msg)
                                this.dialogOption.dialogVisible = false
                            })
                            .catch()
                            .finally(() => {
                                this.$refs.TrainPageRef.getAddData()
                            })
                    }

                    if (title === '编辑') {
                        admin
                            .put_note_bug_api(this.dialogOption.ruleForm)
                            .then((res) => {
                                this.$message.success(res.msg)
                                this.dialogOption.dialogVisible = false
                                // 直接修改数据
                                this.$refs.TrainPageRef.tableData = this.handlerTableData(
                                    this.$refs.TrainPageRef.tableData.map((item) => {
                                        if (item._id === res.data.data._id) {
                                            item = Object.assign(item, res.data.data)
                                        }
                                        return item
                                    }),
                                )
                            })
                            .catch()
                    }
                }
            })
        },
        handlerTableData(data) {
            return data.map((item) => {
                let { bug_type, bug_create_time, bug_updata_time, bug_content, auto_update_time } =
                    item
                return {
                    ...item,
                    _bug_content: bug_content.replace(/\n/g, '<br>'),
                    _bug_create_time: this.klDateFormat(bug_create_time),
                    _bug_updata_time: this.klDateFormat(bug_updata_time),
                    _auto_update_time: auto_update_time ? this.klDateFormat(auto_update_time) : '',
                    _persistence_time:
                        bug_create_time && bug_updata_time
                            ? Math.floor((Date.now() - bug_updata_time) / (3600 * 24 * 1000)) + '天'
                            : '0天',
                    bug_type_label:
                        this.bugTypeOptions.find((item) => +item.value === +bug_type)?.label ||
                        '未设置',
                }
            })
        },
        // 直接新增次数
        updataBugNumber(row) {
            let params = this.deepClone(row)
            params.bug_number = params.bug_number - 0 + 1

            admin
                .put_note_bug_api(this.filterQuery(params))
                .then((res) => {
                    this.$message.success(res.msg)
                    this.$refs.TrainPageRef.tableData = this.handlerTableData(
                        this.$refs.TrainPageRef.tableData.map((item) => {
                            if (item._id === res.data.data._id) {
                                item = Object.assign(item, res.data.data)
                            }
                            return item
                        }),
                    )
                })
                .catch(() => {})
        },
        closeDialogBefore() {
            this.dialogOption.ruleForm = {
                _id: '',
                bug_content: '',
                bug_type: '3',
                bug_number: 1,
                decay_date: 10,
            }

            this.dialogOption.dialogVisible = false
        },
        openDialog(type = 'add', row) {
            let obj = {
                add: '新增',
                edit: '编辑',
            }
            this.dialogOption.title = obj[type]
            if (type === 'edit') {
                this.dialogOption.ruleForm = this.deepClone(row)
            }
            this.dialogOption.dialogVisible = true
        },
    },
}
</script>

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
.common-bg-2 {
    padding: 15px;
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
    // padding: 5px;
}
.m-bt-10 {
    margin-left: 10px;
    margin-right: 10px;
}

.el-icon-question {
    font-size: 20px;
    position: relative;
    top: -3px;
}
</style>
