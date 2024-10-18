<template>
    <div class="demo">
        <h2 class="kl-wow">canvas水印</h2>
        <div class="wate-1 pr">
            <kl-water-mark>
                <el-button @click="opens"> 打开水印event </el-button>
            </kl-water-mark>
        </div>

        <h2 class="kl-wow">kl-collapse 折叠面板</h2>
        <div class="kl-collapse-cover-1" v-show="list.length">
            <div v-for="(item, index) in list" :key="index">
                <el-button @click="item.visable = !item.visable"
                    >切换折叠面板-{{ item.visable }}</el-button
                >
                <kl-collapse :animate="500" ref="klCollapseRef" v-model="item.visable">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                    </el-input>
                    <div class="box">{{ item.content }}</div>
                    <div class="w-50">
                        {{ inputVal }}
                    </div>
                    <el-input v-model="inputVal" @input="input($event, index)"></el-input>
                    <br />

                    <img
                        class="img2 kl-wow"
                        src="https://image.zlketang.com/public/news/others/imgs/01f67e57ad223b3c2dcaeae0c7321a92.png"
                        alt=""
                    />
                </kl-collapse>
            </div>
        </div>
        <hr />
        <h2 class="kl-wow" @click="elCollapseShow = !elCollapseShow">el-collapse 折叠面板</h2>

        <el-collapse-transition>
            <div v-show="elCollapseShow">
                <div>ahavhhj</div>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                </el-input>
            </div>
        </el-collapse-transition>

        <h2 class="kl-wow">倒计时-kl-count-down</h2>
        <kl-count-down :endTime="Date.now() + 1234560000"></kl-count-down>

        <div class="fan flex-center">6</div>

        <el-button class="m-t-20 kl-wow" @click="isShowPos = !isShowPos">切换显示</el-button>
        <moveTo>
            <transition name="fade" enter-active-class="enter-a" leave-active-class="out-a">
                <h2 v-if="isShowPos" :class="['pos-info-h2']">移动到指定元素下</h2>
            </transition>
        </moveTo>

        <el-button @click="isShowPos1 = !isShowPos1">切换显示1</el-button>
        <moveTo>
            <transition name="fade" enter-active-class="enter-a" leave-active-class="out-a">
                <h2 v-if="isShowPos1" :class="['pos-info-h2']">移动到指定元素下1</h2>
            </transition>
        </moveTo>

        <h2>自定义button</h2>
        <button class="kl-btn">默认按钮样式</button>

        <h2 class="kl-wow" data-animate="flash">懒加载--flash</h2>

        <img class="img1" v-for="item in imgs" :key="item.id" :data-src="item.imgs_url" />
    </div>
</template>

<script>
// import axios from 'axios'
import moveTo from '@/components/moveTo/index.vue'
export default {
    components: {
        moveTo,
    },
    data() {
        return {
            maxEllStr: '塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估',
            textarea: '',
            elCollapseShow: false,
            isShowPos: false,
            isShowPos1: false,
            inputVal: '',
            list: [],
            imgs: [],
        }
    },
    created() {
        setTimeout(async () => {
            for (let i = 0; i < 1; i++) {
                let obj = {
                    content: 'ajdbajba' + Math.random(),
                    visable: true,
                }
                this.list.push(obj)
            }
            axios
                .get('http://139.9.210.43:5000/common/get_imgs', {
                    params: {
                        page: 1,
                        limit: 1,
                    },
                })
                .then(async (res) => {
                    this.imgs = res.data.data.imgs
                    await this.$nextTick()
                    this.lazyLoad({
                        el: '.img1',
                        scroll_el: '.right',
                        number: 100,
                    })
                })
        }, 0)
    },
    mounted() {
        this.$nextTick(() => {
            this.klWow({
                scrollContainer: '.container .right',
            })
        })
    },
    methods: {
        opens() {
            this.$message('打开水印')
        },
        input(val, index) {
            this.$refs.klCollapseRef[index].init()
        },
        // 监听图片加载
        imgsLoad(imgs) {
            return new Promise((resolve, reject) => {
                let count = 0
                imgs.each((index, item) => {
                    if (item.complete) {
                        count++
                        if (count === imgs.length) {
                            resolve()
                        }
                    } else {
                        item.onload = () => {
                            count++
                            if (count === imgs.length) {
                                resolve()
                            }
                        }
                    }
                })
            })
        },
    },
}
</script>

<style>
@keyframes fadeInUp {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
    to {
        opacity: 1;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }
}
.fadeInUp {
    animation: fadeInUp 0.5s;
}

@keyframes flash {
    0%,
    50%,
    to {
        opacity: 1;
    }
    25%,
    75% {
        opacity: 0;
    }
}
.flash {
    animation: flash 1s;
}
</style>
<style lang="scss" scoped>
.pos-info-h2 {
    height: 100px;
    width: 300px;
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
}
.enter-a {
    animation: enter-a 1s;
}
.out-a {
    animation: out-a 1s;
}
@keyframes enter-a {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(-100px);
    }
    100% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}
@keyframes out-a {
    0% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateX(-50%) translateY(-100px);
    }
}
.box {
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
    background: #ccc;
}
.w-50 {
    width: 50px;
    white-space: wrap;
}
.img2 {
    height: 150px;
}
.img1 {
    display: block;
    height: 250px;
}

.kl-btn {
    cursor: pointer;
    position: relative;
    height: 40px;
    padding: 0 20px;
    background-color: $warning;
    color: #fff;
    border-radius: 4px;
    overflow: hidden;
    &:after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: -80px;
        width: 35px;
        height: 100%;
        // 背景色渐变
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.8) 60%,
            rgba(255, 255, 255, 0.2)
        );

        // 自动划过
        // animation: a 7s linear infinite;
    }
    // hover时划过
    &:hover:after {
        animation: a 6s linear;
    }
}

@keyframes a {
    0% {
        transform: translateX(-80px) skew(-30deg);
    }
    10% {
        transform: translateX(270px) skew(-30deg);
    }
    100% {
        transform: translateX(270px) skew(-30deg);
    }
}

@keyframes animate-filp-face {
    0% {
        transform: rotateX(-0.01deg);
        opacity: 1;
    }
    50% {
        opacity: 1;
    }
    51% {
        opacity: 0;
    }
    100% {
        transform: rotateX(-180deg);
        opacity: 0;
    }
}
.fan {
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
    width: 100px;
    height: 60px;
    background: #6c96e8;
    animation: animate-filp-face 2s infinite;
    transform-style: preserve-3d;
}
.wate-1 {
    height: 300px;
    width: 500px;
    background-color: #6c96e8;
}
.w-400 {
    width: 400px;
}
</style>
