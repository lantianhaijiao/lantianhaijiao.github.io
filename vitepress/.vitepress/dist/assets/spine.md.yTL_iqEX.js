import{_ as n,c as a,o as p,ae as e}from"./chunks/framework.CPIiAToz.js";const i="/press/assets/image-1.BeknGolo.png",g=JSON.parse('{"title":"Vs Code之-spine预览拓展","description":"","frontmatter":{"title":"Vs Code之-spine预览拓展","date":"2025-04-03T09:39:29.000Z","tags":null,"cover":"/img/common/t19.jpeg","categories":"Vs Code"},"headers":[],"relativePath":"spine.md","filePath":"spine.md"}'),t={name:"spine.md"};function l(o,s,c,d,r,u){return p(),a("div",null,s[0]||(s[0]=[e('<hr><blockquote><p>在前一篇关于VS Code拓展开发的文章中，我们已详细探讨了拓展开发的完整流程。那么，此次我们将直接切入重点——Spine动画预览功能的实现。</p></blockquote><h2 id="如今-能够播放spine动画的引擎种类繁多-诸如cocos、pixi、unity、galacean、phaser等等。在本次开发的拓展中-我们选用了pixi-js引擎来达成spine动画的预览效果-接下来就为大家详细道来。" tabindex="-1">如今，能够播放Spine动画的引擎种类繁多，诸如Cocos、Pixi、Unity、Galacean、Phaser等等。在本次开发的拓展中，我们选用了Pixi.js引擎来达成Spine动画的预览效果，接下来就为大家详细道来。 <a class="header-anchor" href="#如今-能够播放spine动画的引擎种类繁多-诸如cocos、pixi、unity、galacean、phaser等等。在本次开发的拓展中-我们选用了pixi-js引擎来达成spine动画的预览效果-接下来就为大家详细道来。" aria-label="Permalink to &quot;如今，能够播放Spine动画的引擎种类繁多，诸如Cocos、Pixi、Unity、Galacean、Phaser等等。在本次开发的拓展中，我们选用了Pixi.js引擎来达成Spine动画的预览效果，接下来就为大家详细道来。&quot;">​</a></h2><h2 id="spine动画文件预览商店地址" tabindex="-1">Spine动画文件预览商店地址 <a class="header-anchor" href="#spine动画文件预览商店地址" aria-label="Permalink to &quot;Spine动画文件预览商店地址&quot;">​</a></h2><blockquote><p><a href="https://marketplace.visualstudio.com/items?itemName=lantianhaijiao.spine-preview" target="_blank" rel="noreferrer">https://marketplace.visualstudio.com/items?itemName=lantianhaijiao.spine-preview</a></p></blockquote><h2 id="下面进行功能实现流程介绍-流程大致分为如下几个步骤" tabindex="-1">下面进行功能实现流程介绍，流程大致分为如下几个步骤 <a class="header-anchor" href="#下面进行功能实现流程介绍-流程大致分为如下几个步骤" aria-label="Permalink to &quot;下面进行功能实现流程介绍，流程大致分为如下几个步骤&quot;">​</a></h2><ul><li>方案拟定：spine有三个文件,一般为.json,.atlas(或者.atlas.txt),.png，那么选中哪个文件进行预览呢?</li><li>拓展+webview方式实现</li><li>Vs Code读取文件，把路径传递给Webview处理</li></ul><h2 id="方案拟定" tabindex="-1">方案拟定 <a class="header-anchor" href="#方案拟定" aria-label="Permalink to &quot;方案拟定&quot;">​</a></h2><ul><li>无论打开哪个文件结尾，都有个问题，可能误判，因为这几个文件在其他业务中也有存在，所以更好的方案是右键文件夹，让用户手动指定来预览</li><li>在package.json中指定：右键文件夹的时候开启指令，显示【播放spine】 <img src="'+i+`" alt="alt text"></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;explorer/context&quot;: [</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    &quot;command&quot;: &quot;spine.preview&quot;,</span></span>
<span class="line"><span>    &quot;group&quot;: &quot;navigation&quot;,</span></span>
<span class="line"><span>    &quot;when&quot;: &quot;explorerResourceIsFolder&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>]</span></span></code></pre></div><h2 id="拓展-webview方式实现" tabindex="-1">拓展+webview方式实现 <a class="header-anchor" href="#拓展-webview方式实现" aria-label="Permalink to &quot;拓展+webview方式实现&quot;">​</a></h2><table tabindex="0"><thead><tr><th>步骤</th><th>操作内容</th></tr></thead><tbody><tr><td>1</td><td>方案确定</td></tr><tr><td>2</td><td>读取右键目录<br> - 要求目录同时包含 <code>.json</code>、<code>.atlas</code>、<code>.png</code> 文件<br> - 读取这三个文件</td></tr><tr><td>3</td><td>传递文件给webview处理</td></tr></tbody></table><ul><li><h3 id="读取文件" tabindex="-1">读取文件 <a class="header-anchor" href="#读取文件" aria-label="Permalink to &quot;读取文件&quot;">​</a></h3></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> // 获取文件的基本信息</span></span>
<span class="line"><span>const filePath = uri.fsPath;</span></span>
<span class="line"><span>const jsonFiles: string[] = [];</span></span>
<span class="line"><span>const atlasFiles: string[] = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 遍历文件夹，找出 JSON 和 ATLAS 文件</span></span>
<span class="line"><span>function traverseDir(dir: string) {</span></span>
<span class="line"><span>  const files = fs.readdirSync(dir);</span></span>
<span class="line"><span>  files.forEach((file: any) =&gt; {</span></span>
<span class="line"><span>    const filePath = path.join(dir, file);</span></span>
<span class="line"><span>    const stats = fs.statSync(filePath);</span></span>
<span class="line"><span>    if (stats.isDirectory()) {</span></span>
<span class="line"><span>      traverseDir(filePath);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      const ext = path.extname(file);</span></span>
<span class="line"><span>      if (ext === &quot;.json&quot;) {</span></span>
<span class="line"><span>        jsonFiles.push(filePath);</span></span>
<span class="line"><span>      } else if (ext === &quot;.atlas&quot;) {</span></span>
<span class="line"><span>        atlasFiles.push(filePath);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>traverseDir(filePath);</span></span>
<span class="line"><span>// 简单选择第一个匹配的 JSON 和 ATLAS 文件（实际可优化为用户选择）</span></span>
<span class="line"><span>const jsonPath = jsonFiles[0];</span></span>
<span class="line"><span>const atlasPath = atlasFiles.find(</span></span>
<span class="line"><span>  (atlas) =&gt;</span></span>
<span class="line"><span>    path.basename(atlas, &quot;.atlas&quot;) === path.basename(jsonPath, &quot;.json&quot;)</span></span>
<span class="line"><span>);</span></span></code></pre></div><h5 id="如果没有匹配到文件-提示错误" tabindex="-1">如果没有匹配到文件，提示错误 <a class="header-anchor" href="#如果没有匹配到文件-提示错误" aria-label="Permalink to &quot;如果没有匹配到文件，提示错误&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (jsonPath &amp;&amp; atlasPath){</span></span>
<span class="line"><span>  // 正常处理</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  vscode.window.showErrorMessage(</span></span>
<span class="line"><span>    &quot;在文件夹中未找到匹配的 Spine JSON 和 ATLAS 文件。&quot;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><h3 id="webview拿到文件后-使用pixi-js-pixi-spine来处理播放功能" tabindex="-1">webview拿到文件后，使用pixi.js+pixi-spine来处理播放功能 <a class="header-anchor" href="#webview拿到文件后-使用pixi-js-pixi-spine来处理播放功能" aria-label="Permalink to &quot;webview拿到文件后，使用pixi.js+pixi-spine来处理播放功能&quot;">​</a></h3></li></ul><table tabindex="0"><thead><tr><th>步骤</th><th>操作内容</th></tr></thead><tbody><tr><td>1</td><td>监听消息，拿到json和atlas，其实pixi-spine只需要json就好，还有其他版本的spine-pixi-v7需要atlas</td></tr><tr><td>2</td><td>初始化pixi和spine，读取所有动画，默认给播放第一个动画</td></tr><tr><td>3</td><td>读取动画信息，方便直接查看</td></tr></tbody></table><ul><li>监听来自扩展的消息</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 监听来自扩展的消息</span></span>
<span class="line"><span>window.addEventListener(&quot;message&quot;, (event) =&gt; {</span></span>
<span class="line"><span>  const message = event.data;</span></span>
<span class="line"><span>  // console.log(&#39;message--&#39;, event.data);</span></span>
<span class="line"><span>  if (message.type === &quot;loadFile&quot;) {</span></span>
<span class="line"><span>    init(message.json, message.atlas).catch((err) =&gt; {</span></span>
<span class="line"><span>      console.log(&quot;onError&quot;, err);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span></code></pre></div><ul><li>初始化pixi和spine</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async function init(json, atlas) {</span></span>
<span class="line"><span>  // app = new window.PIXI.Application();</span></span>
<span class="line"><span>  // console.log(&quot;app&quot;, app, window.spine);</span></span>
<span class="line"><span>  // await app.init({</span></span>
<span class="line"><span>  //</span><span>   // backgroundColor: 0x1099bb,</span></span>
<span class="line"><span>  //   backgroundAlpha: 0,</span></span>
<span class="line"><span>  //   resizeTo: window,</span></span>
<span class="line"><span>  //   antialias: true,</span></span>
<span class="line"><span>  //   autoDensity: true,</span></span>
<span class="line"><span>  // });</span></span>
<span class="line"><span>  app = new window.PIXI.Application({</span></span>
<span class="line"><span>    backgroundAlpha: 0,</span></span>
<span class="line"><span>    resizeTo: window,</span></span>
<span class="line"><span>    antialias: true,</span></span>
<span class="line"><span>    autoDensity: true,</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  document.getElementById(&quot;animation-player&quot;).appendChild(this.app.view);</span></span>
<span class="line"><span>  playSpine(json, atlas);</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>播放spine，获取动画信息</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async function playSpine(json, atlas) {</span></span>
<span class="line"><span>  //</span><span> // pixi8 加载 Spine 资源</span></span>
<span class="line"><span>  // PIXI.Assets.add({</span></span>
<span class="line"><span>  //   alias: &quot;spineData&quot;,</span></span>
<span class="line"><span>  //   src: json,</span></span>
<span class="line"><span>  // });</span></span>
<span class="line"><span>  // PIXI.Assets.add({</span></span>
<span class="line"><span>  //   alias: &quot;spineAtlas&quot;,</span></span>
<span class="line"><span>  //   src: atlas,</span></span>
<span class="line"><span>  // });</span></span>
<span class="line"><span>  // await PIXI.Assets.load([&quot;spineData&quot;, &quot;spineAtlas&quot;]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // const spineBody = window.spine.Spine.from({</span></span>
<span class="line"><span>  //   atlas: &quot;spineAtlas&quot;,</span></span>
<span class="line"><span>  //   skeleton: &quot;spineData&quot;,</span></span>
<span class="line"><span>  //   scale: 0.5,</span></span>
<span class="line"><span>  // });</span></span>
<span class="line"><span>  const res = await PIXI.Assets.load(json);</span></span>
<span class="line"><span>  const spineBody = new PIXI.spine.Spine(res.spineData);</span></span>
<span class="line"><span>  spineBody.state.data.defaultMix = 0.2;</span></span>
<span class="line"><span>  spineBody.x = window.innerWidth / 2;</span></span>
<span class="line"><span>  app.stage.addChild(spineBody);</span></span>
<span class="line"><span>  // 获取 Spine 动画的宽高</span></span>
<span class="line"><span>  setTimeout(() =&gt; {</span></span>
<span class="line"><span>    const spineInfo = spineBody.getBounds();</span></span>
<span class="line"><span>    spineBody.y = window.innerHeight / 2 + +spineInfo.height / 2;</span></span>
<span class="line"><span>    const width = spineInfo.width;</span></span>
<span class="line"><span>    const height = spineInfo.height;</span></span>
<span class="line"><span>    console.log(&quot;spineInfo&quot;, spineBody.getBounds(), spineBody);</span></span>
<span class="line"><span>    console.table({</span></span>
<span class="line"><span>      width: spineBody.width,</span></span>
<span class="line"><span>      height: spineBody.height,</span></span>
<span class="line"><span>      x: spineBody.x,</span></span>
<span class="line"><span>      y: spineBody.y,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    // 获取 Spine 要求的版本</span></span>
<span class="line"><span>    const spineVersion = spineBody.stateData.skeletonData.version;</span></span>
<span class="line"><span>    console.log(&quot;Spine 要求的版本:&quot;, spineVersion);</span></span>
<span class="line"><span>    console.log(&quot;所有动画&quot;, spineBody.skeleton.data.animations);</span></span>
<span class="line"><span>    // 更新spine信息</span></span>
<span class="line"><span>    const infoDiv = document.getElementById(&quot;normal-info&quot;);</span></span>
<span class="line"><span>    infoDiv.innerHTML = \`</span></span>
<span class="line"><span>      &lt;div class=&#39;item&#39;&gt;&lt;span&gt;width: &lt;/span&gt;\${width}&lt;/div&gt;</span></span>
<span class="line"><span>      &lt;div class=&#39;item&#39;&gt;&lt;span&gt;height: &lt;/span&gt;\${height}&lt;/div&gt;</span></span>
<span class="line"><span>      &lt;div class=&#39;item&#39;&gt;&lt;span&gt;x: &lt;/span&gt;\${spineInfo.x}&lt;/div&gt;</span></span>
<span class="line"><span>      &lt;div class=&#39;item&#39;&gt;&lt;span&gt;y: &lt;/span&gt;\${spineInfo.y}&lt;/div&gt;</span></span>
<span class="line"><span>      &lt;div class=&#39;item&#39;&gt;&lt;span&gt;version: &lt;/span&gt;\${spineVersion}&lt;/div&gt;</span></span>
<span class="line"><span>    \`;</span></span>
<span class="line"><span>  }, 0);</span></span>
<span class="line"><span>  getAllAnimations(spineBody);</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>获取所有动画，添加到选择框，方便用户选择任意动画播放</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async function getAllAnimations(spineBody) {</span></span>
<span class="line"><span>  // 获取所有动画名称</span></span>
<span class="line"><span>  const duration = document.querySelector(&quot;.duration&quot;);</span></span>
<span class="line"><span>  const animations = spineBody.skeleton.data.animations;</span></span>
<span class="line"><span>  const animationNames = [];</span></span>
<span class="line"><span>  animations.forEach((animation) =&gt; {</span></span>
<span class="line"><span>    animationNames.push(animation.name);</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 创建 select 选择框</span></span>
<span class="line"><span>  const selector = document.getElementById(&quot;animationSelector&quot;);</span></span>
<span class="line"><span>  animationNames.forEach((name) =&gt; {</span></span>
<span class="line"><span>    const option = document.createElement(&quot;option&quot;);</span></span>
<span class="line"><span>    option.value = name;</span></span>
<span class="line"><span>    option.textContent = name;</span></span>
<span class="line"><span>    selector.appendChild(option);</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  // 播放第一个动画</span></span>
<span class="line"><span>  if (animationNames.length &gt; 0) {</span></span>
<span class="line"><span>    spineBody.state.setAnimation(0, animationNames[0], true);</span></span>
<span class="line"><span>    duration.innerHTML = \`&lt;span&gt;duration: &lt;/span&gt;\${animations[0].duration}\`;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 监听选择事件</span></span>
<span class="line"><span>  selector.addEventListener(&quot;change&quot;, (event) =&gt; {</span></span>
<span class="line"><span>    const selectedAnimation = event.target.value;</span></span>
<span class="line"><span>    spineBody.state.setAnimation(0, selectedAnimation, true);</span></span>
<span class="line"><span>    const r = animations.find((k) =&gt; k.name == selectedAnimation);</span></span>
<span class="line"><span>    duration.innerHTML = \`&lt;span&gt;duration: &lt;/span&gt;\${r.duration}\`;</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  setSpineY(spineBody);</span></span>
<span class="line"><span>  setScale(spineBody);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="源码开放-期待共探" tabindex="-1">源码开放，期待共探 <a class="header-anchor" href="#源码开放-期待共探" aria-label="Permalink to &quot;源码开放，期待共探&quot;">​</a></h3><p>👉 <a href="https://github.com/lantianhaijiao/spine-preview" target="_blank" rel="noreferrer">spine - preview源码</a> 👈</p>`,28)]))}const m=n(t,[["render",l]]);export{g as __pageData,m as default};
