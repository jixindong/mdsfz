var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: null,
    uesrInfo: {},
    collect: [],
    base_url: app.globalData.base_url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    var userInfo = wx.getStorageSync('userInfo')
    var userid = wx.getStorageSync('userid')
    if (userInfo) {
      that.setData({
        userInfo,
        userid
      })
      that.getCollect();
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '/pages/user/user',
        })
      }, 1500)
    }
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
  getCollect: function() {
    const that = this;
    wx.request({
      url: 'https://fangzhi.zlogic.cn/api/main/seemyCollection',
      method: 'post',
      data: {
        userid: that.data.userid
      },
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].path) {
            res.data[i].path = res.data[i].path.split(',')
            for (let j = 0; j < res.data[i].path.length; j++) {
              res.data[i].cover = res.data[i].path[0]
            }
          }
        }

        that.setData({
          collect: res.data
        })
      }
    })
  },
  cancelColletc: function(e) {
    var index = e.currentTarget.dataset.index
    var id = this.data.collect[index].id

    const that = this;
    wx.showModal({
      title: '取消收藏',
      content: '您确定要取消收藏吗？',
      cancelText: '点错啦',
      cancelColor: '#333',
      confirmText: '取消收藏',
      confirmColor: '#eee',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://fangzhi.zlogic.cn/api/main/qxcollection',
            method: 'post',
            data: {
              id: that.data.userid,
              pid: id,
              code: 1
            }
          })

          wx.showToast({
            title: '取消收藏'
          })

          that.getCollect();
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.showToast({
            title: '操作已取消',
            icon: 'none'
          })
        }
      }
    })
  }
})