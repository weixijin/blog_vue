<template>
    <van-popup
        class="user-popup"
        v-model="value"
        :duration="0.3"
        get-container="body"
        :style="{ height: height + 'px' }"
        :overlay-style="{ background: 'transparent' }"
        position="bottom"
        @closed="closed"
        >
         <div class="flex-wrap flex-justify-center" :style="{height: height + 'px'}" @click="closed">
            <div class="main" @click.stop="()=>{}">
            
            </div>
         </div>
        </van-popup
    >
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: '',
        },
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            height: 400,
        }
    },
    watch: {
        value(val) {
            if (this.id && val) {
                this.init()
            }
        },
    },
    methods: {
        closed() {
            this.$emit('input', false)
        },
        init() {
            this.setHeight()
        },

        async setHeight(){
            await this.$nextTick()
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
            this.height = (clientHeight - 438) / 2 + 438
        }
    },
}
</script>

<style scoped>
.user-popup {
    background-color: transparent !important;
}
.main{
    width:320px;
    height: 438px;
    background-image: url('//image.zlketang.com/public/news/others/imgs/blog/user-popup-bg/user-popup-type4.png');
    background-size: cover;
}

.van-popup-slide-bottom-enter-active,
.van-popup-slide-bottom-enter-to {
    animation: bounceIn .6s both ease-out;
}

@keyframes bounceIn {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }
    50% {
        transform: translateY(-20px);
        opacity: 1;
    }
    100% {
        transform: translateY(0);
    }
}

/* 离开动画 */
.van-popup-slide-bottom-leave-active,
.van-popup-slide-bottom-leave-to {
    animation: bounceOut .6s both ease-out;
}

@keyframes bounceOut {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    50% {
        transform: translateY(-20px);
        opacity: 1;
    }
    100% {
        transform: translateY(100%);
        opacity: 0;
    }
}

</style>
