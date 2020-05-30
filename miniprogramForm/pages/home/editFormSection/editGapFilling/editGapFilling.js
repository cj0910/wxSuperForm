// pages/home/addNext-Type/gap_filling/gap_filling.js
const db = wx.cloud.database();
const developforms = db.collection("developForms");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Input_Title:""
  },

  onLoad:function(options){
    console.log(options)
    this.setData({
      idx:options.idx
    })
  },
  onShow:function(){
    var form_lists = wx.getStorageSync('form_lists')||[];
    var Input_Title = form_lists[this.data.idx].inputTitle;
    this.setData({
      Input_Title:Input_Title
    })
  },
  getInputVal:function(event){
    var title = event.detail.value;
    this.setData({
      Input_Title:title
    });
  },
  
  alter_gapFilling:function(event){
    if(!this.data.Input_Title){
      wx.showToast({
        title: '题目名称不可为空',
        icon: 'none'
      });
      return;
    }
    var form_lists = wx.getStorageSync('form_lists')||[];
    var inputTitle = this.data.Input_Title;
    form_lists[this.data.idx].inputTitle = inputTitle;
    wx.setStorageSync('form_lists', form_lists);
    wx.showToast({
      title: '修改成功',
      icon:"none"
    })
    wx.navigateBack();
  },
  
})