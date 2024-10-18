<template>
    <div>
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_blog_tag_list"
            customize
        >
        </TrainPage>

        <!-- 新增与编辑 -->
        <e-dialog
            :title="rowCopy._id ? '编辑' : '新增'"
            width="400px"
            v-model="dialogVisible"
            @closed="handleClose"
            @confirm="submitDialogVisible"
        >
            <div class="zl-dialog-main p-r-20">
                <el-input v-model="rowCopy.tag_name"></el-input>
            </div>
        </e-dialog>
    </div>
</template>

<script>
import httpApi from '@/api/blog/admin.js'
export default {
    name: 'adminCommentList',
    data() {
        return {
            searchConfig: [
                {
                    label: '标签名',
                    type: 'input',
                    modelName: 'tag_name',
                }
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                btns: {
                    children: [
                        {
                            label: '新增',
                            type: 'primary',
                            clickFn: (row) => {
                                this.openAdd()
                            },
                        },
                    ],
                },
                columnObj: [
                    {
                        label: '标签名',
                        props: 'tag_name',
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
                                    this.edit(row)
                                },
                            },
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.del(row)
                                },
                            },
                        ],
                    },
                ],
            },
            dialogVisible: false,
            rowCopy: {
                _id: '',
                tag_name: '',
            },
        }
    },
    methods: {

        get_blog_tag_list() {
            let { page, limit } = this.pageOption
            let params = {
                page,
                limit,
            }
            this.isLoading = true
            httpApi
                .get_blog_tag_list(params)
                .then((res) => {
                    if(this.getType(res.data) === 'object'){
                        let {data,total} = res.data
                        this.tableData = data || []
                        this.pageOption.total = total-0 || 0
                    }
                   
                })
                .catch((err) => {
                    console.error(err)
                })
                .finally(() => {
                    this.isLoading = false
                })
        },
        del(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    httpApi.delete_blog_tag({_id:row._id}).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        })
                        this.get_blog_tag_list()
                    }).catch(()=>{})
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                })
        },
        handleClose() {
            this.dialogVisible = false
            // 重置相关值
            Object.assign(this.rowCopy, {
                _id: '',
                tag_name: '',
            })
        },
        submitDialogVisible() {
            httpApi.post_blog_tag(this.rowCopy).then(res=>{
                this.$message({
                    type: 'success',
                    message: '操作成功!',
                })
                this.handleClose()
                this.get_blog_tag_list()
            }).catch(()=>{})
        },

        openAdd() {
            this.dialogVisible = true
        },
        edit(row) {
            this.rowCopy = this.deepCopy(row)
            this.dialogVisible = true
        },
    },
}
</script>
