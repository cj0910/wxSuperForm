//app.js
App({
  globalData: {
    userInfo: null, //用户信息
    openId:"", //登陆用户的唯一标识
    appid:"wx92298dc3dfe14259",
    secret:"0e797a7232ce022a2dea697ca1dd273e",
    currentTab:0
  },
  
  // onLaunch: function () {
  //   //使用云端功能
  //   if(!wx.cloud){
  //     console.error("请使用 2.2.3 或以上的基础库以使用云能力");
  //   }else{
  //     wx.cloud.init({
  //       traceUser:true,
  //     })
  //   }
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
  //     }
  //   })

  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  onLaunch: function () {
    
    //使用云端功能
    if(!wx.cloud){
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    }else{
      wx.cloud.init({
        traceUser:true,
      })
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 授权登录
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.cloud.callFunction({
          name:'login',
          data:{},
          success:res=>{
            console.log('[云函数] [login] user openid: ', res.result.openid);
            that.globalData.openId = res.result.openid;
            console.log(that.globalData.openId)
            
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
})

// onLoad: function (options){
  //    //调用云函数
  //    wx.cloud.callFunction({
  //     name:'login',
  //     data:{},
  //     success:res=>{
  //       console.log('[云函数] [login] user openid: ', res.result.openid);
  //       this.globalData.openId = res.result.openid;
  //     },
  //     fail:err=>{
  //       console.log('[云函数] [login] 调用失败', err);
        
  //     }
  //   })
  // },

/**
* 生命周期函数--监听页面加载
// */
// onLoad: function (options) {
//   let that=this
//   let myDate = new Date();
//   that.setData({
//   entranceId: options.entranceId,
//   date: myDate.getFullYear() + '-0' + (myDate.getMonth()+1) + '-' + myDate.getDate() //获取当前日期
//   })
//   that.getNumList()
//   that.getUserInfoList()
//   },


  // onGetOpenid:function(){
  //   //调用云函数
  //   wx.cloud.callFunction({
  //     name:'login',
  //     data:{},
  //     success:res=>{
  //       console.log('[云函数] [login] user openid: ', res.result.openid);
  //       app.globalData.openid = res.result.openid;
  //     },
  //     fail:err=>{
  //       console.log('[云函数] [login] 调用失败', err);
        
  //     }
  //   })
  // }