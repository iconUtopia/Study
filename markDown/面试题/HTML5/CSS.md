# CSS 面试题

---

## 介绍一下标准的 css 盒子模型，以及标准盒子和怪异的差异。

标准盒模型(box-sizing:content-box)、怪异盒模型(box-sizing:border-box)、flex 弹性伸缩盒模型、columns 多列布局盒模型

标准盒子：contentBox,paddingBox,borderBox,margin。

差异:

- 标准模式下，一个块的总宽度=width+padding(左右)+border(左右)+margin(左右)；
- 怪异模式下，一个块的宽度=width+margin(左右)（即 width 已经包含了 padding 值和 border 值）

> 答：其实我们最常用的是标椎盒模型内容的宽高+padding+border+margin，组成了盒子的大小。但当添加 padding、border、margin 后盒子的大小就会受影响，所以就需要采用怪异盒模型，这样设置了宽高就固定了盒子的大小。看了下几个 UI 组件的底层样式源码都是采用的 box-sizing:border-box，我觉得这应该是前端开发的一种规范和方式

---

## BFC

BFC 即块级格式上下文，是 CSS 视觉渲染的一部分，**用于决定块级盒的布局及浮动相互影响范围的一个区域**。

#### BFC 具有一些特性：

1. 块级元素会在垂直方向一个接一个的排列，和文档流的排列方式一致。
2. 在 BFC 中上下相邻的两个容器的 margin 会重叠，创建新的 BFC 可以避免外边距重叠。
3. 计算 BFC 的高度时，需要计算浮动元素的高度。
4. BFC 区域不会与浮动的容器发生重叠。
5. BFC 是独立的容器，容器内部元素不会影响外部元素。
6. 每个元素的左 margin 值和容器的左 border 相接触。

#### 创建 BFC ：

- 绝对定位元素（`position` 为 `absolute` 或 `fixed` ）。
- 行内块元素，即 `display` 为 `inline-block` 。
- `overflow` 的值不为 `visible` 。

---

## CSS 选择符有哪些？

1. 通配符选择器`\*{}`
2. id 选择器`#box{}`
3. 类选择器`.box{}`
4. 标签选择器`div{}`
5. 相邻选择器`h1 + p{}`
6. 子选择器`ul > li`
7. 后代选择器`li a`
8. 属性选择器`a[rel = "external"]`
9. 伪类选择器`a: hover{}, li: nth-child{}`

### css 选择器和优先级

`!important` > `style` > `id` > `class`

---

## 重排（回流）和重绘

- **重排**：无论通过什么方式影响了元素的**几何信息**(元素在视口内的位置和尺寸大小)，**浏览器需要重新计算元素在视口内的几何属性**，这个过程叫做重排。
- **重绘**：通过构造渲染树和重排（回流）阶段，我们知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(元素在视口内的位置和尺寸大小)，接下来就可以**将渲染树的每个节点都转换为屏幕上的实际像素**，这个阶段就叫做重绘。

### 如何减少重排、重绘

- **最小化重绘和重排**，比如样式集中改变，使用添加新样式类名 .class 或 cssText 。
- **批量操作 DOM**，比如读取某元素 `offsetWidth` 属性存到一个临时变量，再去使用，而不是频繁使用这个计算属性；又比如利用 `document.createDocumentFragment()` 来添加要被添加的节点，处理完之后再插入到实际 DOM 中。
- 使用 `absolute` 或 `fixed` 使元**素脱离文档流**，这在制作复杂的动画时对性能的影响比较明显。
- **开启 GPU 加速**，利用 css 属性 `transform` 、`will-change` 等，比如改变元素位置，我们使用 `translate` 会比使用绝对定位改变其 `left` 、`top` 等来的高效，因为它不会触发重排或重绘，transform 使浏览器为元素创建⼀个 GPU 图层，这使得动画元素在一个独立的层中进行渲染。当元素的内容没有发生改变，就没有必要进行重绘。

---

# **_布局_**

## 掌握几大经典布局方案

- 圣杯布局
- 双飞翼布局
- CALC
- flex
- 定位

