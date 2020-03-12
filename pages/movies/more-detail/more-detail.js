var utils = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {
    movie: {}
  },
  onLoad: function(options) {
    var movieId = options.id;
    var movieUrl = app.globalData.doubanBase + '/subject/' + movieId + app.globalData.doubanApiKey;
    utils.http(movieUrl, this.getMoviesListDta);
  },
  getMoviesListDta: function(data) {
    // 做电影详情页面处理
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: utils.getMoviesStars(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: utils.getCastsName(data.casts),
      castsInfo: utils.getCastsImg(data.casts),
      summary: data.summary
    }
    this.setData({
      movie
    })
  },
  viewMoviePostImg: function(event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: 'src', // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }
})