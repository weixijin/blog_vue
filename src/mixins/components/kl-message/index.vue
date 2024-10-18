<template>
    <div class="kl-message" id="klMessage" @click="close">
        <div class="kl-message-container f-14">
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'kl-message',
    props: {
        message: {
            type: String,
            default: '',
        },
        sleep: {
            type: Number,
            default: 3000,
        },
    },
    data() {
        return {}
    },
    mounted() {
        setTimeout(() => {
            this.close()
        }, this.sleep)
    },
    methods: {
        // 移除当前节点
        close() {
            try {
                if(!this.$el) return
                if (document.body.contains(this.$el)) {
                    document.body.removeChild(this.$el)
                }
            } catch (e) {}
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-message {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 2000;
}
.kl-message-container {
    position: absolute;
    top: 150px;
    left: 50%;
    max-width: 80vw;
    transform: translateX(-50%);
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    // 添加背景模糊
    backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 20px 15px;
}
</style>