[前端的几大经典布局方案](https://www.cnblogs.com/mqjing/p/13629277.html),
[前端常见的布局方案大全](https://www.cnblogs.com/soyxiaobi/p/9594557.html),
[几种常用的响应式布局方案](https://zhuanlan.zhihu.com/p/258341726)

### 如何实现两栏布局，知道几种方法？

有七种实现两栏布局的方法：

1. 双 inline-block 方案；
2. 双 float 方案；
3. float + margin-left 方案；
4. 使用 absolute + margin-lef 方案；
5. 使用 float+BFC 方案；
6. 使用 flex 方案；
7. grid 方案；
   [实现两栏布局的七种方法](https://zhuqingguang.github.io/2017/08/16/adapting-two-layout/)

---

## 移动端响应式布局开发的三大方案

- @media 媒体查询
- rem 移动端采用
- flex
- vh/vw
- ……

---

# **_属性_**

## position 定的值，及相关作用

position 属性有四个可选值：

- static：默认值，元素出现在正常的文档流中，不会受 left、top、right、bottom 的影响。
- relative：**相对定位**，**相对自身位置定位**，可通过 left、top、right、bottom 的值来设置位置；并且他原本所占的空间不变，即不会影响其他元素布局；经常被用来做绝对定位元素的容器。
- absolute：**绝对定位**，**相对于最近的除 static 定位以外的元素定位**，若没有，则相对于 html 定位；脱离文档流，不占据文档空间；若设置了 absolute，但没有设置 left、top 等值，其位置不变；
  若设置了 absolute，会影响未定义宽的块级元素，使其变为包裹元素内容的宽度。
- fixed：**固定定位**，**相对于浏览器窗口定位**，脱离文档流，不会随页滚动而变化。

---

## display: none; 与 visibility: hidden; 的区别

联系：它们都能让元素不可见

区别：

- display:none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；visibility: hidden;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
- display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；visibility: hidden;是继承属性，子孙节点消失由于继承了 hidden，通过设置 visibility: visible;可以让子孙节点显式
- 修改常规流中元素的 display 通常会造成文档重排。修改 visibility 属性只会造成本元素的重绘
- 读屏器不会读取 display: none;元素内容；会读取 visibility: hidden;元素内容

---

## display,float,position 的关系

- 如果 display 为 none，那么 position 和 float 都不起作用，这种情况下元素不产生框
- 如果 position 值为 absolute 或者 fixed，框就是绝对定位的，float 的计算值为 none，display 根据下面的表格进行调整。
- 如果 float 不是 none，框是浮动的，display 根据下表进行调整
- 如果元素是根元素，display 根据下表进行调整其他情况下 display 的值为指定值
- 绝对定位、浮动、根元素都需要调整 display

---

## cellpadding 与 cellspacing 有何区别？

- cellpadding：代表单元格边框到内容之间的距离（留白）
- cellspacing：cellspacing 属性用来指定表格各单元格之间的空隙。此属性的参数值是数字，表示单元格间隙所占的像素点数。

---

## z-index 的工作原理，使用范围

- 文档流：`float`、`position`、`transform`、`animation`
- 定位

---

## flex:1 代表什么

`flex` 属性是 `flex-grow`, `flex-shrink` 和 `flex-basis` 的简写，默认值分别为 0、1、auto。后两个属性可选。

---

## line-height 继承规则

1. 父元素`line-height`的值为具体**数值**（30px），则子元素相同；
2. 父元素`line-height`的值为**比例**（1.5），则子元素相同；
3. 父元素`line-height`的值为**百分比**（200%），则子元素的值为 `font-size * 200%`

---

## [CSS 单位](https://zhuanlan.zhihu.com/p/440269115)

### 相对单位

#### 字体

字体相对单位，他们都是根据 font-size 来进行计算的。常见的字体相对单位有：em、rem、ex、ch；

##### em 和 rem

- em：em 是相对于父元素的字体大小进行计算的。如果当前对行内文本的字体尺寸未进行显示设置，则相对于浏览器的默认字体尺寸。当 DOM 元素嵌套加深时，并且同时给很多层级显式的设置了 font-size 的值的单位是 em，那么就需要层层计算，复杂度会很高。
- rem：它是根据页面的根元素的字体大小来计算的。

##### ex 和 ch

- ex：
- ch：

#### 视窗

视窗相对单位，他们都是根据视窗大小来决定的。常见的视窗相对单位有 vw、vh、vmax、vmin。

### 绝对单位

### 频率单位

### 时间单位

### 分辨率单位

### 角度单位

### 百分比

---

### 如何让浏览器支持小于 12px 的字体

使用 `transform:scale(0.8)` 进行缩放

---

---

## **_实现方案_**

## 掌握盒子水平垂直居中的五大方案

- 定位：三种
  - 已知盒子宽高：
  ```css
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin-left: -50px;
    margin-top: -50px;
  }
  ```
  - 未知盒子宽高，但一定得有宽高：
  ```css
  .box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  ```
  - 未知盒子宽高，不需要宽高，但兼容性不好：
  ```css
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  ```
- flex：
  ```css
  .father-box {
    display: flex;
    justify-content: center;
    align-item: center;
  }
  ```
- js：获得当前屏幕的宽和高，盒子的宽和高，屏幕宽高减盒子宽高除以 2

  ```js
  let HTML = document.documentElement,
    winW = HTML.clientWidth,
    winH = HTML.clientHeight,
    boxW = box.offsetWidth,
    boxH = box.offsetHeight;
  box.style.position = "absolute";
  box.style.top = (winH - boxH) / 2 + "px";
  box.style.left = (winW - boxW) / 2 + "px";
  ```

- display:table-cell，要求父级元素有固定宽高：`.father-box{ display:table-cell; width:200px; height:200px; vertical-align:middle; text-align:center } .box{ display:inline-block }`
- Element.getBoundingClientRect()

> 答：这种需求在我之前的项目中非常常见，最开始只会用了……种，后面了解了 flex 等方案，后面逛掘金知道了……种方案，感觉挺有意思的就了解了一下

---

## 如何使用 html+css 美化单选框？

使用`:checked`选择器配合配合其他的标签，覆盖掉默认样式，从而实现自定义样式。

---

## CSS 动画怎样实现循环播放

主要使用`-webkit-animation`属性。如：`-webkit-animation:gogog 2s infinite linear`，其中 gogogo 是自定义的动画帧数，2s 是整个动画的秒数，infinite 是永久玄幻，linear 是线性变化(step-end 则是无线性变化，直接输出结果)
CSS 代码如下：

```JavaScript
@-webkit-keyframes gogogo {
    0%{
        -webkit-transform: rotate(0deg);
       border:5px solid red;
    }
    50%{
        -webkit-transform: rotate(180deg);
        background:black;
       border:5px solid yellow;
    }
    100%{
        -webkit-transform: rotate(360deg);
        background:white;
       border:5px solid red;
    }
};
.loading{
   border:5px solid black;
    border-radius:40px;
    width: 28px;
    height: 188px;
   -webkit-animation:gogogo 2s infinite linear ;
    margin:100px;
}
```

[CSS3 animation 属性](http://www.w3school.com.cn/cssref/pr_animation.asp)

---

## 项目中怎样实现响应式和大小屏幕兼容？

meta 标签定义，使用 viewport meta 标签在手机浏览器上控制布局。

---

## div 的并排布局怎么实现？

- `float` 浮动
- `display:inline-block` 转行内
- `display:flex`。

---

## 清理浮动

1. 父级元素定义伪类：after 和 zoom；
2. 在结尾处添加空 div 边坡前 clear:both；
3. 父级 div 定义 height；
4. 父级 div 定义 overflow:hidden；
5. 父级 diiv 定义 overflow:auto；
6. 父级 div 也一起浮动；
7. 父级 div 定义 display:table；
8. 结尾处加 br 变迁 clear:both；
   [几种常用的清除浮动方法](https://www.cnblogs.com/nxl0908/p/7245460.html)

---

## 使用 CSS，让一个 div 消失在视野中

- `display:none`：元素将不会再占用页面空间，其占用的空间会被其他元素所占有，从而会引起浏览器的**重排**和**重汇**。
- `visibility:hidden`：该元素仍会占用页面空间，因此只会导致浏览器的**重汇**。
- `opacity:0`：该元素仍会占用页面空间，因此只会导致浏览器的**重汇**。元素会触发绑定的事件

---

## 使一个 div 里面的文字垂直居中，且该文字的大小根据屏幕大小自适应

1. `line-height:元素高度`，使文字垂直居中
2. 字体自适应：
   - `rem`：rem 是一个新的单位，该单位与 HTML 页面的 fontSize 有关，一般默认的浏览器的 fontSize 是 16px，因此一般的 1rem=16px。
   - `calc()`：这是一个用于在 CSS 中计算的函数，只能进行四则运算。
   - `:root`：在 css 中，这是一个伪类，但现在我们所说的不是伪类，而是 css 中的变量， 定义方法： `:root{ --a:#fff ;}`， 使用方法： `span{color:var(--a);}`

---
