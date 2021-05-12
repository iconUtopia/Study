# TypeScript

## 安装开发环境

1. 安装 node.js
2. `npm install typescript -g`或`yarn global add typescript` 全局安装 TypeScript

### 编译 ts 代码

- node 无法直接运行 ts，所以需要通过运命令 `tsc xxx.ts` 将其转换为 js。然后 `node xxx.js` 运行 js 文件中的代码
- 运行命令 `tsc xxx.ts -w` 对 ts 文件进行实时监视，并编译为 js
- 在项目根目录下输入命令`tsc -init`生成 tsconfig.json 编译配置文件
- 有了配置文件后就可以在在项目根目录下输入命令 `tsc` 编译所有 ts 文件，也可以通过`tsc -w` 编译且监视所有 ts 文件
- `tsc`默认生成的是 ES3 的代码，我们编译的时候需要通过`--target ESx 1.js`指定 ts 编译的版本。也可以向在`tsconfig.json`中的`target`项配置
- 如果想直接运行 ts，可以通过 `npm install -g ts-node` 全局安装 ts-node,转换需要 3-5s

---

## webpack 打包 ts

1. 运行`npm init -y`生成 package.json 文件
2. 运行`npm i -D webpack webpack-cli`安装 webpack 和 webpack 命令行工具
3. 运行`npm i -D typescript ts-loader`安装 TS 环境和 TS 加载器
4. 在 webpack.config.js 文件配置

### webpack 打包运行 ts 项目

1. `npm i -D html-webpack-plugin`,自动生成 html 文件。然后在 webpack.config.js 中引入 `const HTMLWebpackPlugin = require("html-webpack-plugin")`
2. webpack.config.js 中配置 `plugin`属性。`npm run build` 打包后生成 html 文件
3. `npm i -D html-dev-serve`安装 webpack 内置服务器。然后命令行中运行 package.json 中的 scripts.start 的配置
4. `npm i -D clean-webpack-plugin` 插件用于 `npm run build` 时清空 dist 中的旧文件。在 webpack.config.js 中引入`const {cleanWebpackPlugin} = require("clean-webpack-plugin")`配置
5. 在 webpack.config.js 中配置。使 webpack 能识别引入的 ts 模块
6. `npm i -D @babel/core @babel/preset-env babel-loader core-js` 解决代码兼容性问题

```js
const path = require("path");
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, "dist"),
    //打包后文件的文件名
    filename: "bundle.js",
    // 配置打包环境
    environment:{
      // webpack 不使用箭头函数
      arrowFunction:false
    }
  },
  // 指定 webpack 打包时要用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // 指定规则生效的文件
        test: /\.ts$/,
        // 要使用ts-loader 对 ts 文件进行处理
        use:[
          // babel-loader用来处理代码兼容性
          {
            // 指定加载器
            loader:"babel-loader",
            // 设置 babel
            options:{
              // 设置预定义的环境
              presets:[
                [
                  // 指定环境插件
                  "@babel-preset-env",
                  // 配置信息
                  {
                    targets:{
                      "ie":"11", // 代码需要兼容到 ie 11版本
                    }
                    "corejs":"3", // 指定 corejs 版本
                    "useBuiltIns":"usage", // 使用 corejs 的方式 "usage" 表示按需加载
                  }
                ]
              ]
            }
          },
          "ts-loader"
        ] ,
        // 要排除的文件
        exclude: /node_modules/
      }
    ]
  },
  plugin: {
    // 生成 html 入口文件
    new HTMLWebpackPlugin({
      title: "设置生成项目的 title",
      template: "./src/index.html" // 根据模板生成 HTML
    });
    // 清除 打包文件夹里的旧文件
    new cleanWebpackPlugin();
  },
  resolve: {
    // 使webpack 识别 ts 文件模块
    extensions: [".ts", ".js"];
  }
};
```

1. 配置 tsconfig.json
2. 在 package.json 中配置 `"build":"webpack"`

---

## 数据类型

### 基础类型

- 字符串
- 数字
- 布尔
- null
- undefined
- any
- unknown

###### 字符串

```ts
const str: string = "1";
```

###### 数字

```ts
const num: number = 1;
```

###### 布尔

```ts
const bl: boolean = true;
```

###### null

属于组合类型

```ts
let empty: string | null;
```

###### undefined

属于组合类型

```ts
let und: number | undefined;
```

