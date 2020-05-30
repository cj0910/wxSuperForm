const app = getApp();
const db = wx.cloud.database();
const form_lists = db.collection('developerForms');
const userAnswers = db.collection('userForms');
const answerLists = db.collection("answerLists");
Page({
    data:{
        header_NavBar: ['统计结果', '答卷详情'],
        currentTab: 0,
        formSubmitContent: {},
        resultStatistics: [],
        result: {},
        gapFilling:{},
    },

    navBarTap: function (event) {
        // console.log(this.data.result)
        var result = wx.getStorageSync('result');
        var gapFilling = wx.getStorageSync('gapFilling');
        this.setData({
            currentTab: event.currentTarget.dataset.idx,
            result:result,
            gapFilling:gapFilling,
        });
        console.log(this.data.result)
        app.globalData.currentTab = event.currentTarget.dataset.idx
    },

    onLoad: function (options) {
        wx.clearStorageSync();
        console.log("是onload")
        var that = this;
        this.setData({
            form_id: options.id,
        });
        form_lists.doc(options.id).get({
            success:res=>{
                that.setData({
                    formList: res.data.form,
                    resultStatistics: res.data.form,
                    formAnswers: res.data.formAnswers,
                    form_id:res.data._id
                })
                //设置result，初始化
                var formList = res.data.form;
                for (var i = 0; i < formList.length; i++) {
                    if (formList[i].type === 'gapFilling') {
                        console.log("这是填空题");
                        var gapFilling = that.data.gapFilling;
                        gapFilling[formList[i].inputTitle] = [];
                    } else if (formList[i].type === 'radioButton' || formList[i].type === 'checkBox') {
                        var old_result = that.data.result;
                        old_result[formList[i].inputTitle] = {}
                        var otherInfo = formList[i].otherInfo;
                        console.log(otherInfo)
                        for(var k=0;k<otherInfo.length;k++){
                            old_result[formList[i].inputTitle][otherInfo[k]]=0;
                        }
                        console.log(old_result);
                        that.setData({
                            result: old_result,
                        });
                    }
                    wx.setStorageSync('gapFilling', gapFilling);
                    wx.setStorageSync('result', old_result);
                };
                console.log(old_result);
                
            },
        })
        // form_lists.doc(options.id).get().then(res => {
        //     // 设置result
        //     var formList = res.data.form;
        //     for (var i = 0; i < formList.length; i++) {
        //         if (formList[i].type === 'gapFilling') {
        //         } else if (formList[i].type === 'radioButton' || formList[i].type === 'checkBox') {
        //             var old_result = that.data.result;
        //             old_result[formList[i].inputTitle] = {}
        //             var otherInfo = formList[i].otherInfo;
        //             console.log(otherInfo)
        //             for(var k=0;k<otherInfo.length;k++){
        //                 old_result[formList[i].inputTitle][otherInfo[k]]=0;
        //             }
        //             console.log(old_result)
        //             that.setData({
        //                 result: old_result
        //             })
        //         }
        //     };
        //     console.log(old_result);
        //     that.setData({
        //         formList: res.data.form,
        //         resultStatistics: res.data.form,
        //         formAnswers: res.data.formAnswers
        //     })
        //     })

        setTimeout(this.MYShow,7000);
        },

        MYShow: function () {
            console.log("是onShow")
            // console.log(this.data.form_id);
            var that = this;
            this.setData({
                currentTab: app.globalData.currentTab
            });
            this.getResult();
            setTimeout(function () {
                console.log(that.data.form);
                // console.log(that.data.formSubmitContent)
            }, 6000);
        },
        // 获取并统计数据
        getResult:function(){
            console.log("是GetResult")
            var that = this;
            db.collection('answerLists').where({
                form_id: this.data.form_id
            }).get({
                success: res => {
                    console.log(res);
                    that.setData({
                        // formSubmitContent:res.data[0].SubmitContent,
                        form: res.data,
                    })
                    var old_result = that.data.result;
                    console.log(old_result);
                    for (var i = 0; i < res.data.length; i++) {
                        var SubmitContent = res.data[i].SubmitContent;
                        console.log(res.data[i].SubmitContent)
                        for (var index in that.data.result) {
                            console.log(typeof SubmitContent[index])
                            console.log(SubmitContent[index])
                            if (typeof SubmitContent[index] === 'string') {
                                // old_result[index][SubmitContent[index]] += 1;
                                if (SubmitContent[index] in old_result[index]) {
                                    old_result[index][SubmitContent[index]] ++;
                                } else {
                                    old_result[index][SubmitContent[index]] = 1;
                                }
                            } else if(typeof SubmitContent[index] === 'object'){
                                var optLen = SubmitContent[index].length;
                                console.log(optLen);
                                for (var j = 0; j < SubmitContent[index].length; j++) {
                                    console.log("怎么不运行这里哎哎哎唉唉")
                                    // var content = SubmitContent[index].split(",");
                                    // console.log(ley)
                                    // console.log(SubmitContent[index]);
                                    // console.log(content);
                                    var content = SubmitContent[index];
                                    console.log(old_result[index]);
                                    if (content[j] in old_result[index]) {
                                        old_result[index][content[j]] += 1;
                                        console.log("这个选项之前存在选的人")
                                    } else {
                                        console.log("之前不存在该选择")
                                        old_result[index][content[j]] = 1;
                                    }
                                    console.log("这个函数运行进来了吗")
                                }
                            }
                            wx.setStorageSync('result', old_result);
                        }
                        var old_gapFilling = that.data.gapFilling;
                        for(var gap in SubmitContent){
                            if (typeof SubmitContent[gap] === 'string') {
                                if(gap in old_gapFilling){
                                    old_gapFilling[gap].push(SubmitContent[gap]);
                                }
                            }
                            wx.setStorageSync('gapFilling', old_gapFilling);
                        }
                    }
                    setTimeout(function () {
                        console.log(old_result);
                    }, 6000);
                },
                fail: err => {
                    wx.showToast({
                        title: '查看失败',
                        icon: 'none'
                    })
                },
            });
        },
        
        onShareAppMessage: function () {
         
        }
    }
)

