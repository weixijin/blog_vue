<template>
    <nav class="navlist">
        <li
            @click="changeNav(item._id, item)"
            v-for="(item, index) in navlist"
            :key="index"
            :class="['flex-wrap flex-justify-between',class_id == item._id ? 'active' : '', 'oneline']"
        >
            <div class="ell">
                {{ item.class_name }}
            </div>

            <div class="f-12">
                {{item.article_count}}
            </div>
        </li>
    </nav>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        navlist: {
            type: Array,
            default: [],
        },
    },
    watch:{
        navlist:{
            handler(val){
                this.navlist = val
            },
            deep:true
        }
    },
    computed:{
             ...Vuex.mapState(['class_id']),
    },

    methods: {
        changeNav(class_id) {
            if(this.class_id == class_id ) return
            this.$store.commit('setclass_id', class_id)
            this.$emit('getArticles', class_id)
        },
    },
    components: {},
}
</script>

<style lang="scss" scoped>
.navlist {
    min-width: 200px;
    width:200px;
    border-right: 1px solid #ccc;
    height: calc(100vh - 90px);
    overflow-y: auto;
    li {
       width:200px;
        cursor: pointer;
        padding: 0 25px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        &:hover {
            color: $primary;
            background-color: #f5f5f5;
        }
    }
}

.navlist::-webkit-scrollbar {
    display: none;
}

.active {
    color: #fff !important;
    background-color: $primary !important;
}
</style>
