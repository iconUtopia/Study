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
    age: 18
  };
  /**
   * ts 能自动推断的时候就让其自行推断，不能推断的时候再注解
   */

  // 基础静态类型
  let num: number = 123;
  let str: string = "456";
  let bl: boolean = true;
  let empty: null = null;
  let und: number | undefined = 789; // 属于组合类型
  let all: any = 1;
  all = "2";
  all = true;
  all = function() {};
  let nev: never; // 表示的是那些永不存在的值的类型。
  // nev = (() => {
  //   throw new Error("111");
  // })();

  // 对象静态类型
  const arr: number[] = [1, 2, 3];
  const arr2: Array<string> = ["1", "2", "3"];
  const arr3: (string | number)[] = ["1", 2, "3"];
  const arr4 = [7, "8", true, undefined, null];
  type info = { name: string; age: number }; // 类型别名
  const arr5: info[] = [
    { name: "xiaoZhi", age: 16 },
    { name: "xiaoXia", age: 18 },
    { name: "xiaoGang", age: 20 }
  ];

  const tuple: [number, string, any] = [
    1,
    "2",
    function() {
      return true;
    }
  ]; // 数组的项中不允许出现其他的类型
  const obj = {
    name: "小明",
    age: 18
  };
  const obj2: { name: string; age: number } = {
    name: "小红",
    age: 17
  };

  function tsFunction1(): number {
    console.log("10086");
    return 10010;
  }
  function tsFunction2(): void {
    console.log("10086");
  }

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
  /**
   * 1. 如果 未赋值 的上 一个值是数字 那么这个 未赋值的值 的是上一个值的值+1
   * 2. 如果 未赋值 的 上一个值未赋值 那么输出的就是它的 下标
   * 3. 如果 未赋值的上一个值的值是非数字,那么必须赋值
   */
}

/*
 * 1. node 无法直接运行ts，所以需要通过运命令tsc xxx.ts将其转换为js。然后 node xxx.js 运行 js 文件中的代码
 * 2. 如果想直接运行ts，可以通过 npm install -g ts-node 全局安装ts-node,转换需要3-5s
 * 3. namespace + 空间名{},命名空间，防止变量冲突
 */
