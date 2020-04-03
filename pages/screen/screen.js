// pages/screen/screen.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: null, //系列分类
    name: '',
    showTexture: false, //成分
    showLining: false, //面料组织
    showColor: false, //颜色
    texture: [{
        id: 1,
        value: '100%棉'
      },
      {
        id: 2,
        value: '棉弹'
      },
      {
        id: 3,
        value: 'T400莱卡弹力'
      },
      {
        id: 4,
        value: '双芯弹力'
      },
      {
        id: 5,
        value: '三芯弹力'
      },
      {
        id: 6,
        value: '棉'
      },
      {
        id: 7,
        value: '化纤'
      },
      {
        id: 8,
        value: '混纺'
      },
      {
        id: 9,
        value: '混纺弹力'
      },
      {
        id: 10,
        value: '天丝'
      },
      {
        id: 11,
        value: '莫代尔'
      },
      {
        id: 12,
        value: '粘胶'
      },
      {
        id: 13,
        value: '纤维素纤維混纺'
      },
      {
        id: 14,
        value: '麻'
      },
      {
        id: 15,
        value: '大麻'
      },
      {
        id: 16,
        value: '木棉'
      },
      {
        id: 17,
        value: '功能性纤维'
      },
      {
        id: 18,
        value: '功能性纤维'
      },
      {
        id: 19,
        value: '再生纤维'
      },
      {
        id: 20,
        value: '再生天然纤维'
      }
    ], //成分
    lining: [{
        id: 1,
        value: '3/1 斜纹'
      },
      {
        id: 2,
        value: '平纹'
      },
      {
        id: 3,
        value: '帆布'
      },
      {
        id: 4,
        value: '缎纹'
      },
      {
        id: 5,
        value: '人字斜'
      },
      {
        id: 6,
        value: '左斜'
      },
      {
        id: 7,
        value: '破卡'
      },
      {
        id: 8,
        value: '条卡'
      },
      {
        id: 9,
        value: '条子'
      },
      {
        id: 10,
        value: '格子'
      },
      {
        id: 11,
        value: '牛津布'
      },
      {
        id: 12,
        value: '青年布'
      },
      {
        id: 13,
        value: '仿针织'
      },
      {
        id: 14,
        value: '提花'
      },
      {
        id: 15,
        value: '特殊织法'
      },
      {
        id: 16,
        value: '红边布'
      }
    ], //面料组织
    color: [{
        id: 1,
        value: '白'
      },
      {
        id: 2,
        value: '黑'
      },
      {
        id: 3,
        value: '蓝'
      },
      {
        id: 4,
        value: '兰'
      },
      {
        id: 5,
        value: '灰'
      },
      {
        id: 6,
        value: '青'
      }
    ], //颜色
    products: [], //筛选结果
    spel: [], //成分被选中选项
    spel2: [], //面料组织被选中选项
    spel3: [] //颜色被选中选项
    // arr: [],
    // spel: [],
    // checkeds: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    const that = this;

    that.setData({
      id: e.id,
      name: e.name
    })

    // wx.request({ //获取筛选条件
    //   url: 'https://fangzhi.zlogic.cn/api/screen/choice',
    //   success(res) {
    //     for (var i = 0; i < res.data; i++) {
    //       that.data.checkeds[index] = false
    //       that.data.spel[index] = []
    //     }

    //     that.setData({
    //       arr: res.data,
    //       spel: that.data.spel
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // checkboxChange: function(e) {
  //   const index = e.currentTarget.dataset.index

  //   this.data.spel[index] = e.detail.value
  //   this.setData({
  //     spel: this.data.spel
  //   })
  // },
  // showCondition: function(e) {
  //   const index = e.currentTarget.dataset.index
  //   this.data.checkeds[index] = !this.data.checkeds[index]

  //   this.setData({
  //     checkeds: this.data.checkeds
  //   })
  // },
  checkboxChange(e) {
    const value = e.detail.value
    console.log(value)
    this.setData({
      spel: value
    })
  },
  checkboxChange2(e) {
    const value = e.detail.value
    console.log(value)
    this.setData({
      spel2: value
    })
  },
  checkboxChange3(e) {
    const value = e.detail.value
    console.log(value)
    this.setData({
      spel3: value
    })
  },
  showTexture: function() { //成分
    this.setData({
      showTexture: !this.data.showTexture
    })
  },
  showLining: function() { //面料组织
    this.setData({
      showLining: !this.data.showLining
    })
  },
  showColor: function() { //颜色
    this.setData({
      showColor: !this.data.showColor
    })
  },
  screen: function() { //筛选
    const that = this

    // if (!this.data.spel.some(item => {
    //     if (item && item.length > 0) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   })) {
    //   return wx.showToast({
    //     title: '请选择一个规格',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    // console.log(that.data.spel)

    // var datastr = ''
    // var color = that.data.spel[0]
    // if (color) {
    //   color = that.data.spel[0].join(',')
    //   datastr = color + ','
    // }

    // var chengfen = that.data.spel[1]
    // if (chengfen) {
    //   chengfen = that.data.spel[1].join(',')
    //   datastr += chengfen + ','
    // }

    // var zuzhi = that.data.spel[2]
    // if (zuzhi) {
    //   zuzhi = that.data.spel[2].join(',')
    //   datastr += zuzhi
    // }

    var datastr = ''
    if (this.data.spel.length > 0) {
      datastr += ',' + this.data.spel.join(',')
    }
    if (this.data.spel2.length > 0) {
      datastr += ',' + this.data.spel2.join(',')
    }
    if (this.data.spel3.length > 0) {
      datastr += ',' + this.data.spel3.join(',')
    }

    if (!datastr) {
      return wx.showToast({
        title: '请选择一个规格',
        icon: 'none'
      })
    }

    wx.request({
      url: 'https://fangzhi.zlogic.cn/api/screen/index',
      method: 'POST',
      data: {
        datastr
        // id: that.data.id
      },
      success(res) {
        that.setData({
          products: res.data
        })
        wx.setStorageSync('products', res.data)
        wx.showToast({
          title: '已筛选',
          duration: 1000
        })
        wx.redirectTo({
          url: '/pages/set/set?type=search&id=' + that.data.id + '&name=' + that.data.name
        })
      }
    })
  },
  resetScreen: function() { //重置筛选
    this.setData({
      spel: [], //成分被选中选项
      spel2: [], //面料组织被选中选项
      spel3: [] //颜色被选中选项
    })

    wx.showToast({
      title: '已重置筛选',
      icon: 'none',
      duration: 1000
    })
  }
})