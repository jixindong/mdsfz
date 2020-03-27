// pages/search/search.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null, //导航栏
    searchMsg: [], //搜索信息,
    searchname: '',
    base_url: app.globalData.base_url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    const that = this;
    that.setData({
      index: e.index
    })


  },

  onChange(e) {
    var value = e.detail.value
    this.setData({
      searchname : value
    })
  },

  onSearch() {
    var that = this

    wx.request({
      url: 'https://fangzhi.zlogic.cn/api/main/searchClothes',
      method: 'post',
      data: {
        searchname: this.data.searchname
      },
      success(res) {
        console.log(res)
        for(var i = 0; i < res.data.length; i++) {
          res.data[i].img = res.data[i].path.split(',')[0]
        }
        
        that.setData({
          searchMsg: res.data
        })
      }
    })
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

  }
})