<template>
    <div class="page-container">
        <pageHeader
            @beginPlay="beginPlay"
            @setHistoryRead="setHistoryRead"
            @getArticle="getArticleNextPre"
            @openUserInfoPopup="openUserInfoPopup"
            @change="
                (row) => {
                    $emit('change', row)
                }
            "
            :isLoading="isLoading"
            :isUserStick="isUserStick"
            :article="article"
        ></pageHeader>
        <pageContent
            :readHistory="readHistory"
            @openUserInfoPopup="openUserInfoPopup"
            ref="pageContentRef"
            :isLoading="isLoading"
            :article="article"
            :total="total"
        ></pageContent>
        <pageFooter
            ref="pageFooter"
            @setHistoryRead="setHistoryRead"
            @goAnchor="goAnchor"
            @getArticle="getArticleNextPre"
            @footerEvent="footerEvent"
            :recommendArticle="recommendArticle"
            :readHistory="readHistory"
            :article="article"
            :menuList="menuList"
            :activeTitleId="activeTitleId"
        ></pageFooter>
    </div>
</template>

<script>
import pageHeader from '@/views/blog/home/page/mobile/components/pageHeader.vue'
import pageFooter from '@/views/blog/home/page/mobile/components/pageFooter.vue'
import pageContent from '@/views/blog/home/page/mobile/components/pageContent.vue'
import { getArticle } from '@/api/blog'
import httpApi from '@/api/blog/admin.js'

