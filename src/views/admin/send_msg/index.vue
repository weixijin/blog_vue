<template>
    <div>
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_send_msgs"
            customize
            @sortEnd="sortEnd"
        >
        </TrainPage>

        <!-- 新增与编辑 -->
        <e-dialog
            custom-class="zl-dialog"
            title="寄语配置"
            width="600px"
            v-model="dialogVisible"
            :close-on-click-modal="false"
            @closed="handleClose"
            @confirm="confirm"
        >
            <div class="zl-dialog-main p-r-20">
                <e-form
                    ref="ruleFormRef"
                    :formConfig="formConfig"
                    :formRule="rules"
                    :formData="formdata"
                >
                </e-form>
            </div>
        </e-dialog>
    </div>
</template>

<script>
import { createFormData } from '@/mixins/tool/tool.js'
function createFromConfig() {
    return [
        {
            label: '内容',
            type: 'textarea',
            modelName: 'content',
            value: '',
            showWordLimit: true,
            width: '430px',
            autosize: {
                minRows: 3,
                maxRows: 6,
            },
        },
    ]
}

export default {
    name: 'sendMsgList',
    data() {
        return {
            rules: {
                content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
            },
            formConfig: createFromConfig(),
            formdata: {
                _id: '',
                ...createFormData(createFromConfig()),
            },
            list: [],
            searchConfig: [
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
                sort: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { create_time, update_time } = item
                        return {
                            ...item,
                            _create_time: this.klDateFormat(create_time),
                            _update_time: this.klDateFormat(update_time),
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
                        label: '内容',
                        props: 'content',
                    },
                    {
                        label: '创建时间',

                        props: '_create_time',
                    },
                    {
                        label: '更新时间',

                        props: '_update_time',
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
        }
    },
    methods: {
        sortEnd(row) {
            this.$apis
                .put_options({
                    blog_class_option: row.newList.map((item) => item._id).join(','),
                    type: 'blog_send_msg',
                })
                .then((res) => {
                    this.$message.success('操作成功')
                })
                .catch((e) => {
                    this.Toast(e)
                })
        },
        editRow(row) {
            this.formdata = this.deepClone(row)
            this.dialogVisible = true
        },

        confirm() {
            const { ruleFormRef } = this.$refs
            if (ruleFormRef) {
                ruleFormRef.validateFn().then((valid) => {
                    if (valid) {
                        this.$apis
                            .post_send_msg(this.formdata)
                            .then((res) => {
                                this.$message.success(res.msg)
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
            Object.assign(this.formdata, {
                _id: '',
                content: '',
            })
        },
        async delSys(_id) {
            const res = await this.$confirm('确定删除吗？').catch(() => false)
            if (!res) return
            try {
                const data = await this.$apis.del_send_msg({ _id })
                this.$message.success(data.msg)
                this.initTable(true)
            } catch (err) {
                this.Toast(err)
            }
        },
    },
}
</script>
