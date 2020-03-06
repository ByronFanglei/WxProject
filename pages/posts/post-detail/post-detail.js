var postsData = require('../../../data/posts-data.js')

Page({
  data: {},
  onLoad: function(options) {
    var postId = options.id
    this.setData({
      collectedId: postId
    })
    var postData = postsData.postList[postId]
    this.setData({
      postDetail: postData
    })
    // 获取缓存中post_collected对应的值
    var postsCollected = wx.getStorageSync('post_collected');
    if (postsCollected) {
      // 若postsCollected存在，获取对应id的值
      var postCollected = postsCollected[postId];
      if (postCollected) {
        // 将获取对应id值传递给data供页面渲染
        this.setData({
          collected: postCollected
        })
      }
    } else {
      // 若postsCollected不存在，创建对应对象
      var postsCollected = {};
      // 将本次页面值设为false
      postsCollected[postId] = false;
      // 设置缓存
      wx.setStorageSync('post_collected', postsCollected);
    }
  },
  onCollectedTap: function(event) {
    // 获取缓存数据
    var postsCollected = wx.getStorageSync('post_collected');
    // 选择对应id缓存数据
    var postCollected = postsCollected[this.data.collectedId];
    postCollected = !postCollected;
    postsCollected[this.data.collectedId] = postCollected;
    this.showToast(postsCollected, postCollected);
    // this.showModal(postsCollected, postCollected);


  },
  onShareTap: function() {
    wx.showActionSheet({
      itemList: [
        '分享微博',
        '分享知乎',
        '分享b站'
      ],
      itemColor: "#ff6700",
      success(res) {
        console.log(res.tapIndex)
      }
    })
  },
  // showToast函数
  showToast: function(postsCollected, postCollected) {
    // 更新缓存
    wx.setStorageSync('post_collected', postsCollected)
    // 更新渲染页面
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      mask: true
    })
  },
  // showModal函数
  showModal: function(postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '模态框',
      content: postCollected ? '是否收藏本文' : '是否取消收藏本文',
      success(res) {
        if (res.confirm) {
          // 更新缓存
          wx.setStorageSync('post_collected', postsCollected)
          // 更新渲染页面
          that.setData({
            collected: postCollected
          })
        } else if (res.cancel) {
          console.log('用户选择了取消')
        }
      }
    })
  }

})