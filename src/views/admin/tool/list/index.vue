<template>
    <div>
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_plugins"
            customize
        >
            <template slot="author_name" slot-scope="{ record }">
                {{ record?.author_id?.username || '---' }}
            </template>
        </TrainPage>

        <!-- 新增/编辑弹窗 -->
        <e-dialog
            class="zl-dialog"
            :title="dialogOption.title"
            v-model="dialogOption.dialogVisible"
            width="600px"
            @closed="closeDialogBefore"
            @confirm="post_plugin"
        >
            <div class="dialog-main p-t-20 p-r-20">
                <el-form
                    :model="dialogOption.ruleForm"
                    :rules="dialogOption.rules"
                    ref="addoreditRef"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="资源地址" prop="plug_url">
                        <el-input
                            type="url"
                            v-model.trim="dialogOption.ruleForm.plug_url"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="资源名" prop="plug_title">
                        <el-input
                            type="url"
                            v-model.trim="dialogOption.ruleForm.plug_title"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="资源描述" prop="plug_content">
                        <el-input
                            type="textarea"
                            :row="5"
                            v-model="dialogOption.ruleForm.plug_content"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="资源类型">
                        <el-select v-model="dialogOption.ruleForm.plug_type" placeholder="请选择">
                            <el-option
                                v-for="item in optionsType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="资源封面" prop="plug_bg_url">
                        <div class="plugin-bg-container">
                            <div
                                v-show="!dialogOption.ruleForm.plug_bg_url"
                                class="no-bg"
                                @click="openImgDialog"
                            >
                                <i class="el-icon-plus"></i>
                            </div>
                            <div class="imgs-cover pr" v-show="dialogOption.ruleForm.plug_bg_url">
                                <i
                                    class="el-icon-circle-close pos-close"
                                    @click="clearPluginBgUrl"
                                ></i>
                                <el-image
                                    style="width: 100px; height: 100px"
                                    :src="parseResourceUrl(dialogOption.ruleForm.plug_bg_url)"
                                    :preview-src-list="[
                                        parseResourceUrl(dialogOption.ruleForm.plug_bg_url),
                                    ]"
                                >
                                </el-image>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </e-dialog>
        <selectImgs
            @closeSelectDialog="closeSelectDialog"
            @determine="determine"
            v-model="isSelectImgsShow"
        />
    </div>
</template>

