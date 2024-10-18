<template>
  <el-select
    v-model="selectArr"
    v-bind="$attrs"
    v-on="$listeners"
    popper-class="select-all-popper-style"
    @change="handleChange"
  >
    <div class="option-leyer">
      <el-checkbox v-model="changeAll">
        全选
      </el-checkbox>
      <span class="reverse-style" @click="selectReverse">反选</span>
    </div>
    <el-option
      v-for="op in options"
      :key="op[valueKey]"
      :label="op[labelKey]"
      :value="op[valueKey]"
    >
      <el-tooltip
        v-if="tooltip"
        effect="dark"
        :content="op[labelKey]"
        placement="right"
      >
        <span class="memo_item">
          {{ op[labelKey] }}
        </span>
      </el-tooltip>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SelectAll',
  model: {
    prop: 'initValue',
    event: 'changeFn' // 避免和select的change事件重名
  },
  props: {
    // 初始数据
    initValue: {
      type: Array,
      default: () => []
    },
    // 下拉选项数据
    options: {
      type: Array,
      default: () => []
    },
    // value 展示key
    valueKey: {
      type: String,
      default: 'value'
    },
    // lable 展示key
    labelKey: {
      type: String,
      default: 'label'
    },
    // 是否展示tooltip
    tooltip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectArr: []
    }
  },
  computed: {
    // 是否全选
    changeAll: {
      get() {
        return this.selectArr.length === this.options.length
      },
      set(val) {
        // 全选
        if (val) {
          this.selectArr = this.options.map((item) => item[this.valueKey])
        } else {
          // 取消全选
          this.selectArr = []
        }
        this.emitChange()
      }
    }
  },
  watch: {
    initValue: {
      immediate: true,
      handler(newValue) {
        this.selectArr = JSON.parse(JSON.stringify(newValue))
        this.emitSelectOptions()
      }
    }
  },
  methods: {
    handleChange() {
      this.emitChange()
    },
    // 反选
    selectReverse() {
      const map = {}
      let newArr = []
      const { valueKey, options } = this
      // 全都都已经选中
      if (options.length === this.selectArr.length) {
        newArr = []
      } else if (!this.selectArr.length) {
        // 未选中
        newArr = options.map((item) => item[valueKey])
      } else {
        this.selectArr.forEach((v) => {
          map[v] = 1
        })
        options.forEach((v) => {
          const _val = v[valueKey]
          !map[_val] && newArr.push(_val)
        })
      }
      this.selectArr = newArr
      this.emitChange()
    },
    emitChange() {
      this.emitSelectOptions()
      this.$emit('changeFn', this.selectArr)
    },
    emitSelectOptions() {
      this.$emit('update:selectOptions', this.filterData())
    },
    filterData() {
      const map = {}
      const res = []
      this.selectArr.forEach((item) => (map[item] = 1))
      this.options.forEach((op) => {
        if (map[op[this.valueKey]]) {
          res.push(op)
        }
      })
      return res
    }
  }
}
</script>
<style lang="scss">
.select-all-popper-style {
  .el-select-dropdown__list {
    padding-top: 41px;
  }
  .option-leyer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 9;
  }
}
</style>
<style lang="scss" scoped>
.memo_item {
  max-width: 300px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.option-leyer {
  padding: 8px 30px 12px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  border-bottom: 1px solid #f0f0f1;
  .reverse-style {
    line-height: 19px;
    font-size: 14px;
    color: #606266;
    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
