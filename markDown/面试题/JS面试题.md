## 1. 谈谈你对ES6的理解
* 新增模板字符串（为JavaScript提供了简单的字符串插值功能）
* 箭头函数
* for-of（用来遍历数据—例如数组中的值。）
* arguments对象可被不定参数和默认参数完美代替。
* ES6将Promise对象纳入规范，提供了原生的Promise对象。
* 增加了let和const命令，用来声明变量。
* 增加了块级作用域。
* let命令实际上就增加了块级作用域。
* 还有就是引入module模块的概念
## 2. 为什么要有同源限制？
同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议

## 3. 跨域问题
### 3.1. 什么是跨域
浏览器对JavaScript的**同源策略**限制，导致浏览器不能从一个域名的网页去请求另一个域名的资源、域名、端口协议，任一不同都会受到同源策略的限制。简单来说同源策略是一个安全机制。
同源策略：
1. 针对接口的请求
2. 针对Dom的查询
### 3.2. 如何解决跨域问题
**解决同源策略的限制，使用域名、端口协议三种全部一样，ajax能够正常请求数据的过程就是跨域。**
解决跨域的方式：
* JSONP（只能发送GET请求）。在HTML标签里，一些标签比如：script、img这样的获取资源的标签是没有跨域问题的。
* 空iframe加form（可以发送POST请求）。
* CORS。是一个W3C标准，全称是“跨域资源共享”(Cross-origin resource sharing)。
* 服务器上设置代理页面
* window.name
* window.postMessage
[不要再问我跨域的问题](https://segmentfault.com/a/1190000015597029#articleHeader0)
## 4. 说说你对AMD和Commonjs的理解
* CommonJS是服务器端模块的规范，Node.js采用了这个规范。CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数
* AMD推荐的风格通过返回一个对象做为模块对象，CommonJS的风格通过对module.exports或exports的属性赋值来达到暴露模块对象的目的
## 5. 渐进增强和优雅降级
* 渐进增强 ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
* 优雅降级 ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容
### 5.1. 介绍一下你对浏览器内核的理解？
主要分为两部分：渲染引擎+JS引擎
* 渲染引擎：取得网页的内容（html、xml、图片）、构造cssom树、计算网页的显示方式，比如各元素宽高，然后输出至显示器或打印机。
* js引擎：解析和执行javascript来实现网页的动态效果
## 6. 说说你对作用域链的理解
* 作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到window对象即被终止，**作用域链向下访问变量是不被允许的**
* **简单的说，作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期**
## 7. JavaScript原型，原型链 ? 有什么特点？
每个对象都会在其内部初始化一个属性，就是prototype(原型)，当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，于是就这样一直找下去，也就是我们平时所说的原型链的概念

关系：instance.constructor.prototype = instance.__proto__

特点：
* JavaScript对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变
* 当我们需要一个属性的时，Javascript引擎会先看当前对象中是否有这个属性， 如果没有的就会查找他的Prototype对象是否有这个属性，如此递推下去，一直检索到 Object 内建对象
## 8. 请解释什么是事件代理
* 事件代理（Event Delegation），又称之为事件委托。是 JavaScript 中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是DOM元素的事件冒泡。使用事件代理的好处是可以提高性能
* 可以大量节省内存占用，减少事件注册，比如在table上代理所有td的click事件就非常棒
* 可以实现当新增子对象时无需再次对其绑定
## 9. Ajax原理
* Ajax的原理简单来说是在用户和服务器之间加了—个中间层(AJAX引擎)，通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。使用户操作与服务器响应异步化。这其中最关键的一步就是从服务器获得请求数据
* Ajax的过程只涉及JavaScript、XMLHttpRequest和DOM。XMLHttpRequest是ajax的核心机制

## 10. JavaScript如何实现继承
[JS继承方法](https://juejin.im/entry/5993eeaa51882524382f3c0b)
* 原型继承
* call继承
* 冒充对象继承
* 混合继承
* 中间件继承
* 寄生组合式继承
### 10.1. 构造继承
把子类的this对象传到Animal的方法里面，然后把父类的属性绑定到 子类的 this 上
```
function Cat(name,color){
　　Animal.apply(this, arguments);
　　this.name = name;
　　this.color = color;
}
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
### 10.2. 原型继承
把父类的私有+公有的属性和方法，都作为子类公有的属性。
```
function Parent(){
   this.x = 199;
   this.y = 299;
}
Parent.prototype.say = function(){
   console.log('say')
}
function Child(){
   this.g = 90;
}
Child.prototype = new Parent();
var p = new Parent();
var c = new Child();
console.dir(c)
```
### 10.3. call实例继承
call方法将方法的this指向改变同时执行方法。 在子类构造函数中 父类.call(this) 可以将父类的私有变成子类的私有
```
function Parent() {
	this.x = 100;
	this.y = 199;
}
Parent.prototype.fn = function() {}
function Child() {
	this.d = 100;
	Parent.call(this); //构造函数中的this就是当前实例
}
var p = new Parent();
var c = new Child();
console.log(p)  //Parent {x: 100, y: 199}
console.log(c)  //Child {d: 100, x: 100, y: 199}
```
### 10.4. 冒充对象继承
冒充对象继承的原理是循环遍历父类实例，然后父类实例的私有方法全部拿过来添加给子类实例
```
function Parent(){
	this.x = 100;
}
Parent.prototype.getX = function(){
	console.log('getX')
}
function Child(){
	var p = new Parent();
	for(var attr in p){//for in 可以遍历到原型上的公有自定义属性
		this[attr] = p[attr]
	}
	//以下代码是只获得到私有方法和属性，如果不加这个的话就可以遍历到所有方法和属性
	/*if(e.hasOwnProperty(attr)){
		this[attr] = e[attr]
	}
	e.propertyIsEnumerable()*///可枚举属性==>  可以拿出来一一列举的属性
}
var p = new Parent();
var c = new Child();
console.dir(c)
```
### 10.5. 混合继承（call继承+原型继承）
将call继承+原型继承，无论是私有的还是公有的都拿过来了。但是有个问题就是子类的原型上的多了一套父类私有属性,但是不会产生问题。因为子类的私有属性也有一套相同的通过call继承拿过来的。
```
function Parent(){
	this.x=100;
}
Parent.prototype.getX = function(){}
function Child(){
	Parent.call(this);
}
Child.prototype =  new Parent();
Child.prototype.constructor = Child;
var p = new Parent();
var c = new Child();
console.log(c)//Child {x: 100}
```
### 10.6. 中间件继承
中间件继承就是通过原型链的机制，子类的prototype.__proto__本来应该是直接指向Object.prototype。从父类的原型上的__proto__也可以到Object.prototype==> 在父类.prototype上停留了下，父类.prototype就是一个中间件，所以子类可以继承到父类的公有方法当做自己的公有方法。
```
function Parent(){
	this.x = 100;
}
Parent.prototype.getX = function(){}
function Child(){
}
Child.prototype.__proto__ = Parent.prototype;
var p = new Parent();
var c = new Child()
console.log(c)
```
### 10.7. 寄生组合式继承
call继承+Object.create()，

所谓寄生组合式继承就是通过借用构造函数来继承属性，通过原型链的混合形式来继承方法。 基本思路是不必为了指定子类的原型而调用父类的构造函数，我们所需要的无非就是父类型原型的一个副本而已。 本质上，就是使用寄生式继承父类的原型，然后再将结果指定给子类的原型。
```
function inheritPrototype(subType,superType){
	var prototype = Object(superType.prototype);//创建对象
	prototype.constructor = subType;//增强对象
	subType.prototype = prototype;//指定对象
}
```
## 11. 原生js怎么访问腾讯端口
用原生ajax，如果允许跨域就可以访问，腾讯有些接口是开源的。
## 12. require 和 import 的区别？
**require是赋值过程并且是运行是才执行，import是解构过程并且编译时执行。**
### 12.1. 遵循的规范不同
1. require/exports是CommonJS的一部分
2. import/export是ES6新规范
### 12.2. 出现时间不同
CommonJS作为Node.js的规范，一直沿用至今。由于npm上CommonJS的类库众多，以及CommonJS和ES6之间的差异，Node.js无法直接兼容ES6。所以现阶段require/exports任然是必要且必须的
### 12.3. 形式不同
require/exports的用法只有一下三种：

```JavaScript
 const fs = require('fs');
 exports.fs = fs;
 module.exports = fs;
```
import/export的写法就多种多样

```JavaScript
import fs from 'fs';
import {default as fs} from 'fs';
import * as fs from 'fs';
-----------------------------
export default fs;
export const fs;
export * from 'fs';
```
### 12.4. 本质上的不同
1. CommonJS还是ES6 Module 输出都可以看成是一个具备多个属性或方法的对象；
2. default是ES6 Module所独有的关键字，export default输出默认的接口对象，import from'fs可以直接导入对象；
3. ES6 Module中导入模块的属性或者方法都是强绑定的，包括基础类型；而CommonJS贼是普通的值传递或者引用传递。
## 13. 深拷贝和浅拷贝
* **深拷贝：**是将对象及值复制过来，两个对象修改其中任意的值，另一个的值不会改变。
* **浅拷贝：**只是复制了对象的引用地址，两个对象指向同一个内存地址，所以修改其中一个的任意值，另一个值也会随之变化。
## 14. JS如何实现多态
**多态**(Polymorphism)，按字面的意思就是“多种状态”。同一操作作用于不同的对象，可以有不同的解释，产生不同的执行结果。
非多态代码示例：

```JavaScript
var makeSound = function(animal) {
    if(animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯');
    }
}
var Duck = function(){}
var Chiken = function() {};
makeSound(new Chicken());
makeSound(new Duck());
```
多态的代码示例：

```JavaScript
var makeSound = function(animal) {
    animal.sound();
}
var Duck = function(){}
Duck.prototype.sound = function() {
    console.log('嘎嘎嘎')
}
var Chiken = function() {};
Chiken.prototype.sound = function() {
    console.log('咯咯咯')
}
makeSound(new Chicken());
makeSound(new Duck());
```
## 15. cookie,sessionstorage,localstorage的区别
sessionstorage是会话级别，窗口关闭就不存在；localstorage是存储本地；cookie储存量较小。
1. **存储位置不同**：cookie数据始终在同源的http请求中携带，即cookie在浏览器和服务器间来回传递。而sessionstorage和localstotage仅在本地储存。
2. **存储大小限制不同**：cookie数据不能超过4k，而sessionstorage和localstorage可以达到5M或更大。
3. **数据有效期不同**：sessionstorage仅在浏览器窗口关闭前有些，不能持久保存；localstorage始终有效，因此用作持久数据；cookie只在设置的cooki过期时间之前一直有效。
4. **作用域不同**：sessionstorage不能在不同的浏览器窗口中共享，即使是同一个页面；localstorage和cookie在所有的同源窗口中都是共享的。
## 16. 项目中进行了哪些数据优化？
* 减少HTTP请求
* 减少静态资源的体积
* 使用缓存
* 内存溢出
[前端性能优化的常用手段](https://juejin.im/post/59672fbff265da6c3f70cd53)
## 17. 简述一下对JS单线程的理解
一个程序至少有一个进程，一个进程至少有一个线程，每一个独立的线程都有一个程序运行的入口，线程不能够独立执行，必须存在应用存现中。
## 18. 简述一下对异步编程的理解
同步是所有的操作都做完了才返回给用户（银行的操作系统必须用同步），异步是将用户请求放入队列中，并反馈给用户，系统迁移程序已经启动，可以关闭浏览器（为了避免短时间大量的数据操作，使用缓存机制，消息队列，任务池，慢慢写入数据库）。
[JS单线程和异步机制](https://juejin.im/entry/57b2827f165abd005434c59e)
## 19. 对requireJS了解多少？
requireJS是一个JavaScript文件或者模块加载器。它可以提高JavaScript的加载速度，避免不必要的堵塞。
[学会用requirejs，5分钟足矣](http://www.cnblogs.com/floor/p/7231960.html)
## 20. requireJS的入口函数是什么？
requirejs.config()函数
[快速理解RequireJs中的config](https://blog.csdn.net/weixin_41049850/article/details/81001709)
[requireJS](http://www.requirejs.cn/)
## 21. JS基础内容
dom、bom、js库。
## 22. Ajax的原理
ajax是一种在无需重新加载整个页面的情况下，能够更新部分页面技术。
## 23. async返回的是什么？
async总是返回一个promise。
## 24. await返回的是什么？
promise执行返回后的结果。
## 25. promise怎么用？
new一个promise然后 .the（实例对象的调用方法），然后 .resove()
## 26. 说说你对promise的了解
Promise 对象用来进行延迟(deferred) 和异步(asynchronous) 计算

Promise 有四种状态：
* pending: 初始状态, 非 fulfilled 或 rejected.
* fulfilled: 成功的操作.
* rejected: 失败的操作.
* settled: Promise已被fulfilled或rejected，且不是pending。fulfilled与 rejected一起合称 settled
## 27. generator是什么？
generator（生成器）是ES6标准引入的新的数据类型，一个generator看上去像一个函数，但可以返回多次，generator和函数不同的是，generator由function定义。
## 28. 调试工具用过哪些？
1. console
2. soure
3. Chrome开发调试工具
## 29. 事件触发机制，谈一谈事件捕获与冒泡，事件委托。
* 事件捕获：网景提出事件捕获的事件流。事件从外到里传播。
* 事件冒泡：微软提出了名为事件冒泡的事件流。事件从里到外。
* 事件委托：就是把一个元素响应事件的函数委托到另一个元素。
## 30. 为什么要用事件委托？有什么优点？
减少事件注册；节省内存空间；简化了dom节点更新时，相应事件的更新。
## 31. ES6的新特性
* let与const
* 变量的解构赋值
* 字符串模板
* 箭头函数
* 默认参数
*...操作符
* 创建类
* 模块
* proxy
[ECMAScript 6 新特性总结](https://imweb.io/topic/55e330d6771670e207a16bbb)
[es6、7、8、9新语法新特性-总结](https://juejin.im/post/5c6629a3f265da2dd638dfa1)
## 32. 对箭头函数的理解
* 函数体内的this对象，绑定定义时所在的对象，而不是使用时所在的对象。
* 不可以当做构造函数，也就是说，不可以使用new名，否则会抛出一个错误。
* 不可以使用arguments对象，该对象在函数体内不存在。
* 箭头函数是匿名函数。
* 箭头函数没有原型对象。
## 33. get 和 post 的区别
* HTTP报文层面：get将请求信息放在URL，而post放在报文体中；
* 数据库层面：get符合幂等性和安全性，而post不符合；
* 其他层面：get可以被缓存、存储，而post不行；
* 本质上：get是向服务器发送索取数据的一种请求，而post是向服务器提交数据的一种请求。
* [都9102年了，还问GET和POST的区别](https://segmentfault.com/a/1190000018129846)
## 34. 说说tcp/ip、http的理解
* tcp/ip协议是传输层协议，主要解决数据如何在网络中传输；
* http协议是应用层协议，主要解决如何报装数据。
## 35. 谈谈变量提升
变量提示是因为用var关键字声明变量造成的，但变量提升只会把声明语句提升到当前作用域的顶端，而赋值语句不会被提升。
**命名的变量和函数，函数会提升最前边，而变量其次。而且变量会被忽略**

```JavaScript
function a(){ console.log(a) }
var a;//忽略
console.log(a) //打印函数本身
a = 1
a()// a is not a function
```
## 36. 简单阐述Mongdb
文档型数据库
## 37. 事件队列
所有同步任务都在主线程上执行，形成一个执行栈。主线程之外，还有一个“任务队列”。只要异步任务有了运行结果，就在“任务队列”之中放置一个事件。一旦“执行栈”中的所有同步任务执行完毕，系统就会读取“任务队列”，看看里面有哪些事件。那些对应异步任务，于是结束等待状态，进入执行栈开始执行。
## 38. XMLHttpRequerst的通用属性
JavaScript对象XMLHttpRequerst，是一种支持异步请求数据的技术。浏览器提供的XMLHttpRequerst对象，是这个对象是的浏览器可以发送http请求与接收http响应。
* readyState：放回XMLHttpRequerst请求的当前状态，语法`lValue=oXMLHttpRequest.redayState`；
* responstText：将响应信息作为字符串返回，语法`strValue=oXMLHttpRequerst.responseText`；
* responseXml：将响应信息格式化为Xml Document对象并返回，语法`objDispath=oXMLHttpRequerst.responseXML`；
* status：返回当前请求的http状态码，语法`lValue=oXMLHttpRequerst.status`;
* statusText：返回当前请求的响应行状态，语法`strValue=oXMLHttpRequerst.statusText`。
## 39. JavaScript中定义对象的几种方式？
### 39.1. 基本模式

```JavaScript
var person = new Object();
        person.name = "孙悟空";
        person.weapon = "棒子";
        person.run = function () {eturn this.name + "武器是" + person.weapon;
}
```
缺点：
1. 创建对象较多时比较麻烦；
2. 各个对象之前看不出有什么关联。
### 39.2. 工程模式

```JavaScript
function creatPerson(name, weapon) {var person = new Object();
            person.name = "孙悟空";
            person.weapon = "棒子";
            person.run = function () {return this.name + "武器是" + person.weapon;
            } return person;
}
```
缺点：
1. 实例之间没有联系；
2. 没有使用new关键字；
3. 会造成资源浪费，没生成 一个实例都会增加一些重复内容。
### 39.3. 构造函数模式

```JavaScript
function creatPerson(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.run = function () {return this.name + "武器是" + this.weapon;}
}        //调用创建对象
var wukou =new  creatPerson("孙悟空", "棒子");
```
缺点：没有解决工厂模式会浪费内存的缺点，每创建一个对象会增加很多重复的东西。
### 39.4. 原型（portotype）模式
js中规定，每一个构造都有一个prototype属性，指向另一个对象，这个对象的所有属性和方法，都会被构造函数的实例继承，可以把哪些不变的属性和方法直接定义在prototype对象上。

```JavaScript
function personObj() { }
        personObj.prototype.name = "孙悟空";
        personObj.prototype.weapon = "棒子";
        personObj.prototype.run = function () {return this.name + "武器是" + this.weapon;}//创建对象
        var person = new personObj();//原型模式的另一种写法        function personObj() { }
        personObj.prototype = {
            constructor: personObj,//强制指回personObj
            name: "孙悟空",
            weapon: "棒子",
            run: function () {return this.name + "武器是" + this.weapon;
            }
        }
```
缺点：构造函数没有参数，不能传参初始化值，因为不同的对象可能只共享方法，但是不会共享属性。
### 39.5. 组合模式
这样不同的实例可以有自己特有的属性，还有共享的方法。

```JavaScript
function personObj(name,weapon) {
    this.name = name;
    this.weapon = weapon;
}
personObj.prototype = {
            run: function () { return this.name + "武器是" + this.weapon;}
        }//创建对象
var wukou = new personObj("孙悟空", "棒子");
```
缺点：对象中的属性和方法是分开的。
### 39.6. 动态原型模式

```JavaScript
function personObj(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    if (typeof this.run != "function")
        {
                personObj.prototype = {
run: function () {return this.name + "武器是" + this.weapon;}
        }
    }
}//创建对象
var wukou = new personObj("孙悟空", "棒子");
```
函数中使用if(typeof this.run!="function")目的是为了防止创建多个对象时，方法执行多次。
## 40. git和svn怎么退回版本？
git：
1. git reset --versionNumbr，reset为重置到这次提交，将内容重置到指定的版本。
svn：
1. 改动没有提交，使用svn revert；
2. 改动已经提交，使用svn merge。
## 41. 移动端有几种开发模式？
* Native App：NA即原生应用；
* Web App：Web App就是网页应用；
* Hybrid App：混合应用；
* React Native；
* 微信小程序；
* PWA。
## 42. 原生JS怎么创建，添加节点？
创建：document.CreateElement("h1")
添加：.oppendchild("h1")
## 43. jQuery怎么操作节点？
$("#id");
## 44. 怎么找到一个字符串里的某个数字或字母然后替换？
方法1：循环替换，因为JS里的replace默认只会替换一个

```JavaScript
var a = "abc;def;hij;";
while (a.indexOf(";") >= 0);
a = a.replace(";", ",");
alert(a);
```
方法2：正则替换

```JavaScript
var a = "abc;def;hij;";
a = a.replace(/;/g, ",");
alert(a);
```
## 45. 数组怎么替换，添加，删除等。
* 替换：splice；
* 添加：push、unshift；
* 删除：pop、shift。
## 46. 根据移动端的屏幕适配样式有几种？
* **Cover布局**：就跟background-size的cover属性意义，保持页面的宽高比，取宽或高中较小的占满屏幕，超出的内容会被隐藏。适用于主要内容集中在中部，边沿无重要内容的设计。
* **Contain布局**：就跟background-size的cover属性意义，保持页面的宽高比，取宽或高中较小的占满屏幕，不足的部分会用背景填充。适用于设计上需要背景为单色，或者可平铺的背景。
* **响应式布局**
* **自适应布局**
## 47. 说几个查看源代码的网站
1. github
2. CSDN
3. gitLab
4. Stack Overflow
5. Reddit
## 48. lodash是什么？
lodash是一个一致性、模块化、高性能的JS工具库。不需要引入其他第三方依赖，是一个意在提高开发效率，提高JS原生方法性能的JS库。
## 49. HTTP和HTTPS的区别
超文本传输协议HTTP协议被用于在Web浏览器和网站服务器之间传递信息，HTTP协议以明文方式发送内容，不提供任何方式的加密，所以HTTP协议不适用于传输一些敏感信息。
主要区别：
1. https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。
2. http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
3. http和htttps使用的是完全不同的链接方式，用的端口也不一样，前者是80，后者是443.
4. http的连接很简单，是无状态的；https协议是由ssl+http协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。
[详细解析 HTTP 与 HTTPS 的区别](https://juejin.im/entry/58d7635e5c497d0057fae036)
## 50. 原生JS创建一个对象出来中，主要的过程
1. 创建一个对象；
2. 设置新对象的`constructor`属性为构造函数的名称，设置新对象的`_proto_`属性指向构造函数的prototype对象；
3. 使用新对象调用函数，函数中的`this`被指向新实例对象；
4. 将初始化完毕的新对象地址，保存到等号左边的变量中。
## 51. JS中的undefined和null有什么区别？
null是一个表述“无”的**对象**，转为数值时wi0；undefined是一个表示“无”的**原始值**，转为数值时为NaN。
## 52. JavaScript中什么是闭包？
函数嵌套，外部函数访问内部函数变量的作用域，调用完成之后数据不会被销毁。
### 52.1. 闭包的特性
* 函数内再嵌套函数
* 内部函数可以引用外层的参数和变量
* 参数和变量不会被垃圾回收机制回收
### 52.2. 说说你对闭包的理解
使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。在js中，函数即闭包，只有函数才会产生作用域的概念
## 53. JSON 的了解？
* JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式
* 它是基于JavaScript的一个子集。数据格式简单, 易于读写, 占用带宽小

JSON字符串转换为JSON对象:
```
var obj =eval('('+ str +')');
var obj = str.parseJSON();
var obj = JSON.parse(str);
```
JSON对象转换为JSON字符串：
```
var last=obj.toJSONString();
var last=JSON.stringify(obj);
```
## 54. XML和JSON的区别？
* 数据体积方面：JSON相对于XML来讲，数据的体积小，传递的速度更快些。
* 数据交互方面：JSON与JavaScript的交互更加方便，更容易解析处理，更好的数据交互
* 数据描述方面：JSON对数据的描述性比XML较差
* 传输速度方面：JSON的速度要远远快于XML
## 55. 解析['1','2','3'].map(parseInt)
* 首先回顾一下map函数：`var new_array = arr.map(function callback(currentValue,index,arr)) { // Return element for new_array },thisArg)`，这个callback一共可以接收三个参数，currentValue 当前元素的值，index 当前元素的索引值，arr 当前元素属于的数组对象。
* 而parseInt则是用来解析字符串的，使字符串成为指定基数的整数。`parseInt(string,radix)`接收两个参数，第一个参数表示被处理的值（字符串），第二个表示为解析时的基数。
* 了解两个函数后，可以模拟一下运行情况
    1. parseInt('1',0) //radix为0时，且string参数不以"0x"和"0"开头时，按照10为基数处理。这个时候返回1
    2. parseInt('2',1) //基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN
    3. parseInt('3',2) //基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN
**map函数返回的是一个数组，所以最后结果为[1,NaN,NaN]**
## 56. JavaScript中的基础数据类型有哪些？
* 基本型：number、string、bolean、null、undfine、Symbol；
* 引用型：object。
## 57. 什么是防抖和节流？有什么区别？如何实现？
### 57.1. 防抖
触发高频事件后n秒内，函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。
**思路：**
每次触发事件时都取消之前的延时调用方法

```JavaScript
function debounce(fn) {
      let timeout = null; // 创建一个标记用来存放定时器的返回值
      return function () {
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
          fn.apply(this, arguments);
        }, 500);
      };
    }
    function sayHi() {
      console.log('防抖成功');
    }

    var inp = document.getElementById('inp');
    inp.addEventListener('input', debounce(sayHi)); // 防抖
```
### 57.2. 节流
高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率。
**思路：**
每次触发时间时都判断当前是否有等待执行的延时函数。

```JavaScript
function throttle(fn) {
      let canRun = true; // 通过闭包保存一个标记
      return function () {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 立即设置为false
        setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
          fn.apply(this, arguments);
          // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
          canRun = true;
        }, 500);
      };
    }
    function sayHi(e) {
      console.log(e.target.innerWidth, e.target.innerHeight);
    }
    window.addEventListener('resize', throttle(sayHi));
```