// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const rq=require('request-promise')
const cheerio = require('cheerio')
// const { post } = require('request-promise')
// const axios=require('axios')

cloud.init({
  env:'pan-4gym5b4rffd78434'
})

// 云函数入口函数
exports.main = (event, context) => {
  const app = new TcbRouter({ event });
  // 爬取首页热门搜索
  app.router('hot', async (ctx, next) => {
    return rq({
      url: `https://www.kolsou.com`,
      headers: {
        //"content-type": "application/json",
        "content-Type": "text/html;charset=UTF-8;",
      },
    }).then((res=>{
      // return res
        const $ = cheerio.load(res)
        const list =  $('.w650').children('ul').find('li').text()
        ctx.body= list
    }))
  })
  // 爬取关键字列表
  app.router('list', async (ctx, next) => {
    var aa=encodeURIComponent(event.value)
    return rq({
      url: `https://www.kolsou.com/search?q=${aa} &page=${event.page}`,
      headers: {
        //"content-type": "application/json",
        "content-Type": "text/html;charset=UTF-8;",
      },
    }).then((res=>{
      // return res
      var aa={}
        const $ = cheerio.load(res)
        const new_title =  $('.data_list_title').children('font').text()
        aa.num=new_title
        var news_title=$('.search').find('ul>li')
        // bb.push(news_title.children('.title').text()+news_title.children('.title>a').attr('href'))
        var p =new Promise((res,rej)=>{
          var bb=[]
          news_title.map((i,d)=>{
            var cc={}
            cc.title=$(d).children('.title').text()
            cc.url=$(d).children('.title').children('a').attr('href')
            cc.context=$(d).children('.summary').text()
            bb.push(cc)
          })
          res(bb)
        })
        p.then(res=>{
          aa.list=res
        })
        ctx.body= aa
    }))
  })
  // 关键字列表详情
  app.router('com', async (ctx, next) => {
    return rq({
      url: `https://www.kolsou.com${event.url}`,
      headers: {
        //"content-type": "application/json",
        "Content-Type": "text/html;charset=UTF-8;",
      },
    }).then((res=>{
      // return res
      var aa={}
        const $ = cheerio.load(res)
        const new_title =  $('.data_row').text()
        aa.headline=new_title
        var news_title=$('.fa').children('div').text()
        var url=$('.fa').children('div').children('a').attr('href')
        aa.con=news_title
        aa.url=url
        ctx.body= aa
    }))
  })
  // 关键字联想列表
  app.router('related', async (ctx, next) => {
    var aa=encodeURIComponent(event.q)
    return rq({
      url: `https://www.kolsou.com/search?q=${aa}`,
      headers: {
        //"content-type": "application/json",
        "content-Type": "text/html;charset=UTF-8;",
      },
    }).then((res=>{
      // return res
      var aa={}
        const $ = cheerio.load(res)
        const new_title =  $('.data_list_title').children('font').text()
        aa.num=new_title
        var news_title=$('.search').find('ul>li')
        // bb.push(news_title.children('.title').text()+news_title.children('.title>a').attr('href'))
        var p =new Promise((res,rej)=>{
          var bb=[]
          news_title.map((i,d)=>{
            var cc={}
            cc.title=$(d).children('.title').text()
            cc.url=$(d).children('.title').children('a').attr('href')
            cc.context=$(d).children('.summary').text()
            bb.push(cc)
          })
          res(bb)
        })
        p.then(res=>{
          aa.list=res
        })
        ctx.body= aa
    }))
  })
  return app.serve();

}