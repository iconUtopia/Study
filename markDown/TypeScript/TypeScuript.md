# TypeScript

## 基本数据类型

- 数字
- 字符串
- 布尔
- undefined
- null
- 数组
- 元祖
- 枚举
- 对象
- void
- never
- any

##### 数字

```ts
const a: number = 1;
```

##### 字符串

```ts
const b: string = "1";
```

##### 布尔

```ts
const c: boolean = true;
```

##### undefined

属于组合类型

```ts
let d: number | undefined;
```

##### null

```ts
let e: null;
```

##### 数组

```ts
const f: number[] = [1, 2, 3];
const g: Array<number> = [4, 5, 6];
const h: any[] = [7, "8", true];
```

##### 元组

可以为数组中的每个参数定义相对应的类型

```ts
const j: [number, string, any] = [
  1,
  "2",
  function() {
    return 3;
  }
];
```

##### 枚举

```ts
enum Person {
  Boy,
  Girl,
  Man = 4,
  Woman
}
// Enum 类型对象有默认的值，从 0 开始的枚举
console.log(Status.Boy);
console.log(Status.Girl);
// Enum 类型对象可以给键赋值，从赋值的键开始递增
console.log(Status.Man);
console.log(Status.Woman);
// 也可以通过下标查找到Enum 类型对象的值
console.log(Status.Boy, Status[0]);
```

1. 如果 **未赋值** 的上 **一个值是数字** 那么这个 **未赋值的值** 的是上一个值的值+1
2. 如果 **未赋值** 的 **上一个值未赋值** 那么输出的就是它的 **下标**
3. 如果 **未赋值的上一个值的值是非数字**,那么必须赋值

##### 对象

```ts
const k: object = {};
```

##### void

指定方法类型，表示没有返回值,方法体中不能`return`

```ts
function aa(): void {
  console.log(1);
}

//如果方法有返回值，可以加上返回值的类型
function bb(): number {
  return 1;
}
```

##### never

其他类型 (包括 null 和 undefined)的子类型，代表从不会出现的值

```ts
let l: never;

//匿名函数并抛出异常
l = (() => {
  throw new Error("111");
})();
```

##### any

让参数可以是任何一种类型

```ts
let h: any = 1;
h = true;
h = "st";
```

## 函数

### 函数申明

```ts
function cc(): void {}
```

### 方法传参

```ts
function getUserInfo(name: string, age?: number, school: string = "清华大学") {
  return `name:${name}--age:${age}--school:${school}`;
}
```

?代表这个参数可传可不传,不传就是 undefined,也可定义个默认的值

### 剩余参数

传递多个时，如果用了剩余参数，就可以把未定义的形参转换为数组。

```ts
function sum(a: number, b: number, ...arr: number[]): number {
  let sum: number = a + b;
  arr.forEach(element => {
    sum += element;
  });
  console.log(arr); // [3, 4, 5];
  return sum;
}
console.log(sum(1, 2, 3, 4, 5)); //15
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

> 第 1 个重载(共 2 个)，“(name: string): string”，出现以下错误。
> 类型“never[]”的参数不能赋给类型“string”的参数。
>
> 第 2 个重载(共 2 个)，“(age: number): string”，出现以下错误。
> 类型“never[]”的参数不能赋给类型“number”的参数

## 类

```ts
class Girl {
  // public 公共变量
  public name: string;
  // protected 保护变量
  protected age: number;
  // private 私有变量
  private weight: number;
  // 构造函数
  constructor(name: string, age: number, weight: number) {
    this.name = name;
    this.age = age;
    this.weight = weight;
  }
  set infor(name?: string, age?: number, weight?: number) {
    this.name = name;
    this.age = age;
    this.weight = weight;
  }
  get infor() {
    return `我的名字叫${this.name}，今年${this.age}，体重${this.weight}qk`;
  }
  introduction(): string {
    return `我的名字叫${this.name}，今年${this.age - 1}，体重${this.weight -
      2}qk`;
  }
}
```

## 继承

## 多态

## 接口

### 属性接口

### 函数类型接口

### 可索引接口

#### 约束数组

#### 约束对象

### 类类型接口

## 泛型

## 模块

## 命名空间

## 装饰器
