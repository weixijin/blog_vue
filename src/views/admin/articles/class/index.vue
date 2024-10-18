<template>
    <div>
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_classs"
            customize
            @sortEnd="sortEnd"
        >
            <template slot="btnList">
                <el-button type="primary" @click="openDialog">新增</el-button>
            </template>
            <template slot="roles" slot-scope="{ record }">
                <el-checkbox-group v-model="record.roles" :min="1" @change="changeFun(record)">
                    <el-checkbox v-for="item in userRoles" :label="item" :key="indey + item">{{
                        item
                    }}</el-checkbox>
                </el-checkbox-group>
            </template>
        </TrainPage>

        <!-- 分类新增与编辑弹窗 -->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="30%"
            @close="handleClose"
        >
            <div class="dialog-main">
                <div class="flex-center-wrap">
                    <div class="d-label">分类名称：</div>
                    <el-input
                        placeholder="请输入类名"
                        v-model="text"
                        maxlength="20"
                        show-word-limit
                        v-model.trim="rowData.class_name"
                    ></el-input>
                </div>

                <div class="m-t-10 flex-center-wrap">
                    <div class="d-label">设置为心得记录：</div>
                    <el-switch v-model="value"></el-switch>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { putClass, addClass, delClass } from '@/api/blog'
export default {
    data() {
        return {
            searchConfig: [],
            tableConfig: {
                sort: true,
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    this.$store.commit('SET_NAV_LIST', data)
                    return data.map((item, index) => {
                        let { create_time, updata_time } = item
                        return {
                            ...item,
                            create_time_: this.klDateFormat(create_time),
                            updata_time_: this.klDateFormat(updata_time),
                        }
                    })
                },
                columnObj: [
                    {
                        label: '分类名称',
                        props: 'class_name',
                    },
                    { label: '展示权限', props: 'roles', slot: 'roles' },
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
                                    this.edit(row, 'edit')
                                },
                            },
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.del(row,'del')
                                },
                            },
                        ],
                    },
                ],
            },

            value: false,
            rowData: {
                class_name: '',
            },
            dialogVisible: false,
            dialogTitle: '',
            maxHeight: 0,
            headerOption: [
                {
                    name: '分类名称',
                    key: 'class_name',
                    flex: 1,
                },
                {
                    name: '展示权限',
                    key: 'roles',
                    width: 300,
                    custom: 'roles',
                },
                {
                    name: '操作',
                    key: 'action',
                    width: 200,
                    custom: 'operation',
                },
            ],
        }
    },
    computed: {
        ...Vuex.mapState(['navlist', 'options']),
        ...Vuex.mapMutations(['SET_NAV_LIST']),
        userRoles() {
            return this.options.userRoles || []
        },
    },

    methods: {
        sortEnd({ newList } = {}) {
            const blog_class_option = newList.map((item) => item._id).join(',')
            this.$apis
                .put_options({ blog_class_option })
                .then((res) => {
                    const { blog_class_option = '' } = res?.data?.list || {}
                    // 按照新的排序重新设置navlist
                    const arr = blog_class_option.split(',')
                    const result = []
                    arr.forEach((item) => {
                        const navItem = this.navlist.find((nav) => nav._id === item)
                        if (navItem) {
                            result.push(navItem)
                        }
                    })
                    this.$store.commit('SET_NAV_LIST', result)
                    this.$message.success('操作成功')
                })
                .catch((e) => {
                    this.getTableData()
                })
        },
        getTableData() {
            this.$refs.TrainPageRef.getAddData()
        },
        changeFun(row) {
            this.rowData = row
            this.value = +row.class_mark === 1
            this.submit()
        },
        edit(row) {
            this.openDialog(row)
            this.rowData = this.deepCopy(row)
            this.value = +row.class_mark === 1
        },

        del(row) {
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    delClass({ _id: row._id }).then(() => {
                        this.$message.success('删除成功')
                        this.getTableData()
                    })
                })
                .catch((err) => {
                    this.Toast(err)
                })
        },
        // 提交
        async submit() {
            let {
                rowData: { _id, class_name, roles },
                value,
            } = this
            if (!class_name) {
                return this.$message.error('请输入内容')
            }

            let params = {
                class_name,
            }

            params.class_mark = value ? 1 : ''

            if (_id) {
                params._id = _id
            }

            if (Array.isArray(roles)) {
                params.roles = roles
            }

            if (_id) {
                // 编辑
                putClass(params)
                    .then((res) => {
                        this.$message.success('编辑成功')
                        this.getTableData()
                        this.dialogVisible = false
                    })
                    .catch(() => {})
                return
            }

            // 新增
            addClass(params)
                .then((res) => {
                    this.$message.success('新增成功')
                    this.getTableData()
                    this.dialogVisible = false
                })
                .catch(() => {})
        },
        // 弹窗关闭
        handleClose() {
            this.dialogVisible = false
        },
        // 打开弹窗
        openDialog(row) {
            if (this.getType(row) == 'object') {
                this.dialogTitle = '编辑'
            } else {
                this.dialogTitle = '新增'
            }

            this.dialogVisible = true
        },
    },
}
</script>

<style lang="scss" scoped>
.demo {
    max-height: calc(100vh - 200px);
}
::v-deep {
    .el-dialog__footer {
        padding-right: 20px;
    }
}
.d-label {
    white-space: nowrap;
}
</style>
