<template>
    <div class="blog-notes">
        <div class="notes-content">
            <div class="my-header">
                <a href="#/login" class="pos-add-login cu" v-if="!isAdmin">登录</a>
                <span class="title"> 待办纪要({{ total }}) </span>
                <span class="pos-add-note cu" @click="handleDialogAdd('open')"> + </span>
            </div>
            <div class="note-list better-scroll">
                <div class="note-list-scroll">
                    <div class="item" v-for="item in noteList" :key="item._id">
                        <input
                            v-model="item.note_done"
                            type="checkbox"
                            class="m-r-5"
                            @change="handleDialogAdd('change_type', item)"
                        />

                        <div
                            :class="['content', 'ell', colorType(item)]"
                            @click="handleDialogAdd('watch', item)"
                        >
                            <span>{{ item.my_index }}.</span>

                            <span>
                                {{ item.note_content }}
                            </span>
                        </div>
                        <div class="fun">
                            <div class="c-success cu" @click="handleDialogAdd('edit', item)">
                                编辑
                            </div>
                            <div class="c-danger cu" @click="handleDialogAdd('delete', item)">
                                删除
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 新增/编辑弹窗 -->
        <el-dialog
            class="zl-dialog"
            :title="dialogAdd.title"
            :visible.sync="dialogAdd.dialogVisible"
            width="300px"
            @close="handleDialogAdd('close')"
        >
            <textarea rows="3" class="kl-input" v-model.trim="dialogAdd.note_content" />
            <span slot="footer" class="dialog-footer" v-show="dialogAdd.title !== '查看'">
                <el-button size="small" @click="handleDialogAdd('close')">取 消</el-button>
                <el-button
                    size="small"
                    class="m-l-30"
                    type="primary"
                    @click="handleDialogAdd('determine')"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getNotes, postNote, putNote, deleteNote } from '@/api/blog'
