<template>
    <img
        @click="openPrevewImg"
        :class="[ImgClass, 'fly-prevew-default-img', visable ? 'd-v' : '']"
        :src="src"
    />
</template>

<script>
export default {
    props: {
        src: {
            type: 'String',
            default: '',
        },
        flyImgClass: {
            type: 'String',
            default: '',
        },
        transitionTime: {
            type: 'Number',
            default: 0.5,
        },
    },

    data() {
        return {
            visable: false,
            ImgClass: this.createId(),
        }
    },
    methods: {
        openPrevewImg() {
            this.prevewImg(`.${this.ImgClass}`, {}, (res) => {
                console.log(res)
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.fly-prevew-default-img {
    width: 200px;
    height: 100px;
}
.d-v {
    visibility: hidden;
}
</style>
