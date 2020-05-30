// pages/home/home.js
var app = getApp();
Page({

  data: {

  },

  onLoad: function (options) {
    console.log("home页面输出的openid:"+app.globalData.openId)
  },
  directionTap:function(event){
    wx.navigateTo({
      url: 'direction-form/direction-form',
    })
  },
  studentInfoTap:function(event){
    wx.navigateTo({
      url: 'studentInfo-form/studentInfo-form',
    })
  },
  activityTap:function(event){
    wx.navigateTo({
      url: 'activity-form/activity-form',
    })
  },
  questionnaireTap:function(event){
    wx.navigateTo({
      url: 'questionnaire-form/questionnaire-form',
    })
  },
  newFormTap:function(event){
    wx.navigateTo({
      url: 'newBlank-form/newBlank-form',
    })
  },
  onShareAppMessage:function(){

  }
})