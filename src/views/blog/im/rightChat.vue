<template>
    <div class="flex-1 flex-column-wrap im-right-chat">
        <!-- 聊天室信息 -->
        <div
            :style="{ height: headerHeight + 'px' }"
            class="flex-justify-between flex-wrap flex-center-wrap p-l-20 p-r-20 b-b-1"
        >
            <div class="f-550">
                {{ im_name }}
                <span v-if="onLine"> ({{ onLine }}) </span>
            </div>

            <div class="flex-center-wrap">
                <div @click.stop="isShowRoomInfo = !isShowRoomInfo" class="w-40 h-40 flex-center">
                    <i class="el-icon-s-tools f-24"></i>
                </div>
            </div>
        </div>
        <!-- 聊天信息列表 -->
        <div
            :style="{ height: chatHeight - headerHeight - footerHeight + 'px' }"
            :class="[
                'room-container p-l-20 p-r-20 b-b-1 p-t-10 p-b-10 pr',
                pageClass,
                isLoading ? 'op-0' : '',
            ]"
            @scroll="scrollEvent"
        >
            <div class="f-12 c-primary flex-center" v-if="isShowTopNoMore">没有更多了~</div>
            <template v-if="chatInfo.chatList.length">
                <chatItem
                ref="chatItemRef"
                    :class="[index !== 0 ? 'm-t-20' : '']"
                    v-for="(item, index) in chatInfo.chatList"
                    :key="item._id"
                    :row="item"
                    :roomMembers="chatInfo.roomInfo.roomMembers"
                    :roomMemberInfo="roomMemberInfo"
                    @closeAllPlay="closeAllPlay"
                ></chatItem
            ></template>
            <div v-else>暂无</div>
        </div>

        <!-- 底部发送消息区域 -->
        <div
            :style="{ height: footerHeight + 'px' }"
            class="im-send-continer p-l-20 flex-center-wrap p-r-20 pr"
        >
            <div
                v-show="isShowNewSysTip"
                class="tip-new p-a dp-i-b p-10 bg-cc b-r-4 f-14 c-fff cu"
                @click="scrollToBottom(true)"
            >
                有新消息
            </div>

            <kl-emoji ref="pushCommentRef" type="2" @postComment="postComment" />
        </div>

        <!-- 右侧弹窗聊天室详细信息 -->
        <div
            :class="['right-room-info p-20', isShowRoomInfo ? 'right-room-info-show' : '']"
            v-clickoutside="vClickoutside"
            :style="getRightRoomStyle"
        >
            <el-input size="small" placeholder="按昵称搜索" v-model="searchKey"></el-input>

            <div class="searchImgs m-t-10 flex-wrap flex-justify-between flex-multi-row">
                <div class="w-60 m-b-10" v-for="item in filterRoomMembers" :key="item._id">
                    <div class="w-60 h-60 o-h">
                        <e-image
                            :class="['w-60 h-60', item?.status == 1 ? '' : 'grayscale-img']"
                            :src="parseResourceUrl(item?.author_id?.header_img)"
                            :title="item?.author_id?.username"
                            :lazy="false"
                        ></e-image>
                    </div>

                    <div class="ell-1 f-14 m-t-10">
                        {{ item?.author_id?.username }}
                    </div>
                </div>

                <div class="w-60" v-for="item in 6" :key="item"></div>
            </div>
            <div class="f-14 m-t-10">
                <div class="f-14">群聊名称</div>
                <div class="c-aaa m-t-4">
                    {{ im_name }}
                </div>

                <div class="m-t-10">群公告</div>
                <div class="c-aaa m-t-4">在线聊天~~</div>

                <!-- <div class="f-14 m-t-10">备注</div>
                <div class="c-aaa m-t-4">---</div> -->

                <div class="flex-justify-between flex-center-wrap h-40">
                    <span> 聊天记录 </span>
                    <i class="el-icon-arrow-right"></i>
                </div>

                <div class="flex-justify-between flex-center-wrap h-40">
                    <span> 显示成员昵称 </span>
                    <el-switch
                        :active-value="1"
                        :inactive-value="2"
                        v-model="roomMemberInfo.is_show_username"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="post_im_room_member"
                    >
                    </el-switch>
                </div>

                <div class="flex-justify-between flex-center-wrap h-40">
                    <span> 固定自己消息到右侧 </span>
                    <el-switch
                        :active-value="1"
                        :inactive-value="2"
                        v-model="roomMemberInfo.is_sys_right"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="post_im_room_member"
                    >
                    </el-switch>
                </div>

                <div class="f-16 c-danger flex-center h-40 cu m-t-20" @click="remove">退出群聊</div>
            </div>
        </div>
    </div>
</template>

