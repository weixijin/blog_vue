<template>
    <transition name="van-fade">
        <div v-if="isShow" :class="['bg-fff flex-wrap flex-center-wrap recommend-container b-r-4']" @click="goInfo">
            <!-- 右上角关闭按钮 -->
            <div class="pa flex-center close-btn" @click.stop="closeRecommend">
                <van-icon name="cross" size="12px" color="#fff" />
            </div>
            <div class="flex-1 flex-wrap">
                <div class="pr m-r-10 o-h">
                    <div class="pa flex-wrap remark-info-lines">
                        <div class="lines">
                            <div class="bg-fff line" v-for="item in 3" :key="item"></div>
                        </div>

                        <div class="f-8 c-fff w-s-n m-l-2">热门</div>
                    </div>
                    <img class="b-r-4 article-bg" :src="articleInfo.article_bck_url" />
                </div>

                <div>
                    <div class="f-12 f-500 c-333 ell-1 m-b-2">
                        {{ articleInfo.article_name }}
                    </div>
                    <div class="f-10 c-555 m-b-2">
                        {{ articleInfo.article_watch_numbers }}阅读量 | 博客
                    </div>
                    <span class="b-r-2 c-warning f-10 remark-info">为你推荐~</span>
                </div>
            </div>

            <button class="c-333 f-12 f-500 remark-watch-btn flex-center" >
                去看看
            </button>
        </div>
    </transition>
</template>

<script>
import httpApi from '@/api/blog/admin.js'
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShow: false,
            articleInfo: {},
        }
    },
    watch: {
        value(val) {
            if (val) {
                this.init()
            }
        },
    },
    methods: {
        goInfo() {
            this.$router.push(`/blog/page/${this.articleInfo._id}?from=recommend`)
            this.closeRecommend()
        },
        closeRecommend() {
            this.isShow = false
            this.$emit('input', false)
        },
        init() {
            this.isShow = false

            httpApi
                .get_mobile_home_list({
                    type: 2,
                    page: 1,
                    limit: 10,
                })
                .then((res) => {
                    if (!res.data) return
                    let { list } = res.data
                    if (Array.isArray(list)) {
                        this.articleInfo = list[Math.floor(Math.random() * list.length) | 0]
                    }
                    this.isShow = true
                    setTimeout(() => {
                        // 10秒后自动关闭
                        this.closeRecommend()
                    }, 10*1000)
                })
                .catch(() => {})
        },
    },
}
</script>

<style lang="scss" scoped>
.recommend-container {
    transition: opacity 0.3s ease-in-out;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    z-index: 999;
    box-shadow: 0 0 0 1px #e5e5e5;
    padding: 8px;
}
.article-bg {
    width: 90px;
    height: 55px;
}
.remark-info-lines {
    // 左上角添加圆角
    border-radius: 4px 0 0 4px;
    padding: 2px 4px;
    top: 0;
    left: 0;
    height: 16px;
    // 渐变背景色
    background: linear-gradient(90deg, $primary, $primary_0);
}
.lines {
    height: 8px;
    display: flex;
    align-items: flex-end;
}
.line {
    width: 2px;
    height: 0px;
    // 给3个xian添加动画
    animation: line 0.6s infinite linear alternate;
    // 顶部加圆角
    border-radius: 1px 1px 0 0;
    margin-right: 1px;
    &:last-of-type {
        margin-right: 2px;
    }
    &:nth-of-type(1) {
        animation-delay: 0.3s;
    }
    &:nth-of-type(2) {
        animation-delay: 0.6s;
    }
}
@keyframes line {
    0% {
        height: 0px;
    }
    100% {
        height: 6px;
    }
}
.remark-info {
    padding: 2px;
    background-color: $warning_1;
}
.remark-watch-btn {
    border-radius: 12px;
    height: 24px;
    background-color: $warning_0;
    padding: 0 10px;
}

.close-btn {
    width: 16px;
    height: 16px;
    background-color: #e5e5e5;
    border-radius: 50%;
    right: -6px;
    top: -6px;
}
</style>
