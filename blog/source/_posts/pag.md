---
title: Vs Code之-pag预览拓展
date: 2024-12-31 10:16:42
tags:
cover: /img/common/t7.jpg
categories: Vs Code
---
# 开发流程
## vscode拓展是什么？都能够做什么？
vscode拓展是可以拓展VS Code编辑器功能、丰富编辑器用途的插件，能够提供编程效率，提升代码阅读体验，增强文本编辑功能
比如copilot、prettier、image preview、Git History、Code Runner等等
## 拓展如何下载/使用？
1. 通过Vs Code插件商店下载安装
> https://marketplace.visualstudio.com
2. 本地导入.vsix文件安装
![alt text](/img/pag/image-1.png)

## .pag动画文件预览商店地址
>https://marketplace.visualstudio.com/items?itemName=lantianhaijiao.pag-preview&ssr=false#review-details

## 下面进行详细的开发流程介绍，流程大致分为如下几个步骤
- 配置开发环境
- 调试
- package.json配置说明
- 快捷键配置
- 打包/发布
### 配置开发环境
- 安装脚手架yeoman
>https://code.visualstudio.com/api/get-started/your-first-extension

```
npm install -g yo
npm install -g generator-code
// 初始化项目
yo code
// yo模块全局安装后就安装了Yeoman，Yeoman是通用型项目脚手架工具，可以根据一套模板，生成一个对应的项目结构
// generator-code模块是VS Code扩展生成器，与yo配合使用才能构建项目。
提示如下
```

![alt text](/img/pag/image-2.png)
官方工具初始化完成后，直接调试，理论上就能看到效果了
### 调试
先编译
```
npm run compile
```
编译完新的窗口需要 reload
调试的时候用这个甲壳虫，不要右键run code
![alt text](/img/pag/image-3.png)
会弹出一个新的窗口，新窗口直接执行 cmd+shift+p选择命令(自己注册的命令)就会出现效果
或者使用注册的快捷键
### package.json配置说明
```
name: 项目名 
displayName: 插件名 
description: 插件描述 
version: 版本号 
keywords
publisher: 发布者id 
author: 作者 
engines>vscode: vscode版本 
categories: 类别 
activationEvents: 扩展的激活事件 
main: 主入口 
contributes>commands: 配置命令 
contributes>keybindings: 配置快捷键
contributes>commands: 配置命令
contributes>menus: 菜单配置
contributes>customEditors: 创建和注册自定义编辑器
keywords: 配置关键词--这个也挺重要，搜索的时候要用
```
### 快捷键配置
![alt text](/img/pag/image-4.png)
接受的密钥
![alt text](/img/pag/image-5.png)
### 打包/发布
- 安装vsce
npm i vsce -g
- 打包成vsix文件
vsce package
- 发布/审核页面
vsce login  xxx
vsce publish
发布分两种，一种是本地直接发布，另一种是商店网站发布
https://marketplace.visualstudio.com/
发布后，在商店页面会显示审核/结果状态
![alt text](/img/pag/image-6.png)
## pag文件预览
实现方案因人而异，本拓展在制作中想到了拓展+webview方式来实现，使用webview一来相对熟悉，二来自由度比较高
目录结构
![alt text](/img/pag/image-7.png)
- PAG-PREVIEW
    - dist                打包后的目录
    - src                 开发目录
        - plugins         插件目录
        - wbeview         webview相关(自定义)
        - extension.ts    主入口
    - gitignore