###### any

让参数可以是任何一种类型

```ts
let all: any = 1;
all = true;
all = "st";
let a: string;
a = all; // 不报错
```

将 `any` 类型的变量直接赋值给其他类型的变量，**会改变其他变量的类型声明**

###### unknown

```ts
let un: unknown = 1;
un = true;
un = "st";
let a: string;
a = un; // 会报错
```

`unknown` 类型的变量就是一个安全的`any`，不可以直接将`unknown`类型的变量赋值给其他变量。

赋值处理方式：

```ts
// 方法一：typeof 判断数据类型
if (typeof un === "string") a = un;
// 方法二：类型断言，可以用来告诉解析器变量的实际类型
a = un as string;
a = <string>un;
```

### 引用类型

- 对象
- 数组
- 元组
- 枚举
- void
- never

###### 对象

```ts
const obj = {
  name: "小明",
  age: 18
};
const obj2: { name: string; age: number } = {
  name: "小红",
  age: 17
};

const obj3: { name: string; age?: number; [propName: string]: any } = {
  name: "小明",
  stature: 170
};
```

- 属性名后面接个 `?` 表示该属性可选，不传默认是 undefined。
- `[propName: string]: any` 表示 propName 是 string 类型的属性名，值是 any 类型

###### 数组

```ts
const arr1: number[] = [1, 2, 3];
const arr2 = [1, "2", true, undefined, null];
const arr3: Array<number> = [1, 2, 3];
const arr4: (string | number)[] = ["1", 2, "3"];

// 类型别名
type info = { name: string; age?: number; [propName: string]: any };
const arr5: info[] = [
  { name: "xiaoZhi", age: 16 },
  { name: "xiaoXia", age: 18 },
  { name: "xiaoGang", age: 20 },
  { name: "xiaoGang" },
  { name: "xiaoGang", stature: 174 }
];
```

###### 元组

元祖类型表示一个已知元素数量和类型的数组，可以为数组中的每个参数定义相对应的类型

```ts
const tuple: [number, string, any] = [1, "2", function() {}];
```

###### 枚举

```ts
enum Person {
  Boy,
  Girl,
  Man = 4,
  Woman
}
// Enum 类型对象有默认的值，从 0 开始的枚举
console.log(Person.Boy);
console.log(Person.Girl);
// Enum 类型对象可以给键赋值，从赋值的键开始递增
console.log(Person.Man);
console.log(Person.Woman);
// 也可以通过下标查找到Enum 类型对象的值
console.log(Person.Boy, Person[0]);
let person = { name: "小智", property: Person.Boy };
console.log(person.property === Person.Man);
```

1. Enum 类型的默认值是**从 0 递增**。
2. 如果给 Enum 类型的其中一项赋值**number 类型**的值，那么后续的枚举项的值以它为起始递增
3. 如果给 Enum 类型的其中一项赋值**非 number 类型**的值，那么后续的枚举项都需要进行单独赋值

###### void

指定方法类型，表示没有返回值，方法体中不能`return`

```ts
function aa(): void {
  console.log(1);
}

//如果方法有返回值，可以加上返回值的类型
function bb(): number {
  return 1;
}
```

###### never

表示永远不存在的值的类型，是任何类型的(包括 null 和 undefined)的子类型，表示的是永不返回结果

```ts
function nev(): never {
  throw new Error("never 的正确使用方式");
}
```

---

## 函数

### 函数声明

```ts
// 无返回值
function tsFunction1(): void {}
// 有返回值
let tsFunction2: (a: number, b: number) => number;
tsFunction2 = function(n1: number, n2: number) {
  return n1 + n2;
};
```

### 函数传参

```ts
function tsFunction3(
  name: string,
  age?: number,
  school: string = "重庆大学"
): any {
  return `name:${name}--age:${age}--school:${school}`;
}

// 函数参数为对象
function tsFunction4({ one, two }: { one: number; two: number }): number {
  return one + two;
}
console.log(tsFunction4({ one: 1, two: 2 }));
```

- 调用函数时传的参数的数量或类型不符合函数定义参数时的要求，TypeScript 会报错；
- 在参数后面加个`?`指定该参数为可选参数，可选参数可不传；
- 当函数有可选参数时，必须检查参数是否被传递；
- 在声明函数时，可以指定参数的默认值。这种情况的参数也是可选参数；

