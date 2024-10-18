<template>
    <div class="kl-date-month">
        <div class="kl-date-month__header">
            <div class="kl-date-month__header__title">
                <div class="kl-date-month__header__title__year">
                    <span class="kl-date-month__header__title__year__text">2021</span>
                    <span class="kl-date-month__header__title__year__icon"></span>
                </div>
                <div class="kl-date-month__header__title__month">
                    <span class="kl-date-month__header__title__month__text">1月</span>
                    <span class="kl-date-month__header__title__month__icon"></span>
                </div>
            </div>
            <div class="kl-date-month__header__btn">
                <div class="kl-date-month__header__btn__item">今天</div>
                <div class="kl-date-month__header__btn__item">清空</div>
            </div>
        </div>
        <div class="kl-date-month__body">
            <div class="flex-wrap flex-justify-between kl-date-month__body__week">
                <div class="kl-date-month__body__week__item">一</div>
                <div class="kl-date-month__body__week__item">二</div>
                <div class="kl-date-month__body__week__item">三</div>
                <div class="kl-date-month__body__week__item">四</div>
                <div class="kl-date-month__body__week__item">五</div>
                <div class="kl-date-month__body__week__item">六</div>
                <div class="kl-date-month__body__week__item">日</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        date: {
            type: [], // [2022,01]
            default: () => [],
        },
    },
    data() {
        return {}
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            // 根据日期初始化当前月信息
            this.initMonth()
        },
        initMonth() {
            if (this.date.length !== 2) return
            let year = this.date[0]
            let month = this.date[1]
            let date = new Date(year, month, 0)
            let days = date.getDate()
            let firstDay = new Date(year, month - 1, 1).getDay()
            let lastDay = new Date(year, month, 0).getDay()
            let arr = []

            for (let i = 0; i < firstDay - 1; i++) {
                arr.push({
                    type: 'pre',
                })
            }
            for (let i = 1; i <= days; i++) {
                arr.push({
                    type: 'today',
                    date: `${year}-${month}-${i}`,
                })
            }
            for (let i = 0; i < 7 - lastDay; i++) {
                arr.push({
                    type: 'next',
                })
            }
        //    console.log('monthdata', arr)
        },
    },
}
</script>

<style lang="scss" scoped></style>
