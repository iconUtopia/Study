/**
 * 类的概念和使用
 */
namespace demo8 {
  // class Demo8 {
  //   content = "Hi";
  //   say(text: string) {
  //     return this.content + " " + text;
  //   }
  // }
  // // 继承
  // class ThisDemo extends Demo8 {
  //   // 重写
  //   // say() {
  //   //   return "honey";
  //   // }
  //   // super 关键字
  //   say() {
  //     return super.say("boy") + " friend";
  //   }
  //   answer(text: string) {
  //     return text;
  //   }
  // }
  // const boy = new Demo8();
  // console.log(boy.say("gir"));
  // const gir = new ThisDemo();
  // console.log(gir.say());
  // console.log(gir.answer("How are you"));
  class Girl {
    // public 公共变量
    public name: string;
    // protected 保护变量
    protected age: number;
    // private 私有变量
    private weight: number;
    // 构造函数
    constructor(name: string, age: number, weight: number) {
      this.name = name;
      this.age = age;
      this.weight = weight;
    }
    set stature(stature: number) {
      this.stature = stature;
    }
    get factualInfo() {
      return `我的名字叫${this.name}，今年${this.age}，体重${this.weight}qk`;
    }
    introduction(): string {
      let name = this.name.split("");
      let alias = "";
      for (let i = 0; i < name.length; i++) {
        i && (alias += name[i]);
      }
      return `我的名字叫李${alias}，今年${this.age - 1}，体重${this.weight -
        2}qk，身高${this.stature}`;
    }
  }
  const girl = new Girl("小红", 22, 44);
  console.log("第一次自我介绍:" + girl.introduction());
  girl.name = "小霞";
  console.log("第一次自我介绍:" + girl.introduction());
}