<script>
import admin from '@/api/blog/admin'
import selectImgs from '@/components/selectImgs'
export default {
    components: {
        selectImgs,
    },
    data() {
        return {
            searchConfig: [
                {
                    label: '资源名',
                    type: 'input',
                    modelName: 'keywords',
                },
                {
                    label: '资源分类',
                    type: 'select',
                    modelName: 'plug_type',
                    options: () => {
                        return this.optionsType
                    },
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { plug_updata_time, plug_create_time, plug_type } = item
                        return {
                            ...item,
                            plug_type_: this.optionsType.find((item) => item.value == plug_type)
                                ?.label,
                            plug_updata_time_: this.klDateFormat(plug_updata_time),
                            plug_create_time_: this.klDateFormat(plug_create_time),
                        }
                    })
                },
                btns: {
                    children: [
                        {
                            label: '新增资源',
                            type: 'success',
                            clickFn: () => {
                                this.openDialog('add')
                            },
                        },
                        {
                            label: '腾讯在线逻辑图制作',
                            type: 'warning',
                            clickFn: () => {
                                this.goTo(
                                    'https://docs.qq.com/desktop/?u=ba75af147be7448b9d5f8745a3780c4c',
                                    {
                                        target: '_blank',
                                    },
                                )
                            },
                        },
                    ],
                },
                columnObj: [
                    {
                        label: '资源类型',
                        props: 'plug_type_',
                    },
                    {
                        label: '资源名',
                        props: 'plug_title',
                        clickFn: ({ plug_type, plug_url }) => {
                            this.goTo(plug_url, {
                                target: '_blank',
                            })
                        },
                    },
                    { label: '资源描述', props: 'plug_content' },
                    { label: '资源更新时间', props: 'plug_updata_time_' },
                    { label: '资源创建时间', props: 'plug_create_time_' },
                    {
                        label: '操作',
                        slot: 'projectDetail',
                 
                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        children: [
                            {
                                label: '编辑',
                                type: 'warning',
                                clickFn: (row) => {
                                    this.openDialog('edit', row)
                                },
                            },
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.deleteBug(row)
                                },
                            },
                        ],
                    },
                ],
            },

            isSelectImgsShow: false,
            that: this,
            dialogOption: {
                dialogVisible: false,
                title: '新增',
                _id: '',

                ruleForm: {
                    _id: '',
                    plug_url: '',
                    plug_title: '',
                    plug_content: '',
                    plug_type: '1',
                    plug_bg_url: '',
                },
                rules: {
                    plug_url: [
                        { required: true, message: '请输入资源地址', trigger: 'blur' },
                        { min: 1, message: '长度大于0', trigger: 'blur' },
                    ],
                    plug_title: [
                        { required: true, message: '请输入资源名', trigger: 'blur' },
                        { min: 1, message: '长度大于0', trigger: 'blur' },
                    ],
                    plug_content: [
                        { required: true, message: '请输入资源描述', trigger: 'blur' },
                        { min: 1, message: '长度大于0', trigger: 'blur' },
                    ],
                    plug_bg_url: [
                        { required: true, message: '请选择资源封面图片', trigger: 'blur' },
                        { min: 1, message: '长度大于0', trigger: 'blur' },
                    ],
                },
            },
        }
    },

    computed: {
        ...Vuex.mapState(['options']),
        optionsType() {
            return this.options.plugOption
        },
    },

    methods: {
        clearPluginBgUrl() {
            this.dialogOption.ruleForm.plug_bg_url = ''
        },
        closeSelectDialog() {
            this.isSelectImgsShow = false
        },
        determine(arr) {
            if (arr.length === 0) return
            this.dialogOption.ruleForm.plug_bg_url = arr[0].imgs_url
            this.isSelectImgsShow = false
        },
        openImgDialog() {
            this.isSelectImgsShow = true
        },
        deleteBug({ _id }) {
            this.$confirm('确定删除吗')
                .then((res) => {
                    admin
                        .delete_plugin(this.filterQuery({ _id }))
                        .then((res) => {
                            this.$message.success(res.msg)
                        })
                        .catch()
                        .finally(() => {
                            this.initTable()
                        })
                })
                .catch(() => {
                    this.$message.success('取消成功')
                })
        },
        post_plugin() {
            this.$refs['addoreditRef'].validate((valid) => {
                if (valid) {
                    let { title } = this.dialogOption
                    if (title === '新增') {
                        admin
                            .post_plugin(this.filterQuery(this.dialogOption.ruleForm))
                            .then((res) => {
                                this.$message.success(res.msg)
                                this.dialogOption.dialogVisible = false
                            })
                            .catch()
                            .finally(() => {
                                this.initTable()
                            })
                    }

                    if (title === '编辑') {
                        admin
                            .put_plugin(this.filterQuery(this.dialogOption.ruleForm))
                            .then((res) => {
                                this.$message.success(res.msg)
                                this.dialogOption.dialogVisible = false
                            })
                            .catch()
                            .finally(() => {
                                this.initTable()
                            })
                    }
                }
            })
        },
        closeDialogBefore() {
            this.dialogOption.ruleForm = {
                _id: '',
                bug_content: '',
                plug_type: '1',
                bug_number: 1,
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
.plugin-bg-container {
    min-height: 100px;
    .no-bg {
        cursor: pointer;
        width: 100px;
        height: 100px;
        border-radius: 8px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        i.el-icon-plus {
            font-size: 24px;
            color: #ccc;
        }
    }

    img {
        width: 100px;
        height: 100px;
        border-radius: 8px;
        border: 1px solid #ccc;
    }
}
.imgs-cover {
    width: 100px;
    height: 100px;
    .pos-close {
        font-size: 20px;
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 99999;
        color: #999;
    }
}
</style>