### 剩余参数

传递多个参数时，如果用了剩余参数，就可以把未定义的形参转换为数组。

```ts
function tsFunction5(a: number, b: number, ...arr: number[]): number {
  let sum: number = a + b;
  arr.forEach(item => {
    sum += item;
  });
  console.log(arr); // [3, 4, 5];
  return sum;
}
console.log(tsFunction5(1, 2, 3, 4, 5)); //15
```

### 函数重载

```ts
function reload(name: string): string;
function reload(age: number): string;
function reload(param: any): any {
  return typeof param === "string" ? `我是:${param}` : `我的年龄:${param}`;
}
console.log(reload(18)); //年龄
```

**被重载** 的方法，是 **没有方法体**，可以根据参数的类型走其中一个方法并判断参数，但如果 **传入的参数类型不是任何被重载方法的参数类型** 就不允许通过。

- 第 1 个重载：`function reload(name: string): string`，出现以下错误：类型“never[]”的参数不能赋给类型“string”的参数。

- 第 2 个重载：`function reload(age: number): string`，出现以下错误：类型“never[]”的参数不能赋给类型“number”的参数

---

## 类

1. 使用 `class` 定义类
2. 使用 `constructor` 定义构造函数
3. 通过 `new` 关键字生成实例会自动调用构造函数

```ts
class Person {
  readonly surname: string = "李"; // readonly 只读属性
  public name: string; // public 公共变量
  protected _age: number; // protected 保护变量
  private _weight: number; // private 私有变量
  // 构造函数
  constructor(name: string, age: number, weight: number = 80) {
    this.name = name;
    this._age = age;
    this._weight = weight;
  }
  introduction(): string {
    return `我叫${this.name}，兴趣爱好是老头乐`;
  }
  // 用于访问 protected、private 的访问器 Getter、Setter 属性
  get info() {
    return `我的名字叫王${this.name}，今年${this._age}，体重${this._weight}qk`;
  }
  set weight(weight: number) {
    this._weight = weight - 1;
  }
  getInfo(): string {
    return `我的名字叫王${this.name}，今年${this._age}，体重${this._weight}qk`;
  }
  setAge(age: number): void {
    this._age = age;
  }
}

const man = new Person("尼玛", 42, 74);
console.log(man);
console.log(man.introduction());
// console.log(man._age); // 只能在类的内部访问
// console.log(man._weight); // 只能在类的内部访问
console.log(man.info);
console.log("---");
man.name = "德发";
man.weight = 66;
man.setAge(43);
console.log(man.getInfo());
console.log("---");
```

### 类的成员

1. 属性
2. 方法

### 修饰符

- 修饰符是可选的，没有写任何修饰符，默认是 `public`
- 同类修饰符只能有一个
- 三种修饰符有先后顺序，分别是：访问、静态、只读

###### 访问修饰符：

1. `public`：修饰的属性和方法是**公共**的，在当前类里面，子类，类外面**都可以访问**;
2. `protected`：修饰的属性和方法是**受保护**的，在当前类和子类的内部可以访问，**类的外部无法访问**;
3. `private`：修饰的属性和方法是**私有**的，在当前类内部可访问，**子类和类外的部都无法访问**（在编译后的代码中，并没有限制外部访问）。

###### 静态修饰符：

`static` 静态属性，静态成员无需实例化，直接通过类名调用。静态成员通常用于整个类所共有的一些东西。

###### 只读修饰符：

`readonly` 只读属性，只能在声明同时赋予初始值和在构造函数中赋值或修改初始值

### 继承

1. 使用`extends`关键字实现继承
2. 子类中使用`super`关键字来调用父类的构造函数和方法

```TypeScript
 class Son extends Person {
    // 静态属性
    static surname: string = "王";
    // 学校
    school: string;
    //构造方法
    constructor(
      name: string,
      age: number,
      weight: number,
      school: string = "北京大学"
    ) {
      // 访问派生类的构造函数中的 "this" 前，必须调用 "super",初始化父类构造函数 --并把参数传给父类
      super(name, age, weight);
      //把传进来的school赋值给全局变量
      this.school = school;
    }
    //静态方法
    static hisSurname() {
      return `孩子姓${this.surname}，请各位网友帮忙取个名字`;
    }
  }
  console.log(Son.hisSurname());
  let son = new Son("斯格", 5, 27, "春天花花幼儿园");
  console.log(son);
  son.setAge(6);
  son.weight = 26;
  console.log(son.info);
```

