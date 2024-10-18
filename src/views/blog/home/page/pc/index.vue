<template>
    <div class="blog-page-code" v-cloak>
        <!-- loading -->
        <div class="preloader" v-if="isLoading">
            <div class="loader">
                <div class="line-scale-pulse-out">
                    <div class="laoding-item"></div>
                    <div class="laoding-item"></div>
                    <div class="laoding-item"></div>
                    <div class="laoding-item"></div>
                    <div class="laoding-item"></div>
                </div>
            </div>
        </div>

        <div class="pos-fixed-top">
            <el-button type="warning" @click="goArticle(data._id)" v-if="isAdmin">
                修改页
            </el-button>

            <el-button type="danger" @click="deleteArticle(data._id)" v-if="isAdmin">
                直接删除
            </el-button>

            <el-button v-if="query.from !== 'interview_test'" type="success" @click="goHome">
                返回
            </el-button>
            <el-button type="primary" @click="$router.push('/')"> 前往首页 </el-button>
            <el-button type="primary" @click="openDrawer">历史记录</el-button>
        </div>
        <div class="scroll-y">
            <!-- //TODO:测试 -->
            <!-- <kl-ctrl-f ref="ctrlRef" class="pos-ctrl-f" v-if="isDev()" /> -->
            <div class="w-1000">
                <div class="mulu" id="mulu" v-if="menuList.length">
                    <p>目录</p>
                    <div class="mulu-container">
                        <a
                            @click="goAnchor(item.id)"
                            v-for="item in menuList"
                            :key="item.id"
                            :class="[
                                'ell',
                                activeTitleId === item.id ? 'title-active' : '',
                                item.h === 'h2' || item.h === 'comments' ? 'p-l-15' : '',
                                item.h === 'h3' ? 'p-l-30' : '',
                                item.h === 'h4' ? 'p-l-45' : '',
                                item.h === 'h5' ? 'p-l-60' : '',
                                item.h === 'h6' ? 'p-l-75' : '',
                            ]"
                        >
                            {{ item.val }}
                        </a>
                    </div>
                </div>

                <div class="left-mulu">
                    <!-- 功能区 (通过判断收藏列表有没有当前的文章) -->
                    <funCom
                        ref="funComRef"
                        :article_id="article_id"
                        :isCollection="isCollection"
                        :activeTitleId="activeTitleId"
                        :menuList="menuList"
                        @collectionEnv="collectionEnv"
                        class="m-b-20"
                    />

                    <!-- 上一篇，下一篇 -->
                    <recomment
                        v-if="isHaveComment"
                        class="m-b-20"
                        :recommendArticle="recommendArticle"
                        @goNextPage="goNextPage"
                    />

                    <!-- 收藏列表 -->
                    <collectionCom
                        @goNextPage="goNextPage"
                        :article_id="article_id"
                        :total="collectionTotal"
                        :current="collectionCurrent"
                    />
                </div>
            </div>

            <div class="page_container">
                <h1 class="page-title" v-if="data.article_name">
                    {{ data.article_name }}
                    <span
                        class="c-primary f-14 m-l-5"
                        v-if="!(!data.article_need_token || data.article_need_token == 1)"
                    >
                        私密文章
                    </span>
                </h1>

                <section class="flex-wrap flex-center-wrap">
                    <span class="page-type m-r-30" v-if="data.article_updata_time">
                        文章分类：博文&nbsp;|&nbsp;{{ data.class_id.class_name }}
                    </span>

                    <time class="page-time" v-if="data.article_updata_time">
                        近期修改时间：{{ data.article_updata_time | filterTime }}
                    </time>

                    <span class="watch-cover" v-if="!isLoading && isAdmin">
                        分类|标签：
                        <mark v-if="data.class_id">
                            {{ data.class_id.class_name }} <span v-if="data.article_tags">|</span>
                            {{ data.article_tags }}
                        </mark>
                    </span>

                    <span class="watch-cover" v-if="!isLoading">
                        阅读量：
                        <mark>
                            {{ data.article_watch_numbers }}
                        </mark>
                    </span>
                </section>
            </div>
            <div class="pos-page-main" id="pos-page-main" ref="pageMain">
                <div v-if="data.article_string">
                    <el-button
                        ref="copyRef"
                        type="primary"
                        size="mini"
                        icon="el-icon-document"
                        class="testCopy"
                        @click="copy"
                    ></el-button>

                    <div v-highlight class="blog-html-page blog-html-page-pc">
                        <div v-html="data.article_string"></div>
                    </div>

                    <div class="m-t-30" v-show="isWebkit()">
                        <comment-list :id="commentListId" :article_id="article_id" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 返回顶部组件 -->
        <kl-back-top el="#pos-page-main" />

        <!-- 预览组件 -->
        <kl-preview-img ref="imgPreviewRef"></kl-preview-img>

        <!-- 历史记录 -->
        <el-drawer size="600px" title="阅读历史" :visible.sync="isDrawer">
            <div class="p-10" v-if="historyList.length > 0">
                <div
                    @click="goPage(item.article_id._id)"
                    class="ell-1 h-60 cu history-item"
                    v-for="(item, index) in historyList"
                    :key="item._id"
                >
                    {{ index + 1 }}、【{{
                        klDateFormat(item.updata_time, 'yyyy-MM-dd hh-mm-ss')
                    }}】-- {{ item.article_id.article_name }}
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import { filterTime } from '@/utils'
import { getArticle, delArticle } from '@/api/blog'
import adminApi from '@/api/blog/admin.js'
import recomment from '@/views/blog/home/page/components/recomment.vue'
import collectionCom from '@/views/blog/home/page/components/collectionCom.vue'
import funCom from '@/views/blog/home/page/components/funCom.vue'
import httpApi from '@/api/blog/admin.js'
export default {
    name: 'page',
    components: {
        recomment,
        collectionCom,
        funCom,
    },
    data() {
        return {
            mainPageScrollTop: 0, //
            isFlag: true,
            historyList: [],
            readHistory: [],
            isDrawer: false,
            menuActiveTitle: '',
            isLoading: false,
            maxStep: 0,
            isCollection: '2',
            recommendArticle: {
                pre: {},
                next: {},
            },
            commentListId: '',
            article_id: '',
            oldMenu: [],
            activeTitleId: '',
            _id: '',
            elTarget: null,
            createClass: '',
            isShowUp: false,
            menuList: [], // 生成的目录结构
            data: {
                article_need_token: '',
                article_name: '',
            },
            timer: null,
            collectionList: [],
            article_anchor_point: '',
            collectionTotal: 0,
            collectionCurrent: 0,
        }
    },

    mounted() {
        this.init()
    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.timer = null
        this.setHistoryRead(this.article_id)
    },
    filters: {
        filterTime(val) {
            var datetime = new Date(val) // 如果不是时间戳 就在这儿这作为参数传入
            var year = datetime.getFullYear()
            var month = datetime.getMonth() + 1
            var date = datetime.getDate()
            var hour = datetime.getHours()
            if (hour <= 9) {
                hour = '0' + hour
            }
            var minute = datetime.getMinutes()
            if (minute <= 9) {
                minute = '0' + minute
            }
            var second = datetime.getSeconds()
            if (second <= 9) {
                second = '0' + second
            }
            // var mseconds = datetime.getMilliseconds();
            let result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
            return result
        },
    },
    computed: {
        ...Vuex.mapState(['userdata']),
        ...Vuex.mapGetters(['isAdmin', 'isLogin']),

        // 是否显示推荐
        isHaveComment() {
            let { pre={}, next={} } = this.recommendArticle || {}
            return Object.keys(pre).length || Object.keys(next).length
        },

        query() {
            return this.getQuery()
        },
        // 是否上报历史记录
        user_blog_history() {
            return this.userdata?.user_blog_history || 2
        },
    },
    methods: {
        ...Vuex.mapActions(['GET_COLLECTIONS_LIST']),
        goPage(id) {
            this.isDrawer = false
            this.goNextPage(id)
        },
        openDrawer() {
            this.isDrawer = true
            httpApi
                .get_author_read_history({ limit: 10 })
                .then((res) => {
                    this.historyList = res.data.data.filter((item) => {
                        if (item.article_id) {
                            return item
                        }
                    })
                })
                .catch((err) => {})
        },
        collectionEnv(val) {
            let { article_id } = this
            this.isCollection = val
            let params = {
                article_id,
            }

            switch (+val) {
                case 1:
                    // 收藏
                    adminApi
                        .post_collection_articles(params)
                        .then((res) => {
                            this.$message.success(res.msg)
                            this.GET_COLLECTIONS_LIST()
                        })
                        .catch((err) => {})
                    break
                case 2:
                    // 取消收藏
                    adminApi
                        .delete_collection_article(params)
                        .then((res) => {
                            this.$message.success(res.msg)
                            this.GET_COLLECTIONS_LIST()
                        })
                        .catch((err) => {})
                    break
            }
        },

        goNextPage(id) {
            this.init(id)
        },
        // 上报文章浏览记录
        setHistoryRead(id) {
            let { isLogin, user_blog_history } = this
            if (!isLogin || user_blog_history != 1) return
            let article_id = this.$route.params.id || id
            let { funComRef } = this.$refs
            if (!article_id || !funComRef || !funComRef.menuActiveTitle) return
            const { menuActiveTitle } = funComRef
            if (this.menuActiveTitle === menuActiveTitle) return
            this.menuActiveTitle = menuActiveTitle
            let read_progress = 0
            httpApi
                .post_author_read_history({
                    article_id,
                    read_position: menuActiveTitle,
                    read_progress,
                })
                .then(() => {})
                .catch(() => {})
        },
        allImgLoad() {
            return new Promise((resolve) => {
                let els = document.querySelectorAll('.blog-html-page img')
                if (!els || els.length === 0) {
                    resolve()
                }

                for (let i = 0; i < els.length; i++) {
                    let item = els[i]
                    // 给图片绑定点击事件
                    item.onclick = () => {
                        this.prevewImg(item)
                    }
                    // 获取图片的src
                    let src = item.src
                    item.src = ''
                    let img = new Image()
                    img.src = item.src
                    // 重新设置图片的宽高
                    $(item).attr('data-src', src)
                    let arr = src.split('~')
                    arr = arr.filter((item) => !isNaN(+item))
                    if (Array.isArray(arr)) {
                        let len = arr.length
                        if (len === 3) {
                            let maxWidth = 960
                            let width = +arr[1]
                            let height = +arr[2]
                            if (isNaN(width) || isNaN(height)) return
                            if (width > maxWidth) {
                                let scale = maxWidth / width
                                width = maxWidth
                                height = height * scale
                            }
                            $(item).css({
                                opacity: 0,
                                width: width + 'px',
                                height: height + 'px',
                            })
                        }
                        let ob = new IntersectionObserver((entries) => {
                            let enter = entries[0]
                            if (enter.isIntersecting) {
                                let src = $(item).attr('data-src')
                                item.src = src
                                $(item).css({
                                    opacity: 1,
                                })
                                ob.unobserve(item)
                            }
                        })
                        ob.observe(item)
                    }

                    resolve()
                }
            })
        },
        async init(article_id) {
            let { is_edit_from } = this.query
            let { isAdmin, isLogin } = this
            // if (!isLogin) {
            //     return this.$router.replace('/login')
            // }
            clearInterval(this.timer)
            this.timer = null
            this.timer = setInterval(() => {
                this.setHistoryRead(this.article_id)
            }, 1000 * 5)

            this.isLoading = true
            this.mainPageScrollTop = 0
            if (article_id) {
                let { query } = this
                this.$router.push({
                    path: '/blog/page/' + article_id,
                    query,
                })
                this.data = { article_need_token: '', article_name: '' }
                this.menuList = []
                this.article_id = article_id
                // 滚回顶部
                this.$refs.pageMain.scrollTop = 0
            } else {
                let { id } = this.$route.params
                this.article_id = id
                if (!id) {
                    this.$router.push('/blog')
                }
            }

            this.commentListId = this.createId()
            // 获取收藏列表
            if (isLogin) {
                this.GET_COLLECTIONS_LIST(true)
            }

            let data = {}
            try {
                data = await getArticle({
                    _id: this.article_id,
                    type: 2,
                })
            } catch (err) {
                this.isLoading = false
            }

            if (!this.isObject(data) || !this.isObject(data.data)) return

            let { article, recommendArticle, readHistory, article_tags } = data.data
            this.recommendArticle = recommendArticle
            if (is_edit_from) {
                try {
                    let recommendArticle = await this.getStore('recommendArticle')
                    if (recommendArticle) {
                        this.recommendArticle = recommendArticle
                        // 清空参数
                        await this.removeStore('recommendArticle')
                        // 清空链接上的参数
                        this.updateUrl('is_edit_from', null)
                    }
                } catch (e) {
                    // console.log(e)
                }
            }
            let { pre, next } = recommendArticle
            this.isHaveComment = pre || next
            article.article_string = article?.article_content
            article.article_updata_time = filterTime(article?.article_updata_time)
            this.readHistory = readHistory || {}
            this.data = article
            if (article_tags) {
                this.$set(this.data, 'article_tags', article_tags)
            }
            // 设置网页标题
            let { article_name, article_need_token } = article
            document.title = article_name || ''

            await this.$nextTick()
            await this.allImgLoad()
            // 判断当前文章是否需要token
            if (article_need_token == 2 && !isAdmin) {
                this.isLoading = false
                this.$router.push('/login')
                return
            }

            // 给代码添加行号
            this.setLineNumber()

            this.isLoading = false
            // 获取页面结构
            let allTitle = this.getAllHtitle()

            if (this.isWebkit()) {
                // 只有在谷歌浏览器才有评论
                let el = $(`#${this.commentListId}`)
                if (el && el.offset()) {
                    let obj = {
                        h: 'comments',
                        id: this.commentListId,
                        top: el.offset().top,
                        val: '底部评论',
                    }

                    allTitle.push(obj)
                }
            }

            // 创建title列表
            this.menuList = this.creatTitleList(allTitle)

            if (this.menuList.length) {
                this.activeTitleId = this.menuList[0].id
            }
            // 锚点状态
            let { article_anchor_point, article_anchor_point_title, user_blog_history } =
                this.userdata
            // 存在历史记录，要跳转到对应的标题处
            let { read_position } = this.readHistory
            if (
                user_blog_history == 1 &&
                ((article_anchor_point == this.article_id && article_anchor_point_title) ||
                    read_position)
            ) {
                article_anchor_point_title = read_position || article_anchor_point_title
                let ac = this.menuList.find((item) => item.val == article_anchor_point_title)
                if (!ac) return
                this.$message({
                    message: '请继续阅读',
                    type: 'info',
                    duration: 1000,
                })
                this.goAnchor(ac.id, false)
            }

            // 给所有的a标签都添加新页面打开
            this.setANewPage()
            // 给code绑定复制
            this.setCopyCode()
            let { content } = this.$route.query
            let { ctrlRef } = this.$refs
            if (content && ctrlRef) {
                ctrlRef.inputVal = content
                ctrlRef.inputChange()
            }
        },

        // 重新计算滚动
        handlerMneuListScroll() {
            let newList = this.getAllHtitle(2, [], false)
            newList = newList.sort((a, b) => {
                return a.top - b.top
            })
            if (newList.length === this.menuList.length - 1) {
                let result = this.menuList.map((item, index) => {
                    if (index === this.menuList.length - 1) {
                        // 评论
                        return item
                    }
                    return {
                        ...item,
                        top: newList[index].top + this.mainPageScrollTop,
                    }
                })

                this.menuList = this.creatTitleList(result, false)
            }
        },

        // 给代码添加行号
        async setLineNumber() {
            let preList = document.querySelectorAll('.blog-html-page pre')

            if (preList.length == 0 && this.maxStep < 40) {
                this.maxStep++
                await this.sleep(50)
                this.setLineNumber()
                return
            }
            this.maxStep = 0

            preList.forEach((item) => {
                // 加一个ul li 来展示行号
                let ul = document.createElement('ul')
                let code = item.querySelector('code')
                if (!code) return

                let html = code.innerHTML
                let arr = html.split('\n')
                let str = ''
                let length = arr.length
                if (length === 0) return
                for (let i = 0; i < length - 1; i++) {
                    str += `<li class="line-number-li">${i + 1}</li>`
                }
                ul.innerHTML = str
                item.appendChild(ul)
                //  获取类名
                let className = code.className
                let div = document.createElement('div')
                if (className && className.includes('lang-da')) {
                    // 答案类的
                    div.className = `da-btn ${this.createId()}`
                    div.innerHTML = `查看答案`

                    item.appendChild(div)
                    // 添加事件监听
                    div.addEventListener('click', () => {
                        if (div.innerHTML === '查看答案') {
                            div.innerHTML = '隐藏答案'
                            code.classList.add('show-da')
                        } else {
                            div.innerHTML = '查看答案'
                            code.classList.remove('show-da')
                        }
                        this.handlerMneuListScroll()
                    })
                    return
                }
                // 仿苹果右侧头部3个点
                div.className = 'line-number-div'
                div.innerHTML = `<div class="line-number-div-item"></div><div class="line-number-div-item"></div><div class="line-number-div-item"></div>`
                item.appendChild(div)
            })
        },

        // 新页面打开
        setANewPage() {
            let a_els = $('.blog-html-page a')
            if (a_els && a_els.length) {
                for (let i = 0; i < a_els.length; i++) {
                    a_els.eq(i).attr('target', '_blank')
                }
            }
        },
        // 返回首页
        goHome() {
            let { from } = this.query
            if (from === 'blog_home') {
                this.$router.push('/blog/home')
                return
            }
            this.$router.go(-1)
        },
        // 复制方法的实现
        async setCopyCode() {
            await this.sleep()
            let that = this
            let elCodes = document.querySelectorAll('code')
            if (!elCodes || elCodes.length === 0) return
            for (let i = 0; i < elCodes.length; i++) {
                const codeEl = elCodes[i]
                // 获取类名
                if (!codeEl) return
                let className = codeEl.className
                if (className && className.includes('lang-da')) {
                    continue
                }
                // 移入移出
                codeEl.addEventListener('mouseenter', function (e) {
                    that.elTarget = e.target
                    if (!that.elTarget) return
                    let elDiv = document.createElement('div')
                    that.createClass = that.createId()
                    elDiv.className = 'copy-button' + ' ' + that.createClass
                    elDiv.innerText = '复制'
                    e.target.appendChild(elDiv)
                    let el = document.querySelector('.' + that.createClass)
                    if (!el) return
                    el.addEventListener(
                        'click',
                        function () {
                            that.$refs.copyRef.$el.click()
                        },
                        false,
                    )
                })

                codeEl.addEventListener('mouseleave', function (e) {
                    that.elTarget = null
                    if (!that.createClass) return
                    let el = document.querySelector('.' + that.createClass)
                    if (!el) return
                    e.target.removeChild(el)
                })
            }
        },
        // 监听一个节点是否停止滚动
        async listenScrollStop(el, callback) {
            let num = el.scrollTop || 0
            await this.sleep(100)
            if (num === el.scrollTop) {
                callback()
            } else {
                this.listenScrollStop(el, callback)
            }
        },
        //锚点跳转
        async goAnchor(id, isSmooth = true) {
            let el = document.querySelector('.pos-page-main')
            if (!el) return
            this.activeTitleId = id
            this.isFlag = false
            document.querySelector(`#${id}`).scrollIntoView({
                behavior: isSmooth ? 'smooth' : 'auto', // 添加顺滑滚动
            })
            this.listenScrollStop(el, () => {
                this.isFlag = true
            })
        },
        // 复制代码
        copy() {
            let { isLogin, createClass, elTarget } = this
            if (!isLogin) {
                this.$confirm('登录后开启一键复制')
                    .then(() => {
                        this.$router.push('/login')
                    })
                    .catch(() => {})
                return
            }

            document.querySelector('.' + createClass).innerText = ''
            let that = this
            const clipBoard = new ClipboardJS('.testCopy', {
                // 通过target指定要复印的节点
                target: function () {
                    return elTarget
                },
            })
            // 单一弹框
            clipBoard.on('success', function (e) {
                document.querySelector('.' + createClass).innerText = '复制成功'
                e.clearSelection()
                clipBoard.destroy()
            })

            clipBoard.on('error', function (e) {
                that.$message.error('复制失败，请重试')
            })
        },

        goArticle(_id) {
            if (!_id) {
                return this.$message.error('内部错误')
            }
            let { from } = this.query
            const query = {
                _id,
            }

            if (from === 'blog_home') {
                query.from = 'blog_home'
            }
            // 需要先保存一下推荐信息
            this.setStore('recommendArticle', this.recommendArticle)
            this.$router.push({
                path: `/blog/admin_article`,
                query,
            })
        },

        async deleteArticle(_id) {
            this.$confirm('确定删除吗？')
                .then(async () => {
                    let data = await delArticle({
                        _id,
                    })
                    this.$message({
                        type: 'success',
                        message: data.msg,
                        duration: 1000,
                    })

                    // 如果存在下一篇，就跳转到下一篇
                    let { next } = this.recommendArticle
                    if (this.isObject(next) && next._id) {
                        return this.goNextPage(next._id)
                    }
                    this.$router.push(`/blog/home`)
                })
                .catch(() => {})
        },
        // 获取所有的h标签
        getAllHtitle(index = 2, list = [], isInit = true) {
            if (+index === 7) {
                return list
            }
            const els = $(`h${index}`)
            let { length } = els
            if (length) {
                for (let i = 0; i < length; i++) {
                    const el = els.eq(i)
                    if (!el) continue
                    let val = el.text()
                    let top = el.offset().top
                    let obj = {
                        id: this.createId(),
                        val,
                        top,
                        h: `h${index}`,
                    }
                    if (isInit) {
                        // 为当前项添加 id锚点
                        let a_el = `<a class="pr anchor-point" id='${obj.id}'></a>${val}`
                        el.html(a_el)
                    }

                    list.push(obj)
                }
            }
            return this.getAllHtitle(index + 1, list, isInit)
        },

        // 计算每个标题到顶部的距离
        createTitleTops() {},
        // 生成最终的title列表
        creatTitleList(list, isInit = true) {
            let res = []
            if (list.length === 0) {
                return []
            }
            list = list.sort((a, b) => {
                return a.top - b.top
            })

            for (let i = 0; i < list.length; i++) {
                res.push(list[i])
            }

            this.oldMenu = list
            // 滚动监听
            if (isInit) {
                this.menuListScroll()
            }

            return res
        },
        // 主要浏览区域滚动 复选目录 以及保持目录的滚动
        blogPgeCodeScrollEvent(e) {
            if (!this.isFlag) return
            let page_el = $('.pos-page-main')
            if (!page_el) return

            // 区域滚动距离
            let num = page_el.scrollTop() ? page_el.scrollTop() - 0 : 0
            this.mainPageScrollTop = num
            let { length } = this.oldMenu
            for (let i = 0; i < length - 1; i++) {
                // 对于最后一项需要单独处理
                if (num >= this.oldMenu[length - 1].top) {
                    this.activeTitleId = this.oldMenu[length - 1].id
                    // 左侧滚动，目录高亮始终保持在顶部
                    $('.mulu-container').animate({ scrollTop: 35 * i }, 0)
                    break
                }
                if (num >= this.oldMenu[i].top && num < this.oldMenu[i + 1].top) {
                    this.activeTitleId = this.oldMenu[i].id
                    // 左侧滚动，目录高亮始终保持在顶部
                    $('.mulu-container').animate({ scrollTop: 35 * i }, 0)
                    break
                }
            }
        },
        // menu右侧滚动锚点对应选中的方法
        menuListScroll() {
            let el = document.querySelector('.pos-page-main')
            el && el.addEventListener('scroll', this.blogPgeCodeScrollEvent)
        },
    },
}
</script>

