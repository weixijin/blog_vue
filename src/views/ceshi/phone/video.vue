<template>
    <div class="demo pr">
        <div class="poster"></div>
        <div class="video-pos">
            <kl-video :width="375" :height="667"></kl-video>
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
.poster {
    margin: 10px 16px;
    width: 144px;
    height: 189px;
    border-radius: 6px;
    background-color: #369;
}
.video-pos{
    position: fixed;
    top: 0;
    left: 0;
}
</style>
