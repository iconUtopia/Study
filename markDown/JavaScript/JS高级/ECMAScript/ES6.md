https://www.bookstack.cn/read/es6-3rd/spilt.5.docs-intro.md

# 1. ECMAScript 6 简介

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

## 1.1 ECMAScript 和 JavaScript 的关系

ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 JScript 和 ActionScript）。日常场合，这两个词是可以互换的。

## 1.2 ES6 与 ECMAScript 2015 的关系

ECMAScript 2015（简称 ES2015）这个词，也是经常可以看到的。

ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。本书中提到 ES6 的地方，一般是指 ES2015 标准，但有时也是泛指“下一代 JavaScript 语言”。

## 1.3 Babel 转码器

Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。下面是一个例子。

# 2. let 和 const 命令

## 2.1 let 命令

### 基本用法

ES6 新增了 `let` 命令，用来声明变量。它的用法类似于 `var`，但是所声明的变量，只在 `let` 命令所在的代码块内有效。

```js
{
  let a = 10
  var b = 1
}
a // ReferenceError: a is not defined.
b // 1
```

上面代码在代码块之中，分别用 `let` 和 `var` 声明了两个变量。然后在代码块之外调用这两个变量，结果 `let` 声明的变量报错，`var` 声明的变量返回了正确的值。这表明，`let` 声明的变量只在它所在的代码块有效。

### 不存在变量提升

`var` 命令会发生“变量提升”现象，即变量可以在声明之前使用，值为 `undefined`。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

为了纠正这种现象，`let` 命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```js
// var 的情况
console.log(foo) // 输出undefined
var foo = 2
// let 的情况
console.log(bar) // 报错ReferenceError
let bar = 2
```

### 暂时性死区

只要块级作用域内存在 `let` 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```js
var tmp = 123
if (true) {
  tmp = 'abc' // ReferenceError
  let tmp
}
```

上面代码中，存在全局变量 `tmp`，但是块级作用域内 `let` 又声明了一个局部变量 `tmp`，导致后者绑定这个块级作用域，所以在 `let` 声明变量前，对 `tmp` 赋值会报错。

ES6 明确规定，如果区块中存在 `let` 和 `const` 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”

有些“死区”比较隐蔽，不太容易发现。

```js
function bar(x = y, y = 2) {
  return [x, y]
}
bar() // 报错
```

上面代码中，调用 `bar` 函数之所以报错（某些实现可能不报错），是因为参数 `x` 默认值等于另一个参数 `y`，而此时 `y` 还没有声明，属于“死区”。如果 `y` 的默认值是 `x`，就不会报错，因为此时 `x` 已经声明了。

### 不允许重复声明

`let` 不允许在相同作用域内，重复声明同一个变量。

```js
// 报错
function func() {
  let a = 10
  var a = 1
}
// 报错
function func() {
  let a = 10
  let a = 1
}
```

## 2.2 块级作用域

### 为什么需要块级作用域

ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

- 场景一：内层变量可能会覆盖外层变量。
- 场景二：用来计数的循环变量泄露为全局变量。

### ES6 的块级作用域

`let`实际上为 JavaScript 新增了块级作用域。

ES6 允许块级作用域的任意嵌套。

```js
{
  {
    {
      {
        {
          let insane = 'Hello World'
        }
        console.log(insane) // 报错
      }
    }
  }
}
```

### 块级作用域域函数声明

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于 `let`，在块级作用域之外不可引用。

```js
function f() {
  console.log('I am outside!')
}
;(function () {
  if (false) {
    // 重复声明一次函数f
    function f() {
      console.log('I am inside!')
    }
  }
  f()
})()
```

上面代码在 ES5 中运行，会得到“I am inside!”，因为在 if 内声明的函数 f 会被提升到函数头部。

ES6 就完全不一样了，理论上会得到“I am outside!”。因为块级作用域内声明的函数类似于 `let`，对作用域之外没有影响。但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的.

