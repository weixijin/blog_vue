<template>
    <div class="v-h-100">
        <div class="dor-danger" v-if="isChange === true"></div>
        <div class="flex-wrap flex-center-wrap flex-justify-between my-article-header">
            <div>
                <el-dropdown @command="handleTypeCommand" class="m-r-20">
                    <div class="el-dropdown-link cu">
                        <span class="m-r-10"> 默认填充 </span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            :command="{ item, index }"
                            v-for="(item, index) in defaultList"
                            :key="item.label"
                            >{{ item.label }}</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button @click="$router.push('/home')">返回首页</el-button>
                <el-button @click="goBottom">滚动到底部</el-button>
                <el-button @click="createTable">创建表格</el-button>
                <el-button v-show="articleData._id" @click="goInfoPage" type="danger"
                    >详情页</el-button
                >
                <!-- 新窗口打开 -->
                <el-button @click="goLint">在线格式化代码地址</el-button>
            </div>

            <el-button :disabled="isDisabled" type="primary" @click="openArticleDetails" plain
                >详情配置</el-button
            >
            <articleDetails
                ref="articleDetailsRef"
                v-model="isShowDetail"
                :editObj="editObj"
                :isEdit="isEdit"
                @save="saveBlog"
            />
        </div>
        <div class="max-height">
            <mavonEditor
                upload_file_url="blog"
                v-model="articleData.article_string"
                @save="saveBlog"
                @change="changeFn"
            ></mavonEditor>
        </div>
        <div class="h-10"></div>

        <!-- 处理seo数据 -->
        <div class="page-demo"></div>

        <!-- 表格构建 -->
        <tableDialog v-model="dialogVisible" @confirm="tableDialogConfirm"></tableDialog>
    </div>
</template>

<script>
import { getArticle, addarticle, putArticle } from '@/api/blog'

