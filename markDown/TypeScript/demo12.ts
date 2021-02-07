/**
 * 抽象类和只读属性的使用
 */
namespace demo12 {
  // readonly 只读
  class Person {
    name: string;
    public readonly age: number;
    constructor(_name: string, _age: number) {
      this.name = _name;
      this.age = _age;
    }
  }
  const person = new Person("红", 22);
  console.log(person);
  person.name = "蓝";
  console.log(person);
  // name 可以更改，但 age 因为被 readonly 标注只读属性所以不能进行更改了
  // person._age = 14;

  // 抽象类
  abstract class Info {
    abstract say(): any;
  }
  class Girl extends Info {
    say() {
      console.log("i'm girl");
    }
  }
  class Boy extends Info {
    say() {
      console.log("i'm boy");
    }
  }
  class Partner extends Info {
    say() {
      console.log("wang wang wang");
    }
  }
}
