// pages/mynote/mynote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null, //用户id
    id: '', //产品id
    notes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {

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
    const that = this;
    var userInfo = wx.getStorageSync('userInfo')
    var userId = wx.getStorageSync('userid')

    if (userInfo) {
      that.setData({
        userId: userId
      })
      this.getNotes(); //获取笔记
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
  getNotes: function() {
    const that = this;

    wx.request({ //获取笔记
      url: 'https://fangzhi.zlogic.cn/api/main/getnote',
      method: 'post',
      data: {
        id: that.data.userId, //用户id
      },
      success(res) {
        that.setData({
          notes: res.data
        })
      }
    })
  },
  toCheckNote: function(e) { //查看笔记
    const that = this;
    const index = e.currentTarget.dataset.text;

    wx.redirectTo({
      url: '/pages/checknote/checknote?id=' + that.data.notes[index].id + '&userId=' + that.data.userId
    })
  },
  deleteNote: function(e) { //删除笔记
    const that = this
    wx.showModal({
      title: '删除笔记',
      content: '您确认要删除此笔记吗？',
      cancelText: '取消删除',
      cancelColor: '#333',
      confirmText: '删除',
      confirmColor: '#ccc',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.request({
            url: 'https://fangzhi.zlogic.cn/api/main/deletnote',
            data: {
              uid: that.data.userId,
              pid: that.data.notes[e.currentTarget.dataset.index].id
            },
            success(res) {
              console.log(that.data)
            }
          })

          wx.showToast({
            title: '删除成功'
          })

          setTimeout(function() {
            that.getNotes();
          }, 1000)
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