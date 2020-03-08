var app = getApp();
var utils = require('../../../utils/util.js');

Page({
  data: {
    movies:{},
    totalNum: 0,
    isEmpty: true,
    totalMovies:{},
    setTime: false
  },
  onLoad: function(options) {
    var showtitle = options.showtitle;
    var dataUrl = '';
    this.setData({
      showtitle
    })
    switch (showtitle) {
      case "正在上映的电影-北京":
        dataUrl = app.globalData.doubanBase + '/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b';
        break;
      case "即将上映的电影":
        dataUrl = app.globalData.doubanBase + '/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b';
        break;
      case "豆瓣电影Top250":
        dataUrl = app.globalData.doubanBase + '/top250?apikey=0b2bdeda43b5688921839c8ecb20399b';
        break;
    }
    // 调用公共函数获取指定豆瓣数据
    utils.http(dataUrl, this.getMoviesListDta)
    this.setData({
      dataUrl
    })
  },
  // 获取更多电影数据
  getMoviesListDta: function (data){
    var moviesDouban = data.subjects;
    var movies = [];
    // 循环获取电影数据
    for (var idx in moviesDouban) {
      // 获取单个电影数据
      var data = moviesDouban[idx];
      var title = data.title;
      // 判断标题长度
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
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
    // 叠加数据
    var totalMovies = {};
    // 若isEmpty为false,证明需要叠加数据
    if (!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      // 若isEmpty为true, 赋值当前movies值
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.data.totalNum += 20;
    this.setData({
      movies: totalMovies
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  // 上滑动加载更多
  // onScrollLow: function (event){
  //   var nextUrl = this.data.dataUrl + '&start=' + this.data.totalNum + '&count=20';
  //   utils.http(nextUrl, this.getMoviesListDta);
  //   wx.showNavigationBarLoading()
  // },
  onReachBottom: function (event){
    var nextUrl = this.data.dataUrl + '&start=' + this.data.totalNum + '&count=20';
    utils.http(nextUrl, this.getMoviesListDta);
    wx.showNavigationBarLoading()
  },
  // 下滑函数
  onPullDownRefresh: function (event){
    var nextUrl = this.data.dataUrl + '&start=0&count=20';
    utils.http(nextUrl, this.getMoviesListDta);
    this.data.movies = {};
    this.data.isEmpty = true;
    wx.showNavigationBarLoading()
  },



  // 动态展示title
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.showtitle,
    })
  }
})