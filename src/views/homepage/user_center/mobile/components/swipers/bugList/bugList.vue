<template>
    <kl-scroll
        :pageOption="pageOption"
        :list="historyList"
        :scrollHeight="scrollHeight"
        @bottom="bottomEvent"
        class="p-l-10 p-r-10"
    >
        <div class="item" v-for="item in list" :key="item._id">
            <div class="flex-wrap">
                <div class="label-item">时间：</div>
                <div class="label-content">
                    {{ klDateFormat(item.bug_updata_time) }}
                </div>
            </div>
            <div class="flex-wrap m-t-10">
                <div class="label-item">次数：</div>
                <div class="label-content">
                    {{ item.bug_number }}
                </div>
            </div>

            <div class="flex-wrap m-t-10">
                <div class="label-item">类型：</div>
                <div class="label-content">
                    {{ getBugType(item.bug_type) }}
                </div>
            </div>

            <div class="flex-wrap m-t-10">
                <div class="label-item">内容：</div>
                <div class="c-danger">
                    {{ item.bug_content }}
                </div>
            </div>
        </div>
    </kl-scroll>
</template>

<script>
import admin from '@/api/blog/admin'
export default {
    props: {
        scrollHeight: {
            type: Number,
            default: 500,
        },
    },
    data() {
        return {
            historyList: [],
            pageOption: {
                pgae: 1,
                limit: 100,
                total: 0,
            },
            list: [],
        }
    },
    computed: {
        ...Vuex.mapState(['options']),
        bugOptionsList() {
            return this.options.bugTypeOptions || []
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        getBugType(type){
            let obj = this.bugOptionsList.find((item) => item.value == type)
            if(!obj) return 
            return obj.label
        },
        init() {
            this.pageOption.page = 1
            this.getList()
        },
        getList() {
            let { limit, page } = this.pageOption
            let params = {
                limit,
                page,
                cache:true,
            }
            admin
                .get_note_bug_apis(params)
                .then((res) => {
                    let { data, total } = res.data
         
                    if (Array.isArray(data)) {
                        this.list = [...this.list, ...data]
                        this.pageOption.total = total
                    }
                })
                .catch((err) => {})
                .finally(() => {})
        },
        bottomEvent() {
            let { limit, page, total } = this.pageOption
            if (limit * page >= total) return
            this.pageOption.page++
            this.getList()
        },
    },
}
</script>

<style lang="scss" scoped>
.item {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    border-radius: 8px;
    padding: 10px;
}
.label-item {
    flex-shrink: 0;
    line-height: 20px;
}
.label-content {
    color: #666;
    line-height: 20px;
}
</style>
