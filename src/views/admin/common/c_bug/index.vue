<template>
    <div class="c-bug-page">
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_c_bugs"
            customize
        >
            <template slot="btnList">
                <el-button type="success" @click="openDialog">新增</el-button>
            </template>
            <template slot="author_name" slot-scope="{ record }">
                {{ record?.author_id?.username || '---' }}
            </template>
        </TrainPage>

        <e-dialog
            :clickModal="false"
            :footer="false"
            width="80vw"
            v-model="visable"
            @closed="dialogClosed"
        >
            <div>
                <div class="flex-center f-550 h-40 f-18 pr">
                    {{ rowCopy._id ? '编辑' : '新增' }}

                    <i class="el-icon-close pos-close" @click="dialogClosed"></i>
                </div>
                <div class="flex-wrap flex-center-wrap p-l-20">
                    bug类型：
                    <el-select clearable v-model="rowCopy.c_bug_type" placeholder="请选择">
                        <el-option
                            v-for="item in optionsType1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>

                <div class="d-main flex-wrap p-b-20 p-t-10 m-t-10">
                    <mavonEditor
                        upload_file_url="bug_c"
                        v-model="rowCopy.content"
                        @save="editorChange"
                    ></mavonEditor>
                </div>
            </div>
        </e-dialog>
    </div>
</template>

<script>
// 编辑器插件
import adminApi from '@/api/blog/admin'
export default {
    components: {
        mavonEditor: () => import('@/components/mavonEditor/index.vue'),
    },
    data() {
        return {
            searchConfig: [
                {
                    label: '内容',
                    type: 'input',
                    modelName: 'keywords',
                },

                {
                    label: 'bug状态',
                    type: 'select',
                    modelName: 'type',
                    options: [
                        {
                            label: '未解决',
                            value: '1',
                        },
                        {
                            label: '已解决',
                            value: '2',
                        },
                    ],
                },
                {
                    label: 'bug类型',
                    type: 'select',
                    modelName: 'c_bug_type',
                    options: [
                        {
                            label: '其他',
                            value: '1',
                        },
                        {
                            label: '工作',
                            value: '2',
                        },
                    ],
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    // 给图片绑定预览事件
                    this.setImgp()
                    return data
                },
                columnObj: [
                    {
                        label: '详情',
                        props: 'html_edit',
                        html: true,
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
                                    this.edit(row)
                                },
                            },
                            {
                                label: '已修改',
                                type: 'info',
                                type: 'warning',
                                show: (row) => {
                                    return row.type == 1
                                },
                                clickFn: (row) => {
                                    this.changeType(row)
                                },
                            },
                            {
                                label: '未修改',
                                type: 'info',
                                type: 'info',
                                show: (row) => {
                                    return row.type == 2
                                },
                                clickFn: (row) => {
                                    this.changeType(row)
                                },
                            },
                        ],
                    },
                ],
            },

            // 编辑器配置
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
            timer: null,
            rowCopy: {
                _id: '',
                content: '',
                html_edit: '',
                c_bug_type: '1',
            },
            visable: false,
            params: {
                type: '1',
                c_bug_type: '',
            },
            tableData: [],
            isLoading: true,
            scrollHeight: 0,
            pageOption: {
                pageSizes: [10, 15, 20, 50],
                limit: 20,
                total: 0,
                page: 1,
            },

            // 1 其他  2 工作
            optionsType1: [
                {
                    label: '其他',
                    value: '1',
                },
                {
                    label: '工作',
                    value: '2',
                },
            ],
        }
    },
    watch: {
        visable(val) {
            if (val) {
                this.setImgp()
            }
        },
    },
    methods: {
        async setImgp(target = '.el-table img') {
            await this.sleep()
            let imgList = document.querySelectorAll(target)
            // 所有图片加载完毕后，设置预览事件
            let imgListArr = Array.from(imgList)
            for (let i = 0; i < imgListArr.length; i++) {
                let item = imgListArr[i]
                // 是否已经绑定，防止重复绑定
                item.removeEventListener('click', () => {})
                item.addEventListener('click', () => {
                    this.prevewImg(item)
                })
            }
        },
        changeType(row) {
            let { type, _id } = row
            row.type = +type === 1 ? '2' : '1'
            adminApi
                .post_c_bug(row)
                .then((res) => {
                    this.$message.success('操作成功')
                    this.$refs.TrainPageRef.tableData = this.$refs.TrainPageRef.tableData.filter(
                        (row) => row._id !== _id,
                    )
                    this.setImgp()
                })
                .catch(() => {})
        },
        edit(row) {
            this.visable = true
            this.rowCopy = this.deepClone(row)
        },
        editorChange({ str: content, html: html_edit }) {
            let { _id, type, c_bug_type } = this.rowCopy
            if (!content || !html_edit) {
                this.$message.error('请输入内容')
                return
            }
            let params = {
                _id,
                content,
                html_edit,
                type: type ? type : '1',
                c_bug_type,
            }

            const loading = this.$loading({
                lock: true,
                text: '保存中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })

            adminApi
                .post_c_bug(params)
                .then(async (res) => {
                    this.$message.success('操作成功')
                    this.visable = false
                    if (!_id) {
                        this.$refs.TrainPageRef.getAddData()
                        return
                    }
                    // 跟新
                    this.$refs.TrainPageRef.tableData = this.$refs.TrainPageRef.tableData.map(
                        (item) => {
                            if (item._id === _id) {
                                return res.data.data
                            }
                            return item
                        },
                    )
                    this.setImgp()
                })
                .catch(() => {})
                .finally(() => {
                    loading.close()
                })
        },
        dialogClosed() {
            this.visable = false
            Object.assign(this.rowCopy, {
                _id: '',
                content: '',
                html_edit: '',
            })
        },
        openDialog() {
            this.visable = true
        },
    },
}
</script>

<style lang="scss" scoped>
.d-main {
    padding: 0 20px;
    height: 80vh;
}
.pos-close {
    font-weight: 700;
    font-size: 24px;
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
}

::v-deep {
    .bug-c-movon-editor {
        width: 100%;
    }
    .el-table img {
        max-width: 100%;
    }
}
</style>