export default {
    components: {
        pageHeader,
        pageFooter,
        pageContent,
    },
    data() {
        return {
            menuActiveTitle: '',
            timer: null,
            article_id: '',
            readHistory: {},
            userInfoVisible: false,
            menuList: [],
            activeTitleId: '',
            total: 0,
            article: {},
            recommendArticle: {},
            isUserStick: false,
            isLoading: true,
            user_id: '',
        }
    },
    created() {
        this.init()
    },
    beforeDestroy() {
        this.setHistoryRead(this.article_id)
    },
    watch: {
        $route(to, from) {
            if (to.params.id && to.params.id !== from.params.id) {
                this.article_id = to.params.id
                this.init()
            }
        },
    },
    computed:{
        ...Vuex.mapState(['userdata']),
    },
    methods: {
        // 前往用户中心
        openUserInfoPopup() {
            if (this.article.author_id && this.article.author_id._id) {
                this.user_id = this.article.author_id._id
                this.$router.push({
                    path: '/blog/user_center',
                    query: {
                        user_id: this.user_id,
                    },
                })
                return
            }
            this.$klMessage('用户id不能为空')
        },
        // 上一篇下一篇
        async getArticleNextPre(id) {
            if (!id) {
                return this.$klMessage('id不存在')
            }
            this.isUserStick = false
            this.article = {}
            this.$router.push({
                path: '/blog/page/' + id,
            })
        },
        // 底部事件
        footerEvent() {},

        // 使用浏览器语音播放
        beginPlay() {
            // 正则替换掉全部的标签
            // 并给所有的h2~h7标签后面添加一个。
            let str = this.article.article_string
                .replace(/<\/h2>/g, '</h2>。')
                .replace(/<\/h3>/g, '</h3>。')
                .replace(/<\/h4>/g, '</h4>。')
                .replace(/<\/h5>/g, '</h5>。')
                .replace(/<\/h6>/g, '</h6>。')
                .replace(/<\/h7>/g, '</h7>。')
                .replace(/<[^>]+>/g, '')
            let msg = new SpeechSynthesisUtterance(str)
            msg.lang = 'zh-CN'
            msg.rate = 0.8
            msg.pitch = 1
            msg.volume = 1
            window.speechSynthesis.speak(msg)
        },

        // 上报文章浏览记录
        setHistoryRead(id) {
            let {user_blog_history} = this.userdata || {}
            if(user_blog_history!=1) return
            let article_id = id
            let { pageFooter } = this.$refs
            if (article_id && pageFooter) {
                let { menuActiveTitle } = pageFooter
                if (this.menuActiveTitle === menuActiveTitle) return
                this.menuActiveTitle = menuActiveTitle

                httpApi
                    .post_author_read_history({
                        article_id,
                        read_position: menuActiveTitle,
                    })
                    .then(() => {})
                    .catch(() => {})
            }
        },

        // 初始化
        init(id) {
            if (id) {
                // 这儿指挥改变链接，并不会触发页面刷新
                this.$router.push({
                    path: '/blog/page/' + id,
                })
            }
            if (!this.isLogin()) {
                return this.$router.replace('/login')
            }
            let { params } = this.$route

            if (!id && !params.id) {
                return this.$klMessage('参数错误！')
            }

            clearInterval(this.timer)
            this.timer = null
            this.timer = setInterval(() => {
                this.setHistoryRead(this.article_id)
            }, 1000 * 5)

            let article_id = id || params.id
            this.getArticle(article_id)
        },

        // 获取文章信息
        getArticle(_id) {
            this.article_id = _id
            this.isLoading = true
            let time1 = Date.now()
            getArticle({
                _id,
                type: 2,
            })
                .then((res) => {
                    let { total, article, recommendArticle, readHistory } = res.data
                    article.article_string = article?.article_content
                    this.total = total ? total - 0 : 0
                    this.article = this.getType(article) == 'object' ? article : {}
                    this.recommendArticle =
                        this.getType(recommendArticle) == 'object' ? recommendArticle : {}

                    this.readHistory = readHistory || {}

                    // 设置页面标题
                    document.title = article.article_name || '文章详情'
                })
                .catch(() => {})
                .finally(() => {
                    let sleep = 800
                    let time2 = Date.now() - time1
                    if (time2 > sleep) {
                        // 开启页面监听
                        this.pageEvent()
                    } else {
                        setTimeout(() => {
                            // 开启页面监听
                            this.pageEvent()
                        }, sleep - time2)
                    }
                })
        },

        // 开启的相关事件监听
        async pageEvent() {
            this.isLoading = false
            await this.$nextTick()
            // 获取页面结构
            let allTitle = this.getAllHtitle() || []
            // 创建title列表
            this.menuList = this.creatTitleList(allTitle)
            // 开始监听页面滚动
            this.menuListScroll()
            await this.$nextTick()
            // 判断文章状态
            this.$refs.pageFooter?.collectionStatus()

            // 给每段code添加一个hover放大的图标
            this.addCodePreviewEvent()

            // 给代码添加行号
            this.setLineNumber()
        },

        // 给代码添加行号
        setLineNumber() {
            let preList = document.querySelectorAll('.blog-html-page-mobile pre')
            preList.forEach((item) => {
                // 加一个ul li 来展示行号
                let ul = document.createElement('ul')
                let code = item.querySelector('code')
                let html = code.innerHTML
                let arr = html.split('\n')
                let str = ''
                let length = arr.length
                if (length > 0) {
                    for (let i = 0; i < length - 1; i++) {
                        str += `<li class="line-number-li">${i + 1}</li>`
                    }
                    ul.innerHTML = str
                    item.appendChild(ul)
                }
                // 仿苹果右侧头部3个点
                let div = document.createElement('div')
                div.className = 'line-number-div'
                div.innerHTML = `<div class="line-number-div-item"></div><div class="line-number-div-item"></div><div class="line-number-div-item"></div>`
                item.appendChild(div)
            })
        },
        // 给每段code添加一个hover放大的图标
        addCodePreviewEvent() {
            let els = $('pre')
            let i = `<i class="p-a f-20 f-550 c-fff el-icon-full-screen pos-icon-full-screen"></i>`
            els.each((index, el) => {
                $(el).append(i)
                // 绑定点击事件
                $(el)
                    .find('.pos-icon-full-screen')
                    .on('click', () => {
                        this.$refs.pageContentRef?.openPreviewCode(el)
                    })
            })

            // 给答案类型的添加展开收起
            let pres = document.querySelectorAll('pre')
            if (!pres || pres.length === 0) return
            pres = Array.from(pres)
            pres.forEach((item) => {
                let code = item.querySelector('code')
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
                    })
                    return
                }
            })
        },

        // 获取所有的h标签
        getAllHtitle(index = 2, list = []) {
            let scroll_el = document.querySelector('.page-content')
            // 距离顶部的距离
            if (!scroll_el) return
            let scroll_el_top = scroll_el.getBoundingClientRect().top || 50
            if (+index === 7) {
                return list
            }
            if ($(`h${index}`).length) {
                for (let i = 0; i < $(`h${index}`).length; i++) {
                    // console.log(i, $(`h${index}`).eq(i).text());
                    let val = $(`h${index}`).eq(i).text()
                    if (!$(`h${index}`).eq(i)) return
                    // 这儿由于可滚动区域恰好是争个屏高，故使用每个标题到顶部的距离
                    // 如果是局部滚动，可以拿到每个部分到顶部的距离，来减去滚动局部到顶部的距离
                    let top = $(`h${index}`).eq(i).offset().top - scroll_el_top
                    let obj = {
                        id: this.createId(),
                        val,
                        top,
                        h: `h${index}`,
                    }
                    // 为当前项添加 id锚点
                    let a_el = `<a id='${obj.id}'></a>${val}`
                    $(`h${index}`).eq(i).html(a_el)
                    list.push(obj)
                }
            }
            return this.getAllHtitle(index + 1, list)
        },
        goAnchor({ id, isSmooth = true }) {
            let that = this
            // 需要先移除
            document
                .querySelector('.page-content')
                .removeEventListener('scroll', this.blogPgeCodeScrollEvent)
            this.activeTitleId = id
            document.querySelector(`#${id}`).scrollIntoView({
                behavior: isSmooth ? 'smooth' : 'auto', // 添加顺滑滚动
            })

            setTimeout(() => {
                that.menuListScroll()
            }, 1000)
        },

        // 生成最终的title列表
        creatTitleList(list) {
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

            return res
        },

        // menu右侧滚动锚点对应选中的方法
        menuListScroll() {
            let el = document.querySelector('.page-content')
            if (!el) return
            // 需要先移除
            el.removeEventListener('scroll', this.blogPgeCodeScrollEvent)
            // 重新监听
            el.addEventListener('scroll', this.blogPgeCodeScrollEvent)
        },

        // 主要浏览区域滚动 复选目录 以及保持目录的滚动
        blogPgeCodeScrollEvent(e) {
            let { menuList } = this
            let page_el = $('.page-content')
            // 区域滚动距离
            let num = page_el.scrollTop() ? page_el.scrollTop() - 0 : 0
            let length = menuList.length

            for (let i = 0; i < length - 1; i++) {
                // 对于最后一项需要单独处理
                if (num >= menuList[length - 1].top) {
                    this.activeTitleId = menuList[length - 1].id
                    break
                }
                if (num >= menuList[i].top && num < menuList[i + 1].top) {
                    this.activeTitleId = menuList[i].id
                    break
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
