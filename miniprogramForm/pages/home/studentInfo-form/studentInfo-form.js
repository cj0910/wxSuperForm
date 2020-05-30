var util = require('../../../utils/util.js');
const app = getApp();

const db = wx.cloud.database();
const developerforms = db.collection("developerForms");
var typeData = require("../../../data/addNewType-data.js");
var studentInfoData = require("../../../data/studentInfo-data.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        "id":0,
        "txt":"单选题",
        "src":"/images/dialog_images/radio.png"
      },
      {
        "id":1,
        "txt":"多选题",
        "src":"/images/dialog_images/checkBox.png"
      },
      {
        "id":2,
        "txt":"填空题",
        "src":"/images/dialog_images/gapFilling.png"
      }
    ],
    actionSheetHidden:true,
    actionSheetItems:[
      {bindtap:'Edit',txt:'编辑'},
      {bindtap:'Delete',txt:'删除'},
    ],
    formTitle:'',
    form_lists:[],
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //清理静态缓存
    wx.clearStorageSync();
    //初始页面数据渲染
    var form_lists=studentInfoData.formListData;
    wx.setStorageSync('form_lists', form_lists)
    console.log("direction-form页面onLoad函数输出："+app.globalData.openId);
    this.setData({
      dialog_item:typeData.postListData,
    });
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

    //获取当前的时间
    var time = util.formatTime(new Date());
    //获取当前的表单标题
    var formTitle = this.data.formTitle;
    if(formTitle==''){
      wx.showToast({
        title: '请填写表单名称',
        icon:'none'
      });
      return;
    }else{
       //添加该表单记录到数据库
      developerforms.add({
        data:{
          formAnswers:0,
          createTime:time,
          formTitle:formTitle,
          form:this.data.form_lists,
        }
      }).then(res=>{
        var id = res._id;
        wx.showToast({
          title: 'Success',
          icon:'success'
        });
        wx.navigateTo({
          // url: '../successCreate/successCreate?formTitle='+formTitle,
          url: '../successCreate/successCreate?formId='+id,
        })
      })
    }
  },

  onPreviewForm:function(event){
    var formTitle = this.data.formTitle;
    wx.navigateTo({
      url: '../preview-form/preview-form?formTitle='+formTitle,
    })
  },
  //点击我显示底部弹出框
  onAddNew: function () {
    this.showModal();
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  //点击选择添加的题型
  typeClick:function(event){
    //我觉得应该也可以用navigator组件实现该功能，记得之后来改善
    const index = event.currentTarget.dataset.index;
    console.log("index的值为：",index);
    if(index==0){
      wx.navigateTo({
        url: '../addNext-Type/radio_button/radio_button'
      });
      this.hideModal();
    }
    if(index==1){
      wx.navigateTo({
        url: '../addNext-Type/check_box/check_box'
      });
      this.hideModal();
    }
    if(index==2){
      wx.navigateTo({
        url: '../addNext-Type/gap_filling/gap_filling'
      });
      this.hideModal();
    }
  },
   

   //编辑表单的section部分，弹出选择
   editFormSection:function(event){
    console.log("输出event看看：",event)
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden,
      idx:event.currentTarget.dataset.index   //这是"..."的下标
    });
  },
  actionSheetbindchange:function(){
    this.setData({
     actionSheetHidden:!this.data.actionSheetHidden
    })
   },
   bindEdit:function(event){
     console.log(event)
     var idx = this.data.idx;
     if(this.data.form_lists[idx].type==='gapFilling'){
       wx.navigateTo({
         url: '../editFormSection/editGapFilling/editGapFilling?idx='+idx,
       })
     }else if(this.data.form_lists[idx].type==='radioButton'){
       wx.navigateTo({
         url: '../editFormSection/editRadioButton/editRadioButton?idx='+idx,
       })
     }else if(this.data.form_lists[idx].type==='checkBox'){
       wx.navigateTo({
         url: '../editFormSection/editCheckBox/editCheckBox?idx='+idx,
       })
     }
     
     this.setData({
       actionSheetHidden:!this.data.actionSheetHidden
     })
   },
   bindDelete:function(){
     var that = this;
     wx.showModal({
       title:'提示',
       content:'确定删除该模块吗？',
       success(res){
         if(res.confirm){
           console.log("用户点击了确定删除");
           var form_lists = that.data.form_lists;
           var idx = that.data.idx;
           form_lists.splice(idx,1);
           for(var i=idx;i<form_lists.length;i++){
            //  console.log(i);
             var idx = form_lists[i].id;
             form_lists[i].id = idx -1;
           }
           console.log(form_lists)
           wx.setStorageSync('form_lists', form_lists)
           that.onShow();
         }else if(res.cancel){
           console.log("用户点击了取消删除")
          }
        }
      });
      this.setData({
        actionSheetHidden:!this.data.actionSheetHidden
      });
   },
  
  onPullDownRefresh:function(){
    var form_lists = wx.getStorageSync('form_lists')
    this.setData({
      form_lists:form_lists
    });
  }

})