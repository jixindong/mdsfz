// pages/checknote/checknote.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',//用户id
    id:'',//产品id
    imgUrl: '', //图片
    name: '', //商品名称
    size: '', //商品型号
    intro: '', //商品简介
    note: '', //笔记内容
    base_url: app.globalData.base_url
    // tagNames: ['时尚', '休闲'] //标签
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    const that = this;
    
    that.setData({
      userId:e.userId,
      id:e.id
    })
    that.getNotes();
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
  getNote: function(e) { //从input获取笔记内容
    this.setData({
      note: e.detail.value
    })
    console.log('笔记内容为', this.data.note)
  },
  getNotes:function(){//从后台获取笔记
    const that = this;

    wx.request({
      url: 'https://fangzhi.zlogic.cn/api/main/seenote',
      method:'post',
      data:{
        id:that.data.userId,
        pid:that.data.id
      },
      success(res){
        var imgs = res.data[0].path.split(",");

        that.setData({
          imgUrl: imgs[0], //图片
          name: res.data[0].name, //商品名称
          size: res.data[0].size, //商品型号
          intro: res.data[0].detail, //商品简介
          note: res.data[0].remarks, //笔记内容
        })
      }
    })
  },
  edit: function() { //编辑按钮
    const that = this;

    if (this.data.note != '') {
      wx.request({
        url: 'https://fangzhi.zlogic.cn/api/main/updatenote',
        method:'post',
        data:{
          uid:that.data.userId,
          pid:that.data.id,
          remarks: that.data.note
        }
      })

      wx.showToast({
        title: '编辑成功'
      })
    } else {
      wx.showToast({
        title: '笔记不能为空',
        icon: 'none'
      })
    }
  },
  clear: function() { //清空按钮
    let that = this;

    wx.showModal({
      title: '清空笔记',
      content: '确认要清空笔记内容吗？',
      cancelText: '点错啦',
      cancelColor: '#333',
      confirmText: '清空笔记',
      confirmColor: '#ccc',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          that.setData({
            note: ''
          })
          wx.showToast({
            title: '已清空'
          })
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