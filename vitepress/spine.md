---
title: Vs Code之-spine预览拓展
date: 2025-04-03 09:39:29
tags:
cover: /img/common/t19.jpeg
categories: Vs Code
---

---
> 在前一篇关于VS Code拓展开发的文章中，我们已详细探讨了拓展开发的完整流程。那么，此次我们将直接切入重点——Spine动画预览功能的实现。

如今，能够播放Spine动画的引擎种类繁多，诸如Cocos、Pixi、Unity、Galacean、Phaser等等。在本次开发的拓展中，我们选用了Pixi.js引擎来达成Spine动画的预览效果，接下来就为大家详细道来。
---

## Spine动画文件预览商店地址
> https://marketplace.visualstudio.com/items?itemName=lantianhaijiao.spine-preview

## 下面进行功能实现流程介绍，流程大致分为如下几个步骤
- 方案拟定：spine有三个文件,一般为.json,.atlas(或者.atlas.txt),.png，那么选中哪个文件进行预览呢?
- 拓展+webview方式实现
- Vs Code读取文件，把路径传递给Webview处理

## 方案拟定
- 无论打开哪个文件结尾，都有个问题，可能误判，因为这几个文件在其他业务中也有存在，所以更好的方案是右键文件夹，让用户手动指定来预览
- 在package.json中指定：右键文件夹的时候开启指令，显示【播放spine】
![alt text](/img/spine/image-1.png)
```
"explorer/context": [
  {
    "command": "spine.preview",
    "group": "navigation",
    "when": "explorerResourceIsFolder"
  }
]
```
## 拓展+webview方式实现

| 步骤 | 操作内容 |
| ---- | ---- |
| 1 | 方案确定 |
| 2 | 读取右键目录<br> - 要求目录同时包含 `.json`、`.atlas`、`.png` 文件<br> - 读取这三个文件 |
| 3 | 传递文件给webview处理 |

- ### 读取文件
```
 // 获取文件的基本信息
const filePath = uri.fsPath;
const jsonFiles: string[] = [];
const atlasFiles: string[] = [];

// 遍历文件夹，找出 JSON 和 ATLAS 文件
function traverseDir(dir: string) {
  const files = fs.readdirSync(dir);
  files.forEach((file: any) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      traverseDir(filePath);
    } else {
      const ext = path.extname(file);
      if (ext === ".json") {
        jsonFiles.push(filePath);
      } else if (ext === ".atlas") {
        atlasFiles.push(filePath);
      }
    }
  });
}
traverseDir(filePath);
// 简单选择第一个匹配的 JSON 和 ATLAS 文件（实际可优化为用户选择）
const jsonPath = jsonFiles[0];
const atlasPath = atlasFiles.find(
  (atlas) =>
    path.basename(atlas, ".atlas") === path.basename(jsonPath, ".json")
);
```
##### 如果没有匹配到文件，提示错误
```
if (jsonPath && atlasPath){
  // 正常处理
} else {
  vscode.window.showErrorMessage(
    "在文件夹中未找到匹配的 Spine JSON 和 ATLAS 文件。" // [!code focus]
  );
}
```
- ### webview拿到文件后，使用pixi.js+pixi-spine来处理播放功能

| 步骤 | 操作内容 |
| ---- | ---- |
| 1 | 监听消息，拿到json和atlas，其实pixi-spine只需要json就好，还有其他版本的spine-pixi-v7需要atlas |
| 2 | 初始化pixi和spine，读取所有动画，默认给播放第一个动画 |
| 3 | 读取动画信息，方便直接查看 |

- 监听来自扩展的消息
```
// 监听来自扩展的消息
window.addEventListener("message", (event) => {
  const message = event.data;
  // console.log('message--', event.data);
  if (message.type === "loadFile") {
    init(message.json, message.atlas).catch((err) => {
      console.log("onError", err);
    });
  }
});
```
- 初始化pixi和spine
```
async function init(json, atlas) {
  // app = new window.PIXI.Application();
  // console.log("app", app, window.spine);
  // await app.init({
  //   // backgroundColor: 0x1099bb,
  //   backgroundAlpha: 0,
  //   resizeTo: window,
  //   antialias: true,
  //   autoDensity: true,
  // });
  app = new window.PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: window,
    antialias: true,
    autoDensity: true,
  });
  document.getElementById("animation-player").appendChild(this.app.view);
  playSpine(json, atlas);
}
```
- 播放spine，获取动画信息
```
async function playSpine(json, atlas) {
  // // pixi8 加载 Spine 资源
  // PIXI.Assets.add({
  //   alias: "spineData",
  //   src: json,
  // });
  // PIXI.Assets.add({
  //   alias: "spineAtlas",
  //   src: atlas,
  // });
  // await PIXI.Assets.load(["spineData", "spineAtlas"]);

  // const spineBody = window.spine.Spine.from({
  //   atlas: "spineAtlas",
  //   skeleton: "spineData",
  //   scale: 0.5,
  // });
  const res = await PIXI.Assets.load(json);
  const spineBody = new PIXI.spine.Spine(res.spineData);
  spineBody.state.data.defaultMix = 0.2;
  spineBody.x = window.innerWidth / 2;
  app.stage.addChild(spineBody);
  // 获取 Spine 动画的宽高
  setTimeout(() => {
    const spineInfo = spineBody.getBounds();
    spineBody.y = window.innerHeight / 2 + +spineInfo.height / 2;
    const width = spineInfo.width;
    const height = spineInfo.height;
    console.log("spineInfo", spineBody.getBounds(), spineBody);
    console.table({
      width: spineBody.width,
      height: spineBody.height,
      x: spineBody.x,
      y: spineBody.y,
    });
    // 获取 Spine 要求的版本
    const spineVersion = spineBody.stateData.skeletonData.version;
    console.log("Spine 要求的版本:", spineVersion);
    console.log("所有动画", spineBody.skeleton.data.animations);
    // 更新spine信息
    const infoDiv = document.getElementById("normal-info");
    infoDiv.innerHTML = `
      <div class='item'><span>width: </span>${width}</div>
      <div class='item'><span>height: </span>${height}</div>
      <div class='item'><span>x: </span>${spineInfo.x}</div>
      <div class='item'><span>y: </span>${spineInfo.y}</div>
      <div class='item'><span>version: </span>${spineVersion}</div>
    `;
  }, 0);
  getAllAnimations(spineBody);
}
```
- 获取所有动画，添加到选择框，方便用户选择任意动画播放
```
async function getAllAnimations(spineBody) {
  // 获取所有动画名称
  const duration = document.querySelector(".duration");
  const animations = spineBody.skeleton.data.animations;
  const animationNames = [];
  animations.forEach((animation) => {
    animationNames.push(animation.name);
  });

  // 创建 select 选择框
  const selector = document.getElementById("animationSelector");
  animationNames.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    selector.appendChild(option);
  });
  // 播放第一个动画
  if (animationNames.length > 0) {
    spineBody.state.setAnimation(0, animationNames[0], true);
    duration.innerHTML = `<span>duration: </span>${animations[0].duration}`;
  }
  // 监听选择事件
  selector.addEventListener("change", (event) => {
    const selectedAnimation = event.target.value;
    spineBody.state.setAnimation(0, selectedAnimation, true);
    const r = animations.find((k) => k.name == selectedAnimation);
    duration.innerHTML = `<span>duration: </span>${r.duration}`;
  });
  setSpineY(spineBody);
  setScale(spineBody);
}
```

### 源码开放，期待共探
👉 [spine - preview源码](https://github.com/lantianhaijiao/spine-preview) 👈