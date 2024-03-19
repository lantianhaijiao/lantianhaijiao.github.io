---
title: 知识整理1
toc: 前端
date: 2018-09-29 10:02:01
cover: /img/common/t1.jpg
categories: js
---
本文为知识整理，可能工作中用到这些东西不多，可是总有人想让你会


----------


  前言：小时候很渴望长大，羡慕大人们的财富自由；长大后又很羡慕小时候，怀念小时候的无忧无虑，守候着那份天真。哦，还有，不是长大就能财富自由。。。
一：js继承
----------------
----------------------

**①：对象冒充实现继承：(可实现多继承)**


----------


——原理：让父类构造函数成为子类的方法，然后调用子类的方法，通过this关键字给所有属性和方法赋值

    function Parent(name)
    {
        this.name=name;
        this.sayName=function () {
            console.log(this.name);
        }
    }
    function Child (cname) {
        this.parent=Parent;
        this.parent(cname);
        delete this.parent; // 删除无用的parent函数 == f Parent(name)
    }
    var mychild=new Child("名字");
    mychild.sayName();
    
**②：原型链继承 (不能实现多继承)**

prototype

----------


        function Parent (name, age) {
    	  this.name = name;
    	  this.age = age;
    	  this.ParFunc = function () {
    	  	console.log(this.height)
    	  }
    	};
    	Parent.prototype.sayName = function () {
    	  console.log(this)
    	};
    	function Child (cname, cage, height) {
    	  this.height = height
    	}

    Child.prototype = new Parent(); // Child原型指向Parent的一个实例
    Child.prototype.constructor = Child; // 把Child指向自己，不与Parent共享
	var child = new Child('测试名字', '测试年龄', '测试身高')
	console.log(child) // 发现打印出来的属性都继承了，就是没值
child.ParFunc()：当访问ParFunc属性时，会先在child的实例属性中寻找，找不到就去child的原型对象上去找。一层一层的寻找构成了**原型链**
![Alt text](/img/image-3.png)
因为无法向父类构造函数传参;可以 new Parent('名字', '年龄')这时传参
注：如果想用原型给Child拓展方法：

    Child.prototype.childHeight = function () {
    	  console.log(this.height)
    	}
一定要写到Child.prototype = new Parent()的下面，要么就被覆盖掉了。

**③：call、apply继承(不能继承原型链，prototype上的)**

----------


            function Parent (name, age) {
        	  this.name = name;
        	  this.age = age;
        	  this.ParFunc = function () {
        	  	console.log(this.name)
        	  }
        	}
        	
        	function Child (cname, cage, height) {
        	  Parent.call(this,cname,cage); // 继承的参数为当前函数的形参
        	  // apply: Parent.call(this,arguments);
        	  this.height = height;
        	}
        	var child = new Child('测试名字', '测试年龄', '测试身高')
        	console.log(child)  //  ParFunc: ƒ () age: "测试年龄"
    name: "测试名字"
**④：组合继承：call+原型链继承**


----------


    function Parent (name, age) {
      this.name = name;
      this.age = age;
      this.ParFunc = function () {
      	console.log(this.height)
      }
    }
    Parent.prototype.sayName = function () {
      console.log(this)
    }
    function Child (cname, cage, height) {
      Parent.call(this, cname, cage); // 解决传参问题
      this.height = height;
    };
    Child.prototype = new Parent()
    Child.prototype.constructor = Child; // 把Child指向自己，否则一直指向Parent
    var child = new Child('测试名字', '测试年龄', '测试身高')
 比较常用的继承方式，缺点是 两次调用 Parent构造函数
   
 **⑤：寄生组合继承：**

cal+prototype

----------

    function Parent (name, age) { // 父函数
      this.name = name;
      this.age = age;
      this.ParFunc = function () {
      	console.log(this.height)
      }
    }
    Parent.prototype.sayName = function () {
      console.log(this)
    }
    function Child (cname, cage, height) { // 子函数
      Parent.call(this, cname, cage)
      this.height = height;
    };
    var createObj = function () { // 中间函数继承 Parent
      function Trans() {};
      Trans.prototype = Parent.prototype;
      return new Trans();
    };
    Child.prototype = createObj()
    Child.prototype.constructor = Child; // 改回指针
    var child = new Child('名字', '年龄', '身高')
    console.log(child)

二：如何获取自定义属性，特例data-*如何获取
=================
官方定义：
        data-*是 **html5** 新属性
        主要用于存储页面的自定义数据
        不应该包含大写字母（会默认转为小写）
        注释：用户代理会完全忽略前缀为 "data-" 的自定义属性。
脑海里第一印象就是 getAttribute(),setAttribute()俩属性了，一个获取，一个设置
而平时又很少用到，但是平时用的框架什么的多数都用 data-* 这个自定义属性，那其实获取 data- 这类自定义属性的时候，还有个更方便的方法dataset

    <div data-a="aa" id="div1" data-b="bb"></div>
    eg:var div1 = document.getElementById('div1')
    console.log(div1.dataset) // DOMStringMap {a: "测试", b: "222"}a: "测试"b: "222"
用data-*作为自定义属性：可以一句话就获取到所有属性，获取方式也简便   

三：事件的几个阶段：捕获、目标(event.target，即触发过程)、冒泡
---------
先盗个图

![Alt text](/img/image-2.png)
——冒泡(IE事件流)：从最深的节点向外传播，div -> window,就好比往水里丢一个石子，一层层波浪抵达河边缘

——捕获(网景)：从最外层向目标传递，window -> div,就好比你去一个大企业集团找人，需要提供公司 > 大部门 > 小部门 > 小组 > 目标

——目标：即触发过程event.target