因为如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在附录 B 里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。

- 允许在块级作用域内声明函数。
- 函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作 `let` 处理。

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

## 2.3 const 命令

### 基本用法

`const` 声明一个**只读的常量**。一旦声明，常量的值就不能改变。

`const` 声明的变量不得改变值，这意味着，`const` 一旦声明变量，就必须立即初始化，不能留到以后赋值。

`const` 的作用域与 `let` 命令相同：只在声明所在的块级作用域内有效。

`const` 命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

`const` 声明的常量，也与 `let` 一样不可重复声明。

### 本质

`const` 实际上保证的，并不是变量的值不得改动，而是变量指向的那个**内存地址**所保存的数据不得改动。对于**简单类型**的数据（数值、字符串、布尔值），值就保存在变量指向的那个**内存地址**，因此等同于常量。但对于**复合类型**的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的**指针**`，const` 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

如果真的想将对象冻结，使对象里的值不可更改，应该使用 `Object.freeze` 方法。

```js
var constantize = (obj) => {
  Object.freeze(obj)
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key])
    }
  })
}
```

### ES6 声明变量的六种方法

ES5 只有两种声明变量的方法：`var` 命令和 `function` 命令。`ES6` 除了添加 `let` 和 `const` 命令，后面章节还会提到，另外两种声明变量的方法：`import` 命令和 `class` 命令。所以，ES6 一共有 6 种声明变量的方法。

## 2.4 顶层对象属性

顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global 对象。ES5 之中，顶层对象的属性与全局变量是等价的。

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。另一方面，window 对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6 为了改变这一点，一方面规定，为了保持兼容性，`var` 命令和 `function` 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let` 命令、`const` 命令、`class` 命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```js
var a = 1
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1
let b = 1
window.b // undefined
```

## 2.5 globalThis 对象

JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是 `window`，但 Node 和 Web Worker 没有 `window`。
- 浏览器和 Web Worker 里面，`self` 也指向顶层对象，但是 Node 没有 `self`。
- Node 里面，顶层对象是 `global`，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用 `this` 变量，但是有局限性。

- 全局环境中，`this` 会返回**顶层对象**。但是，Node 模块和 ES6 模块中，`this` 返回的是**当前模块**。
- 函数里面的 `this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this` 会指向顶层对象。但是，严格模式下，这时 `this` 会返回 `undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么 `eval`、`new Function` 这些方法都可能无法使用。

综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。

```js
// 方法一
typeof window !== 'undefined'
  ? window
  : typeof process === 'object' &&
    typeof require === 'function' &&
    typeof global === 'object'
  ? global
  : this
// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  throw new Error('unable to locate global object')
}
```

ES2020 在语言标准的层面，引入 `globalThis` 作为顶层对象。也就是说，任何环境下，`globalThis` 都是存在的，都可以从它拿到顶层对象，指向全局环境下的 `this`。

# 3. 变量的解构赋值

## 3.1 数组的解构赋值

### 基本语法

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为**解构（Destructuring）**。

以前，为变量赋值，只能直接指定值。

```js
let a = 1
let b = 2
let c = 3
```

ES6 允许写成下面这样。

```js
let [a, b, c] = [1, 2, 3]
```

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

本质上，这种写法属于“**模式匹配**”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。

```js
let [foo, [[bar], baz]] = [1, [[2], 3]]
foo // 1
bar // 2
baz // 3

let [, , third] = ['foo', 'bar', 'baz']
third // "baz"

let [x, , y] = [1, 2, 3]
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4]
head // 1
tail // [2, 3, 4]

let [x, y] = [1, 2, 3]
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4]
a // 1
b // 2
d // 4

let [x, y, ...z] = ['a']
x // "a"
y // undefined
z // []
```

如果解构不成功，变量的值就等于`undefined`。

事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

```js
function* fibs() {
  let a = 0
  let b = 1
  while (true) {
    yield a
    ;[a, b] = [b, a + b]
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs()
sixth // 5
```

