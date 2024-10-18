<template>
    <div>
        <div class="flex-wrap" v-if="list.length">
            <div class="w-50 h-50 b-r-50 m-r-10 m-b-10 pr item-icon" v-for="item in list" :key="item._id">
                <i class="el-icon-error pa pa-close-icon" @click="del(item)"></i>
                <e-image
                    class="b-r-50"
                    :width="50"
                    :height="50"
                    :src="parseResourceUrl(item.header_img)"
                    :title="item.username"
                />
            </div>
        </div>
        <div class="flex-center flex-1" v-else>--</div>
    </div>
</template>

<script>
export default {
    props: {
        type:{
            type:String,
            default:''
        },
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {}
    },
    methods: {
        del(item){
            this.$emit('del',{
                type:this.type,
                row:item
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.pa-close-icon{
    top: 0px;
    right: 0;
    z-index: 9999;
    display: none;
}
.item-icon{
    &:hover{
        .pa-close-icon{
            display: block;
        }
    }
}
</style>
