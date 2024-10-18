<template>
  <div class="kl-progress-cover-1">
    <div class="kl-progress">
      <div class="progress-num" :style="{ width: width }"></div>
    </div>
    <span>{{ Math.floor(value) }}%</span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    width() {
      return this.value + '%'
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.kl-progress-cover-1 {
  cursor: pointer;
  margin-top: 5px;
  padding: 0 10px;
  display: flex;
  height: 6px;
  line-height: 6px;
}
.kl-progress {
  background-color: #ddd;
  height: 6px;
  border-radius: 3px;
  flex: 1;
  .progress-num {
    border-radius: 3px;
    height: 6px;
    background-color: #409eff;
    margin-right: 10px;
  }
  span {
    min-width: 30px;
    display: block;
    white-space: nowrap;
  }
}
</style>
