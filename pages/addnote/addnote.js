// pages/addnote/addnote.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '', //用户信息
    userId: '', //用户id
    id: '', //产品id
    imgUrl: '', //图片
    name: '', //商品名称
    size: '', //商品型号
    intro: '', //商品简介
    note: '', //笔记内容
    fileList: [], //上传文件
    base_url: app.globalData.base_url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    const that = this;
    const userInfo = wx.getStorageSync('userInfo');

    if (userInfo) {
      that.setData({
        userInfo: userInfo,
        userId: e.userId,
        id: e.id
      })

      wx.request({
        url: 'https://fangzhi.zlogic.cn/api/main/getthreelevel',
        method: 'post',
        data: {
          id: that.data.id
        },
        success(res) {
          var img = res.data.path.split(",")
          that.setData({
            imgUrl: res.data.path = img[0], //产品图片
            name: res.data.name, //产品名称
            intro: res.data.detail, //产品简介
            size: res.data.huohao //产品货号
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000,
        complete() {
          wx.navigateTo({
            url: '/pages/user/user',
          })
        }
      })
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
  getNote: function(e) { //获取笔记内容
    this.setData({
      note: e.detail.value
    })
    console.log('笔记内容为', this.data.note)
  },
  addNote: function() { //添加笔记
    const that = this;

    if (this.data.note == '') {
      wx.showToast({
        title: '笔记不能为空',
        icon: 'none'
      })
    } else {
      wx.request({ //添加笔记
        url: 'https://fangzhi.zlogic.cn/api/main/addnote',
        method: 'post',
        data: {
          id: that.data.userId, //用户id
          pid: that.data.id, //产品id
          remarks: that.data.note //笔记内容
        },
        success(res) {
          if (res.data.code == 500) {
            wx.showToast({
              title: '同商品只能添加一条笔记',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '添加成功'
            })
          }
        }
      })
    }
  }
})