/*
 * 泛型
 * 泛型就是解决类、接口、方法的复用性，以及对不特定数据类型的支持。
 * 要求:传入的参数和返回的参数一致
 */
namespace Demo6 {
  // T 可改成其他任意值但定义的值，和传入的参数以及返回的参数是一样的,一般默认写法是 T，也是业内规范的选择

  /**
   * 函数 的泛型
   */
  console.log("函数 的泛型:");
  function getDate<T>(value: T): T {
    return value;
  }
  console.log(getDate<number>(123));

  function join<T, P>(first: T, second: P) {
    return `${first}${second}`;
  }
  console.log(join<number, string>(13, "14"));

  function arrT1<T1>(arr: T1[]) {
    return arr;
  }
  console.log(
    arrT1<string>(["123", "456", "789"])
  );

  function arrT2<T2>(arr: Array<T2>) {
    return arr;
  }
  console.log(
    arrT2<number>([123, 456, 789])
  );

  /**
   * 类 的泛型
   */
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
  console.log("类 的泛型:");
  class Person2<T> {
    constructor(private names: T[]) {}
    rollCall(index: number): T {
      return this.names[index];
    }
  }
  const person2 = new Person2<string>(["小智", "小霞", "小刚"]);
  console.log(person2.rollCall(0));
}