### 多态

类的多态，又被称为抽象类，是提供其它类继承的基类。

1. 使用`abstract`关键字定义抽象类和在抽象类内部定义抽象方法；
2. 抽象类无法**实例化**；
3. 抽象成员包括**属性**和**方法**；
4. 抽象类中的抽象方法**不包含具体实现**，必须**在派生类中定义**；

```ts
abstract class Animal {
  // 抽象类
  name: string;
  // 构造函数
  constructor(name: string) {
    this.name = name;
  }
  //抽象成员--方法
  abstract eat(): any;
  //抽象成员--属性
  protected abstract ages: Number;
  sleep(): void {
    console.log("睡觉");
  }
}
class cat extends Animal {
  ages: Number = 2;
  constructor(name: string) {
    super(name);
  }
  //非抽象类“cat”不会自动实现继承自“Animal”类的抽象成员“eat”,  必须手动定义父类中的抽象方法--多态
  eat(): string {
    return "猫吃鱼";
  }
  //多态
  sleep(): string {
    return "猫在睡觉";
  }
}
console.log(new cat("33").sleep());
```

---

## 接口

接口就是用来**定义一个类的结构**。

在面向对象的编程中，接口是一种**规范的定义**，它定义了行为和动作的规范；在程序设计里面，接口起到一种限制和规范的作用。

接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。ts 中的接口类似于 java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。

###### interface 和 type 的区别:

1. `type Info = string` 写法，但 `interface` 不可以
2. `type` 不能重复声明，但 `interface` 可以，两个同名的 `interface` 会将它们合并为一个

#### 对象接口

```ts
interface Person {
  name: string;
  age: number;
  stature?: number;
  weight?: number;
  [propName: string]: any;
  约束;
  say(): string;
}
```

常用的接口模式，key 需要对应上。

#### 函数接口

key 不需要对应上，接口只对传入的参数的数量和类型以及返回值进行约束，不对参数名称进行约束。

```ts
interface Pokemon {
  (name: string): void;
}
```

#### 可索引接口

```ts
interface PokemonInfo {
  [index: string]: any;
}
```

1. 对数组进行约束,`index` 后必须跟着 `number` 类型。
2. 对对象进行约束,`index` 后必须跟着 `string` 类型
3. 索引签名参数类型必须为 `string` 或 `number`

#### 类类型接口

```ts
class Person implements Person {
  name: string;
  age: number;
  weight?: number;
  stature?: number;
  constructor(name: string, age: number, weight?: number) {
    this.name = name;
    this.age = age;
    this.weight = weight;
  }
  say() {
    return `我是要成为宝可梦训练大师的男人`;
  }
  selectPartner(partner: string) {
    console.log(`我要选择${partner}和我一起踏上成为宝可梦大师的旅程`);
  }
}
```

- 类接口会对类的**属性**和**方法**进行约束，只描述的公共部分，不会检查私有部分；
- 类似非抽象类继承抽象类时必须实现某些方法和属性，但对属性和方法的类型的约束更加严格；
- 除了方法 **void 类型**可被**重新定义**外，其他属性或方法的类型定义需要和接口保持一致。

#### 接口继承

```ts
interface Trainer extends Person {
  selectPartner: Pokemon;
}
```

### 使用举例

```ts
const man = new Person("小智", 17);
function screenResume(info: Person) {
  console.log(info.say());
  info.age < 14 && console.log(info.name + "你年龄不够，不能成为宝可梦训练师");
  info.age >= 14 &&
    console.log(info.name + "恭喜你达到了成为宝可梦训练师的年龄");
}
screenResume(man);
const logon = (info: Trainer) => {
  console.log("---");
  console.log("姓名：" + info.name);
  console.log("年龄：" + info.age);
  info.stature && console.log("体重：" + info.stature);
  info.weight && console.log("身高：" + info.weight);
  info.selectPartner("皮卡丘");
  console.log("---");
  let Pokemon: PokemonInfo = {
    name: "皮卡丘",
    age: 1,
    sex: "公",
    character: "傲娇",
    skillName: (function() {
      return `十万伏特`;
    })()
  };
  console.log("partner:", Pokemon);
};
logon(man);
```

---

## 联合类型

