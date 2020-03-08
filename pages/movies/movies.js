var utils = require('../../utils/util.js'); 
var app = getApp()
Page({
  data: {
    inTheaters:{},
    top250:{},
    comingSoon:{}
  },
  onLoad: function (options) {
    var inTheatersUrl = '/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=3';
    var top250Url = '/top250?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=3';
    var comingSoonUrl = '/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=3';
    this.getMoviesListDta(inTheatersUrl, "inTheaters");
    this.getMoviesListDta(top250Url, "top250");
    this.getMoviesListDta(comingSoonUrl, "comingSoon");

  },
  // 获取豆瓣数据函数
  getMoviesListDta: function (url, settedKey){
    var that = this;
    wx.request({
      url: app.globalData.doubanBase + url,
      header: {
        "content-type": " " //这是一个坑！！！
      },
      success: function (res) {
        var moviesDouban = res.data.subjects;
        var showTitle = res.data.title;
        that.getprocessDoubanData(moviesDouban, settedKey, showTitle)
        // console.log(res)
      },
      fail: function () {
        console.log("可能断网了哈！")
      }
    })
  },
  // 获取需要的豆瓣数据并组成对象
  getprocessDoubanData: function (moviesDouban, settedKey, showTitle){
    var movies = [];
    // 循环获取电影数据
    for (var idx in moviesDouban){
      // 获取单个电影数据
      var data = moviesDouban[idx];
      var title = data.title;
      // 判断标题长度
      if(title.length >= 6){
        title = title.substring(0,6) + '...';
      }
      // 存储单个数据
      var temp = {
        title: title,
        stars: utils.getMoviesStars(data.rating.stars),
        average: data.rating.average,
        coverageUrl: data.images.large,
        movieId: data.id
      }
      movies.push(temp);
    }
    // 设置动态属性***
    var readyData = {};
    readyData[settedKey] = {
      movies,
      showTitle
    }
    this.setData(readyData);
  },
  // 跳转更多电影页面
  onMoreTap: function(event){
    var showtitle = event.currentTarget.dataset.showtitle;
    wx.navigateTo({
      url: 'more-movie/more-movie?showtitle=' + showtitle,
    })
  }
})