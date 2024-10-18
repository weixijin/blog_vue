<template>
  <div v-show="isShow" class='p-f bg-fff h-45 w-vw-100 flex-wrap flex-center-wrap flex-justify-between user-center-header'>
    <div class="flex-wrap flex-center-wrap">
      <i class="el-icon-arrow-left f-20 c-333 f-550"></i>
      <img class="h-20 w-20 b-r-50 m-l-5" :src="userInfoAll.user_info.header_img">
      <span class="m-l-10 f-16 c-555 f-500">
        {{userInfoAll.user_info.username}}
      </span>
    </div>

    <div class="flex-wrap flex-center-wrap">
       <p class="user-guan f-10 c-555">
        关注
       </p>
       <i class="el-icon-set-up f-550 f-22 c-555 m-l-10"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfoAll: {
      type: Object,
      default: () => {
        user_info
      }
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.user-center-header{
  top: 0;
  left: 0;
  padding: 0 15px;
  z-index: 100;
}
.user-guan{
  height: 22px;
  line-height: 22px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}
</style>