<style>
.anchor-point {
    /* 协调定位位置 */
    top: -5px;
}
</style>
<style lang="scss" scoped>
.blog-page-code {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100vh;
    height: 100vh;
    overflow-y: auto;
    .pos-fixed-top {
        position: fixed;
        left: 20px;
        top: 10px;
        z-index: 99;
    }
    h1.page-title {
        font-size: 24px;
        color: #555;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .page-time {
        display: block;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        color: $primary;
    }
    .page-type {
        display: block;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        color: $primary;
        margin-right: 30px;
    }
    .page_container {
        width: 1000px;
        max-width: 1000px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .scroll-y {
        width: 1000px;
        max-width: 1000px;
    }
}

.mulu {
    position: absolute;
    top: 55px;
    right: -250px;
    width: 250px;
    p {
        height: 35px;
        line-height: 35px;
        font-weight: 550;
        text-align: center;
        border-bottom: 2px solid #f1f1f1;
    }
    a {
        font-size: 14px;
        display: block;
        padding: 8px;
        cursor: pointer;
        &:hover {
            background-color: #f5f5f5;
            color: $primary;
        }
    }
    .title-active {
        background-color: #f5f5f5;
        color: $primary;
    }
    .p-l-15 {
        padding-left: 15px !important;
    }
    .p-l-30 {
        padding-left: 30px !important;
    }
    .p-l-45 {
        padding-left: 45px !important;
    }
    .p-l-60 {
        padding-left: 60px !important;
    }
    .p-l-75 {
        padding-left: 75px !important;
    }
}
.mulu-container {
    height: calc(100vh - 110px);
    overflow-y: auto;
}
.left-mulu {
    position: absolute;
    top: 90px;
    left: -250px;
    width: 250px;
}

.up-top {
    cursor: pointer;
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 15px;
    box-shadow: 0 0 10px #369;
}
.testCopy {
    position: fixed;
    top: -9999px;
    left: -9999px;
}

.w-1000 {
    position: fixed;
    width: 1000px;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
}

@media screen and (max-width: 750px) {
    .page {
        padding: 0 10px;
        max-width: 100vw;
        h1,
        .page-title {
            font-size: 24px !important;
            font-weight: 550;
        }

        h2 {
            font-size: 20px;
            font-weight: 550;
        }
        h3 {
            font-size: 18px;
            font-weight: 550;
        }
        h4,
        h5,
        h6 {
            font-size: 16px;
            font-weight: 550;
        }
    }
    .page-title {
        max-width: 100vw;
    }
}

.pos-ctrl-f {
    position: absolute;
    top: 100px;
    left: 5px;
    z-index: 9999;
}
.pos-page-main {
    max-height: calc(100vh - 90px);
    overflow-y: auto;
}
.watch-cover {
    margin-left: 50px;
    font-size: 14px;
}

.preloader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 800;
    height: 100%;
    display: table;
}

.loader {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    width: 100vw;
}

.line-scale-pulse-out > div {
    background: #fff;
    width: 6px;
    height: 60px;
    border-radius: 3px;
    margin: 3px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
    animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
}

.line-scale-pulse-out > div:nth-child(1),
.line-scale-pulse-out > div:nth-child(5) {
    -webkit-animation-delay: -0.2s !important;
    animation-delay: -0.2s !important;
}

.line-scale-pulse-out > div:nth-child(2),
.line-scale-pulse-out > div:nth-child(4) {
    -webkit-animation-delay: -0.4s !important;
    animation-delay: -0.4s !important;
}

@-webkit-keyframes line-scale-pulse-out {
    0% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }

    50% {
        -webkit-transform: scaleY(0.4);
        transform: scaleY(0.4);
    }

    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
}

@keyframes line-scale-pulse-out {
    0% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }

    50% {
        -webkit-transform: scaleY(0.4);
        transform: scaleY(0.4);
    }

    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
}
.history-item {
    padding: 0 10px;
    line-height: 60px;
    transition: all 0.2s;
}
.history-item:hover {
    background-color: #ccc;
    color: #fff;
}
</style>
