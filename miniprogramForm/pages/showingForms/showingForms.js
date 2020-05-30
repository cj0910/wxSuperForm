// miniprogramForm/pages/showingForms/showingForms.js
var util = require('../../utils/util.js');
const app = getApp();

const db = wx.cloud.database();
const _ = db.command;
const form_lists = db.collection("developerForms");
const userForms = db.collection("userForms");
const answerLists = db.collection("answerLists");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form_id:''
  },
 
  // formSubmit:function(event){
  //   console.log("form发生了sumbit事件，携带的数据为：",event);
  //   //获取当前的时间
  //   var time = util.formatTime(new Date());
  //   userForms.add({
  //     data:{
  //       submitTime:time,
  //       form_id:this.data.form_id,
  //       SubmitContent:event.detail.value,
  //     }
  //   }).then(res=>{
  //     wx.showToast({
  //       title: 'Success',
  //       icon:'success'
  //     });
  //     wx.navigateTo({
  //       url: '../userSuccessSubmit/userSuccessSubmit',
  //     });
  //   });

  //   //更新答卷数量至developerForms
  //   form_lists.doc(this.data.form_id).update({
  //     data:{
  //       formAnswers:_.inc(1)
  //     }
  //   })
  // },

  formSubmit:function(event){
    console.log("form发生了sumbit事件，携带的数据为：",event);
    //获取当前的时间
    var time = util.formatTime(new Date());
    //添加到用户已经填写的列表展示
    userForms.add({
      data:{
        submitTime:time,
        form_id:this.data.form_id,
        SubmitContent:event.detail.value,
      }
    }).then(res=>{
      wx.showToast({
        title: 'Success',
        icon:'success'
      });
      wx.navigateTo({
        url: '../userSuccessSubmit/userSuccessSubmit',
      });
    });
    //添加到用户答卷表单统计列表
    answerLists.add({
      data:{
        submitTime:time,
        form_id:this.data.form_id,
        SubmitContent:event.detail.value,
      }
    }).then(res=>{});

    //更新答卷数量至developerForms
    form_lists.doc(this.data.form_id).update({
      data:{
        formAnswers:_.inc(1)
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("option",options);
    this.setData({
      form_id:options.id
    })
    form_lists.doc(options.id).get().then(res=>{
      console.log(res);
      this.setData({
        form_list:res.data
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

  }
})