<template>
    <div class="commonHeader">
        <h2>
            <slot> 这就是默认值</slot>
        </h2>
    </div>
</template>

<script>
export default {
    name: 'commonHeader',
}
</script>

<style lang="scss" scoped>
.commonHeader {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
        color: #333;
    }
}
</style>
