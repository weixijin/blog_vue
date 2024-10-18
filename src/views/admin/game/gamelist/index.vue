<template>
    <div class="grid-list">
        <gameItem
            v-for="item in list"
            :key="item._id"
            :row="item"
            @commandFun="commandFun"
            @goGamePage="goGamePage(item)"
        ></gameItem>
    </div>
</template>

<script>
import gameItem from '@/views/admin/game/gamelist/gameitem.vue'
import { get_games, post_game, del_game } from '@/api/data.js'
export default {
    components: {
        gameItem,
        uploadImg: () => import('@/components/uploadImg/index.vue'),
    },
    data() {
        return {
            options: [],
            list: [],
            isShow: false,
            rowForm: {
                _id: '',
                game_name: '',
                game_content: '',
                game_img: '',
                status: '1', // 1 启用  2 禁用
                path: '',
                im_romm_id: '',
            },
            rules: {
                game_name: [
                    { required: true, message: '请输入游戏名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                ],
                game_content: [
                    { required: true, message: '请输入游戏描述', trigger: 'blur' },
                    { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' },
                ],
                path: [
                    { required: true, message: '请输入游戏地址', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                ],
            },
        }
    },
    created() {
        this.init()
    },
    computed: {
        ...Vuex.mapState(['userdata', 'userTags']),
        ...Vuex.mapGetters(['isAdmin']),
        dTitle() {
            return this.rowForm._id ? '编辑游戏' : '新增游戏'
        },
    },
    methods: {
        goGamePage(row) {
            let { type } = row

            let obj = {
                1: '/game/gobandList', // 五子棋
            }

            let path = obj[type] || ''
            if (!path) {
                return this.$message.warning('还没开启')
            }

            this.goTo(path)
        },
        confirm() {
            let { ruleForm } = this.$refs
            if (ruleForm) {
                ruleForm.validate((val) => {
                    if (val) {
                        let { game_img } = this.rowForm
                        if (!game_img) {
                            this.$message.warning('请选择封面图片')
                            return false
                        }
                        post_game(this.rowForm).then(() => {
                            this.$message.success('操作成功')
                            this.init()
                        })

                        return
                    }

                    return false
                })
            }
        },
        openD() {
            this.isShow = true
        },
        init() {
            // 获取全部的列表数据
            get_games()
                .then(async (res) => {
                    if (res.data && Array.isArray(res?.data?.data)) {
                        let result = []

                        for (let i = 0; i < res.data.data.length; i++) {
                            const item = res.data.data[i]
                            item.game_img = await this.createCanvasImg({
                                width: 200,
                                height: 120,
                                fontContent: item.name,
                            }).catch((e) => {
                                return ''
                            })

                            item.statusLabel = item.status == 1 ? '启用' : '禁用'

                            result.push(item)
                        }

                        this.list = result
                    }
                })
                .catch((err) => {})
        },
        commandFun({ type, row = { _id } }) {
            switch (type) {
                case 'edit':
                    this.rowForm = this.deepCopy(row)
                    this.isShow = true
                    break
                case 'delete':
                    del_game({ _id })
                        .then(() => {
                            this.$message.success('删除成功')
                        })
                        .catch(() => {})
                    break
            }
        },
        closed() {
            Object.assign(this.rowForm, {
                _id: '',
                game_name: '',
                game_content: '',
                game_img: '',
                status: '1', // 1 启用  2 禁用
                path: '',
                im_romm_id: '',
            })
            this.isShow = false
        },
    },
}
</script>

<style lang="scss" scoped>
.grid-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    gap: 10px;
}
</style>
