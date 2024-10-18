<template>
    <div class="kl-menu flex-wrap">
        <div
            :class="['kl-menu-item', 'flex-center']"
            v-for="menu in navOptions"
            :key="menu.value"
            @click="changeMenu(menu.value)"
        >
            <div
                :class="[
                    'flex-center',
                    'kl-menu-item-text',
                    active === menu.value ? 'kl-menu-active-menu' : '',
                ]"
            >
                {{ menu.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        menuWidth: {
            type: Number,
            default: 0,
        },
        active: {
            type: String,
            require: true,
        },
        navOptions: {
            type: Array,
            require: true,
        },
    },
    data() {
        return {}
    },
    methods: {
        changeMenu(val) {
            this.$emit('change', val)
        },
    },
}
</script>

<style lang="scss" scoped>
$menuHeight: 40;
$menuPrimary: #369;
$menuActive: #fff;
$menuActiveBck: #395;

.kl-menu {
    cursor: pointer;
    color: #555;

    .kl-menu-item {
        height: $menuHeight + px;
        height: $menuHeight;
        background-color: #ccc;

        .kl-menu-item-text {
            width: 100%;
            height: 100%;
            padding: 0 30px;
        }
        &:hover {
            .kl-menu-item-text {
                color: #fff;
                width: 100%;
                height: 100%;
                background-color: $menuActiveBck;
                opacity: 1;
                transition: all 0.5s;
            }
        }
    }
    .kl-menu-active-menu {
        color: $menuActive;
        animation: a 0.5s;
        white-space: nowrap;
        overflow: hidden;
        animation-fill-mode: forwards;
    }
}

@keyframes a {
    0% {
        width: 0%;
        height: 0%;
        background-color: #fff;
        opacity: 0;
    }
    100% {
        width: 100%;
        height: 100%;
        background-color: $menuActiveBck;
        opacity: 1;
    }
}
</style>
