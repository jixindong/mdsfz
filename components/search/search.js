// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      var value = e.detail.value
      this.triggerEvent('change', {value},{})
    },
    search() {
      this.triggerEvent('search')
    }
  }
})
