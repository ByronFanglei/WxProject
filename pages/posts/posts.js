var postsData = require('../../data/posts-data.js')
Page({
//处理交互：1产生事件，2捕捉事件（回调函数），3处理事件
  /**
   * 页面的初始数据
   */
  data: {

  },
  // 列表跳转
  onPostTap:function(event){
    let i = 0;
    var postId = event.currentTarget.dataset.postid;
    this.setData({
      viewNumId: postId
    })
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
      success: function(res) {
        if (viewsNumber[postId]){
          viewsNumber[postId]++;
        }else{
          viewsNumber[postId] = i;
          viewsNumber[postId]++;
        }
        wx.setStorageSync('View_Number', viewsNumber);
      }
    })
    // 获取查看缓存
    var viewsNumber = wx.getStorageSync('View_Number')
    if (viewsNumber){
      var viewNumber = viewsNumber[postId];
    }else{
      var viewsNumber = {}
      viewsNumber[postId] = 0;
      wx.setStorageSync('View_Number', viewsNumber)
    }
  },
  // 轮播图片跳转
  onSwiperTap:function(event){
    var postId = event.target.dataset.postid;
    wx/wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
      success: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      posts_key: postsData.postList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 每次展示页面获取view缓存数据
    var viewsNumber = wx.getStorageSync('View_Number');
    this.setData({
      viewsNumber
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})