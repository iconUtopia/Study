/*
 * 类型推断与类型注解，以及静态类型
 */
namespace Type {
  // 类型推断
  let count = 1;
  // 类型注解
  let count2: number = 1;
  let one = 1;
  let two = 2;
  const three = one + two;
  function getTotal(one: number, tow: number) {
    return one + tow;
  }
  const total = getTotal(1, 2);
  const count3 = {
    name: "name",
    age: 18,
  };
  /**
   * ts 能自动推断的时候就让其自行推断，不能推断的时候再注解
   */

  // 基础类型
  let str: string = "456";
  let num: number = 123;
  let bl: boolean = true;
  let empty: string | null = null; // 属于组合类型
  let und: number | undefined = 789; // 属于组合类型
  let test: string;
  let all: any = 1;
  all = "2";
  all = true;
  all = function () {};
  all = "1";
  test = all; // 不报错
  let un: unknown = 1;
  un = "1";
  // test = un; //会报错
  // 赋值处理方式：
  // 方法一：typeof 判断数据类型
  if (typeof un === "string") test = un;
  // 方法二：类型断言，可以用来告诉解析器变量的实际类型
  test = un as string;
  test = <string>un;

  // 引用类型
  const obj = {
    name: "小明",
    age: 18,
  };
  const obj2: { name: string; age: number } = {
    name: "小红",
    age: 17,
  };
  // 属性名后面接个 ? 表示该属性可选
  // [propName: string]: any 表示 propName是 string 类型的属性名，值是 any 类型
  const obj3: { name: string; age?: number; [propName: string]: any } = {
    name: "小明",
    stature: 170,
  };
  const arr: number[] = [1, 2, 3];
  const arr2: Array<string> = ["1", "2", "3"];
  const arr3: (string | number)[] = ["1", 2, "3"];
  const arr4 = [7, "8", true, undefined, null];
  type info = { name: string; age?: number; [propName: string]: any }; // 类型别名
  const arr5: info[] = [
    { name: "xiaoZhi", age: 16 },
    { name: "xiaoXia", age: 18 },
    { name: "xiaoGang", age: 20 },
    { name: "xiaoGang" },
    { name: "xiaoGang", stature: 174 },
  ];
  const tuple: [number, string, any] = [1, "2", function () {}]; // 元祖的长度是固定的，可以为数组中的每个参数定义相对应的类型

  function tsFunction1(): number {
    console.log("10086");
    return 10010;
  }
  function tsFunction2(): void {
    console.log("10086");
  }
  function nev(): never {
    throw new Error("never 的正确使用方式");
  } // 表示的是永不返回结果

  enum Person {
    Boy,
    Girl,
    Man = 4,
    Woman,
  }
  // Enum 类型对象有默认的值，从 0 开始的枚举
  console.log(Person.Boy);
  console.log(Person.Girl);
  // Enum 类型对象可以给键赋值，从赋值的键开始递增
  console.log(Person.Man);
  console.log(Person.Woman);
  // 也可以通过下标查找到Enum 类型对象的值
  console.log(Person.Boy, Person[0]);
  /**
   * 1. 如果 未赋值 的上 一个值是数字 那么这个 未赋值的值 的是上一个值的值+1
   * 2. 如果 未赋值 的 上一个值未赋值 那么输出的就是它的 下标
   * 3. 如果 未赋值的上一个值的值是非数字,那么必须赋值
   */
  let person = { name: "小智", property: Person.Boy };
  console.log(person.property === Person.Man);
}

/*
 * 1. node 无法直接运行ts，所以需要通过运命令tsc xxx.ts将其转换为js。然后 node xxx.js 运行 js 文件中的代码
 * 2. 如果想直接运行ts，可以通过 npm install -g ts-node 全局安装ts-node,转换需要3-5s
 * 3. namespace + 空间名{},命名空间，防止变量冲突
 */