1. 识别打开的是.pag结尾的文件格式
2. 处理文件，输出给webview可访问的文件路径/buffer
3. 使用webview对文件处理，使用libpag库来解析pag进行播放
### 识别vscode打开了.pag结尾的文件
在extension.ts文件中导入
```
import PagPreview from './plugins/pag-preview';
export function activate(context: vscode.ExtensionContext) {
  fileSizeStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  context.subscriptions.push(PagPreview(context));
  context.subscriptions.push(FileSize(context, fileSizeStatusBarItem));
}
```
### 处理文件，输出给webview
在plugins目录下创建pag-preview.ts处理具体逻辑
```
import * as vscode from "vscode";
const path = require("path");
const fs = require("fs");
class PagCustomDocument implements vscode.CustomDocument {
  uri: vscode.Uri;

  constructor(uri: vscode.Uri) {
    this.uri = uri;
  }

  dispose(): void {
    // 如果需要清理资源，可以在这里实现
  }
}

class PagCustomEditorProvider
  implements vscode.CustomReadonlyEditorProvider<PagCustomDocument>
{
  public static readonly viewType = "pagViewer.editor";

  constructor(private readonly context: vscode.ExtensionContext) {}

  /**
   * openCustomDocument 方法，用于打开自定义文档
   */
  public openCustomDocument(
    uri: vscode.Uri,
    _openContext: vscode.CustomDocumentOpenContext,
    _token: vscode.CancellationToken
  ): vscode.CustomDocument | Thenable<vscode.CustomDocument> {
    // 创建并返回自定义文档实例
    return new PagCustomDocument(uri);
  }

  /**
   * resolveCustomEditor 方法，在文件被打开时触发
   */
  public async resolveCustomEditor(
    document: PagCustomDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    console.log(`Opening file: ${document.uri.fsPath}`);
    // vscode指令通信
    vscode.commands.executeCommand("pagViewer.fileDetail", document.uri);
    // 设置 Webview 选项
    webviewPanel.webview.options = {
      enableScripts: true,
      // localResourceRoots作用：防止 WebView 意外访问到插件不该访问的本地文件系统区域。只有处在 localResourceRoots 所列出的目录中的资源，才可以被 WebView 加载，这有助于保障用户系统的安全，避免恶意代码利用 WebView 越界访问敏感文件
      localResourceRoots: [
        vscode.Uri.file(path.join(this.context.extensionPath, "dist")),
        vscode.Uri.file(path.dirname(document.uri.fsPath)),
      ],
    };

    // 关键：将文件 URI 转为 Webview 可访问的路径
    const fileUri = webviewPanel.webview.asWebviewUri(document.uri);
    // console.log("uri--", fileUri.toString()); https://file%2B.vscode-resource.vscode-cdn.net/Users/xxx/vscode/pag-preview/dist/webview/pag.min.js
    const htmlPath = path.join(
      this.context.extensionPath,
      "dist/webview/pag.html"
    );
    // console.log("htmlPath", htmlPath);
    // 解析html内容
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    const fastDiffUri = webviewPanel.webview.asWebviewUri(
      vscode.Uri.file(
        path.join(this.context.extensionPath, "dist/webview/pag.min.js")
      )
    );
    const updatedHtmlContent = htmlContent.replace("./pag.min.js", fastDiffUri);
    // 设置 Webview 内容
    webviewPanel.webview.html = updatedHtmlContent;
    // 将文件内容发送到 Webview
    webviewPanel.webview.postMessage({
      type: "loadFile",
      fileUri: fileUri.toString(),
    });

    // 监听来自 Webview 的消息
    webviewPanel.webview.onDidReceiveMessage((message) => {
      if (message.command === "alert") {
        vscode.window.showInformationMessage(message.text);
      }
    });
    // 处理自定义编辑器生命周期
    webviewPanel.onDidDispose(() => {
      console.log('pag文件关闭');
      vscode.commands.executeCommand("pagViewer.fileDetail");
    });
  }
}
export default (context: vscode.ExtensionContext) => {
  console.log("PAG Custom Editor Activated!");

  let disposable = vscode.window.registerCustomEditorProvider(
    PagCustomEditorProvider.viewType,
    new PagCustomEditorProvider(context),
    {
      webviewOptions: {
        retainContextWhenHidden: false, // 切换标签时保留上下文
      },
    }
  );
  return disposable;
};
```
### 使用webview对文件处理进行播放
```
<div class="pag-player">
  <button onclick="playToggle()" class="pag-play">pause</button>
  <canvas class="pag-canvas"></canvas>
</div>

// 监听来自扩展的消息
  window.addEventListener('message', (event) => {
    const message = event.data;
    if (message.type === 'loadFile') {
      initPag(message.fileUri).catch((err) => {
        console.log('onError', err)
      })
    }
  });
  // 这一步根据需要进行解析,这里使用了libpag.min.js，自执行模式
  const PAGView = libpag.PAGView;
  const types = libpag.types;
  const pagCanvasEl = document.querySelector('.pag-canvas');
  let pagView = null;
  const renderingMode = types.RenderingMode.WebGL;
  const loadPag = async (url) => {
    let arrayBuffer;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      arrayBuffer = await response.arrayBuffer();
    } catch (error) {
      console.error("Failed to fetch resource as ArrayBuffer:", error);
    }
    return Promise.resolve(arrayBuffer)
  }
  const initPag = async (src) => {
    const pagBuffer = await loadPag(src).catch(err => console.warn(err))
    if (!pagBuffer) {
      console.log('onError')
      return
    }
    pagView = PAGView.init(pagBuffer, pagCanvasEl, {
      renderingMode: renderingMode == 'webgl' ? types.RenderingMode.WebGL : types.RenderingMode.Canvas2D,
      useScale: true
    });
    pagView.setRepeatCount(0);
    await pagView.play();
  }
  function play (){ pagView.play()};
  function pause (){ pagView.pause()};
  const pagPlayer = document.querySelector('.pag-player');
  const colors = {
    1: '#000',
    2: '#FFF',
    3: '#00bcd3'
  };
  let playStatus = true;
  const playRef = document.querySelector('.pag-play');
  function playToggle () {
    if (playStatus) {
      pause();
      playRef.innerText = 'play';
    } else {
      play();
      playRef.innerText = 'pause';
    }
    playStatus = !playStatus;
  }
  function changeBg (type) {
    pagPlayer.style.backgroundColor = colors[type];
  }
  ```

# 总结
 VS Code 扩展具备多重实用功能：一方面，它显著提升编程效率，例如借助智能补全、代码片段等特性，让代码编写更为流畅迅速，更加专注在编辑器内部
另一方面，VS Code 拓展各个功能模块界限清晰，相互协作又互不干扰。在 Vue 3 开发里，同样强调组件化，将页面拆分成一个个独立的组件，每个组件管理自己的状态、逻辑与视图，就像拓展中的一个个独立功能模块。这样做便于代码复用，开发某个功能组件时，能快速定位、修改，无需在大量代码中 “大海捞针”，提升开发效率与可维护性