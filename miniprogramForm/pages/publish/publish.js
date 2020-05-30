const app = getApp();
const db = wx.cloud.database();
const form_lists = db.collection('developerForms');
const userAnswers = db.collection('userForms');
Page({
  data: {
    forms:null,
    isHide:false
  },
  onLoad:function(options){
    this.getData();
    this.getFormStatistics();
    var nickName = app.globalData.userInfo.nickName;
    this.setData({
      nickName:nickName
    })
  },
  onPullDownRefresh:function(){
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  // getData:function(){
  //   form_lists.get().then(res=>{
  //     console.log(res)
  //     this.setData({
  //       forms:res.data
  //     })
  //   })
  // },

  getData:function(){
    var that = this;
    form_lists.where({
      _openid:app.globalData.openId
    }).get({
      success:res=>{
        that.setData({
          forms:res.data
        })
      }
    })
  },

  getFormStatistics:function(){
    var that = this;
    db.collection('developerForms').where({
      _openid:app.globalData.openId
    }).count().then(res=>{
      console.log(res);
      that.setData({
        formNo:res.total
      })
    });
    db.collection('answerLists').where({
      _openid:app.globalData.openId
    }).count().then(res2=>{
      console.log(res2)
      that.setData({
        answerNo:res2.total
      })
    })
    setTimeout(this.onShow,6000);
  },
  /**
   * 用户点击分享
   */
  onShareUsers:function(event){
    
  },
  onShareAppMessage: function (res) {
    console.log(res)
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    if(res.from==='button'){
    }
    var formId=res.target.dataset.id;
    form_lists.doc(formId).get().then(res=>{
      console.log(res)
      that.setData({
        form_title:res.data.formTitle,
      })
      console.log(that.data.form_title);
   }) 
   var formTitle = this.data.form_title;
   console.log(formTitle);
   var nickName = app.globalData.userInfo.nickName;
   var title = nickName + '邀你填写表单' + '[ ' + formTitle + ' ]';
    return {
      title:title,
      path:'/pages/showingForms/showingForms?id='+formId,
      success:function(res){
        console.log("成功分享",res);
        console.log("该页面的formId:",formId)
      }
    }
  },
  onDeleteForm:function(event){
    console.log(event);
    var formId = event.target.dataset.id;
    wx.showModal({
      title:'提示',
      content:'确定删除该表单以及相关数据吗？',
      success(res){
        if(res.confirm){
          form_lists.doc(formId).remove().then(res=>{
            console.log(res);
            userAnswers.where({
              form_id:formId
            }).remove().then(res2=>{
              wx.showToast({
                title: '成功删除表单记录',
                icon:"none"
              });
            })
          });
          
        }else if(res.cancel){
          console.log("用户点击了取消")
        }
      }
    })
    
  },

  formNumber:function(){
    console.log("点击了表单个数")
    wx.navigateTo({
      url: 'answersForm/answersForm',
    });
  },
  formAnswers:function(){
    console.log("点击了答卷总数")
    wx.navigateTo({
      url: 'answersForm/answersForm',
    });
  }
})