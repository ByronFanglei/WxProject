# 微信小程序

## 关键要点
1.标签中设置属性采用JavaScript判定，举个例子：

```HTML
<swiper  vertical="{{false}}"></swiper>
// vertical为true/false/“ ” 时都能触发轮播滚动方向，这里的值为一个JavaScript判定值，也就是说，想让这个函数不执行，必须进行绑定数据{{false}}才生效！！！
```
2.css样式布局尽量使用flex布局，很有效
3.确保setData内传入的一定是一个对象！！！