---
title: 踩坑记
date: 2024-03-14 20:18:13
tags:
cover: /img/common/t4.jpeg
---
# 持续更新

## Cookie在部分ios上设置值失效
```
Cookies.set(luckyKey, { expires: 1 }); // ❌
Cookies.set(luckyKey, 1, { expires: 1 }); // ✅
```
--------------------------------------------------------------------------------
## Video自定义 播放按钮层级问题
Q: 播放按钮在部分ios手机上点击播放后会在下层(已设置z-index)
A: 给video标签设置position, 此时产生了一个问题，点击播放后，会闪几下(应该是封面和视频的间隙)，解决闪烁可以去掉封面，使用div背景做封面解决
Q: 有的ios手机会出现播放按钮(h5无此图标,应该是webview渲染的)
A: 监听视频播放状态，视频播放的时候再显示video

--------------------------------------------------------------------------------
## swiper插件 在ios高版本上item内的所有内容无法点击(复现机型 iphone 14 pro max 17.x)
Q: 使用了swiper轮播插件，在高版本ios上多个swiper-item时，中间的translate3d z轴出现负数,导致层级在下边，整个swiper-item无法点击
A: 强制设置z轴为0
.swiper-slide{
  &.swiper-slide-active{
    transform: translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1) !important;
  }
}

--------------------------------------------------------------------------------
## h5在iOS点击出现的高亮黑色背景层
-webkit-tap-highlight-color:transparent;
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
tap-highlight-color: rgba(0, 0, 0, 0);

--------------------------------------------------------------------------------
## html内动态引入图片
backgroundImage: item.gold ? `url(${require(`../../web-sync/img/ball/${item.gold}.png`)})` : ''

## swiper自适应高度,降低滑动灵敏度
:autoHeight="true" // 自适应高度
:touchRatio="0.2" // 降低滑动灵敏度
如何把内容加到页码(swiper-pagination)和swiper-slide中间
```
const pagination = {
  el: '.swiper-pagination',
  clickable: true,
  renderBullet: function (index, className) {
    return '<span class="' + className + '"></span>';
  },
}
```

## 类似stroke效果,使用shadow
```
text-shadow: #FF7E5E 1px 0 0,#FF7E5E 0 1px 0,#FF7E5E -1px 0 0,#FF7E5E 0 -1px 0;
```
## animation动画抖动
Q: animation动画(大小会变), 在ios上和相邻定位元素出现层级错乱频闪
A: 给父元素设置overflow:hidden;

--------------------------------------------------------------------------------
## css动画函数复用
Q: 相同动画，不同的结束位置,复用同一个keyframes, 

一个列表，每个元素有transform属性，想透传给@keyframes
```
@keyframes fadeInTopRight {
  from {
    opacity: 0;
    transform: translate3d(375px, -1200px, 0);
  }
  to {
    opacity: 1;
    transform:  translate3d(100%, 100%, 0);
  }
}
```
A:
>https://www.cnblogs.com/coco1s/p/17186878.html

将结束动画设置获取变量，但是变量是每个item的变量
vue

```
<bet-icon
  :num="k.num"
  v-for="k in currentBetting[item]"
  :key="k.id"
  :style="{
    transform: k.transform,
    animationDuring: k.animationDuring,
    animationDelay: k.animationDelay,
    zIndex: k.zIndex,
    '--end': k.end
  }"
  :class="{self: k.self}"
  ></bet-icon>
```
css

```
@keyframes fadeInTopRight {
  from {
    opacity: 0;
    transform: translate3d(375px, -1200px, 0);
  }
  to {
    opacity: 1;
    transform:  var(--end);
  }
}
```
--------------------------------------------------------------------------------