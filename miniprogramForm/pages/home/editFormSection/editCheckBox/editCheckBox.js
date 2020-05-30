Page({

  data: {
    inputVal:[]
  },
  onLoad:function(options){
    console.log("输出options：",options)
    this.setData({
      idx:options.idx
    })
  },
  onShow:function(event){
    var form_lists = wx.getStorageSync('form_lists')||[];
    console.log(form_lists);
    var inputTitle = form_lists[this.data.idx].inputTitle;
    var otherInfo = form_lists[this.data.idx].otherInfo;
    this.setData({
      checkbox_Title:inputTitle,
      inputVal:otherInfo
    })
  },

  //获取input的值
  inputCheckBox_Title:function(event){
    var title=event.detail.value;
    this.setData({
      checkbox_Title:title
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
    var title=event.detail.value;
    this.setData({
      checkbox_Title:title
    });
  },
  //删除input
  delInput:function(event){
    var nowidx = event.currentTarget.dataset.idx;//当前索引
    var oldInputVal = this.data.inputVal;//所有的input值
    console.log(oldInputVal)
    if(oldInputVal.length>1){
      oldInputVal.splice(nowidx,1);//view删除了对应的input值也要删掉
      this.setData({
        inputVal:oldInputVal
      });
      console.log(this.data.inputVal)
    }else{
      wx.showModal({
        title:"警告",
        content: '选项不可为空',
        showCancel: false,
        confirmText: '确定',
      });
      return false;
    }
  },
  //添加该单项选择按钮至表单页面
  add_checkBox:function(event){
    if(!this.data.checkbox_Title){
      wx.showToast({
        title: '请填写选项标题',
        icon: 'none'
      });
      return;
    }
    var form_lists = wx.getStorageSync('form_lists')||[];
    var form_listNow = {
      id:this.data.index,
      type:'checkBox',
      inputTitle:this.data.checkbox_Title,
      otherInfo:this.data.inputVal
    };
    form_lists[this.data.idx] = form_listNow
    wx.setStorageSync('form_lists', form_lists);

    var check_Boxs = wx.getStorageSync('check_Boxs')||[];
    var check_Box = {
      checkbox_title:this.data.checkbox_Title,
      checkbox_txt:this.data.inputVal
    }
    check_Boxs.push(check_Box);
    wx.setStorageSync('check_Boxs', check_Boxs);


    //创建并返回
    wx.navigateBack();
    //或者 var pages = getCurrentPages();
    // var currPage = pages[pages.length-1]; //当前页面
    // var prePage = pages[pages.length-2]//上一个页面
    // //直接调用上一个页面对象的setData（）方法，把数据存储到上一个页面中去
    // prePage.setData({
    //   data:this.data
    // });
    // wx.navigateBack({
    //   delta:1
    // });
  }
})