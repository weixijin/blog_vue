<template>
    <div>
        <div class="flex-wrap" id="scroll-top">
            <kl-nav :rightNum="15" :active="active" :list="navList" @change="navChange" />
            <i class="el-icon-search f-18 m-l-15 m-t-10"></i>
        </div>
        <v-swiper v-model="active" :duration="duration" ref="swiper" @change="swiperChange">
            <van-swipe-item>
                <bugList :scrollHeight="scrollHeight"></bugList>
            </van-swipe-item>
            <van-swipe-item>
                <historyList :scrollHeight="scrollHeight"></historyList>
            </van-swipe-item>
            <van-swipe-item> 3 </van-swipe-item>
            <van-swipe-item> 4 </van-swipe-item>
        </v-swiper>
    </div>
</template>

<script>
import historyList from '@/views/homepage/user_center/mobile/components/swipers/historyList/historyList.vue'
import bugList from '@/views/homepage/user_center/mobile/components/swipers/bugList/bugList.vue'

export default {
    components: {
        historyList,
        bugList,
    },
    props: {
        userInfoAll: {
            type: Object,
            default: () => {
                user_info
            },
        },
    },
    data() {
        return {
            scrollHeight: 500,
            duration: 300,
            pageOption: {
                page: 1,
                limit: 10,
                total: 0,
            },
            navList: [
                {
                    value: '1',
                    label: 'bug记录',
                },
                {
                    value: '2',
                    label: '我的博客',
                },
                {
                    value: '3',
                    label: '收藏列表',
                },
                {
                    value: '4',
                    label: '错误日志',
                },
            ],
            active: '1',
        }
    },
    mounted() {
        this.setscrollHeight()
    },
    methods: {
        async setscrollHeight() {
            await this.$nextTick()
            // 获取可视区高度
            let clientHeight = document.documentElement.clientHeight || 667
            this.scrollHeight = clientHeight - 80
            // console.log('this.scrollHeight',document.documentElement.clientHeight);
        },
        // 滑动切换
        swiperChange(val) {
            this.active = val + 1 + ''
        },
        // 导航栏点击切换
        async navChange(val) {
            if (val !== this.active) {
                this.list = []
                this.pageOption = Object.assign(this.pageOption, {
                    page: 1,
                    limit: 10,
                    total: 0,
                })
            }
            this.active = val
            // 对应的swiper切换
            this.duration = 0
            this.$refs.swiper.swipeTo(val - 1)
            setTimeout(() => {
                this.duration = 300
            }, 50)
        },
    },
}
</script>

<style lang="scss" scoped>
.demo {
    min-height: 300vh;
}
.van-swipe-item {
    height: calc(100vh - 80px);
}
::v-deep {
    .kl-nav-pane {
        font-weight: 400 !important;
    }
    .tab-active {
        font-weight: 500 !important;
    }
}
</style>
