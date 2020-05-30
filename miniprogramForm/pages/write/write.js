const db = wx.cloud.database()
const form_lists = db.collection('userForms')
Page({
  data: {
    forms:null
  },

  onLoad:function(options){
    this.getData();
  },
  onPullDownRefresh:function(){
    wx.clearStorageSync();
    this.getData();
    wx.stopPullDownRefresh();
  },
  getData:function(){
    form_lists.get().then(res=>{
      console.log(res);
      this.setData({
        forms:res.data
      })
    })
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

    if(res.from==='button'){
    }
   var formId=res.target.dataset.id;
    return {
      title:'表单分享',
      path:'/pages/showingForms/showingForms?id='+formId,
      success:function(res){
        console.log("成功分享",res);
        console.log("该页面的formId:",formId)
      }
    }
  },
  onDeleteForm:function(event){
    console.log(event.target.dataset.id);
    var formId = event.target.dataset.id;
    wx.showModal({
      title:'提示',
      content:'确定删除该表单以及相关数据吗？',
      success(res){
        if(res.confirm){
          form_lists.doc(formId).remove().then(res=>{
            console.log(res);
            wx.showToast({
              title: '成功删除表单记录',
              icon:"none"
            });
          });
        }else if(res.cancel){
          console.log("用户点击了取消")
        }
      }
    })
    
  },
  
  onPreviewForm:function(event){
    console.log(event)
    var formId = event.target.dataset.id;
    wx.navigateTo({
      url: 'previewWrite/previewWrite?id='+formId,
    })
  }
})