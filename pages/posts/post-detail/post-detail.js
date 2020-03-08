var postsData = require('../../../data/posts-data.js')
var app = getApp()
// 获取音乐api
const backgroundAudioManager = wx.getBackgroundAudioManager();
Page({
  data: {
    isPlayMusic: false
  },
  onLoad: function(options) {
    var postId = options.id;
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
    if (app.globalData.g_isPlayMusic && app.globalData.g_musicId === postId) {
      this.setData({
        isPlayMusic: true
      })
    }
    this.setMusic()

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
  // 分享函数
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
  },

  // 音乐控制
  onMusicTap: function(event) {
    var that = this;
    // 获取对应页面id
    var musicId = this.data.collectedId;
    // 获取对应id对象music内容
    var postData = postsData.postList[musicId].music;
    backgroundAudioManager.title = postData.title;
    backgroundAudioManager.coverImgUrl = postData.coverImg;
    backgroundAudioManager.src = postData.url;
    // 获取音乐是否被播放
    var isPlayMusic = this.data.isPlayMusic;
    if (isPlayMusic) {
      // 暂停播放
      backgroundAudioManager.pause()
      this.setData({
        isPlayMusic: false
      })
      console.log('暂停了' + this.data.isPlayMusic)
    } else {
      // 开始播放
      backgroundAudioManager.play()
      this.setData({
        isPlayMusic: true
      })
      console.log('开始了' + this.data.isPlayMusic)
    }
  },

  // 监听音乐
  setMusic: function() {
    // 监听音乐播放
    var that = this;
    backgroundAudioManager.onPlay(function() {
      that.setData({
        isPlayMusic: true
      })
      app.globalData.g_isPlayMusic = true;
      // 获取对应音乐id
      app.globalData.g_musicId = that.data.collectedId;
      console.log(app.globalData.g_isPlayMusic + '--' + that.data.isPlayMusic);
    });
    // 监听音乐暂停
    backgroundAudioManager.onPause(function() {
      that.setData({
        isPlayMusic: false
      })
      app.globalData.g_isPlayMusic = false;
      app.globalData.g_musicId = null;
      console.log(app.globalData.g_isPlayMusic + '--' + that.data.isPlayMusic);
    });
    backgroundAudioManager.onEnded(function() {
      that.setData({
        isPlayMusic: false
      })
      app.globalData.g_isPlayMusic = false;
      app.globalData.g_musicId = null;
      console.log("音乐停止了")
    })
  },
  // 监听音乐停止


})