const db = wx.cloud.database()
const form_lists = db.collection('userForms')
const forms = db.collection('developerForms')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formTitle:'',
    form_lists:[],
    formSubmitValue:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.clearStorageSync();
    console.log(options)
    var that=this;
    form_lists.doc(options.id).get().then(res1=>{
      console.log(res1);
      var formSubmitValue = res1.data.SubmitContent;
      that.setData({
        form_title:res1.data.SubmitContent.form_title,
        formSubmitValue:formSubmitValue,
      });
      console.log(formSubmitValue)
      forms.doc(res1.data.form_id).get().then(res2=>{
        console.log(res2);
        this.setData({
          form:res2.data.form,
        })
      })
    });
  },
  onShow:function(){
    // console.log(this.data.form_title)
    // console.log(this.data.formSubmitValue)
  },
 

})