export default {
    name: 'article1',
    components: {
        tableDialog: () => import('@/views/blog/admin/article/components/tableDialog.vue'),
        articleDetails: () => import('@/views/blog/admin/article/components/articleDetails.vue'),
        mavonEditor: () => import('@/components/mavonEditor/index.vue'),
    },
    data() {
        return {
            editObj: {},
            isChange: '',
            bc: null,
            isShowDetail: false,
            defaultList: [
                {
                    label: '博客记录填充',

                    title: '博客开发记录 ---',
                    content: `## 案例展示
## 功能描述
## 使用
## 实现`,
                },
                {
                    label: '医学记录填充',

                    title: '医学记录 ---',
                    content: `## 逻辑图地址
## 症状
## 病因
## 医治(药材，药量)`,
                },
            ],

            dialogVisible: false,
            dialogOption: {
                isShow: false,
            },
            articleData: {
                _id: '',
                article_content: '',
                article_string: '',
                class_id: '',
                article_keywords: '',
                article_bck_url: '',
                article_name: '',
                article_need_token: '1',
                article_watch_numbers: 0,
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
        }
    },
    created() {
        if (!this.isAdmin) {
            // 返回首页
            this.$router.replace('/home')
            return
        }
    },
    computed: {
        ...Vuex.mapGetters(['isAdmin']),
        isEdit() {
            return this.articleData._id ? true : false
        },
        query() {
            return this.$route.query
        },
        isDisabled() {
            if (this.articleData._id) {
                // 编辑有数据时
                return false
            }

            if (!this.query._id) {
                // 新增时
                return false
            }

            return true
        },
    },
    async mounted() {
        this.init()
    },
    beforeDestroy() {
        // 销毁广播
        if (this.bc) {
            this.bc.close()
        }
    },
    methods: {
        changeFn({ str, html }) {
            Object.assign(this.articleData, {
                article_string: str,
                article_content: html,
            })
            if (this.getType(this.isChange) === 'string') {
                this.isChange = false
                return
            }
            this.isChange = true
        },
        goLint() {
            window.open('https://www.qianbo.com.cn/Tool/Beautify/Js-Formatter.html')
        },
        // 前往详情页
        goInfoPage() {
            const query = {
                is_edit_from: 1,
            }
            let { from } = this.$route.query
            if (from) {
                query.from = from
            }
            this.$router.push({ path: `/blog/page/${this.articleData._id}`, query })
        },
        // 拿取表格配置项的数据
        tableDialogConfirm() {},
        // 打开项情配置
        openArticleDetails() {
            this.isShowDetail = true
        },
        // 默认填充事件处理中心
        handleTypeCommand({ item: { title, content }, index }) {
            this.$confirm('是否清空当前内容,并填充', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.articleData.article_string = content
                    let ref = this.$refs.articleDetailsRef
                    if (!ref) {
                        return this.$message.warning('内部错误，刷新重试2')
                    }

                    ref.params.article_name = title
                })
                .catch(() => {})
        },

        createTable() {
            this.dialogVisible = true
        },
        goBottom() {
            let el = $('.v-note-edit')
            let height = $('.content-input-wrapper').height() || 9999
            el.animate(
                {
                    scrollTop: height,
                },
                500,
            ) //2秒滑动到指定位置
        },

        // 进入页面 获取数据
        async init() {
            let { _id } = this.$route.query
            if (!_id) {
                // 新增
                this.isShowDetail = true
                return
            }

            // 编辑
            getArticle({
                _id,
                type: 3,
            })
                .then(async (res) => {
                    if (res.data && res.data.article) {
                        this.articleData = res.data.article
                        if (this.articleData.article_keywords) {
                            let arr = this.articleData.article_keywords.split('$$')
                            if (arr.length == 2) {
                                this.articleData.article_keywords = arr[1]
                            } else {
                                this.articleData.article_keywords = ''
                            }
                        }

                        // await this.sleep(500)
                        // 同步数据到详情

                        for (let i = 0; i < 20; i++) {
                            await this.sleep(50)
                            let { articleDetailsRef } = this.$refs
                            if (articleDetailsRef) break
                            if (i === 19) {
                                return this.$message.warning('内部错误，刷新重试1')
                            }
                        }

                        let {
                            class_id: { _id },
                            article_keywords,
                            article_bck_url,
                            article_name,
                            article_need_token,
                            article_watch_numbers,
                            blog_tags,
                        } = this.articleData

                        let params = {
                            class_id: _id,
                            article_keywords,
                            article_bck_url,
                            article_name,
                            article_need_token,
                            blog_tags,
                        }
                        if (blog_tags && this.getType(blog_tags) === 'string') {
                            params.blog_tags = blog_tags.split(',')
                        }
                        this.editObj = {
                            ...params,
                            article_watch_numbers: Number(article_watch_numbers),
                        }
                    }
                })
                .catch(() => {})
        },

        // 获取所有的h标签中的内容
        getAllHtitle(index = 2, list = []) {
            if (+index === 7) {
                return list
            }
            if ($(`.page-demo h${index}`).length) {
                for (let i = 0; i < $(`.page-demo h${index}`).length; i++) {
                    list.push($(`.page-demo h${index}`).eq(i).text())
                }
            }
            return this.getAllHtitle(index + 1, list)
        },

        // 处理出关键字
        handleKeyWords(article_name) {
            // h2-h6
            let result = this.getAllHtitle()
            // 添加标题
            result.unshift(article_name)

            // strong
            for (let i = 0; i < $(`.page-demo strong`).length; i++) {
                result.push($(`.page-demo strong`).eq(i).text())
            }

            // mark
            for (let i = 0; i < $(`.page-demo mark`).length; i++) {
                result.push($(`.page-demo mark`).eq(i).text())
            }

            // ins
            for (let i = 0; i < $(`.page-demo ins`).length; i++) {
                result.push($(`.page-demo ins`).eq(i).text())
            }

            // em
            for (let i = 0; i < $(`.page-demo em`).length; i++) {
                result.push($(`.page-demo em`).eq(i).text())
            }

            // s
            for (let i = 0; i < $(`.page-demo s`).length; i++) {
                result.push($(`.page-demo s`).eq(i).text())
            }
            return result.join(',')
        },

        // 处理参数
        getParams(params) {
            let ref = this.$refs.articleDetailsRef

            if (!ref) {
                return '请刷新重试'
            }
            let { article_string } = params

            let { class_id, article_bck_url, article_name, article_keywords, blog_tags } =
                ref.params

            let { _id } = this.articleData
            if (_id) {
                params._id = _id
            }

            // 处理标签
            params.blog_tags = Array.isArray(blog_tags) ? blog_tags.join(',') : ''

            if (!class_id) {
                return '请选择分类'
            }

            if (!article_bck_url) {
                return '请选择文章背景图片'
            }

            if (!article_name) {
                return '请选择文章背景图片'
            }

            if (article_string.trim().length == 0) {
                return '请输入内容'
            }

            // 处理seo的参数 由标题，子标题，strong项，手动录入项组成
            let keywords = this.handleKeyWords(article_name)

            if (article_keywords) {
                keywords = keywords + '$$' + article_keywords
            }
            return Object.assign({}, ref.params, params, { article_keywords: keywords })
        },

        /**
         * 编辑与新增
         * @param {String} article_string - 文章的字符串信息
         * @param {String} article_content - 文章的html信息
         */
        async saveBlog() {
            return new Promise(async (resolve) => {
                let { _id } = this.query
                const { article_string, article_content } = this.articleData
                // 向 page-demo 下添加节点信息收集seo信息
                $('.page-demo').html(article_content)
                await this.sleep()
                let params = await this.getParams({ article_string, article_content })

                if (this.getType(params) == 'string') {
                    return this.$message.error(params)
                }

                if (!this.articleData._id) {
                    // 新增
                    addarticle(params)
                        .then((res) => {
                            this.isChange = false
                            let { _id } = res.data
                            this.articleData._id = _id
                            this.updateUrl('_id', _id)
                            this.$message({
                                message: '新增成功',
                                type: 'success',
                                duration: 1000,
                            })
                            resolve()
                        })
                        .catch(() => {})
                    return
                }
                // 编辑
                putArticle(params)
                    .then(() => {
                        this.isChange = false
                        this.$message({
                            message: '修改成功',
                            type: 'success',
                            duration: 1000,
                        })

                        // 来源与心得记录页，需要跨标签页通信broadcastchannel
                        if (this.query.from === 'experience_record') {
                            this.bc = new BroadcastChannel('experience_record')
                            this.bc.postMessage({
                                _id,
                                article_content,
                            })
                        }
                        resolve()
                    })
                    .catch(() => {})
            })
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep {
    .v-note-wrapper {
        z-index: 980;
    }
    .content-input-wrapper {
        padding-bottom: 300px !important;
    }
    .article-title-cover {
        height: 60px;
        max-height: 60px;
        display: flex;
        margin-bottom: 15px;
    }
    .article-title {
        margin-right: 50px;
        display: flex;
        align-items: center;
        span {
            min-width: 80px;
            text-align: right;
            display: block;
            margin-right: 10px;
            white-space: nowrap;
        }
        .el-input {
            width: 400px;
        }
    }
}

.my-article-header {
    padding: 0 30px;
    height: 60px;
    min-height: 60px;
}

.v-note-wrapper {
    height: calc(100vh - 70px) !important;
}

.page-demo {
    position: absolute;
    top: 9999px;
    right: 9999px;
}
.m-l-15 {
    margin-left: 15px;
}
.article_admin_bg {
    max-height: 60px;
}
.m-l-20 {
    margin-left: 20px;
}
.h-200 {
    min-height: 130px;
}

.max-height {
    height: calc(100vh - 60px);
}
::v-deep {
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
            margin: 30px auto !important;
            display: inline-block;
            vertical-align: middle;
            text-align: left;
            white-space: normal;
        }
    }
}
$width: 12px;
.dor-danger {
    position: fixed;
    top: 5px;
    left: 5px;
    width: $width;
    height: $width;
    border-radius: 50%;
    background-color: $danger;
    z-index: 100;
}
</style>
