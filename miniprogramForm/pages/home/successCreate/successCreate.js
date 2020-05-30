// miniprogramForm/pages/home/successCreate/successCreate.js
var app = getApp();
const db = wx.cloud.database();
const form_lists = db.collection("developerForms");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form_title:'',
    formId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("还有options：",options);
   this.setData({
    formId:options.formId
   })
   console.log(this.data.formId);
    form_lists.doc(options.formId).get().then(res=>{
      console.log(res)
      this.setData({
        form_title:res.data.formTitle,
      })
    }) 
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: true
    })

    if(res.from==='button'){
    }
   var formId=this.data.formId;
   var nickName = app.globalData.userInfo.nickName;
   var form_title = this.data.form_title;
   var title = nickName + '邀你填写表单' + '[ ' + form_title + ' ]';
    return {
      title:title,
      path:'/pages/showingForms/showingForms?id='+formId,
      success:function(res){
        console.log("成功分享",res);
        console.log("该页面的formId:",formId)
      }
    }
  },
  enterFormList:function(){
    wx.switchTab({
      url: '../../publish/publish',
    });
  },
  shareForm:function(event){
    // this.onShareAppMessage();
  }
})