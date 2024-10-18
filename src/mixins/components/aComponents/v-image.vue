<template>
    <van-image
        :src="src"
        :fit="fit"
        :alt="alt"
        :width="width"
        :height="height"
        :round="round"
        :lazy-load="lazyLoad"
        :show-error="showError"
        :error-icon="errorIcon"
        :loading-icon="loadingIcon"
    >
        <template v-slot:loading>
            <van-loading type="spinner" size="20" />
        </template>
        <template v-slot:error>
            <van-icon name="photo-fail" />
        </template>
    </van-image>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: '',
        },
        fit: {
            type: String,
            default: 'fill',
        },
        alt: {
            type: String,
            default: '提示文字',
        },
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '100%',
        },
        round: {
            type: Boolean,
            default: false,
        },
        'lazy-load': {
            type: Boolean,
            default: false,
        },
        'show-error': {
            type: Boolean,
            default: true,
        },
        'show-loading': {
            type: Boolean,
            default: true,
        },
        'error-icon': {
            type: String,
            default: 'van-icon van-icon-photo-fail van-image__error-icon',
        },
        'loading-icon': {
            type: String,
            default: 'photo',
        },
    },
    data() {
        return {}
    },
    methods: {},
}
</script>

<style lang="scss" scoped></style>
