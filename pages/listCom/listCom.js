// pages/listCom/listCom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindfocus: false,
    input: '',
    url:'',
    title:'',
    lists:[],
    user:''
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "url": options.url,
      'title':options.title
    }),
    wx.cloud.callFunction({
      name:'users',
      data:{
        $url:'getlogin'
      }
    }).then(r=>{
      console.log(r);
      this.setData({
        'user':r.result.data[0]
      })
    }).catch(err=>{
      console.log(err);
    })
    this.details(options.url)
    this.associate(options.title)
    
  },
  urlHandler(e){
    // console.log(e.currentTarget.dataset.title);
    wx.setClipboardData({
      data: e.currentTarget.dataset.title,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  listHandler(e){
    console.log(e.currentTarget.dataset.title);
    this.details(e.currentTarget.dataset.url)
    this.associate(e.currentTarget.dataset.title)
  },
  keyHandler(e){
    // console.log(e.currentTarget.dataset.title);
    wx.setClipboardData({
      data: e.currentTarget.dataset.key,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
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
    console.log(e.detail.value);
    console.log(this.data.input);
    if (e.detail.value == undefined) {
      wx.redirectTo({
        url: '/pages/list/list?value='+this.data.input,
      })

    } else {
      wx.redirectTo({
        url: '/pages/list/list?value='+e.detail.value,
      })
    }
    this.setData({
      'input': ''
    })
  },
  // 详情
  details(url){
    wx.cloud.callFunction({
      name:'pan',
      data:{
        $url:'com',
        url:url
      }
    }).then(r=>{
      console.log(r);
    var aaa={}
    var a=r.result.con
    if(r.result.url){
      aaa.url=r.result.url
    }else{
      var a1= a.indexOf('http')
    var a2=  a.substring(a1,a.length).indexOf(' ')
      console.log(a2);
      if(a2!=-1){
        aaa.url=a.substring(a1,a.length).substring(0,a2)
      }else{
        aaa.url=a
      }
    }
      aaa.con=r.result.con
      var cc=[]
      var b=r.result.headline
      var b1=b.indexOf('资源内容：')
      var b2=b.substring(0,b1)
      var arr=b2.split(/[ ]+/)
      for (let i = 0; i < arr.length; i++) {
        if(arr[i].length!=2 && i!=0){
          arr[i]=arr[i].substring(0, arr[i].length - 1);
          cc.push(arr[i])
        }
      }
      console.log(cc);
      aaa.title=cc
      var c1=a.indexOf('码')
      console.log(c1);
      if(c1!=-1){
        aaa.key=a.substring(c1+2,c1+7).replace(/^\s+|\s+$/gm, '')
      }
      console.log(aaa);
      this.setData({
        'com':aaa
      })
    }).catch(err=>{
      console.log(err);
    })
  },
  // 联想
  associate(title){
    wx.cloud.callFunction({
      name:'pan',
      data:{
        $url:'related',
        q:title
      }
    }).then(r=>{
      console.log(r);
      this.setData({
        'lists':r.result.list
      })
    }).catch(err=>{
      console.log(err);
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