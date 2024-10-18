<template>
    <div class="home-page">
        <comHeader />
        <!-- 签言 -->
        <div class="home-page-main">
            <div class="infos common-bg-1">
                <h3>寄语</h3>

                <div v-for="(item, index) in list" :key="item._id">
                    {{ index + 1 }}、{{ item.content }}
                </div>
            </div>

            <div class="reply-infos common-bg-1" v-show="isWebkit()">
                <!-- 顶部发布评论区 -->

                <commentList></commentList>
            </div>
        </div>

        <kl-back-top ref="myScrolLeftRef" el="#home-page-main-scroll-main" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
        }
    },
    filters: {},
    mounted() {
        this.$apis.get_send_msgs({
            cache: true
        }).then((res) => {
            this.list = res.data.data
        }).catch(err=>{
            this.Toast(err)
        })
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.home-page {
    padding-top: 90px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.home-page-main {
    width: 100vw;
    height: calc(100vh - 80px);
    overflow-y: auto;
}

.infos {
    padding: 20px;
    width: 1100px;
    margin: 20px auto;
    color: #333;
    h3 {
        font-size: 20px;
        margin-bottom: 10px;
        color: $primary;
    }
    div {
        line-height: 24px;
    }
}
.reply-infos {
    width: 1100px;
    margin: 20px auto;
    padding: 20px;
    min-height: 500px;
}
</style>