只要函数的**一个参数有两种以上的类型**就称为联合类型，联合类型只提示公共的属性。只有在有联合类型的情况下才有**类型保护（类型守护）**

```ts
interface JieNiGui {
  tortoise: boolean;
  swim: () => {};
}
interface SuanTouWangBa {
  tortoise: boolean;
  yygq: () => {};
}
```

###### 第一种类型保护方案：类型断言方式

```ts
function trainPokemon(pokemon: JieNiGui | SuanTouWangBa) {
  // 这里直接调用 pokemon.swim() 是会报错的，因为 SuanTouWangBa 不存在 swim()
  if (pokemon.tortoise) {
    (pokemon as JieNiGui).swim(); // 强制告诉 TS，pokemon 是 JieNiGui 类型
  } else (pokemon as SuanTouWangBa).yygq();
}
```

###### 第二种类型保护方案： in 语法来做类型保护

```ts
function trainPokemon2(pokemon: JieNiGui | SuanTouWangBa) {
  // 告诉 ts pokemon 里面有 swim
  if ("swim" in pokemon) {
    pokemon.swim();
  } else pokemon.yygq();
}
```

###### 第三种类型保护方案： typeof 语法来做类型保护

```ts
function add(first: string | number, second: string | number) {
  // 这里直接 first + second 也会报错，因为有可能他们是 string 类型,这个时候也可以用类型保护
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`;
  }
  return first + second;