### 默认值

解构赋值允许指定默认值。

```js
let [foo = true] = []
foo // true
let [x, y = 'b'] = ['a'] // x='a', y='b'
let [x, y = 'b'] = ['a', undefined] // x='a', y='b'
```

注意，`ES6` 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于 `undefined`，默认值才会生效。

```js
let [x = 1] = [undefined]
x // 1
let [x = 1] = [null]
x // null
```

## 3.2 对象的解构赋值

### 简介

解构不仅可以用于数组，还可以用于对象。

```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' }
foo // "aaa"
bar // "bbb"
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。变量没有对应的同名属性，导致取不到值，最后等于 `undefined`。

如果变量名与属性名不一致，必须写成下面这样。

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }
baz // "aaa"

let obj = { first: 'hello', last: 'world' }
let { first: f, last: l } = obj
f // 'hello'
l // 'world'
```

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

### 默认值

对象的解构也可以指定默认值。

```js
var { x = 3 } = {}
x // 3

var { x, y = 5 } = { x: 1 }
x // 1
y // 5

var { x: y = 3 } = {}
y // 3

var { x: y = 3 } = { x: 5 }
y // 5

var { message: msg = 'Something went wrong' } = {}
msg // "Something went wrong"
```

默认值生效的条件是，对象的属性值严格等于 `undefined`

```js
var { x = 3 } = { x: undefined }
x // 3
var { x = 3 } = { x: null }
x // null
```

### 注意点

#### （1）如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error

// 正确的写法
let y;
({y} = {y: 1});
```

因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。放在一个圆括号里面，就可以正确执行。

#### （2）解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

```
({} = [true, false]);
({} = 'abc');
({} = []);
```

上面的表达式虽然毫无意义，但是语法是合法的，可以执行。

#### （3）由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```js
let arr = [1, 2, 3]
let { 0: first, [arr.length - 1]: last } = arr
first // 1
last // 3
```

## 3.3 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello'
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个 `length` 属性，因此还可以对这个属性解构赋值。

```js
let { length: len } = 'hello'
len // 5
```

## 3.4 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```js
let { toString: s } = 123
s === Number.prototype.toString // true

let { toString: s } = true
s === Boolean.prototype.toString // true
```

上面代码中，数值和布尔值的包装对象都有 toString 属性，因此变量 s 都能取到值。

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于 `undefined` 和 `null` 无法转为对象，所以对它们进行解构赋值，都会报错。

```js
let { prop: x } = undefined // TypeError
let { prop: y } = null // TypeError
```

## 3.5 函数参数的解构赋值

函数的参数也可以使用解构赋值。

```js
function add([x, y]) {
  return x + y
}
add([1, 2]) // 3
```

函数参数的解构也可以使用默认值。

```js
function move({ x = 0, y = 0 } = {}) {
  return [x, y]
}
move({ x: 3, y: 8 }) // [3, 8]
move({ x: 3 }) // [3, 0]
move({}) // [0, 0]
move() // [0, 0]
```

`undefined` 就会触发函数参数的默认值。

```
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

## 3.6 圆括号问题

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

### 不能使用圆括号的情况

以下三种解构赋值不得使用圆括号。

#### （1）变量声明语句

```js
// 全部报错
let [(a)] = [1];
let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};
let { o: ({ p: p }) } = { o: { p: 2 } };
```

上面 6 个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。

#### （2）函数参数

函数参数也属于变量声明，因此不能带有圆括号。

```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```

#### （3）赋值语句的模式

```js
// 全部报错
;({ p: a } = { p: 42 })
;[a] = [5]
```

### 可以使用圆括号的情况

可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

