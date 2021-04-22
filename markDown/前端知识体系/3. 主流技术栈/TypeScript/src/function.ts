/*
 * 函数
 * TS 形参和实参的个数是必须对应的
 */
namespace TsFunction {
  // 函数声明方式
  function tsFunction1(): void {}
  let fn: (a: number, b: number) => number;
  fn = function(n1: number, n2: number) {
    return n1 + n2;
  };
  // 方法传参
  function tsFunction2(
    name: string,
    age?: number,
    school: string = "重庆大学"
  ): any {
    return `name:${name}--age:${age}--school:${school}`;
  }
  tsFunction2("小刚");
  // 定义函数返回值类型为 never,函数永远执行不完
  function tsFunction3(): never {
    throw new Error();
    console.log("hello world");
  }
  // 函数参数为对象
  function tsFunction4({ one, two }: { one: number; two: number }): number {
    return one + two;
  }
  console.log(tsFunction4({ one: 1, two: 2 }));
  // 剩余参数
  function tsFunction5(a: number, b: number, ...arr: number[]): number {
    let sum: number = a + b;
    arr.forEach(element => {
      sum += element;
    });
    console.log(arr); // [3, 4, 5];
    return sum;
  }
  console.log(tsFunction5(1, 2, 3, 4, 5)); //15
  // 函数重载
  function reload(name: string): string;
  function reload(age: number): string;
  function reload(param: any): any {
    return typeof param === "string" ? `我是:${param}` : `我的年龄:${param}`;
  }
  console.log(reload(18)); //年龄
}
