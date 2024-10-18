<template>
    <div class="flex-wrap flex-center-wrap flex-justify-between page-footer">
        <div
            @click="footerEvent(index)"
            class="flex-wrap flex-column-wrap flex-center-wrap page-footer-item pr"
            v-for="(item, index) in footerOption"
            :key="item.title"
        >
            <img :src="item.url" />
            <span class="f-12 c-555">
                {{ item.title }}
            </span>
        </div>

        <!-- 目录弹窗 -->
        <v-popup v-model="catalogueVisible" height="550px" bottom>
            <div class="catalogue-container">
                <div class="flex-center pr c-333 catalogue-header f-b f-15">
                    <i
                        class="el-icon-close f-18 pos-el-icon-close"
                        @click="catalogueVisible = false"
                    ></i>
                    目录
                </div>

                <template v-if="menuList.length">
                    <div class="catalogue-list-container">
                        <a
                            @click="goAnchor(item.id)"
                            v-for="item in menuList"
                            :key="item.id"
                            :class="[
                                'ell-1 menu-item-style f-14 c-555 f-400',
                                activeTitleId === item.id ? 'title-active' : '',
                                item.h === 'h2' || item.h === 'comments' ? 'f-550' : '',
                                item.h === 'h3' ? 'p-l-15 f-500' : '',
                                item.h === 'h4' ? 'p-l-30' : '',
                                item.h === 'h5' ? 'p-l-30' : '',
                                item.h === 'h6' ? 'p-l-30' : '',
                            ]"
                        >
                            {{ item.val }}
                        </a>
                    </div>
                </template>
                <kl-no-data v-else class="p-t-30"> 没有配置目录 </kl-no-data>
            </div>
        </v-popup>

        <!-- 推荐弹窗 -->
        <v-popup v-model="recommendVisible" height="220px" :duration="0.3">
            <div class="recommend-popup-container">
                <img
                    @click="recommendVisible = false"
                    class="close-recommend-popup"
                    src="//image.zlketang.com/public/news/others/imgs/blog_imgs/231312635_03.png"
                />
                <template v-if="recommendArticle.pre || recommendArticle.next">
                    <p
                        class="ell-2 c-555 f-15 m-t-30 l-h-30"
                        v-if="recommendArticle.pre && recommendArticle.pre.article_name"
                        @click="goToArticle(recommendArticle.pre._id)"
                    >
                        <span class="c-primary f-16">上一篇：</span>
                        <span class="recommend-tip-btn f-12"> 最新发布 </span>
                        {{ recommendArticle.pre.article_name }}
                    </p>
                    <p
                        class="ell-2 c-555 f-15 m-t-20 l-h-30"
                        v-if="recommendArticle.next && recommendArticle.next.article_name"
                        @click="goToArticle(recommendArticle.next._id)"
                    >
                        <span class="c-primary f-16">下一篇：</span>
                        <span class="recommend-tip-btn f-12"> 最新发布 </span
                        >{{ recommendArticle.next.article_name }}
                    </p>
                </template>
                <kl-no-data v-if="!recommendArticle.pre && !recommendArticle.next">
                    暂无推荐
                </kl-no-data>
            </div>
        </v-popup>

        <!-- 收藏列表弹窗 -->
        <v-popup v-model="collectionVisible" height="400px">
            <div class="collection-container">
                <img
                    @click="collectionVisible = false"
                    class="close-recommend-popup"
                    src="//image.zlketang.com/public/news/others/imgs/blog_imgs/231312635_03.png"
                />
                <template v-if="collectionList.length">
                    <el-input v-model="inputCollectionVal" class="m-t-22"></el-input>
                    <ul class="m-t-20 better-scroll collection-content-scroll">
                        <li
                            @click="goToArticle(item.article_info._id)"
                            :class="[
                                'ell-1 f-14 collection-item',
                                item.article_info._id == article._id ? 'c-primary' : '',
                            ]"
                            v-for="item in filterCollectionList()"
                            :key="item._id"
                        >
                            {{ item.article_info.article_name }}
                        </li>
                    </ul>
                </template>
                <kl-no-data class="m-t-50"> 暂无收藏 </kl-no-data>
            </div>
        </v-popup>

        <!-- 评论弹窗 -->
        <v-popup v-model="commentVisible" height="500px">
            <div class="comment-container" v-if="commentVisible">
                <comment-list class="mobile-comment-list" :article_id="article._id" />
            </div>
        </v-popup>
    </div>
