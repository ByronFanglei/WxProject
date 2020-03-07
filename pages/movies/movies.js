var app = getApp()
Page({
  data: {
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
        that.getprocessDoubanData(moviesDouban, settedKey)
      },
      fail: function () {
        console.log("可能断网了哈！")
      }
    })
  },
  // 
  getprocessDoubanData: function (moviesDouban, settedKey){
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
        average: data.rating.average,
        coverageUrl: data.images.large,
        movieId: data.id
      }
      movies.push(temp);
    }
    // 设置动态属性***
    var readyData = {};
    readyData[settedKey] = {
      movies
    }
    this.setData(readyData)
  }
})