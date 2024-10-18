<template>
    <div class="pr">
        <div class="user-header-img-cover p-a">
            <img
                class="w-50 h-50 b-r-50 user-header-border"
                :src="userInfoAll.user_info.header_img"
            />
        </div>

        <div class="flex-wrap flex-center-wrap flex-justify-between p-t-10">
            <p class="f-500 f-18 user-name-cl">
                {{ userInfoAll.user_info.username }}
            </p>
            <div class="flex-wrap flex-center-wrap">
                <p class="flex-center user-guan f-10 c-555 m-r-15">关注</p>
                <p class="guan-icon-cover b-r-50 flex-center">
                    <i class="el-icon-chat-dot-square c-fff f-12 f-w-600"></i>
                </p>
            </div>
        </div>
        <!-- 
        <div class="flex-wrap flex-justify-between m-t-5">
            <div>
                <p v-show="isShowId" class="f-12 c-999 id-cover bg-ddd m-t-5">
                    ID:{{ userInfoAll.user_info._id }}
                </p>
            </div>
            <i
                :class="[isShowId ? 'el-icon-arrow-up' : 'el-icon-arrow-down', 'f-18 c-555']"
                @click="isShowId = !isShowId"
            ></i>
        </div> -->

        <div class="f-12 c-999 m-t-10">
            <span class="f-500 f-16 c-555">23</span>
            关注TA的 &nbsp;&nbsp;
            <span class="f-500 f-16 c-555">0</span>
            TA关注的
        </div>
        <div class="f-12 m-t-5">ip属地：四川省</div>
        <div class="line m-t-10 m-b-10 bg-f5"></div>
        <div class="flex-wrap flex-center-wrap flex-justify-between f-12">
            <div class="flex-wrap flex-center-wrap">
                <img
                    class="w-20 h-20 b-r-50"
                    src="//img-home.csdnimg.cn/images/20210114022831.png"
                />&nbsp;我的勋章
            </div>
            <div>
                <img
                    class="w-20 h-20 b-r-50 m-l-10"
                    src="//img-home.csdnimg.cn/images/20210114022831.png"
                    v-for="item in 5"
                    :key="item"
                />
            </div>
        </div>

        <div class="flex-wrap flex-center-wrap f-12">
            <img class="w-20 h-20 b-r-50" src="//img-home.csdnimg.cn/images/20210114022831.png" />
            &nbsp;码龄5年
        </div>

        <div class="flex-wrap flex-center-wrap f-12">
            <img class="w-20 h-20 b-r-50" src="//img-home.csdnimg.cn/images/20210114022831.png" />
            &nbsp; 240 原创文章<span class="dor-center"></span> 27 点赞<span
                class="dor-center"
            ></span>
            7 评论<span class="dor-center"></span> 48 收藏
        </div>

        <div class="line m-t-10 m-b-10 bg-f5"></div>

        <el-tag class="m-r-10 m-b-5" v-for="item in userTags" :key="item._id">
            {{ item.tag_content }}
        </el-tag>
        <div class="line m-t-10 bg-f5"></div>
    </div>
</template>

<script>
export default {
    props: {
        userInfoAll: {
            type: Object,
            default: () => {
                user_info: {
                }
            },
        },
    },
    data() {
        return {
            isShowId: false,
            tags: ['前端', 'vue', 'react', 'node'],
        }
    },
    computed: {
        ...Vuex.mapState(['userTags']),
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.user-header-img-cover {
    top: -20px;
}
.guan-icon-cover {
    width: 20px;
    height: 20px;
    padding: 3px;
    background-color: #ccc;
}
.user-guan {
    padding: 0 10px;
    height: 20px;
    border-radius: 12px;
    border: 1px solid #ccc;
}
.id-cover {
    padding: 2px 5px;
    border-radius: 2px;
}
.tag {
    padding: 0 8px;
    border-radius: 4px;
    background-color: $primary_1;
}
.user-header-border {
    width: 60px;
    height: 60px;
    border: 2px solid #fff;
}
.user-name-cl {
    padding-left: 70px;
}
.dor-center {
    margin: auto 5px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #999;
}
</style>
