// pages/set/setSecond.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    id:null,
    setSecond: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    const that = this;

    that.setData({
      id:e.id,
      name: e.name
    })

    wx.setNavigationBarTitle({
      title: that.data.name,
    })
    wx.request({
      url: 'https://fangzhi.zlogic.cn/api/main/getSecondclothes',
      method:'POST',
      data:{
        id:that.data.id
      },
      success(res){
        that.setData({
          setSecond:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})