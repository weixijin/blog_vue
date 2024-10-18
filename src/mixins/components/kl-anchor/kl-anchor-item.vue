<template>
    <div class="kl-anchor-item" :id="id">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'demo',
    components: {},
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {}
    },
    methods: {
        changeCom(id) {
            this.$emit('changeCom', id)
        },
    },
}
</script>

<style lang="scss" scoped></style>
