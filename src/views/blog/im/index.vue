<template>
    <div class="flex-wrap">
        <!-- 用户个人信息 -->
        <leftUserInfo v-if="isShowLeft" />
        <!-- 聊天列表 -->
        <centerList v-if="isShowCenter" :chatRoomList="chatInfo.chatList" />
        <!-- 具体聊天信息 -->
        <rightChat
            v-loading="isLoading"
            ref="rightChatRef"
            v-if="isShowRight"
            :isLoading="isLoading"
            :socket="socket"
            :chatInfo="chatInfo"
            :total="pages.total"
            :footerHeight="footerHeight"
            :imName="imName"
            @loadPrev="loadPrev"
            @postComment="postComment"
            @live_room="live_room"
            @setHeartBeatInit="setHeartBeat"
            @isShowNewSysTipFun="isShowNewSysTipFun"
        />
    </div>
</template>

<script>
import { baseURL } from '@/plugins/config.js'
import { get_room, im_heart } from '@/api/data.js'
import { isDev } from '@/mixins/tool/tool.js'
const plugins = [
    {
        js: isDev()
            ? 'https://cdn.socket.io/3.1.2/socket.io.js'
            : 'http://139.9.210.43:5000/netdist/socketio-1728970542295~1~.js',
    },
]
import leftUserInfo from '@/views/blog/im/leftUserInfo.vue'
import centerList from '@/views/blog/im/centerList.vue'
import rightChat from '@/views/blog/im/rightChat.vue'
export default {
    components: {
        leftUserInfo,
        centerList,
        rightChat,
    },
    props: {
        isShowLeft: {
            type: Boolean,
            default: true,
        },
        isShowCenter: {
            type: Boolean,
            default: false,
        },
        isShowRight: {
            type: Boolean,
            default: true,
        },
        imOutPath: {
            type: String,
            default: '',
        },
        isShowIm: {
            type: Boolean,
            default: true,
        },
        gobang_id: {
            type: String,
            default: '',
        },
        game_im_id: {
            type: String,
            default: '',
        },
        imName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            heartTime: 5 * 1000,
            timer: null,
            isUserActive: false,
            isLoadMore: false,
            isLoading: true,
            socket: {},
            chatInfo: {
                roomInfo: {
                    roomMembers: [],
                    im_name: '',
                },
                chatList: [],
            },
            pages: {
                page: 1,
                limit: 10,
                total: 0,
            },
        }
    },
    computed: {
        ...Vuex.mapState(['userdata', 'userTags']),
        ...Vuex.mapGetters(['isAdmin']),
        islogin() {
            return this.isLogin()
        },
        room_id() {
            return this.chatInfo?.roomInfo?._id || this.game_im_id || ''
        },
        baseParams() {
            let {
                userdata: { _id },
                room_id,
                gobang_id,
            } = this
            let obj = { user_id: _id, room_id }
            if (gobang_id) {
                obj.gobang_id = gobang_id
            }
            return obj
        },
        footerHeight() {
            return this.isPc() ? 200 : 200
        },
    },
    created() {
        this.getIndexDBJS(plugins).finally((res) => {
            this.init()
        })
    },
    mounted() {
        if (!this.isPc()) {
            this.isShowLeft = false
        }
    },
    beforeDestroy() {
        this.socket.emit('live_room', this.baseParams)
        clearTimeout(this.timer)
        this.timer = null
    },
    methods: {
        async init() {
            let { game_im_id, gobang_id } = this
            this.isLoading = true
            let isInit = true
            // 获取房间信息
            if (!game_im_id) {
                // 公共im获取房间信息
                let res = await get_room({
                    type: 1,
                }).catch(() => {})

                if (!res.data && !res.data.data) return
                const allRoomInfo = res.data.data

                Object.assign(this.chatInfo.roomInfo, {
                    _id: this.isArray(allRoomInfo) ? allRoomInfo[0]._id : allRoomInfo._id,
                })
            }

            let { room_id } = this
            if (!room_id) return

            // 连接io
            this.socket = io.connect(baseURL, {
                reconnection: true, // 允许自动重连
                reconnectionAttempts: 5, // 重连尝试次数
                reconnectionDelay: 1000, // 每次重连的间隔（毫秒）
                reconnectionDelayMax: 5000, // 最大重连间隔（毫秒）
                randomizationFactor: 0.5, // 在重连间隔基础上增加随机性
                timeout: 10000, // 连接超时时间（毫秒）
            })

            // 加入房间
            const join_roomParams = {
                room_id,
                user_id: this.userdata._id,
            }
            if (gobang_id) {
                join_roomParams.gobang_id = gobang_id
            }
            this.socket.emit('join_room', join_roomParams)

            // 监听直接发送的消息
            this.socket.on('err', (err) => {
                this.setHeartBeat()
                if (err.code == 400) {
                    this.$message.error(err.msg || '--未知错误--')
                    return
                }

                this.$message.success(err.msg || '--未知消息--')
            })

            // 监听掉线
            this.socket.on('disconnect', () => {
                console.log('连接断开，尝试重连...')
            })

            // 监听房间基本信息
            this.socket.on('room_baseinfo', (res) => {
                if (this.isDev()) {
                    console.log('room_baseinfo', res.data)
                }

                if (res.data) {
                    let {
                        data,
                        content,
                        roomMembers,
                        roomSysCount,
                        gobangMembers,
                        game_content,
                        gb_info,
                        is_del_gobang,
                        clear_game,
                        regret_result,
                    } = res.data
                    this.$emit('room_baseinfo', {
                        gobangMembers,
                        room_id,
                    })

                    if (game_content) {
                        this.$emit('get_game_content', game_content)
                    }

                    if (gb_info) {
                        this.$emit('get_gb_info', gb_info)
                    }

                    if (is_del_gobang) {
                        this.$emit('del_gobang', is_del_gobang)
                    }

                    if (clear_game) {
                        this.$emit('clear_game', clear_game)
                    }

                    if (Array.isArray(roomMembers)) {
                        // TODO:比较两次的roomMembers，提示有人进出

                        // 更新房间信息
                        Object.assign(this.chatInfo.roomInfo, data, {
                            roomMembers,
                        })

                        if (isInit) {
                            isInit = false
                            this.isLoading = false
                            // this.$refs.rightChatRef.get_im_room_member(() => {
                            //     this.isLoading = false
                            // })
                        }
                    }

                    if (this.getType(regret_result) == 'boolean') {
                        this.$emit('get_regret_result', regret_result)
                    }

                    this.pages.total = roomSysCount
                    if (content) {
                        this.chatInfo.chatList.push(content)
                        // 向外部传递新消息到来提示
                        this.$emit('newMsg', {
                            content,
                        })
                        let { isBottom } = this.$refs.rightChatRef
                        if (!isBottom || !this.isShowIm) {
                            // 新消息到来，但不在底部，显示新消息提示
                            this.$refs.rightChatRef.isShowNewSysTip = true
                        }
                    }

                    // 将房间消息滚动到底部
                    this.scrollToBottom()
                    this.setHeartBeat()
                }
            })
            // 拉取最近的10条聊天记录
            let syss = await this.$apis.get_chat_list({ room_id }).catch(() => {
                return {}
            })
            if (syss.data && this.isArrayLength(syss.data.data)) {
                // 倒序
                this.chatInfo.chatList = syss.data.data.reverse()
            }
        },

        send_msg(row) {
            this.socket.emit('send_msg', row)
        },

        isShowNewSysTipFun(val) {
            this.$emit('isShowNewSysTipFun', val)
        },
        live_room() {
            this.socket.emit('live_room', this.baseParams)
            if (this.imOutPath) {
                this.goTo(this.imOutPath)
            }
        
            this.$emit('live_room')
        },
        // 主动发送消息
        postComment(val = false) {
            this.isUserActive = val
        },

        // 拉取上一页
        loadPrev() {
            let { room_id } = this
            if (this.isLoadMore) return
            let { page, limit, total } = this.pages
            if (!this.isArray(this.chatInfo.chatList) || this.chatInfo.chatList.length >= total) {
                return
            }

            // 找出第一条的id
            let chat_id = this.chatInfo.chatList[0]?._id || ''
            if (!chat_id) return
            this.isLoadMore = true

            this.$apis.get_chat_list({ room_id, chat_id, limit })
                .then((res) => {
                    if (res.data && this.isArrayLength(res.data.data)) {
                        let { data } = res.data
                        this.chatInfo.chatList = [...data.reverse(), ...this.chatInfo.chatList]
                        this.$refs.rightChatRef.reloadScrollPostion()
                    }
                })
                .catch(() => {})
                .finally(async () => {
                    await this.sleep()
                    this.isLoadMore = false
                    this.setHeartBeat()
                })
        },
        scrollToBottom() {
            let { rightChatRef } = this.$refs
            if (rightChatRef) {
                rightChatRef.scrollToBottom(this.isUserActive)
            }
        },

        // 轮询心跳检测
        setHeartBeat() {
            let { room_id } = this
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                im_heart({ room_id })
                    .then((res) => {
                        if (res && this.isObject(res.data) && this.isObject(res.data.data)) {
                            let { status } = res.data.data
                            if (status == 2) {
                                console.log('您已掉线，开始重新加入')
                                this.socket.emit('join_room', {
                                    room_id,
                                    user_id: this.userdata._id,
                                })
                            }
                            this.setHeartBeat()
                        }
                    })
                    .catch(() => {})
            }, this.heartTime)
        },
    },
}
</script>

<style lang="scss" scoped></style>
