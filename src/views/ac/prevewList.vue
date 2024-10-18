<template>
    <div class="flex-wrap">
        <div class="left-list">
            <div class="h-40 flex-center-wrap">
                <el-input class="w-300" clearable v-model="keyWords"></el-input>
                <router-link to="/">
                    <el-button type="success">首页</el-button>
                </router-link>
            </div>
            <div class="left-scroll">
                <div
                    :class="[
                        'left-item flex-wrap flex-justify-between',
                        currentRow._id === item._id ? 'bg-primary c-fff' : '',
                    ]"
                    :id="'blog' + item._id"
                    v-for="item in filterList"
                    :key="item._id"
                    @click="openPrevew(item)"
                >
                    <span>
                        {{ item.article_name }}
                    </span>
                    <i
                        v-if="isAdmin && item.article_ac_url.startsWith('/animation')"
                        @click.stop="openD(item)"
                        class="el-icon-edit m-l-10 f-20 c-primary"
                    ></i>
                </div>
            </div>
        </div>
        <!-- 使用iframe预览 -->
        <div class="right-prevew">
            <div class="h-30 p-l-10 flex-center-wrap">
                <div>
                    {{ currentRow.article_ac_url }}
                </div>

                <el-button class="m-l-30" type="primary" size="mini" @click="newWP">
                    页面打开
                </el-button>
            </div>
            <iframe
                :src="this.$baseURL + `${currentRow.article_ac_url.replace('/^\//', '')}`"
                v-if="currentRow.article_ac_url"
            ></iframe>
        </div>

        <e-dialog v-model="visable" width="500px" @confirm="confirmD">
            <div class="p-10">
                <div class="flex-center-wrap">
                    <div class="d-label flex-0 w-80">名字：</div>
                    <el-input v-model="dRow.article_name"></el-input>
                </div>
                <div class="m-t-10 flex-center-wrap flex-justify-end">
                    <el-button type="danger" @click="del">直接删除</el-button>
                </div>
            </div>
        </e-dialog>
    </div>
</template>

<script>
import { delArticle, putArticle } from '@/api/blog'
export default {
    props: {
        list: {
            type: Array,
            default: () => {
                return []
            },
        },
        currentRow: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            keyWords: '',
            oldRow: {},
            dRow: {},
            visable: false,
        }
    },
    computed: {
        ...Vuex.mapGetters(['isAdmin']),
        filterList() {
            return this.list.filter(
                (item) => item.article_name && item.article_name.includes(this.keyWords),
            )
        },
    },

    watch: {
        currentRow(val) {
            this.scrollEvent(val)
        },
        list: {
            handler(val) {
           
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        newWP() {
            window.open(this.$baseURL + `${this.currentRow.article_ac_url.replace('/^\//', '')}`)
        },
        reset() {
            this.$emit('init', 1)
        },
        del() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    delArticle({ _id: this.currentRow._id })
                        .then(() => {
                            this.visable = false
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            })
                            this.$emit('del',this.currentRow._id )
                        })
                        .catch(() => {})
                })
                .catch(() => {})
        },
        back() {
            this.$emit('change', { page: 'list', row: {} })
        },
        async scrollEvent(val) {
            await this.$nextTick()
            // 当前元素滚动到可视区域
            const el = document.getElementById('blog' + val._id)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
            }
        },
        confirmD() {
            let {
                dRow: { _id, article_ac_url, article_name: article_name_new },
            } = this

            if (!article_name_new) {
                this.$message.error('名字不能为空')
                return
            }
            let params = {
                my_type: 'ac',
                _id,
                article_ac_url,

                article_name_new,
            }
            putArticle(params)
                .then((res) => {
                 
                    this.visable = false
                    this.$emit('update', res.data.data)
                })
                .catch((err) => {})
        },
        openD(row) {
            this.dRow = this.deepCopy(row)
            this.oldRow = this.deepCopy(row)
            this.visable = true
        },
        openPrevew(row) {
            this.$emit('select', row)
        },
    },
}
</script>

<style lang="scss" scoped>
.left-list {
    width: 250px;
    height: 100vh;
}
.left-scroll {
    height: calc(100vh - 40px);
    overflow-y: auto;
}
.right-prevew {
    flex: 1;
}
iframe {
    width: 100%;
    height: calc(100vh - 40px);
    overflow-y: auto;
}
.left-item {
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
}
.bg-primary {
    background-color: #7fb2e6 !important;
}
</style>
