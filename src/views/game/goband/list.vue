<template>
    <div class="demo">
        <!-- 五子棋对局大厅列表 -->
        <h1 class="f-16 f-550 c-primary h-30 flex-center">五子棋对局大厅列表</h1>

        <div class="flex-multi-row flex-justify-between flex-wrap">
            <gameItem
                :isMask="false"
                v-for="item in list"
                :key="item._id"
                :row="item"
                @goGamePage="goGamePage(item)"
                @commandFun="commandFun"
            ></gameItem>

            <div class="w-200" v-for="item in 20" :key="item"></div>
        </div>
    </div>
</template>

<script>
import { getStatusLabel } from '@/views/game/goband/config.js'
import { get_gobang_list, del_gobang } from '@/api/data.js'
import gameItem from '@/views/admin/game/gamelist/gameitem.vue'
export default {
    components: { gameItem },
    data() {
        return {
            list: [],
        }
    },
    created() {
        this.init()
    },
    methods: {
        commandFun({ type, row }) {
            if (type == 'delete') {
                this.$confirm('确认删除该游戏？')
                    .then((res) => {
                        del_gobang({
                            gobang_id: row._id,
                        })
                            .then((res) => {
                                this.$message.success('删除成功')
                                this.init()
                            })
                            .catch((err) => {})
                    })
                    .catch(() => {})
            }
        },
        init() {
            get_gobang_list().then(async (res) => {
                if (res.data && this.isArray(res.data.data)) {
                    this.list = []
                    // status按下数据顺序排序
                    const arr = [2, 4, 1, 3]
                    let result = this.sortArray(res.data.data, arr, 'status')

                    for (let i = 0; i < result.length; i++) {
                        const item = result[i]
                        item.game_img = await this.createCanvasImg({
                            width: 200,
                            height: 120,
                            fontContent: `房间${i + 1}`,
                        }).catch((e) => {
                            return ''
                        })
                        item.statusLabel = getStatusLabel(item.status)

                        this.list.push(item)
                    }
                }
            }).catch(()=>{
            
            })
        },
        goGamePage(row = {}) {
            let { im_romm_id, _id } = row
            if (!im_romm_id || !_id) {
                return this.$message.warning('游戏尚未开放')
            }

            this.goTo('/game/goband', {
                query: {
                    im_romm_id,
                    game_id: _id,
                },
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>
