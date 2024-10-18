<template>
    <div class="demo">{{ surplusTime }}s</div>
</template>

<script>
export default {
    props: {
        time: {
            // 每步的最大间隔时间
            type: Number,
            default: 0,
        },
        all_time: {
            // 当前局累计对局时间
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            default: '',
        },
        gobang_id: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            timer: null,
            useTime: 0,
        }
    },
    watch: {
        status: {
            handler(val) {
                if (val == 2) {
                    // 开启倒计时
                    this.init()
                    return
                }
                // 暂停
                this.clearTimer()
            },
            immediate: true,
        },
    },
    computed: {
        surplusTime() {
            return this.time - this.useTime
        },
    },
    beforeDestroy() {
        this.clearTimer()
    },
    methods: {
        clearTimer() {
            clearInterval(this.timer)
            this.timer = null
        },
        async init() {
            this.clearTimer()
            this.timer = setInterval(() => {
                this.useTime += 1
                if (this.useTime > this.time) {
                    this.$emit('timeOver')
                    this.clearTimer()
                }
            }, 1000)
        },
    },
}
</script>

<style lang="scss" scoped></style>