// Page({
//   data: {
//     header_NavBar:['统计结果','答卷详情'],
//     currentTab:0,
//     formSubmitContent:{},
//     resultStatistics:[],
//     result:{}
//   },
//   navBarTap:function(event){
//     this.setData({
//       currentTab:event.currentTarget.dataset.idx,
//     });
//     app.globalData.currentTab = event.currentTarget.dataset.idx
//   },

//   onLoad: function (options) {
//     var that = this;
//     this.setData({
//       form_id:options.id,
//     });
//     form_lists.doc(options.id).get().then(res=>{

//       that.setData({
//         formList:res.data.form,
//         resultStatistics:res.data.form,
//         formAnswers:res.data.formAnswers
//       })
//     })
//   },

//   onShow: function () {
//     console.log(this.data.form_id);
//     this.setData({
//       currentTab:app.globalData.currentTab
//     });
//     var that = this;
//     db.collection('userForms').where({
//       form_id:this.data.form_id
//     }).get({
//       success:res=>{
//         console.log(res)
//         that.setData({
//           // formSubmitContent:res.data[0].SubmitContent,
//           form:res.data
//         })
//       },
//       fail:err=>{
//         wx.showToast({
//           title: '查看失败',
//           icon:'none'
//         })
//       },
//     });   
//     setTimeout(function(){
//       console.log(that.data.form);
//       // console.log(that.data.formSubmitContent)
//     },3000 );  
//   },

//   getStatistics:function(){
//     console.log(this.data.resultStatistics)
//     var resultStatistics = this.data.resultStatistics;
//     var form = this.data.form;
//     var gapingResult = {};
//     var radioResults = wx.getStorageSync('radioResults')||[];
//     var checkBoxResult = wx.getStorageSync('checkBoxResult')||[];
//     for(var i=0;i<resultStatistics.length;i++){
//       if(resultStatistics[i].type==='gapFilling'){
//         // gapingResult
//       }
//       else if(resultStatistics[i].type==='radioButton'){
//         // for(var j=0;j<form.length;j++){

//         // }
//         // var title = resultStatistics[i].inputTitle;
//         // var radioResult = {

//         // };
//         // radioResults.push(radioResult);
//         // wx.setStorageSync('radioResults', radioResult);
//       }
//       else if(resultStatistics[i].type==='checkBox'){

//       }
//     }

//     db.collection('userForms').where({
//       form_id:this.data.form_id
//     }).get({
//       success:res=>{
//         console.log(res)
//         that.setData({
//           form:res.data
//         })
//       },
//       fail:err=>{},
//     });

//   },
//   onShareAppMessage: function () {
//     this.getStatistics()
//   }
// })