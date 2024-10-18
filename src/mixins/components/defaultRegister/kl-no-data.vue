<template>
    <div class="flex flex-column-wrap flex-center-wrap kl-no-data">
        <img
            src="//image.zlketang.com/public/news/others/imgs/blog_imgs/f21fc445ca90f66927e50d99c2c3cd35.png"
            alt=""
        />
        <div class="text">
            <slot> 暂无数据~ </slot>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {}
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
img {
    width: 100px;
}
.text {
    font-size: 14px;
    color: #999;
    margin-top: 10px;
}
</style>
