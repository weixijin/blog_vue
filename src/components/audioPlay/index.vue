<template>
    <audio
        class="pos-audio p-a op-0"
        v-if="value"
        :src="parseResourceUrl(url)"
        type="audio/ogg"
        controls
        autoplay
        @ended="audioEnd"
    ></audio>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        url: {
            type: String,
            default: '',
        },
    },
    data() {
        return {}
    },
    methods: {
        audioEnd() {
            this.$emit('ended')
        },
    },
}
</script>

<style lang="scss" scoped>
.pos-audio {
    top: -9999px;
}
</style>
