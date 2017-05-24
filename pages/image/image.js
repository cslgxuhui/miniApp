//index.js
//获取应用实例
var app = getApp();
var navList = [
  { id: "origin", title:"原生API" },
  { id: "list", title: "精华" },
  { id: "share", title: "分享" },
  { id: "ask", title: "问答" },
  { id: "job", title: "招聘" }
];
Page({
  data: {
    navList:navList,
    tempFilePaths:'',
    postsList: [],
    hidden:true,
    activeIndex:0,
    tab:'origin',
    page:1,
    limit:20,

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
  },

  onTapTag:function(e){
    var that = this;
    var tab = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    that.setData({
      activeIndex: index,
      tab: tab,
      page: 1
    });
    if (tab !== 'origin') {
      that.getData({ tab: tab });
    } else {
      that.getData();
    }
  },
  getData:function() {
    var that = this;
    var page = that.data.page;
    var tab = that.data.tab;
    var limit = that.data.limit;
    var url = 'https://1.happyyong.applinzi.com/data/' + tab+'.json'
    that.setData({ hidden: false });
    wx.request({
      url:url,
      data:{
        tab,
        page,
        limit
      },
      success: function (res) {
        console.log(res.data.data.account);
        that.setData({
          postsList: res.data.data.account
        })
      }
    })
    // if (page == 1) {
    //   that.setData({ postsList: [] });
    // }
    setTimeout(function () {
      that.setData({ hidden: true });
    }, 300);
  },
  lower: function () {
    console.log('滑动底部加载', new Date());
    var that = this;
    that.setData({
      page: that.data.page + 1
    });
    if (that.data.tab !== 'origin') {
      this.getData({ tab: that.data.tab, page: that.data.page });
    } else {
      this.getData({ page: that.data.page });
    }
  }
})
