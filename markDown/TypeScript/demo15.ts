/**
 * TypeScript函数中使用泛型
 * 泛型就是在函数调用时确定值得类型，而类型注解是在函数定义是确定值的类型
 */
namespace demo15 {
  function join(first: string | number, second: string | number) {
    return console.log(`${first}${second}`);
  }
  join("线外花园", 24);
  /* 函数 中使用泛型 */
  function join2<T>(first: T, second: T) {
    return console.log(`${first}${second}`);
  }
  join2<string>("重庆", "信茂源");
  // 多个泛型的使用方式
  function join3<T, P>(first: T, second: P) {
    return console.log(`${first}${second}`);
  }
  join3<number, string>(13, "14");
  console.log("---------");
  /* 数组 中使用泛型 */
  function arrFn<T1>(arr: T1[]) {
    return console.log(arr);
  }
  arrFn<string>(["123", "456", "789"]);
  // 泛型对数组的另一种定义方式
  function arrFn2<T2>(arr: Array<T2>) {
    return console.log(arr);
  }
  arrFn2<number>([123, 456, 789]);
  console.log("---------");
  /* 类 中使用泛型 */
  // 普通类
  class Person {
    constructor(private names: string[]) {}
    rollCall(index: number): string {
      return this.names[index];
    }
  }
  const person = new Person(["小智", "小霞", "小刚"]);
  console.log(person.rollCall(2));
  // 泛型类
  class Person2<T> {
    constructor(private names: T[]) {}
    rollCall(index: number): T {
      return this.names[index];
    }
  }
  const person2 = new Person2<string>(["小智", "小霞", "小刚"]);
  console.log(person2.rollCall(0));
  // 泛型类继承
  interface Names {
    name: string;
  }
  class Person3<T extends Names> {
    constructor(private names: T[]) {}
    rollCall(index: number): string {
      return this.names[index].name;
    }
  }
  const person3 = new Person3([
    { name: "小智" },
    { name: "小霞" },
    { name: "小刚" }
  ]);
  console.log("继承:" + person3.rollCall(1));
  // 泛型类约束
  class Person4<T extends number | string> {
    constructor(private names: T[]) {}
    rollCall(index: number): T {
      return this.names[index];
    }
  }
  const person4 = new Person4<number>([123, 456, 789]);
  console.log("约束:" + person4.rollCall(1));
}
