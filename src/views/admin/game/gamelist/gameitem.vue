<template>
    <div class="w-200 m-t-15 user-article-item">
        <div class="pr h-120 user-article-img-cover"  @click="goGamePage">
            <e-image
                :src="row.game_img"
                class="user-article-img-cover-img h-120 b-r-4"
                @click.prevent="() => {}"
            />
            <div :class="['pa article-type f-12', row.status == 2 ? 'c-warning' : 'c-fff']">
                {{ row.statusLabel }}
            </div>

            <!-- hover出现的蒙层 -->
            <div class="mask-article-info pa c-fff f-14" v-if='isMask'>
                <div class="m-t-10 ell f-12 ell-3">
                    描述：{{ row.game_content }}
                </div>
            </div>
        </div>

        <div :class="[row.isRead ? 'op-50' : '']">
            <h2 class="ell f-500 m-t-10 f-14">
                {{ row.game_name }}
            </h2>

            <div class="flex-wrap flex-justify-between flex-center-wrap f-12 m-t-6">
                <div class="c-666">
                    在线人数：<span class="c-666 f-12">{{ row.online_number }}人</span>
                </div>

                <el-dropdown @command="commandFun" v-if="isAdmin">
                    <div class="flex-wrap flex-column-wrap flex-justify-between h-16 dors">
                        <div class="dor" v-for="item in 3" :key="item"></div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item
                            command="edit"
                            icon="el-icon-full-screen"
                            >编辑</el-dropdown-item
                        > -->
                        <el-dropdown-item command="delete" icon="el-icon-delete"
                            >删除</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isAdminPage: {
            // 1 是 2 不是
            type: Number,
            default: 1,
        },
        row: {
            type: Object,
            required: true,
            default: () => {
                return {}
            },
        },
        isMask:{
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {}
    },
    computed: {
        ...Vuex.mapState(['userdata', 'userTags']),
        ...Vuex.mapGetters(['isAdmin']),
    },
    methods: {
        commandFun(val) {
            this.$emit('commandFun',{type:val,row:this.row})
        },
        goGamePage(){
            this.$emit('goGamePage',this.row)
        }
    },
}
</script>
<style lang="scss" scoped>
.article-type {
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 4px 8px;
    border-radius: 4px 0 4px 0;
}
.user-article-img-cover:hover {
    // .article-type {
    //     display: none;
    // }
    .mask-article-info {
        display: block;
    }
}
.mask-article-info {
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    padding: 15px;
}

.dors {
    padding: 0 2px 0 15px;
}
.dor {
    width: 4px;
    height: 4px;
    background: #999;
    border-radius: 2px;
}
.article-checkbox {
    top: 0;
    right: 0;
    z-index: 100;
    width: 16px;
    height: 16px;
}
.article-checkbox-mask {
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    // background-color: red;
}
.user-article-img-cover-img {
    width: 100%;
    object-fit: cover;
}
.op-50 {
    opacity: 0.5;
}
</style>
