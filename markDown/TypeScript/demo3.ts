/*
 * 类、继承、多态
 * 类的成员（属性和方法）
 * 访问修饰符：公共(public)、保护(protected)、私有(private)
 * 静态修饰符：静态属性(static)
 * 只读修饰符：只读属性(readonly)
 */
namespace TsClass {
  // 类的使用、类的属性
  class Person {
    // readonly 只读属性，只能在声明同时赋予初始值，也可以在构造函数中赋值或修改初始值
    readonly surname: string = "李";
    // public 公共变量 在当前类里面，子类，类外面都可以访问
    public name: string;
    // protected 保护变量 在当前类和子类内部可以访问，类外部无法访问
    protected _age: number;
    // private 私有变量 在当前类内部可访问，子类，类外部都无法访问。
    private _weight: number;
    // 构造函数
    constructor(name: string, age: number, weight: number = 80) {
      this.name = name;
      this._age = age;
      this._weight = weight;
    }
    introduction(): string {
      return `我叫${this.name}，兴趣爱好是老头乐`;
    }
    // private 封装属性，通过Getter属性、Setter属性访问
    get info() {
      return `我的名字叫王${this.name}，今年${this._age}，体重${this._weight}qk`;
    }
    set weight(weight: number) {
      this._weight = weight - 1;
    }
    getInfo(): string {
      return `我的名字叫王${this.name}，今年${this._age}，体重${this._weight}qk`;
    }
    setAge(age: number): void {
      this._age = age;
    }
  }

  const man = new Person("尼玛", 42, 74);
  console.log(man);
  console.log(man.introduction());
  // console.log(man._age);
  // console.log(man._weight);
  console.log(man.info);
  console.log("---");
  man.name = "德发";
  man.weight = 66;
  man.setAge(43);
  console.log(man.getInfo());
  console.log("---");

  // 类的继承
  class Son extends Person {
    // 静态成员无需实例化，直接通过类名调用。静态成员通常用于整个类所共有的一些东西
    // 静态属性
    static surname: string = "王";
    // 学校
    school: string;
    //构造方法
    constructor(
      name: string,
      age: number,
      weight: number,
      school: string = "北京大学"
    ) {
      // 访问派生类的构造函数中的 "this" 前，必须调用 "super",初始化父类构造函数 --并把参数传给父类
      super(name, age, weight);
      //把传进来的school赋值给全局变量
      this.school = school;
    }
    //静态方法
    static hisSurname() {
      return `孩子姓${this.surname}，请各位网友帮忙取个名字`;
    }
  }
  console.log(Son.hisSurname());
  let son = new Son("斯格", 5, 27, "春天花花幼儿园");
  console.log(son);
  son.setAge(6);
  son.weight = 26;
  console.log(son.info);

  // 类的多态，通过抽象方法/方法重载--实现多态--多态的作用是用来定义标准。抽象类中不要使用 private 关键字
  abstract class Animal {
    // 抽象类
    name: string;
    // 构造函数
    constructor(name: string) {
      this.name = name;
    }
    //抽象成员--方法
    abstract eat(): any;
    //抽象成员--属性
    protected abstract ages: Number;
    sleep(): void {
      console.log("睡觉");
    }
  }
  class cat extends Animal {
    ages: Number = 2;
    constructor(name: string) {
      super(name);
    }
    //非抽象类“cat”不会自动实现继承自“Animal”类的抽象成员“eat”,  必须手动定义父类中的抽象方法--多态
    eat(): string {
      return "猫吃鱼";
    }
    //多态
    sleep(): string {
      return "猫在睡觉";
    }
  }
  console.log(new cat("33").sleep());
}
