/*
 * 接口
 * interface 和 type 的区别:
 * type Info = string 写法，但interface不可以
 */
namespace Interface {
  // 属性接口
  interface Person {
    name: string;
    age: number;
    stature?: number;
    weight?: number; // : 号前加 ? 表示该参数可有可无
    [propName: string]: any; // 这样就可在对象里添加任何东西不受约束
    say(): string; // say 方法的返回值必须是 string
  }

  // 函数接口
  interface Pokemon {
    (name: string): void;
  }

  // 可索引接口
  interface PokemonInfo {
    [index: string]: any;
  }
  // 接口继承
  interface Trainer extends Person {
    selectPartner: Pokemon;
  }
  class Person implements Person {
    name: string;
    age: number;
    weight?: number; // : 号前加 ? 表示该参数可有可无
    stature?: number;
    constructor(name: string, age: number, weight?: number) {
      this.name = name;
      this.age = age;
      this.weight = weight;
    }
    say() {
      return `我是要成为宝可梦训练大师的男人`;
    }
    selectPartner(partner: string) {
      console.log(`我要选择${partner}和我一起踏上成为宝可梦大师的旅程`);
    }
  }
  const man = new Person("小智", 17);
  function screenResume(info: Person) {
    console.log(info.say());
    info.age < 14 &&
      console.log(info.name + "你年龄不够，不能成为宝可梦训练师");
    info.age >= 14 &&
      console.log(info.name + "恭喜你达到了成为宝可梦训练师的年龄");
  }
  screenResume(man);
  const logon = (info: Trainer) => {
    console.log("---");
    console.log("姓名：" + info.name);
    console.log("年龄：" + info.age);
    info.stature && console.log("体重：" + info.stature);
    info.weight && console.log("身高：" + info.weight);
    info.selectPartner("皮卡丘");
    console.log("---");
    let Pokemon: PokemonInfo = {
      name: "皮卡丘",
      age: 1,
      sex: "公",
      character: "傲娇",
      skillName: (function() {
        return `十万伏特`;
      })()
    };
    console.log("partner:", Pokemon);
  };
  logon(man);
}
