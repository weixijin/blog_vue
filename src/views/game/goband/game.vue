<template>
    <div class="goband-bg" :style="getBoxStyle()">
        <!-- 绘制棋盘 -->
        <div class="goband" :style="getBandStyle()">
            <div class="goband-line flex-wrap" v-for="(item, index) in list" :key="index">
                <div
                    :style="getItemStyle(item2)"
                    class="goband-line-item"
                    v-for="(item2, indey) in item"
                    :key="indey"
                    @click="clickHandle(index, indey)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Object,
            default: () => [],
        },
        config: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            baiBg: '',
            heiBg: '',
            boxBg: '',
        }
    },
    computed: {
        ...Vuex.mapState(['userdata']),
    },
    watch: {
        list: {
            handler(val) {
                this.list = val
            },
            deep: true,
        },
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.initIndexDb()
        },

        async initIndexDb() {
            Promise.all([
                this.getIndexDBIMJ(
                    'https://image.zlketang.com/public/news/others/blog/imgs/w_bg.png',
                ),
                this.getIndexDBIMJ(
                    'https://image.zlketang.com/public/news/others/blog/imgs/w_bai.png',
                ),
                this.getIndexDBIMJ(
                    'https://image.zlketang.com/public/news/others/blog/imgs/w_hei.png',
                )
            ])
                .then((res) => {
                    this.boxBg = res[0]
                    this.baiBg = res[1]
                    this.heiBg = res[2]
                })
                .catch(() => {})
        },
        getBandStyle() {
            let { line, width } = this.config
            return { width: line * width + 'px', height: line * width + 'px' }
        },
        getItemStyle(row) {
            let {
                baiBg,
                heiBg,
                config: { width },
            } = this
            let obj = {
                width: width + 'px',
                height: width + 'px',
            }

            let map1 = {
                0: '',
                1: baiBg,
                2: heiBg,
            }

            obj.background = `url(${map1[row.step_content]}) no-repeat center center`

            return obj
        },
        // 设置棋盘背景
        getBoxStyle() {
            return {
                background: `url(${this.boxBg}) no-repeat 14px 14px rgb(250, 250, 250)`,
            }
        },
        clickHandle(index, indey) {
            // 判断当前位置是否已经有棋子
            if (this.list[index][indey].step_content) return
            // 提交数据到后台
            this.$emit('clickHandle', {
                x: index + 1,
                y: indey + 1,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.goband-bg {
    margin: 20px auto;
    width: 542px;
    height: 542px;
    overflow: hidden;
    box-shadow: 2px 2px 8px #888;
}
</style>
