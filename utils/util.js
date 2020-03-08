const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

// 判断评分星星函数
function getMoviesStars(stars){
  var num = stars.toString().substring(0,1);
  var starArr = [];
  for(var i=1;i<=5;i++){
    if(num>=i){
      starArr.push(1)
    }else{
      starArr.push(0)
    }
  }
  return starArr;
}
// httpq请求函数
function http(dataUrl, callBack){
  wx.request({
    url: dataUrl,
    header: {
      "content-type": " "
    },
    success: function(res){
      callBack(res.data)
    },
    fail: function(error){
      console.log("貌似没网啦！")
    }
  })
}

module.exports = {
  getMoviesStars: getMoviesStars,
  http: http
}