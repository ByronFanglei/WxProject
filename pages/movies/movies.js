var utils = require('../../utils/util.js'); 
var app = getApp()
Page({
  data: {
    inTheaters:{},
    top250:{},
    comingSoon:{},
    searchContent: false,
    moviesConner: true
  },
  onLoad: function (options) {
    var inTheatersUrl = '/in_theaters' + app.globalData.doubanApiKey + '&start=0&count=3';
    var top250Url = '/top250' + app.globalData.doubanApiKey + '&start=0&count=3';
    var comingSoonUrl = '/coming_soon' + app.globalData.doubanApiKey + '&start=0&count=3';
    this.getMoviesListData(inTheatersUrl, "inTheaters");
    this.getMoviesListData(top250Url, "top250");
    this.getMoviesListData(comingSoonUrl, "comingSoon");

  },
  // 获取豆瓣数据函数
  getMoviesListData: function (url, settedKey){
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
  },
  // 电影详情
  onMoreTapDetail:function(event){
    // 获取点击电影id
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'more-detail/more-detail?id=' + movieId,
    })
  },

  //搜索电影部分（由于api问题无法完成）
  // 搜索获取焦点
  onBindFocus:function(event) {
    this.setData({
      searchContent: true,
      moviesConner: false
    })
  },
  // 搜索点击查询
  onBindFirm:function(event) {
    // 获取搜索框内容
    var q = event.detail.value;
    // 建立搜索链接

  },
  // 取消按钮事件
  onCancelTap: function(event) {
    this.setData({
      searchContent: false,
      moviesConner: true
    })
  }
})