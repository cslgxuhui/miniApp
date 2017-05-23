//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tempFilePaths:'',
    width:'',
    height:'',
    name:'',
    address:'',
    model:'',
    pixelRatio:'',
    screenWidth:'',
    screenHeight:'',
    windowWidth:'',
    windowHeight:'',
    version:'',
    system:'',
    platform:'',
    SDKVersion:'',
    networkType:'',
    AccelerometerX:'',
    AccelerometerY:'',
    AccelerometerZ:''
  },
  onReady:function() {
    const that = this;
    wx.startAccelerometer()  //开始监听加速度数据
    wx.onAccelerometerChange(function (res) {
      that.setData({
        AccelerometerX : res.x,
        AccelerometerY : res.y,
        AccelerometerZ : res.z
      })
    });

  },
  onShareAppMessage: function () {
    return {
      title: '来自天堂的礼物',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  
  //事件处理函数
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
       
        console.log(tempFilePaths)
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            that.setData({
              width: res.width,
              height: res.height,
              tempFilePaths: tempFilePaths
            })
          }
        })
      }
    })
  },
  getLocation:function() {
    var that = this
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var name = res.name
        var address = res.address
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28,
          name:name,
          address:address
        })
        that.setData({
          name:name,
          address:address
        })
      }
    })
  },
  getSystemInfo:function() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          model: res.model,
          pixelRatio:res.pixelRatio,
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          version: res.version,
          system: res.system,
          platform: res.platform,
          SDKVersion: res.SDKVersion
        })
      }
    })
  },
  shortVibrate:function() {
    wx.vibrateShort()
  },
  longVibrate:function() {
    wx.vibrateLong()
  },
  scanCode:function() {
    wx.scanCode({
      onlyFromCamera: true, // 只允许从相机扫码
      success: (res) => {
        console.log(res)
      }
    })
  },
  callPhone:function() {
    wx.makePhoneCall({
      phoneNumber: '13265821397' //电话号码
    })
  },
  getNetwork:function() {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        that.setData({
          networkType: res.networkType
        })
        wx.showToast({
          title: res.networkType ,
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
  
})
