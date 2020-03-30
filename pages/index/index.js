var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // trademark: [],//商标
    index: 1, //导航栏
    bannerBoxFirst: [], //最新系列
    bannerBox: [], //男装女装童装
    base_url: app.globalData.base_url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    const that = this;

    this.setData({ //导航栏
      index: e.index
    })

    // wx.request({//商标
    //   url: 'https://fangzhi.zlogic.cn/api/banner/imgList',
    //   success(res){
    //     that.setData({
    //       trademark:res.data
    //     })
    //   }
    // })
    wx.request({ //最新系列
      url: 'https://fangzhi.zlogic.cn/api/banner/Mostimg',
      success(res) {
        var banner = res.data.path.split(",");
        res.data.path = banner;
        that.setData({
          bannerBoxFirst: res.data
        })
      }
    })

    wx.request({ //男装女装童装
      url: 'https://fangzhi.zlogic.cn/api/main/getFristlevel',
      success: function(res) {
        var list = res.data
        for (var i = 0; i < list.length; i++) {
          if (list[i]) {
            list[i].banners = list[i].banner.split(',')
            for (var j = 0; j < list[i].banners.length; j++) {
              list[i].banners[j] = that.data.base_url + list[i].banners[j]
            }
          }
        }
        that.setData({
          bannerBox: list
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
    const pages = getCurrentPages(); //获取当前页面栈
    console.log(pages);
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