<template>
    <div class="demo">
        <div class="list">
            <p class="collection">
                收藏列表
                <span class="c-warning f-14"> ({{ current }}/{{ total }}) </span>
            </p>
            <el-input clearable v-model="filterVal" @input="filterList" class="m-b-5 my-input-s"></el-input>
            <div class="collections collections-ref" v-if="list.length > 0">
                <div
                    :class="[
                        'item',
                        'ell-1',
                        item.article_info._id == article_id ? 'c-primary active-article-ref' : '',
                    ]"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="goNextPage(item.article_info._id)"
                >
                    {{ item.article_info.article_name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        article_id: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            list: [],
            filterVal: '',
        }
    },
    computed: {
        ...Vuex.mapState(['collectionList']),
        current() {
            let index = this.list.findIndex((item) => item.article_info._id == this.article_id)
            if (index === -1) {
                return 0
            }
            return index + 1
        },
        total() {
            return this.list.length
        },
    },
    mounted() {
       this.init()
    },
    watch: {
        collectionList:{
            handler(){
               this.init() 
            },
            deep:true
        },
        article_id() {
            this.init()
        },
    },
    methods: {
        filterList() {
            this.list = this.collectionList.filter((item) => {
                return item.article_info.article_name.includes(this.filterVal)
            })
        },
        async setScrollEvent() {
            await this.$nextTick()
            // 获取到顶部的距离
            let el = $('.collections-ref')
            let active_el = $('.active-article-ref')
            let time = 100
            if (el && active_el) {
                let number1 = el.offset()?.top??0
                let number2 = active_el.offset()?.top??0
                let scrollTop = el.scrollTop() || 0
                let scrollNumber = number2 - number1 + scrollTop
                el.stop().animate({ scrollTop: scrollNumber }, time)
            }
        },
        init() {
            this.filterList()

            this.setScrollEvent()
        },
        goNextPage(id) {
            if(id === this.article_id) return
            this.$emit('goNextPage', id)
        },
    },
}
</script>

<style lang="scss" scoped>
.demo {
    border: 1px solid #ccc;
    margin-left: 10px;
    padding: 10px 15px;
    padding-right: 0;
    width: 230px;
    .collection {
        font-weight: bold;
        color: $success;
        margin-bottom: 15px;
    }
    .item {
        margin-bottom: 5px;

        font-size: 14px;
        line-height: 28px;
        cursor: pointer;
        &:nth-last-of-type(1) {
            margin-bottom: 0;
        }
    }
}
.collections {
    max-height: 300px;
    overflow-y: auto;
}
.my-input-s {
    height: 35px;
    width: 200px;
    ::v-deep {
        input {
            height: 35px;
        }
    }
}
</style>
