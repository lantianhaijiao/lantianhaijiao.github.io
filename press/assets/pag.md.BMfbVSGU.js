import{_ as a,c as n,o as p,ae as e}from"./chunks/framework.CPIiAToz.js";const l="/press/assets/image-1.Ca1Kpliw.png",i="/press/assets/image-2.eCOqUL2D.png",t="/press/assets/image-3.DjnV5J-i.png",o="/press/assets/image-4.DcKTtia5.png",c="/press/assets/image-5.DpbAAFh7.png",r="/press/assets/image-6.5xPkExNN.png",u="/press/assets/image-7.CBxgmzCD.png",q=JSON.parse('{"title":"Vs Code之-pag预览拓展","description":"","frontmatter":{"title":"Vs Code之-pag预览拓展","date":"2024-12-31T10:16:42.000Z","tags":null,"cover":"/img/common/t7.jpg","categories":"Vs Code"},"headers":[],"relativePath":"pag.md","filePath":"pag.md"}'),d={name:"pag.md"};function g(m,s,h,v,b,w){return p(),n("div",null,s[0]||(s[0]=[e('<h1 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h1><blockquote><p>最令人雀跃的永远是假期来临前的期待，而非假期本身。</p></blockquote><h1 id="开发流程" tabindex="-1">开发流程 <a class="header-anchor" href="#开发流程" aria-label="Permalink to &quot;开发流程&quot;">​</a></h1><h2 id="vscode拓展是什么-都能够做什么" tabindex="-1">vscode拓展是什么？都能够做什么？ <a class="header-anchor" href="#vscode拓展是什么-都能够做什么" aria-label="Permalink to &quot;vscode拓展是什么？都能够做什么？&quot;">​</a></h2><p>vscode拓展是可以拓展VS Code编辑器功能、丰富编辑器用途的插件，能够提供编程效率，提升代码阅读体验，增强文本编辑功能 比如copilot、prettier、image preview、Git History、Code Runner等等</p><h2 id="拓展如何下载-使用" tabindex="-1">拓展如何下载/使用？ <a class="header-anchor" href="#拓展如何下载-使用" aria-label="Permalink to &quot;拓展如何下载/使用？&quot;">​</a></h2><ol><li>通过Vs Code插件商店下载安装</li></ol><blockquote><p><a href="https://marketplace.visualstudio.com" target="_blank" rel="noreferrer">https://marketplace.visualstudio.com</a></p></blockquote><ol start="2"><li>本地导入.vsix文件安装 <img src="'+l+`" alt="alt text"></li></ol><h2 id="pag动画文件预览商店地址" tabindex="-1">.pag动画文件预览商店地址 <a class="header-anchor" href="#pag动画文件预览商店地址" aria-label="Permalink to &quot;.pag动画文件预览商店地址&quot;">​</a></h2><blockquote><p><a href="https://marketplace.visualstudio.com/items?itemName=lantianhaijiao.pag-preview&amp;ssr=false#review-details" target="_blank" rel="noreferrer">https://marketplace.visualstudio.com/items?itemName=lantianhaijiao.pag-preview&amp;ssr=false#review-details</a></p></blockquote><h2 id="下面进行详细的开发流程介绍-流程大致分为如下几个步骤" tabindex="-1">下面进行详细的开发流程介绍，流程大致分为如下几个步骤 <a class="header-anchor" href="#下面进行详细的开发流程介绍-流程大致分为如下几个步骤" aria-label="Permalink to &quot;下面进行详细的开发流程介绍，流程大致分为如下几个步骤&quot;">​</a></h2><ul><li>配置开发环境</li><li>调试</li><li>package.json配置说明</li><li>快捷键配置</li><li>打包/发布</li></ul><h3 id="配置开发环境" tabindex="-1">配置开发环境 <a class="header-anchor" href="#配置开发环境" aria-label="Permalink to &quot;配置开发环境&quot;">​</a></h3><ul><li>安装脚手架yeoman</li></ul><blockquote><p><a href="https://code.visualstudio.com/api/get-started/your-first-extension" target="_blank" rel="noreferrer">https://code.visualstudio.com/api/get-started/your-first-extension</a></p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install -g yo</span></span>
<span class="line"><span>npm install -g generator-code</span></span>
<span class="line"><span>// 初始化项目</span></span>
<span class="line"><span>yo code</span></span>
<span class="line"><span>// yo模块全局安装后就安装了Yeoman，Yeoman是通用型项目脚手架工具，可以根据一套模板，生成一个对应的项目结构</span></span>
<span class="line"><span>// generator-code模块是VS Code扩展生成器，与yo配合使用才能构建项目。</span></span>
<span class="line"><span>提示如下</span></span></code></pre></div><p><img src="`+i+'" alt="alt text"> 官方工具初始化完成后，直接调试，理论上就能看到效果了</p><h3 id="调试" tabindex="-1">调试 <a class="header-anchor" href="#调试" aria-label="Permalink to &quot;调试&quot;">​</a></h3><p>先编译</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm run compile</span></span></code></pre></div><p>编译完新的窗口需要 reload 调试的时候用这个甲壳虫，不要右键run code <img src="'+t+`" alt="alt text"> 会弹出一个新的窗口，新窗口直接执行 cmd+shift+p选择命令(自己注册的命令)就会出现效果 或者使用注册的快捷键</p><h3 id="package-json配置说明" tabindex="-1">package.json配置说明 <a class="header-anchor" href="#package-json配置说明" aria-label="Permalink to &quot;package.json配置说明&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>name: 项目名 </span></span>
<span class="line"><span>displayName: 插件名 </span></span>
<span class="line"><span>description: 插件描述 </span></span>
<span class="line"><span>version: 版本号 </span></span>
<span class="line"><span>keywords</span></span>
<span class="line"><span>publisher: 发布者id </span></span>
<span class="line"><span>author: 作者 </span></span>
<span class="line"><span>engines&gt;vscode: vscode版本 </span></span>
<span class="line"><span>categories: 类别 </span></span>
<span class="line"><span>activationEvents: 扩展的激活事件 </span></span>
<span class="line"><span>main: 主入口 </span></span>
<span class="line"><span>contributes&gt;commands: 配置命令 </span></span>
<span class="line"><span>contributes&gt;keybindings: 配置快捷键</span></span>
<span class="line"><span>contributes&gt;commands: 配置命令</span></span>
<span class="line"><span>contributes&gt;menus: 菜单配置</span></span>
<span class="line"><span>contributes&gt;customEditors: 创建和注册自定义编辑器</span></span>
<span class="line"><span>keywords: 配置关键词--这个也挺重要，搜索的时候要用</span></span></code></pre></div><h3 id="快捷键配置" tabindex="-1">快捷键配置 <a class="header-anchor" href="#快捷键配置" aria-label="Permalink to &quot;快捷键配置&quot;">​</a></h3><p><img src="`+o+'" alt="alt text"> 接受的密钥 <img src="'+c+'" alt="alt text"></p><h3 id="打包-发布" tabindex="-1">打包/发布 <a class="header-anchor" href="#打包-发布" aria-label="Permalink to &quot;打包/发布&quot;">​</a></h3><ul><li>安装vsce npm i vsce -g</li><li>打包成vsix文件 vsce package</li><li>发布/审核页面 vsce login xxx vsce publish 发布分两种，一种是本地直接发布，另一种是商店网站发布 <a href="https://marketplace.visualstudio.com/" target="_blank" rel="noreferrer">https://marketplace.visualstudio.com/</a> 发布后，在商店页面会显示审核/结果状态 <img src="'+r+'" alt="alt text"></li></ul><h2 id="pag文件预览" tabindex="-1">pag文件预览 <a class="header-anchor" href="#pag文件预览" aria-label="Permalink to &quot;pag文件预览&quot;">​</a></h2><p>实现方案因人而异，本拓展在制作中想到了拓展+webview方式来实现，使用webview一来相对熟悉，二来自由度比较高 目录结构 <img src="'+u+`" alt="alt text"></p><ul><li>PAG-PREVIEW <ul><li>dist 打包后的目录</li><li>src 开发目录 <ul><li>plugins 插件目录</li><li>wbeview webview相关(自定义)</li><li>extension.ts 主入口</li></ul></li><li>gitignore</li></ul></li></ul><ol><li>识别打开的是.pag结尾的文件格式</li><li>处理文件，输出给webview可访问的文件路径/buffer</li><li>使用webview对文件处理，使用libpag库来解析pag进行播放</li></ol><h3 id="识别vscode打开了-pag结尾的文件" tabindex="-1">识别vscode打开了.pag结尾的文件 <a class="header-anchor" href="#识别vscode打开了-pag结尾的文件" aria-label="Permalink to &quot;识别vscode打开了.pag结尾的文件&quot;">​</a></h3><p>在extension.ts文件中导入</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import PagPreview from &#39;./plugins/pag-preview&#39;;</span></span>
<span class="line"><span>export function activate(context: vscode.ExtensionContext) {</span></span>
<span class="line"><span>  fileSizeStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);</span></span>
<span class="line"><span>  context.subscriptions.push(PagPreview(context));</span></span>
<span class="line"><span>  context.subscriptions.push(FileSize(context, fileSizeStatusBarItem));</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="处理文件-输出给webview" tabindex="-1">处理文件，输出给webview <a class="header-anchor" href="#处理文件-输出给webview" aria-label="Permalink to &quot;处理文件，输出给webview&quot;">​</a></h3><p>在plugins目录下创建pag-preview.ts处理具体逻辑</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import * as vscode from &quot;vscode&quot;;</span></span>
<span class="line"><span>const path = require(&quot;path&quot;);</span></span>
<span class="line"><span>const fs = require(&quot;fs&quot;);</span></span>
<span class="line"><span>class PagCustomDocument implements vscode.CustomDocument {</span></span>
<span class="line"><span>  uri: vscode.Uri;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  constructor(uri: vscode.Uri) {</span></span>
<span class="line"><span>    this.uri = uri;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  dispose(): void {</span></span>
<span class="line"><span>    // 如果需要清理资源，可以在这里实现</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class PagCustomEditorProvider</span></span>
<span class="line"><span>  implements vscode.CustomReadonlyEditorProvider&lt;PagCustomDocument&gt;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  public static readonly viewType = &quot;pagViewer.editor&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  constructor(private readonly context: vscode.ExtensionContext) {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * openCustomDocument 方法，用于打开自定义文档</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  public openCustomDocument(</span></span>
<span class="line"><span>    uri: vscode.Uri,</span></span>
<span class="line"><span>    _openContext: vscode.CustomDocumentOpenContext,</span></span>
<span class="line"><span>    _token: vscode.CancellationToken</span></span>
<span class="line"><span>  ): vscode.CustomDocument | Thenable&lt;vscode.CustomDocument&gt; {</span></span>
<span class="line"><span>    // 创建并返回自定义文档实例</span></span>
<span class="line"><span>    return new PagCustomDocument(uri);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * resolveCustomEditor 方法，在文件被打开时触发</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  public async resolveCustomEditor(</span></span>
<span class="line"><span>    document: PagCustomDocument,</span></span>
<span class="line"><span>    webviewPanel: vscode.WebviewPanel,</span></span>
<span class="line"><span>    _token: vscode.CancellationToken</span></span>
<span class="line"><span>  ): Promise&lt;void&gt; {</span></span>
<span class="line"><span>    console.log(\`Opening file: \${document.uri.fsPath}\`);</span></span>
<span class="line"><span>    // vscode指令通信</span></span>
<span class="line"><span>    vscode.commands.executeCommand(&quot;pagViewer.fileDetail&quot;, document.uri);</span></span>
<span class="line"><span>    // 设置 Webview 选项</span></span>
<span class="line"><span>    webviewPanel.webview.options = {</span></span>
<span class="line"><span>      enableScripts: true,</span></span>
<span class="line"><span>      // localResourceRoots作用：防止 WebView 意外访问到插件不该访问的本地文件系统区域。只有处在 localResourceRoots 所列出的目录中的资源，才可以被 WebView 加载，这有助于保障用户系统的安全，避免恶意代码利用 WebView 越界访问敏感文件</span></span>
<span class="line"><span>      localResourceRoots: [</span></span>
<span class="line"><span>        vscode.Uri.file(path.join(this.context.extensionPath, &quot;dist&quot;)),</span></span>
<span class="line"><span>        vscode.Uri.file(path.dirname(document.uri.fsPath)),</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 关键：将文件 URI 转为 Webview 可访问的路径</span></span>
<span class="line"><span>    const fileUri = webviewPanel.webview.asWebviewUri(document.uri);</span></span>
<span class="line"><span>    // console.log(&quot;uri--&quot;, fileUri.toString()); https://file%2B.vscode-resource.vscode-cdn.net/Users/xxx/vscode/pag-preview/dist/webview/pag.min.js</span></span>
<span class="line"><span>    const htmlPath = path.join(</span></span>
<span class="line"><span>      this.context.extensionPath,</span></span>
<span class="line"><span>      &quot;dist/webview/pag.html&quot;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>    // console.log(&quot;htmlPath&quot;, htmlPath);</span></span>
<span class="line"><span>    // 解析html内容</span></span>
<span class="line"><span>    const htmlContent = fs.readFileSync(htmlPath, &quot;utf-8&quot;);</span></span>
<span class="line"><span>    const fastDiffUri = webviewPanel.webview.asWebviewUri(</span></span>
<span class="line"><span>      vscode.Uri.file(</span></span>
<span class="line"><span>        path.join(this.context.extensionPath, &quot;dist/webview/pag.min.js&quot;)</span></span>
<span class="line"><span>      )</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>    const updatedHtmlContent = htmlContent.replace(&quot;./pag.min.js&quot;, fastDiffUri);</span></span>
<span class="line"><span>    // 设置 Webview 内容</span></span>
<span class="line"><span>    webviewPanel.webview.html = updatedHtmlContent;</span></span>
<span class="line"><span>    // 将文件内容发送到 Webview</span></span>
<span class="line"><span>    webviewPanel.webview.postMessage({</span></span>
<span class="line"><span>      type: &quot;loadFile&quot;,</span></span>
<span class="line"><span>      fileUri: fileUri.toString(),</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 监听来自 Webview 的消息</span></span>
<span class="line"><span>    webviewPanel.webview.onDidReceiveMessage((message) =&gt; {</span></span>
<span class="line"><span>      if (message.command === &quot;alert&quot;) {</span></span>
<span class="line"><span>        vscode.window.showInformationMessage(message.text);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    // 处理自定义编辑器生命周期</span></span>
<span class="line"><span>    webviewPanel.onDidDispose(() =&gt; {</span></span>
<span class="line"><span>      console.log(&#39;pag文件关闭&#39;);</span></span>
<span class="line"><span>      vscode.commands.executeCommand(&quot;pagViewer.fileDetail&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export default (context: vscode.ExtensionContext) =&gt; {</span></span>
<span class="line"><span>  console.log(&quot;PAG Custom Editor Activated!&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let disposable = vscode.window.registerCustomEditorProvider(</span></span>
<span class="line"><span>    PagCustomEditorProvider.viewType,</span></span>
<span class="line"><span>    new PagCustomEditorProvider(context),</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      webviewOptions: {</span></span>
<span class="line"><span>        retainContextWhenHidden: false, // 切换标签时保留上下文</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>  return disposable;</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="使用webview对文件处理进行播放" tabindex="-1">使用webview对文件处理进行播放 <a class="header-anchor" href="#使用webview对文件处理进行播放" aria-label="Permalink to &quot;使用webview对文件处理进行播放&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;pag-player&quot;&gt;</span></span>
<span class="line"><span>  &lt;button onclick=&quot;playToggle()&quot; class=&quot;pag-play&quot;&gt;pause&lt;/button&gt;</span></span>
<span class="line"><span>  &lt;canvas class=&quot;pag-canvas&quot;&gt;&lt;/canvas&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 监听来自扩展的消息</span></span>
<span class="line"><span>  window.addEventListener(&#39;message&#39;, (event) =&gt; {</span></span>
<span class="line"><span>    const message = event.data;</span></span>
<span class="line"><span>    if (message.type === &#39;loadFile&#39;) {</span></span>
<span class="line"><span>      initPag(message.fileUri).catch((err) =&gt; {</span></span>
<span class="line"><span>        console.log(&#39;onError&#39;, err)</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  // 这一步根据需要进行解析,这里使用了libpag.min.js，自执行模式</span></span>
<span class="line"><span>  const PAGView = libpag.PAGView;</span></span>
<span class="line"><span>  const types = libpag.types;</span></span>
<span class="line"><span>  const pagCanvasEl = document.querySelector(&#39;.pag-canvas&#39;);</span></span>
<span class="line"><span>  let pagView = null;</span></span>
<span class="line"><span>  const renderingMode = types.RenderingMode.WebGL;</span></span>
<span class="line"><span>  const loadPag = async (url) =&gt; {</span></span>
<span class="line"><span>    let arrayBuffer;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>      const response = await fetch(url);</span></span>
<span class="line"><span>      if (!response.ok) {</span></span>
<span class="line"><span>        throw new Error(\`HTTP error! Status: \${response.status}\`);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      arrayBuffer = await response.arrayBuffer();</span></span>
<span class="line"><span>    } catch (error) {</span></span>
<span class="line"><span>      console.error(&quot;Failed to fetch resource as ArrayBuffer:&quot;, error);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return Promise.resolve(arrayBuffer)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  const initPag = async (src) =&gt; {</span></span>
<span class="line"><span>    const pagBuffer = await loadPag(src).catch(err =&gt; console.warn(err))</span></span>
<span class="line"><span>    if (!pagBuffer) {</span></span>
<span class="line"><span>      console.log(&#39;onError&#39;)</span></span>
<span class="line"><span>      return</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    pagView = PAGView.init(pagBuffer, pagCanvasEl, {</span></span>
<span class="line"><span>      renderingMode: renderingMode == &#39;webgl&#39; ? types.RenderingMode.WebGL : types.RenderingMode.Canvas2D,</span></span>
<span class="line"><span>      useScale: true</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    pagView.setRepeatCount(0);</span></span>
<span class="line"><span>    await pagView.play();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  function play (){ pagView.play()};</span></span>
<span class="line"><span>  function pause (){ pagView.pause()};</span></span>
<span class="line"><span>  const pagPlayer = document.querySelector(&#39;.pag-player&#39;);</span></span>
<span class="line"><span>  const colors = {</span></span>
<span class="line"><span>    1: &#39;#000&#39;,</span></span>
<span class="line"><span>    2: &#39;#FFF&#39;,</span></span>
<span class="line"><span>    3: &#39;#00bcd3&#39;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  let playStatus = true;</span></span>
<span class="line"><span>  const playRef = document.querySelector(&#39;.pag-play&#39;);</span></span>
<span class="line"><span>  function playToggle () {</span></span>
<span class="line"><span>    if (playStatus) {</span></span>
<span class="line"><span>      pause();</span></span>
<span class="line"><span>      playRef.innerText = &#39;play&#39;;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      play();</span></span>
<span class="line"><span>      playRef.innerText = &#39;pause&#39;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    playStatus = !playStatus;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  function changeBg (type) {</span></span>
<span class="line"><span>    pagPlayer.style.backgroundColor = colors[type];</span></span>
<span class="line"><span>  }</span></span></code></pre></div><h1 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h1><p>VS Code 扩展具备多重实用功能：一方面，它显著提升编程效率，例如借助智能补全、代码片段等特性，让代码编写更为流畅迅速，更加专注在编辑器内部 另一方面，VS Code 拓展各个功能模块界限清晰，相互协作又互不干扰。在 Vue 3 开发里，同样强调组件化，将页面拆分成一个个独立的组件，每个组件管理自己的状态、逻辑与视图，就像拓展中的一个个独立功能模块。这样做便于代码复用，开发某个功能组件时，能快速定位、修改，无需在大量代码中 “大海捞针”，提升开发效率与可维护性</p>`,42)]))}const x=a(d,[["render",g]]);export{q as __pageData,x as default};
