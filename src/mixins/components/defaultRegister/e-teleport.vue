<template>
    <div class="e-teleport">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: 'body',
        },
    },
    mounted() {
        const el = this.$el
        const to = document.querySelector(this.to)
        if (to) {
            to.appendChild(el)
        }
    },
    beforeDestroy() {

        const el = this.$el
        const to = document.querySelector(this.to)
        if (to) {
            to.removeChild(el)
        }
    },

}
</script>
