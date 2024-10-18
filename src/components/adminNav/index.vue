<template>
    <div class="admin-nav">
        <slot> </slot>

        <div class="kl-btn go-home cu" @click="$router.push('/home')">
            返回首页
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {}
    },
    watch: {},
}
</script>

<style lang="scss" scoped>
.admin-nav {
    position: relative;
    height: 60px;
    line-height: 60px;
    width: 100%;
    background-color: #f1f1f1;
    color: $primary;
    border-left: 3px solid $primary;
    padding-left: 20px;
    font-weight: 550;
    font-size: 18px;
}
.go-home{
    font-weight: 500;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    font-size: 16px;
}
</style>
