/**
 * 类的构造函数
 */
namespace demo10 {
  class Person {
    constructor(public name: string) {}
  }
  class PersonChild extends Person {
    // 子类里写构造函数必须 super 调用父类的构造函数
    constructor(public age: number) {
      super("小智");
    }
  }
  const person = new Person("小刚");
  console.log(person.name);
  const person2 = new PersonChild(18);
  console.log(person2.name, person2.age);
}
// https://www.bilibili.com/video/BV1qV41167VD?p=12 第12集
