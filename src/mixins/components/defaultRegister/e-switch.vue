<template>
  <div class="pr" @click="change">
    <p :class="['pos-info', isActive ? 'allow' : 'limit']">
      {{ isActive ? `${successText}` : `${errorText}` }}
    </p>
    <el-switch
      v-model="value"
      :active-color="activeColor"
      :inactive-color="inactiveColor"
      :active-value="activeValue"
      :inactive-value="inactiveValue"
    ></el-switch>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String || Number || Boolean,
      default: false
    },
    "active-color": {
      type: String,
      default: "#13ce66"
    },
    "inactive-color": {
      type: String,
      default: "#ff4949"
    },
    "active-value": {
      type: String || Number || Boolean,
      default: "1"
    },
    "inactive-value": {
      type: String || Number || Boolean,
      default: "2"
    },
    successText: {
      type: String,
      default: "启用"
    },
    errorText: {
      type: String,
      default: "禁用"
    }
  },

  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.value === this.activeValue;
    }
  },
  methods: {
    change() {
      let val = "";
      if (this.value === this.activeValue) {
        val = this.inactiveValue;
      } else {
        val = this.activeValue;
      }
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-switch__core {
    width: 52px !important;
    height: 21px;
  }
}
.pr {
  position: relative;
}
.pos-info {
  cursor: pointer;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  padding-top: 2.5px;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  z-index: 100;
  transform: all 1s;
}
.limit {
  padding-left: 20px;
}
.allow {
  padding-left: 6px;
}
</style>
