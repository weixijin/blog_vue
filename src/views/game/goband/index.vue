<template>
    <div class="flex-wrap flex-justify-between">
        <div class="gobang-main">
            <div class="flex-center-wrap">
                步数： {{ currentStep }} 我方：{{ getQi }}

                
                <div class="flex-center m-l-10" v-if="isShowTimer">
                    倒计时：<timerCom
                        ref="timerComRef"
                        :time="max_move_time"
                        :all_time="gameBase.all_time"
                        :status="status"
                        :gobang_id="gobang_id"
                    ></timerCom>
                </div>

                <div class="m-l-10" v-if="isShould"> 请落子 </div>

                <div class="f-550 f-14 c-primary m-l-10" v-if="status == 3">
                    {{ overLabel }}
                </div>

                <!-- <el-button v-if="status == 3" @click="reloadPlaying"> 重播 </el-button> -->
                <el-button v-if="isShowRegBtn" class="m-l-20" @click="fun1" size="small">
                    悔棋
                </el-button>
            </div>

            <!-- 成员 -->
            <ul v-if="gobangMembers.length">
                <li class="flex-center-wrap m-b-10" v-for="item in gobangMembers" :key="item._id">
                    <div class="w-60 pr">
                        <e-image
                            :class="['o-h b-r-50', item?.status == 1 ? '' : 'grayscale-img']"
                            :height="60"
                            :width="60"
                            :lazy="false"
                            :src="parseResourceUrl(item.author_id.header_img)"
                        ></e-image>

                        <div v-if="item?.status == 1" class="b-r-50 pa p-a-style"></div>
                    </div>
                    <div>
                        <span class="c-primary f-14">
                            <span v-if="getQiType(item.author_id._id)">
                                【{{ getQiType(item.author_id._id) }}】</span
                            >
                        </span>
                        {{ item.author_id.username }}
                    </div>
                </li>
            </ul>

            <!-- 下棋区 -->
            <game :list="gobangList" :config="config" @clickHandle="clickHandle"></game>
        </div>
        <!-- im区 -->
        <Im
            ref="imRef"
            v-if="game_im_id"
            :style="{ width: '440px' }"
            :isShowLeft="false"
            :gobang_id="gobang_id"
            :game_im_id="game_im_id"
            imName="五子棋聊天室"
            @room_baseinfo="room_baseinfo"
            @get_game_content="get_game_content"
            @get_gb_info="get_gb_info"
            @clear_game="clear_game"
            @get_regret_result="get_regret_result"
        ></Im>

        <!-- 对局信息确认框 -->
        <gobandSYs
            v-model="visable"
            :max_move_time="max_move_time"
            :step_content="step_content"
            :gameBase="gameBase"
            :getQi="getQi"
            @confirm="confirm"
        ></gobandSYs>

        <!-- 协商悔棋弹窗 -->
        <regretChessDialog
            v-model="visable1"
            :gameBase="gameBase"
            :type="computedRegretType"
            @regret_resultChange="regret_resultChange"
        ></regretChessDialog>
    </div>
</template>

