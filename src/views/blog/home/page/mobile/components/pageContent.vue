<template>
    <div :class="['page-content']">
        <template v-if="article.article_string">
            <div class="f-20 f-500">
                {{ article.article_name }}
            </div>

            <div
                class="m-t-15 flex-wrap flex-justify-between flex-center-wrap user-info"
                v-if="article.author_id"
            >
                <div class="left flex-wrap flex-center-wrap">
                    <img
                        class="m-r-10 user-avtor"
                        :src="parseResourceUrl(article.author_id.header_img)"
                        @click="openUserInfoPopup"
                    />
                    <div class="flex-wrap flex-column-wrap flex-justify-center">
                        <span class="f-14 c-555">
                            {{ article.author_id.username }}
                        </span>
                        <span class="m-t-5 f-12 flex-center article-label"> 原创 </span>
                    </div>
                </div>
                <div class="flex-center right-btn f-10 c-555">关注</div>
            </div>

            <div v-highlight :class="['mobile-page-html blog-html-page-mobile', pageClass]">
                <div v-html="article.article_string"></div>
            </div>
        </template>

        <zl-loading v-if="isLoading"> </zl-loading>

        <!-- 图片预览组件 -->
        <kl-preview-img ref="imgPreviewRef"></kl-preview-img>

        <!-- 代码预览组件 -->
        <kl-preview-code ref="codePreviewRef"></kl-preview-code>

        <!-- 返回顶部组件 -->
        <kl-back-top el=".page-content" />
    </div>
</template>

<script>

export default {

    props: {
        isLoading: {
            type: Boolean,
            default: true,
        },
        article: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },

    data() {
        return {
            pageClass: '',
        }
    },
    created() {
        this.pageClass = this.createId()
    },
    watch: {
        article: {
            handler(val) {
                if (val) {
                    // 给图片绑定预览事件
                    this.setImgPreview()
                    // 给头部添加滚动监听事件
                    this.setIsUserStick()

                    // 设置所有的a标签，打开新页面
                    this.setATagget()
                }
                this.article = val
            },
            deep: true,
        },
    },
    methods: {
        // 设置所有的a标签，打开新页面
        async setATagget(){
            await this.$nextTick()
            let a_el = document.querySelectorAll(`.${this.pageClass} a`)
            a_el.forEach((item) => {
                item.setAttribute('target', '_blank')
            })
        },
        // 打开用户信息弹窗
        openUserInfoPopup() {
           
            this.$emit('openUserInfoPopup')
        },
        // 头部是否吸顶
        async setIsUserStick() {
            await this.$nextTick()
            let scroll_el = document.querySelector('.page-content')
            if(!scroll_el) return

            // 监听滚动事件
            scroll_el.addEventListener('scroll', () => {
                let page_el = document.querySelector(`.mobile-page-html`)
                // 获取距离可视区顶部的距离
                let page_top = page_el?.getBoundingClientRect().top ?? 0

                 if (page_top < 50) {
                    this.$parent.isUserStick = true
                } else {
                    this.$parent.isUserStick = false
                }
            })
        },
        // 给所有图片绑定预览点击事件
        async setImgPreview() {
            await this.$nextTick()
            let that = this
            let imgList = document.querySelectorAll('.blog-html-page-mobile img')
            imgList.forEach((item) => {
                item.onclick = function () {
                    that.$refs.imgPreviewRef.open(this.src)
                }
            })
        },

        // 打开代码预览
        async openPreviewCode(code){
              await this.$nextTick()
              this.$refs.codePreviewRef.open(code)
        },
    },
}
</script>

<style lang="scss" scoped>
.page-content {
    height: calc(100vh - 120px);
    overflow-y: auto;
    width: 100vw;
    padding: 15px;
}
.user-avtor {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.article-label {
    padding: 2px 5px;
    border-radius: 2px;
    color: $primary;
    background-color: $primary-1;
}
.right-btn {
    height: 24px;
    border-radius: 12px;
    padding: 0 15px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
}

::v-deep {
    .pos-icon-full-screen{
        top: 5px;
        right: 5px;
    }
    .kl-back-top {
        right: 20px !important;
        bottom: 100px !important;
    }
}
</style>