——target、currentTarget的区别：target这个属性指向的是目标过程中的DOM对象，也就是 ***触发事件监听的对象***, currentTarget这个指向的是当前的对象，具体内容跟this一样，当this指向的是目标的时候(事件的目标阶段)，target与currentTarget相同

——现在几乎所有的主流浏览器都支持冒泡；IE早起版本会跳过html直接跳到document，且不支持捕获。

——平时多数用到冒泡多一些，事件代理(委托)也是通过事件冒泡的原理，让DOM节点可追溯，也可以利用冒泡的原理做埋点，避免新增DOM节点，改代码上线

——事件句柄addEventListener('事件名', 'function', false)，默认冒泡

四：判断数据类型，返回数据的具体类型
------------------
emm... 那不就直接 `return typeof n` 不就完了，哦不对，再识别一下数组，因为数组的typeof也是对象，Array.isArray(n)...   
/^12/ 这返回啥？ wc,也是object吧，那咋区分，对，正则有test方法，再判断一下 
    if (n.test) {
        return 'RegExp'
    }
null好像也返回obj吧，时间 Date嘞，都返回obj也没毛病，万物皆对象啊。

 - 据说instanceof也可以：左侧是否是右侧的实例，也就是说每个类型我们都得判断，于是

 

    [] instanceof Array // true
    [] instanceof Object // true
不光麻烦，返回的也不精确啊

 - 据说constructor也可以：js引擎会为函数添加prototype,并让其指向'该函数'的引用
/^12/.constructor  // f RexExp(){[native code]}
new Date().constructor // ƒ Date() { [native code] }
null.constructor // 报错：Cannot read.. 
undefined.constructor // 报错：Cannot read.. 
发现确实能校验一些typeof 不能校验的，但是 null和undefined没有'指针'啊,而且写继承的时候，指针是可以被改的，稍不注意就凉凉了...
 - 把这些都整合到一起基本也都够用了，可是并不优雅
有请toString登场....
华丽分割线

----------
toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。完美~~

    Object.prototype.toString.call(null) ; // [object Null]
    Object.prototype.toString.call(new Function()) ; // [object Function]
    Object.prototype.toString.call(new Date()) ; // [object Date]
但是我觉得除了obj比较特殊之外，其他类型,typeof都可以判断，不需要再多调用一次toString方法，所以最终封装 =>

    function typeDetection (n) {
      if (typeof n === 'object') {
      	return Object.prototype.toString.call(n)
      } else {
      	return typeof n
      }
    }
直接调用typeDetection('')  // string

五：千分位的实现
--------
**Q:字符：1234567890.12 转换为：1,234,567,890.12**

**R:**
个人用了while循环的方式
    function strFilter (str) {
      let newStr = String(str).split('.') // 切分原始字符,兼容传入Number类型
      let transStr = newStr[0],resStr = [] 
      while (transStr/1000 > 1) { // 判断是否大于1000
      	let whildStr = String((transStr/1000).toFixed(3)).split('.') // 这里一定要保留三位小数,否则正数部分末位的0就会丢失,又转为String，因为Number没有split方法
      	transStr = whildStr[0] // 每次都取小数点以前的(正数部分)
      	resStr.unshift(whildStr[1]) // 向前插入小数点后的数字()
      }
      // 除以1000剩下的数 + 每次除以1000后的数 + 原来小数
      let res2 = newStr[1]?('.' + newStr[1]):''
      let resComma = resStr.length?(',' + resStr.join(',')): ''
      return transStr + resComma + res2
    }
虽然实现代码很多，但个人觉得还算易懂

网上看到用正则的，确实简短：

    function strFilter2 (n) {
      let s = String(n)
      let re = /\d{1,3}(?=(\d{3})+$)/g
      let n1 = s.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { return s1.replace(re, '$&,') + s2 })
      return n1
    }
其实正则在好多场景都体现出优势，只是不能被轻易想到

**Q:以下this指向**

    (function () {
      "use strict";
      console.log(this) // undefined
    })()
    (function () {
      "use strict";
      console.log(this) // window
    })()
**R:严格模式下，除构造函数、对象内置函数外，this均指向 undefined**

**Q:script标签的 async、defer啥区别？**
**R:别说那没用的，上图**

![Alt text](/img/image-1.png)
啥也不加：script读取和解析脚本阶段都会阻断页面执行，
加async  : script解析脚本阶段会阻断页面执行
加defer   : scriptj脚本将在页面完成解析时执行

Q:[1,2,3].map(parseInt)的结果？
R:之前用到parseInt，只知道是向下取整，翻了下w3c的parseInt定义: Crazy

![Alt text](/img/image-4.png)
再看map，

![Alt text](/img/image-5.png)
parseInt就是回调函数,map会传给parseInt三个参数，parseInt只识别前两个，
那也就是得到了 

    function parseInt1 (item, index) {
      return parseInt(item,index)
    }
得到  `parseInt(1,0) parseInt(2,1) parseInt(3,2)`

    parseInt(1,0)，parseInt定义radix不传或者0,按10进制，也就得到了1
    parseInt(2,1)，parseInt又定义第二个参数 radix 位于 2-36(除了0)，否则返回NaN,所以得到NaN

    parseInt(3,2),这个据说(网上)是 3不是 2的合法进制数 (只有0和1)，但是个人试了试
    parseInt(10,2) => 3，parseInt(20, 2) => 6,parseInt(30, 2) => NaN

    ,发现只要是字符首字符小于 radix都是可以的，但是一旦首字符 >= radix，就会返回NaN

参考文章：[判断js数据类型的四种方法][1]

 

   
    
    


  [1]: https://www.cnblogs.com/onepixel/p/5126046.html