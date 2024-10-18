<template>
    <div class="code notes-list-page o-h">
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_codes"
            :customize="false"
        >
        </TrainPage>

        <!-- 用户信息编辑弹窗 -->
        <e-dialog
            class="zl-dialog"
            title="编辑用户信息"
            width="600px"
            v-model="dialogVisible"
            @closed="handleClose"
            @confirm="submitDialogVisible"
        >
            <div class="zl-dialog-main">
                <div class="flex-item flex-center-wrap">
                    <div class="flex-item-label">是否开启邮件提醒：</div>
                    <e-radio v-model="userInfoCopy.user_receive_day_email" :option="option">
                    </e-radio>
                </div>
            </div>
        </e-dialog>
    </div>
</template>

<script>
import admin from '@/api/blog/admin'
export default {
    data() {
        return {
            searchConfig: [
                {
                    label: '邮箱',
                    type: 'input',
                    modelName: 'email',
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { send_time } = item
                        return {
                            ...item,
                            _send_time: this.klDateFormat(send_time),
                        }
                    })
                },
                columnObj: [
                    { label: '邮箱', props: 'email' },

                    { label: '验证码', props: 'code_val' },
                    {
                        label: '发送时间',
                        props: '_send_time',
                        width: 300,
                    },
                    {
                        label: '操作',
                        slot: 'projectDetail',
                  
                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        children: [
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.handleTable(row)
                                },
                            },
                        ],
                    },
                ],
            },

            userInfoCopy: {},
            dialogVisible: false,
        }
    },
    methods: {
        // table相关操作
        handleTable( row) {
            admin
                .deleteCode({ _id: row._id })
                .then((res) => {
                    this.$message.success(res.msg)
                    this.initTable()
                })
                .catch((err) => {
                    this.Toast(err)
                })
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep {
    // 重置头部样式
    .zl-dialog {
        .el-dialog {
            border-radius: 0px;
        }
        .el-dialog__header {
            height: 56px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;
            padding-left: 24px;
            font-size: 16px;
            font-weight: 600;
            color: #303133;
        }
        .el-dialog__headerbtn {
            top: 16px;
        }
        .el-dialog__body {
            padding: 0;
        }
    }

    // 居中
    .zl-dialog.el-dialog__wrapper {
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
}
.zl-dialog-main {
    padding: 20px 0 0 20px;
}
</style>
