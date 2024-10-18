<!-- /*
 *  回调函数名称 默认 pageLoadCallback
 *  回调类型 1.checkVal  选中值  2.pagLoading 加载
 **/ -->
<template>
  <div class="el-select-paging-loading">
    <el-select
      :disabled="disabled === false || disabled === undefined ? false : true"
      :value="value"
      :filterable="selectConfig.isfilter ? false : true"
      :remote="true"
      :clearable="selectConfig.clearable ? false : true"
      :multiple="selectConfig.isMuli ? true : false"
      :placeholder="selectConfig.placeholder"
      :remote-method="remoteMethod"
      :no-data-text="obj.loadingText"
      @change="changeValue"
      @focus="focusfn"
    >
      <!-- <div class='wcBox'> -->
      <div v-if="selectConfig.needSlot" ref="scrollTest" class="pagingLoad">
        <el-option
          v-for="(item, index) in obj.dataList"
          :key="index"
          :label="item[selectConfig.optionLabel]"
          :value="item[selectConfig.optionValue]"
        >
          <span style="float: left">
            {{ item[selectConfig.slotLabelObj.slotLeftLabel] }}
          </span>
          <span style="float: right; color: #8492a6; font-size: 13px">
            {{ item[selectConfig.slotLabelObj.slotRightLabel] }}
          </span>
        </el-option>
      </div>
      <div v-else ref="scrollTest" class="pagingLoad">
        <el-option
          v-for="(item, index) in obj.dataList"
          :key="index"
          :label="item[selectConfig.optionLabel]"
          :value="item[selectConfig.optionValue]"
        />
      </div>
      <!-- </div> -->
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'PagingSelectComp',
  props: [
    'selectConfig',
    'value',
    'selectText',
    'disabled',
    'searchValue',
    'parentId',
    'isNeedObj'
  ],
  data() {
    return {
      text: '',
      defaultPagingVal: 30,
      obj: {
        scrollFlag: true,
        isFetch: 1,
        pageNum: 1,
        totalPages: 0,
        pageSize: this.selectConfig.size || 50,
        parentId: this.parentId,
        dataList: [],
        loadingText: '加载中。。。',
        simpleName: ''
      }
    }
  },
  watch: {
    parentId(n, o) {
      if (!n) {
        this.obj.dataList = []
        this.obj.parentId = null
        this.$emit('selectText', '')
        this.$emit('input', '')
      } else {
        this.obj.dataList = []
        this.obj.parentId = n
        this.selectConfig.apiHandle(this.obj)
      }
    },
    // 新增判断是否需要返回选中的options{} , 目前只做单选
    value(n, o) {
      const s = []
      this.obj.dataList.map((item) => {
        if (this.selectConfig.isMuli) {
          if (n.indexOf(item[this.selectConfig.optionValue]) > -1) {
            s.push(item[this.selectConfig.optionLabel])
          }
        } else {
          if (item[this.selectConfig.optionValue] === n) {
            s.push(item[this.selectConfig.optionLabel])
            if (this.isNeedObj) {
              this.$emit('selectObj', item)
            }
          }
        }
      })
      this.$emit('selectText', s.join(','))
    }
  },
  mounted() {
    this.setSearchCondition()
    this.getSelectPagingData()
    // this.selectLi()
    this.scrollHandle()
  },
  methods: {
    getSelectPagingData() {
      this.selectConfig.apiHandle(this.obj)
    },
    changeValue(val) {
      const type = typeof this.value
      this.obj.simpleName = ''
      if (val === '') {
        this.obj.pageNum = 1
        this.obj.dataList = []
        this.$emit('selectText', '')
        type === 'number' ? this.$emit('input', null) : this.$emit('input', '')
        if (this.isNeedObj) {
          this.$emit('selectObj', {})
        }
        this.getSelectPagingData()
      } else {
        this.$emit('input', val)
      }
      this.$emit('changeValue', val)
    },
    remoteMethod(val) {
      this.obj.pageNum = 1
      this.obj.dataList = []
      this.obj.simpleName = val
      this.getSelectPagingData()
    },
    focusfn() {
      if (this.obj.loadingText === '无数据') {
        this.obj.loadingText = '加载中。。。'
        this.remoteMethod('')
      }
    },
    // 滚动加载
    scrollHandle() {
      const self = this
      const dov = this.$refs.scrollTest
      dov.parentNode.parentNode.addEventListener(
        'scroll',
        () => {
          if (self.obj.pageNum >= self.obj.totalPages) {
            return
          }
          // 判断祖级元素 class
          if (
            dov.parentNode.parentNode.parentNode.className !== 'el-scrollbar'
          ) {
            return false
          }
          const parentHeight = dov.offsetHeight // 本身的高度
          const ppH = dov.parentNode.parentNode.offsetHeight // 祖级元素 可视高度
          const sh = dov.parentNode.parentNode.scrollTop // 当前元素 距离头部的高度

          /*
           *
           * sh 距离 底部 小于等于50像素的情况下 开始请求 下一页数据
           * 150 为默认值  可配置
           **/
          if (
            sh >= parentHeight - ppH - self.defaultPagingVal &&
            self.obj.scrollFlag
          ) {
            self.obj.scrollFlag = false
            this.obj.pageNum++
            this.getSelectPagingData()
          }
        },
        true
      )
    },
    // removeTag (val) {
    //   let ind = this.value.indexOf(val)
    //   this.text.splice(ind, 1)
    //   this.$emit('selectText', this.text)
    // },
    // 对选择项进行选择时
    // selectLi () {
    //   let self = this
    //   let dov = this.$refs.scrollTest
    //   let val = []
    //   dov.parentNode.parentNode.addEventListener('click', (e) => {
    //     let target = e.target
    //     let nodeName = target.nodeName.toLowerCase()
    //     if (nodeName === 'span') {
    //       target = target.parentNode
    //     }
    //     if (self.selectConfig.isMuli) {
    //       if (target.getAttribute('class').split(' ').indexOf('selected') > -1) {
    //         let ind = val.indexOf(target.children[0].innerHTML)
    //         val.splice(ind, 1)
    //       } else {
    //         val.push(target.children[0].innerHTML)
    //       }
    //       if (val.length > 0) {
    //         self.text = val
    //         self.$emit('selectText', val.join(','))
    //       } else {
    //         self.text = []
    //         self.$emit('selectText', '')
    //       }
    //     } else {
    //       self.$emit('selectText', target.children[0].innerHTML)
    //     }
    //   }, true)
    // },
    // 初始查询条件
    setSearchCondition() {
      this.obj.simpleName = this.searchValue ? this.searchValue : ''
    }
  }
}
</script>
<style lang="scss" scoped>
.wcBox {
  height: 274px;
  overflow: hidden;
  .pagingLoad {
    overflow: scroll;
    height: 100%;
  }
}
</style>
