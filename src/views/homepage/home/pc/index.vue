<template>
    <!-- pc首页 pc主页 -->
    <div class="home-page common-bg-1" :style="{ backgroundImage: `url('${pageBgImg}')` }">
        <div class="common-bg-1 p-t-90">
            <klWordsFlake v-if="isPc()" />
            <comHeader />

            <div class="home-page-main pr">
                <div class="canvas-bg" :style="getBgStyle()"></div>
                <div class="w-1100-center">
                    <div class="home-page-main-left" id="home-page-main-scroll-main">
                        <div class="search-main common_bck_1" v-if="searchOption.isSearch">
                            <span @click="getRankingClasssInit" class="c-primary cu">首页</span>
                            <span class="m-r-2">></span> 找到
                            <span class="c-danger m-r-2">{{ searchOption.total }}</span> 篇与
                            <span class="c-danger m-r-2">{{ searchOption.content_old }}</span>
                            相关的文章
                        </div>
                        <klScroll
                            ref="klScrollRef"
                            :scrollHeight="scrollHeight"
                            :list="rankingClasss"
                            :pageOption="pageOption"
                            :minHeight="200"
                            @bottom="bottomE"
                        >
                            <div
                                :class="[
                                    'article-item common_bck_1',
                                    index === rankingClasss.length - 1 ? 'm-b-0' : 'm-b-15',
                                ]"
                                v-for="(item, index) in rankingClasss"
                                :key="item._id"
                                @click.stop="goPage(item)"
                            >
                                <div class="article-bg-cover">
                                    <e-image
                                        alt="blog"
                                        title="blog"
                                        :src="item.article_bck_url"
                                        class="article-bg"
                                    />
                                </div>
                                <div class="article-item-right">
                                    <div class="article-title ell-1">
                                        {{ item.article_name }}
                                    </div>
                                    <div class="article-content ell-4">
                                        {{ item.article_keywords }}
                                    </div>

                                    <div class="article-item-footer">
                                        <div class="left">
                                            <kl-svg class="m-r-5" name="mulu" />
                                            <p class="f-14 m-w-130 ell-1">
                                                博文&nbsp;|&nbsp;{{ item.class_id.class_name }}
                                            </p>
                                            <kl-svg class="m-r-5 m-l-15" name="rili" />
                                            <span class="f-14"
                                                >{{ item.article_updata_time | filterArticleTime }}
                                            </span>

                                            <kl-svg
                                                class="svg-fire m-r-5 m-l-15"
                                                :style="{ color: 'red' }"
                                                name="fire"
                                            />

                                            <span class="f-14">
                                                {{
                                                    item.article_watch_numbers
                                                        ? item.article_watch_numbers
                                                        : 0
                                                }}
                                            </span>
                                        </div>

                                        <el-button
                                            type="danger"
                                            v-if="isAcArticle(item)"
                                            size="small"
                                            @click.stop="deleteAc(item)"
                                        >
                                            直接删除
                                        </el-button>
                                        <el-button
                                            v-else
                                            type="primary"
                                            size="small"
                                            @click.stop="goPage(item)"
                                        >
                                            阅读全文
                                        </el-button>
                                    </div>
                                </div>
                            </div>

                            <div
                                v-if="searchOption.isSearch && !searchOption.total"
                                class="no-ranking-classs flex-center cu common_bck_1 h-200"
                            >
                                没有找到相关内容您可以
                                <span @click="getRankingClasssInit" class="c-primary cu">点击</span>
                                这里返回首页！
                            </div>
                        </klScroll>
                    </div>
                    <div class="home-page-main-right">
                        <div class="home-page-right-search common_bck_1">
                            <div class="my-input">
                                <input
                                    class="search f-14"
                                    v-model.trim="searchOption.content"
                                    @keyup.enter="searchArticleAll"
                                    placeholder="请输入搜索内容"
                                    type="text"
                                    @focus="handleHistory('open')"
                                    @blur="handleHistory('blur')"
                                />
                                <div class="search-icon" @click="searchArticleAll">
                                    <kl-svg class="svg-search m-r-5 m-l-15" name="search" />
                                </div>
                            </div>

                            <!-- 历史记录部分 -->
                            <div
                                v-if="
                                    historyObj &&
                                    historyObj.isHistory &&
                                    historyObj.historyList.length
                                "
                                :class="['historical-records', historyObj.isHistory ? '' : '']"
                            >
                                <div class="history-title">
                                    <span> 历史记录 </span>
                                    <kl-svg name="close" @mousedown="handleHistory('close')" />
                                </div>
                                <div class="history-list better-scroll">
                                    <template v-if="isArrayLength(historyListComputed)">
                                        <div
                                            class="item"
                                            v-for="item in historyListComputed"
                                            :key="item.id"
                                        >
                                            <span
                                                class="ell cu"
                                                @mousedown="handleHistory('select', item)"
                                            >
                                                {{ item.content }}
                                            </span>
                                            <div
                                                class="svg-delete-cover cu"
                                                @mousedown.stop="handleHistory('delete', item)"
                                            >
                                                <kl-svg class="svg-delete" name="delete" />
                                            </div>
                                        </div>
                                    </template>
                                    <div v-else class="flex-center h-40 f-14 c-primary p-b-20">
                                        暂无历史记录
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 标签 -->
                        <div class="click-ranking common_bck_1 m-b-15" v-if="isAdmin">
                            <div class="click-ranking-title">
                                文章标签
                                <div class="line"></div>
                            </div>

                            <div class="p-15" v-if="tagList.length > 0">
                                <el-checkbox-group v-model="blog_tags" @change="blog_tags_change">
                                    <el-checkbox
                                        v-for="item in tagList"
                                        :key="item.id"
                                        :label="item.tag_name"
                                    ></el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="flex-center jilu" v-else>暂无记录</div>
                        </div>

                        <!-- 阅读记录 -->
                        <div class="click-ranking common_bck_1" v-if="islogin">
                            <div class="click-ranking-title">
                                阅读记录
                                <div class="line"></div>
                            </div>

                            <div v-if="readHistory.length > 0">
                                <div
                                    class="updata-item"
                                    v-for="item in readHistory"
                                    :key="item._id"
                                    @click="goPage(item, 1)"
                                >
                                    <div class="click-ranking-item-img-cover">
                                        <e-image
                                            :src="item.article_id.article_bck_url"
                                            alt="blog"
                                            title="blog"
                                            class="article-bg"
                                        />
                                    </div>
                                    <div class="updata-item-item">
                                        <div class="time f-14 ell-1">
                                            {{ (item.updata_time - 0) | filterArticleTime }}
                                        </div>
                                        <div class="content f-14 ell-1">
                                            {{ item.article_id.article_name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-center jilu" v-else>暂无记录</div>
                        </div>

                        <!-- 近更新 -->
                        <div class="click-ranking common_bck_1 m-t-15">
                            <div class="click-ranking-title">
                                最新文章
                                <div class="line"></div>
                            </div>
                            <div
                                class="updata-item"
                                v-for="item in recentUpdates"
                                :key="item._id"
                                @click="goPage(item)"
                            >
                                <div class="click-ranking-item-img-cover">
                                    <e-image
                                        :src="item.article_bck_url"
                                        alt="blog"
                                        title="blog"
                                        class="article-bg"
                                    />
                                </div>
                                <div class="updata-item-item">
                                    <div class="time f-14 ell-1">
                                        {{ item.article_updata_time | filterArticleTime }}
                                    </div>
                                    <div class="content f-14 ell-1">
                                        {{ item.article_name }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 点击排行 -->
                        <div :class="['click-ranking', 'common_bck_1', islogin ? 'm-t-15' : '']">
                            <div class="click-ranking-title">
                                点击排行
                                <div class="line"></div>
                            </div>
                            <div
                                class="click-ranking-item"
                                v-for="(item, index) in clickRank"
                                :key="item._id"
                                @click="goPage(item)"
                            >
                                <div class="click-ranking-item-index">{{ index + 1 }}</div>
                                <div class="click-ranking-item-p ell-1">
                                    {{ item.article_name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <kl-back-top ref="myScrolLeftRef" el=".zl-scroll" />
    </div>
</template>

<script>
import { getClickRanking, getRecentUpdates, searchArticles, delArticle } from '@/api/blog'
import httpApi from '@/api/blog/admin'
import { myTime } from '@/tool/index.js'
import { getFlyColor } from '@/plugins/config.js'

export default {
    components: {},
    data() {
        return {
            styleSize: 100,
            bg: '',
            blog_tags: [],
            tagList: [],
            indexDBIMG: null,
            pageBgImg: '',
            maxIndex: 0,
            isLoading: true,
            scrollHeight: 500, // 滚动条高度
            scrollTop: 0,
            historyObj: {
                isHistory: false,
                historyList: [],
                isFn: false, // 防止失去焦点时 下拉框关闭
            },
            searchOption: {
                total: 0,
                isSearch: false, // 记录当前是否是搜索状态
                content: '',
                content_old: '',
            },
            clickRank: [],
            recentUpdates: [],
            rankingClasss: [],
            readHistory: [],
            pageOption: {
                page: 1,
                limit: 10,
                total: 0,
            },
        }
    },

    computed: {
        ...Vuex.mapState(['userdata', 'userTags']),
        ...Vuex.mapGetters(['isAdmin']),
        islogin() {
            return this.isLogin()
        },
        historyListComputed() {
            if (!this.isArrayLength(this.historyObj.historyList)) {
                return []
            }
            return this.historyObj.historyList.filter((item) => {
                return item.content.includes(this.searchOption.content)
            })
        },
    },
    filters: {
        filterArticleTime(val) {
            return myTime(val)
        },
    },
    watch: {
        'searchOption.isSearch'() {
            this.setScrollHeight()
        },
        'userdata.iolationsNumber': {
            handler() {
                this.setIolationsNumber()
            },
            immediate: true,
            deep: true,
        },
    },
    activated() {
        if (this.islogin) {
            this.get_author_read_history()
        }
        // 滚动到历史记录处
        this.klScrollGo(this.scrollTop)
    },
    deactivated() {
        // 保存scrollTop
        let ref = this.$refs.klScrollRef
        if (ref) {
            this.scrollTop = ref.scrollTop
        }
    },
    async created() {
        this.getInitData()
    },
    mounted() {
        let obj = {
            pageBgImg: 'https://image.zlketang.com/public/news/others/imgs/20210924104716485.jpg',
        }

        this.setScrollHeight()
        if (window) {
            window.addEventListener('resize', this.setScrollHeight)
        }

        this.winSleep(() => {
            try {
                this.getIndexDBIMJ(obj)
            } catch (err) {
                this.Toast(err)
            }
        })
    },

    methods: {
        // 设置违规次数
        setIolationsNumber() {
            let {
                user_first_show_type,
                iolationsNumber = 0,
                user_violation_target,
            } = this.userdata || {}
            if (user_first_show_type == 1) {
                // 当前月多少天
                const [d] = this.klDateFormat(Date.now(), '[d]')
                // 计算频率 频率越高，颜色越深
                let frequency = iolationsNumber / d

                let { base64, styleSize } = this.useWatermarkBg({
                    text: `${Math.ceil(frequency * 100)}/${user_violation_target}`,
                    fontSize: 160,
                    deg: 0,
                    fillStyle: getFlyColor(frequency),
                })
                this.bg = base64
                this.styleSize = styleSize
            }
        },
        getBgStyle() {
            let { bg, styleSize } = this
            return {
                backgroundSize: `${styleSize}px ${styleSize}px`,
                backgroundImage: `url('${bg}')`,
            }
        },
        async deleteAc({ _id }) {
            if (!_id) {
                return this.$message.warning('_id不存在')
            }
            try {
                const msg = await this.$confirm('确定删除？').catch(() => false)
                if (msg === false) return
                await delArticle({ _id })
                this.$message.success('删除成功')
                this.rankingClasss = this.rankingClasss.filter((item) => item._id !== _id)
                this.searchOption.total--
            } catch (err) {
                this.Toast(err)
            }
        },
        // 是否是ac或静态页面
        isAcArticle(article) {
            if ([2, 3].includes(+article?.class_id?.class_type)) {
                return true
            }
            return false
        },
        // 获取初始化数据
        getRankingClasssInit() {
            this.searchOption.isSearch = false
            this.pageOption = {
                page: 1,
                limit: 10,
                total: 0,
            }
            this.rankingClasss = []
            this.blog_tags = []
            this.getRankingClasss()
        },
        // tags搜索方式
        blog_tags_change() {
            this.klScrollGo()
            // 滚回顶部
            this.pageOption = {
                page: 1,
                limit: 10,
                total: 0,
            }
            this.rankingClasss = []
            this.searchArticle()
        },
        //
        searchArticleAll() {
            if (!this.searchOption.content && this.tagList.length === 0)
                return this.$message.warning('请输入搜索条件')
            this.klScrollGo()
            // 滚回顶部
            this.pageOption = {
                page: 1,
                limit: 10,
                total: 0,
            }
            this.rankingClasss = []
            this.searchArticle()
        },

        // 设置滚动高度
        async setScrollHeight() {
            await this.$nextTick()
            let ref = this.$refs.klScrollRef
            let maxIndex = 100
            if (this.maxIndex >= maxIndex) {
                return this.$message.warning('设置滚动区域高度失败')
            }
            if ((!ref || !ref.scroll_el) && this.maxIndex < maxIndex) {
                await this.sleep(50)
                this.maxIndex++
                this.setScrollHeight()
                return
            }
            this.maxIndex = 0
            // 获取el距离页面顶部的距离
            let top = ref.scroll_el.getBoundingClientRect().top || 90
            this.scrollHeight = Math.floor(document.documentElement.clientHeight - top)
        },
        bottomE() {
            let { page, limit, total } = this.pageOption
            if (page * limit >= total) return
            this.pageOption.page++
            this.searchArticle()
        },

        // 滚动到任意处
        async klScrollGo(scrollTop = 0) {
            await this.$nextTick()
            let ref = this.$refs.klScrollRef
            if (!ref) return
            ref.go(scrollTop)
        },

        // 具体的滚动事件
        scrollEvent(el) {
            this.scrollTop = el.target?.scrollTop
        },

        // 历史记录相关
        handleHistory(type, row) {
            let that = this
            this.historyObj.isFn = false
            if (type === 'delete') {
                this.historyObj.isFn = true
            }
            let obj = {
                blur: () => {
                    if (this.historyObj.isFn) return
                    setTimeout(() => {
                        that.historyObj.isHistory = false
                        this.historyObj.isFn = false
                    }, 0)
                },
                open: async () => {
                    let historyList = await this.getStore('historyList', [])
                    this.historyObj.historyList = historyList
                        // 需要删除一个月(30天)没有使用的记录
                        .filter((item) => {
                            if (Date.now() - item.time < 30 * 24 * 3600 * 1000) {
                                return item
                            }
                        })

                        // 按时间顺序排列
                        .sort((a, b) => {
                            return b.time - a.time
                        })

                    // 打开下拉框
                    this.historyObj.isHistory = true
                },
                close: () => {
                    this.historyObj.isHistory = false
                },
                // 这个方法还要优化
                add: async () => {
                    let { id, content, time } = row
                    // 先读取记录
                    let historyList = await this.getStore('historyList', [])

                    if (Object.keys(historyList).length === 0) {
                        // 没有记录过
                        let historyList = []
                        let obj = {
                            id,
                            content,
                            time,
                            number: 1,
                        }
                        historyList.push(obj)

                        this.setStore('historyList', historyList)
                        return
                    }
                    // 存在记录

                    let history = historyList.find((item) => item.content === content)
                    if (history) {
                        // 表示原来存在这个记录
                        historyList = historyList.map((item) => {
                            if (item.content === content) {
                                item.content = content
                                item.time = time
                                item.number = item.number + 1
                                return item
                            }

                            return item
                        })
                        this.setStore('historyList', historyList)
                        return
                    }

                    // 原来不存在
                    let obj = {
                        id,
                        content,
                        time,
                        number: 1,
                    }
                    historyList.push(obj)
                    await this.setStore('historyList', historyList)

                    this.handleHistory('open')
                },
                select: async () => {
                    let { content } = row
                    this.searchOption.content = content
                    this.searchArticleAll()
                    // 先读取记录
                    let historyList = await this.getStore('historyList', [])

                    // 表示原来存在这个记录
                    historyList = historyList.map((item) => {
                        if (item.content === content) {
                            item.content = content
                            item.time = Date.now()
                            item.number = item.number + 1
                            return item
                        }
                        return item
                    })

                    this.setStore('historyList', historyList)
                },
                delete: async () => {
                    let { content } = row
                    // 先读取记录
                    let historyList = await this.getStore('historyList', [])
                    // 表示原来存在这个记录
                    historyList = historyList.filter((item) => item.content !== content)
                    this.historyObj.historyList = historyList
                    this.setStore('historyList', historyList)
                },
            }

            if (Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },
        // 搜索
        searchArticle() {
            let { content } = this.searchOption
            // 添加历史记录
            if (content) {
                this.handleHistory('add', {
                    id: this.createId(),
                    content,
                    time: Date.now(),
                })
            }

            this.isLoading = true
            // 开始搜索
            let { page, limit } = this.pageOption
            let { blog_tags } = this

            let params = {
                content,
                page,
                limit,
            }

            if (blog_tags) {
                let arr = []
                blog_tags.forEach((item) => {
                    this.tagList.forEach((itey) => {
                        if (itey.tag_name === item) {
                            arr.push(itey._id)
                        }
                    })
                })

                params.blog_tags = arr
            }
            searchArticles(params)
                .then((res) => {
                    let { data, total } = res.data
                    if (Array.isArray(data)) {
                        let { content } = this.searchOption

                        // 设置搜索条件
                        let arr = [...this.blog_tags]
                        if (content) {
                            arr.push(content)
                        }

                        this.searchOption.content_old = arr.join(',')

                        this.rankingClasss = [...this.rankingClasss, ...data]
                        this.searchOption.total = total - 0
                        this.pageOption.total = total - 0

                        this.searchOption.isSearch = arr.length > 0

                        this.$nextTick(() => {
                            this.handleCtrlF(content, '.classs-item', [
                                '.article-title',
                                '.article-content',
                            ])
                        })
                    }
                })
                .catch(() => {})
                .finally(() => {
                    this.isLoading = false
                })
        },

        // 对分类排名或者搜索的内容进行数据处理
        handleData(data) {
            this.rankingClasss = []
            data.forEach((item) => {
                let { article_watch_numbers } = item
                let index = this.rankingClasss.findIndex((itey) => {
                    let { reads } = itey
                    if (item.class_id._id === itey.class_id) {
                        if (article_watch_numbers > reads) {
                            itey.reads = article_watch_numbers
                        }
                        return item
                    }
                })

                if (index === -1) {
                    let obj = {
                        reads: item.article_watch_numbers,
                        class_id: item.class_id._id,
                        children: [],
                    }
                    obj.children.push(item)
                    this.rankingClasss.push(obj)
                } else {
                    this.rankingClasss[index].children.push(item)
                }
            })

            // 重新按照分类的最高阅读分类排名
            this.rankingClasss.sort((a, b) => {
                return b.reads - a.reads
            })

            // 内部文章再次降序
            this.rankingClasss.map((item) => {
                item.children.sort((a, b) => {
                    return b.article_watch_numbers - a.article_watch_numbers
                })
            })
        },
        // 单独获取排行的
        getRankingClasss() {
            this.searchOption.isSearch = false
            this.searchOption.content = ''
            let { page, limit } = this.pageOption
            let params = {
                page,
                limit,
                type: '2',
                cache: true,
            }
            httpApi
                .get_mobile_home_list(params)
                .then((res) => {
                    if (res.data) {
                        let { list, total } = res.data
                        if (Array.isArray(list)) {
                            this.rankingClasss = [...this.rankingClasss, ...list]
                            this.pageOption.total = total
                        }
                    }
                })
                .catch(() => {})
        },

        handlerImgsFromIndexDB(arr) {
            return arr.map(async (item) => {
                item.article_bck_url = await this.getIndexDBIMJ(
                    item.article_bck_url,
                    this.indexDBIMG,
                )
            })
        },
        // 初始化
        getInitData() {
            if (!this.isPc()) return
            if (this.islogin) {
                this.get_author_read_history()
            }
            let arr = [
                getClickRanking({ limit: 5, cache: true }),
                getRecentUpdates({ limit: 5, cache: true }),
            ]

            if (this.isAdmin) {
                arr.push(httpApi.get_blog_tag_list({ page: 1, limit: 100, cache: true }))
            }

            Promise.all(arr)
                .then((res) => {
                    this.clickRank = res[0]?.data || []
                    this.recentUpdates = res[1]?.data?.data || []

                    if (this.getType(res[2]?.data) === 'object') {
                        let { data } = res[2].data
                        this.tagList = data || []
                    }
                })
                .catch((err) => {
                    this.Toast(err)
                })

            this.getRankingClasss()
        },

        get_author_read_history() {
            // 设置缓存时间30s
            let expire_time = 30 * 1000
            httpApi
                .get_author_read_history({ limit: 5, cache: true, expire_time })
                .then((res) => {
                    // 阅读记录

                    this.readHistory = res.data.data.filter((item) => {
                        if (item.article_id) {
                            return item
                        }
                    })
                })
                .catch((err) => {})
        },

        // 阅读更多
        goPage(article, type = 0) {
            // ac类型直接预览
            if (
                article &&
                this.getType(article.class_id) === 'object' &&
                [2, 3].includes(+article.class_id.class_type)
            ) {
                let { class_type } = article.class_id
                // 前端ac页面的同步数据
                if (class_type == 2) {
                    // 如果首位是/需要去掉
                    window.open(this.$baseURL + `${article.article_ac_url.replace(/^\//, '')}`)
                }
                return
            }

            if (type) {
                this.$router.push(`/blog/page/${article.article_id._id}`)
                return
            }
            this.$router.push(`/blog/page/${article._id}`)
        },
    },
}
</script>

<style lang="scss" scoped>
.home-page {
    // padding-top: 90px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    background-size: cover;
    background-repeat: no-repeat;
}
.p-t-90 {
    padding-top: 90px;
}

.home-page-main {
    width: 100vw;
    height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
}
.canvas-bg {
    position: absolute;
    top: 0;
    left: 0;
    inset: 0;
    z-index: 10;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
}
.w-1100-center {
    width: 1100px;
    display: flex;
    justify-content: space-between;
}
.home-page-main-left {
    flex: 1;
    height: calc(100vh - 94px);
    overflow-y: scroll;
    margin-right: 10px;
    &::-webkit-scrollbar {
        display: none;
    }
}

.home-page-main-right {
    height: calc(100vh - 80px);
    overflow-y: scroll;
    padding-bottom: 15px;
    &::-webkit-scrollbar {
        display: none;
    }
}
.article-item {
    padding: 20px;
    display: flex;

    .article-bg-cover {
        width: 270px;
        min-width: 270px;
        height: 180px;
        overflow: hidden;
        .article-bg {
            width: 270px;
            height: 180px;
            transition: all 1s;
            &:hover {
                transform: scale(1.3);
            }
        }
    }
}

.article-item-right {
    margin-left: 20px;
    .article-title {
        color: #555;
        height: 40px;
        font-size: 18px;
        line-height: 40px;
        font-weight: 600;
        border-bottom: 1px solid #e6e6e6;
        cursor: pointer;
        &:hover {
            color: $primary;
        }
    }
    .article-content {
        width: 470px;
        margin-top: 8px;
        color: #656565;
        font-size: 14px;
        line-height: 25px;
        height: 100px;
        overflow: hidden;
    }
    .article-item-footer {
        margin-top: 5px;
        color: #333;
        display: flex;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            color: #555;
        }
    }
}
.kl-button-primary {
    background-color: $primary;
    padding: 5px 15px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}
.m-l-15 {
    margin-left: 15px;
}
.m-r-5 {
    margin-right: 5px;
}
.no-article {
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
    text-align: center;
    height: 116px;
    margin-bottom: 15px;
}

.home-page-right-search {
    width: 288px;
    padding: 12px;
    box-shadow: 1px 2px 6px rgb(63 74 105 / 16%);
    border-radius: 3px;
    margin-bottom: 10px;
    position: relative;
    .historical-records {
        background-color: #fff;
        position: absolute;
        top: 60px;
        left: 0;
        width: 288px;
        z-index: 100;
        .history-title {
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            padding: 0 15px;
        }
        .history-list {
            max-height: calc(45px * 6);
            overflow-y: auto;
        }

        .item {
            height: 45px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            padding: 0 10px;
            color: #555;
            span {
                display: block;
                width: 230px;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                box-sizing: border-box;
                padding: 0px 5px;
                &:hover {
                    background-color: $primary_1;
                    border: 1px solid $primary_0;
                    padding: 0px 4px;
                    line-height: 28px;
                }
            }
        }
    }

    .my-input {
        display: flex;
        align-items: center;
        input.search {
            padding-left: 20px;
            width: 210px;
            height: 32px;
            border-top-left-radius: 16px;
            border-bottom-left-radius: 16px;
            border: 1px solid $primary;
            color: #555;
            background-color: #f5f5f5;
        }
        .search-icon {
            width: 52px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $primary;
            border-top-right-radius: 16px;
            border-bottom-right-radius: 16px;
            cursor: pointer;
        }
    }
}

.click-ranking {
    width: 288px;
    .click-ranking-title {
        height: 50px;
        line-height: 50px;
        font-weight: 600;
        color: #555;
        padding: 0 15px;
        border-bottom: 2px solid #ddd;
        position: relative;
        cursor: pointer;

        .line {
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 2px;
            height: 2px;
            border-radius: 1px;
            transition: width 0.8s;
            background-color: $primary;
        }
        &:hover {
            .line {
                width: 288px;
            }
        }
    }
    .click-ranking-item {
        padding: 0 15px;
        height: 50px;
        display: flex;
        align-items: center;
        background-color: #d5e2ee;
        cursor: pointer;

        .click-ranking-item-index {
            display: block;
            height: 20px;
            line-height: 20px;
            min-width: 20px;
            background-color: $primary;
            text-align: center;
            margin-right: 15px;
            color: #fff;
        }
        .click-ranking-item-p {
            color: #555;
            font-size: 14px;

            &:hover {
                color: $primary;
            }
        }

        &:nth-of-type(odd) {
            background: none;
            .click-ranking-item-index {
                background-color: #b1b1b1;
            }
        }
    }
}
.m-t-15 {
    margin-top: 15px;
}
.updata-item {
    cursor: pointer;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.click-ranking-item-img-cover {
    min-width: 90px;
    width: 90px;
    height: 60px;
    overflow: hidden;
    .article-bg {
        width: 90px;
        height: 60px;
        transition: all 1s;
        &:hover {
            transform: scale(1.4);
        }
    }
}

.updata-item-item {
    cursor: pointer;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .time {
        width: 153px;
        color: #555;
    }
    .content {
        width: 153px;
        margin-top: 5px;
        font-size: 14px;
        color: $primary;
    }
}
.tag-cover {
    min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
}
.search-main {
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 1px 2px 6px rgb(63 74 105 / 16%);
    border-radius: 3px;
    font-size: 14px;
    color: #555;
}
.c-danger {
    color: $danger;
}
.m-r-2 {
    margin: 0 2px;
}
.no-ranking-classs {
    height: 300px;
    color: #555;
}
.classs-item {
    &:nth-last-of-type(1) {
        .no-article {
            display: none;
        }
    }
}

.svg-fire {
    fill: $danger !important;
}

.svg-search {
    fill: #fff !important;
}

.svg-delete-cover {
    padding: 5px;
    &:hover {
        background-color: #f1f1f1;

        .svg-delete {
            fill: $danger !important;
        }
    }
}
.m-w-130 {
    max-width: 110px;
}
.jilu {
    height: 100px;
    color: $primary;
}

::v-deep {
    .zl-scroll .page-bottom > div {
        color: #333;
    }
}
.p-15 {
    padding: 15px;
}
</style>
