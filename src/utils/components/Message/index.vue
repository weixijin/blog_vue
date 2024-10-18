<template>
    <div class="demo">
        <h1>{{ message }}</h1>
    </div>
</template>

<script>
export default {
    name: 'demo',
    components: {},
    props: {
        message: {
            type: String,
            default: 'Message',
        },
    },
    data() {
        return {}
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
h1 {
    font-weight: 700;
    position: fixed;
    top: 100px;
    left: 100px;
    z-index: 999;
}
</style>
