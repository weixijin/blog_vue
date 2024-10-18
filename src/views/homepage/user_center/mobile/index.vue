<template>
    <div
        class="user-avtor-bg pr"
        :style="{ backgroundImage: `url(${userInfoAll.user_info.header_img})` }"
    >
        <div class="p-a h-vh-100 w-vw-100">
            <div class="no-bar h-vh-100 user-avtor-bg-y-scroll bg-cover11">
                <div class="h-100"></div>

                <!-- 用户信息 -->
                <div class="p-l-15 p-r-15 user-info-main bg-fff">
                    <!-- 固定定位的头部 -->
                    <userCenterHeader
                        ref="userCenterHeaderRef"
                        :userInfoAll="userInfoAll"
                    ></userCenterHeader>

                    <!-- 用户核心信息 -->
                    <userCenterBaseInfo :userInfoAll="userInfoAll"></userCenterBaseInfo>

                    <!-- 用户中心tab -->
                    <userCenterTabs :userInfoAll="userInfoAll"></userCenterTabs>
                    
                    <!-- 返回顶部 -->
                    <kl-back-top el=".zl-scroll"></kl-back-top>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import httpApi from '@/api/blog/admin.js'
import userCenterHeader from '@/views/homepage/user_center/mobile/components/user_center_header.vue'
import userCenterBaseInfo from '@/views/homepage/user_center/mobile/components/user_center_base_info.vue'
import userCenterTabs from '@/views/homepage/user_center/mobile/components/user_center_tabs.vue'
export default {
    components: {
        userCenterHeader,
        userCenterBaseInfo,
        userCenterTabs,
        scrollHeight: 0,
    },
    data() {
        return {
            // 是否是自己
            isMe: false,
            // 用户id
            userId: '',
            // 用户信息
            userInfo: {},
            pageScrollTop: 0, // 页面滚动距离
            userInfoAll: {
                user_info: {},
            },
        }
    },
    computed: {
        ...Vuex.mapState(['userdata']),
        // 是否是自己
        isMe() {
            if (this.getType(this.userdata) == 'object' && this.userdata._id) {
                return this.userId == this.userdata._id
            }
            return false
        },
    },
    created() {
        this.init()
    },
    mounted(){
        this.scrollEvent()
    },
    methods: {
        // 监听滚动事件
        scrollEvent() {
            let _this = this
            let el = document.querySelector('.user-avtor-bg-y-scroll')
            if(!el) return
            el.addEventListener('scroll', function () {
                let el_1 = document.querySelector('#scroll-top')
                // 获取el_1 在可视区距离顶部的位置
                if(!el_1) return
                let top = el_1.getBoundingClientRect().top
                let ref = _this.$refs.userCenterHeaderRef
                if(!ref) return 
                if(top < 50){
                    ref.isShow = true
                }else{
                    ref.isShow = false
                }
            })
        },
        // 监听页面滚动距离
        klScrollEvent(pageScrollTop) {
            this.pageScrollTop = pageScrollTop
        },
        // 处理参数
        handlerUserinfo() {
            let {
                query: { user_id },
            } = this.$route
            let { _id } = this.userdata
            let userId = user_id || _id
            if (!userId) {
                this.$router.replace({ path: '/login' })
                return this.$message.error('请登录')
            }

            this.userId = userId
        },
        // 初始化
        init() {
            // 获取可视区高度
            this.scrollHeight = document.documentElement.clientHeight || 0
            // 先判断是查看自己的，还是查看别人的
            this.handlerUserinfo()

            // 获取用户信息
            this.getUserInfo()
        },

        // 获取用户信息
        getUserInfo() {
            let { userId } = this
            if (userId) {
                httpApi
                    .get_mobile_user_info({
                        watch_user_id: userId,
                    })
                    .then((res) => {
                        this.userInfoAll = res.data
                        this.userInfoAll.user_info.header_img = this.parseResourceUrl(
                            this.userInfoAll.user_info.header_img,
                        )
                    })
                    .catch(() => {})
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.user-avtor-bg {
    height: 100vh;
    background-size: 100vw auto;
    background-repeat: no-repeat;
    z-index: 0;
}
.bg-cover11 {
    background-color: rgba(0, 0, 0, 0.5);
}
.user-info-main {
    border-radius: 6px 6px 0 0;
}
.user-avtor-bg-y-scroll{
    overflow-y: auto;
}
</style>
