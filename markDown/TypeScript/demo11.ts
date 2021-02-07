/**
 * 类的Getter、Setter和static静态类
 * private 封装属性，通过Getter、Setter访问
 */
namespace demo11 {
  class Person {
    constructor(private _age: number) {}
    set age(age: number) {
      this._age = age + 3;
    }
    get age() {
      return this._age - 10;
    }
  }
  const person = new Person(28);
  console.log(person.age);
  person.age = 25;
  console.log(person.age);
  // static 静态类
  class Girl {
    say() {
      return "Hello";
    }
    static say() {
      return "World";
    }
  }
  const boy = new Girl();
  console.log(boy.say());
  console.log(Girl.say());
}
