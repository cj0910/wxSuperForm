Page({
  /**
   * 页面的初始数据
   */
  data: {
    formTitle:'',
    form_lists:[],
  },
  onShow:function(){
    var form_lists = wx.getStorageSync('form_lists');
    this.setData({
      form_lists:form_lists,
    });
  },

  getFormTitle:function(event){
    console.log(event)
    var formTitle = event.detail.value;
    console.log(formTitle);
    this.setData({
      formTitle:formTitle
    })
  },
  SubmitForm:function(event){
    console.log("form发生了sumbit事件，携带的数据为：",event);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var form_title=options.formTitle;
    this.setData({
      form_title:form_title
    })
  },

   onPullDownRefresh:function(){

  }

})