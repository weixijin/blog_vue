<!--
 * @Author: wxj
 * @Description:  输入应该最大图片个数 当前获取到的img配置
-->
<template>
    <ul class="kl-imgs" :style="{ width: pwidth + 'px', height: cwidth + 'px' }">
        <li
            v-for="index in length"
            :key="index"
            :style="{
                width: cwidth + 'px',
                height: cwidth + 'px',
                'line-height': cwidth + 'px',
                left: (cwidth - 2 * count) * (index - 1) + 'px',
                'z-index': zIndex - index,
            }"
        >
            <img
                v-if="index - 1 < options.length"
                :src="options[index - 1].url"
                :alt="index - 1"
                :title="index - 1"
                :style="{
                    width: cwidth + 'px',
                    height: cwidth + 'px',
                    'line-height': cwidth + 'px',
                }"
                @click="handleImg(options[index - 1].id)"
            />
            <div
                v-else
                class="kl-upload-img"
                :style="{
                    width: cwidth + 'px',
                    height: cwidth + 'px',
                    'line-height': cwidth + 'px',
                    'background-color': bckColor,
                }"
                @click="handleImg(null)"
            >
                +
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'kl-ims',
    props: {
        options: {
            // 图片列表
            type: Object,
            default: null,
            required: true,
        },

        pwidth: {
            // 父元素宽度
            type: Number,
            default: 200,
        },

        cwidth: {
            // 图片宽度
            type: Number,
            default: 64,
        },
        length: {
            // 图片长度(个数)
            type: Number,
            default: 5,
        },
        bckColor: {
            // 背景图color
            type: String,
            default: '#ddd',
        },
    },
    data() {
        return {
            zIndex: 999,
            count: 40, // left 值
        }
    },
    mounted() {
        // 计算出平移值
        this.count = (this.cwidth * this.length - this.pwidth) / (2 * (this.length - 1))
        // console.log(this.count);
    },
    methods: {
        handleImg(id) {
            this.$emit('handleImg', id)
        },
    },
}
</script>

<style lang="scss" scoped>
img {
    width: 64px;
    border-radius: 50%;
}

.kl-upload-img {
    width: 64px;
    text-align: center;

    color: #fff;
    font-size: 30px;
    font-weight: 550;
    border-radius: 50%;
}

.kl-imgs {
    /* background-color: red; */
    position: relative;
    li {
        cursor: pointer;
        position: absolute;
        top: 0;
    }
}
</style>
