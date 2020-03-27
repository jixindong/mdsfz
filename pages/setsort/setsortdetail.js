// pages/setsort/setsortdetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,//最新系列分类
    sortSecondId:null,
    productId:null,
    sortName: '',
    banners:[],
    product:[],
    base_url: app.globalData.base_url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    const that = this;

    that.setData({
      id: e.id,//最新系列分类
      sortName: e.sortName,
      sortSecondId: e.sortSecondId,
      productId: e.productId,
      index: e.index,
    })

    wx.setNavigationBarTitle({
      title: that.data.sortName
    })

    wx.request({//获取banner
      url: 'https://fangzhi.zlogic.cn/api/getnew/imgs',
      method: 'POST',
      data: {
        id: that.data.sortSecondId
      },
      success(res){
        console.log(res)
        that.setData({
          banners: res.data.img
        })
      }
    })
    wx.request({//获取产品
      url: 'https://fangzhi.zlogic.cn/api/getnew/getGoods',
      method:'POST',
      data:{
        id: that.data.productId
      },
      success(res){
        for(let i=0;i<res.data.length;i++){
          var path = res.data[i].path
          var arr = path.split(',')
          res.data[i].cover = arr[0]
        }
        that.setData({
          product:res.data
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