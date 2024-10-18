<template>
    <svg class="circular" :viewbox="setViewBox" :style="setStyle">
        <circle class="path" :cx="radius" :cy="radius" :r="radius" fill="none" :style="{stroke:color}" />
    </svg>
</template>

<script>
export default {
    props: {
        // 半径
        radius:{
            type: Number,
            default: 50,
        },
        // 颜色
        color:{
            type: String,
            default: '#3399FF',
        }
    },
    data() {
        return {}
    },
    computed:{
        setViewBox(){
            // min-x, min-y, width and height
            return `0 0 ${this.radius*2} ${this.radius*2}`
        },
        setStyle(){
            return {
                width: this.radius*2 + 'px',
                height: this.radius*2 + 'px',
            }
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        async init(){
            await this.$nextTick()
            // 设置scss中的变量
            


        }
    },
}
</script>

<style lang="scss" scoped>
$maxWidth:200;
$minWidth:89;
$strokeDashoffset1:-35px;
$strokeDashoffset2:-124px;

.circular {
    /* 一直旋转 */
    animation: rotate 2s linear infinite;
}
.path {
    /* 指定短划线和缺口的长度 */
    stroke-dasharray: 1, $maxWidth;  
    /* 设置虚实的偏移量 */
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
}
@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}
@keyframes dash {
    0% {
        stroke-dasharray: 1, $maxWidth;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: $minWidth, $maxWidth;
        stroke-dashoffset: $strokeDashoffset1;
    }
    100% {
        stroke-dasharray: $minWidth, $maxWidth;
        stroke-dashoffset: $strokeDashoffset2;
    }
}
</style>