<script>
import { get_im_room_member, post_im_room_member } from '@/api/data.js'
import chatItem from '@/views/blog/im/chatItem.vue'
export default {
    components: {
        chatItem,
    },
    props: {
        headerHeight: {
            type: Number,
            default: 50,
        },
        footerHeight: {
            type: Number,
            default: 200,
        },
        isLoading: {
            type: Boolean,
            default: true,
        },
        socket: {
            type: Object,
            default: () => {
                return {}
            },
        },
        chatInfo: {
            type: Object,
            default: () => {
                return {
                    roomInfo: {
                        roomMembers: [],
                    },
                    chatList: [],
                }
            },
        },
        total: {
            type: Number,
            default: 0,
        },
        imName:{
                    type: String,
            default: '',
        }
    },
    data() {
        return {
            value: '',
            searchKey: '',
            isShowRoomInfo: false,
            pageClass: this.createId(),
            isBottom: true,
            roomMemberInfo: {
                is_show_username: 1,
                is_sys_right: 1,
                room_username: '',
            },
            isShowNewSysTip: false,
            chatWidth: 400,
            chatHeight: 800,
        }
    },
    computed: {
        ...Vuex.mapState(['userdata']),
        
        im_name() {
            return this.imName ||  this.chatInfo.roomInfo.im_name || '默认聊天室'
        },
        onLine() {
            let count = 0
            this.chatInfo.roomInfo.roomMembers.forEach((item) => {
                if (item.status == 1) {
                    count++
                }
            })
            return count
        },
        filterRoomMembers() {
            return this.sortRoomMembers.filter((item) =>
                item?.author_id?.username?.includes(this.searchKey),
            )
        },
        sortRoomMembers() {
            return this.chatInfo.roomInfo.roomMembers.sort((a, b) => a.status - b.status)
        },
        isShowTopNoMore() {
            if (!this.isLoading && this.chatInfo.chatList.length >= this.total) {
                return true
            }

            return false
        },
        getRightRoomStyle(){
            return {
                height: this.chatHeight - this.headerHeight + 'px',
            }
        }
    },
    watch: {
        isShowRoomInfo(val) {
            if (val) {
            }
        },
        isShowNewSysTip(val) {
            this.$emit('isShowNewSysTipFun', val)
        },
    },
    mounted() {
        this.get_im_room_member()

        this.init()
    },
    methods: {
        closeAllPlay(){
            let {chatItemRef} = this.$refs
            if(chatItemRef && chatItemRef.length){
                for(let i=0;i<chatItemRef.length;i++){
                    chatItemRef[i].isShowAudio = false
                    chatItemRef[i].isPlaying = false
                }
            }
        },
        async init() {
            await this.$nextTick()
            // 获取可视区高度
            this.chatHeight = document.documentElement.clientHeight
        },
        narrowFun() {
            this.$emit('narrowFun')
        },
        get_im_room_member(callback = '') {
            let member = this.chatInfo.roomInfo.roomMembers.find(
                (item) => item.author_id._id == this.userdata._id,
            )
            if (member) {
                get_im_room_member({ _id: member._id })
                    .then((res) => {
                        if (res.data && res.data.data) {
                            let { is_sys_right, is_show_username } = res.data.data
                            Object.assign(this.roomMemberInfo, res.data.data, {
                                is_show_username: +is_show_username,
                                is_sys_right: +is_sys_right,
                            })
                        }
                    })
                    .catch(() => {})
                    .finally(() => {
                        callback && callback()
                    })
            }
        },
        post_im_room_member() {
            post_im_room_member(this.roomMemberInfo)
                .then(() => {
                    this.$message.success('修改成功')
                })
                .catch(() => {
                    this.get_im_room_member()
                })
        },
        remove() {
            this.$confirm('确定退出该群聊吗？')
                .then(() => {
                    this.$emit('live_room')
                })
                .catch(() => {})
        },
        vClickoutside() {
            this.isShowRoomInfo = false
        },
        // 重新定位
        async reloadScrollPostion() {
            let el = document.querySelector(`.${this.pageClass}`)
            if (el) {
                let oldHeight = el.scrollHeight
                await this.$nextTick()

                if (this.isIOS()) {
                    $(el).css({
                        display: 'none',
                    })
                    await this.sleep(1)

                    $(el).css({
                        display: 'block',
                    })
                    oldHeight = oldHeight + 10
                }

                let newHeight = document.querySelector(`.${this.pageClass}`).scrollHeight
                // 计算出滚动的高度
                let scrollHeight = newHeight - oldHeight
                // 滚动到原来的位置
                el.scrollTop = scrollHeight
            }
        },
        // 监听滚动，判断用户是否在底部
        scrollEvent(e) {
            let el = $(`.${this.pageClass}`)
            if (el) {
                const scrollTop = el.scrollTop() || 0
                const innerHeight = el.innerHeight() || 0
                const scrollHeight = el[0].scrollHeight || 0
                this.isBottom = scrollTop + innerHeight >= scrollHeight - 50

                // 判断是否触顶，加载上一页
                if (scrollTop <= 50) {
                    this.$emit('loadPrev')
                }

                if (!this.isShowNewSysTip) return

                // 判断触底，关闭新消息提醒
                if (this.isBottom) {
                    this.isShowNewSysTip = false
                }
            }
        },
        // 滚动规则： 1、第一次进入 2、新消息来之前，用户就是停在底部 3、用户主动发送了消息
        async scrollToBottom(val) {
            if (!this.isBottom && !val) return
            await this.$nextTick()
            let el = $(`.${this.pageClass}`)
            if (el) {
                el.scrollTop(el[0].scrollHeight)
            }
            this.$emit('postComment', false)
        },
        postComment(row) {
            this.$emit('postComment', true)
            this.socket.emit('send_msg', {
                room_id: this.chatInfo.roomInfo._id,
                author_id: this.userdata._id,
                ...row,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.room-container {
    overflow-y: auto;
}
.b-b-1 {
    border-bottom: 1px solid #aaa;
}
.right-room-info {
    overflow-y: auto;
    position: absolute;
    bottom:0;
    right: 0;
    width: 300px;
    background-color: #fafafa;
    transform: translateX(100%);
    transition: all 0.5s;
}
.right-room-info-show {
    transform: translateX(0);
}

.tip-new {
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
}
.el-icon-remove-outline {
    font-weight: 600;
}

.kl-contenteditable-input {
    .contenteditable-unpload-img {
        margin: 4px;
    }
}
</style>