```
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

## 3.7 用途

变量的解构赋值用途很多。

### （1）交换变量的值

```
let x = 1;
let y = 2;
[x, y] = [y, x];
```

### （2）从函数返回多个值

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```js
// 返回一个数组
function example() {
  return [1, 2, 3]
}
let [a, b, c] = example()
// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2,
  }
}
let { foo, bar } = example()
```

### （3）函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来。

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

### （4）提取 JSON 数据

解构赋值对提取 JSON 对象中的数据，尤其有用。

```js
let jsonData = {
  id: 42,
  status: 'OK',
  data: [867, 5309],
}
let { id, status, data: number } = jsonData
console.log(id, status, number)
// 42, "OK", [867, 5309]
```

### （5）函数参数的默认值

```js
jQuery.ajax = function (
  url,
  {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
  } = {},
) {
  // ... do stuff
}
```

指定参数的默认值，就避免了在函数体内部再写 var foo = config.foo || 'default foo';这样的语句。

### （6）遍历 Map 结构

任何部署了 Iterator 接口的对象，都可以用 `for...of` 循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```js
const map = new Map()
map.set('first', 'hello')
map.set('second', 'world')
for (let [key, value] of map) {
  console.log(key + ' is ' + value)
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```js
// 获取键名
for (let [key] of map) {
  // ...
}
// 获取键值
for (let [, value] of map) {
  // ...
}
```

### （7）输入模块的指定方法

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```js
const { SourceMapConsumer, SourceNode } = require('source-map')
```

# 4. 字符串的扩展

## 字符的 Unicode 表示法

ES6 加强了对 Unicode 的支持，允许采用 `\uxxxx` 形式表示一个字符，其中 `xxxx` 表示字符的 Unicode 码点。但是，这种表示法只限于码点在 `\u0000` ~ `\uFFFF` 之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。

```js
'\uD842\uDFB7'
// "𠮷"

'\u20BB7'
// " 7"
```

## 字符串你的遍历器接口

ES6 为字符串添加了遍历器接口，使得字符串可以被 `for...of` 循环遍历。

```js
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```

除了遍历字符串，这个遍历器最大的优点是可以识别大于 0xFFFF 的码点，传统的 for 循环无法识别这样的码点。

## 直接输入 U+2028 和 U+2029

JavaScript 字符串允许直接输入字符，以及输入字符的转义形式。举例来说，“中”的 Unicode 码点是 U+4e2d，你可以直接在字符串里面输入这个汉字，也可以输入它的转义形式 `\u4e2d`，两者是等价的。

```js
'中' === '\u4e2d' // true
```

但是，JavaScript 规定有 5 个字符，不能在字符串里面直接使用，只能使用转义形式。

- U+005C：反斜杠（reverse solidus）
- U+000D：回车（carriage return）
- U+2028：行分隔符（line separator）
- U+2029：段分隔符（paragraph separator）
- U+000A：换行符（line feed）

举例来说，字符串里面不能直接包含反斜杠，一定要转义写成 `\\` 或者 `\u005c`

## JSON.stringify()的改造

根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的 `JSON.stringify()` 方法有可能返回不符合 UTF-8 标准的字符串。

`JSON.stringify()` 的问题在于，它可能返回 0xD800 到 0xDFFF 之间的单个码点。

```js
JSON.stringify('\u{D834}') // "\u{D834}"
```

为了确保返回的是合法的 UTF-8 字符，ES2019 改变了 `JSON.stringify()` 的行为。如果遇到 0xD800 到 0xDFFF 之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

```js
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

## 模板字符串

ES6 引入了模板字符串

```js
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`)
```

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```js
// 普通字符串
;`In JavaScript '\n' is a line-feed.` // 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`)

// 字符串中嵌入变量
let name = 'Bob',
  time = 'today'
;`Hello ${name}, how are you ${time}?`
```

上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。

```js
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`)
```

模板字符串中嵌入变量，需要将变量名写在 `${}` 之中。

模板字符串之中还能调用函数。

```js
function fn() {
  return 'Hello World'
}
;`foo ${fn()} bar`
// foo Hello World bar
```

