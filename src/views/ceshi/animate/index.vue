<template>
    <div class="scroll-page-1">
        <h2>canvasImg</h2>
        <e-image :width="300" :height="150" v-for="item in 5" :key="item" :src="item"></e-image>

        <h2>e-loading</h2>
        <e-loading></e-loading>
        <h2>倒计时</h2>
        <flipCountdown></flipCountdown>

        <h2>gsap-flip动画</h2>
        <gsapFilp></gsapFilp>

        <h2>卡片flip动画</h2>
        <cardFlipAnimate></cardFlipAnimate>
        <h2>列表flip动画</h2>

        <listFlipAnimate></listFlipAnimate>

        <h2 @click="isCollapse = !isCollapse">高度过渡动画</h2>
        <kl-collapse-transfrom v-model="isCollapse">
            啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于啊的法国雅安关于
        </kl-collapse-transfrom>

        <h2>图片飞出预览</h2>
        <kl-img-fly-prevew :src="imgUrl"></kl-img-fly-prevew>
        <h2>多行省略号</h2>
        <div class="w-200 m-t-30">
            <kl-max-ell v-model="feihua" @click="clickFun"></kl-max-ell>
        </div>

        <h2>无缝滚动</h2>
        <div class="a-container">
            <animateList :list="list" />
        </div>
        <h2>透视</h2>
        <div class="box">
            <div class="box1"></div>
        </div>
    </div>
</template>
<script>
import animateList from '@/views/ceshi/animate/components/animateList.vue'
import listFlipAnimate from '@/views/ceshi/animate/components/listFlipAnimate.vue'
import cardFlipAnimate from '@/views/ceshi/animate/components/cardFlipAnimate.vue'
import flipCountdown from '@/views/ceshi/animate/components/flipCountdown.vue'
import gsapFilp from '@/views/ceshi/animate/components/gsapFilp.vue'

export default {
    components: {
        animateList,
        listFlipAnimate,
        cardFlipAnimate,
        flipCountdown,
        gsapFilp,
    },
    data() {
        return {
            imgs: [],
            isCollapse: true,
            imgUrl: 'https://pic.3gbizhi.com/uploads/20140519/b1bd4da2aeb3ef90bd67dd3b4f3ac88d.jpg',
            duan: 'aghagvagagadg',
            feihua: '嘎嘎嘎和啊啊哈嘎嘎嘎和啊啊哈嘎嘎嘎嘎嘎和啊啊哈嘎嘎嘎嘎嘎嘎和啊啊哈嘎嘎嘎',
            list: [],
        }
    },
    async created() {
        for (let i = 0; i < 10; i++) {
            this.list.push('啊寒假不回家' + i)
        }
    },
    methods: {
        clickFun() {
            this.$message.success('jjj')
        },
    },
}
</script>
<style lang="scss" scoped>
.box {
    width: 200px;
    height: 200px;
    border: 1px solid #999;
    transform-style: preserve-3d;
    // transform: perspective(600px);
    // perspective: 600px;
    transform: perspective(600px) rotateY(45deg);
    &:hover {
        .box1 {
            transform: translate3d(0, 0, 100px);
        }
    }
}
.box1 {
    width: 200px;
    height: 200px;
    background: red;
    transition: 1s;
    backface-visibility: hidden;
}
.a-container {
    width: 326px;
    height: 200px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0px 0px 12px 12px;
    opacity: 0.4;
}
.box-33 {
    background-color: #ccc;
    min-height: 120px;
    line-height: 20px;
    display: flex;
    align-items: center;
}
.m-t-100 {
    margin-top: 100px;
}
.w-200 {
    width: 200px;
}
</style>
