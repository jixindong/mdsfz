// pages/order/order.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 2,
    imgs: [],
    phoneNumber: '0757-87273338',
    base_url: app.globalData.base_url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    const that = this;

    that.setData({ //导航栏
      index: e.index
    })

    // wx.request({
    //   url: 'https://fangzhi.zlogic.cn/api/main/getLunbo',
    //   success(res) {
    //     that.setData({
    //       imgs: res.data.imgfile.split(",")
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
  toCall: function() { //联系电话
    let that = this;

    wx.showModal({
      title: '联系电话',
      content: '0757-87273338',
      cancelText: '仅复制',
      cancelColor: '#333',
      confirmText: '拨打电话',
      confirmColor: '#ccc',

      success(res) {
        if (res.confirm) {
          console.log('拨打电话')
          wx.makePhoneCall({
            phoneNumber: that.data.phoneNumber
          })
        } else if (res.cancel) {
          console.log('仅复制')
          wx.setClipboardData({
            data: that.data.phoneNumber
          })
        }
      }
    })
  }
})