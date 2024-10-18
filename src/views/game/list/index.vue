<template>
    <div class="p-20">
        <h2>游戏中心</h2>
        <div class="flex-wrap m-t-20">
            <div
                class="item cu"
                v-for="(item, index) in list"
                :key="index"
                @click="goGame(item)"
            >
                <img class="game-pre-img" :src="item.meta.bg" alt="" />
                <h3 class="flex-center">
                    {{ item.meta.title }}
                </h3>
            </div>
        </div>
    </div>
</template>

<script>
import { gameRouters } from '@/router/game.js'
export default {
    components: {},
    data() {
        return {
            list: gameRouters[0].children,
        }
    },
    methods: {
        goGame(row) {
            let { path } = row
            window.open('#/game/' + path)
        },
    },
}
</script>

<style lang="scss" scoped>
.flex-box {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 240px);
    grid-gap: 20px;
}
.game-pre-img{
    width: 100%;
}
</style>
