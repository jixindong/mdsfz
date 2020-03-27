// pages/order/ordernow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0, //picker
    array: ['请选择', '先生', '女士'], //picker
    name: '', //姓名
    phoneNumber: '', //电话
    company: '', //公司
    message: '' //留言
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  bindPickerChange: function(e) { //picker
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  getName: function(e) { //获取姓名
    this.setData({
      name: e.detail.value
    })
    console.log('姓名为', this.data.name)
  },
  getPhoneNumber: function(e) { //获取电话
    this.setData({
      phoneNumber: e.detail.value
    })
    console.log('电话为', this.data.phoneNumber)
  },
  getCompany: function(e) { //获取公司
    this.setData({
      company: e.detail.value
    })
    console.log('公司为', this.data.company)
  },
  getMessage: function(e) { //获取留言
    this.setData({
      message: e.detail.value
    })
    console.log('留言为', this.data.message)
  },
  subOrder: function() { //提交按钮
    let that = this;

    if (this.data.name == '' || this.data.phoneNumber == '') {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    } else {
      wx.request({
        url: 'https://fangzhi.zlogic.cn/api/main/appoin',
        method: "post",
        data: {
          name: that.data.name,
          phone: that.data.phoneNumber,
          gongsi: that.data.company,
          remarks: that.data.message
        },
        success: function(res) {
          console.log(res)
          if (res.data.code == "200") {
            wx.showToast({
              title: '提交成功'
            })
          }
        }
      })
    }
  }
})