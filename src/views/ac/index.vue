<template>
    <div class="ac-home">
        <component
            :is="page"
            :list="list"
            :currentRow="currentRow"
            @update="update"
            @change="change"
            @init="init"
            @del="del"
            @select="select"
        ></component>
    </div>
</template>

<script>
import prevewList from './prevewList.vue'

import { searchArticles } from '@/api/blog'
export default {
    components: {
        prevewList,
    },
    data() {
        return {
            page: 'prevewList',
            pageOption: {
                page: 1,
                limit: 10000,
                total: 0,
            },
            list: [],
            currentRow: {},
        }
    },
    created() {
        this.init()
    },
    methods: {
        select(row) {
            this.currentRow = row
        },
        update(row) {
            this.list = this.list.map((item) => {
                return item._id === row._id ? row : item
            })

            this.currentRow = row
        },
        del(_id) {
            let index = this.list.findIndex((item) => item._id === _id)
            this.list = this.list.filter((item) => item._id !== _id)
            if (this.list[index]) {
                this.currentRow = this.list[index]
            } else {
                this.currentRow = this.list[0] || {}
            }
        },
        change({ page, row }) {
            this.page = page
            this.row = row
        },
        async init(type = 1) {
            // 缓存1天
            const params = { ac_type: 1, cache: true, expire_time: 1 * 24 * 3600 * 1000 }
            if (type === 1) {
                params.expire_time = -1
            }
            searchArticles(params)
                .then((res) => {
                    if (res.data && this.isArray(res.data.list)) {
                        this.list = res.data.list
                        this.pageOption.total = this.list.length

                        if (this.list.length) {
                            this.currentRow = this.list[0]
                        }
                    }
                })
                .catch((err) => {})
        },
    },
}
</script>

<style lang="scss" scoped></style>