模板字符串甚至还能嵌套。

```js
const tmpl = (addrs) => `
  <table>
  ${addrs
    .map(
      (addr) => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `,
    )
    .join('')}
  </table>
`
```

## 实例：模板编译

```js
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`
```

上面代码在模板字符串之中，放置了一个常规模板。该模板使用 `<%...%>` 放置 JavaScript 代码，使用 `<%= ... %>` 输出 JavaScript 表达式。

### 怎么编译这个模板字符串呢？

**思路一**：将其转换为 JavaScript 表达式字符串、

```js
echo('<ul>')
for (let i = 0; i < data.supplies.length; i++) {
  echo('<li>')
  echo(data.supplies[i])
  echo('</li>')
}
echo('</ul>')
```

**思路二**：转换使用正则表达式

```js
let evalExpr = /<%=(.+?)%>/g
let expr = /<%([\s\S]+?)%>/g
template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`')
template = 'echo(`' + template + '`);'

// 然后，将template封装在一个函数里面返回，就可以了。
let script = `(function parse(data){
  let output = "";
  function echo(html){
    output += html;
  }
  ${template}
  return output;
})`
return script
```

将上面的内容拼装成一个模板编译函数 `compile`。

```js
function compile(template) {
  const evalExpr = /<%=(.+?)%>/g
  const expr = /<%([\s\S]+?)%>/g
  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`')
  template = 'echo(`' + template + '`);'
  let script = `(function parse(data){
    let output = "";
    function echo(html){
      output += html;
    }
    ${template}
    return output;
  })`
  return script
}

// 用法如下
let parse = eval(compile(template))
div.innerHTML = parse({ supplies: ['broom', 'mop', 'cleaner'] })
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>
```

## 标签模板

模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。

```js
alert`hello`
// 等同于
alert(['hello'])
```

标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

## 模板字符串的限制

前面提到标签模板里面，可以内嵌其他语言。但是，模板字符串默认会将字符串转义，导致无法嵌入其他语言。

ES2018 放松了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回 `undefined`，而不是报错，并且从 `raw` 属性上面可以得到原始字符串。

```js
function tag(strs) {
  strs[0] === undefined
  strs.raw[0] === '\\unicode and \\u{55}'
}
tag`\unicode and \u{55}`
```

# 5. 字符串的新增方法

## 5.1 String.fromCodePoint( )

ES5 提供 `String.fromCharCode()` 方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于 `0xFFFF` 的字符。

```js
String.fromCharCode(0x20bb7) // "ஷ"
```

所以 `0x20BB7` 就发生了溢出，最高位 `2` 被舍弃了，最后返回码点 `U+0BB7` 对应的字符，而不是码点 `U+20BB7` 对应的字符。

ES6 提供了 `String.fromCodePoint()` 方法，可以识别大于 `0xFFFF` 的字符，弥补了 `String.fromCharCode()` 方法的不足。在作用上，正好与下面的`codePointAt()` 方法相反。

```js
String.fromCodePoint(0x20bb7) // "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y' // true
```

上面代码中，如果 `String.fromCodePoint` 方法有多个参数，则它们会被合并成一个字符串返回。

_注意，`fromCodePoint` 方法定义在 `String` 对象上，而 `codePointAt` 方法定义在字符串的实例对象上。_

## 5.2 String.raw( )

ES6 还为原生的 `String` 对象，提供了一个`raw()` 方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。

```js
String.raw`Hi\n${2 + 3}!` // 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

String.raw`Hi\u000A!` // 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"
```

如果原字符串的斜杠已经转义，那么 `String.raw()` 会进行再次转义。

```js
String.raw`Hi\\n` // 返回 "Hi\\\\n"

String.raw`Hi\\n` === 'Hi\\\\n' // true
```

`String.raw()` 方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

`String.raw()` 本质上是一个正常的函数，只是专用于模板字符串的标签函数。如果写成正常函数的形式，它的第一个参数，应该是一个具有 `raw` 属性的对象，且 `raw` 属性的值应该是一个数组，对应模板字符串解析后的值。

```js
// `foo${1 + 2}bar`
// 等同于
String.raw({ raw: ['foo', 'bar'] }, 1 + 2) // "foo3bar"
```

上面代码中，`String.raw()` 方法的第一个参数是一个对象，它的 raw 属性等同于原始的模板字符串解析后得到的数组。

作为函数，`String.raw()` 的代码实现基本如下。

```js
String.raw = function (strings, ...values) {
  let output = ''
  let index
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index]
  }

  output += strings.raw[index]
  return output
}
```

## 5.3 实例方法：charCodeAt( )

JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为 2 个字节。对于那些需要 4 个字节储存的字符（Unicode 码点大于 `0xFFFF` 的字符），JavaScript 会认为它们是两个字符。

```js
var s = '𠮷'

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
```

上面代码中，汉字“𠮷”（注意，这个字不是“吉祥”的“吉”）的码点是`0x20BB7`，UTF-16 编码为 `0xD842` `0xDFB7`（十进制为 `55362` `57271`），需要 4 个字节储存。对于这种 4 个字节的字符，JavaScript 不能正确处理，字符串长度会误判为 2，而且 `charAt( )` 方法无法读取整个字符，`charCodeAt( )` 方法只能分别返回前两个字节和后两个字节的值。

ES6 提供了 `codePointAt( )` 方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

```js
let s = '𠮷a'

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
s.codePointAt(2) // 97
```

`codePointAt( )`方法的参数，是字符在字符串中的位置（从 0 开始）。上面代码中，JavaScript 将 `𠮷a` 视为三个字符，`codePointAt` 方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点 `134071`（即十六进制的 `20BB7`）。在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”上，`codePointAt( )` 方法的结果与 `charCodeAt()` 方法相同。

总之，`codePointAt( )` 方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与 `charCodeAt( )` 方法相同。

`codePointAt( )` 方法返回的是码点的**十进制**值，如果想要**十六进制**的值，可以使用 `toString( )` 方法转换一下。

```js
let s = '𠮷a'

s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"
```

你可能注意到了，`codePointAt()` 方法的参数，仍然是不正确的。比如，上面代码中，字符 `a` 在字符串 `s` 的正确位置序号应该是 1，但是必须向 `codePointAt()` 方法传入 2。解决这个问题的一个办法是使用 `for...of` 循环，因为它会正确识别 32 位的 UTF-16 字符。

```js
let s = '𠮷a'
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16))
}
// 20bb7
// 61
```

另一种方法也可以，使用扩展运算符（`...`）进行展开运算。

```js
let arr = [...'𠮷a'] // arr.length === 2
arr.forEach((ch) => console.log(ch.codePointAt(0).toString(16)))
// 20bb7
// 61
```

`codePointAt()` 方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xffff
}

is32Bit('𠮷') // true
is32Bit('a') // false
```

## 5.4

## 5.5

## 5.6

## 5.7

## 5.8

## 5.9

# 6. 正则的扩展

# 7. 数值的扩展

# 8. 函数的扩展

# 9. 数组的扩展

# 10. 对象的扩展

# 11.对象的新增方法

# 12. Symbol

# 13. Set 和 Map 数据结构

# 14. Proxy

# 15. Reflect

# 16. Promise 对象

# 17. Iterator 和 for…of 循环

# 18. Generator 函数的语法

# 19. Generator 函数的异步应用

# 20. async 函数

# 21. Class 的基本语法

# 22. Class 的继承

# 23. Module 的语法

# 24. Module 的语法

# 25. 编程风格

# 26. 读懂规格

# 27. 异步遍历器

# 28. ArrayBuffer

# 29. 最新提案

# 30. Decorator

# 31. 参考链接

```

```

```

```

```

```

```

```

```

```

```

```
