// pages/home/addNext-Type/radio_button/radio_button.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Radio_Title:"",
    inputVal:[]
  },
  onLoad:function(options){
    this.setData({
      idx:options.idx
    })
  },
  onShow:function(){
    var form_lists = wx.getStorageSync('form_lists')||[];
    var inputTitle = form_lists[this.data.idx].inputTitle;
    var otherInfo = form_lists[this.data.idx].otherInfo;
    this.setData({
      Radio_Title:inputTitle,
      inputVal:otherInfo
    })
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
    console.log(event)
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
    var old = this.data.inputVal;
    old.push('');//这里不管push什么，只要数组长度增加1就行
    this.setData({
      inputVal:old
    })
  },
  //删除input
  delInput:function(event){
    console.log(event)
    var nowidx = event.currentTarget.dataset.idx;//当前索引
    var oldInputVal = this.data.inputVal;//所有的input值
    console.log(oldInputVal)
    if(oldInputVal.length>2){
      oldInputVal.splice(nowidx,1);//view删除了对应的input值也要删掉
      this.setData({
        inputVal:oldInputVal
      });
      console.log(this.data.inputVal)
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
    console.log(this.data.inputVal)
    if(!this.data.Radio_Title){
      wx.showToast({
        title: '请填写选项标题',
        icon: 'none'
      });
      return;
    }
    
    var form_lists = wx.getStorageSync('form_lists')||[];
    var form_listNow = {
      id:this.data.index,
      type:'radioButton',
      inputTitle:this.data.Radio_Title,
      otherInfo:this.data.inputVal
    };
    form_lists[this.data.idx] = form_listNow
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