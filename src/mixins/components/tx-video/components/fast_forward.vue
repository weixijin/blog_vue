<template>
    <!-- 前进后退15s控件  -->
    <div class="tx-video-control-fast-forward flex-center-wrap">
          <img
            @click="pre"
            class="backward-box-img"
            :src="preImg"
        />
        <img
            @click="next"
            class="forward-box-img"
            :src="nextImg"
        />
    </div>
</template>

<script>
export default {
    name: 'tx-video-control-fast-forward',
    props:{
        preImg:{
            type:String,
            default:''
        },
        nextImg:{
            type:String,
            default:''
        }
    },
    data() {
        return {}
    },
    methods: {
        pre() {
            this.$emit('pre-fun')
        },
        next() {
            this.$emit('next-fun')
        },
    },
}
</script>

<style scoped>
.backward-box-img {
    cursor: pointer;
    width: 20px;
    height: 20px;
}
.forward-box-img {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-left: 24px;
}
</style>
