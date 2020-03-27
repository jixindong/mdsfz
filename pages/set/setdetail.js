// pages/set/setdetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null, //导航栏
    id: null, //分类
    name: '', //分类名称
    bannerImg: '', //banner图片
    product: [],//产品列表
    base_url: app.globalData.base_url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    const that = this;
    this.setData({
      index: e.index, //导航栏
      id:e.id, //分类
      name:e.name, //分类名称
      bannerImg: e.banner //banner图片
    })

    wx.request({
      url: 'https://fangzhi.zlogic.cn/api/main/getsecond',
      method: "post",
      data: {
        id: that.data.id //服务器根据此id返回对应数据
      },
      success: function (res) {
        for (let i = 0; i < res.data.length; i++) { //筛选商品的第一个图片地址
          let a = res.data[i].path;
          let b = a.split(",");
          res.data[i].path = b[0];
        }

        that.setData({
          product: res.data
        })
      }
    })

    wx.setNavigationBarTitle({ //设置页面标题
      title: that.data.name
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