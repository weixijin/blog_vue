<template>
    <!-- 图片预览组件 -->
    <div :class="['kl-preview-img-mask p-f d-n', maskId]" @click="close">
        <img @click.stop="" :src="url" :class="['p-a pre-img-cover', isColumn ? '' : 'pre-img']" />
        <div class="m-trans-icon p-10 p-a">
            <i @click.stop="isColumn = !isColumn" class="el-icon-refresh-left f-28 f-600 c-fff"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'klPreviewImg',
    data() {
        return {
            url: '',
            maskId: '',
            isColumn: true,
        }
    },
    mounted() {
        this.maskId = this.createId()
    },
    methods: {
        async open(url) {
            if (!url) return
            this.isColumn = true

            let { maskId } = this
            // 如果图片上的链接和传入的链接一样，直接显示
            if (this.url === url) {
                $(`.${maskId}`).show(500)
                return
            }
            this.url = url
            await this.$nextTick()
            // 图片加载完成后再显示
            let img = document.querySelector('.pre-img-cover')

            img.onload = function () {
                $(`.${maskId}`).show(500)
            }
        },
        close() {
            let { maskId } = this
            $(`.${maskId}`).hide(500)
        },
    },
}
</script>

<style lang="scss" scoped>
.m-trans-icon {
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1001;
}

.kl-preview-img-mask {
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
    height: 100vh;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}
img {
    transition: all 0.5s;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: 90%;
}

.pre-img {
    // 旋转至横屏
    transform: translate(-50%, -50%) rotate(90deg);
    max-width: 90vh;
    max-height: 90vw;
}
</style>
