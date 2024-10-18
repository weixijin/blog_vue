<template>
    <kl-popup :visible="visible" height="100vh" bottom :visable="visable">
        <div class="p-10" @click="visible = false">
            <div class="f-14 f-555 kl-data-header">
            <span> 2022-01-01 00:00:00</span> 
            <span class="m-l-5 m-r-5">{{ rangeSeparator }}</span>
            <span>2022-01-02 23:59:59</span>
        </div>
        <div class="kl-data-main">
            <div class="swiper-container swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="kl-date-swiper-height">开始日期
                            <kl-date-month :date="[2022,12]"></kl-date-month>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="kl-date-swiper-height">结束日期</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </kl-popup>
</template>

<script>
import KlDateMonth from './kl-date-month.vue'
export default {
    components: {KlDateMonth},
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        value: {
            type: Array,
            default: () => [],
        },
        type: {
            type: String,
            default: 'one',
            validator: function (value) {
                return ['one', 'two'].includes(value)
            },
        },
        rangeSeparator: {
            type: String,
            default: '-',
        },
        startPlaceholder: {
            type: String,
            default: '开始日期',
        },
        endPlaceholder: {
            type: String,
            default: '结束日期',
        },
    },
    data() {
        return {
            step: 1,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        initSwiper() {
            new Swiper('.swiper-container')
        },
        init() {
            this.initSwiper()
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep {
    .zl-popup-container {
        border-radius: 0;
    }
}
.kl-date-container {
    height: 500px;
}
.kl-date-swiper-height {
    height: 500px;
}
</style>
