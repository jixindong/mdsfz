// pages/detail/detail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: null, //系列分类
    relativeProducts: [], //相关产品
    userId: '', //用户id
    id: '', //产品id
    name: '', //产品名称
    detail: '', //产品描述
    metarial: [], //产品材质
    productImg: [], //产品图片
    mldetail: [], //面料详情
    metarialImg: [], //产品材质图片
    chromatography: [], //水洗色谱
    priceTag: [], //特色标签
    dImg: '', //3D立体图
    isCollect: false, //是否被收藏
    shareBoxFlag: "none", //分享盒子
    shareFunctionFlag: "flex", //分享按钮盒子
    shareImgBoxFlag: "none", //生成分享图
    base_url: app.globalData.base_url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    const that = this;
    const userid = wx.getStorageSync('userid');
    const userInfo = wx.getStorageSync('userInfo');

    that.setData({
      pid: e.pid,
      userId: userid,
      id: e.id //产品id
    })

    wx.request({ //产品详情
      url: 'https://fangzhi.zlogic.cn/api/main/getthreelevel',
      method: 'post',
      data: {
        id: that.data.id //服务器根据此id返回对应数据
      },
      success(res) {
        console.log(res.data);

        if (res.data.detail) { //产品描述去除换行
          res.data.detail = res.data.detail.replace(/\n/g, '')
        }
        that.setData({
          name: res.data.name, //产品名称
          detail: res.data.detail, //产品描述
          price: res.data.price, //产品价格
          metarial: res.data.metarial, //产品材质
          productImg: res.data.path ? res.data.path.split(",") : '', //产品图片
          metarialImg: res.data.metarial_img ? res.data.metarial_img.split(",") : '', //产品材质图片
          color: res.data.color, //产品颜色
          size: res.data.huohao, //产品货号
          mldetail: res.data.mldetail, //面料详情
          chromatography: res.data.water, //水洗色谱
          priceTag: res.data.tags, //特色标签
          dImg: res.data.dimg //3D立体图
        })

        wx.setStorageSync('dImg', res.data.dimg) //放入缓存 3D立体图

        wx.setNavigationBarTitle({ //设置标题
          title: that.data.name
        })
      }
    });

    wx.request({ //产品浏览量（后台查看）
      url: 'https://fangzhi.zlogic.cn/api/goods/addLiulan',
      method: 'POST',
      data: {
        pid: that.data.id
      }
    })

    wx.request({ //相关产品
      url: 'https://fangzhi.zlogic.cn/api/screen/selectml',
      method: 'POST',
      data: {
        pid: that.data.id
      },
      success(res) {
        for (let i = 0; i < res.data.length; i++) { //筛选商品的第一个图片地址
          let a = res.data[i][0].path;
          if (a) {
            let b = a.split(",");
            res.data[i][0].cover = b[0]
          }
        }
        that.setData({
          relativeProducts: res.data
        })
      }
    })

    if (userInfo) {
      wx.request({ //产品是否被收藏
        url: 'https://fangzhi.zlogic.cn/api/main/checkcollection',
        method: 'post',
        data: {
          id: that.data.userId,
          pid: that.data.id
        },
        success(res) { //接收是否被收藏
          if (res.data.code != '') {
            that.setData({
              isCollect: true
            })
          } else if (res.data.code == '') {
            that.setData({
              isCollect: false
            })
          }
        }
      })
    }
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

  },
  shareBtn: function () { //分享按钮
    this.setData({
      shareBoxFlag: "block"
    })
  },
  shareMask: function () { //分享遮罩
    this.setData({
      shareBoxFlag: "none",
      shareFunctionFlag: "flex",
      shareImgBoxFlag: "none"
    })
  },
  shareCancel: function () { //分享取消
    this.setData({
      shareBoxFlag: "none"
    })

    wx.showToast({
      title: '取消分享',
      icon: 'none'
    })
  },
  toShareImg: function () { //生成分享图
    const that = this;

    wx.request({
      url: 'https://fangzhi.zlogic.cn/api/qrcode/getCode',
      method: 'POST',
      data: {
        id: that.data.id
      },
      success(result) {
        var context = wx.createCanvasContext('myCanvas')
        var info = wx.getSystemInfoSync()
        var remX = info.screenWidth / 375
        var remY = info.screenHeight / 812
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, info.screenWidth, info.screenHeight);
        context.drawImage('../../img/logo.png', 85 * remX, 5 * remY, 80, 60)
        context.setFillStyle
        wx.getImageInfo({
          src: that.data.base_url + that.data.productImg[0],
          success: function (res) {
            context.drawImage(res.path, 50 * remX, 80 * remY, 150, 180)
            context.setFillStyle('#000')
            context.setFontSize(12)
            context.fillText(that.data.name, 50 * remX, 330 * remY)
            context.fillText(that.data.detail, 50 * remX, 350 * remY)
            context.stroke()
            wx.getImageInfo({
              src: that.data.base_url + result.data.path,
              success: function (res) {
                context.drawImage(res.path, 90 * remX, 390 * remY, 70, 70)
                context.draw()
              }
            })
          }
        })
      }
    })

    that.setData({
      shareFunctionFlag: "none",
      shareImgBoxFlag: "flex"
    })
  },
  saveImg: function () { //保存图片
    const that = this;

    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        fileType: 'jpg',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              wx.showToast({
                title: '保存成功'
              })
            },
            fail() {
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            },
            complete() {
              that.setData({
                shareBoxFlag: "none",
                shareFunctionFlag: "flex",
                shareImgBoxFlag: "none"
              })
            }
          })
        }
      })
    }, 200)
  },
  metarialImg: function (e) { //查看面料
    const that = this;
    const index = e.currentTarget.dataset.index;
    const imgUrl = that.data.metarialImg;
    const urls = [];

    for (var i = 0; i < imgUrl.length; i++) {
      urls[i] = that.data.base_url + imgUrl[i]
    }
    wx.previewImage({
      urls: urls,
      current: urls[index],
    })
  },
  chromatography: function (e) { //查看水洗色谱
    const that = this;
    const index = e.currentTarget.dataset.index;
    const imgUrl = that.data.chromatography;
    const urls = [];

    console.log(index)

    for (var i = 0; i < imgUrl.length; i++) {
      urls[i] = that.data.base_url + imgUrl[i].path
    }

    wx.previewImage({
      urls: urls,
      current: urls[index],
    })
  },
  priceTag: function (e) { //查看系列特色标签
    const that = this;
    const index = e.currentTarget.dataset.index;
    const imgUrl = that.data.priceTag;
    const urls = [];

    for (var i = 0; i < imgUrl.length; i++) {
      urls[i] = that.data.base_url + imgUrl[i].path
    }

    wx.previewImage({
      urls: urls,
      current: urls[index]
    })
  },
  collect: function (e) { //收藏
    const that = this;
    const userInfo = wx.getStorageSync('userInfo');

    if (userInfo) {
      wx.request({
        url: 'https://fangzhi.zlogic.cn/api/main/addcollection',
        method: 'post',
        data: {
          id: that.data.userId,
          pid: that.data.id,
        }
      })

      this.setData({
        isCollect: !this.data.isCollect
      })
      wx.showToast({
        title: '收藏成功'
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000,
        complete() {
          wx.navigateTo({
            url: '/pages/user/user'
          })
        }
      })
    }
  },
  cancelCollect: function () { //取消收藏
    const that = this;

    wx.request({
      url: 'https://fangzhi.zlogic.cn/api/main/qxcollection',
      method: 'post',
      data: {
        id: that.data.userId,
        pid: that.data.id,
        code: 1
      }
    })

    that.setData({
      isCollect: !that.data.isCollect
    })
    wx.showToast({
      title: '取消收藏',
      icon: 'none'
    })
  }
})