```

###### 第四种类型保护方案： instanceof 语法来做类型保护

```ts
class NumberObj {
  // 因为只有 class 才能用 instanceof 做类型保护
  count: number = 1;
}
function addSecond(first: object | NumberObj, second: object | NumberObj) {
  // 这里直接 first.count + second.count 也会报错，因为有可能他们是 object，没有 count 属性，这个时候也可以用类型保护
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
```

## 泛型

泛型就是解决**类**、**接口**、**方法**的**复用性**，以及对**不特定数据类型**的支持。

要求:传入的参数和返回的参数一致

### 函数的泛型

```ts
function getDate<T>(value: T): T {
  return value;
}
console.log(getDate<number>(123));
```

T 可改成其他任意值但定义的值，和传入的参数以及返回的参数是一样的,一般默认写法是 T，也是业内规范的选择。

### 类的泛型

```ts
class MinClass<T> {
  public list: T[] = [];
  //添加
  add(value: T): void {
    this.list.push(value);
  }

  //求最小值
  min(): T {
    //假设这个值最小
    let minNum = this.list[0];
    for (let i = 0; i < this.list.length; i++) {
      //比较并获取最小值
      minNum = minNum < this.list[i] ? minNum : this.list[i];
    }
    return minNum;
  }
}
//实例化类 并且指定了类的T的类型是number
let minClass = new MinClass<number>();
minClass.add(23);
minClass.add(5);
minClass.add(2);
console.log(minClass.min());
//实例化类 并且指定了类的T的类型是string，则其方法的传参和返回都是string类型
let minClass2 = new MinClass<string>();
minClass2.add("23");
minClass2.add("5");
minClass2.add("2");
console.log(minClass2.min());
```

### 接口泛型

第一种写法：

```ts
interface ConfigFn {
  //规范参数类型,返回值类型
  <T>(value: T): T;
}

let getData: ConfigFn = function<T>(value: T): T {
  return value;
};

console.log(getData<string>("z11"));
```

第二种写法：

```ts
interface ConfigFn<T> {
  //参数类型 ，返回值类型
  (value: T): T;
}

//接口方法
function getData<T>(value: T): T {
  return value;
}

//使用接口
let myGetDate: ConfigFn<string> = getData;
console.log(myGetDate("3"));
```

接口的泛型只针对**函数类型**的接口

### 类当做参数传入泛类型

```ts
//用户类--和数据库表字段进行映射
class User {
  username: string | undefined;
  password: string | undefined;
  //构造函数-初始化参数
  constructor(param: {
    username: string | undefined;
    password?: string | undefined;
  }) {
    this.username = param.username;
    this.password = param.password;
  }
}

//数据库类
class Db<T> {
  add(user: T): boolean {
    console.log(user);
    return true;
  }
  updated(user: T, id: number): boolean {
    console.log(user, id);
    return true;
  }
}

let u = new User({
  username: "张三"
});

//u.username = "李四";
u.password = "111111";
let db = new Db<User>();
db.add(u);
db.updated(u, 1);
```

类的参数名和类型都做了约束。

## 模块

内部模块称为命名空间，外部模块简称为模块，模块在其自身的作用域里执行，而不是在全局作用域里;

这意味着定义在一个模块里的变量、函数、类等等在模块外部是不可见的，除非你明确的使用 `export` 形式之一导出它们。

相反，如果想使用其它模块导出的变量，函数，类，接口等的时候，你必须要导入它们，可以使用 `import` 形式之一。

模块里面的变量、函数、类等默认是私有的，如果我们要在外部访问模块里面的数据(变量、函数、类)，我们需要通过 `export` 暴露模块里面的数据(变量、函数、类...)，暴露后我们通过 `import` 引入模块就可以使用模块里面暴露的数据(变量、函数、类...)。

```ts
//modules/db.ts
function getDate(): any[] {
  console.log("获取数据");
  return [
    {
      userName: "张三"
    },

    {
      userName: "李四"
    }
  ];
}

//一个模块里面可以用多次
// export { getDate };
//一个模块里面只能用一次
export default getDate;
```

```ts
// import { getDate as getDbDate } from "./modules/db";
import getDbDate from "./modules/db";
getDbDate();
```

这个调试时浏览器中不能直接使用,可在 node 和 weakpack 的环境中调试。

## 命名空间

在代码量较大的情况下，为了避免各种变量命名相冲突，可将相似功能的函数、类、接口等放置到命名空间内

TypeScript 的命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象。

命名空间和模块的区别:

- 命名空间：内部模块，主要用于组织代码，避免命名冲突。
- 模块：ts 外部模块的简称，侧重代码的复用，一个模块里可能会有多个命名空间

```ts
// modules/Animal.ts
export namespace A {
  interface Animal {
    name: String;
    eat(): void;
  }

  export class Dog implements Animal {
    name: String;
    constructor(theName: string) {
      this.name = theName;
    }
    eat() {
      console.log("我是" + this.name);
    }
  }
}

export namespace B {
  interface Animal {
    name: String;
    eat(): void;
  }

  export class Dog implements Animal {
    name: String;
    constructor(theName: string) {
      this.name = theName;
    }
    eat() {}
  }
}
```

```ts
import { A, B } from "./modules/Animal";
let ee = new A.Dog("小贝");
ee.eat();
```

## 装饰器

装饰器是一种**特殊类型**的声明，它能够被附加到类声明，方法，属性上，可以为原本额代码添加额外的功能。

通俗的讲装饰器就是一个函数，可以注入到类、方法、属性参数上来扩展类、方法、属性的功能

装饰器的写法：普通装饰器（无传参）、装饰器工厂（可传参）

类装饰器：类装饰器在类申明之前被申明(紧靠着类申明)，类装饰器应用于类构造函数，可以用于监视，修改或者替换类定义。

### 普通装饰器

```ts
function logClass(params: any) {
  console.log(params);
  //params 就是指代当前类--HttpClient
  params.prototype.apiUrl = "动态扩展属性";
  params.prototype.run = function() {
    console.log("动态扩展方法");
  };
  params.prototype.getDate = function() {
    console.log("动态扩展方法2");
  };
}

@logClass
class HttpClient {
  constructor() {}
  getDate() {
    console.log(1);
  }
}

let http: any = new HttpClient();
console.log(http.apiUrl);
http.run();
http.getDate();
```

装饰器会覆盖被装饰的类中的方法。

### 装饰工厂

可传参的装饰器

```ts
function logClassB(param: string) {
  return function(target: any) {
    console.log(target, "装饰器以下的类");
    console.log(param, "装饰器传进来的属性");
  };
}

@logClassB("小慧")
class HttpClients {
  constructor() {}
  getDate() {}
}

let https: any = new HttpClients();
console.log(https);
```

### 构造函数装饰器

```ts
function logClassC(target: any) {
  console.log(target, 1111);
  //用在这里继承目标类并重载方法和属性
  return class extends target {
    a: any = "我是修改后的属性";
    getDate() {
      console.log(this.a + "--装饰器中的方法输出的");
    }
  };
}

@logClassC
class HttpClient2 {
  public a: string | undefined;
  constructor() {
    this.a = "我是构造函数里面的a";
  }
  getDate() {
    console.log(this.a);
  }
}
const https2 = new HttpClient2();
https2.getDate();
```
