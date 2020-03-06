# 微信小程序

## 关键要点
1.标签中设置属性采用JavaScript判定，举个例子：

```HTML
<swiper  vertical="{{false}}"></swiper>
// vertical为true/false/“ ” 时都能触发轮播滚动方向，这里的值为一个JavaScript判定值，也就是说，想让这个函数不执行，必须进行绑定数据{{false}}才生效！！！
```
2.css样式布局尽量使用flex布局，很有效
3.确保setData内传入的一定是一个对象！！！
4.网易云媒体流获取（可能会有时效问题）---以《处暑》为例子
（1）打开网易云找到要获取的音乐，右击复制链接
（https://music.163.com/song?id=1385858356&userid=439687576）
（2）按照这个格式进行裁剪‘
（http://music.163.com/song/media/outer/url?id=ID数字.mp3）
（3）最终地址为：
（https://music.163.com/song/media/outer/url?id=1385858356.mp3）




## 存在BUG
1.开始音乐后不能暂停，暂停一闪而过（编辑器与真机调试都正常，ios13.3出现BUG）