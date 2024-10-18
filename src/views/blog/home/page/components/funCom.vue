<template>
    <div class="demo">
        <p class="collection-status">收藏状态</p>
        <div>
            <el-radio v-model="isColl" label="1" @change="selectVal">收藏</el-radio>
            <el-radio v-model="isColl" label="2" @change="selectVal">未收藏</el-radio>
        </div>

        <p class="anchor-status">锚点状态</p>
        <div class="pr">
            <div class="pos-anchor" @click="selectAnchor"></div>
            <el-radio v-model="isAnchor" label="1">开启</el-radio>
        </div>
    </div>
</template>

<script>
import adminApi from '@/api/blog/admin'
export default {
    components: {},
    props: {
        article_id: {
            type: String,
            default: '',
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
            isColl: '',
            isAnchor: '',
            menuActiveTitle: '',
        }
    },
    watch: {
        activeTitleId(val) {
            let active = this.menuList.find((item) => item.id == val)
            this.menuActiveTitle = active ? active.val : ''
        },
        article_id() {
            this.init()
        },
    },
    computed: {
        ...Vuex.mapState(['userdata', 'collectionList']),
        ...Vuex.mapGetters(['isLogin']),
    },
    created() {
        this.init()
    },

    methods: {
        ...Vuex.mapMutations(['setUserData']),
        init() {
            // 收藏
            let index = this.collectionList.findIndex(
                (item) => item.article_info._id == this.article_id,
            )
            if (index === -1) {
                this.isColl = '2'
            } else {
                this.isColl = '1'
            }

            // 锚点状态
            if (this.userdata.article_anchor_point == this.article_id) {
                this.isAnchor = '1'
            } else {
                this.isAnchor = '2'
            }
        },
        selectAnchor() {
            let { userdata, article_id,menuActiveTitle,isLogin } = this
            if(!isLogin){
                this.$message.warning('请先登录~')
                this.goTo(`/login?path=${encodeURIComponent(window.location.href)}`)
                return
            } 
            if (!userdata.article_anchor_point || userdata.article_anchor_point == this.article_id)
                return
            this.isAnchor = '1'
            let { email, password } = userdata
            let query = {
                email,
                password,
                article_anchor_point: article_id,
                article_anchor_point_title:menuActiveTitle,
            }
            adminApi
                .put_userinfo(query)
                .then((res) => {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                    })
                    let userdata = this.deepClone(this.userdata)
                    userdata.article_anchor_point = this.article_id
                    this.setUserData({ user: userdata })
                })
                .catch((err) => {})
        },
        selectVal() {
            let {isLogin} = this
            if(!isLogin){
                this.$message.warning('请先登录~')
                this.goTo(`/login?path=${encodeURIComponent(window.location.href)}`)
                return
            } 
            this.$emit('collectionEnv', this.isColl)
        },
    },
}
</script>

<style lang="scss" scoped>
.demo {
    border: 1px solid #ccc;
    margin-left: 10px;
    padding: 10px 15px;
    width: 230px;
    height: 140px;
}
.el-radio {
    margin-right: 20px;
}
.collection-status {
    color: rgb(220, 62, 196);
    font-weight: bold;
    margin-bottom: 15px;
}
.anchor-status {
    margin: 10px 0;
    color: rgb(220, 62, 196);
    font-weight: bold;
}
.pos-anchor {
    width: 100%;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    // background-color: red;
}
</style>
