// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindfocus:false,
    input:'',
    hotIndex:-1,
    historyIndex:-1,
    user:0,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'pan',
      data:{
        $url:'hot'
      }
    }).then(r=>{
      console.log(r);
      var list=[]
      var arr=r.result.split(/[ ]+/)
      for (let i = 0; i < arr.length; i++) {
        if(arr[i].length!=1 && i!=0){
          arr[i]=arr[i].substring(0, arr[i].length - 1);
          list.push(arr[i])
        }
      }
      // console.log(list);
      this.setData({
        'list':list
      })
    }).catch(err=>{
      console.log(err);
    })
    
  },
  bindfocus(e){
    this.setData({
      'bindfocus':true
    })
  },
  bindblur(e){
    console.log(e);
    this.setData({
      'bindfocus':false,
      'input':e.detail.value
    })
  },
  bindconfirm(e){
    // console.log(this.data.user==0);
    if(this.data.user!=0){
      if(!this.data.user.switch.one){
        if(e.detail.value==undefined){
          wx.navigateTo({
            url: '/pages/list/list?value='+this.data.input,
          })
          if(this.data.user.history.length==10){
            this.top10history(this.data.input)
            this.history(this.data.input)
           }else{
             this.history(this.data.input)
           }
        }else{
          wx.navigateTo({
            url: '/pages/list/list?value='+e.detail.value,
          })
          if(this.data.user.history.length==10){
            this.top10history(e.detail.value)
            this.history(e.detail.value)
           }else{
             this.history(e.detail.value)
           }
        }
      }else{
        if(e.detail.value==undefined){
          wx.navigateTo({
            url: '/pages/list/list?value='+this.data.input,
          })
        }else{
          wx.navigateTo({
            url: '/pages/list/list?value='+e.detail.value,
          })
        }
      }
    }else{
        if(e.detail.value==undefined){
          wx.navigateTo({
            url: '/pages/list/list?value='+this.data.input,
          })
        }else{
          wx.navigateTo({
            url: '/pages/list/list?value='+e.detail.value,
          })
        }
    }
    this.setData({
      'input':''
    })
  },
  hotHandler(e){
    console.log(e);
    this.setData({
      'hotIndex':e.currentTarget.dataset.i
    })
    wx.navigateTo({
      url: '/pages/list/list?value='+e.currentTarget.dataset.v,
    })
    if(!this.data.user.switch.one){
      if(this.data.user.history.length==10){
        this.top10history(e.currentTarget.dataset.v)
        this.history(e.currentTarget.dataset.v)
       }else{
         this.history(e.currentTarget.dataset.v)
       }
    }
  },
  historyHandler(e){
    console.log(e);
    this.setData({
      'historyIndex':e.currentTarget.dataset.i
    })
    wx.navigateTo({
      url: '/pages/list/list?value='+e.currentTarget.dataset.v,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.cloud.callFunction({
      name:'users',
      data:{
        $url:'getlogin'
      }
    }).then(r=>{
      console.log(r);
      if(r.result.data.length!=0){
        this.setData({
          'user':r.result.data[0]
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '您没有授权，一些功能无法享受哦！是否转到授权页面？',
          success (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/my/my'
              })
            } 
          }
        })
      }
    }).catch(err=>{
      console.log(err);
    })
  },
  history(e){
    wx.cloud.callFunction({
      name:'users',
      data:{
        $url:'addhistory',
        openid:this.data.user.openid,
        v:e
      }
    }).then(r=>{
      console.log(r);
    }).catch(err=>{
      console.log(err);
    })
  },
  top10history(e){
    wx.cloud.callFunction({
      name:'users',
      data:{
        $url:'top10history',
        openid:this.data.user.openid,
        v:e
      }
    }).then(r=>{
      console.log(r);
    }).catch(err=>{
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})