export default {
    components: {},
    data() {
        return {
            isTouchBottom: true,
            dialogAdd: {
                dialogVisible: false,
                title: '新增',
                _id: '',
                note_content: '',
            },
            pageOption: {
                page: 1,
                limit: 30,
                type:'mobile'
            },
            total: 0,
            noteList: [],
        }
    },
    computed: {
        ...Vuex.mapGetters(['isAdmin']),
        colorType() {
            return (val) => {
                let { note_need_remind, note_end_time, note_done } = val
                if (note_done) {
                    return 'c-success'
                }
                if (note_need_remind && !note_done) {
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
        this.getNotes()
    },
    mounted() {},
    beforeUpdate() {
        this.$nextTick(() => {
            this.contentScroll()
        })
    },
    methods: {
        handleDialogAdd(type, row) {
            let { dialogAdd } = this
            let obj = {
                watch: () => {
                    dialogAdd.note_content = row.note_content
                    dialogAdd.title = '查看'
                    dialogAdd.dialogVisible = true
                    dialogAdd._id = row._id
                },
                edit: () => {
                    dialogAdd.note_content = row.note_content
                    dialogAdd.title = '编辑'
                    dialogAdd.dialogVisible = true
                    dialogAdd._id = row._id
                },
                open: () => {
                    dialogAdd.title = '新增'
                    dialogAdd.dialogVisible = true
                },
                clear: () => {
                    this.dialogAdd.title = ''
                    this.dialogAdd.note_content = ''
                    this.dialogAdd._id = ''
                    this.pageOption = {
                        page: 1,
                        limit: 30,
                        type:'mobile'
                    }
                    this.total = 0
                },
                close: () => {
                    dialogAdd.dialogVisible = false
                },
                determine: async () => {
                    let { note_content, _id } = dialogAdd
                    if (!note_content) {
                        return this.$message.warning('内容不能为空')
                    }

                    if (dialogAdd.title === '新增') {
                        let note_begin_time = Date.now()
                        let note_end_time = note_begin_time + 7 * 24 * 3600 * 1000
                        let params = {
                            note_content,
                            note_begin_time,
                            note_end_time,
                        }
                        let res = await postNote(params)
                        this.noteList = []
                        // this.$message.success(res.msg)
                        this.handleDialogAdd('clear')
                        this.getNotes()
                        this.handleDialogAdd('close')
                    }
                    if (dialogAdd.title === '编辑') {
                        let res = await putNote({ note_content, _id, type: 1 })

                        this.noteList = []
                        // this.$message.success(res.msg)
                        this.handleDialogAdd('clear')
                        this.getNotes()
                        this.handleDialogAdd('close')
                    }
                },
                delete: () => {
                    if (confirm('确定删除吗?')) {
                        deleteNote({ _id: row._id })
                            .then((res) => {
                                this.noteList = []
                                // this.$message.success(res.msg)
                                this.handleDialogAdd('clear')
                                this.getNotes()
                                this.handleDialogAdd('close')
                            })
                            .catch((_) => {})
                    }
                },
                change_type: () => {
                    let { _id, note_done } = row
                    putNote({ _id, note_done, type: 1 })
                        .then((res) => {
                            this.$message.success(res.msg)
                        })
                        .catch((_) => {
                            note_done = !note_done
                        })
                },
            }

            if (type && Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },
        contentScroll() {
            let that = this
            let el = $('.note-list')
            let height = el.height()
            let allheight =
                window.getComputedStyle($('.note-list-scroll')[0]).height.replace('px', '') - 0
            el.on('scroll', function () {
                if (allheight - height - el.scrollTop() < 50 && that.isTouchBottom) {
                    if (that.noteList.length >= that.total) {
                        return
                    }
                    that.pageOption.page += 1
                    that.getNotes()
                }
            })
        },
        getNotes() {
            if (!this.isTouchBottom) return
            this.isTouchBottom = false
            getNotes(this.pageOption)
                .then((res) => {
                    let list = res.data.data
                    this.noteList = [...this.noteList, ...list]
                    let arr1 = []

                    let arr2 = []
                    this.noteList.forEach((item, index) => {
                        if (!item.note_done) {
                            arr1.push(item)
                        } else {
                            arr2.push(item)
                        }
                        return item
                    })

                    this.noteList = [...arr1, ...arr2]

                    this.noteList = this.noteList.map((item, index) => {
                        item.my_index = index + 1
                        return item
                    })

                    this.total = res.data.total

                    this.isTouchBottom = true
                })
                .catch((_) => {})
        },
    },
}
</script>

<style lang="scss" scoped>
textarea {
    border: none;
    outline: none;
}

::v-deep {
    .zl-dialog {
        .el-dialog__headerbtn {
            display: none;
        }
        .el-dialog__header {
            display: flex;
            border-bottom: 0.01rem solid #f1f1f1;
            padding: 0.1rem 0;
            .el-dialog__title {
                font-weight: 550;
                flex: 1;
                text-align: center;
                color: $primary;
            }
        }
        .el-dialog__footer {
            border-top: 0.01rem solid #f1f1f1;
            padding: 0.15rem 0;
            .dialog-footer {
                display: flex;
                justify-content: center;
            }
        }
        .el-dialog__body {
            padding: 0.1rem;
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
            margin: 0.3rem auto !important;
            display: inline-block;
            vertical-align: middle;
            text-align: left;
            white-space: normal;
        }
    }
}

.blog-notes {
    max-width: 100vw;
    max-height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #fff;
    overflow: hidden;
    .notes-content {
        background-color: #fff;
        min-height: 100v;
        width: 100vw;
        overflow: hidden;
        .my-header {
            height: 0.45rem;
            padding: 0 0.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            background-color: $primary;
            color: #fff;
            position: relative;
            a {
                color: #fff;
            }
            span.title {
                font-weight: 550;
                font-size: 0.18rem;
            }
            .pos-add-login {
                position: absolute;
                top: 50%;
                left: 0.1rem;
                transform: translateY(-50%);
            }

            .pos-add-note {
                font-size: 0.3rem;
                position: absolute;
                top: 50%;
                right: 0.1rem;
                transform: translateY(-50%);
            }
        }
        .note-list {
            height: calc(100vh - 0.45rem);
            overflow-y: auto;
            width: 100vw;
            .item {
                height: 0.4rem;
                line-height: 0.4rem;
                padding: 0rem 0.1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #f1f1f1;
                border-bottom: 0.01rem solid #fff;
                &:nth-last-of-type(1) {
                    border-bottom: none;
                }
                .content {
                    flex: 1;
                }
                .fun {
                    margin-left: 0.2rem;
                    min-width: 0.75rem;
                    display: flex;
                    justify-content: space-between;
                }
                .c-fff {
                    text-align: center;
                    display: inline-block;
                    min-width: 0.23rem;
                    color: $primary;
                }
            }
        }
    }

    .kl-input {
        font-size: 0.16rem;
        width: 100%;
        height: 1.2rem;
        border-radius: 0.03rem;
        border: 0.01rem solid #ccc;
        padding: 0.05rem;
        &:focus {
            border-color: $primary;
        }
    }
}
</style>
