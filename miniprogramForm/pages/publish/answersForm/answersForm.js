const app = getApp();
const db = wx.cloud.database();
const form_lists = db.collection('developerForms');
const userAnswers = db.collection('answerLists');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {
    this.getData();
  },

  onShow: function () {

  },

  
  onPullDownRefresh: function () {

  },
  getData:function(){
    // form_lists.get().then(res=>{
    //   console.log(res)
    //   this.setData({
    //     forms:res.data
    //   })
    // });
    var that = this;
    form_lists.where({
      _openid:app.globalData.openId
    }).get({
      success:res=>{
        that.setData({
          forms:res.data
        })
      }
    });
  },

})