<script>
import Im from '@/views/blog/im/index.vue'
import timerCom from '@/views/game/goband/timerCom.vue'
import gobandSYs from '@/views/game/goband/gobandSYs.vue'
import regretChessDialog from '@/views/game/goband/regretChessDialog.vue'
import { get_gobang } from '@/api/data.js'
import game from './game.vue'
export default {
    components: {
        Im,
        game,
        timerCom,
        gobandSYs,
        regretChessDialog,
    },
    data() {
        return {
            isInit: true, // 是否是初次加载
            visable: false,

            gameBase: {
                _id: '',
                status: '1',
                max: 10,
                max_move_time: 0,
                all_time: 0,
                hei_user_id: '',
                bai_user_id: '',
                im_romm_id: '',
                regret_chess_from: '',
                regret_chess_to: '',
                win_id: '',
                regret_result: '',
            },
            gobangMembers: [], // 五子棋游戏成员列表

            room_id: '',
            gobangList: [],
            config: {
                type: 1, // 1为白棋 2为黑棋
                line: 15, // 棋盘线条数
                width: 36,
            },
        }
    },
    computed: {
        ...Vuex.mapState(['userdata']),
        ...Vuex.mapGetters(['isAdmin']),
        isShowRegBtn() {
            // 是否显示悔棋按钮
            return this.step_content && this.currentStep > 0 && this.status == 2
        },
        query() {
            return this.$route.query || {}
        },
        gobang_id() {
            return this.query.game_id || ''
        },
        game_im_id() {
            return this.query.im_romm_id || ''
        },

        // 当前步数
        currentStep() {
            let result = 0
            this.gobangList.forEach((item) => {
                item.forEach((itey) => {
                    if (itey.step_number > 0) {
                        result += 1
                    }
                })
            })
            return result
        },
        getQi() {
            // 自己是黑棋还是白棋
            let { _id } = this.userdata
            if (_id == this.gameBase.bai_user_id) {
                return '白棋'
            }

            if (_id == this.gameBase.hei_user_id) {
                return '黑棋'
            }

            return '观众'
        },
        // 自己具体下的内容 1白字 2黑子
        step_content() {
            const obj = {
                白棋: '1',
                黑棋: '2',
            }

            return obj[this.getQi] || 0
        },

        // 游戏当前状态 默认 1
        // 创建未开始 进行中 已结束 暂停
        status() {
            return this.gameBase.status || '1'
        },

        // 游戏用户自身的信息
        gbuserinfo() {
            let { _id } = this.userdata
            return this.gobangMembers.find((item) => item.author_id._id == _id) || {}
        },
        max_move_time() {
            return this.gameBase.max_move_time
        },
        isHei() {
            return this.userdata._id == this.gameBase.hei_user_id && this.status && this.status != 1
        },

        overLabel() {
            let { win_id, hei_user_id, bai_user_id, status } = this.gameBase
            if (status == 3) {
                if (win_id == hei_user_id) {
                    return '黑棋胜利'
                }

                if (win_id == bai_user_id) {
                    return '白棋胜利'
                }

                if (win_id == 1) {
                    return '平局'
                }
            }

            return ''
        },

        // 是否可以下棋
        isShould() {
            let { currentStep, gobangList, step_content } = this
            // 黑棋个数
            let heiNumber = 0

            // 白棋个数
            let baiNumber = 0

            // 遍历棋盘
            gobangList.forEach((aaa) => {
                aaa.forEach((item) => {
                    if (item.step_content == 1) {
                        baiNumber += 1
                    }

                    if (item.step_content == 2) {
                        heiNumber += 1
                    }
                })
            })

            // 判断现在下的步数的奇数还是偶数
            let isOdd = currentStep % 2

            if (+step_content === 1) {
                // 白棋
                return isOdd === 1
            }

            if (+step_content === 2) {
                // 黑棋
                return isOdd === 0
            }
        },

        // 是否显示倒计时
        isShowTimer() {
            return [2, 4].includes(+this.status)
        },

        // 自己id 仅当自己是棋手才会有
        regret_chess_from() {
            let { step_content } = this

            let obj = {
                1: 'bai_user_id',
                2: 'hei_user_id',
            }
            return this.gameBase[obj[step_content]] || ''
        },

        // 对手id 仅当自己是棋手才会有
        regret_chess_to() {
            let { bai_user_id, hei_user_id } = this.gameBase
            if (!this.regret_chess_from) {
                return ''
            }

            return this.regret_chess_from == bai_user_id ? hei_user_id : bai_user_id
        },

        author_id() {
            return this.userdata._id
        },

        visable1: {
            get() {
                // 是否显示悔棋弹窗
                let { status, regret_chess_from, regret_chess_to } = this.gameBase
                let { author_id } = this
                if (
                    status == 4 &&
                    author_id &&
                    (author_id == regret_chess_from || author_id == regret_chess_to)
                ) {
                    return true
                }

                return false
            },
            set() {
                return false
            },
        },

        computedRegretType() {
            // 当前对局人身份 1 发起方 2 接受方
            let { regret_chess_from, regret_chess_to } = this.gameBase
            let { author_id } = this
            let type = 0
            if (author_id == regret_chess_from) {
                type = 1
            }

            if (author_id == regret_chess_to) {
                type = 2
            }
            return type
        },
    },
    created() {
        this.init()
    },

    methods: {
        getQiType(_id) {
            let { hei_user_id, bai_user_id } = this.gameBase
            if (_id == hei_user_id) {
                return '黑棋'
            }
            if (_id == bai_user_id) {
                return '白棋'
            }
            return ''
        },
        // 接受悔棋确认结果，修改页面内容
        get_regret_result(val) {
            if (val) {
                // 删除最近的一个子
                let max = null
                let number = 0
                this.gobangList.forEach((item) => {
                    item.forEach((itey) => {
                        if (itey.step_number > number) {
                            max = itey
                        }
                    })
                })

                if (!max) {
                    this.$message.warning('获取最新的棋子失败，请刷新')
                    return
                }
                this.$set(
                    this.gobangList,
                    max.x,
                    this.gobangList[max.x].map((item, index) => {
                        if (index == max.y) {
                            return Object.assign(item, {
                                step_content: 0,
                                step_number: 0,
                                gobang_member_id: '',
                            })
                        }
                        return item
                    }),
                )
            }
        },
        // 接收方确认悔棋
        regret_resultChange(row) {
            let { gobang_id, author_id, room_id } = this
            this.send_msg({
                gobang_id,
                author_id,
                specialType: 6,
                room_id,
                ...row,
            })
        },
        // 发起悔棋
        fun1() {
            let { regret_chess_from, regret_chess_to, gobang_id, author_id, room_id } = this
            this.send_msg({
                regret_chess_from,
                regret_chess_to,
                gobang_id,
                author_id,
                specialType: 5,
                room_id,
            })
        },
        clear_game() {
            this.gobangList = []
        },
        reloadPlaying() {},
        send_msg(row) {
            let { imRef } = this.$refs
            if (!imRef) {
                this.$message.warning('刷新重试')
                return
            }

            imRef.send_msg(row)
        },
        confirm(row) {
            this.send_msg({
                room_id: this.room_id,
                gobang_id: this.gobang_id,
                author_id: this.userdata._id,
                specialType: 4,
                ...row,
            })

            this.visable = false
        },
        async reloadGame() {
            let res = await this.$confirm('确定要重新开始游戏吗？')
            if (res) {
                this.send_msg({
                    room_id: this.room_id,
                    specialType: 3,
                    gobang_id: this.gobang_id,
                })
            }
        },

        clickHandle({ x, y }) {
            let {
                step_content,
                room_id,
                gobang_id,
                userdata: { _id: author_id },
                currentStep,
                status,
            } = this

            // 只有棋手才能下棋
            if (![1, 2].includes(+step_content)) return

            const msgObj = {
                1: '游戏未开始',
                3: '游戏已结束',
                4: '等待对方上线，游戏已暂停',
            }

            const msg = msgObj[status]

            // 判断是否该下子
            if (msg || !this.isShould) {
                return this.$message.warning(msg || '请等待对方落子')
            }

            let obj = {
                room_id,
                specialType: 2,
                gobang_id,
                gobang_member_id: author_id,
                step_number: currentStep + 1,
                step_content,
                x,
                y,
                author_id,
            }

            // 需要在这儿判断是否已经赢了
            let win_id = this.checkWin(obj)
            if (win_id) {
                obj.win_id = win_id
            }

            this.$refs.imRef.send_msg(obj, () => {})
        },
        room_baseinfo({ gobangMembers, room_id }) {
            if (Array.isArray(gobangMembers)) {
                this.gobangMembers = gobangMembers
            }

            this.room_id = room_id || ''
        },
        initConfigList() {
            // 生成一个二维数组
            let { line } = this.config
            for (let i = 0; i < line; i++) {
                this.gobangList.push([])
                for (let j = 0; j < line; j++) {
                    this.gobangList[i].push({
                        x: i,
                        y: j,
                        step_content: 0, // 0: 空 1: 白 2: 黑
                    })
                }
            }
        },
        async init() {
            // 初始化对战盘
            this.initConfigList()

            // 获取现有的对局信息
            get_gobang({ gobang_id: this.gobang_id })
                .then((res) => {
                    if (res.data && this.isArrayLength(res.data.data)) {
                        let arr = res.data.data
                        this.gobangList = this.gobangList.map((aaa) => {
                            aaa = aaa.map((item) => {
                                let { x, y } = item
                                arr.find((itey) => {
                                    let { step_content, step_number, gobang_member_id } = itey
                                    if (itey.x == x + 1 && itey.y == y + 1 && step_content) {
                                        Object.assign(item, {
                                            step_content,
                                            step_number,
                                            gobang_member_id,
                                        })

                                        return true
                                    }
                                })

                                return item
                            })

                            return aaa
                        })
                    }
                })
                .catch(() => {})
        },

        get_game_content(row) {
            this.gobangList = this.gobangList.map((aaa) => {
                aaa = aaa.map((item) => {
                    let { x, y } = item
                    let { step_content, step_number, gobang_member_id } = row
                    if (row.x == x + 1 && row.y == y + 1 && step_content) {
                        Object.assign(item, {
                            step_content,
                            step_number,
                            gobang_member_id,
                        })
                    }

                    return item
                })

                return aaa
            })
        },

        get_gb_info(row) {
            this.gameBase = Object.assign(this.gameBase, row)
            // 游戏基本信息同步有修改
            this.visable = false
            switch (this.status) {
                case '1':
                    this.visable = true
                    break
            }
        },
        // 判断是否胜利 需要知道哪种棋子胜利
        checkWin(row) {
            // 判断当前棋盘是否有五子连珠
            let { line } = this.config
            let list = this.deepCopy(this.gobangList)

            // 需要先将row数据插入list中
            let { x, y } = row
            list[x - 1][y - 1] = Object.assign(list[x - 1][y - 1], row)

            let type = 0 // 0: 没有胜利 1: 白棋胜利 2: 黑棋胜利 3: 平局
            // 判断横向
            for (let i = 0; i < line; i++) {
                for (let j = 0; j < line - 4; j++) {
                    if (
                        list[i][j].step_content !== 0 &&
                        list[i][j].step_content === list[i][j + 1].step_content &&
                        list[i][j].step_content === list[i][j + 2].step_content &&
                        list[i][j].step_content === list[i][j + 3].step_content &&
                        list[i][j].step_content === list[i][j + 4].step_content
                    ) {
                        type = list[i][j].step_content
                        break
                    }
                }
            }
            // 判断纵向
            for (let i = 0; i < line; i++) {
                for (let j = 0; j < line - 4; j++) {
                    if (
                        list[j][i].step_content !== 0 &&
                        list[j][i].step_content === list[j + 1][i].step_content &&
                        list[j][i].step_content === list[j + 2][i].step_content &&
                        list[j][i].step_content === list[j + 3][i].step_content &&
                        list[j][i].step_content === list[j + 4][i].step_content
                    ) {
                        type = list[j][i].step_content

                        break
                    }
                }
            }
            // 判断左斜
            for (let i = 0; i < line - 4; i++) {
                for (let j = 0; j < line - 4; j++) {
                    if (
                        list[i][j].step_content !== 0 &&
                        list[i][j].step_content === list[i + 1][j + 1].step_content &&
                        list[i][j].step_content === list[i + 2][j + 2].step_content &&
                        list[i][j].step_content === list[i + 3][j + 3].step_content &&
                        list[i][j].step_content === list[i + 4][j + 4].step_content
                    ) {
                        type = list[i][j].step_content
                        break
                    }
                }
            }

            // 判断右斜
            for (let i = 0; i < line - 4; i++) {
                for (let j = 4; j < line; j++) {
                    if (
                        list[i][j].step_content !== 0 &&
                        list[i][j].step_content === list[i + 1][j - 1].step_content &&
                        list[i][j].step_content === list[i + 2][j - 2].step_content &&
                        list[i][j].step_content === list[i + 3][j - 3].step_content &&
                        list[i][j].step_content === list[i + 4][j - 4].step_content
                    ) {
                        type = list[i][j].step_content
                        break
                    }
                }
            }

            // 判断是否平局
            let flag = true
            for (let i = 0; i < line; i++) {
                for (let j = 0; j < line; j++) {
                    if (list[i][j].step_content == 0) {
                        flag = false
                        break
                    }
                }
            }

            // 如果是平局
            if (flag) {
                type = 3
            }
            const { bai_user_id, hei_user_id } = this.gameBase
            const obj = {
                1: bai_user_id,
                2: hei_user_id,
                3: 1,
            }

            return obj[type] || ''
        },
    },
}
</script>

<style lang="scss" scoped>
.p-a-style {
    bottom: 6px;
    right: 6px;
    background-color: $primary;
    z-index: 999;
    width: 10px;
    height: 10px;
}
</style>
