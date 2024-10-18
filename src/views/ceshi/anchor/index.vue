<template>
    <div class="anchor">
        <div class="kl-tab-pos">
            <kl-tab
                v-model="defaultActive"
                :options="tabOptions"
                @change="changeCom"
            ></kl-tab>
        </div>

        <div class="pos-main">
            <kl-anchor :activeId="defaultActive" :scrollHeight="scrollHeight">
                <kl-anchor-item
                    :id="item.id"
                    v-for="item in menuList"
                    :key="item.id"
                    @changeCom="changeCom"
                >
                    <h2>
                        {{ item.id }}
                    </h2>

                    <img
                        :src="'http://139.9.210.43:5000' + item.url"
                        alt=""
                        v-for="item in imgs"
                        :key="item.id"
                    />
                </kl-anchor-item>
            </kl-anchor>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
    name: 'anchor',
    components: {},
    data() {
        return {
            scrollHeight: 700, // 必填项,这是传入给容器的滚动高度，需要根据实际情况传入
            imgs: [],
            defaultActive: 'nav1', // menuList中的id对应
            tabOptions: [], // tab的配置项
            menuList: [
                // 注意id的唯一性
                {
                    id: 'nav1',
                    title: 'nav11',
                },
                {
                    id: 'nav2',
                    title: 'nav22',
                },
                {
                    id: 'nav3',
                    title: 'nav33',
                },
                {
                    id: 'nav4',
                    title: 'nav44',
                },
                {
                    id: 'nav5',
                    title: 'nav55',
                },
                {
                    id: 'nav6',
                    title: 'nav66',
                },
            ],
        }
    },
    created() {
        // 生成tab的配置项
        this.tabOptions = this.menuList.map((item) => {
            let obj = {
                value: item.id,
                label: item.title,
            }
            return obj
        })
    },
    mounted() {
        setTimeout(async () => {
            let data = await axios.get('/api/ceshi/imgs')
            if (data.data.code == 200) {
                this.imgs = data.data.data
            }
        }, 0)
    },
    methods: {
        changeCom(id) {
            this.defaultActive = id
        },
    },
}
</script>

<style lang="scss" scoped>
.anchor {
    position: relative;
    .kl-tab-pos {
        width: 100%;
        position: absolute;
        top: -20px;
        left: 0;
    }
    .pos-main {
        position: absolute;
        top: 60px;
        left: 0;
    }
}
</style>
