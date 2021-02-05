/**
 * 类的访问类型 public private protected
 * public 默认，公共的，类的内部与外部都可以调用
 * private 私有的，只允许类的内部使用，外部调用会报错
 * protected 保护的，只允许类的内部使用，但继承后的子类可以使用
 */
namespace demo9 {
  // 类的内部和外部
  class Person {
    // 内部
    private _name: string;
    protected age: number;
    public say() {
      console.log(this._name + " hello");
    }
  }
  class PersonChild extends Person {
    answer() {
      return this.age;
    }
  }
  // 外部
  const person = new Person();
  person.say();
}
