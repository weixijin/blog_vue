<template>
    <div class="kl-step">
        <div class="kl-step-header flex-center">
            <div
                :class="[
                    'kl-step-left-line',
                    activeIndex >= index ? 'active' : '',
                    index === 1 ? 'transparent' : '',
                ]"
            ></div>
            <div
                :class="[activeIndex >= index ? 'active' : '', 'kl-step-top-index', 'flex-center']"
            >
                <span v-show="activeIndex < index">
                    {{ index }}
                </span>
                <i v-show="activeIndex >= index" class="el-icon-check"></i>
            </div>
            <div
                :class="[
                    'kl-step-right-line',
                    activeIndex >= index + 1 ? 'active' : '',
                    +index === +maxIndex ? 'transparent' : '',
                ]"
            ></div>
        </div>
        <div :class="['kl-step-center-title', activeIndex >= index ? 'active' : '']">
            {{ title }}
        </div>
        <div :class="['kl-step-slot', activeIndex >= index ? 'active' : '']">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            require: true,
        },
    },
    data() {
        return {
            activeIndex: 1, // 当前激活步骤
            index: '', // 当前step 的index
            maxIndex: 0, // 总长度
        }
    },
}
</script>

<style lang="scss" scoped>
$size: 30px;
$defaultColor: #666;
$lineWidth: 50px;
.kl-step {
    font-size: 16px;
    color: #666;
    .kl-step-header {
        .kl-step-left-line {
            border: 1px solid $defaultColor;
            width: $lineWidth;
        }
        .kl-step-right-line {
            border: 1px solid $defaultColor;
            width: $lineWidth;
        }
    }
    .kl-step-top-index {
        height: $size;
        width: $size;
        border-radius: 50%;
        border: 2px solid $defaultColor;
        color: $defaultColor;
    }
    .kl-step-center-title,
    .kl-step-slot {
        color: $defaultColor;
        margin-top: 10px;
        text-align: center;
        max-width: calc($lineWidth * 2 + $size);
    }
    .active {
        color: $primary !important;
        border-color: $primary !important;
    }
    .transparent {
        border-color: transparent !important;
    }
}
</style>
