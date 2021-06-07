// pages/list/list.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindfocus: false,
    input: '',
    value: '',
    list:[],
    indexs:-1,
    page:1,
    no:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "value": options.value
    })
    this.list(options.value,this.data.page)
  },
  bindfocus(e) {
    this.setData({
      'bindfocus': true
    })
  },
  bindblur(e) {
    console.log(e);
    this.setData({
      'bindfocus': false,
      'input':e.detail.value
    })
    this.setData({
      'input': ''
    })
  },
  bindconfirm(e) {
    this.setData({
      'list':[],
      'page':1
    })
    if (e.detail.value == undefined) {
      this.setData({
        'value':this.data.input
      })
    } else {
      this.setData({
        'value':e.detail.value
      })
    }
    this.list(this.data.value,this.data.page)
    this.setData({
      'input': ''
    })
  },
  urlHandler(e){
    console.log(e);
    this.setData({
      'indexs':e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.url);
    wx.navigateTo({
      url: '/pages/listCom/listCom?url='+e.currentTarget.dataset.url+'&title='+e.currentTarget.dataset.title,
    })
    
  },
  list(value,page){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    wx.cloud.callFunction({
      name: 'pan',
      data: {
        $url:'list',
        value: value,
        page:page
      }
    }).then(e => {
      console.log(e);
        for (let i = 0; i < e.result.list.length; i++) {
          var bb=[]
      function foo(e){
                if(e.indexOf('|')!=-1){
                  bb.push(e.substring(0,e.indexOf('|')))
                  var aa=e.substring(e.indexOf('|')+1,e.length)
                  if(aa.indexOf('|')!=-1){
                    foo(aa)
                  }else{
                    bb.push(e.substring(e.indexOf('|'),e.length))
                  }
                }else{
                  bb.push(e)
                }
              }
      foo(e.result.list[i].context)
      e.result.list[i].context=bb
      }
      console.log(e.result);
      if(this.data.list.list==undefined ){
        wx.hideLoading()
        this.setData({
          'list':e.result
        })
      }else{
        var aa =this.data.list.list
        var a1=e.result.list
        this.data.list.list=aa.concat(a1)
        console.log( this.data.list.list);
        wx.hideLoading()
        this.setData({
          'list':this.data.list
        })
      }
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
    if(this.data.page<=Math.ceil(this.data.list.num/10)){
      this.data.page=this.data.page+=1
      this.setData({
        "page":this.data.page
      })
      this.list(this.data.value,this.data.page)

    }else{
      this.setData({
        'no':true
      })
      wx.showToast({
        title: '没有更多的内容了！亲',
        icon: 'none',
        duration: 2000
      })
      
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})