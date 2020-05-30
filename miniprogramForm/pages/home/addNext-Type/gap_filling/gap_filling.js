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
    var form_lists = wx.getStorageSync('form_lists')||[];
    if(form_lists.length){
      var idx = form_lists.length;
      // console.log(idx);
      this.setData({
        index:idx
      })
    }else{
      this.setData({
        index:0
      })
    }
  },
  getInputVal:function(event){
    var title = event.detail.value;
    this.setData({
      Input_Title:title
    });
  },
  
  add_gapFilling:function(event){
    if(!this.data.Input_Title){
      wx.showToast({
        title: '题目名称不可为空',
        icon: 'none'
      });
      return;
    }
    var form_lists = wx.getStorageSync('form_lists')||[];
    var form_list = {
      id:this.data.index,
      type:'gapFilling',
      inputTitle:this.data.Input_Title,
      otherInfo:''
    };
    form_lists.push(form_list);
    wx.setStorageSync('form_lists', form_lists);
    wx.navigateBack();
  },
  
})