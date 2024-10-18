<template>
    <div class="demo">
        <img
            @click.stop="openIm"
            :class="['pos-im-icon p-f w-50 b-r-50 cu', isNewTip ? 'new-tip' : '']"
            src="https://ts1.cn.mm.bing.net/th/id/R-C.391235b30a0a80b999efa3ab04895a05?rik=UVByNYwmCvH4qA&riu=http%3a%2f%2fpic.616pic.com%2fys_bnew_img%2f00%2f19%2f34%2fYd821Ra6kI.jpg&ehk=klBHzkeyyJf7sykOKk7SYrY5sDpiAM4qh25JLjRvsMU%3d&risl=&pid=ImgRaw&r=0"
        />
        <div v-if="!isInit" v-clickoutside="clickoutside">
            <transition name="com-pre-an" mode="out-in">
                <div class="p-f pix-im border-left-im" v-show="isShowIm">
                    <Im
                        :isShowLeft="false"
                        :isShowIm="isShowIm"
                        @isShowNewSysTipFun="isShowNewSysTipFun"
                        @newMsg="newMsg"
                        @live_room="live_room"
                    ></Im>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import Im from '@/views/blog/im/index.vue'
export default {
    components: {
        Im,
    },
    data() {
        return {
            isInit: true,
            isShowIm: false,
            isNewTip: false,
        }
    },
    methods: {
        async live_room() {
            this.isShowIm = false
            await this.sleep(300)
            this.isInit = true
        },
        clickoutside() {
            this.isShowIm = false
        },
        isShowNewSysTipFun(val) {
            this.isNewTip = val
        },
        openIm() {
            if ((this.isInit = true)) {
                setTimeout(() => {
                    this.isShowIm = true
                }, 0)
            } else {
                this.isShowIm = true
            }
            this.isInit = false
        },
        newMsg() {
            let { isInit, isShowIm } = this
            if (!isInit && !isShowIm) {
                this.isNewTip = true
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.pos-im-icon {
    top: 100px;
    right: 20px;
    z-index: 100;
}
.pix-im {
    background-color: #fff;
    right: 0;
    top: 0;
    width: 400px;
    z-index: 999;
}
.new-tip {
    animation: a1 1s ease-in-out infinite;
}
@keyframes a1 {
    0% {
        border: 2px solid #fff;
    }
    100% {
        border: 2px solid $primary;
    }
}
.border-left-im{
    box-shadow: 0 0 5px #ccc;
}
</style>
