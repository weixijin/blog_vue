<template>
    <div>
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_im_rooms"
            customize
        >
        </TrainPage>

        <!-- 新增与编辑 -->
        <e-dialog
            custom-class="zl-dialog"
            title="聊天室配置"
            width="600px"
            v-model="dialogVisible"
            :close-on-click-modal="false"
            @closed="handleClose"
            @confirm="confirm"
        >
            <div class="zl-dialog-main p-r-20">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="80px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="状态" prop="status">
                        <el-radio-group v-model="ruleForm.status">
                            <el-radio
                                :label="item.value"
                                v-for="item in options1"
                                :key="item.value"
                                >{{ item.label }}</el-radio
                            >
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="最大在线人数" prop="status">
                        <el-input-number
                            v-model="ruleForm.max"
                            controls-position="right"
                            :min="2"
                            :max="10"
                        ></el-input-number>
                    </el-form-item>

                    <el-form-item label="名字" prop="im_name">
                        <el-input v-model="ruleForm.im_name" class="w-220" clearable></el-input>
                    </el-form-item>

                    <el-form-item label="类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </e-dialog>
    </div>
</template>

<script>
export default {
    name: 'adminCommentList',
    data() {
        return {
            list: [],
            searchConfig: [
                {
                    label: '房间状态',
                    type: 'select',
                    modelName: 'status',
                    options: () => {
                        return this.options1
                    },
                },
                {
                    label: '房间名称',
                    type: 'input',
                    modelName: 'im_name',
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { status, type } = item
                        return {
                            ...item,
                            _status: this.getStatus(status),
                            _type: this.getRoomType(type),
                        }
                    })
                },
                btns: {
                    children: [
                        {
                            label: '新增',
                            type: 'primary',
                            clickFn: (row) => {
                                this.dialogVisible = true
                            },
                        },
                    ],
                },
                columnObj: [
                    {
                        label: '房间名',
                        props: 'im_name',
                    },
                    {
                        label: '状态',
                        props: '_status',
                    },
                    { label: '类型', props: '_type' },

                    {
                        label: '最大在线人数',
                        props: 'max',
                    },
                    { label: '在线人数', props: 'online_number' },
                    {
                        label: '总聊天数',

                        props: 'all_sys_number',
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
                                type: 'success',
                                clickFn: (row) => {
                                    this.editRow(row)
                                },
                            },
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.delSys(row._id)
                                },
                            },
                        ],
                    },
                ],
            },
            dialogVisible: false,

            isLoading: true,

            options: [
                {
                    value: '1',
                    label: '通用聊天室',
                },
                {
                    value: '2',
                    label: '其他',
                },
            ],
            options1: [
                {
                    value: '1',
                    label: '开启',
                },
                {
                    value: '2',
                    label: '禁用',
                },
            ],
            form: {
                room_id: '',
            },

            ruleForm: {
                _id: '',
                status: '1',
                max: 10,
                im_name: '',
                type: '2',
            },
            rules: {
                im_name: [{ required: true, message: '请输入im名称', trigger: 'blur' }],
            },
        }
    },
    methods: {
        editRow(row) {
            this.ruleForm = this.deepClone(row)
            this.dialogVisible = true
        },
        getStatus(status) {
            let obj = this.options1.find((item) => item.value == status)
            return obj ? obj.label : '--'
        },
        getRoomType(status) {
            let obj = this.options.find((item) => item.value == status)
            return obj ? obj.label : '--'
        },

        confirm() {
            const { ruleForm } = this.$refs
            if (ruleForm) {
                ruleForm.validate((valid) => {
                    if (valid) {
                        post_im_room(this.ruleForm)
                            .then(() => {
                                this.$message.success('保存成功')
                                this.handleClose()
                                this.initTable()
                            })
                            .catch((err) => {
                                this.Toast(err)
                            })
                        return
                    }
                    return false
                })
            }
        },
        handleClose() {
            this.dialogVisible = false
            // 重置相关值
            this.ruleForm = {
                _id: '',
                status: '1',
                max: 10,
                im_name: '',
                type: '2',
            }
        },
        delSys(_id) {
            this.$confirm('确定删除吗？')
                .then(() => {
                    del_im_room({ _id })
                        .then(() => {
                            this.initTable(true)
                        })
                        .catch((err) => {
                            this.Toast(err)
                        })
                })
                .catch(() => {})
        }
    },
}
</script>
