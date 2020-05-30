// pages/home/addNext-Type/radio_button/radio_button.js
Page({

  data: {
    Radio_Title:"",
    array:[0,1],
    inputVal:[]
  },
  onLoad:function(options){
    var form_lists = wx.getStorageSync('form_lists')||[];
    if(form_lists.length){
      var idx = form_lists.length;
      this.setData({
        index:idx
      })
    }else{
      this.setData({
        index:0
      })
    }
  },

  //获取input的值
  inputRadio_Title:function(event){
    var title=event.detail.value;
    this.setData({
      Radio_Title:title
    });
  },

  //获取input的值
  getInputVal:function(event){
    var nowIdx = event.currentTarget.dataset.idx;//获取当前索引
    var val = event.detail.value;//获取输入的值
    var oldVal = this.data.inputVal;
    oldVal[nowIdx] = val;//修改对应索引值的内容
    this.setData({
      inputVal:oldVal
    })
  },
  //添加input
  addInput:function(){
    var old = this.data.array;
    var len = this.data.array.length;
    old.push(len);
   // old.push(1);这里不管push什么，只要数组长度增加1就行
    this.setData({
      array:old
    })
  },
  //删除input
  delInput:function(event){
    console.log(event)
    var nowidx = event.currentTarget.dataset.idx;//当前索引
    var oldInputVal = this.data.inputVal;//所有的input值
    var oldarr = this.data.array;//循环内容
    if(oldarr.length>2){
      oldarr.splice(nowidx,1);//删除当前索引的内容，这样就能删除view了
      oldInputVal.splice(nowidx,1);//view删除了对应的input值也要删掉
      this.setData({
        array:oldarr,
        inputVal:oldInputVal
      });
    }else{
      wx.showModal({
        title:"警告",
        content: '单项选择必须要有两个选项',
        showCancel: false,
        confirmText: '确定',
      });
      return false;
    }
  },
  //添加该单项选择按钮至表单页面
  add_radioButton:function(event){
    if(!this.data.Radio_Title){
      wx.showToast({
        title: '请填写选项标题',
        icon: 'none'
      });
      return;
    }
    
    var form_lists = wx.getStorageSync('form_lists')||[];
    var form_list = {
      id:this.data.index,
      type:'radioButton',
      inputTitle:this.data.Radio_Title,
      otherInfo:this.data.inputVal
    };
    form_lists.push(form_list);
    wx.setStorageSync('form_lists', form_lists);

    var radio_Buttons = wx.getStorageSync('radio_Buttons')||[];
    var radio_Button = {
      radiobutton_title:this.data.Radio_Title,
      radiobutton_txt:this.data.inputVal
    }
    radio_Buttons.push(radio_Button);
    wx.setStorageSync('radio_Buttons', radio_Buttons);
    wx.navigateBack();
  }
})