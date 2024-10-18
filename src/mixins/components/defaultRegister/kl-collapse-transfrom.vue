<!-- 高级搜索的 折叠面板 会占高度 -->
<template>
  <div :class="['d-c',value?'s-1':'s-0']">
        <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CollapseBread',
  components: {},
  filters: {},
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  watch:{
    value(){
        this.collapse = this.value
    }
  },
  data() {
    return {
      collapse: this.value
    }
  }
}
</script>

<style scoped>
.d-c{
  transform-origin: center top;
  transition: all 0.3s;
}
.s-1{
  transform: scaleY(1);
}
.s-0{
  transform: scaleY(0);
}
</style>

