
//获取应用实例
var amapFile = require('../../libs/amap-wx.js');
var app = getApp()
Page({
  data: {
    motto: '欢迎开启小程序之旅',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../image/image'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    var myAmapFun = new amapFile.AMapWX({ key: '2616bc22783d83c9354880320d0af8a2' });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        console.log(data)
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    });
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
