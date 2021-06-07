// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindfocus:false,
    input:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(e.detail.value);
    console.log(this.data.input);
    if(e.detail.value==undefined){
      wx.navigateTo({
        url: '/pages/list/list?value='+this.data.input,
      })
      
    }else{
      wx.navigateTo({
        url: '/pages/list/list?value='+e.detail.value,
      })
    }
    this.setData({
      'input':''
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