</template>

<script>
import adminApi from '@/api/blog/admin'
import KlNoData from '../../../../../../mixins/components/defaultRegister/kl-no-data.vue'
export default {
    components: { KlNoData },
    props: {
        readHistory: {
            type: Object,
            default: () => {},
        },
        recommendArticle: {
            type: Object,
            default: () => {
                return {}
            },
        },
        article: {
            type: Object,
            default: () => {
                return {}
            },
        },
        activeTitleId: {
            type: String,
            default: '',
        },
        menuList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            menuActiveTitle: '',
            commentVisible: false,
            catalogueVisible: false,
            inputCollectionVal: '',
            collectionVisible: false, // 收藏弹窗
            isAnchor: false, // 当前文章是否是锚点文章
            isColl: false, // 是否收藏
            recommendVisible: false, // 推荐弹窗
            footerOption: [
                // 底部功能栏
                {
                    url: 'https://image.zlketang.com/public/news/others/imgs/blog_imgs/f926a69839c3a8be4974830598cf3967.png',
                    title: '目录',
                },
                {
                    url: 'https://image.zlketang.com/public/news/others/imgs/blog_imgs/4459ee7ab1971e73e2bf9bb2f27e6ff7.png',
                    title: '讨论',
                },
                {
                    url: 'https://image.zlketang.com/public/news/others/imgs/blog_imgs/68f8a2d8c7c2e589781a6b0d4bf8549e.png',
                    title: '收藏',
                },
                {
                    url: 'https://image.zlketang.com/public/news/others/imgs/blog_imgs/9d23bda0ca1ab7065731a078a4f46290.png',
                    title: '锚点',
                },
                {
                    url: 'https://image.zlketang.com/public/news/others/imgs/blog_imgs/eb766451af2b8a3ba26381b9879a789b.png',
                    title: '推荐',
                },
                {
                    url: '//image.zlketang.com/public/news/others/imgs/blog_imgs/eccbc87e4b5ce2fe28308fd9f2a7baf3.png',
                    title: '收藏列表',
                },
            ],
        }
    },
    computed: {
        ...Vuex.mapState(['userdata', 'collectionList']),
    },
    watch: {
        activeTitleId(val) {
            let active = this.menuList.find((item) => item.id == val)
            this.menuActiveTitle = active ? active.val : ''
        },
        article: {
            handler(val) {
                this.article = val
            },
            deep: true,
        },
        isColl(val) {
            this.footerOption[2].url = val
                ? 'https://image.zlketang.com/public/news/others/imgs/blog_imgs/88d424f4a4a7f9cc55a323a863eeb7c5.png'
                : 'https://image.zlketang.com/public/news/others/imgs/blog_imgs/68f8a2d8c7c2e589781a6b0d4bf8549e.png'
        },
        isAnchor(val) {
            this.footerOption[3].url = val
                ? 'https://image.zlketang.com/public/news/others/imgs/blog_imgs/80f97e47b9006f493bdb85953eb662a2.png'
                : 'https://image.zlketang.com/public/news/others/imgs/blog_imgs/9d23bda0ca1ab7065731a078a4f46290.png'
        },
        readHistory: {
            handler(val) {
                this.readHistory = val
            },
            deep: true,
        },
    },
    methods: {
        ...Vuex.mapActions(['GET_COLLECTIONS_LIST']),
        ...Vuex.mapMutations(['setUserData']),
        filterCollectionList() {
            if (!this.inputCollectionVal) return this.collectionList
            return this.collectionList.filter((item) => {
                return item.article_info.article_name.indexOf(this.inputCollectionVal) > -1
            })
        },
        //锚点跳转
        goAnchor(id) {
            this.$emit('goAnchor', {
                id,
            })
            setTimeout(() => {
                this.catalogueVisible = false
            }, 300)
        },

        // 判断文章状态 -- 收藏，锚点文章
        collectionStatus() {
            let article_id = this.article._id
            // 收藏
            let index = this.collectionList.findIndex((item) => item.article_info._id == article_id)
            if (index === -1) {
                this.isColl = false
            } else {
                this.isColl = true
            }

            // 锚点状态
            let { article_anchor_point, article_anchor_point_title, user_blog_history } =
                this.userdata
            if (user_blog_history != 1) return

            // 判断是否是锚点文章
            // console.log('456', article_anchor_point == article_id, this.readHistory.read_position)
            this.isAnchor = article_anchor_point == article_id
            if (article_anchor_point == article_id || this.readHistory.read_position) {
                // 存在历史记录，要跳转到对应的标题处
                if (this.isAnchor) {
                    article_anchor_point_title =
                        this.readHistory.read_position || article_anchor_point_title
                } else {
                    article_anchor_point_title = this.readHistory.read_position
                }

                if (article_anchor_point_title) {
                    let ac = this.menuList.find((item) => item.val == article_anchor_point_title)
                    if (!ac) {
                        return
                    }
                    this.$message({
                        message: '请继续阅读',
                        type: 'info',
                        duration: 1000,
                    })
                    this.$emit('goAnchor', {
                        id: ac.id,
                        isSmooth: false,
                    })
                }
            }
        },

        // 上一篇下一篇
        goToArticle(id) {
            this.collectionVisible = false
            this.recommendVisible = false
            this.$emit('setHistoryRead', this.article._id)
            this.$emit('getArticle', id)
        },

        // 弹窗打开，让当前高亮项处于顶部
        scrollToTop() {
            let el = $('.title-active')
            let scroll_el = $('.catalogue-list-container')
            let { activeTitleId } = this
            if (!el || !scroll_el || !activeTitleId) {
                this.catalogueVisible = true
                return
            }

            let index = this.menuList.findIndex((item) => item.id == activeTitleId)
            if (index == -1) {
                this.catalogueVisible = true
                return
            }

            // 滚动到具体的位置
            let number = index * 35 + 15

            scroll_el.animate(
                {
                    scrollTop: number,
                },
                50,
            )
            this.catalogueVisible = true
        },
        // 底部功能栏点击事件
        footerEvent(index) {
            let { isColl, isAnchor } = this
            let obj = {
                0: () => {
                    // 目录
                    // 让当前高亮项处于顶部的位置
                    this.scrollToTop()
                },
                1: () => {
                    this.commentVisible = true
                },
                2: () => {
                    this.isColl = !isColl
                    let key = isColl ? 'delete_collection_article' : 'post_collection_articles'
                    // 收藏
                    let params = {
                        article_id: this.article._id,
                    }
                    adminApi[key](params)
                        .then((res) => {
                            this.$klMessage(res.msg)
                            this.GET_COLLECTIONS_LIST()
                        })
                        .catch((err) => {})
                },
                3: () => {
                    this.$confirm('确认修改吗?')
                        .then((_) => {
                            // 锚点
                            this.isAnchor = true
                            let { email, password } = this.userdata
                            let article_anchor_point = {
                                _id: this.article._id,
                                title: '',
                            }
                            let query = {
                                email,
                                password,
                                article_anchor_point: this.article._id,
                                article_anchor_point_title: this.menuActiveTitle,
                            }
                            adminApi
                                .put_userinfo(query)
                                .then((res) => {
                                    this.$klMessage('操作成功')
                                    let userdata = this.deepClone(this.userdata)
                                    userdata.article_anchor_point = article_anchor_point._id
                                    this.setUserData({ user: userdata })
                                })
                                .catch((err) => {})
                        })
                        .catch((_) => {})
                },
                4: () => {
                    // 推荐
                    this.recommendVisible = true
                },
                5: async () => {
                    // 收藏列表
                    // 打开时需要将当前的文章定位滚到顶部
                    let { article } = this
                    await this.GET_COLLECTIONS_LIST()
                    this.inputCollectionVal = ''
                    this.collectionVisible = true

                    let index = this.collectionList.findIndex(
                        (item) => item.article_info._id == article._id,
                    )
                    if (index > -1) {
                        let el = document.querySelector('.collection-content-scroll')
                        $(el).animate({ scrollTop: index * 30 + 'px' }, 50)
                    }
                },
            }

            let fn = obj[index]
            if (['asyncfunction', 'function'].includes(this.getType(fn))) {
                fn()
            } else {
                this.$klMessage({
                    message: '敬请期待',
                })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.page-footer {
    height: 70px;
    padding: 0 20px;
}
.page-footer-item {
    img {
        height: 20px;
        width: 20px;
        margin-bottom: 5px;
    }
}
.close-recommend-popup {
    display: block;
    width: 40px;
    margin: 10px auto;
}
.recommend-popup-container {
    padding: 0 15px;
}
.recommend-tip-btn {
    padding: 2px 10px;
    height: 24px;
    line-height: 24px;
    background-color: $primary-1;
    color: $primary;
    border-radius: 12px;
    margin-right: 10px;
}
.pos-anchor {
    position: absolute;
    top: -5px;
    right: -2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $primary;
}
.collection-container {
    padding: 15px;
    padding-top: 0;
    height: 100%;
}
.collection-content-scroll {
    height: 290px;
    overflow-y: auto;
}
.collection-item {
    line-height: 30px;
}
.catalogue-header {
    height: 50px;
    border-bottom: 0.5px solid #f1f1f1;
}
.pos-el-icon-close {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
}
.menu-item-style {
    height: 35px;
    line-height: 35px;
}
.catalogue-list-container {
    padding: 15px;
    height: 500px;
    overflow-y: auto;
}
.comment-container {
    padding: 15px;
}
::v-deep {
    .mobile-comment-list {
        font-size: 14px;
        .left-user-img {
            margin-right: 10px;
        }
        .top-fun {
            .time {
                margin-right: 20px !important;
            }
        }
        .comment-top-list {
            border-bottom: none;
        }
        .top-content-info {
            font-size: 14px;
            line-height: 24px;
            color: #999;
        }
        .comment-list-content {
            margin-top: 15px;
            max-height: 380px;
            overflow-y: auto;
        }
        .left-total {
            font-size: 12px;
            .f-24 {
                font-size: 16px !important;
            }
        }
        .right-type {
            margin-left: 15px;
            top: 0;
        }
        .kl-emoji.m-t-30 {
            margin-top: 15px;
        }
        .kl-input-cover {
            margin-left: 5px;
            margin-right: 5px;
            .my-input {
                height: 40px;
                line-height: 18px;
                font-size: 14px;
                max-width: 240px;
            }
        }
        .my-btn {
            height: 40px;
            line-height: 40px;
        }
        .comment-top-item.m-t-30 {
            margin-top: 15px;
            border-bottom: 1px solid #f1f1f1;
        }
        .comment-top-item {
            border-bottom: 1px solid #f1f1f1;
            &:nth-last-of-type(1) {
                border-bottom: none;
            }
        }

        .comment-top-item.m-t-20 {
            border-bottom: none;
        }

        .top-content-info {
            div {
                font-size: 14px;
            }
            img {
            }
        }
    }
}
.title-active {
    color: $primary;
}
</style>
