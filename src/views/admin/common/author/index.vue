<template>
    <div class="code notes-list-page o-h">
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_authors"
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
import { putAuthorConfig } from '@/api/blog/index.js'
export default {
    components: {},
    data() {
        return {
            option: [
                {
                    label: '不开启',
                    value: '1',
                },
                {
                    label: '开启',
                    value: '2',
                },
            ],
            searchConfig: [
                {
                    label: '用户ID',
                    type: 'input',
                    modelName: '_id',
                },
                {
                    label: '邮箱',
                    type: 'input',
                    modelName: 'email',
                },
                {
                    label: '呢称',
                    type: 'input',
                    modelName: 'username',
                }
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { create_time, updata_time, last_login_time, register_time } = item
                        return {
                            ...item,
                            create_time_: this.klDateFormat(create_time),
                            updata_time_: this.klDateFormat(updata_time),
                            last_login_time: this.klDateFormat(last_login_time),
                            register_time: this.klDateFormat(new Date(register_time).getTime()),
                        }
                    })
                },
                columnObj: [
                    {
                        label: '呢称',
                        props: 'username',
                        width:300,
                    },
                    { label: '用户ID', props: '_id' },
                    { label: '注册时间', props: 'register_time' },
                    { label: '上次登录时间', props: 'last_login_time' },
                    { label: '邮箱', props: 'email' },
                    { label: '角色', props: 'role' },
                    { label: '性别', props: 'sex' },
                    { label: '年龄', props: 'age' },
                    {
                        label: '操作',
                        slot: 'projectDetail',
                   
                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        children:[
                            {
                                label: '编辑',
                                clickFn: (row) => {
                                    this.editUserInfo(row)
                                }
                            },
                            // {
                            //     label: '删除',
                            //     type:'danger',
                            //     clickFn: (row) => {
                            //         this.handleTable('delete', row)
                            //     }
                            // }
                        ]
                    },
                ],
            },

            userInfoCopy: {},
            dialogVisible: false,
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
            // 重置相关值
            this.userInfoCopy = {}
        },
        editUserInfo(row) {
            this.userInfoCopy = this.deepClone(row)
            this.dialogVisible = true
        },
        submitDialogVisible() {
            let { user_receive_day_email, _id } = this.userInfoCopy
            let params = {
                user_receive_day_email,
                _id,
            }
            putAuthorConfig(params)
                .then((res) => {
                    this.$message.success(res.msg)
                    this.$refs?.TrainPageRef?.getAddData()
                    this.handleClose()
                })
                .catch((_) => {})
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
